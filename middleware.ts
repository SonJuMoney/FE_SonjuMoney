import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Prevent redirect loops by checking current path
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/signup/')
  ) {
    if (session?.user) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|AnimatedIcons|Avatar|BankImage|Icons|Logo|Default_Profile.svg|api/auth).*)',
    '/login',
    '/',
    '/signup/*',
  ],
};
