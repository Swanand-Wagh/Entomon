'use client';

import { logoutAction } from '@/actions/auth';

type LoginButtonProps = {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClicked = () => {
    logoutAction();
  };

  return (
    <div onClick={onClicked} className="w-full cursor-pointer">
      {children}
    </div>
  );
};
