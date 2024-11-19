import { Blog } from '@prisma/client';
import { prisma } from '@/common/lib/prisma';

export const getAllBlogs = async (): Promise<Blog[]> => {
  return prisma.blog.findMany();
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    return prisma.blog.findUnique({
      where: {
        slug,
      },
    });
  } catch {
    return null;
  }
};
