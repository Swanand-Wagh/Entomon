import React, { Suspense } from 'react';

import { Loading } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';
import { EventDataType } from '@/features/events/types/event';
import { getEventBySlug } from '@/features/events/server/actions';
import { SingleEvent } from '@/features/events/components/SingleEvent';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const eventSlugs = await eventRepo.getAllEventSlugs();
  return eventSlugs.map((slug) => ({ slug }));
}

const ViewEventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const event = await getEventBySlug({ slug });

  if (!event?.data) {
    // redirect to 404 page
    return;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SingleEvent data={event.data} />
      </Suspense>
    </>
  );
};

export default ViewEventPage;
