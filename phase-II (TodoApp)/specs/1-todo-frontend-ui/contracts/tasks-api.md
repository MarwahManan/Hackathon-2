# API Contract: Task CRUD Endpoints

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Backend**: FastAPI
**Base URL**: `${NEXT_PUBLIC_API_URL}/api/tasks`

## Overview

This document defines the task management API endpoints that the frontend will consume. All endpoints require authentication via JWT token and automatically filter tasks by the authenticated user.

---

## 1. Get All Tasks

**Endpoint**: `GET /api/tasks`

**Description**: Retrieve all tasks for the authenticated user.

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters** (Optional):
```
?status=complete          # Filter by status: 'complete' | 'incomplete' | 'all'
?priority=high            # Filter by priority: 'low' | 'medium' | 'high' | 'all'
?sortBy=date-newest       # Sort option: 'date-newest' | 'date-oldest' | 'priority-high' | 'priority-low'
```

**Success Response** (200 OK):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Complete project documentation",
      "description": "Write comprehensive docs for the API",
      "priority": "high",
      "status": "incomplete",
      "createdAt": "2026-02-09T10:30:00Z",
      "updatedAt": "2026-02-09T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Review pull requests",
      "description": null,
      "priority": "medium",
      "status": "complete",
      "createdAt": "2026-02-09T09:00:00Z",
      "updatedAt": "2026-02-09T10:15:00Z"
    }
  ]
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

---

## 2. Get Single Task

**Endpoint**: `GET /api/tasks/:id`

**Description**: Retrieve a specific task by ID (must belong to authenticated user).

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**URL Parameters**:
- `id`: Task UUID

**Success Response** (200 OK):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "priority": "high",
    "status": "incomplete",
    "createdAt": "2026-02-09T10:30:00Z",
    "updatedAt": "2026-02-09T10:30:00Z"
  }
}
```

**Error Responses**:

404 Not Found - Task doesn't exist or doesn't belong to user:
```json
{
  "error": "TASK_NOT_FOUND",
  "message": "Task not found",
  "statusCode": 404
}
```

401 Unauthorized:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## 3. Create Task

**Endpoint**: `POST /api/tasks`

**Description**: Create a new task for the authenticated user.

**Request Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "priority": "high"
}
```

**Validation Rules**:
- `title`: Required, 1-100 characters, no leading/trailing whitespace
- `description`: Optional, max 500 characters
- `priority`: Optional, must be 'low' | 'medium' | 'high'

**Success Response** (201 Created):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "priority": "high",
    "status": "incomplete",
    "createdAt": "2026-02-09T10:30:00Z",
    "updatedAt": "2026-02-09T10:30:00Z"
  },
  "message": "Task created successfully"
}
```

**Error Responses**:

400 Bad Request - Validation error:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "title": ["Title is required", "Title must be between 1 and 100 characters"],
    "description": ["Description must not exceed 500 characters"],
    "priority": ["Priority must be one of: low, medium, high"]
  },
  "statusCode": 400
}
```

401 Unauthorized:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## 4. Update Task

**Endpoint**: `PUT /api/tasks/:id`

**Description**: Update an existing task (must belong to authenticated user).

**Request Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters**:
- `id`: Task UUID

**Request Body** (all fields optional):
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "medium"
}
```

**Validation Rules**:
- `title`: Optional, 1-100 characters if provided
- `description`: Optional, max 500 characters if provided, null to clear
- `priority`: Optional, must be 'low' | 'medium' | 'high' if provided, null to clear

**Success Response** (200 OK):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated task title",
    "description": "Updated description",
    "priority": "medium",
    "status": "incomplete",
    "createdAt": "2026-02-09T10:30:00Z",
    "updatedAt": "2026-02-09T11:45:00Z"
  },
  "message": "Task updated successfully"
}
```

**Error Responses**:

404 Not Found:
```json
{
  "error": "TASK_NOT_FOUND",
  "message": "Task not found",
  "statusCode": 404
}
```

