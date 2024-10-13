import React from 'react';

import { UserRole } from '@prisma/client';
import { RoleGate } from '@/modules/auth';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGate allowedRole={UserRole.USER}>
      <div>
        <h1>Header</h1>
        <h1>Sidebar</h1>
      </div>

      {children}
    </RoleGate>
  );
}
