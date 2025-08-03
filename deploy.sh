#!/bin/bash

# 🚀 Career Guidance System - Deployment Script
# This script helps prepare and deploy the application to Vercel

echo "🎓 Career Guidance System - Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Git remote origin not found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/career-guidance.git"
    exit 1
fi

echo "✅ Git repository found"

# Check if all dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server && npm install && cd ..
fi

echo "✅ Dependencies installed"

# Check if .env file exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file not found"
    echo "   Please create server/.env with the following variables:"
    echo "   MONGODB_URI=your_mongodb_connection_string"
    echo "   JWT_SECRET=your_jwt_secret_key"
    echo "   JWT_EXPIRE=7d"
    echo "   NODE_ENV=development"
    echo ""
    echo "   For production, set these in Vercel environment variables"
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found. Please ensure it exists for deployment."
    exit 1
fi

echo "✅ Project ready for deployment"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Prepare for deployment" 2>/dev/null || echo "No changes to commit"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub"
else
    echo "❌ Failed to push to GitHub. Please check your git configuration."
    exit 1
fi

echo ""
echo "🎉 Deployment Preparation Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository"
echo "4. Configure environment variables:"
echo "   - VITE_API_URL: https://your-app-name.vercel.app"
echo "   - MONGODB_URI: your_mongodb_connection_string"
echo "   - JWT_SECRET: your_jwt_secret_key"
echo "   - JWT_EXPIRE: 7d"
echo "   - NODE_ENV: production"
echo "5. Click 'Deploy'"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🔑 Test Credentials:"
echo "   - User: test@example.com / password123"
echo "   - Admin: admin@careerguidance.com / admin123" 