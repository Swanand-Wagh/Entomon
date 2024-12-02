import React from 'react';
import Link from 'next/link';

import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';
import { DataTable } from '@/common/components/custom/table';
import { columns } from '@/modules/admin/components/courses';

const AdminCoursesPage = async () => {
  return (
    <>
      <Link href="/admin/courses/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Course
        </Button>
      </Link>

      <DataTable columns={columns} data={[]} showExportButton={false} filterField="title" />
    </>
  );
};

export default AdminCoursesPage;
