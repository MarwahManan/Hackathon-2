import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="text-center max-w-6xl w-full py-16 sm:py-18 md:py-20 lg:py-24">
        {/* Hero Section */}
        <div className="mb-16 sm:mb-18 md:mb-20 lg:mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6 sm:mb-7 md:mb-8 shadow-sm animate-slide-in-top hover:scale-105 transition-transform duration-200">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>Boost Your Productivity</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-7 md:mb-8 tracking-tight leading-tight animate-slide-in-bottom">
            Welcome to{' '}
            <span className="text-gradient-purple-blue inline-block hover:scale-105 transition-transform duration-300">Todo App</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-11 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-in-bottom animate-stagger-1">
            Manage your tasks efficiently with our simple and powerful todo application.
            Stay organized and achieve your goals!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="primary"
                className="bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 hover:from-purple-700 hover:via-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl hover:scale-105"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 sm:mt-22 md:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-5 tracking-tight">
            Why Choose Todo App?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 sm:mb-13 md:mb-14 max-w-2xl mx-auto">
            Everything you need to stay organized and productive in one place
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
            <Card hoverable variant="elevated">
              <CardContent className="text-center p-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                  Easy to Use
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Simple and intuitive interface for managing your tasks efficiently without any learning curve
                </p>
              </CardContent>
            </Card>

            <Card hoverable variant="elevated">
              <CardContent className="text-center p-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                  Secure & Private
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your data is protected with JWT authentication and industry-standard encryption
                </p>
              </CardContent>
            </Card>

            <Card hoverable variant="elevated">
              <CardContent className="text-center p-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                  Fully Responsive
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Works seamlessly on mobile, tablet, and desktop devices for productivity anywhere
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
