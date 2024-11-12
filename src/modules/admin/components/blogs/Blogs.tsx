import React from 'react';
import Link from 'next/link';

import { AdminBlogsColumns } from './columns';
import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';
import { DataTable } from '@/common/components/custom/table';

export const Blogs = async () => {
  return (
    <>
      <Link href="/admin/blogs/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Blog
        </Button>
      </Link>

      <DataTable
        columns={AdminBlogsColumns}
        showExportButton={false}
        filterField="title"
        data={[
          {
            title: 'How to Start Blogging',
            slug: 'Admin',
            category: 'admin1@example.com',
            price: '',
          },
        ]}
      />
    </>
  );
};
