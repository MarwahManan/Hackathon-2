// components/ui/Input.tsx
import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    // Size configurations - Updated to meet 44px touch target minimum
    const sizeConfig = {
      sm: {
        input: 'h-11 text-sm',  // Updated from h-10 (40px) to h-11 (44px) for WCAG compliance
        padding: leftIcon ? 'pl-12 pr-5' : rightIcon ? 'pl-5 pr-12' : 'px-5',
        icon: 'w-4 h-4',
        iconPosition: leftIcon ? 'left-3.5' : 'right-3.5'
      },
      md: {
        input: 'h-12 text-base',  // 48px - comfortable touch target
        padding: leftIcon ? 'pl-16 pr-6' : rightIcon ? 'pl-6 pr-16' : 'px-6',
        icon: 'w-5 h-5',
        iconPosition: leftIcon ? 'left-4' : 'right-4'
      },
      lg: {
        input: 'h-14 text-lg',  // 56px - large touch target
        padding: leftIcon ? 'pl-16 pr-7' : rightIcon ? 'pl-7 pr-16' : 'px-7',
        icon: 'w-6 h-6',
        iconPosition: leftIcon ? 'left-5' : 'right-5'
      }
    };

    const config = sizeConfig[size];

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
          >
            {label}
            {required && <span className="text-error-600 ml-1.5" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={`absolute ${config.iconPosition} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`}>
              <div className={config.icon}>{leftIcon}</div>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              ${fullWidth ? 'w-full' : ''}
              ${config.input}
              ${config.padding}
              rounded-xl
              border-2
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-500
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-offset-0
              hover:shadow-md
              focus:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              ${hasError
                ? 'border-error-500 focus:border-error-600 focus:ring-error-500/30 bg-error-50/50 dark:bg-error-900/10'
                : hasSuccess
                ? 'border-success-600 focus:border-success-700 focus:ring-success-500/30 bg-success-50/50 dark:bg-success-900/10'
                : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/30'
              }
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` :
              hasSuccess ? `${inputId}-success` :
              helperText ? `${inputId}-helper` :
              undefined
            }
            required={required}
            {...props}
          />

          {(rightIcon || hasError || hasSuccess) && (
            <div className={`absolute ${config.iconPosition} top-1/2 -translate-y-1/2 pointer-events-none`}>
              {hasError ? (
                <svg className={`${config.icon} text-error-600`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : hasSuccess ? (
                <svg className={`${config.icon} text-success-600`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : rightIcon ? (
                <div className={`${config.icon} text-gray-400`}>{rightIcon}</div>
              ) : null}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-error-700 dark:text-error-400 font-medium flex items-start gap-2" role="alert">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {success && !error && (
          <p id={`${inputId}-success`} className="mt-2 text-sm text-success-700 dark:text-success-400 font-medium flex items-start gap-2" role="status">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{success}</span>
          </p>
        )}

        {helperText && !error && !success && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
