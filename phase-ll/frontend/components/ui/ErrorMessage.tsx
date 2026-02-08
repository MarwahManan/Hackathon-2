// components/ui/ErrorMessage.tsx
import React from 'react';
import { ErrorResponse } from '@/types/api';
import { Button } from './Button';

/**
 * ErrorMessage Component
 *
 * Displays error messages with proper styling and dark mode support.
 * Includes optional retry functionality.
 */

interface ErrorMessageProps {
  error: ErrorResponse | string | null;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.error;
  const errorDetails = typeof error === 'object' && error.details ? error.details : null;

  return (
    <div
      className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 sm:p-5 md:p-6 shadow-sm animate-slide-in-top"
      role="alert"
    >
      <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
        {/* Error Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-red-800 dark:text-red-200 mb-2">
            Error
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
            {errorMessage}
          </p>

          {errorDetails && (
            <ul className="mt-4 text-sm text-red-600 dark:text-red-400 space-y-2 pl-4">
              {Object.entries(errorDetails).map(([field, message]) => (
                <li key={field} className="flex items-start">
                  <span className="mr-2 text-red-500 dark:text-red-500">•</span>
                  <span className="flex-1">
                    <span className="font-medium">{field}:</span> {String(message)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Retry Button */}
        {onRetry && (
          <div className="flex-shrink-0">
            <Button
              onClick={onRetry}
              variant="danger"
              size="sm"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Retry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
