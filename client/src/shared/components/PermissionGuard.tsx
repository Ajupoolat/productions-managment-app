import { Outlet } from 'react-router-dom';
import { usePermission } from '../hooks/usePermission';
import UnauthorizedPage from './UnauthorizedPage';

interface PermissionGuardProps {
  /** The permission key required to access this route. */
  requiredPermission: string;
}

/**
 * PermissionGuard — route-level guard that checks if the authenticated user
 * has the required permission. If not, renders the 403 Unauthorized page.
 *
 * Usage in route config:
 *   { element: <PermissionGuard requiredPermission="funds.view" />, children: [...] }
 */
export default function PermissionGuard({ requiredPermission }: PermissionGuardProps) {
  const { hasPermission } = usePermission();

  if (!hasPermission(requiredPermission)) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}
