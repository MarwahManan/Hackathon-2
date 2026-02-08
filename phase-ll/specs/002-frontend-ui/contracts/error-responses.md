# API Contract: Error Responses

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08

## Overview

This document defines the standardized error response format used across all API endpoints. The frontend must handle these error responses consistently to provide a good user experience.

---

## Standard Error Response Format

All API errors follow this consistent structure:

```typescript
interface ErrorResponse {
  error: string                 // Human-readable error message
  code: string                  // Machine-readable error code
  statusCode: number            // HTTP status code
  details?: Record<string, any> // Optional additional details (e.g., validation errors)
}
```

---

## HTTP Status Codes

### 400 Bad Request
**When**: Client sends invalid data (validation errors, malformed JSON)

**Example**:
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": {
    "title": "Title is required and cannot be empty",
    "email": "Invalid email format"
  }
}
```

**Frontend Handling**:
- Display field-level errors in forms
- Highlight invalid fields
- Keep user on current page
- Preserve form data for correction

---

### 401 Unauthorized
**When**: Authentication required but not provided, or token is invalid/expired

**Examples**:

Missing token:
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

Invalid credentials:
```json
{
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS",
  "statusCode": 401
}
```

Expired token:
```json
{
  "error": "Token has expired",
  "code": "TOKEN_EXPIRED",
  "statusCode": 401
}
```

**Frontend Handling**:
- Clear authentication state (user, token)
- Redirect to /login
- Show message: "Session expired. Please log in again."
- Preserve intended destination for redirect after login

---

### 404 Not Found
**When**: Requested resource doesn't exist or user doesn't have access

**Example**:
```json
{
  "error": "Task not found",
  "code": "TASK_NOT_FOUND",
  "statusCode": 404
}
```

**Frontend Handling**:
- Show user-friendly message: "Task not found"
- Redirect to appropriate page (e.g., /tasks)
- Log potential security issue if user is trying to access another user's resource

**Note**: Backend returns 404 (not 403) for unauthorized access to prevent leaking resource existence.

---

### 409 Conflict
**When**: Request conflicts with current state (e.g., duplicate email)

**Example**:
```json
{
  "error": "Email already registered",
  "code": "EMAIL_EXISTS",
  "statusCode": 409
}
```

**Frontend Handling**:
- Display specific error message
- Suggest alternative action (e.g., "Try logging in instead")
- Keep user on current page
- Preserve form data

---

### 500 Internal Server Error
**When**: Unexpected server error

**Example**:
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "statusCode": 500
}
```

**Frontend Handling**:
- Show generic error message: "Something went wrong. Please try again."
- Provide retry button
- Log error details for debugging
- Don't expose technical details to user

---

## Error Codes Reference

### Authentication Errors (401)
| Code | Description | User Message |
|------|-------------|--------------|
| `UNAUTHORIZED` | No authentication provided | "Please log in to continue" |
| `INVALID_CREDENTIALS` | Wrong email/password | "Invalid email or password" |
| `TOKEN_EXPIRED` | JWT token expired | "Session expired. Please log in again." |
| `TOKEN_INVALID` | JWT token malformed | "Invalid session. Please log in again." |

### Validation Errors (400)
| Code | Description | User Message |
|------|-------------|--------------|
| `VALIDATION_ERROR` | Input validation failed | Display field-specific errors |
| `INVALID_INPUT` | Malformed request data | "Invalid input. Please check your data." |
| `MISSING_FIELD` | Required field not provided | "Required field: [field name]" |

### Not Found Errors (404)
| Code | Description | User Message |
|------|-------------|--------------|
| `TASK_NOT_FOUND` | Task doesn't exist or no access | "Task not found" |
| `USER_NOT_FOUND` | User doesn't exist | "User not found" |
| `RESOURCE_NOT_FOUND` | Generic resource not found | "Resource not found" |

### Conflict Errors (409)
| Code | Description | User Message |
|------|-------------|--------------|
| `EMAIL_EXISTS` | Email already registered | "Email already registered. Try logging in." |
| `DUPLICATE_RESOURCE` | Resource already exists | "This resource already exists" |

### Server Errors (500)
| Code | Description | User Message |
|------|-------------|--------------|
| `INTERNAL_ERROR` | Unexpected server error | "Something went wrong. Please try again." |
| `DATABASE_ERROR` | Database operation failed | "Unable to process request. Please try again." |

