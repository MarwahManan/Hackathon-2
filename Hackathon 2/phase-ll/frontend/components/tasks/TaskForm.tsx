'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { CreateTaskInput, Task } from '@/types/task';
import { validateTaskTitle, validateTaskDescription } from '@/lib/utils/validation';

/**
 * TaskForm Component
 *
 * Form for creating and editing tasks with validation and error handling.
 *
 * Updated: 2026-02-08 - Design token alignment, improved textarea styling, accessibility enhancements
 */

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  submitLabel?: string;
}

export function TaskForm({ initialData, onSubmit, submitLabel = 'Save Task' }: TaskFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate
    const newErrors: Record<string, string> = {};
    const titleError = validateTaskTitle(formData.title);
    const descriptionError = validateTaskDescription(formData.description);

    if (titleError) newErrors.title = titleError;
    if (descriptionError) newErrors.description = descriptionError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      router.push('/tasks');
    } catch (error: any) {
      setApiError(error.error || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* API Error Message */}
      {apiError && (
        <div className="mb-6">
          <ErrorMessage error={apiError} />
        </div>
      )}

      {/* Title Input */}
      <Input
        label="Task Title"
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        placeholder="Enter task title"
        required
        size="md"
      />

      {/* Description Textarea */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 tracking-tight"
        >
          Description
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">(optional)</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`
            block w-full rounded-xl
            bg-white dark:bg-gray-800
            border-2
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-4 focus:ring-offset-0
            hover:border-gray-400 dark:hover:border-gray-500
            hover:shadow-md
            focus:shadow-lg
            px-5 py-4 text-base leading-relaxed min-h-[160px] resize-y
            ${
              errors.description
                ? 'border-error-500 dark:border-error-600 focus:border-error-600 focus:ring-error-500/30 bg-error-50/50 dark:bg-error-900/10'
                : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/30'
            }
          `}
          rows={7}
          placeholder="Enter task description (optional)"
          aria-describedby={errors.description ? 'description-error' : undefined}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p
            id="description-error"
            className="mt-3 text-sm text-error-700 dark:text-error-400 font-medium flex items-start gap-2"
            role="alert"
          >
            <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{errors.description}</span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6">
        <Button
          type="button"
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 hover:from-purple-700 hover:via-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
