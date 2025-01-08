import { emailSchema } from '@/constants/email';
import { EventStatus } from '@prisma/client';
import { z } from 'zod';

const createEventSchema = z.object({
  title: z.string(),
  slug: z.string(),
  coverImage: z.string().nullable().optional(),
  description: z.string(),
  price: z.string(),
  location: z.string(),
  date: z.date(),
  status: z.nativeEnum(EventStatus),
});

const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  slug: z.string().optional(),
  coverImage: z.string().nullable().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  location: z.string().optional(),
  date: z.date().optional(),
  status: z.nativeEnum(EventStatus).optional(),
});

const phoneRegex = /^(\+?[1-9]\d{0,2}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

const eventRegistrationSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(20, { message: 'Name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Name can only contain alphabets.',
    }),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: 'Invalid phone number.',
  }),
});

type CreateEvent = z.infer<typeof createEventSchema>;
type UpdateEvent = z.infer<typeof updateEventSchema>;

export { createEventSchema, updateEventSchema, eventRegistrationSchema };
export type { CreateEvent, UpdateEvent };
