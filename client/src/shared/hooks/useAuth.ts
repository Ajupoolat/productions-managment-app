import { useAppStore } from '../../store/app.store';
import { usePermission } from './usePermission';
import type { User } from '../../store/app.store';

/**
 * useAuth — convenience hook wrapping the global app store's auth selectors.
 * Provides a clean API for components that only need auth-related state.
 */
export const useAuth = () => {
  const user = useAppStore((state) => state.user);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isLoading = useAppStore((state) => state.isLoading);
  const onboardingApplication = useAppStore((state) => state.onboardingApplication);
  const logout = useAppStore((state) => state.logout);

  const { hasPermission, hasAnyPermission } = usePermission();

  const hasRole = (roleName: string): boolean => {
    return user?.roleId?.name === roleName;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    onboardingApplication,
    logout,
    hasPermission,
    hasAnyPermission,
    hasRole,
  };
};

export type { User };
