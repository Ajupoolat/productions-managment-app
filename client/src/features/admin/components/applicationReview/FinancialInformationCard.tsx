import type { FinancialInformation } from '../../../../shared/types/onboarding.types';

interface FinancialInformationCardProps {
  financialInformation: FinancialInformation;
}

export function FinancialInformationCard({
  financialInformation,
}: FinancialInformationCardProps) {
  return (
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
            {financialInformation.accountHolderName}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">
            Bank Name
          </p>

          <p className="font-medium">
            {financialInformation.bankName}
          </p>
        </div>

      </div>
    </div>
  );
}