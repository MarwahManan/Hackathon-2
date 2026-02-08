# Quickstart Guide: Authentication & Security

**Feature**: Authentication & Security
**Date**: 2026-02-08
**Status**: Complete

## Overview

This guide provides step-by-step instructions for setting up and testing the authentication and security layer for the Todo Full-Stack Web Application. Follow these steps to configure Better Auth on the frontend, implement JWT verification on the backend, and verify the complete authentication flow.

---

## Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed
- ✅ Python 3.10+ installed
- ✅ Backend API running (specs/003-backend-api completed)
- ✅ Neon PostgreSQL database configured
- ✅ Users table exists in database

---

## Part 1: Environment Setup

### Step 1: Generate JWT Secret

Generate a secure random secret for JWT signing and verification:

```bash
# Generate 32-character random secret
openssl rand -base64 32
```

**Example Output**:
```
K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=
```

**Important**: Save this secret - you'll use it in both frontend and backend.

### Step 2: Configure Frontend Environment

Create or update `frontend/.env.local`:

```bash
# Navigate to frontend directory
cd frontend

# Create environment file
cat > .env.local << 'EOF'
# Better Auth Configuration
BETTER_AUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=
BETTER_AUTH_URL=http://localhost:3000

# Database (for Better Auth session storage)
DATABASE_URL=postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

**Note**: Replace `BETTER_AUTH_SECRET` with your generated secret.

### Step 3: Configure Backend Environment

Update `backend/.env`:

```bash
# Navigate to backend directory
cd backend

# Add Better Auth secret to existing .env
echo "" >> .env
echo "# Authentication" >> .env
echo "BETTER_AUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=" >> .env
```

**Important**: Use the SAME secret as frontend.

**Verify backend .env contains**:
```bash
# Database Configuration
DATABASE_URL=postgresql+psycopg://...

# Authentication
JWT_SECRET=your-jwt-secret-here-must-match-better-auth-change-this-in-production
JWT_ALGORITHM=HS256
BETTER_AUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=

# Application
ENVIRONMENT=development
LOG_LEVEL=INFO

# CORS
FRONTEND_URL=http://localhost:3000

# Server
HOST=0.0.0.0
PORT=8000
```

---

## Part 2: Frontend Setup (Better Auth)

### Step 1: Install Dependencies

```bash
cd frontend

# Install Better Auth and JWT plugin
npm install better-auth
npm install @better-auth/jwt
```

### Step 2: Create Better Auth Configuration

Create `frontend/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [
    jwt({
      secret: process.env.BETTER_AUTH_SECRET!,
      expiresIn: "7d", // 7 days
      algorithm: "HS256",
    }),
  ],
  trustedOrigins: [process.env.NEXT_PUBLIC_API_URL!],
})
```

### Step 3: Create Better Auth API Route

Create `frontend/app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth"

export const { GET, POST } = auth.handler
```

### Step 4: Create Auth Client

Create `frontend/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
})
```

### Step 5: Create API Client with JWT Injection

Create `frontend/lib/api-client.ts`:

```typescript
import { authClient } from "./auth-client"

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  // Get current session
  const session = await authClient.getSession()

  // Add Authorization header if authenticated
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (session?.token) {
    headers["Authorization"] = `Bearer ${session.token}`
  }

  // Make request to backend
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  return response
}
```

---

## Part 3: Backend Setup (JWT Verification)

### Step 1: Update JWT Utilities

Update `backend/app/utils/jwt.py`:

```python
import jwt
from uuid import UUID
from datetime import datetime
from fastapi import HTTPException
from app.config import settings

def verify_token(token: str) -> UUID:
    """
    Verify JWT token issued by Better Auth

    Args:
        token: JWT token string

    Returns:
        UUID: User ID from token subject claim

    Raises:
        HTTPException: 401 if token invalid or expired
    """
    try:
        # Decode and verify token
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,  # Use Better Auth secret
            algorithms=["HS256"]
        )

        # Validate expiration (automatic by PyJWT)
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=401,
                detail={
                    "error": "Token expired",
                    "code": "TOKEN_EXPIRED"
                }
            )

        # Extract user ID from subject claim
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=401,
                detail={
                    "error": "Invalid token",
                    "code": "INVALID_TOKEN"
                }
            )

        return UUID(user_id)

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail={
                "error": "Token expired",
                "code": "TOKEN_EXPIRED"
            }
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail={
                "error": "Invalid token",
                "code": "INVALID_TOKEN"
            }
        )
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail={
                "error": "Invalid user ID format",
                "code": "INVALID_TOKEN"
            }
        )
