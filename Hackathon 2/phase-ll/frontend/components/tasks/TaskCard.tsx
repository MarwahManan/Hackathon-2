'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTasks } from '@/lib/context/TasksContext';

/**
 * TaskCard Component
 *
 * Displays a task with checkbox, title, description, and action buttons.
 *
 * Updated: 2026-02-08 - Design token alignment, improved checkbox size, accessibility enhancements
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
