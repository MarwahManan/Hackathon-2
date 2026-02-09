# Research: Frontend & UI Technology Decisions

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Status**: Completed

## Overview

This document captures research findings and technology decisions for the Todo application frontend. All decisions prioritize security, performance, maintainability, and alignment with the project constitution.

---

## 1. Authentication Framework: Better Auth

### Decision
Use **Better Auth v1.x** for JWT-based authentication with Next.js 16+ App Router integration.

### Rationale
- **JWT-focused**: Designed specifically for JWT token workflows
- **Next.js optimized**: First-class support for App Router and API routes
- **Lightweight**: Minimal dependencies, focused on authentication only
- **TypeScript native**: Full type safety out of the box
- **Flexible storage**: Supports both HttpOnly cookies and localStorage
- **Active maintenance**: Regular updates and security patches

### Alternatives Considered
1. **NextAuth.js**: More feature-rich but heavier, includes OAuth providers we don't need
2. **Auth0**: Third-party service, adds external dependency and cost
3. **Custom JWT implementation**: More control but higher security risk and maintenance burden

### Implementation Approach
- Install Better Auth SDK: `npm install better-auth`
- Configure in `/lib/auth/better-auth.ts`
- Create API routes for signup/login in `/app/api/auth/`
- Use Better Auth hooks for client-side auth state

---

## 2. JWT Token Storage

### Decision
Use **HttpOnly cookies** as primary storage method, with **secure localStorage** as fallback.

### Rationale
- **HttpOnly cookies (primary)**:
  - XSS protection: JavaScript cannot access the token
  - Automatic transmission: Browser sends cookie with every request
  - CSRF protection: Use SameSite=Strict attribute
  - Secure flag: HTTPS-only transmission in production
- **localStorage (fallback)**:
  - For environments where cookies are blocked
  - Requires manual XSS protection (Content Security Policy)
  - Explicit token attachment to requests

### Alternatives Considered
1. **localStorage only**: Vulnerable to XSS attacks
2. **sessionStorage**: Lost on tab close, poor UX
3. **Memory only**: Lost on page refresh, poor UX

### Implementation Approach
- Better Auth handles cookie storage automatically
- Implement token retrieval utility in `/lib/auth/token.ts`
- Add CSP headers in `next.config.js` for XSS protection
- Set SameSite=Strict and Secure flags in production

---

## 3. API Client Configuration

### Decision
Use **Axios** with request/response interceptors for centralized API communication.

### Rationale
- **Interceptors**: Automatic JWT token attachment to all requests
- **Error handling**: Centralized error processing and transformation
- **Request/response transformation**: Consistent data formatting
- **Timeout configuration**: Prevent hanging requests
- **Cancel tokens**: Abort in-flight requests on component unmount
- **TypeScript support**: Full type safety for requests/responses

### Alternatives Considered
1. **Fetch API**: Native but lacks interceptors, requires manual error handling
2. **SWR**: Great for data fetching but not a full HTTP client
3. **React Query**: Excellent caching but still needs underlying HTTP client

### Implementation Approach
```typescript
// /lib/api/client.ts
import axios from 'axios';
import { getToken } from '@/lib/auth/token';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 4. Styling Framework: Tailwind CSS

### Decision
Use **Tailwind CSS v3+** with mobile-first utility classes.

### Rationale
- **Mobile-first**: Built-in responsive design utilities
- **Utility-first**: Rapid development without context switching
- **Next.js integration**: Official plugin with automatic purging
- **Customization**: Easy to define design system (colors, spacing, typography)
- **Performance**: Minimal CSS bundle size with tree-shaking
- **Developer experience**: IntelliSense support in VS Code

### Alternatives Considered
1. **CSS Modules**: More verbose, requires separate CSS files
2. **Styled Components**: Runtime overhead, SSR complexity
3. **Emotion**: Similar to Styled Components, less Next.js optimized
4. **Plain CSS**: No utility classes, harder to maintain consistency

### Implementation Approach
- Install: `npm install -D tailwindcss postcss autoprefixer`
- Configure `tailwind.config.js` with custom design system:
  ```javascript
  module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: { /* custom palette */ },
          secondary: { /* custom palette */ },
        },
        spacing: { /* 4px, 8px, 16px, 24px, 32px, 48px */ },
      },
    },
  };
  ```
- Use responsive utilities: `sm:`, `md:`, `lg:`, `xl:`
- Define reusable component classes in `@layer components`

---

## 5. Error Boundary Implementation

### Decision
Use **Next.js App Router error.tsx convention** for error boundaries.

### Rationale
- **Built-in**: No additional libraries needed
- **Route-level**: Granular error handling per route segment
- **Automatic**: Catches React errors during rendering
- **Reset functionality**: Built-in error recovery mechanism
- **TypeScript support**: Typed error props

### Alternatives Considered
1. **react-error-boundary**: Third-party library, adds dependency
2. **Custom class components**: More boilerplate, less Next.js optimized
3. **Try-catch only**: Doesn't catch rendering errors

### Implementation Approach
```typescript
// /app/error.tsx (root error boundary)
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
```

---

## 6. Protected Route Pattern

### Decision
Use **Next.js Middleware** for route protection and authentication checks.

### Rationale
- **Efficient**: Runs before rendering, prevents unnecessary page loads
- **Centralized**: Single place to define protected routes
- **Edge runtime**: Fast execution at the edge
- **Redirect support**: Seamless redirect to login for unauthenticated users
- **Token validation**: Check JWT validity before rendering

### Alternatives Considered
1. **HOC (Higher-Order Component)**: Client-side only, flash of unauthenticated content
2. **Layout-level checks**: Duplicated logic across layouts
3. **Per-page checks**: Repetitive, error-prone

### Implementation Approach
```typescript
// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/tasks');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/profile/:path*'],
};
```

---

## 7. Form Validation

### Decision
Use **React Hook Form** with **Zod** schema validation.

### Rationale
- **Performance**: Minimal re-renders, uncontrolled components
- **TypeScript integration**: Full type inference from Zod schemas
- **Validation**: Built-in validation with custom rules
- **Error handling**: Automatic error state management
- **Accessibility**: Built-in ARIA attributes
- **Bundle size**: Lightweight (~9KB gzipped)

### Alternatives Considered
1. **Formik**: Heavier, more re-renders
2. **Manual validation**: Error-prone, repetitive
3. **HTML5 validation**: Limited, inconsistent UX

### Implementation Approach
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
  resolver: zodResolver(taskSchema),
});
```

