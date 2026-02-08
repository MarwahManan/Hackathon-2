// components/ui/FormField.tsx
import React from 'react';

/**
 * FormField Component
 *
 * A wrapper component for form fields with label, error, and helper text support.
 * Provides consistent styling and accessibility features with animations.
 */

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export function FormField({
  label,
  error,
  children,
  required,
  helperText,
  className = ''
}: FormFieldProps) {
  return (
    <div className={`mb-4 sm:mb-5 md:mb-6 animate-fade-in ${className}`}>
      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-2.5 md:mb-3 tracking-tight transition-colors-smooth">
        {label}
        {required && (
          <span className="text-red-500 dark:text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="mt-2 sm:mt-2.5 md:mt-3 text-sm text-red-600 dark:text-red-400 font-medium flex items-start gap-1.5 sm:gap-2 animate-slide-in-top"
          role="alert"
        >
          <svg
            className="h-4 w-4 mt-0.5 flex-shrink-0"
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
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 sm:mt-2.5 md:mt-3 text-sm text-gray-500 dark:text-gray-400 transition-colors-smooth">
          {helperText}
        </p>
      )}
    </div>
  );
}
