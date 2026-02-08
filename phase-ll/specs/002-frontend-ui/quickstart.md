# Quickstart Guide: Frontend & UI Setup

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08
**Prerequisites**: Node.js 18+, npm or yarn, Backend API running

## Overview

This guide provides step-by-step instructions to set up and run the Next.js frontend application locally.

---

## Prerequisites

### Required Software
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Git**: For version control

### Verify Installation
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
```

### Backend API
The frontend requires the FastAPI backend to be running. Ensure the backend is accessible at:
- Development: `http://localhost:8000`
- Production: Configure via environment variable

---

## Initial Setup

### 1. Create Next.js Project

```bash
# Navigate to project root
cd "C:\Users\HP I5 6th Gen\Desktop\Hackathon 2\phase-ll"

# Create Next.js app with TypeScript and App Router
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Navigate to frontend directory
cd frontend
```

**Options Selected**:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory (use app/ directly)
- ✅ Import alias (@/*)

### 2. Install Dependencies

```bash
# Core dependencies
npm install axios better-auth

# Development dependencies
npm install --save-dev @types/node @types/react @types/react-dom

# Optional: Testing dependencies (for future)
# npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Dependencies Explained**:
- `axios`: HTTP client for API calls with interceptors
- `better-auth`: Authentication library with JWT support
- `@types/*`: TypeScript type definitions

### 3. Configure Environment Variables

Create `.env.local` file in the `frontend/` directory:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**:
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `BETTER_AUTH_SECRET` must match the backend secret
- Never commit `.env.local` to version control

Create `.env.example` for documentation:

```bash
# .env.example
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configure Next.js

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable experimental features if needed
  experimental: {
    // serverActions: true, // Uncomment if using server actions
  },

  // Configure API proxy (optional, for CORS issues)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
```

### 5. Configure Tailwind CSS

Update `tailwind.config.js` for responsive design:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',   // Mobile
        'sm': '640px',   // Large mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop
        'xl': '1280px',  // Large desktop
        '2xl': '1536px', // Extra large desktop
      },
      spacing: {
        '18': '4.5rem',  // 72px for touch targets (18 * 4px)
      },
      minHeight: {
        'touch': '44px', // Minimum touch target height
      },
      minWidth: {
        'touch': '44px', // Minimum touch target width
      },
    },
  },
  plugins: [],
}
```

### 6. Configure TypeScript

Update `tsconfig.json` (should be auto-generated):

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Project Structure Setup

### 7. Create Directory Structure

```bash
# From frontend/ directory
mkdir -p app/(auth)/login
mkdir -p app/(auth)/signup
mkdir -p app/(protected)/tasks/new
mkdir -p app/(protected)/tasks/[id]/edit
mkdir -p components/ui
mkdir -p components/tasks
mkdir -p components/auth
mkdir -p components/layout
mkdir -p lib/api
mkdir -p lib/auth
mkdir -p lib/hooks
mkdir -p lib/utils
mkdir -p lib/context
mkdir -p types
mkdir -p public/images
mkdir -p public/icons
```

### 8. Create Type Definitions

Create `types/auth.ts`, `types/task.ts`, `types/api.ts`, `types/ui.ts` as defined in `data-model.md`.

**Quick Start**: Copy type definitions from `specs/002-frontend-ui/data-model.md`

---

## Running the Application

### Development Mode

```bash
# From frontend/ directory
npm run dev
```

**Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000 (must be running separately)

**Expected Output**:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## Verification Checklist

### ✅ Setup Verification

After setup, verify the following:

1. **Node.js and npm installed**
   ```bash
   node --version  # v18.0.0+
   npm --version   # 9.0.0+
   ```

2. **Dependencies installed**
   ```bash
   ls node_modules | grep -E "axios|better-auth|next|react"
   ```

3. **Environment variables configured**
   ```bash
   cat .env.local  # Should show API_URL and secrets
   ```

4. **Development server starts**
   ```bash
   npm run dev  # Should start without errors
   ```

5. **Backend API accessible**
   ```bash
   curl http://localhost:8000/api/health  # Should return 200 OK
   ```

### ✅ Functionality Verification

Once the app is running:

1. **Home page loads**: Navigate to http://localhost:3000
2. **Signup page accessible**: Navigate to http://localhost:3000/signup
3. **Login page accessible**: Navigate to http://localhost:3000/login
4. **Protected routes redirect**: Navigate to http://localhost:3000/tasks (should redirect to login)
5. **Tailwind CSS working**: Check if styles are applied
6. **API connection**: Check browser console for CORS errors

---

## Common Issues and Solutions

### Issue 1: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Option 1: Kill process on port 3000
npx kill-port 3000

# Option 2: Use different port
PORT=3001 npm run dev
```

### Issue 2: CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Ensure backend has CORS configured:
   ```python
   # Backend: main.py
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. Ensure `withCredentials: true` in Axios config:
   ```typescript
   // lib/api/client.ts
   const apiClient = axios.create({
     withCredentials: true
   })
   ```

### Issue 3: Environment Variables Not Loading

**Error**: `process.env.NEXT_PUBLIC_API_URL is undefined`

**Solution**:
1. Ensure `.env.local` exists in `frontend/` directory
2. Restart development server (env changes require restart)
3. Verify variable names start with `NEXT_PUBLIC_` for client-side access

### Issue 4: Module Not Found

**Error**: `Module not found: Can't resolve '@/components/...'`

**Solution**:
1. Verify `tsconfig.json` has correct paths configuration
2. Ensure files exist at the specified paths
3. Restart TypeScript server in IDE

### Issue 5: Tailwind Styles Not Applied

**Error**: Styles not appearing in browser

**Solution**:
1. Verify `tailwind.config.js` content paths include your files
2. Ensure `globals.css` imports Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart development server

---

## Development Workflow

### 1. Start Backend API
```bash
# In backend directory
uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend Dev Server
```bash
# In frontend directory
npm run dev
```

### 3. Make Changes
- Edit files in `app/`, `components/`, `lib/`
- Changes auto-reload via Hot Module Replacement (HMR)
- Check browser console for errors

### 4. Test Changes
- Manual testing in browser
- Check responsive design (DevTools → Toggle device toolbar)
- Test API integration (Network tab)

### 5. Commit Changes
```bash
git add .
git commit -m "feat: implement user authentication"
git push origin 002-frontend-ui
```

---

## Next Steps

After setup is complete:

1. **Implement Authentication** (Priority: P1)
   - Create Better Auth configuration
   - Implement login/signup pages
   - Set up JWT token management

2. **Implement Task Management** (Priority: P1)
   - Create task list page
   - Implement CRUD operations
   - Add completion toggle

3. **Add Responsive Design** (Priority: P3)
   - Test on mobile viewports
   - Optimize touch targets
   - Refine layouts

4. **Testing and Validation**
   - Manual testing of all features
   - Cross-browser testing
   - Responsive design validation

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Package Management
npm install <package>    # Install new package
npm update               # Update dependencies
npm outdated             # Check for outdated packages

# Debugging
npm run dev -- --turbo   # Use Turbopack (faster)
npm run dev -- --port 3001  # Use different port

# Clean and Reinstall
rm -rf node_modules .next
npm install              # Fresh install
```

---

## Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Better Auth Documentation**: https://better-auth.com/docs
- **Axios Documentation**: https://axios-http.com/docs/intro
- **TypeScript Documentation**: https://www.typescriptlang.org/docs

---

## Support

For issues or questions:
1. Check this quickstart guide
2. Review error messages in browser console
3. Check backend API logs
4. Consult project documentation in `specs/002-frontend-ui/`

---

**Setup Complete!** 🎉

You're now ready to implement the frontend features following the tasks defined in `tasks.md` (to be generated via `/sp.tasks` command).
