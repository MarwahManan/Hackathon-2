'use client';

import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types/task';

/**
 * CalendarDay Component
 *
 * Displays a single day cell in the calendar with its tasks.
 * Shows the day number and task indicators.
 *
 * Created: 2026-02-09
 */

interface CalendarDayProps {
  date: Date;
  tasks: Task[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onClick?: () => void;
}

export function CalendarDay({ date, tasks, isCurrentMonth, isToday, onClick }: CalendarDayProps) {
  const dayNumber = format(date, 'd');

  // Count completed and incomplete tasks
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const incompleteCount = tasks.filter(t => !t.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <div
      onClick={onClick}
      className={`
        min-h-[120px] p-3 border-b border-r border-gray-200 dark:border-gray-700
        transition-all duration-200 cursor-pointer
        hover:bg-gray-50 dark:hover:bg-gray-700/50
        ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-800'}
        ${isToday ? 'ring-2 ring-inset ring-primary-500 dark:ring-primary-400' : ''}
      `}
    >
      {/* Day Number */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`
            inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
            ${
              isToday
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : isCurrentMonth
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-600'
            }
          `}
        >
          {dayNumber}
        </span>

        {/* Task Count Badge */}
        {totalTasks > 0 && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            {totalTasks}
          </span>
        )}
      </div>

      {/* Task Indicators */}
      <div className="space-y-1">
        {tasks.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className={`
              text-xs px-2 py-1 rounded truncate
              ${
                task.isCompleted
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 line-through'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }
            `}
            title={task.title}
          >
            {task.title}
          </div>
        ))}

        {/* Show "+N more" if there are more than 3 tasks */}
        {totalTasks > 3 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
            +{totalTasks - 3} more
          </div>
        )}
      </div>

      {/* Task Summary (optional - shows completion status) */}
      {totalTasks > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          {completedCount > 0 && (
            <span className="flex items-center gap-0.5">
              <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {completedCount}
            </span>
          )}
          {incompleteCount > 0 && (
            <span className="flex items-center gap-0.5">
              <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              {incompleteCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
