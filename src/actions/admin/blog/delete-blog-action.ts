'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/common/lib/prisma';
import { currentRole } from '@/common/lib/auth';

export const deleteBlogAction = async (slug: string) => {
  const role = await currentRole();
  if (role !== 'ADMIN') return { error: 'Only Admins can delete a blog.' };

  if (!slug || typeof slug !== 'string') return { error: 'Invalid slug provided.' };

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) return { error: 'Blog not found!' };

    await prisma.blog.delete({ where: { slug } });
    revalidatePath('/admin/blogs');
    return { success: 'The blog has been deleted successfully!' };
  } catch (error) {
    console.error('Error while deleting the blog:', error);
    return { error: 'Something went wrong while deleting the blog.' };
  }
};
