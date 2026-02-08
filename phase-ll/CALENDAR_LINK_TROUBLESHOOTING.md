## Why You Can't See the Calendar Link

### The Calendar Link Exists But Is Hidden

The calendar link is in the header, but it's only visible when:

1. **You are logged in** ✓ Required
2. **Your browser window is wide enough** ✓ Required (640px or wider)

### Quick Checks

**Check 1: Are you logged in?**
- The calendar link ONLY appears when you're authenticated
- If you see "Sign In" and "Sign Up" buttons, you're NOT logged in
- If you see "My Tasks" and your email, you ARE logged in

**Check 2: Is your browser window wide enough?**
- The calendar link is hidden on mobile/narrow screens
- Try making your browser window wider
- Or check on desktop if you're on mobile

### Solution Steps

**If you're NOT logged in:**
1. Go to http://localhost:3000/signin
2. Sign in with your credentials
3. After login, you should see "My Tasks" in the header
4. The "Calendar" link should appear next to "My Tasks"

**If you ARE logged in but don't see it:**
1. Make your browser window wider (at least 640px)
2. Hard refresh: Press **Ctrl + Shift + R**
3. The Calendar link should appear between "My Tasks" and your email

**Direct Access (Bypass the link):**
Even if you don't see the link, you can access the calendar directly:
- Go to: http://localhost:3000/calendar
- (You must be logged in for this to work)

### What You Should See When Logged In

```
[Todo App]  [Theme Toggle]  [My Tasks]  [📅 Calendar]  [user@email.com]  [Logout]
```

The Calendar link has a calendar icon (📅) next to the text.

### Test It Now

1. **Log in** at http://localhost:3000/signin
2. **Make browser window wide** (desktop size)
3. **Look for the Calendar link** in the header between "My Tasks" and your email
4. **Or go directly to** http://localhost:3000/calendar

Let me know if you're logged in and still don't see it!
