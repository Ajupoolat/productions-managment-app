import { User, IUser } from '../models/user.model';
import { RegisterInput } from '../dto/auth/auth.dto';
import { Types } from 'mongoose';

export const findById = async (userId: string | Types.ObjectId): Promise<IUser | null> => {
  return User.findById(userId);
};

export const findByEmail = async (email: string, selectPassword = false): Promise<IUser | null> => {
  const query = User.findOne({ email });
  if (selectPassword) {
    query.select('+password');
  }
  return query.exec();
};

export const create = async (userData: RegisterInput): Promise<IUser> => {
  return User.create(userData);
};

export const updateRefreshToken = async (userId: string | Types.ObjectId, refreshToken: string | null): Promise<void> => {
  await User.findByIdAndUpdate(userId, { refreshToken });
};
