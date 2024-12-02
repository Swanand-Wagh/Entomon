import React from 'react';

import { getAllUsers } from '@/common/data/admin/users';
import { columns } from '@/modules/admin/components/users';
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
      <DataTable columns={columns} data={users} filterField="name" />
    </>
  );
};

export default AdminUsersPage;
