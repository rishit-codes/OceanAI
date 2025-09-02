# data/scripts/create_embeddings.py

import logging
import pandas as pd
from sqlalchemy import create_engine
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os

from dotenv import load_dotenv
load_dotenv()

# --- Configuration ---
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "localhost") 
DB_PORT = os.getenv("DB_PORT", "5432") 
DB_NAME = os.getenv("DB_NAME")

# Check if essential variables are missing
if not all([DB_USER, DB_PASSWORD, DB_NAME]):
    raise ValueError("Missing critical database environment variables (DB_USER, DB_PASSWORD, DB_NAME)")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


EMBEDDING_MODEL = 'all-MiniLM-L6-v2' # A fast and effective model
EMBEDDINGS_DIR = "data/embeddings/"
FAISS_INDEX_PATH = os.path.join(EMBEDDINGS_DIR, "argo_float_index.faiss")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] - %(message)s")

def create_documents_from_db(engine):
    """
    Fetches ARGO float metadata from the DB and creates descriptive text documents.
    """
    logging.info("Fetching unique float data from the database...")
    # This query gets the latest location for each float to make the document relevant
    query = """
    SELECT DISTINCT ON (platform_id)
        platform_id,
        latitude,
        longitude
    FROM argo_profiles
    ORDER BY platform_id, timestamp DESC;
    """
    df = pd.read_sql(query, engine)
    
    documents = []
    for _, row in df.iterrows():
        doc_text = (
            f"ARGO float with platform ID {row['platform_id']}. "
            f"Last known position at latitude {row['latitude']:.2f}, longitude {row['longitude']:.2f}."
        )
        documents.append({
            "platform_id": row['platform_id'],
            "content": doc_text
        })
    logging.info(f"Created {len(documents)} documents for embedding.")
    return documents

def main():
    """
    Main function to generate and save embeddings and the FAISS index.
    """
    logging.info("🚀 Starting embedding generation process...")
    os.makedirs(EMBEDDINGS_DIR, exist_ok=True)
    
    try:
        engine = create_engine(DATABASE_URL)
        logging.info("✅ Database connection successful.")
    except Exception as e:
        logging.error(f"❌ Database connection failed: {e}")
        return

    documents = create_documents_from_db(engine)
    if not documents:
        logging.warning("⚠️ No documents found to embed. Exiting.")
        return
        
    content_to_embed = [doc['content'] for doc in documents]
    
    logging.info(f"Loading sentence transformer model: {EMBEDDING_MODEL}")
    model = SentenceTransformer(EMBEDDING_MODEL)
    
    logging.info("Generating embeddings... (This may take a while)")
    embeddings = model.encode(content_to_embed, show_progress_bar=True)
    
    # FAISS requires embeddings to be float32
    embeddings = np.array(embeddings).astype('float32')
    
    # Create the FAISS index
    d = embeddings.shape[1]  # Dimension of embeddings
    index = faiss.IndexFlatL2(d) # Using L2 distance for similarity
    index.add(embeddings)
    
    logging.info(f"Saving FAISS index to {FAISS_INDEX_PATH}")
    faiss.write_index(index, FAISS_INDEX_PATH)
    
    # We also need to save the mapping from index position to platform_id
    platform_ids = [doc['platform_id'] for doc in documents]
    pd.DataFrame(platform_ids, columns=['platform_id']).to_csv(
        os.path.join(EMBEDDINGS_DIR, "index_to_id_mapping.csv"), 
        index=False
    )

    logging.info("✅ Embedding generation and indexing complete! 🚀")

if __name__ == "__main__":
    main()