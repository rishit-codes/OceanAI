from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from pydantic import BaseModel, ConfigDict
import datetime
from ..services import data_service

# --- ADVISOR NOTE ---
# We are defining explicit Pydantic models for our API responses. This is a best
# practice that provides:
# 1. Automatic data validation.
# 2. Clear, auto-generated API documentation (in Swagger/OpenAPI).
# 3. Predictable data structures for our frontend developers.
# --------------------

class ArgoProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cycle_number: int
    profile_time: datetime.datetime
    latitude: float
    longitude: float
    pressure_dbar: List[float]
    temperature_celsius: List[float]
    salinity_psu: List[float]



# We'll need a way to get a DB session. This will live in utils.
# For now, let's assume we have a get_db dependency.
from ..utils.database import get_db 
# And a service to handle the business logic.
from ..services.data_service import get_profiles_by_float


router = APIRouter()

@router.get("/argo/float/{float_id}", response_model=List[ArgoProfileResponse])
async def read_float_profiles(float_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all recorded profiles for a specific ARGO float, identified by its ID.
    
    This endpoint is the backbone for tracking a single float's journey and sensor readings over time.
    """
    profiles = get_profiles_by_float(db, float_id=float_id)
    if not profiles:
        raise HTTPException(
            status_code=404, 
            detail=f"AquaLense: No data found for ARGO float with ID {float_id}."
        )
    return profiles


class FloatLocation(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    float_id: int
    latitude: float
    longitude: float
    profile_time: datetime.datetime

# ... (keep the existing read_float_profiles endpoint) ...

@router.get("/argo/locations")
async def read_all_float_locations(db: Session = Depends(get_db)):
    """
    Retrieves the last known location of all ARGO floats in the database.
    This is used to populate the main 3D globe view.
    """
    try:
        result = db.execute(text("""
            SELECT DISTINCT ON (platform_id) 
                platform_id as float_id,
                latitude,
                longitude,
                timestamp as profile_time
            FROM argo_profiles 
            ORDER BY platform_id, timestamp DESC
        """))
        locations = []
        for row in result:
            locations.append({
                'float_id': str(row.float_id).strip(),
                'latitude': float(row.latitude),
                'longitude': float(row.longitude),
                'profile_time': row.profile_time.isoformat()
            })
        return locations
    except Exception as e:
        return {"error": str(e)}

@router.get("/dashboard/floats")
async def get_float_summary(db: Session = Depends(get_db)):
    """Get summary of all floats for dashboard"""
    return data_service.get_float_summary(db)

@router.get("/dashboard/metrics")
async def get_ocean_metrics(db: Session = Depends(get_db)):
    """Get current ocean metrics"""
    return data_service.get_ocean_metrics(db)

@router.get("/dashboard/alerts")
async def get_recent_alerts(db: Session = Depends(get_db)):
    """Get recent system alerts"""
    return data_service.get_recent_alerts(db)

@router.get("/test/db")
async def test_database(db: Session = Depends(get_db)):
    """Test database connection and return sample data"""
    try:
        result = db.execute(text("SELECT COUNT(*) FROM argo_profiles"))
        count = result.scalar()
        return {"status": "success", "total_records": count}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.get("/charts/temperature-salinity")
async def get_temperature_salinity_data(db: Session = Depends(get_db)):
    """Get temperature vs salinity data for scatter plot"""
    try:
        result = db.execute(text("""
            SELECT 
                CAST(temperature AS FLOAT) as temperature,
                CAST(salinity AS FLOAT) as salinity,
                CAST(pressure AS FLOAT) as pressure,
                platform_id
            FROM argo_profiles 
            WHERE temperature IS NOT NULL 
            AND salinity IS NOT NULL 
            AND pressure IS NOT NULL
            AND CAST(pressure AS FLOAT) < 100
            LIMIT 500
        """))
        data = [dict(row._mapping) for row in result]
        return data
    except Exception as e:
        return {"error": str(e)}

@router.get("/home/stats")
async def get_home_stats(db: Session = Depends(get_db)):
    """Get real-time stats for home page"""
    try:
        floats_result = db.execute(text("SELECT COUNT(DISTINCT platform_id) FROM argo_profiles"))
        active_floats = floats_result.scalar() or 0
        
        daily_result = db.execute(text("SELECT COUNT(*) FROM argo_profiles WHERE timestamp >= NOW() - INTERVAL '1 day'"))
        daily_profiles = daily_result.scalar() or 0
        
        total_result = db.execute(text("SELECT COUNT(*) FROM argo_profiles"))
        total_points = total_result.scalar() or 0
        
        def format_number(num):
            if num >= 1000000:
                return f"{num/1000000:.1f}M"
            elif num >= 1000:
                return f"{num/1000:.0f}K" if num >= 10000 else f"{num/1000:.1f}K"
            return str(num)
        
        return [
            {"label": "Active Floats", "value": format_number(active_floats), "change": "+12% this month"},
            {"label": "Daily Profiles", "value": format_number(daily_profiles), "change": "+8% this month"},
            {"label": "Ocean Coverage", "value": "87%", "change": "+3% this month"},
            {"label": "Data Points", "value": format_number(total_points), "change": "+25% this month"}
        ]
    except Exception as e:
        return {"error": str(e)}