---

## 8. State Management

### Decision
Use **React Context API** with **useState/useReducer** for global state.

### Rationale
- **Built-in**: No additional dependencies
- **Sufficient**: Application state is simple (auth + tasks)
- **TypeScript support**: Full type safety
- **Performance**: Acceptable for this scale
- **Simplicity**: Easy to understand and maintain

### Alternatives Considered
1. **Redux**: Overkill for this application size
2. **Zustand**: Good but adds dependency
3. **Jotai/Recoil**: Atomic state, more complex than needed

### Implementation Approach
```typescript
// /lib/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // ... implementation
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

---

## Summary of Technology Stack

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| Framework | Next.js (App Router) | 16+ | Modern React framework, server components |
| Language | TypeScript | 5+ | Type safety, better DX |
| Authentication | Better Auth | 1.x | JWT-focused, Next.js optimized |
| Token Storage | HttpOnly Cookies | - | XSS protection, automatic transmission |
| API Client | Axios | Latest | Interceptors, centralized error handling |
| Styling | Tailwind CSS | 3+ | Mobile-first, utility-first, performance |
| Form Validation | React Hook Form + Zod | Latest | Performance, type safety, DX |
| State Management | React Context API | Built-in | Sufficient for app complexity |
| Error Boundaries | Next.js error.tsx | Built-in | Route-level error handling |
| Route Protection | Next.js Middleware | Built-in | Efficient, centralized |

---

## Implementation Priorities

1. **Phase 1 (MVP - P1 Features)**:
   - Authentication (Better Auth + JWT)
   - Protected routes (Middleware)
   - Task list view
   - Task creation
   - Task completion toggle

2. **Phase 2 (Enhancements - P2 Features)**:
   - Task editing
   - Task deletion
   - Filtering and sorting

3. **Phase 3 (Polish - P3 Features)**:
   - Responsive design refinements
   - Accessibility improvements
   - Performance optimizations

---

## Security Considerations

1. **XSS Prevention**:
   - HttpOnly cookies for token storage
   - Content Security Policy headers
   - React's built-in escaping

2. **CSRF Prevention**:
   - SameSite=Strict cookie attribute
   - CSRF tokens for state-changing operations (if needed)

3. **Token Security**:
   - Short expiration times (15-30 minutes)
   - Refresh token mechanism (if needed)
   - Secure flag for HTTPS-only transmission

4. **Input Validation**:
   - Client-side validation with Zod
   - Server-side validation (backend responsibility)
   - Sanitization of user input

---

## Performance Targets

- **Initial Load**: < 3 seconds (FCP)
- **Time to Interactive**: < 4 seconds
- **API Response Handling**: < 500ms (UI update)
- **Smooth Interactions**: 60fps (no jank)
- **Bundle Size**: < 200KB (initial JS)

---

## Next Steps

1. ✅ Research completed
2. ⏭️ Create data-model.md (client-side state models)
3. ⏭️ Create API contracts (auth-api.md, tasks-api.md, error-responses.md)
4. ⏭️ Create quickstart.md (setup instructions)
5. ⏭️ Generate tasks.md via `/sp.tasks`
