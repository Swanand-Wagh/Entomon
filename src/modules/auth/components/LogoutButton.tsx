'use client';

import { logoutAction } from '@/actions';

interface LoginButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClicked = () => {
    logoutAction();
  };

  return (
    <span onClick={onClicked} className="cursor-pointer">
      {children}
    </span>
  );
};
