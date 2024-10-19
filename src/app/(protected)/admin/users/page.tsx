import React from 'react';

import { getAllUsers } from '@/common/data/admin';
import { columns, UserDataTable } from '@/modules/admin';

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
      <div className="container mx-auto py-10">
        <UserDataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default AdminUsersPage;
