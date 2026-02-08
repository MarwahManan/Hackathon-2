# Research: Authentication & Security Technologies

**Feature**: Authentication & Security
**Date**: 2026-02-08
**Status**: Complete

## Overview

This document captures research findings and decisions for implementing JWT-based authentication using Better Auth on the frontend and PyJWT on the backend.

---

## Decision 1: Better Auth for Frontend Authentication

**Decision**: Use Better Auth library for Next.js authentication with JWT plugin

**Rationale**:
- Native Next.js App Router support
- Built-in JWT token generation via plugin
- Handles password hashing automatically (bcrypt/argon2)
- Provides session management and token storage
- Simplifies authentication flow implementation
- Active maintenance and community support

**Alternatives Considered**:
- **NextAuth.js**: More complex setup, primarily designed for OAuth providers
- **Custom JWT implementation**: Requires manual password hashing, token generation, and session management
- **Auth0/Clerk**: Third-party services add external dependencies and cost

**Implementation Details**:
- Install: `npm install better-auth`
- Configure in `lib/auth.ts` with email/password provider
- Enable JWT plugin for token generation
- Use `BETTER_AUTH_SECRET` for token signing

**References**:
- Better Auth Documentation: https://www.better-auth.com/docs
- JWT Plugin: https://www.better-auth.com/docs/plugins/jwt

---

## Decision 2: JWT Plugin Configuration

**Decision**: Enable Better Auth JWT plugin with custom configuration

**Rationale**:
- Generates standard JWT tokens compatible with PyJWT
- Allows custom claims (user ID, email, expiration)
- Configurable token expiration
- Automatic token refresh support
- Integrates seamlessly with Better Auth session

**Configuration**:
```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
  database: {
    // Database connection for user storage
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
})
```

**Token Claims**:
- `sub`: User ID (UUID)
- `email`: User email address
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

---

## Decision 3: PyJWT for Backend Verification

**Decision**: Use PyJWT library to verify JWT tokens in FastAPI

**Rationale**:
- Already installed in backend (version 2.8+)
- Standard JWT verification library for Python
- Supports HS256 algorithm (matches Better Auth)
- Simple API for decoding and validating tokens
- Handles signature verification and expiration automatically

**Implementation Pattern**:
```python
import jwt
from app.config import settings

def verify_token(token: str) -> UUID:
    try:
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,
            algorithms=["HS256"]
        )
        user_id = payload.get("sub")
        return UUID(user_id)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

**Alternatives Considered**:
- **python-jose**: More features but heavier dependency
- **authlib**: Full OAuth library, overkill for JWT-only use case

---

## Decision 4: Shared Secret Management

**Decision**: Use `BETTER_AUTH_SECRET` environment variable in both frontend and backend

**Rationale**:
- Single source of truth for JWT signing/verification
- Prevents secret mismatch issues
- Standard practice for symmetric key algorithms (HS256)
- Easy to rotate in production

**Security Requirements**:
- Minimum 32 characters (256 bits)
- Random, cryptographically secure generation
- Never committed to version control
- Stored in `.env` files (gitignored)
- Rotated periodically in production

**Generation Command**:
```bash
# Generate secure random secret
openssl rand -base64 32
```

**Environment Files**:
- Frontend: `frontend/.env.local`
- Backend: `backend/.env`

---

## Decision 5: Token Transport via Authorization Header

**Decision**: Transmit JWT using `Authorization: Bearer <token>` header

**Rationale**:
- Industry standard for API authentication
- Supported by all HTTP clients
- Avoids CSRF vulnerabilities (unlike cookies)
- Works with CORS preflight requests
- Easy to implement in both frontend and backend

**Implementation**:
```typescript
// Frontend API client
const response = await fetch('/api/tasks', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})
```

```python
# Backend middleware
from fastapi import Header

async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401)
    token = authorization.split(" ")[1]
    return verify_token(token)
