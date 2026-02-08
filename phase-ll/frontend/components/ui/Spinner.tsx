// components/ui/Spinner.tsx
import React from 'react';

/**
 * Spinner Component
 *
 * A loading spinner with purple-blue gradient colors and dark mode support.
 */

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className = '', label = 'Loading...' }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`
            ${sizeStyles[size]}
            border-purple-200 dark:border-purple-900/50
            rounded-full
            ${className}
          `}
          aria-hidden="true"
        />
        {/* Spinning gradient ring */}
        <div
          className={`
            absolute inset-0
            ${sizeStyles[size]}
            border-transparent
            border-t-purple-600 dark:border-t-purple-400
            border-r-blue-600 dark:border-r-blue-400
            rounded-full
            animate-spin
          `}
          role="status"
          aria-label={label}
        />
      </div>
      <span className="sr-only">{label}</span>
      {label && size !== 'sm' && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}
