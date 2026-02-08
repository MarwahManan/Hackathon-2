// types/ui.ts - UI state types

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
  touched: Record<string, boolean>;
}

export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export interface ModalState {
  isOpen: boolean;
  type: 'create' | 'edit' | 'delete' | null;
  data?: any;
}

export interface DeleteConfirmState {
  isOpen: boolean;
  taskId: string | null;
  taskTitle: string | null;
}
