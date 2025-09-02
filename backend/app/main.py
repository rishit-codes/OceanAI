import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import data, chat, search, voice
from apscheduler.schedulers.background import BackgroundScheduler
import logging
import subprocess
import sys


# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] - %(message)s")


app = FastAPI(
    title="OceanAI",
    description="Next-Generation Oceanographic Data Intelligence Platform",
    version="0.1.0-mvp",
)

origins_str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8000,http://localhost:8080")
origins = [origin.strip() for origin in origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(data.router, prefix="/api/v1", tags=["ARGO Data"])
app.include_router(chat.router, prefix="/api/v1", tags=["AI Conversation Engine"])
app.include_router(search.router, prefix="/api/v1", tags=["Semantic Search"])
app.include_router(voice.router, prefix="/api/v1", tags=["Voice Interface"])


@app.get("/", tags=["Health Check"])
async def root():
    """
    A simple health check endpoint to confirm the API is running.
    """
    return {"status": "ok", "message": "Welcome to the OceanAI Intelligence Core."}

def run_ingestion_pipeline():
    """
    Function to run the data ingestion script using a subprocess.
    This ensures it runs in its own environment and doesn't block the API.
    """
    logging.info("SCHEDULER: Triggering ARGO data ingestion pipeline...")
    try:
        # We need to make sure we use the same python interpreter
        # that is running the FastAPI app.
        python_executable = sys.executable
        script_path = "data/scripts/ingest_argo.py"
        
        # We assume the script is runnable from the project's root directory.
        # Adjust the path if your execution context is different.
        result = subprocess.run(
            [python_executable, script_path],
            capture_output=True,
            text=True,
            check=True # This will raise an exception if the script returns a non-zero exit code
        )
        logging.info("SCHEDULER: Ingestion pipeline finished successfully.")
        logging.info(f"SCHEDULER STDOUT: {result.stdout}")
    except subprocess.CalledProcessError as e:
        logging.error(f"SCHEDULER: Ingestion pipeline failed with exit code {e.returncode}.")
        logging.error(f"SCHEDULER STDERR: {e.stderr}")
    except Exception as e:
        logging.error(f"SCHEDULER: An unexpected error occurred while running the ingestion script: {e}")


scheduler = BackgroundScheduler()

@app.on_event("startup")
def start_scheduler():
    """
    Start the scheduler when the FastAPI application starts.
    The job is scheduled to run once every 24 hours.
    """
    # The 'misfire_grace_time' ensures that if the scheduler is down
    # when the job was supposed to run, it will still run if it comes back up
    # within this time window (in seconds).
    scheduler.add_job(run_ingestion_pipeline, 'interval', hours=24, misfire_grace_time=3600)
    scheduler.start()
    logging.info("✅ Background scheduler started. Data ingestion job scheduled to run daily.")

@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()
    logging.info("Background scheduler shut down.")


# --- API Routers ---
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the OceanAI API. The data pipeline is automated."}
