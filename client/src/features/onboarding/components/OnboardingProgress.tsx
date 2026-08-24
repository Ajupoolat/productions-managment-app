import { CheckCircle2 } from 'lucide-react';

interface OnboardingProgressProps {
  step: number;
  totalSteps: number;
}

export function OnboardingProgress({
  step,
  totalSteps,
}: OnboardingProgressProps) {
  if (step === totalSteps) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mb-8 flex items-center justify-between relative px-2">

      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded" />

      <div
        className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded transition-all duration-300"
        style={{
          width: `${((step - 1) / 4) * 100}%`,
        }}
      />

      {Array.from(
        { length: totalSteps },
        (_, index) => {
          const stepNumber = index + 1;

          return (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= stepNumber
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {step > stepNumber ? (
                <CheckCircle2 size={16} />
              ) : (
                stepNumber
              )}
            </div>
          );
        }
      )}
    </div>
  );
}