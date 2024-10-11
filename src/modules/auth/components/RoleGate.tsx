'use client';

import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/common/hooks/use-current-role';
import { FormError } from '@/common/components/custom/FormError';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  fallbackComponent?: React.ReactNode;
}

export const RoleGate = ({ children, allowedRole, fallbackComponent }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return fallbackComponent ? (
      <>{fallbackComponent}</>
    ) : (
      <FormError message="You don't have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
