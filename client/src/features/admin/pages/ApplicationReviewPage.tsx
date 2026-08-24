
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useApplicationReview } from '../hooks/useApplicationReview';
import { useApplicationReviewActions } from '../hooks/useApplicationReviewActions';
import { useRoles } from '../hooks/useRoles';

import { ApplicationReviewHeader } from '../components/applicationReview/ApplicationReviewHeader';
import { PersonalInformationCard } from '../components/applicationReview/PersonalInformationCard';
import { FinancialInformationCard } from '../components/applicationReview/FinancialInformationCard';
import { DocumentsCard } from '../components/applicationReview/DocumentsCard';
import { AdminNotesCard } from '../components/applicationReview/AdminNotesCards';
import { SignatureCard } from '../components/applicationReview/SignatureCard';
import LoadingSpinner from '../../../shared/components/ui/Loading/LoadingSpinner';

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
    <LoadingSpinner />
  }

  if (!application) {
    return null;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <ApplicationReviewHeader
        application={application}
        comments={comments}
        selectedRoleId={selectedRoleId}
        isSubmitting={isSubmitting}
        onBack={handleBack}
        onReview={handleReview}
      />

      <div className="grid grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="col-span-2 space-y-6">

          <PersonalInformationCard
            personalInformation={
              application.personalInformation
            }
          />

          <FinancialInformationCard
            financialInformation={
              application.financialInformation
            }
          />

          <DocumentsCard
            documents={application.documents}
          />

        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-6">

          <AdminNotesCard
            status={application.status}
            roles={roles}
            isLoadingRoles={isLoadingRoles}
            selectedRoleId={selectedRoleId}
            comments={comments}
            onRoleChange={setSelectedRoleId}
            onCommentsChange={setComments}
          />

          <SignatureCard
            signature={application.signature}
          />

        </div>

      </div>
    </div>
  );
}