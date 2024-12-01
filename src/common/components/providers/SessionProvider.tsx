'use client';

import React from 'react';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export const SessionProvider = ({ children, session }: Readonly<{ children: React.ReactNode; session: Session }>) => {
  return (
    <NextAuthSessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </NextAuthSessionProvider>
  );
};
