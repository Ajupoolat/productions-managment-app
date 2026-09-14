import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';
import { useDepartments } from '../hooks/useDepartments';
import { useWorks } from '../hooks/useWorks';
import { getAvailableTalent } from '../../users/services/user.service';

interface AssignCrewModalProps {
  productionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignCrewModal({ productionId, isOpen, onClose }: AssignCrewModalProps) {
  const { addCrewAssignment } = useAssignments(productionId);
  const { departments } = useDepartments(productionId);
  const { works } = useWorks(productionId);
  
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedWork, setSelectedWork] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getAvailableTalent('CREW').then(setAvailableUsers);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const availableWorks = works.filter((w) => 
    (typeof w.departmentId === 'object' ? (w.departmentId as any)._id : w.departmentId) === selectedDepartment
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await addCrewAssignment({ 
      userId: selectedUser, 
      departmentId: selectedDepartment, 
      workId: selectedWork 
    });
    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 rounded-2xl glass-panel relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Assign Crew Member</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Select Crew Member</label>
            <select
              required
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            >
              <option value="" disabled>-- Choose a crew member --</option>
              {availableUsers.map((user) => (
                <option key={user._id} value={user._id}>{user.fullName} ({user.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Select Department</label>
            <select
              required
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedWork(''); // Reset work when department changes
              }}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            >
              <option value="" disabled>-- Choose a department --</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
            {departments.length === 0 && (
              <p className="text-xs text-red-400 mt-1">Please create a department first.</p>
            )}
          </div>

          {selectedDepartment && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Select Position</label>
              <select
                required
                value={selectedWork}
                onChange={(e) => setSelectedWork(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              >
                <option value="" disabled>-- Choose a position --</option>
                {availableWorks.map((work) => (
                  <option key={work._id} value={work._id}>{work.title}</option>
                ))}
              </select>
              {availableWorks.length === 0 && (
                <p className="text-xs text-red-400 mt-1">No positions found for this department. Create one first.</p>
              )}
            </div>
          )}
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || departments.length === 0 || (selectedDepartment && availableWorks.length === 0)}
              className="w-full btn-primary px-4 py-2.5 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
