import { AlertCircle } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { CONTRACTOR_TYPES } from '../../../shared/types/onboarding.types';

interface ContractorTypeStepProps {
  contractorType?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export function ContractorTypeStep({
  contractorType,
  register,
  error,
}: ContractorTypeStepProps) {
  return (
    <div className="space-y-6">

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          Welcome to Tendagon!
        </h2>

        <p className="text-slate-400">
          Let's get you set up. What is your role
          on the team?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {CONTRACTOR_TYPES.map((type) => (
          <label
            key={type}
            className={`border rounded-xl p-4 cursor-pointer transition-all flex items-center justify-center text-center font-medium ${
              contractorType === type
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register}
              className="hidden"
            />

            {type.replace(/_/g, ' ')}
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}

    </div>
  );
}