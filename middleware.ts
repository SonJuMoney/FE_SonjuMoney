import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user?.accessToken;

  const pathname = req.nextUrl.pathname;

  // Prevent redirect loops by checking current path
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/signup/')
  ) {
    if (didLogin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!didLogin) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Ensure authenticated users are redirected from /login to /home
  if (pathname === '/login' && didLogin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|AnimatedIcons|Avatar|BankImage|Icons|Logo|api/auth).*)',
    '/login',
    '/',
    '/signup',
  ],
};
