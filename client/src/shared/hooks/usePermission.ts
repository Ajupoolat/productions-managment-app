import { useMemo } from 'react';
import { useAppStore } from '../../store/app.store';

/**
 * usePermission — provides efficient, memoized permission checking.
 * Reads from the existing Zustand app store user data.
 * Does NOT create a separate permission store.
 */
export const usePermission = () => {
  const user = useAppStore((state) => state.user);

  // Memoize the permission set so we don't rebuild it on every render
  const permissionSet = useMemo(() => {
    if (!user?.roleId?.permissionIds) return new Set<string>();
    return new Set(user.roleId.permissionIds.map((p) => p.key));
  }, [user?.roleId?.permissionIds]);

  /**
   * Check if the user has a specific permission.
   */
  const hasPermission = (permissionKey: string): boolean => {
    return permissionSet.has(permissionKey);
  };

  /**
   * Check if the user has at least one of the given permissions.
   */
  const hasAnyPermission = (permissionKeys: string[]): boolean => {
    return permissionKeys.some((key) => permissionSet.has(key));
  };

  return {
    hasPermission,
    hasAnyPermission,
    permissions: permissionSet,
  };
};
