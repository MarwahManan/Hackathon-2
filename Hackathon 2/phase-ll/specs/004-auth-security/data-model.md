# Data Model: Authentication & Security

**Feature**: Authentication & Security
**Date**: 2026-02-08
**Status**: Complete

## Overview

This document defines the data entities and structures used in the authentication and authorization system. The authentication layer primarily works with existing entities (User) and introduces a new logical entity (JWT Token) that is not stored in the database.

---

## Entity 1: User (Existing)

**Description**: Represents an authenticated user account in the system. This entity already exists in the database from the Backend API feature (specs/003-backend-api).

**Storage**: Database table `users` in Neon PostgreSQL

**SQLModel Definition** (already implemented in `backend/app/models/user.py`):
```python
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str = Field(max_length=255)  # Added by Better Auth
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

**Fields**:
- `id` (UUID, PK): Unique identifier for the user
- `email` (str, unique, indexed): User's email address for authentication
- `password_hash` (str): Hashed password (bcrypt/argon2) - managed by Better Auth
- `created_at` (datetime): Account creation timestamp
- `updated_at` (datetime): Last modification timestamp

**Validation Rules**:
- Email must be valid format (RFC 5322)
- Email must be unique across all users
- Password must be at least 8 characters (enforced by Better Auth)
- Password must be hashed before storage (never store plaintext)

**Relationships**:
- One-to-Many with Task entity (user owns multiple tasks)

**State Transitions**:
- Created → Active (on successful signup)
- Active → Active (on signin, updated_at changes)

**Notes**:
- This entity already exists in the database
- Better Auth will manage password hashing and user creation
- No schema changes required for authentication feature

---

## Entity 2: JWT Token (Logical, Not Stored)

**Description**: A JSON Web Token that represents an authenticated user session. This is a logical entity that is NOT stored in the database - it exists only as a signed token transmitted between frontend and backend.

**Storage**:
- Frontend: localStorage or httpOnly cookie (managed by Better Auth)
- Backend: Not stored (stateless authentication)

**Structure**: Standard JWT with three parts (header.payload.signature)

### JWT Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Fields**:
- `alg` (string): Signing algorithm (HS256 - HMAC SHA-256)
- `typ` (string): Token type (JWT)

### JWT Payload (Claims)
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707350400,
  "exp": 1707955200
}
```

**Standard Claims**:
- `sub` (string, UUID): Subject - User ID from users.id
- `iat` (integer, Unix timestamp): Issued At - Token creation time
- `exp` (integer, Unix timestamp): Expiration - Token expiry time (7 days from iat)

**Custom Claims**:
- `email` (string): User's email address for display purposes

**Validation Rules**:
- `sub` must be a valid UUID matching a user in the database
- `exp` must be in the future (not expired)
- `iat` must be in the past (not issued in future)
- Signature must be valid (verified with BETTER_AUTH_SECRET)

### JWT Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  BETTER_AUTH_SECRET
)
```

**Signing**:
- Algorithm: HS256 (HMAC with SHA-256)
- Secret: BETTER_AUTH_SECRET environment variable (minimum 32 characters)
- Signed by: Better Auth on frontend
- Verified by: PyJWT on backend

**Lifecycle**:
1. **Issuance**: Better Auth creates and signs token after successful signup/signin
2. **Storage**: Frontend stores token in localStorage or httpOnly cookie
3. **Transmission**: Frontend includes token in Authorization header for every API request
4. **Verification**: Backend verifies signature and expiration on every protected endpoint
5. **Expiration**: Token becomes invalid after 7 days (exp claim)
6. **Renewal**: User must sign in again to get new token (no refresh token in MVP)

**Security Properties**:
- **Integrity**: Signature ensures token hasn't been tampered with
- **Authenticity**: Only party with BETTER_AUTH_SECRET can create valid tokens
- **Expiration**: Time-limited validity reduces risk if token compromised
- **Stateless**: Backend doesn't need to store or look up tokens

**Notes**:
- Token is self-contained (all user info in payload)
- Backend extracts user ID from `sub` claim after verification
- No database queries needed for authentication (only for authorization)
- Token cannot be revoked before expiration (limitation of stateless design)

---

## Entity 3: Session (Managed by Better Auth)

**Description**: Better Auth internal session management. This is handled entirely by Better Auth and not directly accessed by application code.

**Storage**: Better Auth database tables (created automatically)

**Purpose**:
- Track active user sessions
- Store session metadata
- Enable session invalidation (logout)
- Support "remember me" functionality

**Application Usage**:
- Application code accesses session via Better Auth API
- Session provides JWT token for API requests
- Session invalidation handled by Better Auth logout

**Notes**:
- Implementation details abstracted by Better Auth
- No direct database access required
- Better Auth handles session lifecycle

---

## Data Flow Diagrams

### Signup Flow
```
User Input (email, password)
    ↓
