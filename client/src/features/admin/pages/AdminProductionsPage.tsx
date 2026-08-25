import { Film, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminProductions } from '../hooks/useAdminProductions';
import { getStatusColor } from '../utils/statusColor.utils';
import { formatCurrency } from '../../../shared/utils/formatCurrency.utils';
import { formatDate } from '../../../shared/utils/formatDate.utils';
import LoadingSpinner from '../../../shared/components/ui/Loading/LoadingSpinner';
import { useQueryParams } from '../../../shared/hooks/useQueryParams';
import { SearchBar } from '../../../shared/components/ui/DataView/SearchBar';
import { FilterDropdown } from '../../../shared/components/ui/DataView/FilterDropdown';
import { Pagination } from '../../../shared/components/ui/DataView/Pagination';
import { ProductionStatus } from '../../../constants/production-status';

export default function AdminProductionsPage() {
  const { paramsObject } = useQueryParams();
  const { productions, isLoading, meta } = useAdminProductions(undefined, paramsObject);

  const statusOptions = Object.values(ProductionStatus).map(status => ({
    label: status.replace(/_/g, ' '),
    value: status
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <Film className="text-violet-400" size={22} />
          </div>
          <h1 className="text-2xl font-bold text-white">All Productions</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <FilterDropdown 
            paramKey="status" 
            options={statusOptions} 
            placeholder="All Statuses"
            className="w-40"
          />
          <SearchBar placeholder="Search productions..." />
        </div>
      </div>

      {isLoading ? (
   <LoadingSpinner className='text-purple-500' size={32} classNameContainer='h-[80vh]' />
      ) : productions.length === 0 ? (
        <div className="glass-panel p-12 rounded-xl text-center">
          <p className="text-slate-400 mb-2">No productions found.</p>
          <p className="text-slate-500 text-sm">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-xl overflow-hidden border border-slate-800/60">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800/60 text-slate-400 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Manager</th>
                <th className="p-4 font-medium hidden md:table-cell">Budget</th>
                <th className="p-4 font-medium hidden lg:table-cell">Start Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {productions.map((production) => (
                <tr key={production._id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-medium text-slate-200">{production.name}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(production.status)}`}>
                      {production.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {typeof production.productionManagerId === 'object' && production.productionManagerId !== null
                      ? `${production.productionManagerId.firstName} ${production.productionManagerId.lastName}`
                      : 'Unknown'}
                  </td>
                  <td className="p-4 text-slate-400 hidden md:table-cell">
                    {formatCurrency(production.budget)}
                  </td>
                  <td className="p-4 text-slate-400 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="opacity-50" />
                      {formatDate(production.startDate)}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/admin/productions/${production._id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-violet-500/20 text-slate-300 hover:text-violet-400 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {meta && meta.totalPages > 1 && (
        <Pagination totalPages={meta.totalPages} />
      )}
    </div>
  );
}
