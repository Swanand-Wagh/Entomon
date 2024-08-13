'use server';

import { z } from 'zod';
import { loginSchema } from '@/common/schemas';

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Credentials!' };
  }

  return { success: 'Logged in successfully!' };
};
