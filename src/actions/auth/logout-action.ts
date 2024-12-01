'use server';

import { signOut } from '@/auth';
import { revalidatePath } from 'next/cache';

export const logoutAction = async () => {
  await signOut();

  revalidatePath('/', 'layout');
};
