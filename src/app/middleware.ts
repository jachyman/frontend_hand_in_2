import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken') || req.headers.get('Authorization');

  // If there's no token and the route requires authentication, redirect to login
  if (!token && req.nextUrl.pathname.startsWith('/dashboard/')) {
    return NextResponse.redirect(new URL('/dashboard/log-in', req.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/manager/:path*'], // Apply middleware to manager routes
};
