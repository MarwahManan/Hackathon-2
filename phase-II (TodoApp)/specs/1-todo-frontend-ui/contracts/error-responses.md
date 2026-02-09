# API Contract: Error Responses

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Backend**: FastAPI

## Overview

This document defines the standardized error response format and error codes used across all API endpoints. Consistent error handling enables the frontend to provide clear, actionable feedback to users.

---

## Standard Error Response Format

All API errors follow this structure:

```typescript
interface ApiError {
  error: string;                              // Error code/type (uppercase snake_case)
  message: string;                            // Human-readable error message
  details?: Record<string, string[]>;         // Field-level validation errors (optional)
  statusCode: number;                         // HTTP status code
  timestamp?: string;                         // ISO 8601 timestamp (optional)
}
```

**Example**:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  },
  "statusCode": 400,
  "timestamp": "2026-02-09T10:30:00Z"
}
```

---

## HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 400 | Bad Request | Invalid input, validation errors |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists (e.g., duplicate email) |
| 422 | Unprocessable Entity | Semantic validation errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Server temporarily unavailable |

---

## Error Codes

### Authentication Errors (401)

**UNAUTHORIZED**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```
**When**: No JWT token provided or token is invalid

**Frontend Action**: Redirect to login page, clear stored token

---

**TOKEN_EXPIRED**
```json
{
  "error": "TOKEN_EXPIRED",
  "message": "Your session has expired. Please login again.",
  "statusCode": 401
}
```
**When**: JWT token has expired

**Frontend Action**: Clear token, redirect to login with message

---

**INVALID_CREDENTIALS**
```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "statusCode": 401
}
```
**When**: Login attempt with incorrect credentials

**Frontend Action**: Show error message, keep user on login page

---

### Validation Errors (400)

**VALIDATION_ERROR**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "title": ["Title is required", "Title must be between 1 and 100 characters"],
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  },
  "statusCode": 400
}
```
**When**: Request body fails validation rules

**Frontend Action**: Display field-level errors next to form inputs

---

**MISSING_REQUIRED_FIELD**
```json
{
  "error": "MISSING_REQUIRED_FIELD",
  "message": "Required field is missing",
  "details": {
    "title": ["This field is required"]
  },
  "statusCode": 400
}
```
**When**: Required field is missing from request

**Frontend Action**: Highlight missing field, show error message

---

### Not Found Errors (404)

**TASK_NOT_FOUND**
```json
{
  "error": "TASK_NOT_FOUND",
  "message": "Task not found",
  "statusCode": 404
}
```
**When**: Requested task doesn't exist or doesn't belong to user

**Frontend Action**: Show "Task not found" message, redirect to task list

---

**USER_NOT_FOUND**
```json
{
  "error": "USER_NOT_FOUND",
  "message": "User not found",
  "statusCode": 404
}
```
**When**: User account doesn't exist

**Frontend Action**: Show error message (rare, usually auth issue)

---

**ROUTE_NOT_FOUND**
```json
{
  "error": "ROUTE_NOT_FOUND",
  "message": "The requested endpoint does not exist",
  "statusCode": 404
}
```
**When**: API endpoint doesn't exist

**Frontend Action**: Log error, show generic error message to user

---

### Conflict Errors (409)

**EMAIL_EXISTS**
```json
{
  "error": "EMAIL_EXISTS",
  "message": "An account with this email already exists",
  "statusCode": 409
}
```
**When**: Signup attempt with existing email

**Frontend Action**: Show error on email field, suggest login instead

---

**RESOURCE_CONFLICT**
```json
{
  "error": "RESOURCE_CONFLICT",
  "message": "The resource has been modified by another request",
  "statusCode": 409
}
```
**When**: Concurrent modification detected

**Frontend Action**: Refresh data, show conflict message

---

### Server Errors (500)

**INTERNAL_SERVER_ERROR**
```json
{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred. Please try again later.",
  "statusCode": 500
}
```
**When**: Unexpected server error

**Frontend Action**: Show generic error message, log error details

---

**DATABASE_ERROR**
```json
{
  "error": "DATABASE_ERROR",
  "message": "A database error occurred. Please try again.",
  "statusCode": 500
}
```
**When**: Database operation fails

**Frontend Action**: Show error message, allow retry

---

### Rate Limiting (429)

**RATE_LIMIT_EXCEEDED**
```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again in 60 seconds.",
  "statusCode": 429
}
```
**When**: User exceeds rate limit

**Frontend Action**: Show countdown timer, disable actions temporarily

---

### Service Unavailable (503)

**SERVICE_UNAVAILABLE**
```json
{
  "error": "SERVICE_UNAVAILABLE",
  "message": "The service is temporarily unavailable. Please try again later.",
  "statusCode": 503
}
```
**When**: Server is down or under maintenance

**Frontend Action**: Show maintenance message, suggest retry

---

## Network Errors (Client-Side)

These errors occur on the client side before reaching the server:

**NETWORK_ERROR**
```typescript
{
  error: 'NETWORK_ERROR',
  message: 'Unable to connect to the server. Please check your internet connection.',
  statusCode: 0
}
```
**When**: Network request fails (no internet, CORS, etc.)

**Frontend Action**: Show connection error, provide retry button

---

**TIMEOUT_ERROR**
```typescript
{
  error: 'TIMEOUT_ERROR',
  message: 'The request took too long. Please try again.',
  statusCode: 0
}
```
**When**: Request exceeds timeout limit

**Frontend Action**: Show timeout message, allow retry

---

## Frontend Error Handling

### Axios Interceptor

```typescript
// /lib/api/client.ts
import axios from 'axios';
import { clearToken } from '@/lib/auth/token';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error
    if (!error.response) {
      return Promise.reject({
        error: 'NETWORK_ERROR',
        message: 'Unable to connect to the server. Please check your internet connection.',
        statusCode: 0,
      });
    }

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        error: 'TIMEOUT_ERROR',
        message: 'The request took too long. Please try again.',
        statusCode: 0,
      });
    }

    // 401 Unauthorized - clear token and redirect
    if (error.response.status === 401) {
      clearToken();
      window.location.href = '/login';
    }

    // Return standardized error
    return Promise.reject(error.response.data);
  }
);
```

### Error Display Component

```typescript
// /components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  error: ApiError | null;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {error.message}
          </h3>
          {error.details && (
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              {Object.entries(error.details).map(([field, messages]) => (
                <li key={field}>
                  {field}: {messages.join(', ')}
                </li>
              ))}
            </ul>
          )}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-4 text-sm font-medium text-red-800 hover:text-red-900"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
