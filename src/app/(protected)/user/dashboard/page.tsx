import React from 'react';

import { LogoutButton, RoleGate } from '@/modules/auth';
import { Spotlight } from '@/common/components/custom/Spotlight';

const UserDashboardPage = () => {
  return (
    <>
      <LogoutButton>Logout</LogoutButton>
    </>
  );
};

export default UserDashboardPage;