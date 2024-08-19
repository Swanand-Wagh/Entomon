'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/common/models/user';
import { registerSchema } from '@/common/schemas';
import { getUserByEmail } from '@/common/data/user';

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Something went wrong!' };

  const { firstName, lastName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: 'Email already in use!' };

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return { success: 'Registration Successful!' };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
};
