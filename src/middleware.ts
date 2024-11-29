import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  ADMIN_ROUTES,
  PUBLIC_ROUTES,
  ROUTE_MAPPINGS,
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT,
} from '@/common/lib/routes';
import authConfig from '@/auth.config';

type routeMapping = keyof typeof ROUTE_MAPPINGS;

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { auth: session, nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!session;
  const role = session?.user?.role;

  if (pathname in ROUTE_MAPPINGS) {
    return NextResponse.redirect(new URL(ROUTE_MAPPINGS[pathname as routeMapping], nextUrl));
  }

  // Allow API auth routes
  if (pathname.startsWith(API_AUTH_PREFIX)) {
    return NextResponse.next();
  }

  // Prevent user role access to admin routes
  if (role === 'USER' && ADMIN_ROUTES.test(pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Handle authentication routes
  if (AUTH_ROUTES.includes(pathname)) {
    return isLoggedIn ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) : NextResponse.next();
  }

  // Redirect unauthenticated users away from private routes
  if (!isLoggedIn && !PUBLIC_ROUTES.test(pathname)) {
    const callbackUrl = encodeURIComponent(`${nextUrl.pathname}${nextUrl.search}`);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
