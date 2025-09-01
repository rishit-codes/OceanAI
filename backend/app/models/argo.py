from sqlalchemy import Column, Integer, DateTime, Float
from sqlalchemy.dialects.postgresql import ARRAY, REAL
from geoalchemy2 import Geometry
from ..utils.database import Base

class ArgoProfile(Base):
    __tablename__ = 'argo_profiles'

    id = Column(Integer, primary_key=True, index=True)
    float_id = Column(Integer, nullable=False)
    cycle_number = Column(Integer, nullable=False)
    profile_time = Column(DateTime(timezone=True), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    pressure_dbar = Column(ARRAY(REAL))
    temperature_celsius = Column(ARRAY(REAL))
    salinity_psu = Column(ARRAY(REAL))
    geom = Column(Geometry(geometry_type='POINT', srid=4326))