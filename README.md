# Ocean AI - Next-Generation Oceanographic Data Intelligence Platform

A comprehensive platform for oceanographic data analysis and AI-powered insights using ARGO float data.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker setup)

## 📁 Project Structure

```
OceanAI/
├── backend/           # FastAPI backend
├── frontend/          # React + Vite frontend
├── data/             # Data storage and processing
├── docker-compose.yml # Docker configuration
└── requirements.txt   # Python dependencies
```


## 🔄 Full Development Workflow

### 1. Start Database
```bash
docker-compose up -d
```

### 2. Start Backend (Terminal 1)
```bash
source venv_new/bin/activate
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### 4. Access Applications
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Database: `localhost:5432`

# Stop database
docker-compose down
