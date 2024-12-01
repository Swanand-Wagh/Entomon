import type { NextAuthConfig } from 'next-auth';

import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from '@/common/data/auth';
import { loginSchema } from '@/common/schemas/authSchema';

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
