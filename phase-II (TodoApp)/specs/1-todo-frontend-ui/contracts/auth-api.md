# API Contract: Authentication Endpoints

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Backend**: FastAPI with Better Auth
**Base URL**: `${NEXT_PUBLIC_API_URL}/api/auth`

## Overview

This document defines the authentication API endpoints that the frontend will consume. All endpoints follow RESTful conventions and return consistent JSON responses.

---

## 1. User Signup

**Endpoint**: `POST /api/auth/signup`

**Description**: Create a new user account and return JWT token.

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

**Validation Rules**:
- `email`: Required, valid email format, max 255 characters
- `password`: Required, min 8 characters, max 128 characters

**Success Response** (201 Created):
```json
{
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "createdAt": "2026-02-09T10:30:00Z",
      "updatedAt": "2026-02-09T10:30:00Z"
    },
    "token": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-02-09T11:30:00Z"
    }
  },
  "message": "Account created successfully"
}
```

**Error Responses**:

400 Bad Request - Invalid input:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  },
  "statusCode": 400
}
```

409 Conflict - Email already exists:
```json
{
  "error": "EMAIL_EXISTS",
  "message": "An account with this email already exists",
  "statusCode": 409
}
```

---

## 2. User Login

**Endpoint**: `POST /api/auth/login`

**Description**: Authenticate user and return JWT token.

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
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "createdAt": "2026-02-09T10:30:00Z",
      "updatedAt": "2026-02-09T10:30:00Z"
    },
    "token": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-02-09T11:30:00Z"
    }
  },
  "message": "Login successful"
}
```

**Error Responses**:

401 Unauthorized - Invalid credentials:
```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "statusCode": 401
}
```

400 Bad Request - Missing fields:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email and password are required",
  "statusCode": 400
}
```

---

## 3. Get Current User

**Endpoint**: `GET /api/auth/me`

**Description**: Get currently authenticated user's information.

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response** (200 OK):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2026-02-09T10:30:00Z",
    "updatedAt": "2026-02-09T10:30:00Z"
  }
}
```

**Error Responses**:

401 Unauthorized - Missing or invalid token:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

401 Unauthorized - Expired token:
```json
{
  "error": "TOKEN_EXPIRED",
  "message": "Your session has expired. Please login again.",
  "statusCode": 401
}
```

---

## 4. Logout

**Endpoint**: `POST /api/auth/logout`

**Description**: Invalidate current JWT token (if backend maintains token blacklist).

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response** (200 OK):
```json
{
  "message": "Logout successful"
}
```

**Note**: Frontend should clear token from storage regardless of backend response.

---

## JWT Token Structure

**Header**:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**:
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "iat": 1707476400,
  "exp": 1707480000
}
```

**Claims**:
- `sub`: User ID (subject)
- `email`: User email
- `iat`: Issued at (Unix timestamp)
- `exp`: Expiration time (Unix timestamp)

**Token Lifetime**: 1 hour (3600 seconds)

---

## Frontend Integration

### Axios Client Configuration

```typescript
// /lib/api/auth.ts
import { apiClient } from './client';
import type { User, AuthToken } from '@/types/auth';

interface SignupRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    user: User;
    token: AuthToken;
  };
  message: string;
}

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
```

### Token Storage

```typescript
// /lib/auth/token.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

export function setToken(token: string, expiresAt: string): void {
  // Store in HttpOnly cookie (preferred)
  Cookies.set(TOKEN_KEY, token, {
    expires: new Date(expiresAt),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  // Store expiry in localStorage for client-side checks
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
}

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function clearToken(): void {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return new Date(expiry) < new Date();
}
```

---

## Security Considerations

1. **HTTPS Only**: All authentication endpoints MUST use HTTPS in production
2. **Token Storage**: Use HttpOnly cookies to prevent XSS attacks
3. **CSRF Protection**: Use SameSite=Strict cookie attribute
4. **Password Requirements**: Enforce strong passwords (min 8 chars, complexity)
5. **Rate Limiting**: Backend should implement rate limiting on auth endpoints
6. **Token Expiration**: Short-lived tokens (1 hour) with refresh mechanism
7. **Error Messages**: Generic error messages to prevent user enumeration

---

## Error Handling

```typescript
// /lib/api/client.ts - Response interceptor
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

## Testing Checklist

- [ ] Signup with valid credentials returns 201 and JWT token
- [ ] Signup with existing email returns 409 error
- [ ] Signup with invalid email returns 400 error
- [ ] Login with valid credentials returns 200 and JWT token
- [ ] Login with invalid credentials returns 401 error
- [ ] Get current user with valid token returns 200 and user data
- [ ] Get current user with invalid token returns 401 error
- [ ] Get current user with expired token returns 401 error
- [ ] Logout clears token and returns 200
- [ ] Token is automatically attached to all authenticated requests
- [ ] 401 responses trigger automatic redirect to login
