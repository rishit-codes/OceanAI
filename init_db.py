#!/usr/bin/env python3
import sys
import os
sys.path.append('/home/ayush/ocean-ai/backend')

from backend.app.utils.database import Base, engine
from backend.app.models.argo import ArgoProfile

def init_database():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

if __name__ == "__main__":
    init_database()