# 🚀 Step-by-Step Render Deployment Guide

## Prerequisites ✅
- [x] GitHub account with repository access
- [x] [Render account](https://render.com) (sign up for free)
- [x] Mistral AI API key (get from [Mistral Console](https://console.mistral.ai/))

---

## 🔹 Step 1: Prepare Your Repository

### 1.1 Push Latest Changes
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 1.2 Verify File Structure
```
JSON-Prompt-Generator/
├── backend/
│   ├── main.py ✅
│   ├── services/
│   ├── requirements.txt ✅
│   └── .env.template ✅
├── frontend/
│   ├── src/
│   ├── package.json ✅
│   └── vite.config.ts ✅
└── README.md
```

---

## 🔹 Step 2: Deploy Backend Service

### 2.1 Create Backend Service
1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Select your repository: `JSON-Prompt-Generator`**

### 2.2 Configure Backend Settings
```
Name: json-prompt-backend
Environment: Python 3
Region: Singapore
Branch: main
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

⚠️ **Important**: Do NOT use `--reload` in production!

### 2.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable":
```
MISTRAL_API_KEY: your_actual_mistral_api_key
PYTHON_VERSION: 3.11
```

### 2.4 Deploy Backend
1. **Click "Create Web Service"**
2. **Wait for deployment** (5-10 minutes)
3. **Check logs for any errors**
4. **Copy the backend URL** (e.g., `https://json-prompt-backend.onrender.com`)

### 2.5 Test Backend
Visit: `https://your-backend-url.onrender.com/health`
Expected response:
```json
{
  "status": "healthy",
  "service": "JSON Prompt Generator Backend",
  "timestamp": "2025-08-10T..."
}
```

---

## 🔹 Step 3: Deploy Frontend Service

### 3.1 Create Frontend Service
1. **In Render Dashboard, click "New +" → "Web Service"**
2. **Connect the SAME repository**
3. **Select your repository again**

### 3.2 Configure Frontend Settings
```
Name: json-prompt-frontend
Environment: Node
Region: Singapore (same as backend)
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Start Command: npm run start
```

⚠️ **Important**: Use `npm run start`, NOT `npm run dev` for production!

### 3.3 Add Environment Variables
```
NODE_VERSION: 18
VITE_API_URL: https://json-prompt-backend.onrender.com
```
*(Replace with your actual backend URL from Step 2.4)*

### 3.4 Deploy Frontend
1. **Click "Create Web Service"**
2. **Wait for deployment** (3-5 minutes)
3. **Copy the frontend URL** (e.g., `https://json-prompt-frontend.onrender.com`)

---

## 🔹 Step 4: Update CORS Configuration

### 4.1 Update Backend Environment Variables
1. **Go to your backend service in Render**
2. **Click "Environment"**
3. **Add new environment variable:**
```
ADDITIONAL_ORIGINS: https://json-prompt-frontend.onrender.com
```
*(Replace with your actual frontend URL)*

### 4.2 Redeploy Backend
1. **Go to "Manual Deploy"**
2. **Click "Deploy latest commit"**
3. **Wait for redeployment**

---

## 🔹 Step 5: Test Your Application

### 5.1 Access Your Frontend
Visit your frontend URL: `https://json-prompt-frontend.onrender.com`

### 5.2 Test Functionality
1. **Enter text in the input field**
2. **Click "Convert to JSON"**
3. **Verify JSON output appears**
4. **Test copy to clipboard**
5. **Check browser console for errors** (F12)

### 5.3 Test Different Devices
- Desktop browser
- Mobile browser
- Different screen sizes

---

## 🔧 Troubleshooting Common Issues

### CORS Errors
**Symptoms**: Frontend loads but API calls fail with CORS errors
**Solution**:
1. Check that frontend URL is in backend `ADDITIONAL_ORIGINS`
2. Verify no typos in URLs
3. Redeploy backend after CORS changes

### Build Failures
**Symptoms**: Deployment fails during build
**Solution**:
1. Check build logs in Render dashboard
2. Verify all dependencies are in requirements.txt/package.json
3. Test build locally first

### API Connection Errors
**Symptoms**: "Failed to convert text" or network errors
**Solution**:
1. Verify `VITE_API_URL` points to correct backend
2. Test backend health endpoint directly
3. Check browser network tab for failed requests

### Environment Variables Not Working
**Symptoms**: Features not working despite correct setup
**Solution**:
1. Double-check variable names (case-sensitive)
2. Ensure no extra spaces in values
3. Redeploy service after adding variables

---

## 📊 Monitoring Your Deployment

### Health Checks
- **Backend Health**: `https://your-backend.onrender.com/health`
- **Frontend**: `https://your-frontend.onrender.com`

### View Logs
1. **Go to your service in Render Dashboard**
2. **Click "Logs" tab**
3. **Monitor for errors or issues**

### Performance
- **Free tier services sleep after 15 minutes of inactivity**
- **First request after sleep may take 30+ seconds**
- **Consider upgrading for production use**

---

## 🎉 Success Checklist

- [ ] Backend service shows "Live" status
- [ ] Frontend service shows "Live" status  
- [ ] Backend health endpoint responds correctly
- [ ] Frontend loads without console errors
- [ ] Text-to-JSON conversion works end-to-end
- [ ] Copy to clipboard functions
- [ ] Mobile interface is responsive
- [ ] No CORS errors in browser console

---

## 📝 Your Live URLs

Once deployed, save these URLs:

- **Frontend**: `https://json-prompt-frontend.onrender.com`
- **Backend API**: `https://json-prompt-backend.onrender.com`
- **Health Check**: `https://json-prompt-backend.onrender.com/health`

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render service logs
3. Test the application locally first
4. Verify all environment variables are set correctly

**Congratulations! 🎉 Your JSON Prompt Generator is now live on Render!**
