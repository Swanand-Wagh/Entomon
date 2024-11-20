import React from 'react';
import Link from 'next/link';

import { AdminBlogsColumns } from './columns';
import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';
import { getAllBlogs } from '@/common/data/admin/blogs';
import { DataTable } from '@/common/components/custom/table';

export const Blogs = async () => {
  const data = await getAllBlogs();
  const blogs = data.map((blog) => ({
    title: blog.title,
    slug: blog.slug,
    category: blog.categories.join(', '),
    price: blog.isPaid,
  }));

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
