import NextAuth from 'next-auth';
import { prisma } from './prisma';

import authConfig from './auth.config';
import { getUserById } from '../data/auth/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getAccountByUserId } from '../data/auth/account';
import { getTwoFactorConfirmationByUserId } from '../data/auth/two-factor-confirmation';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
        session.user.role = token.role;
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
  ...authConfig,
});
