import mongoose, { Schema, Document, Types } from "mongoose";
import { OnboardingStatus } from "../constants/onboarding-status";
import { ContractorType } from "../constants/contractor-types";

interface PersonalInformation {
  fullName: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
}

interface FinancialInformation {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface IOnboardingApplication extends Document {
  userId: Types.ObjectId;
  contractorType: ContractorType;

  personalInformation: PersonalInformation;

  financialInformation: FinancialInformation;

  signature?: string;

  status: OnboardingStatus;

  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  reviewComments?: string;

  createdAt: Date;
  updatedAt: Date;
}

const OnboardingApplicationSchema =
  new Schema<IOnboardingApplication>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      contractorType: {
        type: String,
        enum: Object.values(ContractorType),
        required: true,
      },

      personalInformation: {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },

        phone: {
          type: String,
          required: true,
          trim: true,
        },

        dateOfBirth: {
          type: Date,
        },

        address: {
          type: String,
          trim: true,
        },
      },

      financialInformation: {
        accountHolderName: {
          type: String,
          required: true,
          trim: true,
        },

        bankName: {
          type: String,
          required: true,
          trim: true,
        },

        accountNumber: {
          type: String,
          required: true,
          select: true,
        },

        ifscCode: {
          type: String,
          required: true,
          uppercase: true,
          trim: true,
          select: true,
        },
      },

      signature: {
        type: String,
      },

      status: {
        type: String,
        enum: Object.values(OnboardingStatus),
        default: OnboardingStatus.PENDING,
      },

      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      reviewedAt: {
        type: Date,
      },

      reviewComments: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const OnboardingApplication =
  mongoose.model<IOnboardingApplication>(
    "OnboardingApplication",
    OnboardingApplicationSchema
  );