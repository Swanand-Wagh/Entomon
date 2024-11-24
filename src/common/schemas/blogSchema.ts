import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string().nullable(),
  categories: z.tuple([z.string()]).or(z.array(z.string())), // Allow one or more categories
  isPaid: z.boolean(),
  content: z.string().min(1),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export { blogSchema };
export type { BlogFormValues };
