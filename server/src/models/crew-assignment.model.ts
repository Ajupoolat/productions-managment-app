import mongoose, { Schema, Document, Types } from 'mongoose';
import { CastCrewAssignmentStatus } from '../constants/cast-crew-assigment-status';

export interface ICrewAssignment extends Document {
  productionId: Types.ObjectId;
  userId: Types.ObjectId;
  department: string;
  position: string;
  status: CastCrewAssignmentStatus;
  assignedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CrewAssignmentSchema = new Schema<ICrewAssignment>(
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
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
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

export const CrewAssignment = mongoose.model<ICrewAssignment>('CrewAssignment', CrewAssignmentSchema);
