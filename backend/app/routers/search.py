# app/routers/search.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/search")
async def semantic_search(query: str):
    return {"message": f"Searching for: {query}"}
