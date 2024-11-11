'use client';

import { useRouter } from 'next/navigation';
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

const SlugLink = ({ value, slug }: { value: string; slug: string }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer hover:underline"
      onClick={() => router.push(`/admin/blogs/edit/${encodeURIComponent(slug.toLowerCase())}`)}
    >
      {value}
    </div>
  );
};

export const AdminBlogsColumns: ColumnDef<AdminBlogsColumns>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink value={row.getValue('title')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'slug',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Slug" />,
    cell: ({ row }) => <SlugLink value={row.getValue('slug')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'category',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Category" />,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
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
