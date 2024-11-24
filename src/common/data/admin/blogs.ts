import { prisma } from '@/common/lib/prisma';
import { BlogFormValues } from '@/common/schemas/blogSchema';

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
  };

  const blogs = await prisma.blog.findMany({
    select: needsCoverImage ? { ...selectFields } : { ...selectFields, coverImage: false },
  });

  return blogs.map((blog) => {
    if (!needsCoverImage) {
      const { coverImage, ...rest } = blog;
      return rest as Omit<BlogFormValues, 'coverImage'>;
    }

    const coverImageBase64 = blog.coverImage ? Buffer.from(new Uint8Array(blog.coverImage)).toString('base64') : null;

    const cleanImageData = coverImageBase64 ? coverImageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null;

    return {
      ...blog,
      coverImage: coverImageBase64 ? `data:image/jpeg;base64,${cleanImageData}` : null,
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
