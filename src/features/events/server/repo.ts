import 'server-only';

import { prisma } from '@/db/prisma';
import { Event, Prisma } from '@prisma/client';

async function getAllEvents(): Promise<Event[]> {
  return await prisma.event.findMany();
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      slug,
    },
  });
}

async function createEvent(data: Prisma.EventCreateInput): Promise<Event> {
  return await prisma.event.create({
    data,
  });
}

async function updateEvent(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
  return await prisma.event.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteEvent(id: string): Promise<Event> {
  return await prisma.event.delete({
    where: {
      id,
    },
  });
}

async function getAllEventSlugs(): Promise<string[]> {
  const eventIDs = await prisma.event.findMany({
    select: {
      slug: true,
    },
  });

  return eventIDs.map((event) => event.slug);
}

export const eventRepo = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventBySlug,
  getAllEventSlugs,
};
