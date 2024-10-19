import { User } from '@prisma/client';
import { prisma } from '@/common/lib/prisma';

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};
