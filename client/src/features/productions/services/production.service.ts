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

export const assignCast = async (productionId: string, data: { userId: string, characterId: string }): Promise<any> => {
  const response = await apiClient.post(`/productions/${productionId}/cast`, data);
  return response.data.data.assignment;
};

export const getCastAssignments = async (productionId: string): Promise<any[]> => {
  const response = await apiClient.get(`/productions/${productionId}/cast`);
  return response.data.data.assignments;
};

export const assignCrew = async (productionId: string, data: { userId: string, departmentId: string, workId: string }): Promise<any> => {
  const response = await apiClient.post(`/productions/${productionId}/crew`, data);
  return response.data.data.assignment;
};

export const getCrewAssignments = async (productionId: string): Promise<any[]> => {
  const response = await apiClient.get(`/productions/${productionId}/crew`);
  return response.data.data.assignments;
};
