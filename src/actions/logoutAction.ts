'use server';

import { signOut } from '@/common/lib/auth';

export const logoutAction = async () => {
  await signOut();
};
