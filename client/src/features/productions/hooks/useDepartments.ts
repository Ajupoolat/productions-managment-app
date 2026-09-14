import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { createDepartment, getDepartments, updateDepartment, deleteDepartment } from '../services/department.service';
import type { Department } from '../types/production.types';

export function useDepartments(productionId: string) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDepartments = useCallback(async () => {
    if (!productionId) return;
    try {
      setIsLoading(true);
      const data = await getDepartments(productionId);
      setDepartments(data);
    } catch (error) {
      toast.error('Failed to fetch departments');
    } finally {
      setIsLoading(false);
    }
  }, [productionId]);

  const addDepartment = async (data: Partial<Department>) => {
    try {
      const newDept = await createDepartment(productionId, data);
      setDepartments((prev) => [...prev, newDept]);
      toast.success('Department added successfully');
      return newDept;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add department');
      return null;
    }
  };

  const editDepartment = async (id: string, data: Partial<Department>) => {
    try {
      const updated = await updateDepartment(productionId, id, data);
      setDepartments((prev) => prev.map((d) => (d._id === id ? updated : d)));
      toast.success('Department updated successfully');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update department');
      return null;
    }
  };

  const removeDepartment = async (id: string) => {
    try {
      await deleteDepartment(productionId, id);
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      toast.success('Department deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete department');
      return false;
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return { departments, isLoading, addDepartment, editDepartment, removeDepartment, fetchDepartments };
}
