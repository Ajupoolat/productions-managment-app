import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  XCircle
} from 'lucide-react';

import { useAuth } from '../../../shared/hooks/useAuth';
import { useLogout } from '../../auth/hooks/useLogout';

export default function OnboardingStatusPage() {
  const { user, onboardingApplication } = useAuth();
  const navigate = useNavigate();

  const {
    isLoading,
    handleLogout,
  } = useLogout();

  const isChangesRequested = onboardingApplication?.status === 'CHANGES_REQUESTED';
  const isRejected = onboardingApplication?.status === 'REJECTED';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl text-center">

        {isChangesRequested ? (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mb-6">
            <AlertTriangle size={32} />
          </div>
        ) : isRejected ? (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-6">
            <XCircle size={32} />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
            <CheckCircle2 size={32} />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-2">
          {isChangesRequested ? 'Changes Requested' : isRejected ? 'Application Rejected' : 'Application Received'}
        </h2>

        <p className="text-slate-400 mb-6">
          {isChangesRequested ? (
            <span>The administrator has requested some changes to your application, {user?.fullName}. Please review the notes below and update your application.</span>
          ) : isRejected ? (
            <span>We are sorry {user?.fullName}, but your onboarding application has been rejected. Please review the notes below.</span>
          ) : (
            <span>
              Thank you for submitting your onboarding application, {user?.fullName}.
              Your status is currently <span className="font-semibold text-blue-400">PENDING REVIEW</span>.
            </span>
          )}
        </p>

        {(isChangesRequested || isRejected) && onboardingApplication?.reviewComments && (
          <div className={`rounded-xl p-4 mb-8 text-sm text-left border ${isChangesRequested ? 'bg-orange-500/10 border-orange-500/20 text-orange-200' : 'bg-red-500/10 border-red-500/20 text-red-200'}`}>
            <h3 className={`font-semibold mb-2 ${isChangesRequested ? 'text-orange-400' : 'text-red-400'}`}>
              Administrator Notes:
            </h3>
            <p className="whitespace-pre-wrap">{onboardingApplication.reviewComments}</p>
          </div>
        )}

        {!isChangesRequested && !isRejected && (
          <div className="bg-slate-800/50 rounded-xl p-4 mb-8 text-sm text-slate-300 text-left border border-slate-700">
            <h3 className="font-semibold text-white mb-2">
              What happens next?
            </h3>

          <ul className="space-y-2">
            <li className="flex items-start">
              <ArrowRight
                size={16}
                className="text-primary mt-0.5 mr-2 shrink-0"
              />

              <span>
                An administrator will review your submitted
                information and documents.
              </span>
            </li>

            <li className="flex items-start">
              <ArrowRight
                size={16}
                className="text-primary mt-0.5 mr-2 shrink-0"
              />

              <span>
                If approved, you will be assigned a System Role.
              </span>
            </li>

            <li className="flex items-start">
              <ArrowRight
                size={16}
                className="text-primary mt-0.5 mr-2 shrink-0"
              />

              <span>
                We will notify you once your account is fully
                activated.
              </span>
            </li>
            </ul>
          </div>
        )}

        {isChangesRequested && (
          <button
            onClick={() => navigate('/onboarding')}
            className="btn-primary w-full mb-3"
          >
            Resume Application
          </button>
        )}

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <Loader2
              className="animate-spin"
              size={20}
            />
          ) : (
            'Log out for now'
          )}
        </button>
      </div>
    </div>
  );
}