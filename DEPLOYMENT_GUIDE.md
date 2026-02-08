# 🚀 GitHub & Deployment Guide

## Step 1: Initialize Git Repository

If not already initialized:

```bash
git init
git add .
git commit -m "Initial commit: Complete Mini Course Subscription App"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `MiniCourseSubscriptionApp`
3. Description: "Full-stack MERN course subscription app with Black Friday promo"
4. Make it PUBLIC
5. Click "Create repository"

## Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/MiniCourseSubscriptionApp.git

# Rename default branch to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

---

## Step 4: Deploy Backend to Render

### 4a. Create Render Account
- Go to https://render.com
- Sign up with GitHub (recommended)
- Connect your GitHub account

### 4b. Deploy Backend Service

1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Choose the branch: `main`
4. Configure:
   - **Name:** `mini-course-api`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** `backend`

5. Go to "Advanced" section:
   - Click "Add Environment Variable"
   - Add these variables:
     ```
     PORT=5000
     MONGO_URI=mongodb+srv://admin:admin@cluster0.xir5dho.mongodb.net/minicourseapp?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=supersecretkey123
     NODE_ENV=production
     ```

6. Scroll down and click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy the deployed URL: `https://mini-course-api.onrender.com`

### 4c. Test Backend Deployment

```bash
curl https://YOUR_RENDER_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

---

## Step 5: Deploy Frontend to Netlify

### 5a. Create Netlify Account
- Go to https://netlify.com
- Sign up with GitHub
- Authorize Netlify

### 5b. Deploy Frontend

1. Click "Add new site" → "Import an existing project"
2. Select GitHub and authorize
3. Choose your `MiniCourseSubscriptionApp` repository
4. Configure:
   - **Base Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`

5. Before deploying, click "Edit settings":
   - Add Build Environment Variable:
     ```
     REACT_APP_API_URL=https://YOUR_RENDER_URL
     ```
     (Replace with your actual Render backend URL)

6. Click "Deploy"
7. Wait for build and deployment (3-5 minutes)
8. Your frontend URL: `https://your-site-name.netlify.app`

### 5c. Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add custom domain if you own one
3. Follow DNS instructions

---

## Step 6: Update API URL in Code

Update `frontend/src/services/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

This uses the environment variable from Netlify.

---

## Step 7: Final Testing

1. Open your Netlify URL in browser
2. Test login with: `admin@example.com` / `password123`
3. Browse courses
4. Test free course subscription
5. Test paid course with promo `BFSALE25`
6. Check My Courses page

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Backend URL copied
- [ ] Netlify account created
- [ ] Frontend deployed to Netlify
- [ ] API_URL environment variable set
- [ ] Frontend URL noted
- [ ] Login tested on live site
- [ ] Course subscription tested
- [ ] Promo code validated
- [ ] My Courses page working

---

## 📊 Live URLs Template

Fill in your actual URLs:

```
Frontend URL: https://_____________________.netlify.app
Backend URL:  https://_____________________.onrender.com

Demo Login Credentials:
Email: admin@example.com
Password: password123
```

---

## 🔄 Continuous Deployment

### How It Works

After initial deployment:

1. **Make code changes locally**
2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```
3. **Automatic deployment triggers**
   - Render redeploys backend
   - Netlify redeploys frontend
4. **Changes go live automatically**

### Disable Auto-Deploy (Optional)

If you want manual deployments:
- **Render:** Project settings → Auto Deploy → Disable
- **Netlify:** Site settings → Build & Deploy → Disable Auto Publish

---

## 🔒 Production Security Tips

1. **Change JWT_SECRET:**
   ```bash
   npm run generate-secret  # or use a strong random string
   ```

2. **Use strong MongoDB password:**
   - Create dedicated MongoDB user
   - Use complex password
   - Restrict IP access

3. **Enable HTTPS:**
   - Render: Automatic
   - Netlify: Automatic

4. **Set up monitoring:**
   - Render: Logs available in dashboard
   - Netlify: Deploy previews and logs

5. **Add CORS correctly:**
   ```javascript
   app.use(cors({
     origin: 'https://your-netlify-url.netlify.app',
     credentials: true
   }));
   ```

---

## 🐛 Common Deployment Issues

### Backend showing "Cannot connect to database"
- Check MONGO_URI is correct
- Verify IP whitelist in MongoDB Atlas
- Check internet connection on server

### Frontend showing "Cannot fetch courses"
- Verify REACT_APP_API_URL is set correctly
- Check browser console for CORS errors
- Verify backend is deployed and running

### "Build failed" on Netlify
- Check build logs
- Verify Node version compatibility
- Remove `package-lock.json` and rebuild

### "Service spinning" on Render
- Check logs: Logs tab on Render
- Verify PORT environment variable set
- Check start command is correct

---

## 📚 Additional Resources

- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub: https://github.com/docs

---

## 🎊 Success!

Once deployed:
1. Share your live URL
2. Test thoroughly in production
3. Gather user feedback
4. Plan improvements
5. Iterate and deploy updates

---

**Your Mini Course App is now LIVE! 🎉**
