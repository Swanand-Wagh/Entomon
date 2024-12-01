'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/common/lib/prisma';
import { currentRole } from '@/common/lib/auth';
import { blogSchema } from '@/common/schemas/blogSchema';

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const role = await currentRole();
  if (role !== 'ADMIN') return { error: 'Only Admins can create a blog.' };

  const validatedFields = blogSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid data provided!' };

  const { title, slug, coverImage, categories, isPaid, content } = values;

  try {
    await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage,
        categories,
        isPaid,
        content,
      },
    });

    revalidatePath('/admin/blogs');
    return { success: 'Your Blog has been created!' };
  } catch (error) {
    console.error('Error while creating a Blog:', error);
    return { error: 'Something went wrong while creating the blog.' };
  }
};
