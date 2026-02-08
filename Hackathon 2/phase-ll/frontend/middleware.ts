// middleware.ts - Route protection middleware (DISABLED)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication check disabled - token is in localStorage, not cookies
  // Allow all routes to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/login', '/signup', '/signin'],
};
