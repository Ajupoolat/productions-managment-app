import type { Production } from '../types/production.types';
import type { CreateProductionValues } from '../schemas/production.schema';
import apiClient from '../../../services/apiClient';

export const createProduction = async (data: CreateProductionValues): Promise<Production> => {
  console.log('this is data in production service api call:',data)
  const response = await apiClient.post('/productions', data);
  return response.data.data.production;
};

export const getProductions = async (params?: any): Promise<{ productions: Production[], meta: any }> => {
  const response = await apiClient.get('/productions', { params });
  return {
    productions: response.data.data.productions,
    meta: response.data.meta
  };
};

export const getProductionById = async (id: string): Promise<Production> => {
  const response = await apiClient.get(`/productions/${id}`);
  return response.data.data.production;
};

export const updateProduction = async (id: string, data: CreateProductionValues): Promise<Production> => {
  const response = await apiClient.put(`/productions/${id}`, data);
  return response.data.data.production;
};

export const deleteProduction = async (id: string): Promise<void> => {
  await apiClient.delete(`/productions/${id}`);
};
