# 🚀 Career Guidance System - Deployment Script (PowerShell)
# This script helps prepare and deploy the application to Vercel

Write-Host "🎓 Career Guidance System - Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not found. Please initialize git first:" -ForegroundColor Red
    Write-Host "   git init" -ForegroundColor Yellow
    Write-Host "   git add ." -ForegroundColor Yellow
    Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Yellow
    exit 1
}

# Check if remote origin is set
try {
    $origin = git remote get-url origin 2>$null
    if (-not $origin) {
        throw "No origin found"
    }
} catch {
    Write-Host "❌ Git remote origin not found. Please add your GitHub repository:" -ForegroundColor Red
    Write-Host "   git remote add origin https://github.com/yourusername/career-guidance.git" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository found" -ForegroundColor Green

# Check if all dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "server/node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location server
    npm install
    Set-Location ..
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Check if .env file exists in server directory
if (-not (Test-Path "server/.env")) {
    Write-Host "⚠️  Warning: server/.env file not found" -ForegroundColor Yellow
    Write-Host "   Please create server/.env with the following variables:" -ForegroundColor Yellow
    Write-Host "   MONGODB_URI=your_mongodb_connection_string" -ForegroundColor Yellow
    Write-Host "   JWT_SECRET=your_jwt_secret_key" -ForegroundColor Yellow
    Write-Host "   JWT_EXPIRE=7d" -ForegroundColor Yellow
    Write-Host "   NODE_ENV=development" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   For production, set these in Vercel environment variables" -ForegroundColor Yellow
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please check for errors above." -ForegroundColor Red
    exit 1
}

# Check if vercel.json exists
if (-not (Test-Path "vercel.json")) {
    Write-Host "❌ vercel.json not found. Please ensure it exists for deployment." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project ready for deployment" -ForegroundColor Green

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Prepare for deployment" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to GitHub. Please check your git configuration." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Click 'New Project'" -ForegroundColor White
Write-Host "3. Import your GitHub repository" -ForegroundColor White
Write-Host "4. Configure environment variables:" -ForegroundColor White
Write-Host "   - VITE_API_URL: https://your-app-name.vercel.app" -ForegroundColor Yellow
Write-Host "   - MONGODB_URI: your_mongodb_connection_string" -ForegroundColor Yellow
Write-Host "   - JWT_SECRET: your_jwt_secret_key" -ForegroundColor Yellow
Write-Host "   - JWT_EXPIRE: 7d" -ForegroundColor Yellow
Write-Host "   - NODE_ENV: production" -ForegroundColor Yellow
Write-Host "5. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Test Credentials:" -ForegroundColor Cyan
Write-Host "   - User: test@example.com / password123" -ForegroundColor White
Write-Host "   - Admin: admin@careerguidance.com / admin123" -ForegroundColor White 