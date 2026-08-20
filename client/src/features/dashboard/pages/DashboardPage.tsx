import { useAuth } from '../../../shared/hooks/useAuth';
import { usePermission } from '../../../shared/hooks/usePermission';
import { NavLink } from 'react-router-dom';
import { QuickLinks } from '../../../constants/quick-links';



export default function DashboardPage() {
  const { user } = useAuth();
  const { hasPermission } = usePermission();

  const visibleLinks = QuickLinks.filter((link) =>
    hasPermission(link.permission)
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.fullName?.split(' ')[0] || 'User'}
        </h1>
        <div className="flex items-center gap-3 mt-3">
          {user?.roleId?.name && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              {user.roleId.name}
            </span>
          )}
          {user?.contractorType && (
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
              {user.contractorType}
            </span>
          )}
        </div>
      </div>

      {/* Quick Links Grid */}
      {visibleLinks.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={`group relative p-5 rounded-xl border border-slate-800 hover:border-slate-700 bg-gradient-to-br ${link.gradient} transition-all hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 group-hover:bg-slate-700/80 transition-colors">
                    <link.icon size={20} className="text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {link.label}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {link.description}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {visibleLinks.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400">
            No modules are currently available for your role.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Contact your administrator if you need additional access.
          </p>
        </div>
      )}
    </div>
  );
}
