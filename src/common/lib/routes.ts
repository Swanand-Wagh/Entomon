const ADMIN_ROUTES = /^\/admin(\/.*)?$/;

const PUBLIC_ROUTES = ['/', '/about', '/contact', '/auth/new-verification'];

const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/error', '/auth/reset', '/auth/new-password'];

const apiAuthPrefix = '/api/auth';

const DEFAULT_LOGIN_REDIRECT = '/user/dashboard';

export { ADMIN_ROUTES, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, apiAuthPrefix };
