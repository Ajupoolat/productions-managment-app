import mongoose, { Schema, Document, Types } from 'mongoose';
import { CastCrewAssignmentStatus } from '../constants/cast-crew-assigment-status';

export interface ICastAssignment extends Document {
  productionId: Types.ObjectId;
  userId: Types.ObjectId;
  characterId: Types.ObjectId;
  status: CastCrewAssignmentStatus;
  assignedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CastAssignmentSchema = new Schema<ICastAssignment>(
  {
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    characterId: {
      type: Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CastCrewAssignmentStatus),
      default: CastCrewAssignmentStatus.ACTIVE,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const CastAssignment = mongoose.model<ICastAssignment>('CastAssignment', CastAssignmentSchema);
