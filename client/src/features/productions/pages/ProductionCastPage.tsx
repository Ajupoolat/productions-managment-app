import { useOutletContext } from 'react-router-dom';
import type { Production } from '../types/production.types';
import { Users, Users2 } from 'lucide-react';
import { CharacterTable } from '../components/CharacterTable';
import { CastAssignmentTable } from '../components/CastAssignmentTable';
import { Tabs } from '../../../shared/components/ui/Tabs';

export default function ProductionCastPage() {
  const { production } = useOutletContext<{ production: Production }>();

  const tabs = [
    {
      id: 'characters',
      label: 'Characters',
      icon: <Users2 size={18} />,
      content: (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/60 min-h-100">
          <CharacterTable productionId={production._id} />
        </div>
      ),
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: <Users size={18} />,
      content: (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/60 min-h-100">
          <CastAssignmentTable productionId={production._id} />
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} defaultTab="characters" />;
}
