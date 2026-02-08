// types/task.ts - Task related types

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
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
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
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
