import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  isSubmitting?: boolean;
  submitText?: string;
  children: ReactNode;
  submitDisabled?: boolean;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  isSubmitting = false,
  submitText = 'Save',
  children,
  submitDisabled = false,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 rounded-2xl glass-panel relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || submitDisabled}
              className="w-full btn-primary px-4 py-2.5 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
