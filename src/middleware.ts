import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import authConfig from '@/auth.config';
import { apiAuthPrefix, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, ADMIN_ROUTES } from '@/common/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = ADMIN_ROUTES.test(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (role === 'USER' && isAdminRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl));
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
