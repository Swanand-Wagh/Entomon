import React, { Suspense } from 'react';

import { Loading } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';
import { getEventById } from '@/features/events/server/actions';
import { SingleEvent } from '@/features/events/components/SingleEvent';
import { EventDataType } from '@/features/events/types/event';

export const revalidate = 300;

export async function generateStaticParams() {
  const eventIDs = await eventRepo.getAllEventIDs();
  return eventIDs.map((id) => ({ id }));
}

const ViewEventPage = async ({ params }: { params: Promise<{ eventID: string }> }) => {
  const eventID = (await params).eventID;
  const event = await getEventById({ id: eventID });

  const sampleEvent: EventDataType = {
    id: '1',
    title: 'Summer Bug Hunt',
    description: 'Join us for a day of amazing bug hunt and fun activities!',
    date: new Date('2023-07-15'),
    location: 'Central Park, New York',
    coverImage: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
    price: '$50',
    categories: ['Hike', 'Outdoor'],
    status: 'UPCOMING',
    slug: 'summer-bugs-hunt',
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  };

  if (!event?.data) {
    // redirect to 404 page
    return;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SingleEvent event={sampleEvent} />
      </Suspense>
    </>
  );
};

export default ViewEventPage;
