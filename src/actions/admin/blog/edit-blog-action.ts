'use server';

import { z } from 'zod';
import { prisma } from '@/common/lib/prisma';
import { isAuthenicated } from '@/common/lib/auth';
import { blogSchema } from '@/common/schemas/blogSchema';

export const editBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const isAuthenticated = await isAuthenicated();
  if (!isAuthenticated) return { error: 'You must be logged in to update the blog.' };

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
