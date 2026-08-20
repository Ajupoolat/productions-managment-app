import {
  ArrowRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import { useAuth } from '../../../shared/hooks/useAuth';
import { useLogout } from '../../auth/hooks/useLogout';

export default function OnboardingStatusPage() {
  const { user } = useAuth();

  const {
    isLoading,
    handleLogout,
  } = useLogout();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl text-center">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
          <CheckCircle2 size={32} />
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Application Received
        </h2>

        <p className="text-slate-400 mb-6">
          Thank you for submitting your onboarding application,{' '}
          {user?.fullName}.
          Your status is currently{' '}
          <span className="font-semibold text-blue-400">
            PENDING REVIEW
          </span>.
        </p>

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