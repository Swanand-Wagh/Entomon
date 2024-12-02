import React from 'react';
import Link from 'next/link';

import { prisma } from '@/common/lib/prisma';
import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';
import { columns } from '@/modules/admin/components/blogs';
import { DataTable } from '@/common/components/custom/table';

const AdminBlogsPage = async () => {
  const blogs = await prisma.blog.findMany({
    select: {
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });

  return (
    <>
      <Link href="/admin/blogs/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Blog
        </Button>
      </Link>

      <DataTable columns={columns} showExportButton={false} filterField="title" data={blogs ?? []} />
    </>
  );
};

export default AdminBlogsPage;
