import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import * as adminService from '../services/admin.service';
import type { OnboardingApplication } from '../../../shared/types/onboarding.types';

export function useOnboardingApplications(paramsObject?: any) {
  const [applications, setApplications] = useState<
    OnboardingApplication[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);

  const fetchApplications = useCallback(async (params?: any) => {
    setIsLoading(true);

    try {
      const { applications: data, meta: metaData } = await adminService.getAllApplications(params);

      setApplications(data);
      setMeta(metaData);
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
    fetchApplications(paramsObject);
  }, [fetchApplications, paramsObject]);

  return {
    applications,
    isLoading,
    meta,
    refetchApplications: fetchApplications,
  };
}   