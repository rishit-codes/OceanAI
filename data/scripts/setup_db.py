import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

# Correctly locate the .env file in the backend directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'backend', '.env')
load_dotenv(dotenv_path=dotenv_path)

def initialize_database():
    """
    Connects to PostgreSQL, drops the existing argo_profiles table for a clean slate,
    and recreates it with the final, correct schema.
    """
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        )
        conn.autocommit = True
        cursor = conn.cursor()

        print("AquaLense: Re-initializing the ocean database...")

        # Drop the old table if it exists to ensure a fresh start
        cursor.execute("DROP TABLE IF EXISTS argo_profiles;")
        print("-> Old table dropped.")

        # Enable PostGIS extension
        cursor.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
        print("-> PostGIS extension enabled.")

        # Recreate the table with the FINAL schema, including the 'id' column
        create_table_command = """
        CREATE TABLE argo_profiles (
            id SERIAL PRIMARY KEY,
            float_id INTEGER NOT NULL,
            cycle_number INTEGER NOT NULL,
            profile_time TIMESTAMP WITH TIME ZONE NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            pressure_dbar REAL[],
            temperature_celsius REAL[],
            salinity_psu REAL[],
            geom GEOMETRY(Point, 4326)
        );
        """
        cursor.execute(create_table_command)
        print("-> `argo_profiles` table created with correct schema.")

        # Create indexes for performance
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_argo_float_id ON argo_profiles (float_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_argo_profile_time ON argo_profiles (profile_time);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_argo_geom ON argo_profiles USING GIST (geom);")
        print("-> Performance indexes created.")
        
        print("\nAquaLense: Database reset complete. Ready for data.")

    except Exception as e:
        print(f"AquaLense ERROR: A critical error occurred during database setup: {e}")
    finally:
        if 'conn' in locals() and conn:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    initialize_database()