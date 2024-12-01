'use client';

import { logoutAction } from '@/actions/auth';

type LoginButtonProps = {
  children?: React.ReactNode;
  action?: () => void;
};

export const LogoutButton = ({ children, action }: LoginButtonProps) => {
  const onClicked = async () => {
    await logoutAction();
  };

  return (
    <div onClick={onClicked} className="w-full cursor-pointer">
      {children}
    </div>
  );
};