```

**Alternatives Considered**:
- **Cookies**: Requires CSRF protection, more complex CORS setup
- **Query parameters**: Insecure (logged in URLs, browser history)
- **Custom headers**: Non-standard, less tooling support

---

## Decision 6: Token Storage on Frontend

**Decision**: Store JWT in localStorage with fallback to httpOnly cookies

**Rationale**:
- localStorage: Simple, persistent across sessions, works with Better Auth default
- httpOnly cookies: More secure (XSS-resistant) if Better Auth supports it
- Better Auth handles storage automatically based on configuration

**Security Considerations**:
- **XSS Risk**: localStorage vulnerable to XSS attacks
- **Mitigation**: Implement Content Security Policy (CSP)
- **Best Practice**: Use httpOnly cookies if available
- **Token Expiration**: Short-lived tokens (7 days) reduce risk window

**Implementation**:
```typescript
// Better Auth handles storage automatically
// Access token via session
const session = await auth.api.getSession()
const token = session?.token
```

---

## Decision 7: Token Expiration Handling

**Decision**: Set token expiration to 7 days with backend validation

**Rationale**:
- Balance between security and user experience
- Long enough to avoid frequent re-authentication
- Short enough to limit exposure if token compromised
- Backend enforces expiration (frontend cannot be trusted)

**Expiration Flow**:
1. Better Auth issues token with `exp` claim (7 days from now)
2. Backend verifies `exp` claim on every request
3. If expired, backend returns 401 with "TOKEN_EXPIRED" code
4. Frontend detects 401 and redirects to signin page

**Future Enhancement** (out of scope for MVP):
- Implement refresh token mechanism
- Automatic token refresh before expiration
- Sliding session window

---

## Decision 8: User Isolation at Database Level

**Decision**: Filter all database queries by authenticated user ID from JWT

**Rationale**:
- Defense in depth: Even if authorization logic fails, database enforces isolation
- Prevents accidental data leakage
- Simplifies endpoint logic (no manual user ID checks)
- Aligns with security-first principle

**Implementation Pattern**:
```python
# Extract user_id from verified JWT
current_user = get_current_user(authorization)

# All queries filtered by user_id
tasks = session.exec(
    select(Task).where(Task.user_id == current_user)
).all()
```

**Security Rule**: Never trust user ID from request parameters or body. Always use user ID from verified JWT token.

---

## Decision 9: Error Response Format

**Decision**: Return consistent error format for authentication failures

**Rationale**:
- Consistent error handling across all endpoints
- Clear error codes for frontend to handle different scenarios
- User-friendly error messages
- Security: Don't leak sensitive information in errors

**Error Format**:
```json
{
  "error": "User-friendly error message",
  "code": "ERROR_CODE"
}
```

**Error Codes**:
- `MISSING_TOKEN`: No Authorization header provided
- `INVALID_TOKEN`: Token signature invalid or malformed
- `TOKEN_EXPIRED`: Token expiration time passed
- `UNAUTHORIZED`: Generic authentication failure

**HTTP Status Codes**:
- 401 Unauthorized: All authentication failures
- 404 Not Found: Resource doesn't exist or user doesn't own it (security: don't reveal existence)

---

## Decision 10: Rate Limiting for Authentication Endpoints

**Decision**: Implement rate limiting on signup/signin endpoints

**Rationale**:
- Prevent brute force attacks
- Protect against credential stuffing
- Reduce server load from automated attacks
- Security best practice

**Rate Limits** (recommended):
- Signup: 5 attempts per IP per hour
- Signin: 5 failed attempts per email per 15 minutes
- Successful signin resets counter

**Implementation** (future enhancement, out of scope for MVP):
- Use FastAPI rate limiting middleware
- Store attempt counts in Redis or database
- Return 429 Too Many Requests when limit exceeded

---

## Summary

All technology decisions documented and justified. No unresolved questions or "NEEDS CLARIFICATION" items. Ready to proceed to design phase (data-model.md and contracts/).

**Key Takeaways**:
1. Better Auth + JWT plugin for frontend authentication
2. PyJWT for backend verification
3. Shared BETTER_AUTH_SECRET for signing/verification
4. Authorization header for token transport
5. 7-day token expiration with backend validation
6. User isolation enforced at database query level
7. Consistent error responses with clear codes
8. Rate limiting recommended for production (future enhancement)

**Next Steps**:
- Create data-model.md (User entity, JWT structure)
- Create contracts/auth-endpoints.md (Better Auth API)
- Create contracts/jwt-format.md (Token claims)
- Create quickstart.md (Setup instructions)
