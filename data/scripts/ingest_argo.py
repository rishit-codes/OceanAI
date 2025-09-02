import os
import logging
import pandas as pd
import xarray as xr
from sqlalchemy import create_engine
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv()

DOWNLOAD_DIR = "data/sample_argo/"
PROCESSED_LOG = "data/processed_files.log"

# --- Database Configuration ---
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME")
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] - %(message)s",
    handlers=[
        logging.FileHandler("data/ingestion.log", encoding='utf-8'),
        logging.StreamHandler()
    ],
    encoding='utf-8'
)

# --- Helper Functions ---
def get_processed_files():
    """Reads the log of already processed files to avoid duplication."""
    if not os.path.exists(PROCESSED_LOG):
        return set()
    with open(PROCESSED_LOG, 'r') as f:
        return set(line.strip() for line in f)

def log_processed_file(filename):
    """Adds a file to the log of processed files."""
    with open(PROCESSED_LOG, 'a') as f:
        f.write(f"{filename}\n")

def parse_argo_profile(file_path):
    """Parses a single Argo NetCDF file and extracts profile data into a DataFrame."""
    try:
        with xr.open_dataset(file_path) as ds:
            platform_number = int(ds.PLATFORM_NUMBER.values.astype(str).item().strip())
            num_profiles = ds.sizes['N_PROF']
            
            profile_data = []
            for i in range(num_profiles):
                cycle_number = int(ds.CYCLE_NUMBER.values[i])
                profile_time = pd.to_datetime(ds.JULD.values[i])
                lat = ds.LATITUDE.values[i]
                lon = ds.LONGITUDE.values[i]

                temp = ds.TEMP_ADJUSTED.values[i]
                sal = ds.PSAL_ADJUSTED.values[i]
                pres = ds.PRES_ADJUSTED.values[i]
                
                df_prof = pd.DataFrame({
                    'pressure': pres,
                    'temperature': temp,
                    'salinity': sal
                })
                
                df_prof['platform_id'] = platform_number
                df_prof['cycle_number'] = cycle_number
                df_prof['timestamp'] = profile_time
                df_prof['latitude'] = lat
                df_prof['longitude'] = lon
                
                profile_data.append(df_prof)

            if not profile_data:
                return None
                
            final_df = pd.concat(profile_data, ignore_index=True)
            final_df.dropna(subset=['pressure', 'temperature', 'salinity'], inplace=True)
            
            return final_df

    except Exception as e:
        logging.error(f"Failed to parse {os.path.basename(file_path)}: {e}")
        return None

def main():
    """Main function to ingest locally stored Argo data files."""
    logging.info("🚀 Starting ARGO data ingestion pipeline from LOCAL files...")
    processed_files = get_processed_files()
    logging.info(f"Found {len(processed_files)} previously processed files.")
    
    try:
        engine = create_engine(DATABASE_URL)
        logging.info("✅ Successfully connected to the database.")
    except Exception as e:
        logging.error(f"❌ Failed to connect to database: {e}")
        return

    # We are bypassing the network download and only processing local files.
    local_files = [f for f in os.listdir(DOWNLOAD_DIR) if f.endswith('.nc')]
    logging.info(f"Found {len(local_files)} local NetCDF files to process.")
    
    files_ingested_count = 0
    for filename in local_files:
        if filename in processed_files:
            logging.info(f"Skipping already processed file: {filename}")
            continue

        local_filepath = os.path.join(DOWNLOAD_DIR, filename)
        
        try:
            argo_df = parse_argo_profile(local_filepath)
            
            if argo_df is not None and not argo_df.empty:
                # Use a smaller chunksize for local ingestion
                argo_df.to_sql('argo_profiles', engine, if_exists='append', index=False, chunksize=500)
                logging.info(f"✅ Ingested {len(argo_df)} data points from {filename}.")
                log_processed_file(filename)
                files_ingested_count += 1
            else:
                logging.warning(f"⚠️ No data ingested from {filename}.")

        except Exception as e:
            logging.error(f"❌ Failed to process local file {filename}: {e}")
            
    logging.info(f"Pipeline run finished. Ingested {files_ingested_count} new local files. 🚀")

if __name__ == "__main__":
    main()