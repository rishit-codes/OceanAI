from sqlalchemy.orm import Session
from sqlalchemy import text

def execute_sql_query(db: Session, sql_query: str) -> list:
    """Executes a raw SQL query and returns the results."""
    try:
        result = db.execute(text(sql_query))
        # Convert rows to a list of dictionaries
        data = [row._asdict() for row in result]
        return data
    except Exception as e:
        print(f"Error executing SQL query: {e}")
        return []

def generate_and_run_sql(db: Session, query: str) -> list:
    """
    A simple keyword-based NL-to-SQL engine for the MVP.
    It looks for keywords and constructs a SQL query to run.
    """
    query = query.lower()
    sql_to_run = ""

    # Example 1: Looking for average temperature
    if "average" in query and "temperature" in query:
        # NOTE: This is a simplified query. A real-world version would be more complex,
        # potentially filtering by location (e.g., Bay of Bengal).
        sql_to_run = """
            SELECT AVG((temps.temp)) AS average_temperature
            FROM (
                SELECT unnest(temperature_celsius) AS temp
                FROM argo_profiles
            ) AS temps;
        """

    # Example 2: Looking for the latest profile
    elif "latest" in query or "most recent" in query:
        sql_to_run = """
            SELECT float_id, profile_time, latitude, longitude
            FROM argo_profiles
            ORDER BY profile_time DESC
            LIMIT 1;
        """
    
    if sql_to_run:
        return execute_sql_query(db, sql_to_run)
    
    return [] # Return empty list if no keywords match