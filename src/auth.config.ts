import type { NextAuthConfig } from 'next-auth';

import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { UserRole } from '@prisma/client';
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
  callbacks: {
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactor;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
