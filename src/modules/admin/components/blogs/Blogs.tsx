import React from 'react';

import { AdminBlogsColumns } from './columns';
import { DataTable } from '@/common/components/custom/table';

export const Blogs = async () => {
  return (
    <>
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
