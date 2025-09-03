from sqlalchemy.orm import Session
from sqlalchemy import text

def execute_sql_query(db: Session, sql_query: str) -> list:
    """Executes a raw SQL query and returns the results."""
    try:
        result = db.execute(text(sql_query))
        # Convert rows to a list of dictionaries
        data = [dict(row._mapping) for row in result]
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
        sql_to_run = """
            SELECT AVG(CAST(temperature AS FLOAT)) AS average_temperature
            FROM argo_profiles
            WHERE temperature IS NOT NULL;
        """

    # Example 2: Looking for the latest profile
    elif "latest" in query or "most recent" in query:
        sql_to_run = """
            SELECT platform_id as float_id, timestamp as profile_time, latitude, longitude
            FROM argo_profiles
            ORDER BY timestamp DESC
            LIMIT 1;
        """
    
    # Depth queries
    elif "depth" in query or "deep" in query:
        sql_to_run = """
            SELECT platform_id as float_id, MAX(CAST(pressure AS FLOAT)) as max_depth
            FROM argo_profiles
            WHERE pressure IS NOT NULL
            GROUP BY platform_id
            ORDER BY max_depth DESC
            LIMIT 5;
        """
    
    # Salinity queries
    elif "salinity" in query:
        sql_to_run = """
            SELECT AVG(CAST(salinity AS FLOAT)) as average_salinity
            FROM argo_profiles
            WHERE salinity IS NOT NULL;
        """
    
    # Location queries
    elif "location" in query or "where" in query:
        sql_to_run = """
            SELECT platform_id as float_id, latitude, longitude, timestamp as profile_time
            FROM argo_profiles
            ORDER BY timestamp DESC
            LIMIT 10;
        """
    
    # Count queries
    elif "how many" in query or "count" in query:
        sql_to_run = """
            SELECT COUNT(DISTINCT platform_id) as total_floats,
                   COUNT(*) as total_profiles
            FROM argo_profiles;
        """
    
    # Time-based queries
    elif "today" in query or "recent" in query:
        sql_to_run = """
            SELECT COUNT(*) as recent_profiles
            FROM argo_profiles
            WHERE timestamp >= NOW() - INTERVAL '7 days';
        """
    
    if sql_to_run:
        return execute_sql_query(db, sql_to_run)
    
    return [] # Return empty list if no keywords match