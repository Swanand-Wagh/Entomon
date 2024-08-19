import type { NextAuthConfig } from 'next-auth';

import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/common/schemas';
import { getUserByEmail } from '@/common/data/user';

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
