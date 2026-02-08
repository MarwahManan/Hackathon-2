# Implementation Plan: Authentication & Security

**Feature**: Authentication & Security for Todo Full-Stack Web Application
**Branch**: `004-auth-security`
**Created**: 2026-02-08
**Status**: Planning

## Executive Summary

Implement a secure, stateless authentication and authorization layer using Better Auth and JWT tokens that enables secure communication between the Next.js frontend and FastAPI backend. This feature provides user signup, signin, JWT token issuance, token verification, and strict user isolation across all API endpoints.

## Technical Context

### Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Frontend Auth | Better Auth | Latest | User authentication and JWT issuance |
| JWT Plugin | Better Auth JWT Plugin | Latest | Enable JWT token generation |
| Backend Auth | PyJWT | 2.8+ | JWT token verification |
| Frontend Framework | Next.js | 16+ (App Router) | UI and routing |
| Backend Framework | FastAPI | 0.104+ | API endpoints |
| Database | Neon PostgreSQL | Latest | User storage (already configured) |
| ORM | SQLModel | 0.14+ | User model (already exists) |

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │ Signup Page  │    │ Signin Page  │    │ Dashboard    │     │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │
│         │                    │                    │              │
│         └────────────────────┴────────────────────┘              │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │   Better Auth     │                        │
│                    │   (JWT Plugin)    │                        │
│                    └─────────┬─────────┘                        │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │  JWT Token Store  │                        │
│                    │  (localStorage)   │                        │
│                    └─────────┬─────────┘                        │
└──────────────────────────────┼─────────────────────────────────┘
                               │
                    Authorization: Bearer <token>
                               │
┌──────────────────────────────▼─────────────────────────────────┐
│                        Backend (FastAPI)                        │
│  ┌──────────────────────────────────────────────────────┐     │
│  │           JWT Verification Middleware                 │     │
│  │  1. Extract Authorization header                      │     │
│  │  2. Verify signature with BETTER_AUTH_SECRET         │     │
│  │  3. Validate expiration                              │     │
│  │  4. Extract user ID from "sub" claim                 │     │
│  └──────────────────┬───────────────────────────────────┘     │
│                     │                                           │
│         ┌───────────▼───────────┐                              │
│         │  Protected Endpoints  │                              │
│         │  - GET /api/tasks     │                              │
│         │  - POST /api/tasks    │                              │
│         │  - PUT /api/tasks/:id │                              │
│         │  - DELETE /api/tasks  │                              │
│         └───────────┬───────────┘                              │
│                     │                                           │
│         ┌───────────▼───────────┐                              │
│         │  Database Queries     │                              │
│         │  WHERE user_id = ?    │                              │
│         └───────────────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Stateless Authentication**: Backend does not store sessions. JWT tokens contain all necessary user information.

2. **Shared Secret**: Both frontend (Better Auth) and backend (PyJWT) use the same `BETTER_AUTH_SECRET` environment variable for signing and verifying tokens.

3. **Token Transport**: JWT transmitted via `Authorization: Bearer <token>` header (not cookies or query params) for security and simplicity.

4. **User Isolation**: All database queries filtered by `user_id` extracted from verified JWT token, not from request parameters.

5. **Error Handling**: Return 401 Unauthorized for all authentication failures (missing, invalid, expired tokens). Return 404 (not 403) when user attempts to access another user's resource.

6. **Token Storage**: Frontend stores JWT in localStorage (or httpOnly cookies if Better Auth supports it) for persistence across sessions.

## Constitution Check

### Principle I: Functional Completeness ✅
- **Status**: PASS
- **Justification**: Feature implements complete authentication flow (signup, signin, token verification, user isolation). All functional requirements from spec are addressed.

### Principle II: Security-First ✅
- **Status**: PASS
- **Justification**:
  - JWT tokens verified on every protected endpoint
  - Database queries filtered by authenticated user ID
  - Secrets stored in environment variables (BETTER_AUTH_SECRET)
  - All endpoints return 401 for invalid/missing tokens
  - User isolation enforced at query level

### Principle III: Reliability & Correctness ✅
- **Status**: PASS
- **Justification**:
  - All endpoints validate input and return appropriate error codes
  - User ID from JWT matches user ID in request context
  - Error responses follow consistent format
  - Token expiration enforced

