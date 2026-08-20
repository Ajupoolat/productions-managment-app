import { useState } from 'react';

const TOTAL_STEPS = 6;
const FORM_STEPS = 5;

export function useOnboardingSteps() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((currentStep) =>
      Math.min(currentStep + 1, FORM_STEPS)
    );
  };

  const prevStep = () => {
    setStep((currentStep) =>
      Math.max(currentStep - 1, 1)
    );
  };

  const goToDoneStep = () => {
    setStep(TOTAL_STEPS);
  };

  return {
    step,
    nextStep,
    prevStep,
    goToDoneStep,
    isFirstStep: step === 1,
    isLastFormStep: step === FORM_STEPS,
    isDone: step === TOTAL_STEPS,
    totalSteps: FORM_STEPS,
  };
}