# 🚀 Unified Deployment Guide - Career Guidance System

This guide will help you deploy both the frontend and backend as a single Vercel project.

## 📋 Prerequisites

1. **Vercel Account**: Make sure you have a Vercel account
2. **MongoDB Atlas**: Your database should be set up
3. **GitHub Repository**: Your code should be pushed to GitHub

## 🔧 Project Structure

```
career-guidance/
├── src/                    # Frontend React code
├── server/                 # Backend Node.js code
├── public/                 # Static assets
├── vercel.json            # Unified Vercel configuration
├── package.json           # Frontend dependencies
└── server/package.json    # Backend dependencies
```

## 🚀 Deployment Steps

### Step 1: Prepare Environment Variables

You'll need to set these environment variables in Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/career-guidance

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Environment
NODE_ENV=production

# API URL (for development fallback)
VITE_API_URL=/api
```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy the Project**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add the variables listed above

### Step 3: Configure Build Settings

The `vercel.json` file handles:
- **Frontend Build**: Static build from `dist/` directory
- **Backend Functions**: Serverless functions from `server/server.js`
- **Routing**: API routes go to backend, others to frontend

## 🔄 How It Works

### Routing Logic
- **API Routes** (`/api/*`) → Backend serverless functions
- **All Other Routes** (`/*`) → Frontend React app

### Build Process
1. **Frontend**: Vite builds the React app to `dist/`
2. **Backend**: Node.js server becomes serverless functions
3. **Deployment**: Both are deployed to the same domain

## 🌐 Access Your Application

After deployment, you'll get a URL like:
```
https://your-project-name.vercel.app
```

- **Frontend**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api`

## ✅ Benefits of Unified Deployment

1. **Single Domain**: No CORS issues
2. **Simplified Management**: One project to maintain
3. **Better Performance**: No cross-domain requests
4. **Easier Debugging**: All logs in one place
5. **Cost Effective**: Single deployment

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are installed
   - Verify `vercel.json` configuration
   - Check environment variables

2. **API Not Working**:
   - Verify MongoDB connection string
   - Check JWT secret is set
   - Ensure environment variables are correct

3. **Frontend Not Loading**:
   - Check build output in Vercel logs
   - Verify routing configuration
   - Check for JavaScript errors

### Debug Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

## 📱 Testing Your Deployment

1. **Home Page**: Should load the landing page
2. **User Registration**: Should create new users
3. **Aptitude Test**: Should work end-to-end
4. **Admin Panel**: Should be accessible with admin credentials
5. **API Endpoints**: Should respond correctly

## 🎉 Success!

Once deployed, your Career Guidance System will be:
- ✅ **Fully Functional**: All features working
- ✅ **Responsive**: Works on all devices
- ✅ **Secure**: Protected with JWT authentication
- ✅ **Scalable**: Built on Vercel's infrastructure
- ✅ **Fast**: Optimized for performance

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Keep your application up-to-date

---

**Happy Deploying! 🚀** 