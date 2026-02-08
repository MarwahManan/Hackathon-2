# API Contract: Error Responses

**Feature**: Backend & API for Todo Application
**Date**: 2026-02-08

## Overview

This document defines the standardized error response format for all API endpoints. Consistent error handling enables the frontend to handle errors gracefully and provide clear feedback to users.

---

## Error Response Format

All error responses follow this JSON structure:

```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_ERROR_CODE",
  "details": [
    {
      "field": "field_name",
      "message": "Field-specific error message"
    }
  ]
}
```

**Fields**:
- `error` (string, required): Human-readable error message for display
- `code` (string, required): Machine-readable error code for programmatic handling
- `details` (array, optional): Additional error details, typically for validation errors

---

## HTTP Status Codes

### 200 OK
- **Usage**: Successful GET, PUT, DELETE operations
- **Body**: Success response with data

### 201 Created
- **Usage**: Successful POST operations (resource created)
- **Body**: Created resource data

### 400 Bad Request
- **Usage**: Client-side validation errors, malformed requests
- **Error Codes**: `VALIDATION_ERROR`, `INVALID_REQUEST`

### 401 Unauthorized
- **Usage**: Authentication failures
- **Error Codes**: `UNAUTHORIZED`, `INVALID_TOKEN`, `TOKEN_EXPIRED`

### 404 Not Found
- **Usage**: Resource not found or access denied (security)
- **Error Codes**: `NOT_FOUND`

### 500 Internal Server Error
- **Usage**: Server-side errors, database failures
- **Error Codes**: `INTERNAL_ERROR`, `DATABASE_ERROR`

---

## Error Code Catalog

### UNAUTHORIZED

**HTTP Status**: 401 Unauthorized

**Trigger**: Missing or invalid authentication token

**Response**:
```json
{
  "error": "Invalid or missing authentication token",
  "code": "UNAUTHORIZED"
}
```

**Frontend Action**: Redirect to login page, clear stored credentials

---

### INVALID_TOKEN

**HTTP Status**: 401 Unauthorized

**Trigger**: JWT token format is invalid or signature verification fails

**Response**:
```json
{
  "error": "Authentication token is invalid",
  "code": "INVALID_TOKEN"
}
```

**Frontend Action**: Clear stored token, redirect to login page

---

### TOKEN_EXPIRED

**HTTP Status**: 401 Unauthorized

**Trigger**: JWT token has expired (exp claim < current time)

**Response**:
```json
{
  "error": "Authentication token has expired",
  "code": "TOKEN_EXPIRED"
}
```

**Frontend Action**: Clear stored token, redirect to login with message "Session expired, please log in again"

---

### VALIDATION_ERROR

**HTTP Status**: 400 Bad Request

**Trigger**: Request body validation fails (missing required fields, invalid formats, constraint violations)