Better Auth (Frontend)
    ↓
Validate email format
Validate password length (≥8 chars)
    ↓
Hash password (bcrypt/argon2)
    ↓
Create User record in database
    ↓
Generate JWT token
    - sub: user.id
    - email: user.email
    - iat: now
    - exp: now + 7 days
    ↓
Sign token with BETTER_AUTH_SECRET
    ↓
Return JWT to frontend
    ↓
Store JWT in localStorage
```

### Signin Flow
```
User Input (email, password)
    ↓
Better Auth (Frontend)
    ↓
Query User by email
    ↓
Verify password hash
    ↓
Generate JWT token
    - sub: user.id
    - email: user.email
    - iat: now
    - exp: now + 7 days
    ↓
Sign token with BETTER_AUTH_SECRET
    ↓
Return JWT to frontend
    ↓
Store JWT in localStorage
```

### API Request Flow
```
Frontend API Request
    ↓
Retrieve JWT from localStorage
    ↓
Add Authorization header: Bearer <token>
    ↓
Send request to backend
    ↓
Backend Middleware
    ↓
Extract Authorization header
    ↓
Verify JWT signature with BETTER_AUTH_SECRET
    ↓
Validate expiration (exp > now)
    ↓
Extract user ID from sub claim
    ↓
Attach user ID to request context
    ↓
Protected Endpoint
    ↓
Query database WHERE user_id = <from JWT>
    ↓
Return user-specific data
```

---

## Database Schema Changes

**Required Changes**: NONE

The User table already exists from the Backend API feature. Better Auth will manage its own internal tables for session management.

**Existing Schema** (from specs/003-backend-api):
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

**Better Auth Tables** (created automatically):
- Better Auth will create its own tables for session management
- These tables are internal to Better Auth and not accessed by application code
- Schema managed by Better Auth migrations

**Note**: The existing User table may need a `password_hash` column added by Better Auth during initialization. This will be handled automatically by Better Auth's database setup.

---

## Validation Summary

### User Entity Validation
- ✅ Email format validation (RFC 5322)
- ✅ Email uniqueness (database constraint)
- ✅ Password length ≥ 8 characters (Better Auth)
- ✅ Password hashing (bcrypt/argon2 via Better Auth)

### JWT Token Validation
- ✅ Signature verification (HMAC SHA-256)
- ✅ Expiration validation (exp > now)
- ✅ User ID format (valid UUID)
- ✅ Issued-at validation (iat ≤ now)

### Security Validation
- ✅ Passwords never stored in plaintext
- ✅ JWT secret never exposed to client
- ✅ Tokens time-limited (7 days)
- ✅ User isolation enforced at query level

---

## Summary

**Entities Defined**: 3 (User, JWT Token, Session)
**Database Changes**: None required (User table already exists)
**Validation Rules**: Comprehensive validation at all layers
**Security**: Password hashing, JWT signing, token expiration, user isolation

**Next Steps**:
- Create API contracts for authentication endpoints
- Create JWT format specification
- Create quickstart guide for setup and testing
