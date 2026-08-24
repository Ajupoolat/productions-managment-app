import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { OnboardingApplication } from '../../../shared/types/onboarding.types';
import * as adminService from '../services/admin.service';

export function useApplicationReview(id?: string) {
  const navigate = useNavigate();

  const [application, setApplication] = useState<OnboardingApplication>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplication = useCallback(async () => {
    if (!id) {
      navigate('/admin/onboarding');
      return;
    }

    setIsLoading(true);

    try {
      const data = await adminService.getApplicationById(id);

      setApplication(data);
    } catch {
      toast.error('Failed to load application details');
      navigate('/admin/onboarding');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return {
    application,
    isLoading,
    refetchApplication: fetchApplication,
  };
}