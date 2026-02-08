## ✅ Calendar Feature - Final Setup Instructions

### Current Status
- ✅ Backend running on port 8001
- ✅ Frontend running on port 3000
- ✅ Calendar endpoint `/api/tasks/calendar` is working (returns "Not authenticated" which is correct)
- ✅ All calendar components created and in correct location

### The Issue
The calendar page shows "Error: An error occurred..." because:
1. Your browser cached old JavaScript that points to the wrong API port
2. You may need to log in again to get a fresh authentication token

### Solution - Follow These Steps Exactly:

#### Step 1: Clear Browser Cache (IMPORTANT)
1. Open your browser
2. Press **Ctrl + Shift + Delete** (Windows) or **Cmd + Shift + Delete** (Mac)
3. Select "Cached images and files"
4. Click "Clear data"

OR use this faster method:
1. Go to http://localhost:3000
2. Press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac) for hard refresh

#### Step 2: Log In Again
1. Go to http://localhost:3000
2. Click "Sign In"
3. Enter your credentials
4. You should be redirected to the tasks page

#### Step 3: Access Calendar
1. Click "Calendar" in the header navigation
2. You should now see:
   - Month/year header (e.g., "February 2026")
   - Navigation buttons (Previous, Today, Next)
   - Calendar grid with 7 columns (Sun-Sat)
   - Days of the month displayed
   - Task summary cards at the bottom

### Testing the Calendar

#### Create a Task with Due Date:
1. Go to "My Tasks"
2. Click "New Task"
3. Fill in:
   - Title: "Test Calendar Task"
   - Description: "Testing calendar feature"
   - Due Date: Select tomorrow's date
4. Click "Save Task"

#### View in Calendar:
1. Click "Calendar" in the header
2. Your task should appear on the selected date
3. Navigate between months using the arrow buttons

### Troubleshooting

If you still see an error after following the steps above:

**Option A: Check Browser Console**
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for red error messages
4. Share the exact error message with me

**Option B: Check Network Tab**
1. Press F12 to open DevTools
2. Go to Network tab
3. Refresh the calendar page
4. Look for the request to `/api/tasks/calendar`
5. Check the Request URL - it should be: `http://localhost:8001/api/tasks/calendar?start_date=...`
6. Check the Status Code - should be 200 (success)

**Option C: Verify Authentication**
1. Press F12 to open DevTools
2. Go to Application tab
3. Click "Local Storage" → "http://localhost:3000"
4. Look for `auth_token` key
5. If it's missing or expired, log in again

### What You Should See

**Calendar Page (Working):**
```
Calendar
View your tasks in a monthly calendar

[February 2026]  [← Previous] [Today] [Next →]

Sun  Mon  Tue  Wed  Thu  Fri  Sat
                          1    2    3
 4    5    6    7    8    9   10
11   12   13   14   15   16   17
18   19   20   21   22   23   24
25   26   27   28

[Total Tasks: 0] [Completed: 0] [Pending: 0]
```

### API Endpoints Available

- `GET /api/tasks/calendar?start_date=...&end_date=...` - Get tasks for calendar view
- `POST /api/tasks` - Create task (with optional dueDate, recurrencePattern, recurrenceEndDate)
- `PUT /api/tasks/{id}` - Update task (including calendar fields)
- `GET /api/tasks` - Get all tasks

### Need More Help?

If the calendar still doesn't work after following these steps, please share:
1. Screenshot of the error
2. Error message from browser console (F12 → Console tab)
3. Network request details (F12 → Network tab → click on the failed request)

This will help me provide a more specific fix.
