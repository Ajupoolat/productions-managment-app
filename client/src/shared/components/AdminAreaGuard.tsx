import { Navigate, Outlet } from 'react-router-dom';
import { usePermission } from '../hooks/usePermission';

/**
 * AdminAreaGuard — prevents non-admin users from accessing the /admin URL routes.
 * It defines an "Admin" as any user who has at least one administrative permission.
 */
export default function AdminAreaGuard() {
  const { hasAnyPermission } = usePermission();

  // These are the core administrative permissions.
  // If a user has NONE of these, they have no business in the /admin area.
  const adminPermissions = [
    'users.view',
    'roles.view',
    'permissions.view',
    'onboarding.view',
    'audit_logs.view',
  ];

  if (!hasAnyPermission(adminPermissions)) {
    // User is not an admin, redirect them to the standard user dashboard
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
