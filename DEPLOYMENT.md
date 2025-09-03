# 🚀 Production Deployment Guide

Complete deployment setup for Ocean AI using Netlify + Render + Supabase.

## 📋 Deployment Stack
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: Supabase (PostgreSQL + PostGIS)
- **Storage**: Supabase Storage

## 🗄️ Step 1: Setup Supabase Database

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and API keys

### 2. Enable PostGIS Extension
```sql
-- Run in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 3. Get Connection Details
- Project URL: `https://[project-ref].supabase.co`
- Database URL: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
- Anon Key: From Settings > API
- Service Role Key: From Settings > API

## 🖥️ Step 2: Deploy Backend to Render

### 1. Connect Repository
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Choose "Web Service"

### 2. Configure Build Settings
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
- **Python Version**: 3.11

### 3. Set Environment Variables
```
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
CORS_ORIGINS=https://your-frontend.netlify.app
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Deploy
- Click "Create Web Service"
- Note your backend URL: `https://your-backend.onrender.com`

## 🌐 Step 3: Deploy Frontend to Netlify

### 1. Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. "New site from Git"
3. Choose your repository
4. Netlify auto-detects settings from `netlify.toml`

### 2. Update Environment Variables
In Netlify dashboard, set:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1
VITE_APP_TITLE=Ocean AI Platform
```

### 3. Update CORS Origins
Update your Render backend environment:
```
CORS_ORIGINS=https://your-frontend.netlify.app
```

## 🔄 Step 4: Update Configuration Files

### Update netlify.toml
```toml
[build.environment]
  VITE_API_BASE_URL = "https://your-actual-backend.onrender.com/api/v1"
```

### Update Backend Database Connection
Replace local PostgreSQL with Supabase connection string in your backend code.

## ✅ Step 5: Test Deployment

### Frontend Tests
- Visit: `https://your-frontend.netlify.app`
- Check console for API connection errors
- Test all routes and features

### Backend Tests
- Visit: `https://your-backend.onrender.com/docs`
- Test API endpoints
- Verify database connection

### Database Tests
- Check Supabase dashboard for data
- Verify PostGIS extension is working
- Test data ingestion

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update `CORS_ORIGINS` in Render
   - Redeploy backend

2. **Database Connection**
   - Verify Supabase connection string
   - Check firewall settings

3. **Build Failures**
   - Check Python version (3.11)
   - Verify requirements.txt

4. **Environment Variables**
   - Ensure all vars are set in both services
   - No trailing spaces in values

## 📊 Production URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Docs**: `https://your-backend.onrender.com/docs`
- **Database**: Supabase Dashboard

## 🔄 Continuous Deployment

Both services auto-deploy on git push:
- **Netlify**: Deploys on push to main branch
- **Render**: Deploys on push to main branch
- **Database**: Managed by Supabase

## 💰 Cost Estimate

- **Netlify**: Free tier (100GB bandwidth)
- **Render**: Free tier (750 hours/month)
- **Supabase**: Free tier (500MB database, 1GB storage)

Total: **$0/month** for development/small projects