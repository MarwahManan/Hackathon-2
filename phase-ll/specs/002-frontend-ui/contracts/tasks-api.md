# API Contract: Tasks Endpoints

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08
**Backend Base URL**: `http://localhost:8000` (development) / `https://api.example.com` (production)

## Overview

This document defines the task management API endpoints that the frontend will consume. All task endpoints require authentication (JWT token in HttpOnly cookie). Backend enforces user isolation - users can only access their own tasks.

---

## 1. Get All Tasks

**Endpoint**: `GET /api/tasks`

**Description**: Retrieve all tasks for the authenticated user.

**Request Headers**:
```
Cookie: token=<JWT_TOKEN>
```

**Query Parameters**: None (pagination not implemented in MVP)

**Success Response** (200 OK):
```json
{
  "success": true,
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Complete project documentation",
      "description": "Write comprehensive docs for the API",
      "isCompleted": false,
      "createdAt": "2026-02-08T10:30:00Z",
      "updatedAt": "2026-02-08T10:30:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Review pull requests",
      "description": null,
      "isCompleted": true,
      "createdAt": "2026-02-07T14:20:00Z",
      "updatedAt": "2026-02-08T09:15:00Z"
    }
  ],
  "count": 2
}
```

**Empty State Response** (200 OK):
```json
{
  "success": true,
  "tasks": [],
  "count": 0
}
```

**Error Responses**:

**401 Unauthorized** (No Token or Invalid Token):
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

**Frontend Implementation**:
```typescript
// lib/api/tasks.ts
import apiClient from './client'
import { Task } from '@/types/task'

export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<{ success: boolean; tasks: Task[]; count: number }>('/api/tasks')
  return response.data.tasks
}
```

---

## 2. Get Single Task

**Endpoint**: `GET /api/tasks/:id`

**Description**: Retrieve a specific task by ID. Backend verifies task belongs to authenticated user.

**Request Headers**:
```
Cookie: token=<JWT_TOKEN>
```

**URL Parameters**:
- `id` (string, required): Task UUID

**Success Response** (200 OK):
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "isCompleted": false,
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T10:30:00Z"
  }
}
```

**Error Responses**:

**401 Unauthorized**:
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

**404 Not Found** (Task doesn't exist or belongs to another user):
```json
{
  "error": "Task not found",
  "code": "TASK_NOT_FOUND",
  "statusCode": 404
}
```

**Frontend Implementation**:
```typescript
// lib/api/tasks.ts
export async function getTask(id: string): Promise<Task> {
  const response = await apiClient.get<{ success: boolean; task: Task }>(`/api/tasks/${id}`)
  return response.data.task
}
```

---

## 3. Create Task

**Endpoint**: `POST /api/tasks`

**Description**: Create a new task for the authenticated user.

**Request Headers**:
```
Content-Type: application/json
Cookie: token=<JWT_TOKEN>
```

**Request Body**:
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API"
}
```

**Minimal Request** (description optional):
```json
{
  "title": "Buy groceries"
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "isCompleted": false,
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T10:30:00Z"
  },
  "message": "Task created successfully"
}
```

**Error Responses**:

**401 Unauthorized**:
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
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
    "title": "Title is required and cannot be empty",
    "description": "Description exceeds maximum length of 2000 characters"
  }
}
```

**Frontend Implementation**:
```typescript
// lib/api/tasks.ts
import { CreateTaskInput } from '@/types/task'

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await apiClient.post<{ success: boolean; task: Task }>('/api/tasks', input)
  return response.data.task
}
```

---

## 4. Update Task

**Endpoint**: `PUT /api/tasks/:id`

**Description**: Update an existing task. Backend verifies task belongs to authenticated user. Supports partial updates.

**Request Headers**:
```
Content-Type: application/json
Cookie: token=<JWT_TOKEN>
```

**URL Parameters**:
- `id` (string, required): Task UUID

**Request Body** (all fields optional for partial update):
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "isCompleted": true
}
```

**Partial Update Examples**:

Update title only:
```json
{
  "title": "New title"
}
```

Toggle completion only:
```json
{
  "isCompleted": true
}
```

Clear description:
```json
{
  "description": null
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Updated task title",
    "description": "Updated description",
    "isCompleted": true,
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T11:45:00Z"
  },
  "message": "Task updated successfully"
}
```

**Error Responses**:

**401 Unauthorized**:
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

**404 Not Found**:
```json
{
  "error": "Task not found",
  "code": "TASK_NOT_FOUND",
  "statusCode": 404
}
```

**400 Bad Request** (Validation Error):
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": {
    "title": "Title cannot be empty"
  }
}
```

**Frontend Implementation**:
```typescript
// lib/api/tasks.ts
import { UpdateTaskInput } from '@/types/task'

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const response = await apiClient.put<{ success: boolean; task: Task }>(`/api/tasks/${id}`, input)
  return response.data.task
}

