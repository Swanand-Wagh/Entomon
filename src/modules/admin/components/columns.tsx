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
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true,
    cell: ({ row }) => {
      const email = row.getValue('email');
      return (
        <span
          className="cursor-pointer text-blue-500 underline"
          onClick={() => navigator.clipboard.writeText(email as string)}
        >
          {email as string}
        </span>
      );
    },
  },
  {
    accessorKey: 'role',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      )
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    enableSorting: true,
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
];
