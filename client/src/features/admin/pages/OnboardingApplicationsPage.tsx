import { Link } from 'react-router-dom';
import { Search, FileText } from 'lucide-react';
import LoadingSpinner from '../../../shared/components/ui/Loading/LoadingSpinner';
import { useOnboardingApplications } from '../hooks/useOnboardingApplications';
import { getApplicationStatusColor } from '../utils/status.utils';

export default function OnboardingApplicationsPage() {
  const {
    applications,
    isLoading,
  } = useOnboardingApplications();

  if (isLoading) {
    <LoadingSpinner />
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Onboarding Applications
          </h1>

          <p className="text-slate-400 mt-1">
            Review and manage new team members
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search applications..."
            className="input-field pl-10 w-64"
          />
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="p-4 font-semibold text-slate-300">
                Applicant Name
              </th>

              <th className="p-4 font-semibold text-slate-300">
                Email
              </th>

              <th className="p-4 font-semibold text-slate-300">
                Contractor Type
              </th>

              <th className="p-4 font-semibold text-slate-300">
                Submitted Date
              </th>

              <th className="p-4 font-semibold text-slate-300">
                Status
              </th>

              <th className="p-4 font-semibold text-slate-300 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-slate-400"
                >
                  <FileText
                    className="mx-auto mb-2 opacity-50"
                    size={32}
                  />

                  No onboarding applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application._id}
                  className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 font-medium">
                    {application.userId?.fullName || 'N/A'}
                  </td>

                  <td className="p-4 text-slate-400">
                    {application.userId?.email || 'N/A'}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium border border-slate-700">
                      {application.contractorType}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getApplicationStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/onboarding/${application._id}`}
                      className="text-primary hover:text-blue-400 text-sm font-medium hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}