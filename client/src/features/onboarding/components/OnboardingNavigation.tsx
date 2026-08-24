import { Loader2 } from 'lucide-react';

interface OnboardingNavigationProps {
  isFirstStep: boolean;
  isLastFormStep: boolean;
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
}

export function OnboardingNavigation({
  isFirstStep,
  isLastFormStep,
  isLoading,
  onBack,
  onContinue,
}: OnboardingNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-700/50">

      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || isLoading}
        className="px-6 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
      >
        Back
      </button>

      {!isLastFormStep ? (
        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="btn-primary"
        >
          Continue
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <Loader2
              className="animate-spin"
              size={20}
            />
          ) : (
            'Submit Application'
          )}
        </button>
      )}

    </div>
  );
}