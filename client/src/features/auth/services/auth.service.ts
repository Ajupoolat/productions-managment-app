import apiClient from '../../../services/apiClient';
import { API_ROUTES } from '../../../constants/api-routes';
import type { LoginPayload, SignupPayload, AuthResponse } from '../types/auth.types';

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, payload);
  return data;
};

export const registerUser = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(API_ROUTES.AUTH.REGISTER, payload);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post(API_ROUTES.AUTH.LOGOUT);
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await apiClient.get<AuthResponse>(API_ROUTES.AUTH.ME);
  return data;
};
