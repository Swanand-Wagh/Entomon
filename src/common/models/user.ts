import { Schema, model, models, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: 'string', required: true, trim: true },
    lastName: { type: 'string', required: true, trim: true },
    email: { type: 'string', required: true, unique: true, trim: true, lowercase: true },
    password: { type: 'string', required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = models?.User || model<IUser>('User', UserSchema);
export { UserModel, type IUser };
