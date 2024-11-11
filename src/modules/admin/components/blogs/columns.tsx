'use client';

import { useTransition } from 'react';
import { Icon } from '@/common/constants/icons';
import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/common/components/custom/table';

type AdminBlogsColumns = {
  title: string;
  slug: string;
  category: string;
  price: string;
};

export const AdminBlogsColumns: ColumnDef<AdminBlogsColumns>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return <SortColumnButton column={column} label="Title" />;
    },
  },
  {
    accessorKey: 'slug',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return <SortColumnButton column={column} label="Slug" />;
    },
  },
  {
    accessorKey: 'category',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return <SortColumnButton column={column} label="Category" />;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: function Cell({ row }) {
      const [isUpdatePending, startUpdateTransition] = useTransition();

      return (
        <div className="flex items-center space-x-4">
          <Icon name="edit" className="h-5 w-5 cursor-pointer" />
          <Icon name="delete" className="h-6 w-6 cursor-pointer text-red-500" />
        </div>
      );
    },
  },
];
