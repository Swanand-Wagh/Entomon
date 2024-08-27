'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { signIn } from '@/common/lib/auth';
import { loginSchema } from '@/common/schemas/authSchema';
import { getUserByEmail } from '@/common/data/auth/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/common/lib/routes';

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid Fields!' };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User doesn't exist!" };
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
    return { success: 'Logged in successfully!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        case 'Verification':
          return { error: 'Email not verified!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
