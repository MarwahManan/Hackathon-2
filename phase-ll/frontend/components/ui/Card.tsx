// components/ui/Card.tsx
import React from 'react';

/**
 * Card Component
 *
 * A flexible container component with consistent styling and dark mode support.
 * Provides visual grouping and elevation for content sections.
 *
 * Updated: 2026-02-08 - Design token alignment and accessibility improvements
 */

interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Card padding size
   * - sm: 16px (1rem)
   * - md: 24px (1.5rem) - default
   * - lg: 32px (2rem)
   * - none: no padding
   */
  padding?: 'sm' | 'md' | 'lg' | 'none';

  /**
   * Card variant
   * - default: White background with shadow
   * - outlined: Border with no shadow
   * - elevated: Larger shadow for emphasis
   */
  variant?: 'default' | 'outlined' | 'elevated';

  /**
   * Enable hover effect
   */
  hoverable?: boolean;

  /**
   * Click handler (makes card interactive)
   */
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      padding = 'md',
      variant = 'default',
      hoverable = false,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = `
      rounded-2xl
      bg-white dark:bg-gray-800
      transition-all duration-200 ease-out
      animate-fade-in
      ${onClick ? 'cursor-pointer' : ''}
    `;

    // Padding styles - Using design tokens (increased for better spacing)
    const paddingStyles = {
      none: '',
      sm: 'p-6 sm:p-7 md:p-8',      // 24px → 28px → 32px
      md: 'p-8 sm:p-10 md:p-12',    // 32px → 40px → 48px (default)
      lg: 'p-10 sm:p-12 md:p-14',   // 40px → 48px → 56px
    };

    // Variant styles - Using design tokens
    const variantStyles = {
      default: `
        shadow-md
        border border-gray-200 dark:border-gray-700
        hover:shadow-lg
      `,
      outlined: `
        border-2 border-gray-300 dark:border-gray-600
        hover:border-gray-400 dark:hover:border-gray-500
      `,
      elevated: `
        shadow-lg
        border border-gray-100 dark:border-gray-700
        hover:shadow-xl
      `,
    };

    // Hover styles - Refined for subtlety
    const hoverStyles = hoverable || onClick
      ? `
        hover:shadow-xl
        hover:scale-[1.01]
        hover:-translate-y-1
        hover:border-primary-200 dark:hover:border-primary-700
        active:scale-[0.99]
        active:translate-y-0
      `
      : '';

    // Combine all styles
    const cardClasses = `
      ${baseStyles}
      ${paddingStyles[padding]}
      ${variantStyles[variant]}
      ${hoverStyles}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader Component
 * For consistent card header styling
 */
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * CardTitle Component
 * For consistent card title styling
 */
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

/**
 * CardContent Component
 * For consistent card content styling
 */
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-gray-700 dark:text-gray-300 leading-relaxed ${className}`}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 * For consistent card footer styling
 */
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};
