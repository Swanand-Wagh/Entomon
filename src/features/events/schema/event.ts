import { z } from 'zod';
import { EventStatus } from '@prisma/client';
import { emailSchema } from '@/constants/email';

const createEventSchema = z.object({
  title: z.string(),
  slug: z.string(),
  coverImage: z.string(),
  description: z.string(),
  price: z.string(),
  categories: z.tuple([z.string()]).or(z.array(z.string())),
  location: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum(EventStatus),
});

const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  slug: z.string().optional(),
  coverImage: z.string(),
  categories: z.tuple([z.string()]).or(z.array(z.string())),
  description: z.string().optional(),
  price: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
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
