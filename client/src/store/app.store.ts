import { create } from 'zustand';
import apiClient from '../services/apiClient';
import { API_ROUTES } from '../constants/api-routes';
import type { User } from '../shared/types/user.types';
import type { OnboardingApplication } from '../shared/types/onboarding.types';


interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingApplication: OnboardingApplication | null; // Changed from hasOnboardingApplication

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
  onboardingApplication: null,

  setUser: (user) =>
    set({ user, isAuthenticated: true, isLoading: false }),

  clearUser: () =>
    set({ user: null, isAuthenticated: false, isLoading: false, onboardingApplication: null }),

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
      let application = null;
      if (!user.roleId) {
        try {
          const appData = await apiClient.get(API_ROUTES.ONBOARDING.MY_APPLICATION);
          application = appData.data.data.application;
        } catch {
          application = null;
        }
      }

      set({ user, isAuthenticated: true, onboardingApplication: application });
    } catch (error: any) {
      console.error('checkAuth FAILED:', error?.response?.status, error?.response?.data, error?.message);
      set({ user: null, isAuthenticated: false, onboardingApplication: null });
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
      set({
        user: null,
        isAuthenticated: false,
        onboardingApplication: null
      });
    }
  },
}));
