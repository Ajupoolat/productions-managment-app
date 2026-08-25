import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { createProduction as createProductionApi, getProductions, getProductionById, updateProduction as updateProductionApi, deleteProduction as deleteProductionApi } from '../services/production.service';
import type { CreateProductionValues } from '../schemas/production.schema';
import type { Production } from '../types/production.types';

interface UseProductionsOptions {
  refreshTrigger?: number;
  id?: string;
  paramsObject?: any;
}

export function useProductions({
  refreshTrigger = 0,
  id,
  paramsObject,
}: UseProductionsOptions = {}) {
  const [isCreating, setIsCreating] = useState(false);
  const [productions, setProductions] = useState<Production[]>([]);
  const [production, setProduction] = useState<Production | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);

  const createProduction = async (data: CreateProductionValues): Promise<Production | null> => {
    try {
      setIsCreating(true);
      const newProduction = await createProductionApi(data);
      toast.success('Production created successfully!');
      return newProduction;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create production');
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const fetchProductions = useCallback(async (params?: any) => {
    try {
      setIsLoading(true);
      const { productions: data, meta: metaData } = await getProductions(params);
      setProductions(data);
      setMeta(metaData);
    } catch (error) {
      console.error('Failed to fetch productions', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductionById = useCallback(async (prodId: string) => {
    try {
      setIsLoading(true);
      const data = await getProductionById(prodId);
      setProduction(data);
    } catch (error) {
      console.error('Failed to fetch production details', error);
      toast.error('Failed to fetch production details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProduction = async (prodId: string, data: CreateProductionValues): Promise<Production | null> => {
    try {
      setIsCreating(true);
      const updated = await updateProductionApi(prodId, data);
      toast.success('Production updated successfully!');
      
      // Update local state if it's the current detail view
      if (production?._id === prodId) {
        setProduction(updated);
      }
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update production');
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteProduction = async (prodId: string): Promise<boolean> => {
    try {
      await deleteProductionApi(prodId);
      toast.success('Production deleted successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete production');
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductionById(id);
    } else {
      fetchProductions(paramsObject);
    }
  }, [id, fetchProductions, fetchProductionById, refreshTrigger, paramsObject]);

  return {
    createProduction,
    updateProduction,
    deleteProduction,
    isCreating,
    productions,
    production,
    isLoading,
    meta,
    refetch: fetchProductions,
    fetchProductionById,
  };
}
