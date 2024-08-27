import { User } from '@prisma/client';
import { prisma } from '@/common/lib/prisma';

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user by email: ${email}`, error);
    return null;
  }
};

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user by ID: ${id}`, error);
    return null;
  }
};

export { getUserByEmail, getUserById };
