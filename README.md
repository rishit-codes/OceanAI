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

## 🐳 Docker Setup (Recommended)

### Start Database
```bash
docker-compose up -d
```

### Stop Database
```bash
docker-compose down
```

### Reset Database (with data cleanup)
```bash
docker-compose down -v
docker-compose up -d
```

## 🔧 Backend Setup

### 1. Create Virtual Environment
```bash
python -m venv venv_new
source venv_new/bin/activate  # On Windows: venv_new\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Setup
Create `.env` file in the root directory:
```bash
cp .env.example .env  # If example exists, or create manually
```

### 4. Initialize Database
```bash
python init_db.py
```

### 5. Run Backend Server
```bash
# Development mode
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Environment Setup
Create `.env` file in the frontend directory:
```bash
cp .env.example .env  # If example exists, or create manually
```

### 4. Run Development Server
```bash
npm run dev
# or
bun run dev
```

### 5. Build for Production
```bash
npm run build
# or
bun run build
```

### 6. Preview Production Build
```bash
npm run preview
# or
bun run preview
```

Frontend will be available at: `http://localhost:5173`

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

## 🐋 Docker Commands Reference

### Database Management
```bash
# Start database
docker-compose up -d

# View logs
docker-compose logs -f

# Stop database
docker-compose down

## 🌐 Netlify Deployment

### Frontend Deployment to Netlify

#### Method 1: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Netlify will auto-detect settings from `netlify.toml`

#### Method 2: Manual Deploy
```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Netlify (install Netlify CLI first)
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

#### Environment Variables for Netlify
In Netlify dashboard, add these environment variables:
```
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
VITE_APP_TITLE=Ocean AI Platform
```

### Backend Deployment Options
Since Netlify only hosts static sites, deploy your backend to:
- **Railway**: `railway login && railway deploy`
- **Render**: Connect GitHub repo
- **Heroku**: `git push heroku main`
- **DigitalOcean App Platform**

### Production URLs
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-backend.railway.app` (or other service)

# Reset database with volume cleanup
docker-compose down -v && docker-compose up -d

# Access database shell
docker exec -it oceanai_db psql -U oceanuser -d oceandb
```

### Container Management
```bash
# List running containers
docker ps

# Stop specific container
docker stop oceanai_db

# Remove container
docker rm oceanai_db

# View container logs
docker logs oceanai_db
```

## 🛠️ Development Commands

### Backend Commands
```bash
# Run with auto-reload
uvicorn backend.app.main:app --reload

# Run tests
python -m pytest backend/app/tests/

# Check code style
flake8 backend/

# Format code
black backend/
```

### Frontend Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📊 Database Configuration

### Default Database Settings
- **Host**: localhost
- **Port**: 5432
- **Database**: oceandb
- **Username**: oceanuser
- **Password**: oceanpassword

### Connection String
```
postgresql://oceanuser:oceanpassword@localhost:5432/oceandb
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 8000
   lsof -ti:8000 | xargs kill -9
   
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Database Connection Issues**
   ```bash
   # Restart database
   docker-compose restart
   
   # Check database status
   docker-compose ps
   ```

3. **Python Dependencies Issues**
   ```bash
   # Recreate virtual environment
   rm -rf venv_new
   python -m venv venv_new
   source venv_new/bin/activate
   pip install -r requirements.txt
   ```

4. **Node Dependencies Issues**
   ```bash
   # Clear cache and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🚀 Production Deployment

### Backend Production
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn backend.app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Production
```bash
# Build for production
cd frontend
npm run build

# Serve with a static server
npx serve -s dist -l 3000
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://oceanuser:oceanpassword@localhost:5432/oceandb
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
GOOGLE_APPLICATION_CREDENTIALS=service-account.json
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_TITLE=Ocean AI Platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 🔧 Deployment Files

- `netlify.toml` - Netlify build configuration
- `frontend/_redirects` - SPA routing support
- Environment variables configured in Netlify dashboard

## 📄 License

This project is licensed under the MIT License.