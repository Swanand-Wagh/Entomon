'use server';

import { z } from 'zod';
import { prisma } from '@/common/lib/prisma';
import { blogSchema } from '@/common/schemas/blogSchema';
import fs from 'fs';
import path from 'path';
import { isAuthenicated } from '@/common/lib/auth';

// Utility function to save the image to the public folder
const saveImageToPublic = async (file: Buffer, fileName: string) => {
  const publicFolderPath = path.join(process.cwd(), 'public', 'images');
  const filePath = path.join(publicFolderPath, fileName);

  if (!fs.existsSync(publicFolderPath)) {
    fs.mkdirSync(publicFolderPath, { recursive: true });
  }
  fs.writeFileSync(filePath, new Uint8Array(file));

  return `/images/${fileName}`;
};

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const isAuthenticated = await isAuthenicated();
  if (!isAuthenticated) return { error: 'You must be logged in to create a blog.' };

  const validatedFields = blogSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid data provided!' };

  const { title, slug, coverImage, categories, isPaid, content } = values;

  try {
    let coverImageUrl: string = '';

    if (Buffer.isBuffer(coverImage)) {
      const fileName = `${slug}-${Date.now()}.png`;

      coverImageUrl = await saveImageToPublic(coverImage, fileName);
    } else if (typeof coverImage === 'string') {
      coverImageUrl = coverImage;
    } else {
      return { error: 'Invalid cover image format.' };
    }

    await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage: coverImageUrl,
        categories,
        isPaid,
        content,
      },
    });

    return { success: 'Your Blog has been created!' };
  } catch (error) {
    console.error('Error while creating a Blog:', error);
    return { error: 'Something went wrong while creating the blog.' };
  }
};
