import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  userId?: Types.ObjectId;
  action: string;
  module: string;
  resourceType: string;
  resourceId?: Types.ObjectId;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      // No strict ref here because it can refer to different collections (dynamic ref)
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
