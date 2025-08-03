import React from 'react';
import { notFound } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { DataTable } from '@/components/custom/table';
import { userColumns } from '@/features/events/components';
import { getEntireEventRegistrationByUserId } from '@/features/events/server/actions';

const UserEventsPage = async () => {
  const user = await currentUser();
  if (!user) return notFound();

  const events = await getEntireEventRegistrationByUserId({ userId: user.id });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2 sm:space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            My Events
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Track your registered field expeditions and educational events
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={userColumns} data={events?.data ?? []} showExportButton={false} filterField="title" />
    </div>
  );
};

export default UserEventsPage;
