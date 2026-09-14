import { useState } from 'react';
import { useWorks } from '../hooks/useWorks';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { WorkModal } from './WorkModal';
import { ConfirmModal } from '../../../shared/components/ui/Modal/ConfirmModal';
import type { Work } from '../types/production.types';

export function WorkTable({ productionId }: { productionId: string }) {
  const { works, isLoading, removeWork } = useWorks(productionId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [workToDelete, setWorkToDelete] = useState<Work | null>(null);

  if (isLoading) return <div className="text-slate-400">Loading works/positions...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Works / Positions</h3>
        <button
          onClick={() => { setSelectedWork(null); setIsModalOpen(true); }}
          className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Add Position
        </button>
      </div>

      {works.length === 0 ? (
        <div className="text-center py-8 text-slate-400">No positions found. Create one to get started!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 text-slate-400 text-sm">
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work._id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{work.title}</td>
                  <td className="py-3 px-4 text-slate-300">
                    {typeof work.departmentId === 'object' ? (work.departmentId as any).name : 'Unknown Department'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{work.description || '-'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => { setSelectedWork(work); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setWorkToDelete(work)}
                      className="p-2 text-red-500/70 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <WorkModal
          productionId={productionId}
          work={selectedWork}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {workToDelete && (
        <ConfirmModal
          isOpen={!!workToDelete}
          onClose={() => setWorkToDelete(null)}
          onConfirm={() => removeWork(workToDelete._id)}
          title="Delete Position"
          message={`Are you sure you want to delete the ${workToDelete.title} position? This action cannot be undone.`}
          isDestructive={true}
        />
      )}
    </div>
  );
}
