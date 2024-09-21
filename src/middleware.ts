import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { apiAuthPrefix, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from '@/common/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
