'use client';

import React, { createContext, useContext, useState } from 'react';
import { Task, TasksState, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import * as tasksApi from '@/lib/api/tasks';

interface TasksContextType {
  tasksState: TasksState;
  fetchTasks: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, input: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  selectTask: (id: string) => void;
  clearSelectedTask: () => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasksState, setTasksState] = useState<TasksState>({
    tasks: [],
    isLoading: false,
    error: null,
    selectedTask: null,
  });

  const fetchTasks = async () => {
    try {
      setTasksState(prev => ({ ...prev, isLoading: true, error: null }));
      const tasks = await tasksApi.getTasks();
      setTasksState(prev => ({ ...prev, tasks, isLoading: false }));
    } catch (error: any) {
      setTasksState(prev => ({
        ...prev,
        isLoading: false,
        error: error.error || 'Failed to fetch tasks',
      }));
    }
  };

  const createTask = async (input: CreateTaskInput) => {
    try {
      const newTask = await tasksApi.createTask(input);
      setTasksState(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
      }));
    } catch (error: any) {
      throw error;
    }
  };

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    try {
      const updatedTask = await tasksApi.updateTask(id, input);
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => task.id === id ? updatedTask : task),
      }));
    } catch (error: any) {
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id),
      }));
    } catch (error: any) {
      throw error;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasksState.tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistic update
    const optimisticTask = { ...task, isCompleted: !task.isCompleted };
    setTasksState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? optimisticTask : t),
    }));

    try {
      await tasksApi.toggleTaskCompletion(id, optimisticTask.isCompleted);
    } catch (error: any) {
      // Revert on failure
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === id ? task : t),
      }));
      throw error;
    }
  };

  const selectTask = (id: string) => {
    const task = tasksState.tasks.find(t => t.id === id);
    setTasksState(prev => ({ ...prev, selectedTask: task || null }));
  };

  const clearSelectedTask = () => {
    setTasksState(prev => ({ ...prev, selectedTask: null }));
  };

  return (
    <TasksContext.Provider
      value={{
        tasksState,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        selectTask,
        clearSelectedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
