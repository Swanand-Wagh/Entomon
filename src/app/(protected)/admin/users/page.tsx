import React from 'react';

import { columns } from '@/modules/admin';
import { getAllUsers } from '@/common/data/admin';
import { DataTable } from '@/common/components/custom/table';

const AdminUsersPage = async () => {
  const data = await getAllUsers();

  const users = data.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    emailVerified: !!user.emailVerified,
  }));

  return (
    <>
      <DataTable columns={columns} data={users} />
    </>
  );
};

export default AdminUsersPage;
