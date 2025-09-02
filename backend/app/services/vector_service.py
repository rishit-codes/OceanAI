# backend/app/services/vector_service.py

import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
import os
import logging

# --- Configuration ---
# Set paths relative to the project root
EMBEDDINGS_DIR = "data/embeddings/"
FAISS_INDEX_PATH = os.path.join(EMBEDDINGS_DIR, "argo_float_index.faiss")
ID_MAPPING_PATH = os.path.join(EMBEDDINGS_DIR, "index_to_id_mapping.csv")
EMBEDDING_MODEL = 'all-MiniLM-L6-v2'

class VectorService:
    def __init__(self):
        """
        Initializes the VectorService by loading the model, FAISS index,
        and ID mapping into memory.
        """
        logging.info("Initializing VectorService...")
        self.model = None
        self.index = None
        self.index_to_id = []
        
        try:
            # 1. Load the Sentence Transformer model
            self.model = SentenceTransformer(EMBEDDING_MODEL)
            
            # 2. Load the FAISS index
            if not os.path.exists(FAISS_INDEX_PATH):
                raise FileNotFoundError(f"FAISS index not found at: {FAISS_INDEX_PATH}")
            self.index = faiss.read_index(FAISS_INDEX_PATH)

            # 3. Load the ID mapping
            if not os.path.exists(ID_MAPPING_PATH):
                raise FileNotFoundError(f"ID mapping file not found at: {ID_MAPPING_PATH}")
            id_mapping_df = pd.read_csv(ID_MAPPING_PATH)
            self.index_to_id = id_mapping_df['platform_id'].tolist()
            
            logging.info("✅ VectorService initialized successfully.")
            
        except Exception as e:
            logging.error(f"❌ Failed to initialize VectorService: {e}")
            # In a real application, you might want to handle this more gracefully
            # For now, we'll let it raise the exception to halt startup if files are missing.
            raise

    def search(self, query: str, k: int = 1) -> list[int]:
        """
        Performs a semantic search for a given query.

        Args:
            query (str): The user's natural language query.
            k (int): The number of top results to return.

        Returns:
            list[int]: A list of the top k platform_ids that match the query.
        """
        if not all([self.model, self.index]):
            logging.error("VectorService is not properly initialized.")
            return []

        try:
            # Encode the query into an embedding
            query_embedding = self.model.encode([query])
            query_embedding = np.array(query_embedding).astype('float32')

            # Search the FAISS index
            distances, indices = self.index.search(query_embedding, k)
            
            # Map the resulting indices back to platform_ids
            results = [int(self.index_to_id[idx]) for idx in indices[0]]
            
            return results
        except Exception as e:
            logging.error(f"Error during vector search for query '{query}': {e}")
            return []

# --- Singleton Instance ---
# This creates a single instance of the service when the module is first imported.
# Our FastAPI app can then import and use this single instance, which is efficient
# as the models are only loaded into memory once.
vector_service = VectorService()