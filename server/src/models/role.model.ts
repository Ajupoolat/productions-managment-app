import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description?: string;
  permissionIds: Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    permissionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Role = mongoose.model<IRole>('Role', RoleSchema);
