import { User, IUser } from '../models/user.model';
import { RegisterInput } from '../dto/auth/auth.dto';
import { Types } from 'mongoose';

export const findById = async (userId: string | Types.ObjectId): Promise<IUser | null> => {
  return User.findById(userId);
};

export const findByEmail = async (email: string, selectPassword = false): Promise<IUser | null> => {
  console.log('the request reach in user repository',email)
  const query = User.findOne({ email }).populate({
    path: 'roleId',
    populate: { path: 'permissionIds' }
  });
  if (selectPassword) {
    query.select('+password');
  }
  return query.exec();
};

export const create = async (userData: RegisterInput): Promise<IUser> => {
  return User.create(userData);
};

export const updateRefreshTokenHash = async (userId: string | Types.ObjectId, refreshTokenHash: string | null): Promise<void> => {
  await User.findByIdAndUpdate(userId, { refreshTokenHash });
};

export const update = async (userId: string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> => {
  return User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true });
};

export const findByRoleId = async(roleId:string|Types.ObjectId)=>{
  return await User.find({roleId,isActive:true}).select('_id fullName email contractorType').populate('roleId', 'name').sort({fullName:1});
};
