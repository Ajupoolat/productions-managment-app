import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDepartments } from '../hooks/useDepartments';
import type { Department } from '../types/production.types';

interface DepartmentModalProps {
  productionId: string;
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentModal({ productionId, department, isOpen, onClose }: DepartmentModalProps) {
  const { addDepartment, editDepartment } = useDepartments(productionId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (department) {
      setName(department.name);
      setDescription(department.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [department]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success = false;

    if (department) {
      success = !!(await editDepartment(department._id, { name, description }));
    } else {
      success = !!(await addDepartment({ name, description }));
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
          {department ? 'Edit Department' : 'Add Department'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              placeholder="E.g., Camera, Makeup, Sound"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              placeholder="Brief description of this department's role"
              rows={3}
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary px-4 py-2.5 rounded-xl font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
