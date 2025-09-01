# app/routers/voice.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/voice-test")
async def voice_test():
    return {"message": "Voice router is working!"}
