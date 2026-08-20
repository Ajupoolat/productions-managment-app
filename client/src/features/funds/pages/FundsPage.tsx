import { DollarSign } from 'lucide-react';

export default function FundsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
          <DollarSign className="text-yellow-400" size={22} />
        </div>
        <h1 className="text-2xl font-bold text-white">Fund Requests</h1>
      </div>
      <div className="glass-panel p-12 rounded-xl text-center">
        <p className="text-slate-400 mb-2">Fund request features are coming soon.</p>
        <p className="text-slate-500 text-sm">This module will allow you to submit, track, and manage fund requests.</p>
      </div>
    </div>
  );
}
