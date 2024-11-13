import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  slug: z.string().min(1, {
    message: 'Slug is required.',
  }),
  content: z.any(),
});

export { blogSchema };
