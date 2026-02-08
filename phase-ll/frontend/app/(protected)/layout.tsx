'use client';

import React from 'react';
import { TasksProvider } from '@/lib/context/TasksContext';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TasksProvider>{children}</TasksProvider>;
}
