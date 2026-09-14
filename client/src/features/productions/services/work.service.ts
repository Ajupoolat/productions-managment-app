import apiClient from '../../../services/apiClient';
import type { Work } from '../types/production.types';

export const createWork = async (productionId: string, data: Partial<Work>): Promise<Work> => {
  const response = await apiClient.post(`/productions/${productionId}/works`, data);
  return response.data.data.work;
};

export const getWorks = async (productionId: string): Promise<Work[]> => {
  const response = await apiClient.get(`/productions/${productionId}/works`);
  return response.data.data.works;
};

export const updateWork = async (productionId: string, id: string, data: Partial<Work>): Promise<Work> => {
  const response = await apiClient.put(`/productions/${productionId}/works/${id}`, data);
  return response.data.data.work;
};

export const deleteWork = async (productionId: string, id: string): Promise<void> => {
  await apiClient.delete(`/productions/${productionId}/works/${id}`);
};
