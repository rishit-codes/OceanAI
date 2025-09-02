# backend/app/tests/test_vector_service.py

import sys
import os

# This is a common trick to allow the test script to import modules
# from the parent directory (the 'app' folder).
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.vector_service import vector_service

def run_service_test():
    """
    Tests the initialized vector_service instance.
    """
    print("--- Testing Vector Service ---")
    
    # The float ID we know is in our database from the sample files
    known_float_id = 1902672 
    test_query = f"tell me about float {known_float_id}"

    print(f"Executing query: '{test_query}'")
    
    # Call the search method on our service instance
    results = vector_service.search(test_query, k=1)

    print(f"Service returned results: {results}")

    # --- Verification ---
    if results and results[0] == known_float_id:
        print("✅ SUCCESS: The correct float ID was returned.")
    else:
        print("❌ FAILED: The returned ID did not match the expected ID.")
        
    print("--- Test complete ---")

if __name__ == "__main__":
    run_service_test()