from sqlalchemy.orm import Session
from ..models import argo
from sqlalchemy import text, func



def get_profiles_by_float(db: Session, float_id: int):
    """
    Retrieves all profiles for a given float_id from the database.
    """
    # This query now uses the correct ArgoProfile model which maps to the 'argo_profiles' table
    return db.query(argo.ArgoProfile).filter(argo.ArgoProfile.float_id == float_id).all()


def get_all_float_locations(db: Session):
    """
    Retrieves the most recent location for every unique float.
    """
    # This is an advanced SQL query that finds the latest record for each float_id
    latest_profiles = db.query(
        argo.ArgoProfile.float_id,
        argo.ArgoProfile.latitude,
        argo.ArgoProfile.longitude,
        argo.ArgoProfile.profile_time
    ).distinct(argo.ArgoProfile.float_id).order_by(
        argo.ArgoProfile.float_id,
        argo.ArgoProfile.profile_time.desc()
    ).all()
    
    return latest_profiles