### Principle IV: Responsiveness ✅
- **Status**: PASS
- **Justification**: Authentication UI (signup/signin pages) will be responsive as part of frontend implementation. This plan focuses on authentication logic, not UI design.

### Principle V: Spec-Driven Development ✅
- **Status**: PASS
- **Justification**: Following Spec → Plan → Tasks workflow. Will use specialized agents (auth-security-architect, nextjs-ui-dev, fastapi-backend-architect) for implementation.

**Overall Constitution Compliance**: ✅ PASS - All principles satisfied

## Project Structure

```
phase-ll/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── signup/
│   │   │   │   └── page.tsx          # Signup page
│   │   │   └── signin/
│   │   │       └── page.tsx          # Signin page
│   │   └── dashboard/
│   │       └── page.tsx              # Protected dashboard
│   ├── lib/
│   │   ├── auth.ts                   # Better Auth configuration
│   │   ├── auth-client.ts            # Better Auth client setup
│   │   └── api-client.ts             # API client with JWT injection
│   └── .env.local                    # Frontend environment variables
│
├── backend/
│   ├── app/
│   │   ├── middleware/
│   │   │   └── auth.py               # JWT verification middleware (UPDATE)
│   │   ├── utils/
│   │   │   └── jwt.py                # JWT utilities (UPDATE)
│   │   └── main.py                   # Apply auth middleware (UPDATE)
│   └── .env                          # Backend environment variables (UPDATE)
│
└── specs/004-auth-security/
    ├── spec.md                       # Feature specification (DONE)
    ├── plan.md                       # This file
    ├── research.md                   # Technology research
    ├── data-model.md                 # Entity definitions
    ├── contracts/                    # API contracts
    │   ├── auth-endpoints.md         # Better Auth endpoints
    │   └── jwt-format.md             # JWT token structure
    └── quickstart.md                 # Setup and testing guide
```

## Implementation Phases

### Phase 0: Research & Design ✅
- Document Better Auth configuration patterns
- Research JWT plugin setup
- Define JWT token structure
- Document security best practices

### Phase 1: Frontend Authentication Setup
**Goal**: Configure Better Auth with JWT plugin on Next.js frontend

**Tasks**:
1. Install Better Auth and JWT plugin dependencies
2. Create Better Auth configuration file (`lib/auth.ts`)
3. Configure JWT plugin with BETTER_AUTH_SECRET
4. Set token expiration (7 days default)
5. Create Better Auth client setup (`lib/auth-client.ts`)
6. Configure Better Auth API routes in Next.js

**Deliverables**:
- Better Auth configured and operational
- JWT plugin enabled
- Environment variables documented

### Phase 2: Signup & Signin UI
**Goal**: Implement user-facing authentication pages

**Tasks**:
1. Create signup page with email/password form
2. Create signin page with email/password form
3. Implement form validation (email format, password length)
4. Handle authentication errors and display messages
5. Redirect authenticated users to dashboard
6. Redirect unauthenticated users to signin

**Deliverables**:
- Functional signup page
- Functional signin page
- Client-side validation
- Error handling

### Phase 3: JWT Token Management (Frontend)
**Goal**: Store and attach JWT tokens to API requests

**Tasks**:
1. Retrieve JWT from Better Auth session after authentication
2. Store JWT securely (localStorage or httpOnly cookie)
3. Create API client wrapper that injects JWT into Authorization header
4. Implement token refresh logic (if needed)
5. Handle token expiration on frontend

**Deliverables**:
- JWT stored securely
- All API requests include Authorization header
- Token expiration handled gracefully

### Phase 4: Backend JWT Verification
**Goal**: Implement JWT verification middleware in FastAPI

**Tasks**:
1. Update `app/utils/jwt.py` to verify Better Auth JWT tokens
2. Update `app/middleware/auth.py` to use BETTER_AUTH_SECRET
3. Extract user ID from JWT "sub" claim
4. Validate token expiration
5. Return 401 for missing/invalid/expired tokens
6. Apply middleware to all protected endpoints

**Deliverables**:
- JWT verification middleware operational
- User ID extracted from token
- Proper error responses for auth failures

### Phase 5: User Isolation Enforcement
**Goal**: Ensure all API endpoints filter by authenticated user

