# OceanAI: Next-Generation Oceanographic Data Intelligence Platform

OceanAI is a cutting-edge AI-powered platform that democratizes access to complex oceanographic data through natural language interfaces, real-time analytics, and intelligent visualization. Built for scalability and enterprise adoption, it transforms how researchers, policymakers, and industry professionals interact with ocean data. 


# Key MVP Features

Core Data Pipeline: Automated ingestion and processing of ARGO NetCDF data into a high-performance PostgreSQL database and Parquet files. 

AI Conversation Engine: A fully integrated AI assistant that uses Retrieval-Augmented Generation (RAG) to answer natural language questions with real data from the database. 

Interactive Visualization Suite: A user-friendly dashboard for visualizing ocean data, featuring a 3D globe, real-time float trackers, and interactive charts. 


# Project Structure
.
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI application entry point
│   │   ├── models/             # SQLAlchemy ORM models (e.g., argo.py)
│   │   ├── routers/            # API endpoints (e.g., chat.py, data.py)
│   │   ├── services/           # Business logic (e.g., llm_service.py, query_service.py)
│   │   └── utils/              # Utility functions (e.g., database.py)
│   ├── .env                    # Backend environment variables (SECRET)
│   └── service-account-key.json # Google Cloud credentials (SECRET)
├── data/
│   ├── processed/
│   │   └── .gitkeep            # Folder for generated Parquet files
│   ├── sample_argo/
│   │   └── .gitkeep            # Folder for raw .nc sample data
│   └── scripts/
│       ├── setup_db.py         # Initializes the database schema
│       └── ingest_argo.py      # Ingests raw data into the database
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/                # API client configuration
│   │   ├── components/         # Reusable React components (Map, Chat, UI)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Application pages (Dashboard, Analytics)
│   │   └── App.tsx             # Main React application component with routing
│   ├── .env                    # Frontend environment variables
│   └── package.json            # Frontend dependencies and scripts
├── .gitignore                  # Specifies files to be ignored by Git
└── docker-compose.yml          # Defines the Docker services (e.g., PostgreSQL DB)