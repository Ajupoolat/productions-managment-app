import { useState, useMemo } from 'react';
import { useAssignments } from '../hooks/useAssignments';
import { Plus } from 'lucide-react';
import { AssignCastModal } from './AssignCastModal';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { CastAssignment } from '../types/production.types';
import { features } from '../../../shared/components/ui/DataTable';

export function CastAssignmentTable({ productionId }: { productionId: string }) {
  const { castAssignments, isLoading } = useAssignments(productionId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo<ColumnDef<typeof features,CastAssignment>[]>(
    () => [
      {
        accessorKey: 'userId',
        header: 'Actor',
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-white">{row.original.userId?.fullName}</div>
            <div className="text-xs text-slate-400">{row.original.userId?.email}</div>
          </div>
        ),
      },
      {
        accessorKey: 'characterId',
        header: 'Character',
        cell: ({ row }) => (
          <div>
            <div className="text-white">{row.original.characterId?.name}</div>
            <div className="text-xs text-slate-400">{row.original.characterId?.description}</div>
          </div>
        ),
      },
      {
        accessorKey: 'assignedAt',
        header: 'Assigned At',
        cell: ({ row }) => (
          <span className="text-slate-400 text-sm">
            {new Date(row.original.assignedAt).toLocaleDateString()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Cast Assignments</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Assign Cast
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={castAssignments} 
        isLoading={isLoading} 
        emptyMessage="No cast assigned yet. Assign someone to get started!" 
      />

      {isModalOpen && (
        <AssignCastModal
          productionId={productionId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
