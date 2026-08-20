import type { OnboardingApplicationStatus } from '../types/admin.types';

export function getApplicationStatusColor(
  status: OnboardingApplicationStatus
) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-500';

    case 'APPROVED':
      return 'bg-green-500/20 text-green-500';

    case 'REJECTED':
      return 'bg-red-500/20 text-red-500';

    case 'CHANGES_REQUESTED':
      return 'bg-orange-500/20 text-orange-500';

    default:
      return 'bg-slate-500/20 text-slate-500';
  }
}