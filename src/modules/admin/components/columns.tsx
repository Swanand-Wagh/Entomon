'use client';

import { ColumnDef } from '@tanstack/react-table';

type UserColumn = {
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
  },
];
