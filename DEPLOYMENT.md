# Deployment Guide

This guide will help you deploy both the frontend and backend of the Career Guidance application to Vercel and push the project to GitHub.

## 🚀 Prerequisites

1. **GitHub Account**: Create a repository on GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: Set up a MongoDB database (free tier available)
4. **Node.js**: Ensure you have Node.js installed locally

## 📋 Step 1: Prepare Your Project

### 1.1 Update Environment Variables

Copy `env.example` to `.env` and update the values:

```bash
cp env.example .env
```

Update the `.env` file with your actual values:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000

# Backend Environment Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-guidance
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
PORT=5000
```

### 1.2 Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## 🗄️ Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace `mongodb+srv://username:password@cluster.mongodb.net/career-guidance` in your `.env` file

## 🚀 Step 3: Deploy Backend to Vercel

### 3.1 Deploy Backend

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Backend**:
   ```bash
   cd server
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `career-guidance-backend`
   - Directory: `./` (current directory)
   - Override settings: `N`

5. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   ```

6. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

### 3.2 Get Backend URL

After deployment, you'll get a URL like: `https://career-guidance-backend-xxx.vercel.app`

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Update Frontend Environment

Update your `.env` file with the backend URL:

```env
VITE_API_URL=https://your-backend-vercel-url.vercel.app
```

### 4.2 Deploy Frontend

1. **Go back to root directory**:
   ```bash
   cd ..
   ```

2. **Deploy Frontend**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `career-guidance-frontend`
   - Directory: `./` (current directory)
   - Override settings: `N`

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_API_URL
   ```

5. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

## 📚 Step 5: Push to GitHub

### 5.1 Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Career Guidance Application"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/career-guidance.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5.2 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `career-guidance`
4. Make it public or private
5. Don't initialize with README (we already have one)
6. Copy the repository URL

## 🔧 Step 6: Configure Vercel with GitHub

### 6.1 Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (for frontend)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 6.2 Set Environment Variables in Vercel Dashboard

For Frontend:
- `VITE_API_URL`: Your backend Vercel URL

For Backend:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key

## 🔄 Step 7: Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy when you push to `main` branch
- Create preview deployments for pull requests
- Update your production site automatically

## 📝 Step 8: Update Documentation

Update your `README.md` with deployment information:

```markdown
## 🚀 Live Demo

- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.vercel.app

## 🔧 Environment Variables

See `env.example` for required environment variables.
```

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **Environment Variables**: Double-check all environment variables are set in Vercel
3. **MongoDB Connection**: Verify your MongoDB Atlas connection string
4. **Build Errors**: Check the build logs in Vercel dashboard

### Useful Commands:

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod

# Remove deployment
vercel remove
```

## 🎉 Success!

Your Career Guidance application is now:
- ✅ Deployed on Vercel (Frontend & Backend)
- ✅ Connected to MongoDB Atlas
- ✅ Pushed to GitHub
- ✅ Set up for continuous deployment

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [GitHub Documentation](https://docs.github.com/)

---

**Note**: Remember to never commit sensitive information like API keys or database credentials to your repository. Always use environment variables for sensitive data. 