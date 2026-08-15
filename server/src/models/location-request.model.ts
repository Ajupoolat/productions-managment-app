import mongoose, { Schema, Document, Types } from 'mongoose';
import { LocationRequestStatus } from '../constants/location-status';

export interface ILocationRequest extends Document {
  productionId: Types.ObjectId;
  locationId: Types.ObjectId;
  requestedBy: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: LocationRequestStatus;
  permitStatus?: string;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LocationRequestSchema = new Schema<ILocationRequest>(
  {
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(LocationRequestStatus),
      default: LocationRequestStatus.REQUESTED,
    },
    permitStatus: {
      type: String,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const LocationRequest = mongoose.model<ILocationRequest>(
  'LocationRequest',
  LocationRequestSchema
);
