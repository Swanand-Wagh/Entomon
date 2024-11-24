import { prisma } from '@/common/lib/prisma';
import { BlogFormValues } from '@/common/schemas/blogSchema';

const bufferToBase64 = (buffer: Buffer): string => {
  const coverImageBase64 = buffer ? Buffer.from(new Uint8Array(buffer)).toString('base64') : null;
  const cleanImageData = coverImageBase64 ? coverImageBase64.replace(/^dataimage\/[a-zA-Z]+base64/, '') : null;
  return `data:image/jpeg;base64,${cleanImageData}`;
};

export const getAllBlogs = async (
  fields?: Record<string, boolean>
): Promise<Omit<BlogFormValues, 'coverImage'>[] | BlogFormValues[]> => {
  const needsCoverImage = fields?.coverImage ?? true;

  const selectFields = fields ?? {
    title: true,
    slug: true,
    coverImage: true,
    categories: true,
    isPaid: true,
    content: true,
    createdAt: true,
    updatedAt: true,
  };

  const blogs = await prisma.blog.findMany({
    select: needsCoverImage ? { ...selectFields } : { ...selectFields, coverImage: false },
  });

  return blogs.map((blog) => {
    if (!needsCoverImage) {
      const { coverImage, ...rest } = blog;
      return rest as Omit<BlogFormValues, 'coverImage'>;
    }

    return {
      ...blog,
      coverImage: blog.coverImage ? bufferToBase64(blog.coverImage) : '',
    } as BlogFormValues;
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
