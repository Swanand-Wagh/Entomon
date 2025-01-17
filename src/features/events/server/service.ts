import 'server-only';

import { eventRepo } from './repo';
import { Event } from '@prisma/client';
import { ErrorResponse } from '@/types/errors';
import { CreateEvent, UpdateEvent } from '../schema/event';

// returns all events
async function getEvents(): Promise<Event[]> {
  return await eventRepo.getAllEvents();
}

// returns all events
async function getUpcomingEvents(): Promise<Event[]> {
  return await eventRepo.getUpcomingEvents();
}

// returns all events
async function getCompletedEvents(): Promise<Event[]> {
  return await eventRepo.getCompletedEvents();
}

// returns a single event object based on slug
async function getEventBySlug(slug: string): Promise<Event | null> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) throw new ErrorResponse('Event not found');

  return event;
}

// admin can create an event
async function createEvent(data: CreateEvent): Promise<Event> {
  return await eventRepo.createEvent(data);
}

// admin can update an event
async function updateEvent(slug: string, data: UpdateEvent): Promise<Event> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) throw new ErrorResponse('Event not found');

  return await eventRepo.updateEvent(data.id, {
    title: data.title,
    coverImage: data.coverImage,
    description: data.description,
    slug: data.slug,
    price: data.price,
    categories: data.categories,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
  });
}

// admin can delete an event
async function deleteEvent(slug: string): Promise<Event> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) throw new ErrorResponse('Event not found');

  return await eventRepo.deleteEvent(event.id);
}

export const eventService = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventBySlug,
  getUpcomingEvents,
  getCompletedEvents,
};
