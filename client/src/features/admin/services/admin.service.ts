import apiClient from '../../../services/apiClient';
import { API_ROUTES } from '../../../constants/api-routes';

export const getAllApplications = async () => {
  const { data } = await apiClient.get(API_ROUTES.ONBOARDING.ADMIN_LIST);
  return data.data.applications;
};

export const getApplicationById = async (id: string) => {
  const { data } = await apiClient.get(API_ROUTES.ONBOARDING.ADMIN_DETAIL(id));
  return data.data.application;
};

export const reviewApplication = async (
  id: string,
  status: string,
  reviewComments?: string,
  roleId?: string
) => {
  const payload: any = { status, reviewComments };
  if (roleId) {
    payload.roleId = roleId;
  }
  
  const { data } = await apiClient.patch(API_ROUTES.ONBOARDING.ADMIN_REVIEW(id), payload);
  return data.data.application;
};

export const getAllRoles = async () => {
  const { data } = await apiClient.get(API_ROUTES.ROLES.GET_ALL);
  return data.data.roles;
};
