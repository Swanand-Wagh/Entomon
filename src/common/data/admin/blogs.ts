import { prisma } from '@/common/lib/prisma';
import { BlogFormValues } from '@/common/schemas/blogSchema';

const bufferToBase64 = (buffer: Buffer): string => {
  const coverImageBase64 = buffer ? Buffer.from(new Uint8Array(buffer)).toString('base64') : null;
  const cleanImageData = coverImageBase64 ? coverImageBase64.replace(/^dataimage\/[a-zA-Z]+base64/, '') : null;
  return `data:image/jpeg;base64,${cleanImageData}`;
};

export const getAllBlogs = async (): Promise<BlogFormValues[]> => {
  const blogs = await prisma.blog.findMany();

  return blogs.map((blog) => {
    return {
      ...blog,
      coverImage: blog.coverImage ? bufferToBase64(blog.coverImage) : '',
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
      coverImage: blog.coverImage ? bufferToBase64(blog.coverImage) : '',
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
};
