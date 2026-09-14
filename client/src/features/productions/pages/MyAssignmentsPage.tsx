import { ClipboardList } from 'lucide-react';

export default function MyAssignmentsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">My Assignments</h1>
        <p className="text-slate-400 mt-2">
          Details of your specific roles and responsibilities across productions.
        </p>
      </div>

      <div className="glass-panel p-16 rounded-2xl border border-slate-800/60 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700/50">
          <ClipboardList className="text-slate-400" size={32} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No active assignments.</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          You currently have no detailed assignments. When a production manager assigns you a character or crew position, the details will appear here.
        </p>
      </div>
    </div>
  );
}
