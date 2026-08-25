import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { getProductions, getProductionById } from '../../productions/services/production.service';
import type { Production } from '../../productions/types/production.types';

export function useAdminProductions(id?: string, paramsObject?: any) {
  const [productions, setProductions] = useState<Production[]>([]);
  const [production, setProduction] = useState<Production | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [meta, setMeta] = useState<any>(null);

  const fetchProductions = useCallback(async (params?: any) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { productions: data, meta: metaData } = await getProductions(params);
      setProductions(data);
      setMeta(metaData);
    } catch (error: any) {
      setIsError(true);
      toast.error(error.response?.data?.message || 'Failed to fetch productions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductionById = useCallback(async (prodId: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getProductionById(prodId);
      setProduction(data);
    } catch (error: any) {
      setIsError(true);
      toast.error(error.response?.data?.message || 'Failed to fetch production details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProductionById(id);
    } else {
      fetchProductions(paramsObject);
    }
  }, [id, fetchProductions, fetchProductionById, paramsObject]);

  return {
    productions,
    production,
    isLoading,
    isError,
    meta,
    refetch: fetchProductions
  };
}
