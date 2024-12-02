import React from 'react';
import { columns } from '@/modules/admin/components/events';
import { DataTable } from '@/common/components/custom/table';

const AdminEventsPage = async () => {
  return (
    <>
      <DataTable columns={columns} data={[]} showExportButton={false} filterField="title" />
    </>
  );
};

export default AdminEventsPage;
