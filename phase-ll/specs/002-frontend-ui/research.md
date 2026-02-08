# Research: Frontend & UI Technology Decisions

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08
**Status**: Completed

## Overview

This document captures research findings and technology decisions for the Next.js 16+ frontend implementation with Better Auth integration, JWT token management, and responsive design.

---

## 1. Better Auth Integration with Next.js 16+ App Router

### Decision
Use Better Auth v1.x with Next.js App Router, implementing authentication via API routes and client-side hooks.

### Rationale
- **Better Auth** is specifically designed for modern Next.js applications with built-in JWT support
- App Router provides server components and route handlers ideal for auth flows
- Better Auth handles password hashing (bcrypt/argon2), token generation, and session management
- Native TypeScript support ensures type safety across auth flows

### Implementation Approach
```typescript
// lib/auth/better-auth.ts
import { BetterAuth } from 'better-auth'

export const auth = new BetterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  jwt: {
    expiresIn: '24h',
    algorithm: 'HS256'
  },
  callbacks: {
    async signIn(user) {
      // Custom validation logic
      return true
    }
  }
})
```

### Alternatives Considered
- **NextAuth.js**: More feature-rich but heavier; Better Auth is lighter and sufficient for JWT-only auth
- **Custom JWT implementation**: Reinventing the wheel; Better Auth provides battle-tested security
- **Clerk/Auth0**: Third-party services add external dependencies; Better Auth keeps auth in-house

### References
- Better Auth Documentation: https://better-auth.com/docs
- Next.js App Router Auth Patterns: https://nextjs.org/docs/app/building-your-application/authentication

---

## 2. JWT Token Storage Best Practices

### Decision
Use **HttpOnly cookies** for JWT token storage (primary approach), with secure localStorage as fallback for development.

### Rationale
- **HttpOnly cookies** prevent XSS attacks by making tokens inaccessible to JavaScript
- Cookies are automatically sent with requests (no manual attachment needed)
- `Secure` flag ensures transmission only over HTTPS
- `SameSite=Strict` prevents CSRF attacks

### Implementation Approach
```typescript
// Server-side (API route)
export async function POST(request: Request) {
  const token = await generateJWT(user)

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
    }
  })
}

// Client-side (automatic - no manual storage needed)
// Token is automatically included in requests via cookies
```

### Alternatives Considered
- **localStorage**: Vulnerable to XSS attacks; JavaScript can access tokens
- **sessionStorage**: Same XSS vulnerability as localStorage; cleared on tab close
- **Memory only**: Lost on page refresh; poor UX

### Security Considerations
- HttpOnly prevents JavaScript access (XSS protection)
- Secure flag enforces HTTPS (man-in-the-middle protection)
- SameSite=Strict prevents CSRF attacks
- Short expiration (24h) limits token lifetime

### References
- OWASP JWT Security: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html
- MDN Set-Cookie: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

---

## 3. API Client Configuration with Automatic Token Attachment

### Decision
Use **Axios** with request interceptors for automatic JWT token attachment and response error handling.

### Rationale
- Axios provides clean interceptor API for token injection
- Centralized error handling for 401/404/500 responses
- Request/response transformation support
- Better error messages than native fetch
- TypeScript support with typed responses

### Implementation Approach
```typescript
// lib/api/client.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Send cookies with requests
})

// Request interceptor (if using localStorage instead of cookies)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Only if not using HttpOnly cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

### Alternatives Considered
- **Native fetch**: Requires manual error handling and token attachment for every request
- **SWR/React Query**: Excellent for data fetching but adds complexity; can be added later
- **tRPC**: Requires backend changes; not compatible with existing FastAPI backend

### References
- Axios Documentation: https://axios-http.com/docs/intro
- Axios Interceptors: https://axios-http.com/docs/interceptors

---

## 4. Responsive Design Patterns for Next.js

### Decision
Use **Tailwind CSS** for responsive design with mobile-first approach.

### Rationale
- Utility-first CSS enables rapid responsive development
- Built-in responsive breakpoints (sm, md, lg, xl, 2xl)
- Mobile-first by default (base styles apply to mobile, breakpoints scale up)
- Excellent Next.js integration via PostCSS
- Smaller bundle size with PurgeCSS (unused styles removed)
- Consistent design system with customizable theme

### Implementation Approach
```typescript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',  // Mobile
        'sm': '640px',  // Large mobile
        'md': '768px',  // Tablet
        'lg': '1024px', // Desktop
        'xl': '1280px', // Large desktop
      },
      spacing: {
        '18': '4.5rem', // Custom spacing for touch targets (72px = 18 * 4px)
      }
    }
  }
}

