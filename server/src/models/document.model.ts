import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDocument extends Document {
  onboardingId: Types.ObjectId;
  type: string;
  url: string;
  fileName: string;
  uploadedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    onboardingId: {
      type: Schema.Types.ObjectId,
      ref: 'OnboardingApplication',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const AppDocument = mongoose.model<IDocument>('Document', DocumentSchema);
