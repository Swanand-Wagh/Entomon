import { z } from 'zod';

const courseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string().nullable(),
  description: z.string().min(1),
  price: z.string().min(1),
  location: z.string().min(1),
  date: z.date(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const chapterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  courseId: z.string().min(1),
  order: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { courseSchema, chapterSchema };
