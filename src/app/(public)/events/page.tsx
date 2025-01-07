import React from 'react';
import { getEvents } from '@/features/events/server/actions';
import { EventList } from '@/features/events/components/EventList';
import { EventDataType } from '@/features/events/types/event';

const EventsPage = async () => {
  const events = await getEvents();

  const sampleEvent: EventDataType[] = [
    {
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
    },
    {
      id: '1',
      title: 'Summer Bug Hunt',
      description: 'Join us for a day of amazing bug hunt and fun activities!',
      date: new Date('2023-07-15'),
      location: 'Central Park, New York',
      coverImage: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
      price: '$50',
      categories: ['Hike', 'Outdoor'],
      status: 'UPCOMING',
      slug: 'summer-bug-hunt',
      createdAt: '2023-05-01T00:00:00Z',
      updatedAt: '2023-05-01T00:00:00Z',
    },
  ];

  return (
    <>
      <h1>Events</h1>
      <EventList events={sampleEvent} />
    </>
  );
};

export default EventsPage;
