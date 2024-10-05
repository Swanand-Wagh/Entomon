'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/common/lib/prisma';
import { getUserByEmail } from '@/common/data/auth';
import { registerSchema } from '@/common/schemas/authSchema';

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Something went wrong!' };

  const { firstName, lastName, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: 'Email already in use!' };

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
      },
    });

    return { success: 'Registration Successful!' };
  } catch (error) {
    console.error('Error during user registration:', error);
    return { error: 'Something went wrong!' };
  }
};