import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OnboardingCompleteStep() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">

      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-6">
        <CheckCircle2 size={40} />
      </div>

      <h2 className="text-3xl font-bold mb-4">
        You're all set!
      </h2>

      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Your onboarding application has been
        successfully submitted. We will notify you
        once an administrator reviews it.
      </p>

      <button
        type="button"
        onClick={() =>
          navigate('/onboarding/status')
        }
        className="btn-primary"
      >
        Go to Status Page
      </button>

    </div>
  );
}