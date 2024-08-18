import NextAuth from 'next-auth';

import client from './db';
import authConfig from './auth.config';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
});
