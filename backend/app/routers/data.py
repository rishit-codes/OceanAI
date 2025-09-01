from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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

@router.get("/argo/locations", response_model=List[FloatLocation])
async def read_all_float_locations(db: Session = Depends(get_db)):
    """
    Retrieves the last known location of all ARGO floats in the database.
    This is used to populate the main 3D globe view.
    """
    locations = data_service.get_all_float_locations(db)
    return locations
