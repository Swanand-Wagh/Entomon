'use client';

import { signOut } from 'next-auth/react';

type LoginButtonProps = {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClicked = () => {
    void signOut({ callbackUrl: '/' });
  };

  return (
    <div onClick={onClicked} className="w-full cursor-pointer">
      {children}
    </div>
  );
};
