import os
import google.generativeai as genai
import json
from sqlalchemy.orm import Session
from . import query_service # Import our new service
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google API
api_key = os.getenv('GOOGLE_API_KEY')
if api_key:
    genai.configure(api_key=api_key)

def get_ai_response(db: Session, query: str) -> str:
    """
    Connects to the Google Gemini API using a RAG pattern with live DB data.
    Falls back to rule-based responses if API is unavailable.
    """
    try:
        # --- STEP 1: RETRIEVE ---
        context_data = query_service.generate_and_run_sql(db, query)
        
        # Try Google API first
        if api_key:
            try:
                context_str = json.dumps(context_data, default=str)
                augmented_prompt = f"""
                You are OceanAI, an expert oceanographic data assistant with deep knowledge of marine science, ARGO float technology, and ocean dynamics.
                
                Your expertise includes:
                - Ocean temperature, salinity, pressure, and dissolved oxygen patterns
                - ARGO float deployment, operation, and data collection methods
                - Ocean currents, water masses, and thermohaline circulation
                - Climate change impacts on ocean systems
                - Marine ecosystems and their relationship to physical oceanography
                
                Provide detailed, scientifically accurate responses that:
                1. Use the provided ARGO data context when available
                2. Explain oceanographic concepts clearly
                3. Include relevant scientific units and measurements
                4. Mention implications for climate and marine life when appropriate
                5. Keep responses informative yet accessible
                
                Context Data from ARGO Floats: {context_str}
                
                User Question: {query}
                
                Please provide a comprehensive response based on the data and your oceanographic expertise.
                """
                
                model = genai.GenerativeModel('gemini-1.5-pro')
                model.generation_config.temperature = 0.7
                model.generation_config.max_output_tokens = 1000
                response = model.generate_content(augmented_prompt)
                return response.text
            except Exception as e:
                print(f"Google API error: {e}")
        
        # Fallback to rule-based responses
        return generate_fallback_response(query, context_data)
        
    except Exception as e:
        print(f"Error in get_ai_response: {e}")
        return "I'm having trouble processing your request right now."

def generate_fallback_response(query: str, data: list) -> str:
    """Generate detailed oceanographic responses based on query patterns and data"""
    query_lower = query.lower()
    
    if not data:
        return "I don't have specific ARGO float data to answer that question right now. ARGO floats are autonomous instruments that drift with ocean currents, collecting temperature, salinity, and pressure data from the surface to 2000m depth."
    
    if "how many" in query_lower or "count" in query_lower:
        if len(data) > 0 and 'total_floats' in data[0]:
            return f"Our database contains {data[0]['total_floats']} active ARGO floats with {data[0]['total_profiles']} total profiles. These autonomous instruments form a global ocean observing network, providing real-time data on ocean conditions that are crucial for climate research and weather forecasting."
    
    elif "temperature" in query_lower:
        if len(data) > 0 and 'average_temperature' in data[0]:
            temp = data[0]['average_temperature']
            return f"The average ocean temperature from our ARGO data is {temp:.1f}°C. Ocean temperature varies significantly with depth and location - surface waters are typically warmer due to solar heating, while deep waters can be near freezing. Temperature affects ocean density, circulation patterns, and marine ecosystems."
    
    elif "salinity" in query_lower:
        if len(data) > 0 and 'average_salinity' in data[0]:
            sal = data[0]['average_salinity']
            return f"The average salinity from our ARGO data is {sal:.1f} PSU (Practical Salinity Units). Ocean salinity affects water density and circulation. Higher salinity water is denser and tends to sink, driving thermohaline circulation - the global conveyor belt that redistributes heat around our planet."
    
    elif "deepest" in query_lower or "depth" in query_lower:
        if len(data) > 0 and 'max_pressure' in data[0]:
            pressure = data[0]['max_pressure']
            depth = pressure * 1.02  # Approximate conversion from dbar to meters
            return f"The deepest measurement in our data reaches approximately {depth:.0f} meters (pressure: {pressure:.1f} dbar). ARGO floats typically profile to 2000m depth, capturing the full water column structure including the thermocline, halocline, and deep water masses."
    
    elif "latest" in query_lower or "recent" in query_lower:
        if len(data) > 0 and 'float_id' in data[0]:
            return f"The most recent profile is from ARGO float {data[0]['float_id']} at coordinates ({data[0]['latitude']:.2f}°, {data[0]['longitude']:.2f}°). ARGO floats cycle every 10 days, diving to depth, drifting with currents, then surfacing to transmit data via satellite before diving again."
    
    elif "location" in query_lower or "where" in query_lower:
        if len(data) > 0:
            locations = [f"Float {row['float_id']}: ({row['latitude']:.1f}°, {row['longitude']:.1f}°)" for row in data[:3]]
            return f"Here are some ARGO float locations: {'; '.join(locations)}. These floats drift with ocean currents, providing a Lagrangian perspective of ocean dynamics and helping us understand water mass movements and mixing processes."
    
    return f"I found {len(data)} relevant data points from ARGO float profiles. This data includes critical oceanographic measurements like temperature, salinity, and pressure that help scientists understand ocean circulation, climate variability, and marine ecosystem dynamics."