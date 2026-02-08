# Data Model: Frontend State Management

**Feature**: Frontend & UI for Todo Application
**Date**: 2026-02-08
**Status**: Completed

## Overview

This document defines client-side state models for the Next.js frontend application. These models represent data structures used for UI state management, API communication, and form handling.

---

## 1. Authentication Models

### User Model

Represents an authenticated user in the application.

```typescript
// types/auth.ts

export interface User {
  id: string                    // Unique user identifier (UUID from backend)
  email: string                 // User's email address
  createdAt: string             // ISO 8601 timestamp
  updatedAt: string             // ISO 8601 timestamp
}

export interface AuthState {
  user: User | null             // Current authenticated user (null if not logged in)
  isAuthenticated: boolean      // Authentication status
  isLoading: boolean            // Loading state during auth operations
  error: string | null          // Error message from auth operations
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  confirmPassword: string       // Client-side only (not sent to backend)
}

export interface AuthResponse {
  success: boolean
  user: User
  token: string                 // JWT token (stored in HttpOnly cookie by backend)
  message?: string
}

export interface AuthError {
  error: string
  code: string                  // Error code (e.g., "INVALID_CREDENTIALS", "EMAIL_EXISTS")
  statusCode: number            // HTTP status code
}
```

### Validation Rules

**Email**:
- Required
- Must be valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Max length: 255 characters

**Password**:
- Required
- Min length: 8 characters
- Max length: 128 characters
- Must contain at least one uppercase, one lowercase, one number (recommended, not enforced in MVP)

**Confirm Password** (signup only):
- Must match password field

---

## 2. Task Models

### Task Model

Represents a todo task in the application.

```typescript
// types/task.ts

export interface Task {
  id: string                    // Unique task identifier (UUID from backend)
  userId: string                // Owner user ID (for verification)
  title: string                 // Task title
  description: string | null    // Task description (optional)
  isCompleted: boolean          // Completion status
  createdAt: string             // ISO 8601 timestamp
  updatedAt: string             // ISO 8601 timestamp
}

export interface TasksState {
  tasks: Task[]                 // Array of user's tasks
  isLoading: boolean            // Loading state during fetch operations
  error: string | null          // Error message from task operations
  selectedTask: Task | null     // Currently selected task (for detail view)
}

export interface CreateTaskInput {
  title: string
  description?: string          // Optional
}

export interface UpdateTaskInput {
  title?: string                // Optional (partial update)
  description?: string | null   // Optional (can be set to null to clear)
  isCompleted?: boolean         // Optional (for toggle operation)
}

export interface TaskResponse {
  success: boolean
  task: Task
  message?: string
}

export interface TasksListResponse {
  success: boolean
  tasks: Task[]
  count: number                 // Total number of tasks
}

export interface TaskError {
  error: string
  code: string                  // Error code (e.g., "TASK_NOT_FOUND", "VALIDATION_ERROR")
  statusCode: number            // HTTP status code
}
```

### Validation Rules

**Title**:
- Required
- Min length: 1 character
- Max length: 200 characters
- Cannot be only whitespace

**Description**:
- Optional
- Max length: 2000 characters
- Can be null or empty string

**isCompleted**:
- Boolean (true/false)
- Defaults to false for new tasks

---

## 3. UI State Models

### Form State

Represents form state for create/edit operations.

```typescript
// types/ui.ts

export interface FormState<T> {
  data: T                       // Form data (generic type)
  errors: Record<string, string> // Field-level errors (key: field name, value: error message)
  isSubmitting: boolean         // Submission in progress
  isDirty: boolean              // Form has unsaved changes
  touched: Record<string, boolean> // Fields that have been interacted with
}

export interface ValidationError {
  field: string
  message: string
}

// Example usage:
// FormState<CreateTaskInput>
// FormState<LoginCredentials>
```

### Loading State

Represents loading states for async operations.

```typescript
export interface LoadingState {
  isLoading: boolean
  loadingMessage?: string       // Optional message (e.g., "Saving task...")
}

export interface ApiState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  isSuccess: boolean
}

// Example usage:
// ApiState<Task>
// ApiState<Task[]>
```

