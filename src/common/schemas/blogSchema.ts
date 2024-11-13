import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  slug: z.string().min(1, {
    message: 'Slug is required.',
  }),
  coverImage: z.unknown().refine((value) => value !== null, {
    message: 'Cover Image is required.',
  }),
  categories: z.array(z.string()).nonempty({ message: 'At least one category is required.' }),
  content: z.any(),
});

export { blogSchema };
