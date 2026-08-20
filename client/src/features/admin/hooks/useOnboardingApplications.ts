import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import * as adminService from '../services/admin.service';
import type { OnboardingApplication } from '../types/admin.types';

export function useOnboardingApplications() {
  const [applications, setApplications] = useState<
    OnboardingApplication[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await adminService.getAllApplications();

      setApplications(data);
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(
        message || 'Failed to load applications'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    isLoading,
    refetchApplications: fetchApplications,
  };
}   