### Modal State

Represents modal/dialog state.

```typescript
export interface ModalState {
  isOpen: boolean
  type: 'create' | 'edit' | 'delete' | null
  data?: any                    // Modal-specific data (e.g., task to edit/delete)
}

export interface DeleteConfirmState {
  isOpen: boolean
  taskId: string | null
  taskTitle: string | null
}
```

---

## 4. API Response Models

### Generic API Response

Standard response format for all API calls.

```typescript
// types/api.ts

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    totalCount: number
  }
}

// Note: Pagination not implemented in MVP but structure defined for future
```

### Error Response

Standard error response format.

```typescript
export interface ErrorResponse {
  error: string                 // Human-readable error message
  code: string                  // Machine-readable error code
  statusCode: number            // HTTP status code
  details?: Record<string, any> // Additional error details (e.g., validation errors)
}

// Common error codes:
export enum ErrorCode {
  // Authentication errors (401)
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',

  // Validation errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Not found errors (404)
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Conflict errors (409)
  EMAIL_EXISTS = 'EMAIL_EXISTS',

  // Server errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',

  // Network errors (client-side)
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}
```

---

## 5. State Management Strategy

### Approach

**MVP Implementation**: React Context API + useState/useReducer
- Lightweight and built-in (no external dependencies)
- Sufficient for small-to-medium state complexity
- Easy to understand and maintain

**Future Enhancement**: Consider Zustand or Redux Toolkit if state complexity grows

### Context Structure

```typescript
// lib/context/AuthContext.tsx
export interface AuthContextType {
  authState: AuthState
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// lib/context/TasksContext.tsx
export interface TasksContextType {
  tasksState: TasksState
  fetchTasks: () => Promise<void>
  createTask: (input: CreateTaskInput) => Promise<void>
  updateTask: (id: string, input: UpdateTaskInput) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskCompletion: (id: string) => Promise<void>
  selectTask: (id: string) => void
  clearSelectedTask: () => void
}
```

---

## 6. Data Flow Diagram

```
User Action (UI)
    ↓
Component Event Handler
    ↓
Context Action (login, createTask, etc.)
    ↓
API Client (Axios with interceptors)
    ↓
Backend API (FastAPI)
    ↓
API Response
    ↓
Context State Update
    ↓
Component Re-render (React)
    ↓
Updated UI
```

---

## 7. Optimistic Updates

For better UX, implement optimistic updates for certain operations:

### Toggle Task Completion
```typescript
// Optimistic update pattern
async function toggleTaskCompletion(taskId: string) {
  // 1. Optimistically update UI
  const task = tasks.find(t => t.id === taskId)
  if (!task) return

  const optimisticTask = { ...task, isCompleted: !task.isCompleted }
  setTasks(tasks.map(t => t.id === taskId ? optimisticTask : t))

  try {
    // 2. Send API request
    await api.updateTask(taskId, { isCompleted: optimisticTask.isCompleted })
  } catch (error) {
    // 3. Revert on failure
    setTasks(tasks.map(t => t.id === taskId ? task : t))
    showError('Failed to update task')
  }
}
```

### Operations with Optimistic Updates (MVP)
- ✅ Toggle task completion
- ❌ Create task (wait for server response to get ID)
- ❌ Update task (wait for server response to ensure validation)
- ❌ Delete task (wait for server confirmation)

---

## 8. Caching Strategy

**MVP**: No caching (fetch fresh data on each page load)

**Future Enhancement**: Implement SWR or React Query for:
- Automatic background revalidation
- Cache invalidation on mutations
- Optimistic updates with rollback
- Request deduplication

---

## Summary

This data model defines all client-side state structures needed for the frontend application:

- **Authentication**: User, AuthState, credentials, responses
- **Tasks**: Task, TasksState, CRUD inputs, responses
- **UI State**: Form state, loading state, modal state
- **API Responses**: Generic responses, error responses, error codes
- **State Management**: Context API structure, data flow, optimistic updates

All models include TypeScript type definitions for type safety and validation rules for form handling.