**Response**:
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty"
    },
    {
      "field": "description",
      "message": "Description cannot exceed 2000 characters"
    }
  ]
}
```

**Frontend Action**: Display field-specific error messages next to form inputs

**Common Validation Errors**:
- Title missing: "Title is required and cannot be empty"
- Title too long: "Title cannot exceed 200 characters"
- Title empty string: "Title cannot be empty"
- Description too long: "Description cannot exceed 2000 characters"

---

### INVALID_REQUEST

**HTTP Status**: 400 Bad Request

**Trigger**: Malformed JSON, invalid content type, or other request format issues

**Response**:
```json
{
  "error": "Request body is not valid JSON",
  "code": "INVALID_REQUEST"
}
```

**Frontend Action**: Log error, display generic "Request failed" message

---

### NOT_FOUND

**HTTP Status**: 404 Not Found

**Trigger**:
- Task ID doesn't exist in database
- Task exists but belongs to different user (security: don't leak existence)

**Response**:
```json
{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

**Frontend Action**: Display "Task not found" message, redirect to task list

**Security Note**: Always return 404 (not 403) when user tries to access another user's task. This prevents information leakage about task existence.

---

### INTERNAL_ERROR

**HTTP Status**: 500 Internal Server Error

**Trigger**: Unexpected server-side errors, unhandled exceptions

**Response**:
```json
{
  "error": "An internal server error occurred",
  "code": "INTERNAL_ERROR"
}
```

**Frontend Action**: Display generic error message, provide retry option

**Backend Action**: Log full error with stack trace for debugging

**Security Note**: Never expose sensitive information (stack traces, database details, file paths) in error responses.

---

### DATABASE_ERROR

**HTTP Status**: 500 Internal Server Error

**Trigger**: Database connection failures, query timeouts, constraint violations

**Response**:
```json
{
  "error": "A database error occurred",
  "code": "DATABASE_ERROR"
}
```

**Frontend Action**: Display "Service temporarily unavailable" message, provide retry option

**Backend Action**: Log detailed database error for debugging

**Security Note**: Never expose database connection strings, table names, or query details in error responses.

---

## Error Handling Best Practices

### Backend Implementation

1. **Catch All Exceptions**: Use try-catch blocks around database operations and business logic
2. **Log Everything**: Log all errors with timestamp, user_id, endpoint, and stack trace
3. **Sanitize Messages**: Never expose sensitive information in error messages
4. **Use Appropriate Status Codes**: Match HTTP status code to error type
5. **Consistent Format**: Always return errors in the standard format
6. **Validation First**: Validate input before database operations to provide clear error messages

### Frontend Handling

1. **Check Status Code**: Use HTTP status code to determine error type
2. **Parse Error Code**: Use `code` field for programmatic error handling
3. **Display Error Message**: Show `error` field to users
4. **Field-Specific Errors**: Use `details` array to highlight specific form fields
5. **Retry Logic**: Implement retry for 500 errors, redirect for 401 errors
6. **User Feedback**: Provide clear, actionable error messages to users

---

## Example Error Scenarios

### Scenario 1: Create Task Without Title

**Request**:
```http
POST /api/tasks
Authorization: Bearer <valid_token>
Content-Type: application/json

{
  "description": "Some description"
}
```

**Response**:
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty"
    }
  ]
}
```

---

### Scenario 2: Update Task with Expired Token

**Request**:
```http
PUT /api/tasks/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <expired_token>
Content-Type: application/json

{
  "title": "Updated title"
}
```

**Response**:
```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "Authentication token has expired",
  "code": "TOKEN_EXPIRED"
}
```

---

### Scenario 3: Access Another User's Task

**Request**:
```http
GET /api/tasks/660e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <valid_token_user_A>
```

**Response** (task belongs to user B):
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

**Note**: Returns 404 (not 403) to avoid leaking information about task existence.

---

### Scenario 4: Database Connection Failure

**Request**:
```http
GET /api/tasks
Authorization: Bearer <valid_token>
```

**Response** (database unavailable):
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "A database error occurred",
  "code": "DATABASE_ERROR"
}
```

**Backend Log**:
```
[ERROR] 2026-02-08T10:30:00Z - Database connection failed
User: 123e4567-e89b-12d3-a456-426614174000
Endpoint: GET /api/tasks
Error: psycopg2.OperationalError: could not connect to server
Stack trace: [full stack trace]
```

---

## Testing Error Handling

### Unit Tests

- Test each error code with appropriate trigger
- Verify HTTP status code matches error type
- Verify error response format is consistent
- Verify sensitive information is not exposed

### Integration Tests

- Test authentication failures (missing token, invalid token, expired token)
- Test validation errors (missing fields, invalid formats, constraint violations)
- Test not found errors (non-existent IDs, cross-user access)
- Test database errors (connection failures, query timeouts)

### Security Tests

- Verify 404 (not 403) for cross-user access attempts
- Verify no sensitive information in error messages
- Verify no stack traces in production responses
- Verify proper logging of security events

---

## Summary

- **Consistent Format**: All errors use `{error, code, details?}` structure
- **6 Error Codes**: UNAUTHORIZED, INVALID_TOKEN, TOKEN_EXPIRED, VALIDATION_ERROR, INVALID_REQUEST, NOT_FOUND, INTERNAL_ERROR, DATABASE_ERROR
- **4 Status Codes**: 400 (validation), 401 (auth), 404 (not found), 500 (server error)
- **Security**: Never expose sensitive information, use 404 for cross-user access
- **Logging**: Log all errors with full context for debugging
- **Frontend**: Use error codes for programmatic handling, display error messages to users
