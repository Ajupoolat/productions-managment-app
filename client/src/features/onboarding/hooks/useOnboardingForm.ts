import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import * as onboardingService from '../services/onboarding.service';
import { useAppStore } from '../../../store/app.store';
import { onboardingSchema, type OnboardingFormValues } from '../schemas/onboarding.schema';

interface UseOnboardingFormOptions {
  onSuccess: () => void;
}

export function useOnboardingForm({
  onSuccess,
}: UseOnboardingFormOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = useAppStore(
    (state) => state.checkAuth
  );
  
  const onboardingApplication = useAppStore(
    (state) => state.onboardingApplication
  );

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched',
    defaultValues: onboardingApplication ? {
      contractorType: onboardingApplication.contractorType as any,
      fullName: onboardingApplication.personalInformation?.fullName || '',
      phone: onboardingApplication.personalInformation?.phone || '',
      address: onboardingApplication.personalInformation?.address || '',
      accountHolderName: onboardingApplication.financialInformation?.accountHolderName || '',
      bankName: onboardingApplication.financialInformation?.bankName || '',
      accountNumber: onboardingApplication.financialInformation?.accountNumber || '',
      ifscCode: onboardingApplication.financialInformation?.ifscCode || '',
      signature: onboardingApplication.signature || '',
    } : undefined,
  });

  const onSubmit = async (data: OnboardingFormValues, files: File[], documentsMetadata: { type: string, fileName: string }[]) => {
    setIsLoading(true);

    try {
      const payload = {
        contractorType: data.contractorType,
        personalInformation: {
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
        },
        financialInformation: {
          accountHolderName: data.accountHolderName,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode,
        },
        signature: data.signature,
        documentsMetadata,
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));
      
      files.forEach((file) => {
        formData.append('documents', file);
      });

      // Pass the formData object, which axios handles correctly with multipart/form-data headers
      await onboardingService.submitApplication(formData);

      toast.success(
        'Application submitted successfully!'
      );

      await checkAuth();

      onSuccess();
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.response?.data?.errors
        : undefined;

      toast.error(
        typeof message === 'string' ? message : 'Failed to submit application. Please check the form fields.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    isLoading,
    onSubmit,
  };
}