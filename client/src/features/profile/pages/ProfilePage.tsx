import { User } from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth';

export default function ProfilePage() {
  const { user, onboardingApplication } = useAuth();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
          <User size={20} />
        </div>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Account Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="font-medium text-white">{user?.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Email Address</p>
              <p className="font-medium text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">System Role</p>
              <p className="font-medium text-primary mt-1">
                <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs">
                  {user?.roleId?.name || 'No Role Assigned'}
                </span>
              </p>
            </div>
            {user?.contractorType && (
              <div>
                <p className="text-xs text-slate-400">Contractor Type</p>
                <p className="font-medium text-white mt-1">
                  <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs">
                    {user.contractorType}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Onboarding Status */}
        {onboardingApplication && (
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Onboarding Application</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400">Current Status</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    onboardingApplication.status === 'PENDING'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : onboardingApplication.status === 'APPROVED'
                      ? 'bg-green-500/20 text-green-500'
                      : onboardingApplication.status === 'CHANGES_REQUESTED'
                      ? 'bg-orange-500/20 text-orange-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {onboardingApplication.status}
                  </span>
                </div>
              </div>

              {onboardingApplication.reviewComments && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Administrator Notes</p>
                  <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300 border border-slate-700">
                    <p className="whitespace-pre-wrap">{onboardingApplication.reviewComments}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
