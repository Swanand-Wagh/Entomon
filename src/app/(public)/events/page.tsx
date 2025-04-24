import React, { Suspense } from 'react';
import { EventListLayout } from '@/features/events/components/EventListLayout';
import { getEventsByStatus } from '@/features/events/server/actions';
import { Loading } from '@/components/custom';

export const revalidate = 3600;

const EventsContent = async () => {
  const events = await getEventsByStatus({ status: ['UPCOMING', 'PAUSED'] });
  return <EventListLayout events={events?.data || []} />;
};

const EventsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <Suspense fallback={<Loading />}>
          <EventsContent />
        </Suspense>
      </div>
    </section>
  );
};

export default EventsPage;
