import mongoose, { Schema, Document, Types } from 'mongoose';
import { ProductionStatus } from '../constants/production-status';

export interface IProduction extends Document {
  name: string;
  description?: string;
  status: ProductionStatus;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  productionManagerId?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductionSchema = new Schema<IProduction>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(ProductionStatus),
      default: ProductionStatus.DEVELOPMENT,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    budget: {
      type: Number,
    },
    productionManagerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Production = mongoose.model<IProduction>('Production', ProductionSchema);
