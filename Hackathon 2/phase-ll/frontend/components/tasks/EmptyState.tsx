import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function EmptyState() {
  return (
    <Card padding="lg" variant="elevated" className="text-center max-w-2xl mx-auto animate-scale-in">
      {/* Icon */}
      <div className="flex justify-center mb-8 sm:mb-9 md:mb-10">
        <div className="relative animate-slide-in-top">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
            <svg
              className="w-16 h-16 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-800/50 animate-pulse-slow" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800/50 animate-pulse-slow animate-stagger-2" />
        </div>
      </div>

      {/* Content */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 tracking-tight">
        No tasks yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-10 sm:mb-11 md:mb-12 max-w-md mx-auto leading-relaxed text-base sm:text-lg">
        Get started by creating your first task. Stay organized and track your progress effortlessly!
      </p>

      {/* Action Button */}
      <Link href="/tasks/new">
        <Button
          variant="primary"
          size="lg"
          className="bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 hover:from-purple-700 hover:via-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl hover:scale-105"
          leftIcon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Create Your First Task
        </Button>
      </Link>

      {/* Tips */}
      <div className="mt-10 sm:mt-11 md:mt-12 pt-8 sm:pt-9 md:pt-10 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 sm:mb-5">
          Quick Tips
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 text-left">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Tasks</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Create and organize your to-dos</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Track Progress</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Check off completed items</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Stay Organized</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Keep everything in one place</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
