'use client';

import { useEffect, useRef } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const AuthSessionSync = () => {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const { update } = useSession();

  useEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;

    // Server-action sign-in updates cookies without notifying the client session provider.
    if (previous?.startsWith('/auth/') && !pathname?.startsWith('/auth/')) {
      void update();
    }
  }, [pathname, update]);

  return null;
};

export const AuthSessionProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider refetchOnWindowFocus={false}>
    <AuthSessionSync />
    {children}
  </SessionProvider>
);
