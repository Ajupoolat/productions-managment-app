import { create } from 'zustand';
import apiClient from '../services/apiClient';
import { API_ROUTES } from '../constants/api-routes';

// Global user type — shared across the application
export interface User {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  isActive: boolean;
  roleId?: {
    _id: string;
    name: string;
    permissionIds?: Array<{ _id: string; key: string; description?: string }>;
  };
  contractorType?: string;
}

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasOnboardingApplication: boolean;

  // Auth actions
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (data: Partial<User>) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasOnboardingApplication: false,

  setUser: (user) =>
    set({ user, isAuthenticated: true, isLoading: false }),

  clearUser: () =>
    set({ user: null, isAuthenticated: false, isLoading: false, hasOnboardingApplication: false }),

  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const { data } = await apiClient.get(API_ROUTES.AUTH.ME);
      const user = data.data.user;

      // Check onboarding status if they are not approved yet
      let hasApplication = false;
      if (!user.roleId) {
        try {
          await apiClient.get(API_ROUTES.ONBOARDING.MY_APPLICATION);
          hasApplication = true;
        } catch {
          hasApplication = false;
        }
      }

      set({ user, isAuthenticated: true, hasOnboardingApplication: hasApplication });
    } catch (error: any) {
      console.error('checkAuth FAILED:', error?.response?.status, error?.response?.data, error?.message);
      set({ user: null, isAuthenticated: false, hasOnboardingApplication: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
