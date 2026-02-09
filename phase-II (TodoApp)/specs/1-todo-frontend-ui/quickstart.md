# Quickstart Guide: Todo Frontend Application

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Prerequisites**: Node.js 18+, npm or yarn

## Overview

This guide provides step-by-step instructions to set up, configure, and run the Todo frontend application locally.

---

## 1. Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 18 or higher
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **npm** or **yarn**: Package manager
  ```bash
  npm --version   # Should be 9.0.0 or higher
  # OR
  yarn --version  # Should be 1.22.0 or higher
  ```

- **Git**: For cloning the repository
  ```bash
  git --version
  ```

---

## 2. Project Setup

### Clone Repository

```bash
git clone <repository-url>
cd phase-II/frontend
```

### Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

**Expected Dependencies**:
- next@16+
- react@18+
- react-dom@18+
- typescript@5+
- tailwindcss@3+
- axios
- better-auth
- react-hook-form
- zod
- js-cookie
- date-fns

---

## 3. Environment Configuration

### Create Environment File

Copy the example environment file:
```bash
cp .env.example .env.local
```

### Configure Environment Variables

Edit `.env.local` with your configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000/api/auth
BETTER_AUTH_SECRET=your-secret-key-here-min-32-chars

# Application Configuration
NEXT_PUBLIC_APP_NAME=Todo App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

**Important**:
- `NEXT_PUBLIC_API_URL`: Must point to your running FastAPI backend
- `BETTER_AUTH_SECRET`: Generate a secure random string (min 32 characters)
- Never commit `.env.local` to version control

### Generate Secure Secret

```bash
# Generate a secure random string for BETTER_AUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 4. Development Server

### Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

The application will start at: **http://localhost:3000**

### Verify Setup

1. Open browser to http://localhost:3000
2. You should see the landing/home page
3. Navigate to http://localhost:3000/login
4. Verify the login page loads without errors

---

## 5. Backend Connection

### Ensure Backend is Running

The frontend requires the FastAPI backend to be running:

```bash
# In a separate terminal, navigate to backend directory
cd phase-II/backend

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

Verify backend is accessible:
```bash
curl http://localhost:8000/api/health
# Should return: {"status": "healthy"}
```

### Test API Connection

From the frontend, test the connection:

1. Open browser console (F12)
2. Navigate to http://localhost:3000/login
3. Check for any CORS or connection errors
4. Attempt to login (should reach backend)

---

## 6. Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (protected)/       # Protected routes (tasks)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── tasks/            # Task-specific components
│   ├── auth/             # Auth components
│   └── layout/           # Layout components
├── lib/                   # Utilities and configurations
│   ├── api/              # API client
│   ├── auth/             # Auth utilities
│   ├── hooks/            # Custom hooks
│   └── utils/            # Helper functions
├── types/                 # TypeScript types
├── public/                # Static assets
├── .env.local            # Environment variables (not committed)
├── .env.example          # Environment template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

---

## 7. Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Testing (Optional)

```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

---

## 8. Common Issues & Troubleshooting

### Issue: "Cannot connect to backend"

**Symptoms**: Network errors, CORS errors in console

**Solutions**:
1. Verify backend is running: `curl http://localhost:8000/api/health`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Ensure backend CORS is configured to allow `http://localhost:3000`
4. Check backend logs for errors

### Issue: "Module not found" errors

**Symptoms**: Import errors, missing dependencies

**Solutions**:
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Issue: "Authentication not working"

**Symptoms**: Login fails, token not stored, redirects not working

**Solutions**:
1. Verify `BETTER_AUTH_SECRET` is set in `.env.local`
2. Check browser console for errors
3. Verify backend authentication endpoints are working
4. Clear browser cookies and localStorage
5. Check that JWT token is being returned from backend

### Issue: "Styles not loading"

**Symptoms**: Unstyled page, Tailwind classes not working

