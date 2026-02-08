export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200 animate-fade-in">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-9 md:py-10">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
          {/* Logo/Brand */}
          <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Todo App
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2026 Todo App. Built with Next.js and FastAPI.
          </p>

          {/* Tech Stack Badge */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <span className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 font-medium">
              Next.js 16
            </span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 font-medium">
              FastAPI
            </span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 font-medium">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
