# Complete Deployment Fix for Vercel + Hugging Face

## 🔴 Problem Identified

Your backend CORS was hardcoded to only allow `localhost`, blocking all requests from Vercel.

## ✅ Solution Applied

Updated `backend/app/main.py` to read allowed origins from environment variable.

## 🚀 Deployment Steps

### Step 1: Update Backend on Hugging Face

**You need to set this environment variable on Hugging Face:**

1. Go to https://huggingface.co/spaces/marwah-manan/phase-2
2. Click "Settings" tab
3. Scroll to "Repository secrets" or "Variables"
4. Add/Update these variables:

```
FRONTEND_URL=https://your-vercel-app.vercel.app
JWT_SECRET=+Za4/nUVei8WmPalvf3bDYNt76peHiMToj2l3h2Lgr0=
BETTER_AUTH_SECRET=GVuMWpMtLu+yF2lmYOYNTSsJmEeU6hq0ugV/unLkRQA=
DATABASE_URL=postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Important:** Replace `https://your-vercel-app.vercel.app` with your actual Vercel URL

5. Commit and push the updated `main.py` file to trigger redeployment
6. Wait for Hugging Face to rebuild

### Step 2: Update Frontend on Vercel

**Set these environment variables on Vercel:**

1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add/Update:

```
NEXT_PUBLIC_API_URL=https://marwah-manan-phase-2.hf.space
BETTER_AUTH_SECRET=GVuMWpMtLu+yF2lmYOYNTSsJmEeU6hq0ugV/unLkRQA=
DATABASE_URL=postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

4. Click "Deployments" → "Redeploy"

### Step 3: Push Updated Code

**Commit and push the changes:**

```bash
cd backend
git add app/main.py
git commit -m "Fix CORS for production deployment"
git push
```

This will trigger Hugging Face to rebuild with the new CORS settings.

### Step 4: Test the Deployment

**After both redeploy:**

1. Go to your Vercel URL
2. Open browser DevTools (F12) → Console tab
3. Try to sign up
4. Check for errors

**Expected behavior:**
- ✅ No CORS errors
- ✅ Signup works
- ✅ Can create tasks

## 🔍 How to Verify CORS is Fixed

**Test 1: Check Backend CORS**
```bash
curl -H "Origin: https://your-vercel-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://marwah-manan-phase-2.hf.space/api/auth/signup -v
```

Should return headers with:
```
Access-Control-Allow-Origin: https://your-vercel-app.vercel.app
```

**Test 2: Check in Browser**
1. Go to your Vercel app
2. Open DevTools (F12) → Network tab
3. Try to sign up
4. Look at the request to `/api/auth/signup`
5. Should NOT see CORS error

## 🐛 Common Issues After Fix

### Issue 1: Still Getting CORS Error
**Cause:** Environment variable not set on Hugging Face
**Fix:** Double-check `FRONTEND_URL` is set correctly

### Issue 2: "Not authenticated" Error
**Cause:** Secrets don't match
**Fix:** Ensure `BETTER_AUTH_SECRET` is identical on both platforms

### Issue 3: "Failed to fetch"
**Cause:** Wrong API URL on Vercel
**Fix:** Verify `NEXT_PUBLIC_API_URL=https://marwah-manan-phase-2.hf.space`

## 📋 Checklist

Before testing:
- [ ] Updated `main.py` with dynamic CORS
- [ ] Pushed changes to GitHub
- [ ] Set `FRONTEND_URL` on Hugging Face to Vercel URL
- [ ] Set `NEXT_PUBLIC_API_URL` on Vercel to Hugging Face URL
- [ ] Both secrets match on both platforms
- [ ] Both platforms redeployed
- [ ] Waited for builds to complete

## 🎯 What Changed

**Before (Broken):**
```python
allow_origins=["http://localhost:3000", "http://localhost:3001"]
# ❌ Only allows localhost
```

**After (Fixed):**
```python
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    settings.FRONTEND_URL,  # ✅ Reads from environment
]
```

Now your backend will accept requests from:
- localhost (for development)
- Your Vercel URL (for production)

## 🔗 Your URLs

- **Frontend (Vercel):** https://your-vercel-app.vercel.app
- **Backend (Hugging Face):** https://marwah-manan-phase-2.hf.space
- **Database (Neon):** Already configured

## 📝 Next Steps

1. **Push the updated code** to trigger Hugging Face rebuild
2. **Set environment variables** on both platforms
3. **Wait for deployments** to complete (5-10 minutes)
4. **Test signup** on your Vercel URL
5. **Report back** if you still see errors

Need help with any specific step? Let me know!
