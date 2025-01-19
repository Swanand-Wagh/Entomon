'use server';

import { z } from 'zod';
import { eventService } from './service';
import { revalidatePath } from 'next/cache';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, eventRegistrationSchema, getEventByStatusSchema, updateEventSchema } from '../schema/event';

export const getEvents = actionClient.action(async () => {
  return await eventService.getEvents();
});

export const getEventsByStatus = actionClient.schema(getEventByStatusSchema).action(async (data) => {
  return await eventService.getEventsByStatus(data.parsedInput);
});

export const getEventBySlug = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventBySlug(data.parsedInput.slug);
  });

export const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    await eventService.createEvent(data.parsedInput);
    return { success: 'Event created successfully' };
  });

export const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    await eventService.updateEvent(data.parsedInput);
    return { success: 'Event updated successfully' };
  });

export const deleteEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.deleteEvent(data.parsedInput.slug);
    revalidatePath('/admin/events');
    return { success: 'Event deleted successfully' };
  });

export const registerUserForEvent = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(eventRegistrationSchema)
  .action(async (data) => {
    await eventService.registerUserForEvent(data.ctx.session.user.id, data.parsedInput);
    return { success: 'User registered successfully' };
  });

export const unregisterUserForEvent = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.deleteEventRegistration(data.parsedInput.slug, data.ctx.session.user.id);
    return { success: 'User unregistered successfully' };
  });

export const getEventRegistrationsByEventId = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventRegistrationsByEventId(data.parsedInput.slug);
  });
