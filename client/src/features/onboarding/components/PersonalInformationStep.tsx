import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { OnboardingFormValues } from '../schemas/onboarding.schema';
import { FormField } from '../../../shared/components/ui/Form/FormField';
import { Input } from '../../../shared/components/ui/Form/Inputs';
import { Textarea } from '../../../shared/components/ui/Form/Textarea';

interface PersonalInformationStepProps {
  register: UseFormRegister<OnboardingFormValues>;
  errors: FieldErrors<OnboardingFormValues>;
}

export function PersonalInformationStep({
  register,
  errors,
}: PersonalInformationStepProps) {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 text-primary rounded-lg">
          {/* User icon */}
        </div>

        <h2 className="text-2xl font-bold">
          Your Information
        </h2>
      </div>

      <FormField 
        label="Full Name" 
        error={errors.fullName?.message}
      >
        <Input
          {...register('fullName')}
          error={!!errors.fullName}
          placeholder="John Doe"
        />
      </FormField>

      <FormField 
        label="Phone Number" 
        error={errors.phone?.message}
      >
        <Input
          {...register('phone')}
          error={!!errors.phone}
          placeholder="+91 9876543210"
        />
      </FormField>

      <FormField 
        label="Address" 
        error={errors.address?.message}
      >
        <Textarea
          {...register('address')}
          error={!!errors.address}
          placeholder="Your full address..."
        />
      </FormField>

    </div>
  );
}