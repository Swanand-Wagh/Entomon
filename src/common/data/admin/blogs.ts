import { Blog } from '@prisma/client';
import { prisma } from '@/common/lib/prisma';
import { BlogFormValues } from '@/common/schemas/blogSchema';

export const getAllBlogs = async (): Promise<Blog[]> => {
  return prisma.blog.findMany();
};

export const getBlogBySlug = async (slug: string): Promise<BlogFormValues | null> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (!blog) return null;
    const coverImageBase64 = blog.coverImage ? blog.coverImage.toString('base64') : '';

    return {
      ...blog,
      coverImage: coverImageBase64,
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
};
