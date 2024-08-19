import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { getMongoDbClient } from './db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(getMongoDbClient()!),
  session: { strategy: 'jwt' },
  ...authConfig,
});
