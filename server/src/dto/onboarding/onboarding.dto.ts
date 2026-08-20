import { z } from 'zod';
import { ContractorType } from '../../constants/contractor-types';

/**
 * Onboarding Application Schema
 */
export const onboardingApplicationSchema = z.object({
  contractorType: z.nativeEnum(ContractorType, {
    error: 'Please select a valid contractor type',
  }),

  personalInformation: z.object({
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

    dateOfBirth: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;

          const date = new Date(value);

          return !Number.isNaN(date.getTime());
        },
        'Please enter a valid date of birth'
      )
      .transform((value) =>
        value ? new Date(value) : undefined
      ),

 address: z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .pipe(
    z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .max(500, 'Address cannot exceed 500 characters')
      .optional()
  ),
}),

  financialInformation: z.object({
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
      .min(
        2,
        'Bank name must be at least 2 characters'
      )
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
  }),

  signature: z
    .string()
    .trim()
    .min(
      2,
      'Signature must be at least 2 characters'
    )
    .max(
      100,
      'Signature cannot exceed 100 characters'
    ),

  documentsMetadata: z
    .array(
      z.object({
        type: z.enum(
          [
            'AADHAAR',
            'PASSPORT',
            'DRIVING_LICENSE',
            'OTHER',
          ],
          {
            error: 'Please select a valid document type',
          }
        ),

        fileName: z
          .string()
          .trim()
          .min(1, 'File name is required'),
      })
    )
    .min(
      1,
      'At least one document is required'
    )
    .max(
      2,
      'Maximum 2 documents can be uploaded'
    )
    .optional(),
});

/**
 * Admin Onboarding Review Schema
 */
export const onboardingReviewSchema = z.object({
  status: z.enum(
    [
      'APPROVED',
      'REJECTED',
      'CHANGES_REQUESTED',
    ],
    {
      error: 'Please select a valid review status',
    }
  ),

  reviewComments: z
    .string()
    .trim()
    .max(
      1000,
      'Review comments cannot exceed 1000 characters'
    )
    .optional(),
    
  roleId: z.string().optional(),
});

/**
 * Types
 */
export type OnboardingApplicationInput =
  z.infer<typeof onboardingApplicationSchema>;

export type OnboardingReviewInput =
  z.infer<typeof onboardingReviewSchema>;