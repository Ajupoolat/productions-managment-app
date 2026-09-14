import { useOutletContext } from 'react-router-dom';
import type  { Production } from '../types/production.types';
import { Shirt } from 'lucide-react';

export default function ProductionCostumesPage() {
  const { production } = useOutletContext<{ production: Production }>();

  return (
    <div className="glass-panel p-8 rounded-2xl border border-slate-800/60 min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center">
        <Shirt className="text-violet-400" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-white">Costume Requests</h2>
      <p className="text-slate-400 max-w-md">
        Request and manage costumes for <strong>{production.name}</strong>. This feature is coming soon!
      </p>
    </div>
  );
}
