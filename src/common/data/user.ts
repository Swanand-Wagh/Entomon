import { IUser, UserModel } from '@/common/models/user';

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne({ email: email }).exec();
    return user;
  } catch (error) {
    console.error(`Error fetching user by email: ${email}`, error);
    return null;
  }
};

export { getUserByEmail };
