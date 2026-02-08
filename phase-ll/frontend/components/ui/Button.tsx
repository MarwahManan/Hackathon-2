// components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Size configurations - Updated to meet 44px touch target minimum
    const sizeConfig = {
      sm: 'h-11 px-4 text-sm gap-2',  // Updated from h-9 (36px) to h-11 (44px) for WCAG compliance
      md: 'h-12 px-6 text-base gap-2.5',  // 48px - comfortable touch target
      lg: 'h-14 px-8 text-lg gap-3',  // 56px - large touch target
    };

    // Variant styles - Updated to use design tokens
    const variantConfig = {
      primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl focus-visible:ring-primary-500',
      secondary: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg focus-visible:ring-primary-500',
      tertiary: 'bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500',
      danger: 'bg-error-600 text-white hover:bg-error-700 shadow-lg hover:shadow-xl focus-visible:ring-error-500',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center
          ${sizeConfig[size]}
          ${variantConfig[variant]}
          ${fullWidth ? 'w-full' : ''}
          font-semibold rounded-xl
          transition-all duration-200
          focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          whitespace-nowrap
          ${className}
        `}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
