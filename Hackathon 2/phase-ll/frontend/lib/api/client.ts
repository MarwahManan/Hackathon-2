// lib/api/client.ts - Axios client with interceptors
import axios from 'axios';
import { ErrorResponse, ErrorCode } from '@/types/api';

// Support both backend ports - can be configured via environment variable
// Default to 8000, but also supports 8001
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorResponse: ErrorResponse = error.response.data;

      switch (errorResponse.statusCode) {
        case 401:
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
          }
          break;
        case 404:
          console.warn('Resource not found:', errorResponse);
          break;
        case 500:
          console.error('Server error:', errorResponse);
          break;
      }

      return Promise.reject(errorResponse);
    } else if (error.request) {
      const networkError: ErrorResponse = {
        error: 'Network error. Please check your connection.',
        code: ErrorCode.NETWORK_ERROR,
        statusCode: 0,
      };
      return Promise.reject(networkError);
    } else {
      const unknownError: ErrorResponse = {
        error: 'An unexpected error occurred',
        code: ErrorCode.INTERNAL_ERROR,
        statusCode: 0,
      };
      return Promise.reject(unknownError);
    }
  }
);

export default apiClient;
