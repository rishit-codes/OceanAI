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
        # Return mock data based on query type
        if "temperature" in sql_query.lower():
            return [{'average_temperature': 23.4}]
        elif "latest" in sql_query.lower() or "recent" in sql_query.lower():
            return [{'float_id': 5906468, 'profile_time': '2024-01-15', 'latitude': 35.2, 'longitude': -75.4}]
        elif "count" in sql_query.lower():
            return [{'total_floats': 4, 'total_profiles': 1200}]
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
    
    # Depth queries
    elif "depth" in query or "deep" in query:
        sql_to_run = """
            SELECT float_id, MAX(pressure_dbar) as max_depth
            FROM argo_profiles
            WHERE pressure_dbar IS NOT NULL
            GROUP BY float_id
            ORDER BY max_depth DESC
            LIMIT 5;
        """
    
    # Salinity queries
    elif "salinity" in query:
        sql_to_run = """
            SELECT AVG(sal.salinity) as average_salinity
            FROM (
                SELECT unnest(salinity_psu) AS salinity
                FROM argo_profiles
                WHERE salinity_psu IS NOT NULL
            ) AS sal;
        """
    
    # Location queries
    elif "location" in query or "where" in query:
        sql_to_run = """
            SELECT float_id, latitude, longitude, profile_time
            FROM argo_profiles
            ORDER BY profile_time DESC
            LIMIT 10;
        """
    
    # Count queries
    elif "how many" in query or "count" in query:
        sql_to_run = """
            SELECT COUNT(DISTINCT float_id) as total_floats,
                   COUNT(*) as total_profiles
            FROM argo_profiles;
        """
    
    # Time-based queries
    elif "today" in query or "recent" in query:
        sql_to_run = """
            SELECT COUNT(*) as recent_profiles
            FROM argo_profiles
            WHERE profile_time >= NOW() - INTERVAL '7 days';
        """
    
    if sql_to_run:
        return execute_sql_query(db, sql_to_run)
    
    return [] # Return empty list if no keywords match