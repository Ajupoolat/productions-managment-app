import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWork extends Document {
  productionId: Types.ObjectId;
  departmentId: Types.ObjectId;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkSchema = new Schema<IWork>(
  {
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Work = mongoose.model<IWork>('Work', WorkSchema);
