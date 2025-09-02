import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import data, chat, search, voice


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
