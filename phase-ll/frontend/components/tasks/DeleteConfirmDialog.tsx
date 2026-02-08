'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

/**
 * DeleteConfirmDialog Component
 *
 * A modal dialog for confirming task deletion with proper accessibility and dark mode support.
 */

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1400] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-all duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 md:p-10 z-[1500] transform transition-all duration-300 animate-scale-in hover:shadow-3xl">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full bg-red-100 dark:bg-red-900/30 ring-8 ring-red-50 dark:ring-red-900/20 animate-pulse-slow">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2
          id="delete-dialog-title"
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3 sm:mb-4 tracking-tight"
        >
          Delete Task?
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-9 md:mb-10 leading-relaxed">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100 break-words">
            "{taskTitle}"
          </span>
          ? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
            disabled={isDeleting}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            disabled={isDeleting}
            loading={isDeleting}
            fullWidth
          >
            {isDeleting ? 'Deleting...' : 'Delete Task'}
          </Button>
        </div>
      </div>
    </div>
  );
}