400 Bad Request - Validation error:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "title": ["Title must be between 1 and 100 characters"]
  },
  "statusCode": 400
}
```

401 Unauthorized:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## 5. Delete Task

**Endpoint**: `DELETE /api/tasks/:id`

**Description**: Delete a task (must belong to authenticated user).

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**URL Parameters**:
- `id`: Task UUID

**Success Response** (200 OK):
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses**:

404 Not Found:
```json
{
  "error": "TASK_NOT_FOUND",
  "message": "Task not found",
  "statusCode": 404
}
```

401 Unauthorized:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## 6. Toggle Task Status

**Endpoint**: `PATCH /api/tasks/:id/toggle`

**Description**: Toggle task completion status (incomplete ↔ complete).

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**URL Parameters**:
- `id`: Task UUID

**Request Body**: None required (status is toggled automatically)

**Success Response** (200 OK):
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "priority": "high",
    "status": "complete",
    "createdAt": "2026-02-09T10:30:00Z",
    "updatedAt": "2026-02-09T12:00:00Z"
  },
  "message": "Task status updated successfully"
}
```

**Error Responses**:

404 Not Found:
```json
{
  "error": "TASK_NOT_FOUND",
  "message": "Task not found",
  "statusCode": 404
}
```

401 Unauthorized:
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## Frontend Integration

### Axios Client Configuration

```typescript
// /lib/api/tasks.ts
import { apiClient } from './client';
import type { Task, TaskFormData, TaskFilters, TaskSortOption } from '@/types/task';

interface GetTasksParams {
  status?: 'all' | 'complete' | 'incomplete';
  priority?: 'all' | 'low' | 'medium' | 'high';
  sortBy?: TaskSortOption;
}

export const tasksApi = {
  getAll: async (params?: GetTasksParams): Promise<Task[]> => {
    const response = await apiClient.get('/tasks', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data.data;
  },

  create: async (data: TaskFormData): Promise<Task> => {
    const response = await apiClient.post('/tasks', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<TaskFormData>): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  toggle: async (id: string): Promise<Task> => {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data.data;
  },
};
```

### Optimistic Updates Pattern

```typescript
// Example: Toggle task with optimistic update
async function toggleTask(taskId: string) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // 1. Optimistically update UI
  const newStatus = task.status === 'complete' ? 'incomplete' : 'complete';
  updateTaskInState(taskId, { status: newStatus });

  try {
    // 2. Send API request
    const updatedTask = await tasksApi.toggle(taskId);

    // 3. Update with server response
    updateTaskInState(taskId, updatedTask);
  } catch (error) {
    // 4. Revert on error
    updateTaskInState(taskId, { status: task.status });
    showError('Failed to update task status');
  }
}
```

---

## User Isolation

**Critical Security Requirement**: The backend MUST filter all task queries by the authenticated user's ID extracted from the JWT token. The frontend should NEVER send userId in requests - it's automatically determined from the token.

```typescript
// Backend pseudo-code (for reference)
async function getTasks(userId: string) {
  // userId extracted from JWT token, NOT from request body/params
  return await db.tasks.findMany({ where: { userId } });
}
```

---

## Testing Checklist

- [ ] Get all tasks returns only authenticated user's tasks
- [ ] Get all tasks with status filter returns filtered results
- [ ] Get all tasks with priority filter returns filtered results
- [ ] Get all tasks with sortBy returns sorted results
- [ ] Get single task returns task if it belongs to user
- [ ] Get single task returns 404 if task doesn't belong to user
- [ ] Create task with valid data returns 201 and created task
- [ ] Create task with invalid data returns 400 with validation errors
- [ ] Update task with valid data returns 200 and updated task
- [ ] Update task that doesn't belong to user returns 404
- [ ] Delete task removes it and returns 200
- [ ] Delete task that doesn't belong to user returns 404
- [ ] Toggle task changes status and returns updated task
- [ ] All endpoints return 401 without valid JWT token
- [ ] Optimistic updates work correctly with success and error cases
