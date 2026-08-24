import { ArrowLeft } from 'lucide-react';
import { ReviewActions } from './ReviewActions';
import type { OnboardingApplication } from '../../../../shared/types/onboarding.types';
import type { ReviewStatus } from '../../types/admin.types';

interface ApplicationReviewHeaderProps {
  application: OnboardingApplication;
  comments: string;
  selectedRoleId: string;
  isSubmitting: boolean;
  onBack: () => void;
  onReview: (
    status: ReviewStatus,
    comments: string,
    roleId?: string
  ) => void;
}

export function ApplicationReviewHeader({
  application,
  comments,
  selectedRoleId,
  isSubmitting,
  onBack,
  onReview,
}: ApplicationReviewHeaderProps) {
  return (
    <div className="mb-8">

      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Applications
      </button>

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold mb-2">
            Application Review
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              {application.userId?.email}
            </span>

            <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium border border-slate-700">
              {application.contractorType}
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                application.status === 'PENDING'
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : application.status === 'APPROVED'
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-slate-500/20 text-slate-500'
              }`}
            >
              {application.status}
            </span>
          </div>
        </div>

        <ReviewActions
          status={application.status}
          comments={comments}
          selectedRoleId={selectedRoleId}
          isSubmitting={isSubmitting}
          onReview={onReview}
        />

      </div>
    </div>
  );
}