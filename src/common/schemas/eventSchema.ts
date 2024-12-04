import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string().nullable(),
  description: z.string().min(1),
  price: z.string().min(1),
  location: z.string().min(1),
  date: z.date(),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { eventSchema };
