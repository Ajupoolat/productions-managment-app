import { useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import * as adminService from '../services/admin.service';
import type { ReviewStatus } from '../types/admin.types';



interface UseApplicationReviewActionsProps {
  applicationId?: string;
  onSuccess?: () => void | Promise<void>;
}

export function useApplicationReviewActions({
  applicationId,
  onSuccess,
}: UseApplicationReviewActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReview = async (
    status: ReviewStatus,
    comments: string,
    roleId?: string
  ) => {
    if (!applicationId) {
      toast.error('Application ID is missing');
      return;
    }

    setIsSubmitting(true);

    try {
      await adminService.reviewApplication(
        applicationId,
        status,
        comments,
        roleId
      );

      toast.success(
        `Application ${status
          .toLowerCase()
          .replace('_', ' ')} successfully`
      );

      await onSuccess?.();
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(
        message || 'Failed to review application'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleReview,
  };
}