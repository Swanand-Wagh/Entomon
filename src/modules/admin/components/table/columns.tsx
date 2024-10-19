'use client';

import { Icon } from '@/common/constants/icons';
import { ColumnDef } from '@tanstack/react-table';

type UserColumn = {
  name: string;
  role: string;
  email: string;
  emailVerified: boolean;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'name',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <span className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <Icon name={column.getIsSorted() === 'asc' ? 'filterArrowUp' : 'filterArrowDown'} className="ml-1 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <span className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <Icon name={column.getIsSorted() === 'asc' ? 'filterArrowUp' : 'filterArrowDown'} className="ml-1 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    enableHiding: true,
    enableSorting: true,
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
];