```

### Field-Level Error Display

```typescript
// /components/ui/Input.tsx
interface InputProps {
  label: string;
  error?: string;
  // ... other props
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={`mt-1 block w-full rounded-md ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

---

## Error Logging

```typescript
// /lib/utils/error-logger.ts
export function logError(error: ApiError, context?: Record<string, any>) {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', {
      error,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  // In production, send to error tracking service (e.g., Sentry)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: context });
  }
}
```

---

## User-Friendly Error Messages

Map technical error codes to user-friendly messages:

```typescript
// /lib/utils/error-messages.ts
export const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHORIZED: 'Please log in to continue',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  VALIDATION_ERROR: 'Please check your input and try again',
  EMAIL_EXISTS: 'This email is already registered. Try logging in instead.',
  TASK_NOT_FOUND: 'This task could not be found',
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',
};

export function getUserFriendlyMessage(error: ApiError): string {
  return ERROR_MESSAGES[error.error] || error.message || 'An unexpected error occurred';
}
```

---

## Testing Error Scenarios

### Unit Tests

```typescript
// __tests__/api/error-handling.test.ts
describe('API Error Handling', () => {
  it('should handle 401 errors by clearing token and redirecting', async () => {
    // Mock 401 response
    // Verify token is cleared
    // Verify redirect to /login
  });

  it('should display field-level validation errors', async () => {
    // Mock 400 response with details
    // Verify errors are displayed next to fields
  });

  it('should handle network errors gracefully', async () => {
    // Mock network failure
    // Verify error message is shown
    // Verify retry button is available
  });
});
```

---

## Summary

This error handling strategy provides:
- **Consistency**: Standardized error format across all endpoints
- **Clarity**: User-friendly messages for all error scenarios
- **Actionability**: Clear next steps for users (retry, login, fix input)
- **Debugging**: Detailed error information for developers
- **Resilience**: Graceful handling of network and server errors
- **Security**: No sensitive information leaked in error messages

All error codes and messages align with the backend API implementation and support the functional requirements in `spec.md`.
