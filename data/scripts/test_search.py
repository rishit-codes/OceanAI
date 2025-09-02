# data/scripts/test_search.py

import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
import os
import logging

# --- Configuration ---
EMBEDDING_MODEL = 'all-MiniLM-L6-v2'
EMBEDDINGS_DIR = "data/embeddings/"
FAISS_INDEX_PATH = os.path.join(EMBEDDINGS_DIR, "argo_float_index.faiss")
ID_MAPPING_PATH = os.path.join(EMBEDDINGS_DIR, "index_to_id_mapping.csv")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] - %(message)s")

def run_test():
    """
    Loads the index and runs a test query to verify the search functionality.
    """
    # --- 1. Load all necessary components ---
    try:
        logging.info(f"Loading sentence transformer model: {EMBEDDING_MODEL}")
        model = SentenceTransformer(EMBEDDING_MODEL)

        logging.info(f"Loading FAISS index from: {FAISS_INDEX_PATH}")
        index = faiss.read_index(FAISS_INDEX_PATH)

        logging.info(f"Loading ID mapping from: {ID_MAPPING_PATH}")
        id_mapping_df = pd.read_csv(ID_MAPPING_PATH)
        
        # Convert mapping to a simple list for easy lookup
        index_to_id = id_mapping_df['platform_id'].tolist()
        
        logging.info("✅ All components loaded successfully.")

    except Exception as e:
        logging.error(f"❌ Failed to load components: {e}")
        return

    # --- 2. Define and run test queries ---
    test_queries = [
        "information about float 5904222",
        "Where is ARGO float 2902345 located?",
        "Tell me about the float near the coast of India" # A more semantic query
    ]
    
    for query in test_queries:
        print("\n" + "="*50)
        logging.info(f"Executing test query: '{query}'")

        # --- 3. Encode the query ---
        query_embedding = model.encode([query])
        query_embedding = np.array(query_embedding).astype('float32')

        # --- 4. Search the index ---
        k = 3 # Number of nearest neighbors to retrieve
        distances, indices = index.search(query_embedding, k)
        
        # --- 5. Display results ---
        print(f"\n🔍 Top {k} results for query: '{query}'")
        
        for i in range(k):
            # The 'indices' array is 2D, so we access with [0, i]
            result_index = indices[0, i]
            platform_id = index_to_id[result_index]
            distance = distances[0, i]
            
            print(f"  {i+1}. Platform ID: {platform_id} (Similarity Score/Distance: {distance:.4f})")
        print("="*50)


if __name__ == "__main__":
    run_test()