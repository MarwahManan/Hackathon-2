'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTasks } from '@/lib/context/TasksContext';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { getTask } from '@/lib/api/tasks';
import { Task } from '@/types/task';

export default function EditTaskPage() {
  const params = useParams();
  const taskId = params.id as string;
  const { updateTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTask(taskId);
        setTask(taskData);
      } catch (err: any) {
        setError(err.error || 'Failed to load task');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (data: { title: string; description?: string }) => {
    await updateTask(taskId, data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading task...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-9 md:py-10 max-w-3xl">
          <ErrorMessage error={error || 'Task not found'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-8 md:py-10 lg:py-14 max-w-3xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 tracking-tight">
            Edit Task
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            Update your task details and keep everything organized
          </p>
        </div>

        {/* Form Card */}
        <Card padding="lg" variant="elevated" className="backdrop-blur-sm shadow-2xl">
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            submitLabel="Update Task"
          />
        </Card>
      </div>
    </div>
  );
}
