import os
import glob
import netCDF4 as nc
import numpy as np
import pandas as pd
import geopandas as gpd
from sqlalchemy import create_engine
from shapely.geometry import Point
from tqdm import tqdm
from dotenv import load_dotenv
import cftime   # FIX: handle cftime objects
from geoalchemy2 import Geometry   # ✅ use Geometry for PostGIS type
from geoalchemy2.elements import WKTElement


# Load environment variables from the .env file in the backend directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'backend', '.env')
load_dotenv(dotenv_path=dotenv_path)

# --- Database Connection ---
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME]):
    print("FATAL: Database environment variables are not set. Please check your backend/.env file.")
    exit()

DB_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DB_URI)


def to_datetime_safe(value):
    """Convert cftime or numeric time to pandas.Timestamp safely."""  # FIX
    if isinstance(value, cftime.DatetimeGregorian):
        return pd.Timestamp(value.strftime("%Y-%m-%d %H:%M:%S"))
    try:
        return pd.to_datetime(value)
    except Exception:
        return pd.NaT


def process_argo_file(file_path):
    """Extracts, cleans, and structures data from a single ARGO NetCDF file."""
    try:
        with nc.Dataset(file_path, 'r') as ds:
            # --- PLATFORM_NUMBER ---
            float_id = None
            if "PLATFORM_NUMBER" in ds.variables:
                platform_raw = ds.variables["PLATFORM_NUMBER"][:]
                try:
                    if platform_raw.ndim > 1:
                        platform_raw = platform_raw[0]
                    platform_str = "".join(
                        ch.decode("utf-8") if isinstance(ch, (bytes, bytearray)) else str(ch)
                        for ch in platform_raw
                        if ch not in [b"--", "--", None]
                    ).strip().replace("-", "")  # FIX: strip trailing dashes
                    float_id = int(platform_str)
                except Exception as e:
                    print(f"DEBUG: Could not parse PLATFORM_NUMBER in {os.path.basename(file_path)} → {e}")

            # --- LAT & LON ---
            try:
                lat = float(ds.variables["LATITUDE"][0].item())
                lon = float(ds.variables["LONGITUDE"][0].item())
            except Exception:
                print(f"Skipping {os.path.basename(file_path)}: Missing LAT/LON.")
                return None

            # --- CYCLE_NUMBER ---
            try:
                cycle_number = int(ds.variables["CYCLE_NUMBER"][0].item())
            except Exception:
                cycle_number = -1

            # --- Profile Data ---
            pressure = ds.variables["PRES"][0, :].compressed().tolist() if "PRES" in ds.variables else []
            temperature = ds.variables["TEMP"][0, :].compressed().tolist() if "TEMP" in ds.variables else []
            salinity = ds.variables["PSAL"][0, :].compressed().tolist() if "PSAL" in ds.variables else []

            min_len = min(len(pressure), len(temperature), len(salinity))
            if min_len == 0:
                return None
            pressure, temperature, salinity = pressure[:min_len], temperature[:min_len], salinity[:min_len]

            # --- JULD (time) ---
            profile_time = pd.Timestamp.utcnow()  # fallback
            if "JULD" in ds.variables:
                juld_var = ds.variables["JULD"]
                try:
                    val = juld_var[0].item()
                    profile_time = to_datetime_safe(val)  # FIX
                except Exception as e:
                    print(f"DEBUG: Failed to parse JULD for {os.path.basename(file_path)} → {e}")

            return {
                "float_id": float_id,
                "cycle_number": cycle_number,
                "profile_time": profile_time,
                "latitude": lat,
                "longitude": lon,
                "pressure_dbar": pressure,
                "temperature_celsius": temperature,
                "salinity_psu": salinity,
            }

    except Exception as e:
        print(f"Error processing {os.path.basename(file_path)}: {e}")
        return None


def ingest_data(source_dir, parquet_output_dir):
    print("AquaLense: Initiating ARGO data ingestion protocol...")
    argo_files = glob.glob(os.path.join(source_dir, '*.nc'))

    if not argo_files:
        print(f"AquaLense WARNING: No NetCDF files found in {source_dir}. Aborting.")
        return

    print(f"Found {len(argo_files)} ARGO data files to process.")

    all_profiles_data = []
    for f in tqdm(argo_files, desc="Processing NetCDF files"):
        profile_data = process_argo_file(f)
        if profile_data:
            all_profiles_data.append(profile_data)

    if not all_profiles_data:
        print("AquaLense: No valid data could be processed. Check file integrity.")
        return

    df = pd.DataFrame(all_profiles_data)
    df["profile_time"] = pd.to_datetime(df["profile_time"], errors="coerce")  # normalize

    # ✅ Convert Shapely -> WKTElement with SRID=4326
    df["geom"] = [
        WKTElement(f'POINT({lon} {lat})', srid=4326)
        for lon, lat in zip(df.longitude, df.latitude)
    ]

    print(f"\nWriting {len(df)} valid profiles to PostgreSQL...")
    try:
        df.to_sql(
            'argo_profiles',
            engine,
            if_exists='append',
            index=False,
            chunksize=1000,
            method='multi',
            dtype={'geom': Geometry('POINT', srid=4326)}  # ✅ FIXED: proper PostGIS type
        )
        print("-> Data successfully ingested into the relational database.")
    except Exception as e:
        print(f"AquaLense ERROR: Failed to write to PostgreSQL. Error: {e}")

    # ✅ Convert geom to string before saving parquet
    df["geom"] = df["geom"].apply(lambda g: str(g) if g is not None else None)

    if not os.path.exists(parquet_output_dir):
        os.makedirs(parquet_output_dir)
    parquet_path = os.path.join(parquet_output_dir, 'argo_indian_ocean.parquet')
    print(f"\nWriting {len(df)} profiles to Parquet file at {parquet_path}...")
    try:
        df.to_parquet(parquet_path, index=False)
        print("-> Data successfully stored in analytical format (Parquet).")
    except Exception as e:
        print(f"AquaLense ERROR: Failed to write to Parquet. Error: {e}")

    print("\nAquaLense: Ingestion complete. The platform's knowledge base has been updated.")


if __name__ == "__main__":
    SAMPLE_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "sample_argo")
    PARQUET_DIR = os.path.join(os.path.dirname(__file__), "..", "processed")

    print("Looking for .nc files in:", os.path.abspath(SAMPLE_DATA_DIR))
    print("Parquet will be written to:", os.path.abspath(PARQUET_DIR))

    ingest_data(SAMPLE_DATA_DIR, PARQUET_DIR)
