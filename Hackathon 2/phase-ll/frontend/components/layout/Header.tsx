'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/**
 * Header Component
 *
 * Main navigation header with responsive design and authentication state handling.
 *
 * Updated: 2026-02-08 - Design token alignment, reduced height variation, improved spacing, added theme toggle
 */

export function Header() {
  const { authState } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md border-b border-gray-200 dark:border-gray-700 mb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 py-2 rounded-lg"
            aria-label="Todo App Home"
          >
            Todo App
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3 sm:gap-4" aria-label="Main navigation">
            {/* Theme Toggle */}
            <ThemeToggle />

            {authState.isAuthenticated ? (
              <>
                <Link
                  href="/tasks"
                  className="hidden sm:inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all text-sm sm:text-base whitespace-nowrap min-h-touch"
                >
                  My Tasks
                </Link>

                <div className="hidden md:flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/30 gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium truncate max-w-[150px]">
                    {authState.user?.email}
                  </span>
                </div>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all text-sm sm:text-base whitespace-nowrap min-h-touch"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold px-5 py-2 rounded-xl hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base whitespace-nowrap min-h-touch"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
