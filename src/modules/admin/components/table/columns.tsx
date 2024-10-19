'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/common/components/ui/button';

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
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const email = row.getValue('email');
      return (
        <span className="cursor-pointer" onClick={() => navigator.clipboard.writeText(email as string)}>
          {email as string}
        </span>
      );
    },
  },
  {
    accessorKey: 'role',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Role
        </Button>
      );
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    enableHiding: true,
    enableSorting: true,
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
];
