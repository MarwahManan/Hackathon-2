// types/task.ts - Task related types

export type RecurrencePattern = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  dueDate: string | null;
  recurrencePattern: RecurrencePattern | null;
  recurrenceEndDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  selectedTask: Task | null;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  recurrencePattern?: RecurrencePattern;
  recurrenceEndDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
  dueDate?: string | null;
  recurrencePattern?: RecurrencePattern | null;
  recurrenceEndDate?: string | null;
}

export interface TaskResponse {
  success: boolean;
  task: Task;
  message?: string;
}

export interface TasksListResponse {
  success: boolean;
  tasks: Task[];
  count: number;
}

export interface TaskError {
  error: string;
  code: string;
  statusCode: number;
}
