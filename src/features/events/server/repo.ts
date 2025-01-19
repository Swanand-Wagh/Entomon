import 'server-only';

import { prisma } from '@/db/prisma';
import { EventWithoutDescriptionType } from '../types/event';
import { Event, EventRegistration, EventStatus, Prisma } from '@prisma/client';

async function getAllEventSlugs(): Promise<string[]> {
  const eventIDs = await prisma.event.findMany({
    select: {
      slug: true,
    },
  });

  return eventIDs.map((event) => event.slug);
}

async function getAllEvents(): Promise<EventWithoutDescriptionType[]> {
  return await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      slug: true,
      location: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      price: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getEventsByStatus(status: EventStatus): Promise<EventWithoutDescriptionType[]> {
  return await prisma.event.findMany({
    where: {
      status,
    },
    select: {
      id: true,
      title: true,
      status: true,
      slug: true,
      location: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      price: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      slug,
    },
  });
}

async function getEventById(id: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      id,
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

// -------------------------- Registration --------------------------

async function registerUserForEvent(data: Prisma.EventRegistrationUncheckedCreateInput): Promise<EventRegistration> {
  return await prisma.eventRegistration.create({
    data,
  });
}

async function getEventRegistrationsByEventId(eventId: string): Promise<EventRegistration[]> {
  return await prisma.eventRegistration.findMany({
    where: {
      eventId,
    },
  });
}

async function deleteEventRegistration(eventId: string, userId: string): Promise<EventRegistration> {
  return await prisma.eventRegistration.delete({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  });
}

export const eventRepo = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEventBySlug,
  getAllEventSlugs,
  getEventsByStatus,
  registerUserForEvent,
  getEventRegistrationsByEventId,
  deleteEventRegistration,
};
