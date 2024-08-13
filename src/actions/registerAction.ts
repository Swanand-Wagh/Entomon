'use server';

import { z } from 'zod';
import { registerSchema } from '@/common/schemas';

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Something went wrong!' };
  }

  return { success: 'Registration Successful!' };
};
