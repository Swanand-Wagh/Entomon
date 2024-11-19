'use server';

import { z } from 'zod';
import { prisma } from '@/common/lib/prisma';
import { blogSchema } from '@/common/schemas/blogSchema';

export const editBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const validatedFields = blogSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid data provided!' };

  const { title, slug, coverImage, categories, isPaid, content } = values;

  try {
    return { success: 'Your Blog has been updated!' };
  } catch (error) {
    console.error('Error while updating the Blog:', error);
    return { error: 'Something went wrong while updating the blog.' };
  }
};
