# JWT Token Format Specification

**Feature**: Authentication & Security
**Date**: 2026-02-08
**Status**: Complete

## Overview

This document defines the structure and format of JWT (JSON Web Token) tokens used for authentication between the Next.js frontend and FastAPI backend. The tokens are issued by Better Auth and verified by PyJWT.

---

## JWT Structure

A JWT consists of three parts separated by dots (`.`):

```
header.payload.signature
```

**Example Token**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDczNTA0MDAsImV4cCI6MTcwNzk1NTIwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## Part 1: Header

**Purpose**: Describes the token type and signing algorithm

**Format**: Base64URL-encoded JSON

**Decoded Header**:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Fields**:

| Field | Type | Value | Description |
|-------|------|-------|-------------|
| alg | string | "HS256" | Signing algorithm (HMAC with SHA-256) |
| typ | string | "JWT" | Token type |

**Notes**:
- Algorithm MUST be HS256 (symmetric key signing)
- Both Better Auth and PyJWT must use the same algorithm
- Header is standard and rarely changes

---

## Part 2: Payload (Claims)

**Purpose**: Contains user information and token metadata

**Format**: Base64URL-encoded JSON

**Decoded Payload**:
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707350400,
  "exp": 1707955200
}
```

### Standard Claims

| Claim | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| sub | string (UUID) | Yes | Subject - User ID | "550e8400-e29b-41d4-a716-446655440000" |
| iat | integer (Unix timestamp) | Yes | Issued At - Token creation time | 1707350400 |
| exp | integer (Unix timestamp) | Yes | Expiration - Token expiry time | 1707955200 |

### Custom Claims

| Claim | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| email | string | No | User's email address | "user@example.com" |

### Claim Validation Rules

**sub (Subject)**:
- MUST be a valid UUID (RFC 4122)
- MUST match an existing user ID in the database
- Used by backend to identify authenticated user
- Never trust user ID from request parameters - always use sub from verified token

**iat (Issued At)**:
- MUST be a Unix timestamp (seconds since epoch)
- MUST be in the past (not future-dated)
- Used to determine token age
- Format: Integer (e.g., 1707350400 = 2026-02-08 10:00:00 UTC)

**exp (Expiration)**:
- MUST be a Unix timestamp (seconds since epoch)
- MUST be in the future (not expired)
- Default: iat + 7 days (604800 seconds)
- Backend MUST reject tokens where exp ≤ current time
- Format: Integer (e.g., 1707955200 = 2026-02-15 10:00:00 UTC)

**email (Custom)**:
- Optional claim for display purposes
- MUST match the email in the database for the user ID
- Not used for authentication (sub is authoritative)
- Can be used for UI display without database query

### Claim Examples

**Newly Created Token** (7-day expiration):
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707350400,
  "exp": 1707955200
}
```

**Token About to Expire** (1 hour remaining):
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707350400,
  "exp": 1707354000
}
```

**Expired Token** (exp in the past):
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707350400,
  "exp": 1707350401
}
```

---

## Part 3: Signature

**Purpose**: Ensures token integrity and authenticity

**Format**: Base64URL-encoded HMAC SHA-256 hash

**Signing Algorithm**:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  BETTER_AUTH_SECRET
)
```

**Signature Verification**:
1. Extract header and payload from token
2. Reconstruct signing input: `header.payload`
3. Compute HMAC SHA-256 using BETTER_AUTH_SECRET
4. Compare computed signature with token signature
5. If match: token is valid
6. If mismatch: token is invalid (tampered or wrong secret)

**Security Properties**:
- Only party with BETTER_AUTH_SECRET can create valid signatures
- Any modification to header or payload invalidates signature
- Signature proves token was issued by trusted authority (Better Auth)
- Backend can verify token without contacting frontend

---

## Token Lifecycle

### 1. Token Issuance (Frontend - Better Auth)

**When**: After successful signup or signin

**Process**:
```javascript
// Better Auth automatically generates token
const session = await auth.signIn.email({
  email: "user@example.com",
  password: "securepassword123"
});

// Token structure:
const token = {
  header: { alg: "HS256", typ: "JWT" },
  payload: {
    sub: session.user.id,
    email: session.user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 604800 // 7 days
  },
  signature: HMACSHA256(header + payload, BETTER_AUTH_SECRET)
};
```

### 2. Token Storage (Frontend)

**Where**: localStorage or httpOnly cookie

**Storage**:
```javascript
// Better Auth handles storage automatically
// Manual storage (if needed):
localStorage.setItem('jwt_token', session.token);
```

### 3. Token Transmission (Frontend → Backend)

**How**: Authorization header

**Request**:
```javascript
const response = await fetch('/api/tasks', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json'
  }
});
```

### 4. Token Verification (Backend - PyJWT)

**When**: On every protected endpoint request

**Process**:
```python
import jwt
from app.config import settings

def verify_token(token: str) -> UUID:
    try:
        # Decode and verify token
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,
            algorithms=["HS256"]
        )

        # Validate expiration (automatic)
        # PyJWT raises ExpiredSignatureError if exp ≤ now

        # Extract user ID
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        return UUID(user_id)

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### 5. Token Expiration

