'use client';

import React, { useEffect, useState } from 'react';
import { UserNav } from './UserNav';
import { User } from '@prisma/client';
import { ButtonLink } from './ButtonLink';
import { useSession } from 'next-auth/react';

export const NavbarAction = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(session?.user as User);

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  const afterLogoutAction = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <UserNav user={user as User} afterLogoutAction={afterLogoutAction} />
      ) : (
        <ButtonLink url="/auth/login" name="Login/Register" />
      )}
    </>
  );
};