// Component example
<button className="
  w-full px-4 py-3          // Mobile: full width, adequate padding
  md:w-auto md:px-6 md:py-3 // Tablet+: auto width, more padding
  min-h-[44px]              // Minimum touch target height
  text-base md:text-lg      // Responsive text size
">
  Submit
</button>
```

### Alternatives Considered
- **CSS Modules**: More verbose; requires manual responsive breakpoints
- **Styled Components**: Runtime CSS-in-JS has performance overhead
- **Plain CSS**: Requires more boilerplate for responsive patterns

### Mobile-First Strategy
1. Base styles target mobile (375px+)
2. Use `md:` prefix for tablet (768px+)
3. Use `lg:` prefix for desktop (1024px+)
4. Ensure touch targets minimum 44x44px (11 * 4px in Tailwind)

### References
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Tailwind Responsive Design: https://tailwindcss.com/docs/responsive-design

---

## 5. Error Boundary Implementation in App Router

### Decision
Implement error boundaries using Next.js App Router's `error.tsx` convention with fallback UI.

### Rationale
- App Router provides built-in error boundary support via `error.tsx` files
- Automatic error catching for route segments
- Can reset error state with retry functionality
- Supports both client and server errors

### Implementation Approach
```typescript
// app/error.tsx (root error boundary)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}

// app/(protected)/tasks/error.tsx (route-specific error boundary)
'use client'

export default function TasksError({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="p-4">
      <h3>Failed to load tasks</h3>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}
```

### Alternatives Considered
- **React Error Boundary class**: More boilerplate; App Router's convention is simpler
- **Try-catch in components**: Doesn't catch rendering errors; error boundaries are more robust

### References
- Next.js Error Handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling

---

## 6. Protected Route Patterns in App Router

### Decision
Use **middleware** for route protection with redirect to login for unauthenticated users.

### Rationale
- Middleware runs before route rendering (efficient)
- Centralized auth check for all protected routes
- Can redirect before page loads (better UX)
- Works with both server and client components

### Implementation Approach
```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/tasks')

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks/:path*'] // Apply to all /tasks routes
}

// Alternative: Layout-based protection
// app/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
```

### Alternatives Considered
- **Client-side route guards**: Causes flash of protected content before redirect
- **HOC pattern**: More boilerplate; middleware is cleaner
- **Server component checks**: Works but middleware is more efficient

### References
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Next.js Authentication: https://nextjs.org/docs/app/building-your-application/authentication

---

## Summary of Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| **Authentication** | Better Auth v1.x | Lightweight, JWT-focused, Next.js optimized |
| **Token Storage** | HttpOnly cookies | XSS protection, automatic transmission, CSRF prevention |
| **API Client** | Axios with interceptors | Centralized token attachment, error handling, TypeScript support |
| **Styling** | Tailwind CSS | Mobile-first, utility-first, excellent Next.js integration |
| **Error Handling** | App Router error.tsx | Built-in error boundaries, automatic error catching |
| **Route Protection** | Middleware | Efficient, centralized, runs before rendering |

---

## Implementation Priorities

### Phase 1 (MVP - P1 Features)
1. Better Auth setup with JWT
2. HttpOnly cookie configuration
3. Axios client with interceptors
4. Basic Tailwind setup (mobile-first)
5. Middleware for route protection
6. Error boundaries for critical routes

### Phase 2 (Enhancement - P2/P3 Features)
1. Advanced responsive design refinements
2. Optimistic UI updates
3. Loading skeletons
4. Advanced error recovery
5. Accessibility improvements

---

## Risk Mitigation

### Risk 1: Token Expiration During Active Use
**Mitigation**: Implement token refresh logic in Axios interceptor; show "Session expired" message with re-login option

### Risk 2: CORS Issues with Backend
**Mitigation**: Configure CORS in FastAPI backend to allow credentials; ensure `withCredentials: true` in Axios

### Risk 3: HttpOnly Cookies Not Working in Development
**Mitigation**: Use localhost (not 127.0.0.1) for both frontend and backend; ensure Secure flag only in production

### Risk 4: Responsive Design Testing Overhead
**Mitigation**: Use browser DevTools responsive mode; test on real devices for final validation

---

## Next Steps

1. ✅ Research completed - All technology decisions documented
2. ⏳ Proceed to Phase 1: Design (data models and API contracts)
3. ⏳ Create quickstart.md with setup instructions
4. ⏳ Generate tasks.md via `/sp.tasks` command