```

### Step 2: Update Config

Update `backend/app/config.py` to include BETTER_AUTH_SECRET:

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str  # Keep for backward compatibility
    JWT_ALGORITHM: str = "HS256"
    BETTER_AUTH_SECRET: str  # Add this
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    FRONTEND_URL: str = "http://localhost:3000"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    class Config:
        env_file = ".env"

settings = Settings()
```

### Step 3: Verify Middleware

Verify `backend/app/middleware/auth.py` uses the updated verify_token:

```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from uuid import UUID
from app.utils.jwt import verify_token

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security)
) -> UUID:
    """
    Dependency to get current authenticated user from JWT token

    Args:
        credentials: HTTP Bearer credentials from Authorization header

    Returns:
        UUID: Authenticated user ID

    Raises:
        HTTPException: 401 if authentication fails
    """
    if not credentials:
        raise HTTPException(
            status_code=401,
            detail={
                "error": "Missing authentication token",
                "code": "MISSING_TOKEN"
            }
        )

    # Verify token and extract user ID
    user_id = verify_token(credentials.credentials)
    return user_id
```

---

## Part 4: Create Signup/Signin Pages

### Step 1: Create Signup Page

Create `frontend/app/(auth)/signup/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authClient.signUp.email({
        email,
        password,
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  )
}
```

### Step 2: Create Signin Page

Create `frontend/app/(auth)/signin/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function SigninPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authClient.signIn.email({
        email,
        password,
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Signin failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}
```

---

## Part 5: Testing

### Test 1: Backend Health Check

Verify backend is running:

```bash
curl http://localhost:8000/health
```

**Expected Response**:
```json
{
  "status": "healthy"
}
```

### Test 2: User Signup

Test signup flow:

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Expected Response** (200 OK):
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com"
  },
  "session": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token** for next tests.

### Test 3: User Signin

Test signin flow:

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Expected Response** (200 OK): Same as signup response

### Test 4: Protected Endpoint with Valid JWT

Test backend API with JWT:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response** (200 OK):
```json
[]
```

### Test 5: Protected Endpoint without JWT

Test authentication enforcement:

```bash
curl -X GET http://localhost:8000/api/tasks
```

**Expected Response** (401 Unauthorized):
```json
{
  "error": "Missing authentication token",
  "code": "MISSING_TOKEN"
}
```

### Test 6: Protected Endpoint with Invalid JWT

Test token verification:

```bash
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer invalid-token-here"
```

**Expected Response** (401 Unauthorized):
```json
{
  "error": "Invalid token",
  "code": "INVALID_TOKEN"
}
```

### Test 7: Create Task with JWT

Test full CRUD flow:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:8000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Testing authentication"
  }'
```

**Expected Response** (201 Created):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Test Task",
  "description": "Testing authentication",
  "is_completed": false,
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

### Test 8: User Isolation

Create second user and verify isolation:

```bash
# Create second user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user2@example.com",
    "password": "password123"
  }'

# Save second user's token
TOKEN2="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Try to access first user's tasks with second user's token
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer $TOKEN2"
```

**Expected Response** (200 OK):
```json
[]
```

**Verification**: Second user sees empty list (not first user's tasks)

---

## Part 6: Troubleshooting

### Issue: "Invalid token signature"

**Cause**: BETTER_AUTH_SECRET mismatch

**Solution**:
1. Verify frontend `.env.local` has BETTER_AUTH_SECRET
2. Verify backend `.env` has BETTER_AUTH_SECRET
3. Ensure both values are identical
4. Restart both servers

### Issue: "Token expired"

**Cause**: Token older than 7 days

**Solution**: Sign in again to get new token

### Issue: "CORS error"

**Cause**: Backend not allowing frontend origin

**Solution**: Verify backend CORS configuration in `app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: "Database connection error"

**Cause**: DATABASE_URL incorrect or database not accessible

**Solution**:
1. Verify DATABASE_URL in both `.env` files
2. Test database connection: `psql $DATABASE_URL`
3. Check Neon dashboard for database status

---

## Summary

**Setup Complete** ✅
- Frontend: Better Auth configured with JWT plugin
- Backend: JWT verification middleware implemented
- Environment: Shared secret configured
- Pages: Signup and signin UI created

**Testing Complete** ✅
- Health check passing
- Signup flow working
- Signin flow working
- JWT authentication enforced
- User isolation verified

**Next Steps**:
- Implement full UI for dashboard
- Add logout functionality
- Implement token refresh (future enhancement)
- Add rate limiting (production)
- Deploy to production with HTTPS

---

**Estimated Setup Time**: 30-45 minutes
**Estimated Testing Time**: 15-20 minutes
**Total Time**: ~1 hour
