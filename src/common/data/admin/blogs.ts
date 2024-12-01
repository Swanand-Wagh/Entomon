import { prisma } from '@/common/lib/prisma';
import { BlogFormValues } from '@/common/schemas/blogSchema';

export const getAllBlogs = async (): Promise<BlogFormValues[]> => {
  const blogs = await prisma.blog.findMany();

  return blogs.map((blog) => {
    return {
      ...blog,
      coverImage: blog.coverImage,
    };
  });
};

export const getBlogBySlug = async (slug: string): Promise<BlogFormValues | null> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (!blog) return null;

    return {
      ...blog,
      coverImage: blog.coverImage,
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
};
