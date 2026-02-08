# Calendar Page Debugging Guide

## Issue
Calendar page shows "Error: An error occurred..." instead of the calendar grid.

## Root Cause Analysis

The calendar page is failing to load tasks from the API. This could be due to:
1. **API URL mismatch** - Frontend trying to connect to wrong port
2. **Authentication issue** - JWT token not being sent or invalid
3. **CORS issue** - Backend not accepting requests from frontend
4. **Environment variable not loaded** - Browser not picking up NEXT_PUBLIC_API_URL

## Debugging Steps

### Step 1: Check Browser Console
1. Open the calendar page: http://localhost:3000/calendar
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for error messages (red text)
5. **Share the exact error message you see**

### Step 2: Check Network Tab
1. In DevTools, go to Network tab
2. Refresh the calendar page
3. Look for the request to `/api/tasks/calendar`
4. Check:
   - **Request URL**: Should be `http://localhost:8001/api/tasks/calendar?start_date=...&end_date=...`
   - **Status Code**: Should be 200 (if logged in) or 401 (if not logged in)
   - **Response**: What does the response body say?

### Step 3: Verify Authentication
1. Make sure you're logged in
2. Check localStorage in DevTools:
   - Go to Application tab → Local Storage → http://localhost:3000
   - Look for `auth_token` key
   - **Is it present?** If not, you need to log in again

### Step 4: Test API Directly
Open a new terminal and run:
```bash
# Get your auth token from browser localStorage (copy the value)
# Then test the API:
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:8001/api/tasks/calendar
```

## Quick Fix Options

### Option 1: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Try accessing calendar page again

### Option 2: Re-login
1. Log out from the app
2. Close all browser tabs
3. Open a new tab and go to http://localhost:3000
4. Sign in again
5. Navigate to calendar page

### Option 3: Verify Environment Variables
The frontend needs to restart to pick up environment changes:
```bash
# Stop frontend (Ctrl+C in the terminal running npm run dev)
# Then restart:
cd frontend
npm run dev
```

## Expected Behavior

When working correctly:
1. Calendar page loads with month/year header
2. Calendar grid shows 7 columns (days of week)
3. Days are displayed with task indicators
4. No error messages visible

## Common Error Messages and Solutions

### "Network error. Please check your connection."
- **Cause**: Frontend can't reach backend
- **Solution**: Verify backend is running on port 8001
- **Test**: `curl http://localhost:8001/health` should return `{"status":"healthy"}`

### "Not authenticated" or 401 error
- **Cause**: No valid JWT token
- **Solution**: Log in again to get a fresh token

### "An error occurred"
- **Cause**: Generic error from API
- **Solution**: Check browser console for specific error details

## Next Steps

Please:
1. Follow Step 1 and Step 2 above
2. Share the exact error message from the console
3. Share the Network tab details (Request URL and Status Code)

This will help me identify the exact issue and provide a targeted fix.
