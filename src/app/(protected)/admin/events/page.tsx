import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/events/components';
import { getEvents } from '@/features/events/server/actions';

const AdminEventsPage = async () => {
  const events = await getEvents();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2 sm:space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Event Management
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Schedule and manage field expeditions and educational events
            </p>
          </div>

          <Link href="/admin/events/create">
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl">
              <Icon name="add" className="mr-2 h-5 w-5" aria-hidden="true" />
              Add an Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={events?.data ?? []} 
        showExportButton={false} 
        filterField="title" 
      />
    </div>
  );
};

export default AdminEventsPage;
