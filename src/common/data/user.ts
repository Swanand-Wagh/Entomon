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

const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findById(id).exec();
    return user;
  } catch (error) {
    console.error(`Error fetching user by ID: ${id}`, error);
    return null;
  }
};

export { getUserByEmail, getUserById };
