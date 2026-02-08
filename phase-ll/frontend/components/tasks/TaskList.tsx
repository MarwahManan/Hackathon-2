'use client';

import React from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
}

export function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
