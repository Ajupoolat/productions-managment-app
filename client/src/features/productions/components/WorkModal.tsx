import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useWorks } from '../hooks/useWorks';
import { useDepartments } from '../hooks/useDepartments';
import type { Work } from '../types/production.types';

interface WorkModalProps {
  productionId: string;
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkModal({ productionId, work, isOpen, onClose }: WorkModalProps) {
  const { addWork, editWork } = useWorks(productionId);
  const { departments } = useDepartments(productionId);
  const [departmentId, setDepartmentId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (work) {
      setTitle(work.title);
      setDescription(work.description || '');
      setDepartmentId(typeof work.departmentId === 'object' ? (work.departmentId as any)._id : work.departmentId);
    } else {
      setTitle('');
      setDescription('');
      setDepartmentId('');
    }
  }, [work]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success = false;

    if (work) {
      success = !!(await editWork(work._id, { title, description, departmentId }));
    } else {
      success = !!(await addWork({ title, description, departmentId }));
    }

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

        <h2 className="text-xl font-bold text-white mb-6">
          {work ? 'Edit Position' : 'Add Position'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
            <select
              required
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
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
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Position Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              placeholder="E.g., Key Grip, Makeup Artist"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              placeholder="Brief description of this role"
              rows={3}
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || departments.length === 0}
              className="w-full btn-primary px-4 py-2.5 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Position'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
