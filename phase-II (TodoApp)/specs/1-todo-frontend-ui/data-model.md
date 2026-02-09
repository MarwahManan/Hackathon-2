# Data Model: Client-Side State Models

**Feature**: Todo Frontend UI (Professional & Advanced)
**Date**: 2026-02-09
**Status**: Completed

## Overview

This document defines all client-side data models, TypeScript interfaces, and state structures for the Todo application frontend. These models represent the shape of data in the UI layer and align with backend API contracts.

---

## 1. User Model

Represents an authenticated user in the application.

```typescript
// /types/auth.ts

export interface User {
  id: string;                    // Unique user identifier (UUID from backend)
  email: string;                 // User's email address
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}

export interface AuthToken {
  token: string;                 // JWT token string
  expiresAt: string;             // ISO 8601 timestamp
  refreshToken?: string;         // Optional refresh token
}

export interface AuthState {
  user: User | null;             // Current authenticated user (null if not logged in)
  token: AuthToken | null;       // JWT token and metadata
  isAuthenticated: boolean;      // Computed: true if user and token exist
  isLoading: boolean;            // True during auth operations
  error: string | null;          // Error message from auth operations
}
```

**Validation Rules**:
- `email`: Must be valid email format (RFC 5322)
- `id`: UUID v4 format
- `createdAt`, `updatedAt`, `expiresAt`: ISO 8601 format

---

## 2. Task Model

Represents a todo task item.

```typescript
// /types/task.ts

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'incomplete' | 'complete';

export interface Task {
  id: string;                    // Unique task identifier (UUID from backend)
  userId: string;                // Owner user ID (for reference, enforced by backend)
  title: string;                 // Task title (1-100 characters)
  description: string | null;    // Optional task description (max 500 characters)
  priority: TaskPriority | null; // Optional priority level
  status: TaskStatus;            // Completion status
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}

export interface TasksState {
  tasks: Task[];                 // Array of all tasks for current user
  selectedTask: Task | null;     // Currently selected task (for detail view)
  isLoading: boolean;            // True during API operations
  error: string | null;          // Error message from task operations
  filters: TaskFilters;          // Current filter settings
  sortBy: TaskSortOption;        // Current sort option
}

export interface TaskFilters {
  status: 'all' | 'complete' | 'incomplete';
  priority: 'all' | TaskPriority;
}

export type TaskSortOption =
  | 'date-newest'
  | 'date-oldest'
  | 'priority-high'
  | 'priority-low'
  | 'title-asc'
  | 'title-desc';
```

**Validation Rules**:
- `title`: Required, 1-100 characters, no leading/trailing whitespace
- `description`: Optional, max 500 characters
- `priority`: Optional, must be 'low' | 'medium' | 'high'
- `status`: Required, must be 'incomplete' | 'complete'
- `id`, `userId`: UUID v4 format

---

## 3. Form State Models

Represents form data and validation state.

```typescript
// /types/forms.ts

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority | null;
}

export interface FormState<T> {
  data: T;                       // Form field values
  errors: Partial<Record<keyof T, string>>; // Field-level errors
  isSubmitting: boolean;         // True during form submission
  isValid: boolean;              // True if all validations pass
  isDirty: boolean;              // True if any field has been modified
}
```

**Validation Rules**:

**LoginFormData**:
- `email`: Required, valid email format
- `password`: Required, min 8 characters

**SignupFormData**:
- `email`: Required, valid email format
- `password`: Required, min 8 characters, must contain uppercase, lowercase, number
- `confirmPassword`: Required, must match password

**TaskFormData**:
- `title`: Required, 1-100 characters
- `description`: Optional, max 500 characters
- `priority`: Optional, must be valid TaskPriority

---

## 4. UI State Models

Represents UI-specific state (modals, loading, etc.).

