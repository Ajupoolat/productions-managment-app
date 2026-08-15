import mongoose, { Schema, Document, Types } from 'mongoose';
import { FundStatus } from '../constants/fund-status';

export interface IFundRequest extends Document {
  productionId: Types.ObjectId;
  requestedBy: Types.ObjectId;
  category: string;
  requestedAmount: number;
  approvedAmount?: number;
  reason: string;
  requiredDate?: Date;
  status: FundStatus;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FundRequestSchema = new Schema<IFundRequest>(
  {
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    approvedAmount: {
      type: Number,
    },
    reason: {
      type: String,
      required: true,
    },
    requiredDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(FundStatus),
      default: FundStatus.SUBMITTED,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const FundRequest = mongoose.model<IFundRequest>('FundRequest', FundRequestSchema);
