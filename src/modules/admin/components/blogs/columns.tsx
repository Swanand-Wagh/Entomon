'use client';

import React, { startTransition, useState } from 'react';
import Link from 'next/link';

import { Icon } from '@/common/constants/icons';
import { ColumnDef } from '@tanstack/react-table';
import { deleteBlogAction } from '@/actions/admin/blog';
import { SortColumnButton } from '@/common/components/custom/table';
import { CustomModal } from '@/common/components/custom/CustomModal';

type AdminBlogsColumns = {
  title: string;
  slug: string;
  category: string;
  price: boolean;
};

const SlugLink = ({ value, slug }: { value: string; slug: string }) => {
  return (
    <Link href={`/admin/blogs/edit/${encodeURIComponent(slug.toLowerCase())}`}>
      <div className="cursor-pointer hover:underline">{value}</div>
    </Link>
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
    header: 'Category',
    cell: ({ getValue }) => {
      const categories = getValue<string>()?.split(',') || [];
      return (
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span key={index} className="inline-block rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
              {category.trim()}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Is Paid',
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const [isDialogOpen, setDialogOpen] = useState(false);

      const handleDelete = () => {
        setDialogOpen(false);

        startTransition(() => {
          deleteBlogAction(row.original.slug);
        });
      };

      return (
        <div className="flex items-center space-x-4">
          <Link href={`/admin/blogs/edit/${encodeURIComponent(row.original.slug)}`}>
            <Icon name="edit" className="h-5 w-5 cursor-pointer" />
          </Link>

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
