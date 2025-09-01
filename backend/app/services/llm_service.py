import os
import google.generativeai as genai
import json
from sqlalchemy.orm import Session
from . import query_service # Import our new service

def get_ai_response(db: Session, query: str) -> str:
    """
    Connects to the Google Gemini API using a RAG pattern with live DB data.
    """
    try:
        # --- STEP 1: RETRIEVE ---
        # Generate and run SQL to get relevant data from our database.
        context_data = query_service.generate_and_run_sql(db, query)
        context_str = json.dumps(context_data, default=str) # Convert to JSON string

        # --- STEP 2: AUGMENT ---
        augmented_prompt = f"""
        You are OceanAI, a specialized oceanographic data assistant.
        Answer the user's question based *only* on the context data provided below.
        The data was retrieved from a database of ARGO float profiles.
        If the context is empty or doesn't contain the answer, say that you don't have specific data to answer that question.

        **Context Data from Database:**
        {context_str}

        **User's Question:**
        {query}
        """
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # --- STEP 3: GENERATE ---
        response = model.generate_content(augmented_prompt)
        
        return response.text
        
    except Exception as e:
        print(f"An error occurred with the Gemini API: {e}")
        return "Sorry, there was an error connecting to the AI service."