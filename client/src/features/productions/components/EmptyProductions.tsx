import { Film } from 'lucide-react';

export function EmptyProductions() {
  return (
    <div className="glass-panel p-12 rounded-xl text-center">

      <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
        <Film
          className="text-violet-400"
          size={32}
        />
      </div>

      <p className="text-slate-300 font-medium text-lg mb-2">
        No productions found
      </p>

      <p className="text-slate-500 text-sm">
        You haven't created any productions yet.
        Click the Create Production button to get
        started.
      </p>

    </div>
  );
}