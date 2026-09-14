import apiClient from '../../../services/apiClient';
import type { Department } from '../types/production.types';

export const createDepartment = async (productionId: string, data: Partial<Department>): Promise<Department> => {
  const response = await apiClient.post(`/productions/${productionId}/departments`, data);
  return response.data.data.department;
};

export const getDepartments = async (productionId: string): Promise<Department[]> => {
  const response = await apiClient.get(`/productions/${productionId}/departments`);
  return response.data.data.departments;
};

export const updateDepartment = async (productionId: string, id: string, data: Partial<Department>): Promise<Department> => {
  const response = await apiClient.put(`/productions/${productionId}/departments/${id}`, data);
  return response.data.data.department;
};

export const deleteDepartment = async (productionId: string, id: string): Promise<void> => {
  await apiClient.delete(`/productions/${productionId}/departments/${id}`);
};
