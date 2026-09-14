import { useOutletContext } from 'react-router-dom';
import { Calendar, DollarSign, AlignLeft, UserCircle } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/formatCurrency.utils';
import { formatDate } from '../../../shared/utils/formatDate.utils';
import type { Production } from '../types/production.types';

export default function ProductionOverviewPage() {
  const { production } = useOutletContext<{ production: Production }>();

  const manager = typeof production.productionManagerId === 'object' && production.productionManagerId !== null
    ? production.productionManagerId
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Details */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/60">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlignLeft className="text-violet-400" size={20} />
            About Production
          </h2>
          <div className="prose prose-invert max-w-none text-slate-300">
            {production.description ? (
              <p className="whitespace-pre-wrap">{production.description}</p>
            ) : (
              <p className="text-slate-500 italic">No description provided.</p>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/60">
          <h2 className="text-lg font-semibold text-white mb-4">Additional Notes</h2>
          <div className="text-slate-300">
            {production.notes ? (
              <p className="whitespace-pre-wrap bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">{production.notes}</p>
            ) : (
              <p className="text-slate-500 italic">No additional notes.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/60 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <UserCircle size={16} />
              Production Manager
            </h3>
            {manager ? (
              <div className="flex flex-col gap-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <span className="text-white font-medium">{manager.firstName} {manager.lastName}</span>
                <span className="text-slate-400 text-sm">{manager.email}</span>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Unknown Manager</p>
            )}
          </div>

          <div className="h-px bg-slate-800/60 w-full" />

          <div>
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <DollarSign size={16} />
              Budget
            </h3>
            <p className="text-2xl font-bold text-emerald-400">
              {formatCurrency(production.budget)}
            </p>
          </div>

          <div className="h-px bg-slate-800/60 w-full" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <Calendar size={14} />
                Start Date
              </h3>
              <p className="text-white">{formatDate(production.startDate)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <Calendar size={14} />
                End Date
              </h3>
              <p className="text-white">{formatDate(production.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
