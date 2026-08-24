import {
  AlertCircle,
  Check,
  X,
} from 'lucide-react';

type ReviewStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'CHANGES_REQUESTED';

interface ReviewActionsProps {
  status: string;
  comments: string;
  selectedRoleId: string;
  isSubmitting: boolean;
  onReview: (
    status: ReviewStatus,
    comments: string,
    roleId?: string
  ) => void;
}

export function ReviewActions({
  status,
  comments,
  selectedRoleId,
  isSubmitting,
  onReview,
}: ReviewActionsProps) {

  if (
    status !== 'PENDING' &&
    status !== 'APPROVED'
  ) {
    return null;
  }

  return (
    <div className="flex gap-3">

      <button
        onClick={() =>
          onReview(
            'CHANGES_REQUESTED',
            comments
          )
        }
        disabled={isSubmitting}
        className="px-4 py-2 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 rounded-lg font-medium flex items-center gap-2 transition-colors"
      >
        <AlertCircle size={18} />
        Request Changes
      </button>

      <button
        onClick={() =>
          onReview(
            'REJECTED',
            comments
          )
        }
        disabled={isSubmitting}
        className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg font-medium flex items-center gap-2 transition-colors"
      >
        <X size={18} />
        Reject
      </button>

      {status === 'PENDING' && (
        <button
          onClick={() =>
            onReview(
              'APPROVED',
              comments,
              selectedRoleId
            )
          }
          disabled={
            isSubmitting ||
            !selectedRoleId
          }
          className="px-4 py-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg font-medium flex items-center gap-2 transition-colors border border-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check size={18} />
          Approve
        </button>
      )}

    </div>
  );
}