import React from 'react';

import { UserRole } from '@prisma/client';
import { LogoutButton, RoleGate } from '@/modules/auth';

const UserDashboardPage = () => {
  return (
    <>
      <RoleGate allowedRole={UserRole.USER}>
        <LogoutButton>Logout</LogoutButton>
      </RoleGate>
    </>
  );
};

export default UserDashboardPage;
