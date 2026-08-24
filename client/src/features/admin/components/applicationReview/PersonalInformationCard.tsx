import type { PersonalInformation } from '../../../../shared/types/onboarding.types';

interface PersonalInformationCardProps {
  personalInformation: PersonalInformation;
};


export function PersonalInformationCard({
  personalInformation,
}: PersonalInformationCardProps) {
  return (
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
            {personalInformation.fullName}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">
            Phone Number
          </p>

          <p className="font-medium">
            {personalInformation.phone}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-xs text-slate-400 mb-1">
            Address
          </p>

          <p className="font-medium">
            {personalInformation.address || 'N/A'}
          </p>
        </div>

      </div>
    </div>
  );
}