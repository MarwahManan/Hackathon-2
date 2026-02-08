# API Contract: Authentication Endpoints

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08
**Backend Base URL**: `http://localhost:8000` (development) / `https://api.example.com` (production)

## Overview

This document defines the authentication API endpoints that the frontend will consume. All authentication endpoints are provided by the backend FastAPI service with Better Auth integration.

---

## 1. User Signup

**Endpoint**: `POST /api/auth/signup`

**Description**: Create a new user account with email and password.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T10:30:00Z"
  },
  "message": "Account created successfully"
}
```

**Response Headers** (Success):
```
Set-Cookie: token=<JWT_TOKEN>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

**Error Responses**:

**400 Bad Request** (Validation Error):
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

**409 Conflict** (Email Already Exists):
```json
{
  "error": "Email already registered",
  "code": "EMAIL_EXISTS",
  "statusCode": 409
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "statusCode": 500
}
```

**Frontend Implementation**:
```typescript
// lib/api/auth.ts
import apiClient from './client'
import { SignupCredentials, AuthResponse } from '@/types/auth'

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  const { confirmPassword, ...payload } = credentials // Remove confirmPassword
  const response = await apiClient.post<AuthResponse>('/api/auth/signup', payload)
  return response.data
}
```

---

## 2. User Login

**Endpoint**: `POST /api/auth/login`

**Description**: Authenticate user with email and password, receive JWT token.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T10:30:00Z"
  },
  "message": "Login successful"
}
```

**Response Headers** (Success):
```
Set-Cookie: token=<JWT_TOKEN>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

**Error Responses**:

**401 Unauthorized** (Invalid Credentials):
```json
{
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS",
  "statusCode": 401
}
```

**400 Bad Request** (Validation Error):
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": {
    "email": "Email is required",
    "password": "Password is required"
  }
}
```

**Frontend Implementation**:
```typescript
// lib/api/auth.ts
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials)
  return response.data
}
```

---

## 3. User Logout

**Endpoint**: `POST /api/auth/logout`

**Description**: Invalidate current session and clear JWT token.

**Request Headers**:
```
Cookie: token=<JWT_TOKEN>
```

**Request Body**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Response Headers** (Success):
```
Set-Cookie: token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0
```

**Error Responses**:

**401 Unauthorized** (No Token):
```json
{
  "error": "Not authenticated",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

**Frontend Implementation**:
```typescript
// lib/api/auth.ts
export async function logout(): Promise<void> {
  await apiClient.post('/api/auth/logout')
  // Token is cleared by backend via Set-Cookie header
}
```

---

## 4. Get Current User

**Endpoint**: `GET /api/auth/me`

**Description**: Retrieve current authenticated user's information.

**Request Headers**:
```
Cookie: token=<JWT_TOKEN>
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T10:30:00Z"
  }
}
```

**Error Responses**:

**401 Unauthorized** (Invalid/Expired Token):
```json
{
  "error": "Invalid or expired token",
  "code": "TOKEN_EXPIRED",
  "statusCode": 401
}
```

**Frontend Implementation**:
```typescript
// lib/api/auth.ts
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<{ success: boolean; user: User }>('/api/auth/me')
  return response.data.user
}
```

---

## Authentication Flow

### Signup Flow
```
1. User fills signup form (email, password, confirmPassword)
2. Frontend validates confirmPassword matches password
3. Frontend sends POST /api/auth/signup (without confirmPassword)
4. Backend validates input, hashes password, creates user
5. Backend generates JWT token, sets HttpOnly cookie
6. Backend returns user data
7. Frontend stores user in AuthContext
8. Frontend redirects to /tasks
```

### Login Flow
```
1. User fills login form (email, password)
2. Frontend sends POST /api/auth/login
3. Backend validates credentials
4. Backend generates JWT token, sets HttpOnly cookie
5. Backend returns user data
6. Frontend stores user in AuthContext
7. Frontend redirects to /tasks
```

### Logout Flow
```
1. User clicks logout button
2. Frontend sends POST /api/auth/logout
3. Backend clears JWT cookie (Max-Age=0)
4. Frontend clears user from AuthContext
5. Frontend redirects to /login
```

### Session Persistence Flow
```
1. User refreshes page or returns to app
2. Frontend sends GET /api/auth/me (cookie automatically included)
3. Backend verifies JWT token from cookie
4. Backend returns user data
5. Frontend restores user in AuthContext
6. User remains logged in
```

---

## Error Handling

### 401 Unauthorized
- Clear user from AuthContext
- Redirect to /login
- Show message: "Session expired. Please log in again."

### 400 Validation Error
- Display field-level errors in form
- Keep user on current page
- Preserve form data

### 409 Conflict (Email Exists)
- Display error message: "Email already registered"
- Suggest login instead
- Provide link to /login

### 500 Internal Server Error
- Display generic error message: "Something went wrong. Please try again."
- Provide retry button
- Log error for debugging

---

## Security Considerations

1. **HttpOnly Cookies**: JWT token stored in HttpOnly cookie (not accessible to JavaScript)
2. **Secure Flag**: Cookie only transmitted over HTTPS in production
3. **SameSite=Strict**: Prevents CSRF attacks
4. **Token Expiration**: 24-hour expiration (86400 seconds)
5. **Password Hashing**: Backend uses bcrypt/argon2 (not visible to frontend)
6. **HTTPS Only**: All authentication endpoints must use HTTPS in production
7. **No Token in URL**: Never pass JWT token in query parameters or URL

---

## Testing Checklist

- [ ] Signup with valid credentials creates account and sets cookie
- [ ] Signup with existing email returns 409 error
- [ ] Signup with invalid email returns 400 error
- [ ] Login with valid credentials sets cookie and returns user
- [ ] Login with invalid credentials returns 401 error
- [ ] Logout clears cookie and invalidates session
- [ ] GET /api/auth/me returns user when authenticated
- [ ] GET /api/auth/me returns 401 when not authenticated
- [ ] Token expiration after 24 hours triggers 401 error
- [ ] Cookie is HttpOnly and not accessible via JavaScript
- [ ] Cookie has Secure flag in production
- [ ] Cookie has SameSite=Strict flag