**Solutions**:
1. Verify `tailwind.config.js` content paths are correct
2. Restart development server
3. Check `globals.css` imports Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Issue: "TypeScript errors"

**Symptoms**: Type errors, compilation failures

**Solutions**:
1. Run type check: `npm run type-check`
2. Verify all type definitions are installed
3. Check `tsconfig.json` configuration
4. Restart TypeScript server in IDE

---

## 9. Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** to components, pages, or utilities

3. **Test locally**:
   - Verify changes in browser
   - Check console for errors
   - Test on mobile viewport (responsive design)
   - Test keyboard navigation (accessibility)

4. **Run linting and type checking**:
   ```bash
   npm run lint
   npm run type-check
   ```

5. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Code Quality Checks

Before committing, ensure:
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All imports are used
- [ ] No console.log statements (except intentional logging)
- [ ] Components are properly typed
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Accessibility: keyboard navigation works, ARIA labels present

---

## 10. Building for Production

### Create Production Build

```bash
npm run build
```

This will:
1. Compile TypeScript
2. Bundle and optimize JavaScript
3. Process and minify CSS
4. Generate static pages where possible
5. Create optimized production build in `.next/` directory

### Test Production Build Locally

```bash
npm run start
```

Access at: http://localhost:3000

### Production Environment Variables

Create `.env.production` for production:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com/api/auth
BETTER_AUTH_SECRET=<production-secret-min-32-chars>
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Security Checklist**:
- [ ] Use HTTPS for all URLs
- [ ] Generate new `BETTER_AUTH_SECRET` for production
- [ ] Enable secure cookies (automatic in production)
- [ ] Configure Content Security Policy headers
- [ ] Set up rate limiting on backend
- [ ] Enable error tracking (e.g., Sentry)

---

## 11. Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard

4. **Set up custom domain** (optional)

### Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Configure environment variables** in Netlify dashboard

### Docker (Alternative)

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t todo-frontend .
docker run -p 3000:3000 --env-file .env.production todo-frontend
```

---

## 12. Monitoring & Debugging

### Browser DevTools

- **Console**: Check for JavaScript errors and API responses
- **Network**: Monitor API requests and responses
- **Application**: Inspect cookies, localStorage, session storage
- **Lighthouse**: Run performance and accessibility audits

### Next.js DevTools

- **Fast Refresh**: Automatic reload on file changes
- **Error Overlay**: Detailed error messages in development
- **Build Output**: Analyze bundle sizes and optimization

### Logging

```typescript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('API Response:', response);
}

// Production error tracking
if (process.env.NODE_ENV === 'production') {
  // Sentry.captureException(error);
}
```

---

## 13. Next Steps

After successful setup:

1. ✅ Frontend running at http://localhost:3000
2. ✅ Backend running at http://localhost:8000
3. ✅ Environment variables configured
4. ✅ Can access login/signup pages

**Ready to develop**:
- Implement authentication pages (login, signup)
- Build task management UI (list, create, edit, delete)
- Add filtering and sorting functionality
- Implement responsive design
- Add accessibility features
- Optimize performance

**Follow the implementation tasks** in `tasks.md` (generated via `/sp.tasks` command)

---

## 14. Support & Resources

### Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Better Auth**: https://better-auth.com/docs

### Project Documentation

- **Specification**: `specs/1-todo-frontend-ui/spec.md`
- **Implementation Plan**: `specs/1-todo-frontend-ui/plan.md`
- **Data Models**: `specs/1-todo-frontend-ui/data-model.md`
- **API Contracts**: `specs/1-todo-frontend-ui/contracts/`

### Getting Help

- Check existing documentation in `/specs` folder
- Review error messages in browser console
- Check backend logs for API issues
- Consult project constitution: `.specify/memory/constitution.md`

---

## Summary

You should now have:
- ✅ Development environment set up
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Development server running
- ✅ Backend connection verified
- ✅ Ready to implement features

**Next Command**: Run `/sp.tasks` to generate implementation tasks and begin development.
