  
import { useOnboardingSteps } from '../hooks/useOnboardingSteps';
import { useOnboardingForm } from '../hooks/useOnboardingForm';
import { useOnboardingDocuments } from '../hooks/useOnboardingDocuments';
import { useOnboardingStepValidation } from '../hooks/useOnboardingStepValidation';

import { OnboardingProgress } from '../components/OnboardingProgress';

import { OnboardingNavigation } from '../components/OnboardingNavigation';

import { ContractorTypeStep } from '../components/ContractorTypeStep';

import { PersonalInformationStep } from '../components/PersonalInformationStep';

import { FinancialInformationStep } from '../components/FinancialInformationStep';

import { DocumentsStep } from '../components/DocumentsStep';

import { SignatureStep } from '../components/SignatureStep';

import { OnboardingCompleteStep } from '../components/OnboardingCompleteStep';

export default function OnboardingFlowPage() {
  const {
    step,
    nextStep,
    prevStep,
    goToDoneStep,
    isFirstStep,
    isLastFormStep,
    isDone,
    totalSteps,
  } = useOnboardingSteps();

  const {
    register,
    handleSubmit,
    watch,
    isLoading,
    onSubmit,
    trigger,
    formState: { errors },
  } = useOnboardingForm({
    onSuccess: goToDoneStep,
  });

  const {
    documentType,
    setDocumentType,
    uploadedFiles,
    handleFileUpload,
    removeFile,
    validateDocuments,
    getFiles,
    getMetadata,
  } = useOnboardingDocuments();

  const { validateStep } =
    useOnboardingStepValidation({
      trigger,
      validateDocuments,
    });

  const contractorType = watch('contractorType');

  const handleContinue = async () => {
    const isValid = await validateStep(step);

    if (isValid) {
      nextStep();
    }
  };

  const handleSubmitApplication = (
    data: Parameters<typeof onSubmit>[0]
  ) => {
    onSubmit(
      data,
      getFiles(),
      getMetadata()
    );
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center pt-10">

      <OnboardingProgress
        step={step}
        totalSteps={totalSteps}
      />

      <div className="glass-panel w-full max-w-2xl p-8 rounded-2xl">

        <form
          onSubmit={handleSubmit(
            handleSubmitApplication
          )}
        >

          {step === 1 && (
            <ContractorTypeStep
              contractorType={contractorType}
              register={register('contractorType')}
              error={
                errors.contractorType?.message
              }
            />
          )}

          {step === 2 && (
            <PersonalInformationStep
              register={register}
              errors={errors}
            />
          )}

          {step === 3 && (
            <FinancialInformationStep
              register={register}
              errors={errors}
            />
          )}

          {step === 4 && (
            <DocumentsStep
              documentType={documentType}
              uploadedFiles={uploadedFiles}
              onDocumentTypeChange={
                setDocumentType
              }
              onFileUpload={
                handleFileUpload
              }
              onRemoveFile={removeFile}
            />
          )}

          {step === 5 && (
            <SignatureStep
              register={register}
              errors={errors}
            />
          )}

          {step === 6 && (
            <OnboardingCompleteStep />
          )}

          {!isDone && (
            <OnboardingNavigation
              isFirstStep={isFirstStep}
              isLastFormStep={isLastFormStep}
              isLoading={isLoading}
              onBack={prevStep}
              onContinue={handleContinue}
            />
          )}

        </form>

      </div>
    </div>
  );
}