```typescript
// /types/ui.ts

export interface LoadingState {
  isLoading: boolean;
  message?: string;              // Optional loading message
}

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data?: any;                    // Modal-specific data
}

export type ModalType =
  | 'delete-task-confirm'
  | 'logout-confirm'
  | 'error-dialog'
  | 'success-dialog';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;             // Auto-dismiss duration in ms (default 3000)
}

export interface UIState {
  loading: LoadingState;
  modal: ModalState;
  toasts: ToastNotification[];
  sidebarOpen: boolean;          // Mobile sidebar state
}
```

---

## 5. API Response Models

Represents API response structures.

```typescript
// /types/api.ts

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  error: string;                 // Error type/code
  message: string;               // Human-readable error message
  details?: Record<string, string[]>; // Field-level validation errors
  statusCode: number;            // HTTP status code
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
```

---

## 6. Context State Models

Represents React Context state structures.

```typescript
// /lib/context/types.ts

export interface AuthContextValue {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshAuth: () => Promise<void>;
}

export interface TasksContextValue {
  // State
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  filters: TaskFilters;
  sortBy: TaskSortOption;

  // Actions
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskFormData) => Promise<Task>;
  updateTask: (id: string, data: Partial<TaskFormData>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<Task>;
  selectTask: (id: string | null) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  setSortBy: (sortBy: TaskSortOption) => void;
  clearError: () => void;
}
```

---

## 7. Hook Return Types

Represents custom hook return types.

```typescript
// /lib/hooks/types.ts

export interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export interface UseFormResult<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => Promise<void>;
  reset: () => void;
  setFieldError: (field: keyof T, error: string) => void;
}
```

---

## 8. Component Props Models

Common component prop types.

```typescript
// /types/components.ts

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

---

## 9. State Transitions

### Task Status Transitions

```
incomplete ──[toggle]──> complete
complete ──[toggle]──> incomplete
```

### Auth State Transitions

```
null ──[login/signup]──> authenticated
authenticated ──[logout]──> null
authenticated ──[token expired]──> null
```

---

## 10. Data Flow Patterns

### Optimistic Updates

For better UX, implement optimistic updates for task operations:

```typescript
// Example: Toggle task status
async function toggleTaskStatus(taskId: string) {
  // 1. Optimistically update UI
  const task = tasks.find(t => t.id === taskId);
  const optimisticStatus = task.status === 'complete' ? 'incomplete' : 'complete';
  updateTaskInState(taskId, { status: optimisticStatus });

  try {
    // 2. Send API request
    const updatedTask = await api.tasks.toggle(taskId);

    // 3. Update with server response
    updateTaskInState(taskId, updatedTask);
  } catch (error) {
    // 4. Revert on error
    updateTaskInState(taskId, { status: task.status });
    showError('Failed to update task');
  }
}
```

### Error Recovery

```typescript
// Retry logic for transient failures
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

## 11. Type Guards

Utility functions for type checking.

```typescript
// /lib/utils/type-guards.ts

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    'message' in error &&
    'statusCode' in error
  );
}

export function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'status' in obj
  );
}

export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj
  );
}
```

---

## 12. Default Values

```typescript
// /lib/constants/defaults.ts

export const DEFAULT_AUTH_STATE: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const DEFAULT_TASKS_STATE: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
  },
  sortBy: 'date-newest',
};

export const DEFAULT_UI_STATE: UIState = {
  loading: { isLoading: false },
  modal: { isOpen: false, type: null },
  toasts: [],
  sidebarOpen: false,
};
```

---

## Summary

This data model provides:
- **Type Safety**: Full TypeScript coverage for all data structures
- **Validation**: Clear validation rules for all user inputs
- **State Management**: Well-defined state structures for Context API
- **API Integration**: Response types aligned with backend contracts
- **Error Handling**: Structured error types for consistent UX
- **Optimistic Updates**: Patterns for responsive UI interactions

All models align with the backend API contracts defined in `/contracts/` and support the functional requirements in `spec.md`.