**Tasks**:
1. Verify all task endpoints use `current_user` from JWT
2. Update database queries to filter by `user_id`
3. Return 404 (not 403) for cross-user access attempts
4. Test user isolation with multiple users

**Deliverables**:
- All endpoints enforce user isolation
- Cross-user access blocked
- Security tests passing

### Phase 6: End-to-End Testing
**Goal**: Verify complete authentication flow

**Tasks**:
1. Test signup flow (create account, receive JWT)
2. Test signin flow (authenticate, receive JWT)
3. Test protected API access with valid JWT
4. Test API rejection with invalid JWT
5. Test API rejection with expired JWT
6. Test user isolation (user A cannot access user B's tasks)
7. Test token persistence across page navigation

**Deliverables**:
- All authentication scenarios tested
- Security validation complete
- User isolation verified

## Dependencies

### External Dependencies
- **Better Auth**: Frontend authentication library
- **Better Auth JWT Plugin**: JWT token issuance
- **PyJWT**: Backend JWT verification (already installed)

### Internal Dependencies
- **Backend API**: Must be running (already implemented in specs/003-backend-api)
- **User Model**: Database table exists (already implemented)
- **Task Endpoints**: Protected endpoints exist (already implemented)
- **CORS Configuration**: Backend allows frontend origin (already configured)

### Prerequisite Features
- ✅ **specs/003-backend-api**: Backend API complete
- ✅ **Database Setup**: Neon PostgreSQL with users table initialized

## Risk Analysis

### Risk 1: JWT Secret Mismatch
**Probability**: Medium | **Impact**: High

**Description**: Frontend and backend use different JWT secrets, causing all token verifications to fail.

**Mitigation**:
- Use identical environment variable name (BETTER_AUTH_SECRET) in both
- Document requirement clearly in quickstart.md
- Add validation step in setup instructions
- Test token verification during development

### Risk 2: Better Auth JWT Format Incompatibility
**Probability**: Low | **Impact**: High

**Description**: Better Auth JWT format differs from PyJWT expectations.

**Mitigation**:
- Research Better Auth JWT structure during Phase 0
- Document expected JWT claims in contracts/jwt-format.md
- Test token decoding early in implementation
- Have fallback plan to customize JWT format if needed

### Risk 3: Token Storage Security
**Probability**: Medium | **Impact**: Medium

**Description**: JWT stored insecurely in localStorage vulnerable to XSS attacks.

**Mitigation**:
- Prefer httpOnly cookies if Better Auth supports it
- Implement Content Security Policy (CSP) if using localStorage
- Document security considerations in quickstart.md
- Consider token refresh mechanism for shorter expiration

### Risk 4: CORS Issues
**Probability**: Low | **Impact**: Medium

**Description**: Backend CORS policy blocks authentication requests.

**Mitigation**:
- Verify CORS configuration in backend (already configured)
- Test authentication flow in development
- Document CORS requirements in quickstart.md

## Success Metrics

### Functional Metrics
- ✅ Users can signup with email/password
- ✅ Users can signin with email/password
- ✅ JWT token issued after successful authentication
- ✅ JWT automatically attached to all API requests
- ✅ Backend verifies JWT on every protected endpoint
- ✅ User isolation enforced (0% cross-user access)

### Performance Metrics
- JWT verification adds < 50ms latency per request
- Authentication endpoints respond in < 500ms
- System handles 100 concurrent authentication requests

### Security Metrics
- 100% of requests without JWT return 401
- 100% of requests with invalid JWT return 401
- 100% of requests with expired JWT return 401
- 0% of users can access another user's tasks

## Next Steps

1. ✅ Complete Phase 0: Research (create research.md)
2. ✅ Complete Phase 1: Design (create data-model.md, contracts/)
3. Generate tasks.md with detailed implementation tasks
4. Execute implementation via `/sp.implement`
5. Test and validate authentication flow
6. Document setup instructions in quickstart.md

## Notes

- This feature builds on existing backend infrastructure (specs/003-backend-api)
- User model already exists in database
- Task endpoints already implemented, just need authentication middleware applied
- Focus is on authentication layer, not UI design (UI handled by frontend spec)
- Implementation will use specialized agents for each layer (auth, frontend, backend)

---

**Status**: Planning Complete - Ready for Task Breakdown
**Next Command**: `/sp.tasks` to generate implementation tasks
