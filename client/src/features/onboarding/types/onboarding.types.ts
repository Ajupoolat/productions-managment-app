// Onboarding feature types

export type ContractorType =
  | 'FREELANCER'
  | 'CAST'
  | 'SUPPLIER'
  | 'CAST_CREW_AGENT'
  | 'TCS_TEAM'
  | 'INTERN';

export const CONTRACTOR_TYPES: ContractorType[] = [
  'FREELANCER',
  'CAST',
  'SUPPLIER',
  'CAST_CREW_AGENT',
  'TCS_TEAM',
  'INTERN',
];

export interface PersonalInformation {
  fullName: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
}

export interface FinancialInformation {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface OnboardingApplicationPayload {
  contractorType: ContractorType;
  personalInformation: PersonalInformation;
  financialInformation: FinancialInformation;
  signature?: string;
}

export interface OnboardingApplication extends OnboardingApplicationPayload {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    status: string;
  };
  status: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComments?: string;
  createdAt: string;
  updatedAt: string;
}
