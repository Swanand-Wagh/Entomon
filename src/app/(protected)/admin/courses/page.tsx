import React from 'react';
import { DataTable } from '@/common/components/custom/table';
import { columns } from '@/modules/admin/components/courses';

const AdminCoursesPage = async () => {
  return (
    <>
      <DataTable columns={columns} data={[]} showExportButton={false} filterField="title" />
    </>
  );
};

export default AdminCoursesPage;
