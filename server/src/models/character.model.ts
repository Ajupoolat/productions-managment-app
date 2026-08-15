import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICharacter extends Document {
  productionId: Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Production',
      required: true,
    },
    name: {
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

export const Character = mongoose.model<ICharacter>('Character', CharacterSchema);
