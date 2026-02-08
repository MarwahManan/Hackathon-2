// lib/api/auth.ts - Authentication API functions
import apiClient from './client';
import { User, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  const { confirmPassword, ...payload } = credentials;
  const response = await apiClient.post<AuthResponse>('/api/auth/signup', payload);

  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);

  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
}

export async function logout(): Promise<void> {
  // Clear localStorage (JWT tokens are stateless, so we only need to clear client-side)
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');

  // Optionally call backend logout endpoint (for session cleanup, logging, etc.)
  // We don't await or throw errors since client-side logout is sufficient
  try {
    apiClient.post('/api/auth/logout').catch(() => {
      // Silently ignore backend logout errors
    });
  } catch (error) {
    // Ignore errors - client-side logout is sufficient
  }
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<{ success: boolean; user: User }>('/api/auth/me');
  return response.data.user;
}
