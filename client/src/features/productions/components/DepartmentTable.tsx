import { useState } from 'react';
import { useDepartments } from '../hooks/useDepartments';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { DepartmentModal } from './DepartmentModal';
import { ConfirmModal } from '../../../shared/components/ui/Modal/ConfirmModal';
import type { Department } from '../types/production.types';

export function DepartmentTable({ productionId }: { productionId: string }) {
  const { departments, isLoading, removeDepartment } = useDepartments(productionId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null);

  if (isLoading) return <div className="text-slate-400">Loading departments...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Departments</h3>
        <button
          onClick={() => { setSelectedDepartment(null); setIsModalOpen(true); }}
          className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      {departments.length === 0 ? (
        <div className="text-center py-8 text-slate-400">No departments found. Create one to get started!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 text-slate-400 text-sm">
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{dept.name}</td>
                  <td className="py-3 px-4 text-slate-400">{dept.description || '-'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => { setSelectedDepartment(dept); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeptToDelete(dept)}
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
        <DepartmentModal
          productionId={productionId}
          department={selectedDepartment}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {deptToDelete && (
        <ConfirmModal
          isOpen={!!deptToDelete}
          onClose={() => setDeptToDelete(null)}
          onConfirm={() => removeDepartment(deptToDelete._id)}
          title="Delete Department"
          message={`Are you sure you want to delete the ${deptToDelete.name} department? This action cannot be undone.`}
          isDestructive={true}
        />
      )}
    </div>
  );
}
