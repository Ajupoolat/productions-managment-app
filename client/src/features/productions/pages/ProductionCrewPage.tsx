import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Production } from '../types/production.types';
import { HardHat, Briefcase, Users } from 'lucide-react';
import { DepartmentTable } from '../components/DepartmentTable';
import { WorkTable } from '../components/WorkTable';
import { CrewAssignmentTable } from '../components/CrewAssignmentTable';

export default function ProductionCrewPage() {
  const { production } = useOutletContext<{ production: Production }>();
  const [activeTab, setActiveTab] = useState<'departments' | 'works' | 'assignments'>('departments');

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'departments' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="inline-block mr-2" size={18} />
            Departments
          </button>
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'works' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HardHat className="inline-block mr-2" size={18} />
            Works/Positions
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'assignments' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="inline-block mr-2" size={18} />
            Assignments
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/60 min-h-[400px]">
        {activeTab === 'departments' && <DepartmentTable productionId={production._id} />}
        {activeTab === 'works' && <WorkTable productionId={production._id} />}
        {activeTab === 'assignments' && <CrewAssignmentTable productionId={production._id} />}
      </div>
    </div>
  );
}
