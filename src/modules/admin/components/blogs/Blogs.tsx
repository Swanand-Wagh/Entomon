import React from 'react';
import Link from 'next/link';

import { AdminBlogsColumns } from './columns';
import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';
import { getAllBlogs } from '@/common/data/admin/blogs';
import { DataTable } from '@/common/components/custom/table';

export const Blogs = async () => {
  const blogs = await getAllBlogs({ id: true, title: true, slug: true, categories: true, isPaid: true });

  return (
    <>
      <Link href="/admin/blogs/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Blog
        </Button>
      </Link>

      <DataTable columns={AdminBlogsColumns} showExportButton={false} filterField="title" data={blogs ?? []} />
    </>
  );
};
