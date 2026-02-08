// types/api.ts - API response types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  code: string;
  statusCode: number;
  details?: Record<string, any>;
}

export enum ErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}
