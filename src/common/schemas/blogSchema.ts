import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  slug: z.string().min(1, {
    message: 'Slug is required.',
  }),
  coverImage: z.string(),
  categories: z.array(z.string()).nonempty({ message: 'At least one category is required.' }),
  isPaid: z.boolean(),
  content: z.string(),
});

export { blogSchema };
