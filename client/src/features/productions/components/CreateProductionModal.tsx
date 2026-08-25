import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { createProductionSchema } from '../schemas/production.schema';
import type { CreateProductionInput, CreateProductionValues } from '../schemas/production.schema';
import { FormField } from '../../../shared/components/ui/Form/FormField';
import { Input } from '../../../shared/components/ui/Form/Inputs';
import { Textarea } from '../../../shared/components/ui/Form/Textarea';
import { useProductions } from '../hooks/useProductions';

import type { Production } from '../types/production.types';

interface CreateProductionModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Production | null;
}

export function CreateProductionModal({ onClose, onSuccess, initialData }: CreateProductionModalProps) {
  const { createProduction, updateProduction, isCreating } = useProductions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductionInput>({
    resolver: zodResolver(createProductionSchema),
    mode: 'onTouched',
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description || '',
      startDate: new Date(initialData.startDate).toISOString().split('T')[0],
      endDate: new Date(initialData.endDate).toISOString().split('T')[0],
      budget: initialData.budget,
      notes: initialData.notes || '',
    } : {
      budget: 0,
    }
  });

  const onSubmit = async (data: CreateProductionValues) => {
    let success = false;
    if (initialData) {
      const updated = await updateProduction(initialData._id, data);
      success = !!updated;
    } else {
      const created = await createProduction(data);
      success = !!created;
    }
    
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 rounded-2xl glass-panel relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData ? 'Edit Production' : 'Create New Production'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Production Name" error={errors.name?.message}>
            <Input
              {...register('name')}
              placeholder="e.g. Avatar 3"
              error={!!errors.name}
            />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <Textarea
              {...register('description')}
              placeholder="Brief description of the production..."
              error={!!errors.description}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Date" error={errors.startDate?.message}>
              <Input
                type="date"
                {...register('startDate')}
                error={!!errors.startDate}
              />
            </FormField>

            <FormField label="End Date" error={errors.endDate?.message}>
              <Input
                type="date"
                {...register('endDate')}
                error={!!errors.endDate}
              />
            </FormField>
          </div>

          <FormField label="Budget (USD)" error={errors.budget?.message}>
            <Input
              type="number"
              {...register('budget', { valueAsNumber: true })}
              placeholder="0.00"
              error={!!errors.budget}
            />
          </FormField>

          <FormField label="Additional Notes" error={errors.notes?.message}>
            <Textarea
              {...register('notes')}
              placeholder="Any other details..."
              error={!!errors.notes}
            />
          </FormField>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="btn-primary"
            >
              {isCreating ? <Loader2 className="animate-spin" size={20} /> : (initialData ? 'Save Changes' : 'Create Production')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
