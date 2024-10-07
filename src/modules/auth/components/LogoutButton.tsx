'use client';

import { logoutAction } from '@/actions';
import { Button } from '@/common/components/ui/button';

interface LoginButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClicked = () => {
    logoutAction();
  };

  return (
    <Button onClick={onClicked} className="cursor-pointer">
      {children}
    </Button>
  );
};
