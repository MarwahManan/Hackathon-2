'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { CreateTaskInput, Task, RecurrencePattern } from '@/types/task';
import { validateTaskTitle, validateTaskDescription } from '@/lib/utils/validation';

/**
 * TaskForm Component
 *
 * Form for creating and editing tasks with validation and error handling.
 * Includes calendar fields: due date, recurrence pattern, and recurrence end date.
 *
 * Updated: 2026-02-09 - Added calendar fields support
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
    dueDate: initialData?.dueDate ? format(new Date(initialData.dueDate), 'yyyy-MM-dd') : '',
    recurrencePattern: initialData?.recurrencePattern || '',
    recurrenceEndDate: initialData?.recurrenceEndDate ? format(new Date(initialData.recurrenceEndDate), 'yyyy-MM-dd') : '',
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

    // Validate recurrence logic
    if (!formData.recurrencePattern && formData.recurrenceEndDate) {
      newErrors.recurrenceEndDate = 'Recurrence end date requires a recurrence pattern';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData: CreateTaskInput = {
        title: formData.title,
        description: formData.description || undefined,
      };

      // Add calendar fields if provided
      if (formData.dueDate) {
        submitData.dueDate = new Date(formData.dueDate).toISOString();
      }
      if (formData.recurrencePattern) {
        submitData.recurrencePattern = formData.recurrencePattern as RecurrencePattern;
      }
      if (formData.recurrenceEndDate) {
        submitData.recurrenceEndDate = new Date(formData.recurrenceEndDate).toISOString();
      }

      await onSubmit(submitData);
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

      {/* Due Date Input */}
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 tracking-tight"
        >
          Due Date
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">(optional)</span>
        </label>
        <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="
            block w-full rounded-xl
            bg-white dark:bg-gray-800
            border-2 border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-4 focus:ring-offset-0
            focus:border-primary-500 focus:ring-primary-500/30
            hover:border-gray-400 dark:hover:border-gray-500
            hover:shadow-md
            focus:shadow-lg
            px-5 py-4 text-base
          "
        />
      </div>

      {/* Recurrence Pattern Select */}
      <div>
        <label
          htmlFor="recurrencePattern"
          className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 tracking-tight"
        >
          Recurrence Pattern
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">(optional)</span>
        </label>
        <select
          id="recurrencePattern"
          value={formData.recurrencePattern}
          onChange={(e) => setFormData({ ...formData, recurrencePattern: e.target.value })}
          className="
            block w-full rounded-xl
            bg-white dark:bg-gray-800
            border-2 border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-4 focus:ring-offset-0
            focus:border-primary-500 focus:ring-primary-500/30
            hover:border-gray-400 dark:hover:border-gray-500
            hover:shadow-md
            focus:shadow-lg
            px-5 py-4 text-base
          "
        >
          <option value="">No recurrence</option>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </div>

      {/* Recurrence End Date Input - Only show if recurrence pattern is selected */}
      {formData.recurrencePattern && (
        <div>
          <label
            htmlFor="recurrenceEndDate"
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 tracking-tight"
          >
            Recurrence End Date
            <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">(optional)</span>
          </label>
          <input
            id="recurrenceEndDate"
            type="date"
            value={formData.recurrenceEndDate}
            onChange={(e) => setFormData({ ...formData, recurrenceEndDate: e.target.value })}
            className={`
              block w-full rounded-xl
              bg-white dark:bg-gray-800
              border-2
              text-gray-900 dark:text-gray-100
              transition-all duration-200 ease-out
              focus:outline-none focus:ring-4 focus:ring-offset-0
              hover:shadow-md
              focus:shadow-lg
              px-5 py-4 text-base
              ${
                errors.recurrenceEndDate
                  ? 'border-error-500 dark:border-error-600 focus:border-error-600 focus:ring-error-500/30 bg-error-50/50 dark:bg-error-900/10'
                  : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/30 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
            aria-describedby={errors.recurrenceEndDate ? 'recurrence-end-date-error' : undefined}
            aria-invalid={!!errors.recurrenceEndDate}
          />
          {errors.recurrenceEndDate && (
            <p
              id="recurrence-end-date-error"
              className="mt-3 text-sm text-error-700 dark:text-error-400 font-medium flex items-start gap-2"
              role="alert"
            >
              <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{errors.recurrenceEndDate}</span>
            </p>
          )}
        </div>
      )}

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
