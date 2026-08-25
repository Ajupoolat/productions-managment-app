import { useParams, Link } from 'react-router-dom';
import { Film, ArrowLeft, Calendar, DollarSign, AlignLeft, UserCircle } from 'lucide-react';
import { useAdminProductions } from '../hooks/useAdminProductions';
import LoadingSpinner from '../../../shared/components/ui/Loading/LoadingSpinner';
import { formatCurrency } from '../../../shared/utils/formatCurrency.utils';
import { formatDate } from '../../../shared/utils/formatDate.utils';
import { getStatusColor } from '../utils/statusColor.utils';

export default function AdminProductionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { production, isLoading } = useAdminProductions(id);

 if (isLoading) {
  return <LoadingSpinner className='text-purple-500' size={32} classNameContainer='h-[80vh]' />;
}


  if (!production) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <p className="text-slate-400">Production not found.</p>
        <Link to="/admin/productions" className="text-violet-400 hover:underline mt-4 inline-block">
          Return to productions list
        </Link>
      </div>
    );
  }


  const manager = typeof production.productionManagerId === 'object' && production.productionManagerId !== null
    ? production.productionManagerId
    : null;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/admin/productions"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Productions
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <Film className="text-violet-400" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{production.name}</h1>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase ${getStatusColor(production.status)}`}>
                {production.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
