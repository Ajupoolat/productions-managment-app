import LoadingSpinner from '../../../../shared/components/ui/Loading/LoadingSpinner';
import type { Role } from '../../../../shared/types/roles.types';
import type { OnboardingApplicationStatus } from '../../../../shared/types/onboarding.types';
import { Select } from '../../../../shared/components/ui/Form/Select';
import { Textarea } from '../../../../shared/components/ui/Form/Textarea';

interface AdminNotesCardProps {
  status: OnboardingApplicationStatus;
  roles: Role[];
  isLoadingRoles: boolean;
  selectedRoleId: string;
  comments: string;
  onRoleChange: (roleId: string) => void;
  onCommentsChange: (comments: string) => void;
}

export function AdminNotesCard({
  status,
  roles,
  isLoadingRoles,
  selectedRoleId,
  comments,
  onRoleChange,
  onCommentsChange,
}: AdminNotesCardProps) {
  if (
    status !== 'PENDING' &&
    status !== 'APPROVED'
  ) {
    return null;
  }

  return (
    <div className="glass-panel p-6 rounded-xl bg-primary/5 border-primary/20">

      {status === 'PENDING' && (
        <>
          <h2 className="text-sm font-semibold text-primary mb-3">
            Assign System Role{' '}
            <span className="text-red-400">
              *
            </span>
          </h2>

          <div className="mb-4">

            <p className="text-xs text-slate-400 mb-2">
              Select a role to assign upon approval
              (Required)
            </p>

            {isLoadingRoles ? (
              <LoadingSpinner size={20} />
            ) : (
              <Select
                value={selectedRoleId}
                onChange={(event) =>
                  onRoleChange(event.target.value)
                }
              >
                <option value="">
                  -- No Role Assigned --
                </option>

                {roles.map((role) => (
                  <option
                    key={role._id}
                    value={role._id}
                  >
                    {role.name}
                  </option>
                ))}
              </Select>
            )}

          </div>
        </>
      )}

      <h2
        className={`text-sm font-semibold text-primary mb-3 ${status === 'PENDING'
            ? 'mt-4 border-t border-primary/10 pt-4'
            : ''
          }`}
      >
        Admin Notes
      </h2>

      <Textarea
        value={comments}
        onChange={(event) =>
          onCommentsChange(event.target.value)
        }
        placeholder="Add comments before approving, rejecting, or requesting changes..."
        className="text-sm"
      />

    </div>
  );
}