// Convenience method for toggling completion
export async function toggleTaskCompletion(id: string, isCompleted: boolean): Promise<Task> {
  return updateTask(id, { isCompleted })
}
```

---

## 5. Delete Task

**Endpoint**: `DELETE /api/tasks/:id`

**Description**: Permanently delete a task. Backend verifies task belongs to authenticated user.

**Request Headers**:
```
Cookie: token=<JWT_TOKEN>
```

**URL Parameters**:
- `id` (string, required): Task UUID

**Request Body**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**:

**401 Unauthorized**:
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

**404 Not Found**:
```json
{
  "error": "Task not found",
  "code": "TASK_NOT_FOUND",
  "statusCode": 404
}
```

**Frontend Implementation**:
```typescript
// lib/api/tasks.ts
export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/tasks/${id}`)
}
```

---

## User Isolation Enforcement

**Critical Security Requirement**: Backend MUST enforce user isolation for all task operations.

### Backend Implementation (Reference)
```python
# Backend verifies userId from JWT matches task owner
def get_task(task_id: str, current_user: User):
    task = db.query(Task).filter(Task.id == task_id, Task.userId == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
```

### Frontend Expectations
- Frontend sends JWT token with every request (automatic via HttpOnly cookie)
- Backend extracts userId from JWT token
- Backend filters all queries by userId
- If task doesn't belong to user, backend returns 404 (not 403, to avoid leaking task existence)

---

## Task Operations Flow

### View Tasks Flow
```
1. User navigates to /tasks
2. Frontend sends GET /api/tasks (cookie automatically included)
3. Backend verifies JWT, extracts userId
4. Backend queries tasks WHERE userId = <userId>
5. Backend returns user's tasks only
6. Frontend displays tasks in list
```

### Create Task Flow
```
1. User fills create task form
2. Frontend validates input (title required, max lengths)
3. Frontend sends POST /api/tasks with title and description
4. Backend verifies JWT, extracts userId
5. Backend creates task with userId from token
6. Backend returns created task
7. Frontend adds task to list and redirects to /tasks
```

### Toggle Completion Flow
```
1. User clicks completion checkbox
2. Frontend optimistically updates UI (toggle isCompleted)
3. Frontend sends PUT /api/tasks/:id with { isCompleted: true/false }
4. Backend verifies JWT and task ownership
5. Backend updates task
6. Backend returns updated task
7. On success: UI already updated (optimistic)
8. On failure: Frontend reverts UI and shows error
```

### Edit Task Flow
```
1. User clicks edit button
2. Frontend navigates to /tasks/:id/edit
3. Frontend sends GET /api/tasks/:id to fetch current data
4. Frontend pre-fills form with current data
5. User modifies title/description
6. Frontend sends PUT /api/tasks/:id with updated fields
7. Backend verifies JWT and task ownership
8. Backend updates task
9. Backend returns updated task
10. Frontend redirects to /tasks
```

### Delete Task Flow
```
1. User clicks delete button
2. Frontend shows confirmation dialog
3. User confirms deletion
4. Frontend sends DELETE /api/tasks/:id
5. Backend verifies JWT and task ownership
6. Backend deletes task
7. Backend returns success
8. Frontend removes task from list
```

---

## Error Handling Strategy

### 401 Unauthorized
- Clear auth state
- Redirect to /login
- Show message: "Session expired. Please log in again."

### 404 Not Found
- Show message: "Task not found"
- Redirect to /tasks
- Log potential security issue (user trying to access another user's task)

### 400 Validation Error
- Display field-level errors in form
- Keep user on current page
- Preserve form data

### 500 Internal Server Error
- Show message: "Failed to perform operation. Please try again."
- Provide retry button
- Log error for debugging

### Network Error
- Show message: "Network error. Please check your connection."
- Provide retry button
- Preserve form data

---

## Testing Checklist

- [ ] GET /api/tasks returns only authenticated user's tasks
- [ ] GET /api/tasks returns empty array when user has no tasks
- [ ] GET /api/tasks/:id returns task when it belongs to user
- [ ] GET /api/tasks/:id returns 404 when task belongs to another user
- [ ] POST /api/tasks creates task with correct userId
- [ ] POST /api/tasks validates title is required
- [ ] POST /api/tasks validates max lengths
- [ ] PUT /api/tasks/:id updates task when it belongs to user
- [ ] PUT /api/tasks/:id returns 404 when task belongs to another user
- [ ] PUT /api/tasks/:id supports partial updates
- [ ] DELETE /api/tasks/:id deletes task when it belongs to user
- [ ] DELETE /api/tasks/:id returns 404 when task belongs to another user
- [ ] All endpoints return 401 when not authenticated
- [ ] Optimistic UI update for toggle completion works correctly
- [ ] Optimistic UI reverts on failure

---

## Performance Considerations

### MVP Implementation
- Fetch all tasks on page load (no pagination)
- Acceptable for < 1000 tasks per user
- Simple and sufficient for hackathon demo

### Future Enhancements
- Implement pagination (page, pageSize query params)
- Add filtering (isCompleted, search query)
- Add sorting (createdAt, updatedAt, title)
- Implement infinite scroll or virtual scrolling
- Add caching with SWR or React Query
