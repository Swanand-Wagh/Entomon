'use server';

import { actionClient, authActionClient } from '@/lib/action-clients';
import { eventService } from './service';
import { z } from 'zod';
import { createEventSchema, updateEventSchema } from '../schema/event';

export const getEvents = actionClient.action(async () => {
  return await eventService.getEvents();
});

export const getEventById = actionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventById(data.parsedInput.id);
  });

export const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    return await eventService.createEvent(data.parsedInput);
  });

export const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    return await eventService.updateEvent(data.parsedInput.id, data.parsedInput);
  });

export const deleteEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.deleteEvent(data.parsedInput.id);
  });
