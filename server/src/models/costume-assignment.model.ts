import mongoose, { Schema, Document, Types } from 'mongoose';
import { CostumeAssignmentStatus } from '../constants/costume-status';
export interface ICostumeAssignment extends Document {
  costumeId: Types.ObjectId;
  productionId: Types.ObjectId;
  castUserId: Types.ObjectId;
  characterId: Types.ObjectId;
  assignedAt?: Date;
  returnDate?: Date;
  conditionBefore?: string;
  conditionAfter?: string;
  status: CostumeAssignmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const CostumeAssignmentSchema = new Schema<ICostumeAssignment>(
  {
    costumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Costume',
      required: true,
    },
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    castUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    characterId: {
      type: Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    conditionBefore: {
      type: String,
    },
    conditionAfter: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(CostumeAssignmentStatus),
      default: CostumeAssignmentStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const CostumeAssignment = mongoose.model<ICostumeAssignment>(
  'CostumeAssignment',
  CostumeAssignmentSchema
);