### Network Errors (Client-Side)
| Code | Description | User Message |
|------|-------------|--------------|
| `NETWORK_ERROR` | Network request failed | "Network error. Please check your connection." |
| `TIMEOUT_ERROR` | Request timed out | "Request timed out. Please try again." |

---

## Frontend Error Handling Implementation

### Axios Interceptor

```typescript
// lib/api/client.ts
import axios from 'axios'
import { ErrorResponse, ErrorCode } from '@/types/api'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  withCredentials: true
})

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const errorResponse: ErrorResponse = error.response.data

      switch (errorResponse.statusCode) {
        case 401:
          handleUnauthorized(errorResponse)
          break
        case 404:
          handleNotFound(errorResponse)
          break
        case 500:
          handleServerError(errorResponse)
          break
      }

      return Promise.reject(errorResponse)
    } else if (error.request) {
      // Request made but no response received
      const networkError: ErrorResponse = {
        error: 'Network error. Please check your connection.',
        code: ErrorCode.NETWORK_ERROR,
        statusCode: 0
      }
      return Promise.reject(networkError)
    } else {
      // Error setting up request
      const unknownError: ErrorResponse = {
        error: 'An unexpected error occurred',
        code: ErrorCode.INTERNAL_ERROR,
        statusCode: 0
      }
      return Promise.reject(unknownError)
    }
  }
)

function handleUnauthorized(error: ErrorResponse) {
  // Clear auth state
  localStorage.removeItem('user')
  // Redirect to login
  window.location.href = '/login'
}

function handleNotFound(error: ErrorResponse) {
  console.warn('Resource not found:', error)
}

function handleServerError(error: ErrorResponse) {
  console.error('Server error:', error)
}

export default apiClient
```

### Error Display Component

```typescript
// components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  error: ErrorResponse | null
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-700 mt-1">{error.error}</p>

          {error.details && (
            <ul className="mt-2 text-sm text-red-600">
              {Object.entries(error.details).map(([field, message]) => (
                <li key={field}>• {message}</li>
              ))}
            </ul>
          )}
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
```

### Form Validation Error Display

```typescript
// components/ui/FormField.tsx
interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
```

---

## Error Handling Best Practices

### 1. User-Friendly Messages
- Never expose technical details (stack traces, SQL errors)
- Use plain language
- Provide actionable guidance ("Try logging in" vs "Authentication failed")

### 2. Preserve User Data
- Don't clear form data on validation errors
- Allow users to correct and retry
- Implement autosave for long forms (future enhancement)

### 3. Graceful Degradation
- Show partial data if some requests fail
- Provide offline indicators
- Allow retry without page refresh

### 4. Logging and Monitoring
- Log all errors for debugging
- Include error code, timestamp, user context
- Don't log sensitive data (passwords, tokens)

### 5. Consistent Behavior
- Same error code always produces same user experience
- Centralized error handling (Axios interceptor)
- Reusable error display components

---

## Testing Error Scenarios

### Manual Testing Checklist
- [ ] 401: Access protected route without login → Redirect to /login
- [ ] 401: Token expires during session → Show "Session expired" message
- [ ] 400: Submit form with invalid data → Show field-level errors
- [ ] 404: Access non-existent task → Show "Task not found" message
- [ ] 409: Signup with existing email → Show "Email already registered"
- [ ] 500: Simulate server error → Show generic error with retry
- [ ] Network: Disconnect internet → Show "Network error" message
- [ ] Timeout: Simulate slow API → Show timeout error after 10s

### Automated Testing (Future)
```typescript
// __tests__/api/error-handling.test.ts
describe('API Error Handling', () => {
  it('should redirect to login on 401', async () => {
    // Mock 401 response
    // Verify redirect to /login
  })

  it('should display validation errors on 400', async () => {
    // Mock 400 response with details
    // Verify field errors displayed
  })

  it('should show retry button on 500', async () => {
    // Mock 500 response
    // Verify retry button appears
  })
})
```

---

## Summary

All API errors follow a consistent format with:
- Human-readable `error` message
- Machine-readable `code`
- HTTP `statusCode`
- Optional `details` for validation errors

Frontend handles errors centrally via Axios interceptor and displays user-friendly messages with appropriate actions (retry, redirect, correction).
