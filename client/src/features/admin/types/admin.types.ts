export type ReviewStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'CHANGES_REQUESTED';

export type OnboardingApplicationStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CHANGES_REQUESTED';

export interface OnboardingApplicationUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface OnboardingApplication {
  _id: string;
  userId: OnboardingApplicationUser;
  contractorType: string;
  createdAt: string;
  status: OnboardingApplicationStatus;  
}