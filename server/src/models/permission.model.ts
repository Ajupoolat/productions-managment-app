import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
  key: string;
  description?: string;
  module: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    module: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);
