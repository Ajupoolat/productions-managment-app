import mongoose, { Schema, Document, Types } from 'mongoose';
import { ContractorType } from '../constants/contractor-types';
import { UserStatus } from '../constants/user-status';
export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  contractorType: ContractorType;
  roleId?: Types.ObjectId;
  status: UserStatus;
  isActive: boolean;
  refreshTokenHash?: string|null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshTokenHash: {
      type: String,
    },
    contractorType: {
      type: String,
      enum:Object.values(ContractorType),
      required: false,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Prevent passwords from being returned in JSON responses by default
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

export const User = mongoose.model<IUser>('User', UserSchema);
