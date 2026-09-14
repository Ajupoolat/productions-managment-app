import React, { useState } from 'react';
import { useAssignments } from '../hooks/useAssignments';
import { Plus } from 'lucide-react';
import { AssignCrewModal } from './AssignCrewModal';

export function CrewAssignmentTable({ productionId }: { productionId: string }) {
  const { crewAssignments, isLoading } = useAssignments(productionId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="text-slate-400">Loading assignments...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Crew Assignments</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> Assign Crew
        </button>
      </div>

      {crewAssignments.length === 0 ? (
        <div className="text-center py-8 text-slate-400">No crew assigned yet. Assign someone to get started!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 text-slate-400 text-sm">
                <th className="py-3 px-4 font-medium">Crew Member</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Position</th>
                <th className="py-3 px-4 font-medium">Assigned At</th>
              </tr>
            </thead>
            <tbody>
              {crewAssignments.map((assignment) => (
                <tr key={assignment._id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">
                    {assignment.userId?.fullName}
                    <div className="text-xs text-slate-400">{assignment.userId?.email}</div>
                  </td>
                  <td className="py-3 px-4 text-white">
                    {assignment.departmentId?.name}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {assignment.workId?.title}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-sm">
                    {new Date(assignment.assignedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AssignCrewModal
          productionId={productionId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
