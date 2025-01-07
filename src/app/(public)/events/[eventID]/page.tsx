import React, { Suspense } from 'react';

import { Loading } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';
import { getEventById } from '@/features/events/server/actions';
import { SingleEvent } from '@/features/events/components/SingleEvent';

export const revalidate = 300;

export async function generateStaticParams() {
  const eventIDs = await eventRepo.getAllEventIDs();
  return eventIDs.map((id) => ({ id }));
}

const ViewEventPage = async ({ params }: { params: Promise<{ eventID: string }> }) => {
  const eventID = (await params).eventID;
  const event = await getEventById({ id: eventID });

  if (!event?.data) {
    // redirect to 404 page
    return;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SingleEvent event={event?.data as any} />
      </Suspense>
    </>
  );
};

export default ViewEventPage;
