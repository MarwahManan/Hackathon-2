## Quick Fix for Calendar Error

### The Problem
The calendar page shows "Error: An error occurred..." because the frontend is trying to connect to the wrong backend port (8000 instead of 8001).

### The Solution - Follow These Steps:

**Step 1: Hard Refresh Your Browser**
1. Open the calendar page: http://localhost:3000/calendar
2. Press **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac)
3. This clears the cached JavaScript and loads the fresh version

**Step 2: If Step 1 Doesn't Work - Clear Browser Cache**
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Clear storage** on the left
4. Click **Clear site data** button
5. Refresh the page

**Step 3: Verify You're Logged In**
1. If you see a login page, sign in again
2. Your JWT token may have expired

**Step 4: Test the Calendar**
1. Navigate to http://localhost:3000/calendar
2. You should now see the calendar grid with dates

### Why This Happened
Next.js embeds environment variables (like `NEXT_PUBLIC_API_URL`) into the JavaScript bundle at build time. When we changed the backend port from 8000 to 8001, the browser was still using the old cached JavaScript that pointed to port 8000.

### Verification
After following the steps above, open DevTools (F12) → Network tab and refresh the calendar page. You should see:
- Request to: `http://localhost:8001/api/tasks/calendar?start_date=...`
- Status: 200 (success) or 401 (need to login)

If you still see errors, please share:
1. The exact error message from the browser console
2. The Request URL from the Network tab
