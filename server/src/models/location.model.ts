import mongoose, { Schema, Document, Types } from 'mongoose';
import { LocationStatus } from '../constants/location-status';
export interface ILocation extends Document {
  name: string;
  address: string;
  coordinates?: string;
  contactName?: string;
  contactNumber?: string;
  rentalCost?: number;
  availability?: string;
  permitInformation?: string;
  status: LocationStatus;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    coordinates: {
      type: String,
    },

    contactName: {
      type: String,
      trim: true,
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    rentalCost: {
      type: Number,
      min: 0,
    },

    availability: {
      type: String,
    },

    permitInformation: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(LocationStatus),
      default: LocationStatus.ACTIVE,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Location = mongoose.model<ILocation>(
  "Location",
  LocationSchema
);