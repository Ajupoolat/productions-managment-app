import { Shirt } from 'lucide-react';

export default function CostumesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
          <Shirt className="text-pink-400" size={22} />
        </div>
        <h1 className="text-2xl font-bold text-white">Costumes</h1>
      </div>
      <div className="glass-panel p-12 rounded-xl text-center">
        <p className="text-slate-400 mb-2">Costume management features are coming soon.</p>
        <p className="text-slate-500 text-sm">This module will allow you to manage costume inventory and assignments.</p>
      </div>
    </div>
  );
}
