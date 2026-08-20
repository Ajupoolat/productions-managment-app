import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Loader2,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

import { useApplicationReview } from '../hooks/useApplicationReview';
import { useApplicationReviewActions } from '../hooks/useApplicationReviewActions';
import { useRoles } from '../hooks/useRoles';

export default function ApplicationReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const { roles, isLoadingRoles } = useRoles();

  const {
    application,
    isLoading,
    refetchApplication,
  } = useApplicationReview(id);

  const {
    isSubmitting,
    handleReview,
  } = useApplicationReviewActions({
    applicationId: id,
    onSuccess: refetchApplication,
  });

  const handleBack = () => {
    navigate('/admin/onboarding');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          className="animate-spin text-primary"
          size={32}
        />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Back Button */}

      <button
        onClick={handleBack}
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />

        Back to Applications
      </button>

      {/* Header */}

      <div className="flex items-start justify-between mb-8">
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

        {/* Review Actions */}

        {application.status === 'PENDING' && (
          <div className="flex gap-3">
            <button
              onClick={() =>
                handleReview(
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
                handleReview(
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

            <button
              onClick={() =>
                handleReview(
                  'APPROVED',
                  comments,
                  selectedRoleId
                )
              }
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg font-medium flex items-center gap-2 transition-colors border border-green-500/20"
            >
              <Check size={18} />

              Approve
            </button>
          </div>
        )}
      </div>

      {/* Application Content */}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">

          {/* Personal Information */}

          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">
                  Full Name
                </p>

                <p className="font-medium">
                  {application.personalInformation.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">
                  Phone Number
                </p>

                <p className="font-medium">
                  {application.personalInformation.phone}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-slate-400 mb-1">
                  Address
                </p>

                <p className="font-medium">
                  {application.personalInformation.address ||
                    'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Information */}

          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4">
              Financial Information
            </h2>

            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">
                  Account Holder
                </p>

                <p className="font-medium">
                  {
                    application.financialInformation
                      .accountHolderName
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">
                  Bank Name
                </p>

                <p className="font-medium">
                  {
                    application.financialInformation
                      .bankName
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}

        <div className="col-span-1 space-y-6">

          {/* Admin Notes */}

          {application.status === 'PENDING' && (
            <div className="glass-panel p-6 rounded-xl bg-primary/5 border-primary/20">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Assign System Role
              </h2>
              
              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-2">Select a role to automatically assign upon approval (Optional)</p>
                {isLoadingRoles ? (
                  <div className="flex items-center text-xs text-slate-400"><Loader2 className="animate-spin mr-2" size={14}/> Loading roles...</div>
                ) : (
                  <select
                    className="input-field text-sm"
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                  >
                    <option value="">-- No Role Assigned --</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>{role.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <h2 className="text-sm font-semibold text-primary mb-3 mt-4 border-t border-primary/10 pt-4">
                Admin Notes
              </h2>

              <textarea
                value={comments}
                onChange={(event) =>
                  setComments(event.target.value)
                }
                placeholder="Add comments before approving or rejecting..."
                className="input-field min-h-[120px] text-sm"
              />
            </div>
          )}

          {/* Signature */}

          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-sm font-semibold mb-3">
              Electronic Signature
            </h2>

            <div className="p-4 bg-slate-800 rounded-lg text-center">
              <p className="font-serif text-xl italic text-slate-300">
                {application.signature}
              </p>

              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">
                Signed electronically
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}