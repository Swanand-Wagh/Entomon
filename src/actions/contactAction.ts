'use server';

import { z } from 'zod';
import { prisma } from '@/common/lib/prisma';
import { contactSchema } from '@/common/schemas/contactSchema';

export const contactAction = async (values: z.infer<typeof contactSchema>) => {
  const validatedFields = contactSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Something went wrong!' };

  const { name, email, message, phone } = validatedFields.data;

  try {
    return { success: 'Your Email has been sent!' };
  } catch (error) {
    console.error('Error while using contact form:', error);
    return { error: 'Something went wrong!' };
  }
};
