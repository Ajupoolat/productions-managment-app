import { CreditCard } from 'lucide-react';
import type {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import type { OnboardingFormValues } from '../schemas/onboarding.schema';
import { FormField } from '../../../shared/components/ui/Form/FormField';
import { Input } from '../../../shared/components/ui/Form/Inputs';
interface FinancialInformationStepProps {
  register: UseFormRegister<OnboardingFormValues>;
  errors: FieldErrors<OnboardingFormValues>;
}

export function FinancialInformationStep({
  register,
  errors,
}: FinancialInformationStepProps) {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 text-primary rounded-lg">
          <CreditCard size={24} />
        </div>

        <h2 className="text-2xl font-bold">
          Financial Details
        </h2>
      </div>

      <FormField
        label="Account Holder Name"
        error={errors.accountHolderName?.message}
      >
        <Input
          {...register('accountHolderName')}
          error={!!errors.accountHolderName}
        />
      </FormField>

      <FormField
        label="Bank Name"
        error={errors.bankName?.message}
      >
        <Input
          {...register('bankName')}
          error={!!errors.bankName}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">

        <FormField
          label="Account Number"
          error={errors.accountNumber?.message}
        >
          <Input
            type="password"
            {...register('accountNumber')}
            error={!!errors.accountNumber}
          />
        </FormField>

        <FormField
          label="IFSC Code"
          error={errors.ifscCode?.message}
        >
          <Input
            {...register('ifscCode')}
            error={!!errors.ifscCode}
            className="uppercase"
            placeholder="HDFC0001234"
          />
        </FormField>

      </div>

    </div>
  );
}