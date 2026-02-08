'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';

/**
 * LogoutButton Component
 *
 * Handles user logout with loading state and error handling.
 *
 * Updated: 2026-02-08 - Design token alignment, improved accessibility, added icon
 */

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to signin even if logout fails
      router.push('/signin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      loading={loading}
      disabled={loading}
      aria-label="Sign out of your account"
      className="hover:border-red-400 dark:hover:border-red-500"
      leftIcon={
        <svg className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      }
    >
      <span className="text-red-600 dark:text-red-400">{loading ? 'Signing out...' : 'Sign Out'}</span>
    </Button>
  );
}
