# API Contract: Task Endpoints

**Feature**: Backend & API for Todo Application
**Date**: 2026-02-08
**Base URL**: `http://localhost:8000` (development)

## Overview

This document defines the REST API contract for task CRUD operations. All endpoints require JWT authentication via the `Authorization` header.

---

## Authentication

**Header**: `Authorization: Bearer <jwt_token>`

**Token Source**: JWT token issued by Better Auth during user login

**Token Claims**:
- `sub`: User ID (UUID)
- `email`: User email address
- `exp`: Token expiration timestamp
- `iat`: Token issued at timestamp

**Unauthorized Response** (applies to all endpoints):
```json
Status: 401 Unauthorized
{
  "error": "Invalid or missing authentication token",
  "code": "UNAUTHORIZED"
}
```

---

## Endpoint 1: Get All Tasks

**Purpose**: Retrieve all tasks belonging to the authenticated user.

### Request

```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

**Query Parameters**: None

**Request Body**: None

### Response

**Success (200 OK)**:
```json
{
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "is_completed": false,
      "created_at": "2026-02-08T10:30:00Z",
      "updated_at": "2026-02-08T10:30:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Finish project",
      "description": null,
      "is_completed": true,
      "created_at": "2026-02-07T14:20:00Z",
      "updated_at": "2026-02-08T09:15:00Z"
    }
  ]
}
```

**Empty List (200 OK)**:
```json
{
  "tasks": []
}
```

### Business Rules

- Returns only tasks where `user_id` matches authenticated user's ID
- Tasks ordered by `created_at` descending (newest first)
- Empty array returned if user has no tasks
- Maximum 1000 tasks returned (pagination not implemented in MVP)

### Performance

- Response time: <500ms for <100 tasks
- Database query: Single SELECT with user_id filter and index

---

## Endpoint 2: Get Single Task

**Purpose**: Retrieve a specific task by ID, only if owned by authenticated user.

### Request

```http
GET /api/tasks/{task_id}
Authorization: Bearer <jwt_token>
```

**Path Parameters**:
- `task_id` (UUID, required): Task identifier

**Request Body**: None

### Response

**Success (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "is_completed": false,
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

**Not Found (404 Not Found)**:
```json
{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

### Business Rules

- Returns 404 if task doesn't exist
- Returns 404 if task exists but belongs to different user (security: don't leak task existence)
- Must verify `user_id` matches authenticated user

### Performance

- Response time: <100ms
- Database query: SELECT with primary key and user_id filter

---

## Endpoint 3: Create Task

**Purpose**: Create a new task associated with the authenticated user.

### Request

```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Field Validation**:
- `title` (string, required): 1-200 characters, cannot be empty or whitespace-only
- `description` (string, optional): Max 2000 characters, can be null or omitted

### Response

**Success (201 Created)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "is_completed": false,
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

**Validation Error (400 Bad Request)**:
```json
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

### Business Rules

- `user_id` automatically set from JWT token (not in request body)
- `is_completed` defaults to `false`
- `id`, `created_at`, `updated_at` auto-generated
- Title trimmed of leading/trailing whitespace
- Description trimmed; empty string converted to null

### Validation Rules

- Title required: Return 400 if missing or empty
- Title length: Return 400 if >200 characters
- Description length: Return 400 if >2000 characters
- Invalid JSON: Return 400 with parse error

---

## Endpoint 4: Update Task

**Purpose**: Update an existing task's title, description, or completion status.

### Request

```http
PUT /api/tasks/{task_id}
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Path Parameters**:
- `task_id` (UUID, required): Task identifier

**Request Body** (all fields optional):
```json
{
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread, chicken",
  "is_completed": true
}
```

**Field Validation**:
- `title` (string, optional): 1-200 characters if provided
- `description` (string, optional): Max 2000 characters if provided, null to clear
- `is_completed` (boolean, optional): true or false

### Response

**Success (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread, chicken",
  "is_completed": true,
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T11:45:00Z"
}
```

**Not Found (404 Not Found)**:
```json
{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

**Validation Error (400 Bad Request)**:
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "title",
      "message": "Title cannot be empty"
    }
  ]
}
```

### Business Rules

- Only updates fields provided in request body
- Returns 404 if task doesn't exist or belongs to different user
- `updated_at` automatically updated on successful update
- Partial updates supported (can update only title, only description, or only is_completed)

### Validation Rules

- Title: If provided, must be 1-200 characters
- Description: If provided, max 2000 characters
- is_completed: If provided, must be boolean
- At least one field must be provided (empty body returns 400)

---

## Endpoint 5: Delete Task

**Purpose**: Permanently delete a task owned by the authenticated user.

### Request

```http
DELETE /api/tasks/{task_id}
Authorization: Bearer <jwt_token>
```

**Path Parameters**:
- `task_id` (UUID, required): Task identifier

**Request Body**: None

### Response

**Success (200 OK)**:
```json
{
  "message": "Task deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Not Found (404 Not Found)**:
```json
{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

### Business Rules

- Permanently deletes task from database
- Returns 404 if task doesn't exist or belongs to different user
- Deletion is immediate and irreversible (no soft delete in MVP)
- Idempotent: Deleting already-deleted task returns 404

### Performance

- Response time: <100ms
- Database query: DELETE with primary key and user_id filter

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "error": "Invalid or missing authentication token",
  "code": "UNAUTHORIZED"
}
```

**Triggers**:
- Missing Authorization header
- Invalid JWT token format
- Expired JWT token
- Invalid JWT signature

### 404 Not Found
```json
{
  "error": "Task not found",
  "code": "NOT_FOUND"
}
```

**Triggers**:
- Task ID doesn't exist
- Task exists but belongs to different user

### 400 Bad Request
```json
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

**Triggers**:
- Invalid request body format
- Missing required fields
- Field validation failures
- Invalid data types

### 500 Internal Server Error
```json
{
  "error": "An internal server error occurred",
  "code": "INTERNAL_ERROR"
}
```

**Triggers**:
- Database connection failure
- Unexpected exceptions
- System errors

**Note**: Never expose sensitive information (stack traces, database details) in error responses.

---

## CORS Configuration

**Allowed Origins**: `http://localhost:3000` (development), `FRONTEND_URL` env var (production)
**Allowed Methods**: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
**Allowed Headers**: `Authorization`, `Content-Type`
**Allow Credentials**: `true`

---

## Rate Limiting (Future Enhancement)

Not implemented in MVP. Consider adding:
- 100 requests per minute per user
- 429 Too Many Requests response

---

## Summary

- **5 endpoints**: GET all, GET one, POST, PUT, DELETE
- **Authentication**: JWT via Authorization header (all endpoints)
- **User Isolation**: All queries filtered by authenticated user ID
- **Status Codes**: 200 (success), 201 (created), 400 (validation), 401 (unauthorized), 404 (not found), 500 (server error)
- **Response Format**: JSON for all endpoints
- **Error Format**: Consistent `{error, code, details?}` structure
