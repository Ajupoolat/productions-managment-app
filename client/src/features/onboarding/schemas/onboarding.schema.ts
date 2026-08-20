import { z } from 'zod';
import { CONTRACTOR_TYPES } from '../types/onboarding.types';

export const onboardingSchema = z.object({
  contractorType: z.enum(CONTRACTOR_TYPES, {
    error: 'Please select a valid contractor type',
  }),

  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9\s-]{7,15}$/,
      'Please enter a valid phone number (e.g., +91 9876543210)'
    ),

  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  accountHolderName: z
    .string()
    .trim()
    .min(
      2,
      'Account holder name must be at least 2 characters'
    )
    .max(
      100,
      'Account holder name cannot exceed 100 characters'
    ),

  bankName: z
    .string()
    .trim()
    .min(2, 'Bank name must be at least 2 characters')
    .max(
      100,
      'Bank name cannot exceed 100 characters'
    ),

  accountNumber: z
    .string()
    .trim()
    .regex(
      /^\d{8,18}$/,
      'Account number must contain 8 to 18 digits'
    ),

  ifscCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      'Please enter a valid IFSC code (e.g., HDFC0001234)'
    ),

  signature: z
    .string()
    .trim()
    .min(2, 'Signature must be at least 2 characters')
    .max(
      100,
      'Signature cannot exceed 100 characters'
    ),
});

export type OnboardingFormValues =
  z.infer<typeof onboardingSchema>;