import { Calendar, Eye, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Production } from '../types/production.types';

import { getStatusColor } from '../../admin/utils/statusColor.utils';
import { formatCurrency } from '../../../shared/utils/formatCurrency.utils';
import { formatDate } from '../../../shared/utils/formatDate.utils';

interface ProductionCardProps {
  production: Production;
}

export function ProductionCard({
  production,
}: ProductionCardProps) {
  return (
    <div
      className="
        glass-panel
        rounded-2xl
        overflow-hidden
        border
        border-slate-800/60
        hover:border-violet-500/30
        transition-all
        group
        flex
        flex-col
      "
    >
      <div className="p-6 flex-1">

        <div className="flex items-start justify-between mb-4">

          <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <Film
              className="text-violet-400"
              size={24}
            />
          </div>

          <span
            className={`
              px-2.5
              py-1
              rounded-full
              text-[10px]
              font-bold
              tracking-wider
              uppercase
              border
              ${getStatusColor(production.status)}
            `}
          >
            {production.status.replace('_', ' ')}
          </span>

        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
          {production.name}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-2 mb-6">
          {production.description ||
            'No description provided.'}
        </p>

        <div className="space-y-3">

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 flex items-center gap-2">
              <Calendar size={14} />
              Start
            </span>

            <span className="text-slate-300">
              {formatDate(production.startDate)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 flex items-center gap-2">
              <Calendar size={14} />
              End
            </span>

            <span className="text-slate-300">
              {formatDate(production.endDate)}
            </span>
          </div>

        </div>
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-800/60 flex items-center justify-between">

        <div>
          <span className="text-xs text-slate-500 block">
            Budget
          </span>

          <span className="text-emerald-400 font-medium">
            {formatCurrency(production.budget)}
          </span>
        </div>

        <Link
          to={`/productions/${production._id}`}
          className="
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-lg
            bg-slate-800
            hover:bg-violet-600
            text-slate-300
            hover:text-white
            transition-colors
            text-sm
            font-medium
          "
        >
          <Eye size={16} />
          View
        </Link>

      </div>
    </div>
  );
}