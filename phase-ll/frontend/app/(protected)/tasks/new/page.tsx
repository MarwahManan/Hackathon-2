'use client';

import React from 'react';
import { useTasks } from '@/lib/context/TasksContext';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Card } from '@/components/ui/Card';

export default function NewTaskPage() {
  const { createTask } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-8 md:py-10 lg:py-14 max-w-3xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 tracking-tight">
            Create New Task
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            Add a new task to your list and stay organized
          </p>
        </div>

        {/* Form Card */}
        <Card padding="lg" variant="elevated" className="backdrop-blur-sm shadow-2xl">
          <TaskForm onSubmit={createTask} submitLabel="Create Task" />
        </Card>
      </div>
    </div>
  );
}
