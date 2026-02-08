// lib/api/tasks.ts - Tasks API functions
import apiClient from './client';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/api/tasks');
  return response.data;
}

export async function getTask(id: string): Promise<Task> {
  const response = await apiClient.get<Task>(`/api/tasks/${id}`);
  return response.data;
}

export async function getCalendarTasks(startDate?: string, endDate?: string): Promise<Task[]> {
  const params = new URLSearchParams();
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  const queryString = params.toString();
  const url = queryString ? `/api/tasks/calendar?${queryString}` : '/api/tasks/calendar';

  const response = await apiClient.get<Task[]>(url);
  return response.data;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await apiClient.post<Task>('/api/tasks', input);
  return response.data;
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const response = await apiClient.put<Task>(`/api/tasks/${id}`, input);
  return response.data;
}

export async function toggleTaskCompletion(id: string, isCompleted: boolean): Promise<Task> {
  return updateTask(id, { isCompleted });
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/tasks/${id}`);
}
