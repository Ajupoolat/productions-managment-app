import apiClient from '../../../services/apiClient';
import { API_ROUTES } from '../../../constants/api-routes';
import type {OnboardingApplication } from '../types/onboarding.types';

export const submitApplication = async (
  payload: FormData
): Promise<{ application: OnboardingApplication }> => {
  const { data } = await apiClient.post(API_ROUTES.ONBOARDING.SUBMIT, payload);
  return data.data;
};

export const getMyApplication = async (): Promise<{ application: OnboardingApplication }> => {
  const { data } = await apiClient.get(API_ROUTES.ONBOARDING.MY_APPLICATION);
  return data.data;
};
