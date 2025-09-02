# data/scripts/setup_db.py

import logging
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] - %(message)s")

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME")

if not all([DB_USER, DB_PASSWORD, DB_NAME]):
    raise ValueError("Missing critical database environment variables.")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def reset_database():
    """
    Connects to the database and drops the argo_profiles table if it exists,
    ensuring a clean slate for data ingestion.
    """
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as connection:
            logging.info("Successfully connected to the database.")
            
            # Use a transaction to safely drop the table
            with connection.begin():
                logging.warning("Dropping table 'argo_profiles' if it exists...")
                connection.execute(text("DROP TABLE IF EXISTS argo_profiles;"))
                logging.info("✅ Table 'argo_profiles' dropped successfully.")
            
            logging.info("Database is now ready for fresh data ingestion.")

    except Exception as e:
        logging.error(f"❌ An error occurred during database reset: {e}")
        raise

if __name__ == "__main__":
    logging.info("🚀 Starting database reset process...")
    reset_database()
    logging.info("🚀 Database reset process finished.")