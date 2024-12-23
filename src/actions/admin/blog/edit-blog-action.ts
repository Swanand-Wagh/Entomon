'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/common/lib/prisma';
import { currentRole } from '@/common/lib/auth';
import { blogSchema } from '@/common/schemas/blogSchema';

export const editBlogAction = async (values: z.infer<typeof blogSchema>, currentSlug: string) => {
  const role = await currentRole();
  if (role !== 'ADMIN') return { error: 'Only Admins can update a blog.' };

  const validatedFields = blogSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid data provided!' };

  const { title, slug, coverImage, categories, isPaid, content } = values;

  try {
    await prisma.blog.update({
      where: {
        slug: currentSlug,
      },
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
    return { success: 'Your Blog has been updated!' };
  } catch (error) {
    console.error('Error while updating the Blog:', error);
    return { error: 'Something went wrong while updating the blog.' };
  }
};
