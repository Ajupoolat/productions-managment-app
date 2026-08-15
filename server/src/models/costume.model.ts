import mongoose, { Schema, Document } from 'mongoose';
import { CostumeStatus } from '../constants/costume-status';

export interface ICostume extends Document {
  name: string;
  category: string;
  size?: string;
  quantity: number;
  condition?: string;
  storageLocation?: string;
  cost?: number;
  status: CostumeStatus;
  createdAt: Date;
  updatedAt: Date;
}

const CostumeSchema = new Schema<ICostume>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    condition: {
      type: String,
    },
    storageLocation: {
      type: String,
    },
    cost: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(CostumeStatus),
      default: CostumeStatus.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

export const Costume = mongoose.model<ICostume>('Costume', CostumeSchema);
