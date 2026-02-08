'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTasks } from '@/lib/context/TasksContext';

/**
 * TaskCard Component
 *
 * Displays a task with checkbox, title, description, due date, recurrence, and action buttons.
 *
 * Updated: 2026-02-09 - Added calendar fields display (due date, recurrence)
 */

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { toggleTaskCompletion } = useTasks();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleTaskCompletion(task.id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsToggling(false);
    }
  };

  // Helper function to format due date with context
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  // Check if task is overdue
  const isOverdue = task.dueDate && !task.isCompleted && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));

  return (
    <Card hoverable className="group animate-slide-in-bottom">
      <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
        {/* Checkbox - Updated size and colors */}
        <div className="flex items-center justify-center min-w-[44px] min-h-[44px] pt-1">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggle}
            disabled={isToggling}
            className="w-6 h-6 rounded-md border-2 border-gray-300 dark:border-gray-600
                     text-primary-600 focus:ring-4 focus:ring-primary-500/30 focus:ring-offset-2
                     hover:border-primary-400 dark:hover:border-primary-500
                     cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
            aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold transition-all duration-200 tracking-tight ${
              task.isCompleted
                ? 'line-through text-gray-400 dark:text-gray-600'
                : 'text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`mt-3 text-sm leading-relaxed transition-colors duration-200 ${
                task.isCompleted
                  ? 'text-gray-400 dark:text-gray-600 line-through'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Due Date and Recurrence Info */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Due Date Badge */}
            {task.dueDate && (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isOverdue
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    : task.isCompleted
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-gray-700'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {isOverdue && 'Overdue: '}
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            )}

            {/* Recurrence Badge */}
            {task.recurrencePattern && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{task.recurrencePattern.charAt(0) + task.recurrencePattern.slice(1).toLowerCase()}</span>
              </div>
            )}
          </div>

          {/* Created Date */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={task.createdAt}>
              Created {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <Link href={`/tasks/${task.id}/edit`}>
            <Button size="sm" variant="secondary" aria-label={`Edit task: ${task.title}`} className="hover:border-blue-400 dark:hover:border-blue-500">
              <svg className="h-4 w-4 sm:mr-1.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden sm:inline text-blue-600 dark:text-blue-400">Edit</span>
            </Button>
          </Link>
          {onDelete && (
            <Button size="sm" variant="danger" onClick={() => onDelete(task.id)} aria-label={`Delete task: ${task.title}`}>
              <svg className="h-4 w-4 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Delete</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
