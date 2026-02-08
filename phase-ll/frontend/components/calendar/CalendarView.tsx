'use client';

import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';
import { Task } from '@/types/task';
import { CalendarDay } from './CalendarDay';

/**
 * CalendarView Component
 *
 * Displays a monthly calendar grid with tasks for each day.
 * Shows 7 columns (days of week) and 5-6 rows (weeks).
 *
 * Created: 2026-02-09
 */

interface CalendarViewProps {
  currentDate: Date;
  tasks: Task[];
  onDayClick?: (date: Date) => void;
}

export function CalendarView({ currentDate, tasks, onDayClick }: CalendarViewProps) {
  // Get the first and last day of the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Get the start and end of the calendar view (including days from prev/next month)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  // Get all days to display in the calendar
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Group tasks by date for efficient lookup
  const tasksByDate = React.useMemo(() => {
    const grouped = new Map<string, Task[]>();
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
        if (!grouped.has(dateKey)) {
          grouped.set(dateKey, []);
        }
        grouped.get(dateKey)!.push(task);
      }
    });
    return grouped;
  }, [tasks]);

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return tasksByDate.get(dateKey) || [];
  };

  // Days of week header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Calendar Header - Days of Week */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid - Days */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <CalendarDay
              key={index}
              date={day}
              tasks={dayTasks}
              isCurrentMonth={isCurrentMonth}
              isToday={isCurrentDay}
              onClick={() => onDayClick?.(day)}
            />
          );
        })}
      </div>
    </div>
  );
}
