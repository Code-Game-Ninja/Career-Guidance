# 🔗 GitHub + Vercel Integration Guide

Complete guide to connect your GitHub repository to Vercel for automatic deployments.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Vercel Account**: You should have a Vercel account
3. **Project Ready**: Your project should be working locally

## 🚀 Step-by-Step Process

### Step 1: Push Your Code to GitHub

If you haven't already, push your project to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Career Guidance System"

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/career-guidance.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect GitHub to Vercel

#### Option A: Through Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **Click "New Project"**

3. **Import Git Repository**:
   - Click "Import Git Repository"
   - Select your GitHub account
   - Find and select your `career-guidance` repository
   - Click "Import"

4. **Configure Project Settings**:
   - **Project Name**: `career-guidance-system` (or your preferred name)
   - **Framework Preset**: Select "Other" (since we have custom configuration)
   - **Root Directory**: Leave as `/` (root of repository)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   Add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://chiragmishra2511:v7KkQn8DSfRSOoMD@cluster0.14dt4v7.mongodb.net/career-guidance
   JWT_SECRET=ajfjaksjfkasjbvkjsbvkjsafjkskjbvjksdvkjsbfekjd
   NODE_ENV=production
   ```

6. **Click "Deploy"**

#### Option B: Through Vercel CLI

```bash
# Login to Vercel
vercel login

# Link to existing project (if you want to keep the same project)
vercel link

# Or create new project from GitHub
vercel --repo https://github.com/your-username/career-guidance.git
```

### Step 3: Configure Build Settings

Your `vercel.json` file should already be configured correctly:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Step 4: Set Up Environment Variables in Vercel Dashboard

1. **Go to your project in Vercel Dashboard**

2. **Navigate to Settings → Environment Variables**

3. **Add these variables**:
   ```
   Name: MONGODB_URI
   Value: mongodb+srv://chiragmishra2511:v7KkQn8DSfRSOoMD@cluster0.14dt4v7.mongodb.net/career-guidance
   Environment: Production, Preview, Development

   Name: JWT_SECRET
   Value: ajfjaksjfkasjbvkjsbvkjsafjkskjbvjksdvkjsbfekjd
   Environment: Production, Preview, Development

   Name: NODE_ENV
   Value: production
   Environment: Production, Preview, Development
   ```

### Step 5: Disable Authentication Protection

1. **Go to your project in Vercel Dashboard**

2. **Navigate to Settings → Security**

3. **Disable "Vercel Authentication"** or set it to "No Protection"

### Step 6: Test Your Deployment

1. **Visit your deployment URL**
2. **Test all features**:
   - Home page loads
   - User registration works
   - Aptitude test functions
   - Admin panel accessible

## 🔄 How Continuous Deployment Works

### Automatic Deployments

Once connected, Vercel will automatically:

- **Deploy on every push** to the main branch
- **Create preview deployments** for pull requests
- **Redeploy** when you merge pull requests

### Branch Strategy

```
main branch → Production deployment
feature branches → Preview deployments
```

## 📝 Development Workflow

### For New Features

1. **Create a new branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make your changes**

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

4. **Create Pull Request** on GitHub

5. **Vercel creates preview deployment** automatically

6. **Test the preview deployment**

7. **Merge to main** → Automatic production deployment

### For Quick Fixes

1. **Make changes directly on main branch**

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Fix issue"
   git push origin main
   ```

3. **Vercel automatically redeploys**

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Vercel build logs
   - Verify all dependencies are in `package.json`
   - Check for syntax errors

2. **Environment Variables**:
   - Ensure all variables are set in Vercel dashboard
   - Check variable names match your code

3. **API Not Working**:
   - Verify MongoDB connection
   - Check JWT secret is set
   - Ensure authentication is disabled

### Debug Commands

```bash
# Check deployment status
vercel ls

# View build logs
vercel logs

# Redeploy manually
vercel --prod

# Check environment variables
vercel env ls
```

## 🌐 Your Deployment URLs

After setup, you'll have:

- **Production**: `https://your-project-name.vercel.app`
- **Preview Deployments**: `https://your-project-name-git-feature-branch-username.vercel.app`

## ✅ Benefits of GitHub + Vercel Integration

1. **Automatic Deployments**: No manual deployment needed
2. **Preview Deployments**: Test changes before merging
3. **Version Control**: Track all changes in Git
4. **Team Collaboration**: Multiple developers can work together
5. **Rollback**: Easy to revert to previous versions
6. **CI/CD**: Complete continuous integration pipeline

## 🎯 Best Practices

1. **Always test locally** before pushing
2. **Use meaningful commit messages**
3. **Create feature branches** for new features
4. **Review preview deployments** before merging
5. **Keep environment variables secure**
6. **Monitor deployment logs** for issues

## 🚀 Final Steps

1. **Push your latest changes** to GitHub
2. **Connect repository** to Vercel
3. **Set environment variables**
4. **Disable authentication protection**
5. **Test your application**
6. **Share your live URL** with users!

---

**Your Career Guidance System will now automatically deploy on every GitHub push! 🎉** 