import React from 'react';

import { UserRole } from '@prisma/client';
import { RoleGate } from '@/modules/auth';

const AdminPage = () => {
  return (
    <>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div>hey</div>
      </RoleGate>
    </>
  );
};

export default AdminPage;
