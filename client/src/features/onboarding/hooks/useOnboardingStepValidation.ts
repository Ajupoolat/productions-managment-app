import { toast } from 'sonner';
import type { UseFormTrigger } from 'react-hook-form';
import type { OnboardingFormValues } from '../schemas/onboarding.schema';

interface UseOnboardingStepValidationProps {
  trigger: UseFormTrigger<OnboardingFormValues>;
  validateDocuments: () => boolean;
}

export function useOnboardingStepValidation({
  trigger,
  validateDocuments,
}: UseOnboardingStepValidationProps) {
  const validateStep = async (
    step: number
  ): Promise<boolean> => {
    if (step === 1) {
      return trigger(['contractorType']);
    }

    if (step === 2) {
      return trigger([
        'fullName',
        'phone',
        'address',
      ]);
    }

    if (step === 3) {
      return trigger([
        'accountHolderName',
        'bankName',
        'accountNumber',
        'ifscCode',
      ]);
    }

    if (step === 4) {
      return validateDocuments();
    }

    return true;
  };

  return {
    validateStep,
  };
}