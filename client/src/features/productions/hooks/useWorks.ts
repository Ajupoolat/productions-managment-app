import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { createWork, getWorks, updateWork, deleteWork } from '../services/work.service';
import type { Work } from '../types/production.types';

export function useWorks(productionId: string) {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorks = useCallback(async () => {
    if (!productionId) return;
    try {
      setIsLoading(true);
      const data = await getWorks(productionId);
      setWorks(data);
    } catch (error) {
      toast.error('Failed to fetch works');
    } finally {
      setIsLoading(false);
    }
  }, [productionId]);

  const addWork = async (data: Partial<Work>) => {
    try {
      const newWork = await createWork(productionId, data);
      setWorks((prev) => [...prev, newWork]);
      toast.success('Work added successfully');
      return newWork;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add work');
      return null;
    }
  };

  const editWork = async (id: string, data: Partial<Work>) => {
    try {
      const updated = await updateWork(productionId, id, data);
      setWorks((prev) => prev.map((w) => (w._id === id ? updated : w)));
      toast.success('Work updated successfully');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update work');
      return null;
    }
  };

  const removeWork = async (id: string) => {
    try {
      await deleteWork(productionId, id);
      setWorks((prev) => prev.filter((w) => w._id !== id));
      toast.success('Work deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete work');
      return false;
    }
  };

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return { works, isLoading, addWork, editWork, removeWork, fetchWorks };
}
