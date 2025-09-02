from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..services import llm_service
from ..utils.database import get_db

router = APIRouter()

class ChatQuery(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/chat", response_model=ChatResponse)
async def handle_chat_query(query: ChatQuery, db: Session = Depends(get_db)):
    """
    Receives a natural language question, queries the database,
    and returns an AI-generated answer based on the retrieved data.
    """
    ai_answer = llm_service.get_ai_response(db, query.message)
    return ChatResponse(answer=ai_answer)