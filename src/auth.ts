import NextAuth from 'next-auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/common/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { getUserById, getTwoFactorConfirmationByUserId, getAccountByUserId } from '@/common/data/auth';

declare module 'next-auth' {
  interface User {
    role?: UserRole;
    isTwoFactorEnabled?: Boolean;
    isOAuth?: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type !== 'credentials') return true;

      const id = user.id as string;
      const existingUser = await getUserById(id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
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
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactor = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET as string,
  ...authConfig,
});
