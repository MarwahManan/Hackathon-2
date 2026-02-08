'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/**
 * Header Component
 *
 * Main navigation header with responsive design and mobile menu.
 *
 * Updated: 2026-02-09 - Added mobile hamburger menu, centered logo on mobile
 */

export function Header() {
  const { authState } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md border-b border-gray-200 dark:border-gray-700 mb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Button (Left side on mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              // Close icon (X)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo (Centered on mobile, left on desktop) */}
          <Link
            href="/"
            className="flex-shrink-0 text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 py-2 rounded-lg drop-shadow-lg md:mr-auto"
            aria-label="Todo App Home"
          >
            Todo App
          </Link>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-3 sm:gap-4" aria-label="Main navigation">
            {/* Theme Toggle */}
            <ThemeToggle />

            {authState.isAuthenticated ? (
              <>
                <Link
                  href="/tasks"
                  className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all text-sm sm:text-base whitespace-nowrap min-h-touch"
                >
                  My Tasks
                </Link>

                <div className="flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/30 gap-2">
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

          {/* Theme Toggle (Visible on mobile, right side) */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 mt-2">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {authState.isAuthenticated ? (
                <>
                  {/* User Email */}
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/30 gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium truncate">
                      {authState.user?.email}
                    </span>
                  </div>

                  {/* Home Link */}
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>

                  {/* My Tasks Link */}
                  <Link
                    href="/tasks"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Tasks
                  </Link>

                  {/* Logout Button */}
                  <div className="w-full">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  {/* Sign In Link */}
                  <Link
                    href="/signin"
                    onClick={closeMobileMenu}
                    className="w-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all text-center border-2 border-gray-300 dark:border-gray-600"
                  >
                    Sign In
                  </Link>

                  {/* Sign Up Link */}
                  <Link
                    href="/signup"
                    onClick={closeMobileMenu}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold px-4 py-3 rounded-lg hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
