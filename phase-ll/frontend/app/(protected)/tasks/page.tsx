'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTasks } from '@/lib/context/TasksContext';
import { TaskList } from '@/components/tasks/TaskList';
import { DeleteConfirmDialog } from '@/components/tasks/DeleteConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function TasksPage() {
  const { tasksState, fetchTasks, deleteTask } = useTasks();
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteClick = (id: string) => {
    const task = tasksState.tasks.find(t => t.id === id);
    if (task) {
      setDeleteConfirm({ id: task.id, title: task.title });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      await deleteTask(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (tasksState.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading your tasks...</p>
      </div>
    );
  }

  const completedCount = tasksState.tasks.filter(t => t.isCompleted).length;
  const totalCount = tasksState.tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/10 to-secondary-50/10 dark:from-gray-900 dark:via-primary-900/5 dark:to-secondary-900/5">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-8 sm:py-10 md:py-12 lg:py-14 max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-5 mb-6 sm:mb-7 md:mb-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 tracking-tight">
                My Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Manage your tasks and stay organized
              </p>
            </div>
            <Link href="/tasks/new">
              <Button
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 hover:from-purple-700 hover:via-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl hover:scale-105"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Task
              </Button>
            </Link>
          </div>

          {/* Progress Stats */}
          {totalCount > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-scale-in hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {completedCount} of {totalCount}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {progressPercentage}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Complete</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Task completion progress: ${progressPercentage}%`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {tasksState.error && (
          <div className="mb-6">
            <ErrorMessage error={tasksState.error} onRetry={fetchTasks} />
          </div>
        )}

        {/* Task List */}
        <TaskList tasks={tasksState.tasks} onDelete={handleDeleteClick} />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={!!deleteConfirm}
          taskTitle={deleteConfirm?.title || ''}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
