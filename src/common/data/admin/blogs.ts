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
    const coverImageBase64 = blog.coverImage ? Buffer.from(new Uint8Array(blog.coverImage)).toString('base64') : '';
    // Remove the "data:image/jpeg;base64," part
    const cleanImageData = coverImageBase64.replace(/^dataimage\/[a-zA-Z]+base64/, '');

    return {
      ...blog,
      coverImage: `data:image/jpeg;base64,${cleanImageData}`,
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
};
