# Vercel Deployment Fix Guide

## 🔴 Problem: "Internal Server Error" on Signup

Your app is configured for local development but needs production configuration for Vercel.

## Root Causes

1. ❌ **Weak Secrets**: `hackathon-2025-secret-key-change-in-production` is not secure
2. ❌ **Localhost URLs**: Frontend points to `http://localhost:8001` (won't work on Vercel)
3. ❌ **CORS Issues**: Backend only allows `http://localhost:3000`
4. ❌ **Missing Environment Variables**: Vercel doesn't have your `.env` files

## 🔧 Solution: Step-by-Step Fix

### Step 1: Generate Strong Secrets

**Option A: Using OpenSSL (Recommended)**
```bash
# Generate a strong 32-character secret
openssl rand -base64 32
```

**Option B: Using Python**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Option C: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option D: Online Generator**
- Go to: https://generate-secret.vercel.app/32
- Copy the generated secret

**Generate TWO secrets:**
1. One for `JWT_SECRET`
2. One for `BETTER_AUTH_SECRET`

Example output:
```
JWT_SECRET=Xk7mP9nQ2rS5tU8vW1xY4zA6bC9dE2fG5hJ8kL1mN4oP7qR0sT3uV6wX9yZ2aB5c
BETTER_AUTH_SECRET=aB5cD8eF1gH4jK7lM0nP3qR6sT9uV2wX5yZ8aC1bD4eF7gH0jK3lM6nP9qR2sT5u
```

### Step 2: Deploy Backend First

**Where to Deploy Backend:**
- **Option A**: Railway.app (Easiest for Python)
- **Option B**: Render.com (Free tier available)
- **Option C**: Fly.io (Good for FastAPI)

**For Railway.app (Recommended):**

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect FastAPI

**Set Environment Variables on Railway:**
```
DATABASE_URL=postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require

JWT_SECRET=<YOUR_GENERATED_SECRET_1>
BETTER_AUTH_SECRET=<YOUR_GENERATED_SECRET_2>
JWT_ALGORITHM=HS256

ENVIRONMENT=production
LOG_LEVEL=INFO

FRONTEND_URL=https://your-app.vercel.app
```

**Important:** Replace `https://your-app.vercel.app` with your actual Vercel URL after deploying frontend.

6. Deploy and copy the backend URL (e.g., `https://your-app.up.railway.app`)

### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Select the `frontend` folder as root directory

**Set Environment Variables on Vercel:**

Go to Project Settings → Environment Variables → Add:

```
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
DATABASE_URL=postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=<SAME_SECRET_AS_BACKEND>
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important Notes:**
- Use the SAME `BETTER_AUTH_SECRET` on both frontend and backend
- Replace `https://your-backend.up.railway.app` with your actual Railway URL
- Replace `https://your-app.vercel.app` with your actual Vercel URL

6. Click "Deploy"

### Step 4: Update Backend CORS

After getting your Vercel URL, update the backend environment variable:

**On Railway:**
1. Go to your backend project
2. Click "Variables"
3. Update `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
4. Redeploy

### Step 5: Verify Deployment

**Test Backend:**
```bash
curl https://your-backend.up.railway.app/health
# Should return: {"status":"healthy"}
```

**Test Frontend:**
1. Go to your Vercel URL
2. Try to sign up with a new account
3. Should work without errors

## 🔒 Security Best Practices

### Strong Secrets Checklist

✅ **Length**: At least 32 characters
✅ **Randomness**: Use cryptographic random generator
✅ **Uniqueness**: Different for each environment
✅ **Storage**: Never commit to Git
✅ **Rotation**: Change periodically

### Example Strong Secrets

**Bad (Current):**
```
JWT_SECRET=hackathon-2025-secret-key-change-in-production
```

**Good (New):**
```
JWT_SECRET=Xk7mP9nQ2rS5tU8vW1xY4zA6bC9dE2fG5hJ8kL1mN4oP7qR0sT3uV6wX9yZ2aB5c
```

## 🐛 Troubleshooting

### Error: "Not authenticated"
**Cause**: Secrets don't match between frontend and backend
**Fix**: Ensure `BETTER_AUTH_SECRET` is identical on both

### Error: "CORS policy"
**Cause**: Backend doesn't allow frontend URL
**Fix**: Update `FRONTEND_URL` on backend to match Vercel URL

### Error: "Failed to fetch"
**Cause**: Frontend can't reach backend
**Fix**: Check `NEXT_PUBLIC_API_URL` points to correct backend URL

### Error: "Database connection failed"
**Cause**: Invalid `DATABASE_URL`
**Fix**: Verify Neon database URL is correct and accessible

## 📋 Quick Checklist

Before deploying:
- [ ] Generate strong JWT_SECRET (32+ chars)
- [ ] Generate strong BETTER_AUTH_SECRET (32+ chars)
- [ ] Deploy backend first (Railway/Render/Fly.io)
- [ ] Copy backend URL
- [ ] Set all backend environment variables
- [ ] Deploy frontend to Vercel
- [ ] Set all frontend environment variables
- [ ] Update backend CORS with Vercel URL
- [ ] Test signup/signin on production

## 🔗 Deployment URLs

After deployment, you'll have:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-app.up.railway.app
- **Database**: Neon (already set up)

## 📝 Environment Variables Summary

### Backend (Railway/Render/Fly.io)
```env
DATABASE_URL=<neon-connection-string>
JWT_SECRET=<strong-random-secret-1>
BETTER_AUTH_SECRET=<strong-random-secret-2>
JWT_ALGORITHM=HS256
ENVIRONMENT=production
LOG_LEVEL=INFO
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
DATABASE_URL=<neon-connection-string>
BETTER_AUTH_SECRET=<same-as-backend-secret-2>
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 🎯 Next Steps

1. **Generate secrets** using one of the methods above
2. **Deploy backend** to Railway/Render
3. **Deploy frontend** to Vercel
4. **Update environment variables** on both platforms
5. **Test the application** on production URLs

Need help with any specific step? Let me know!
