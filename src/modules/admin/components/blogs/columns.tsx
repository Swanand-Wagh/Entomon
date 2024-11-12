'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/common/constants/icons';
import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/common/components/custom/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/common/components/ui/dialog';
import { Button } from '@/common/components/ui/button';
import { CustomModal } from '@/common/components/custom/CustomModal';

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
      const router = useRouter();
      const [isDialogOpen, setDialogOpen] = useState(false);

      const handleDelete = async () => {
        console.log('Delete', row.original);
        setDialogOpen(false);
      };

      return (
        <div className="flex items-center space-x-4">
          <span onClick={() => router.push(`/admin/blogs/edit/${encodeURIComponent(row.original.slug.toLowerCase())}`)}>
            <Icon name="edit" className="h-5 w-5 cursor-pointer" />
          </span>

          <CustomModal
            open={isDialogOpen}
            onConfirm={handleDelete}
            onOpenChange={setDialogOpen}
            confirmButtonVariant="destructive"
            title="Confirm Deletion"
            confirmButtonLabel="Delete"
            cancelButtonLabel="Cancel"
            description="Are you sure you want to delete this blog? This action cannot be undone!"
            trigger={
              <span onClick={() => setDialogOpen(true)}>
                <Icon name="delete" className="h-6 w-6 cursor-pointer text-red-500" />
              </span>
            }
          />
        </div>
      );
    },
  },
];
