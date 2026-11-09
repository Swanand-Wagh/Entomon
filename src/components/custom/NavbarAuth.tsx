'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { UserNav } from './UserNav';

export const NavbarAuth = ({ mobile = false }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="inline-block h-9 w-24 animate-pulse rounded-lg bg-gray-100" role="status" aria-label="Loading account" />;
  }

  if (session?.user) return <UserNav user={session.user} />;

  return (
    <Link
      href="/auth/login"
      className={mobile
        ? 'block rounded-lg bg-gray-900 p-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800'
        : 'inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'}
    >
      Login / Register
    </Link>
  );
};