**When**: 7 days after issuance (exp claim)

**Behavior**:
- Backend rejects token with 401 Unauthorized
- Frontend detects 401 and redirects to signin page
- User must sign in again to get new token

**No Refresh Token** (MVP limitation):
- User must re-authenticate after expiration
- Future enhancement: implement refresh token mechanism

---

## Token Validation Checklist

Backend MUST validate the following before accepting a token:

- [ ] Token format is valid (three parts separated by dots)
- [ ] Header contains correct algorithm (HS256)
- [ ] Signature is valid (matches computed HMAC)
- [ ] Token is not expired (exp > current time)
- [ ] Subject (sub) is a valid UUID
- [ ] Subject (sub) matches an existing user in database (optional check)

---

## Security Considerations

### 1. Secret Management

**BETTER_AUTH_SECRET Requirements**:
- Minimum 32 characters (256 bits)
- Cryptographically random
- Never committed to version control
- Stored in environment variables only
- Same value in frontend and backend

**Generation**:
```bash
# Generate secure random secret
openssl rand -base64 32
```

**Storage**:
```bash
# Frontend (.env.local)
BETTER_AUTH_SECRET=your-secret-here

# Backend (.env)
BETTER_AUTH_SECRET=your-secret-here
```

### 2. Token Transmission

**Secure Practices**:
- ✅ Use Authorization header (not query params)
- ✅ Use HTTPS in production
- ✅ Never log tokens in server logs
- ✅ Never expose tokens in error messages

**Insecure Practices** (AVOID):
- ❌ Passing token in URL query parameters
- ❌ Storing token in browser history
- ❌ Sending token over HTTP (unencrypted)
- ❌ Including token in client-side logs

### 3. Token Storage

**Options**:
1. **localStorage** (default):
   - Pros: Simple, persistent across sessions
   - Cons: Vulnerable to XSS attacks
   - Mitigation: Implement Content Security Policy (CSP)

2. **httpOnly Cookies** (preferred):
   - Pros: Not accessible to JavaScript (XSS-resistant)
   - Cons: Requires CSRF protection
   - Mitigation: Use SameSite cookie attribute

### 4. Token Expiration

**Best Practices**:
- Short expiration reduces risk if token compromised
- 7 days balances security and user experience
- Backend MUST enforce expiration (frontend cannot be trusted)
- Consider shorter expiration for sensitive operations

---

## Debugging Guide

### Decode JWT Token

**Online Tool**: https://jwt.io (paste token to decode)

**Command Line**:
```bash
# Decode header and payload (signature not verified)
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" | base64 -d
```

**Python**:
```python
import jwt

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Decode without verification (for debugging only)
decoded = jwt.decode(token, options={"verify_signature": False})
print(decoded)
```

### Common Issues

**Issue**: "Invalid token signature"
- **Cause**: BETTER_AUTH_SECRET mismatch between frontend and backend
- **Fix**: Verify both use identical secret

**Issue**: "Token expired"
- **Cause**: Token exp claim is in the past
- **Fix**: User must sign in again to get new token

**Issue**: "Invalid token format"
- **Cause**: Token missing parts or malformed
- **Fix**: Verify token has three parts separated by dots

**Issue**: "Subject not found"
- **Cause**: User ID in sub claim doesn't exist in database
- **Fix**: User account may have been deleted

---

## Testing Examples

### Valid Token Test

```python
# Generate test token
import jwt
from datetime import datetime, timedelta

secret = "test-secret-key"
payload = {
    "sub": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "iat": int(datetime.utcnow().timestamp()),
    "exp": int((datetime.utcnow() + timedelta(days=7)).timestamp())
}

token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Token: {token}")

# Verify token
decoded = jwt.decode(token, secret, algorithms=["HS256"])
print(f"User ID: {decoded['sub']}")
```

### Expired Token Test

```python
# Generate expired token
payload = {
    "sub": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "iat": int((datetime.utcnow() - timedelta(days=8)).timestamp()),
    "exp": int((datetime.utcnow() - timedelta(days=1)).timestamp())
}

token = jwt.encode(payload, secret, algorithm="HS256")

# Verify token (should raise ExpiredSignatureError)
try:
    decoded = jwt.decode(token, secret, algorithms=["HS256"])
except jwt.ExpiredSignatureError:
    print("Token expired (expected)")
```

---

## Summary

**Token Format**: Standard JWT (header.payload.signature)
**Algorithm**: HS256 (HMAC SHA-256)
**Expiration**: 7 days from issuance
**Claims**: sub (user ID), email, iat, exp
**Security**: Shared secret (BETTER_AUTH_SECRET)

**Key Points**:
- Token is self-contained (no database lookup needed for authentication)
- Backend verifies signature and expiration on every request
- User ID from sub claim is authoritative (never trust request parameters)
- Token cannot be revoked before expiration (stateless limitation)

**Next Steps**:
- Implement Better Auth JWT plugin configuration
- Implement PyJWT verification in FastAPI middleware
- Test token generation and verification end-to-end
