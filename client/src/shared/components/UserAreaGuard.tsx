import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SystemRole } from '../../constants/roles';

/**
 * UserAreaGuard — prevents Admin users from accessing the normal user routes (/).
 * If a Super Admin tries to navigate to the normal user dashboard, they are 
 * forcefully redirected back to their own /admin portal.
 */
export default function UserAreaGuard() {
  const { user } = useAuth();

  const isAdmin = user?.roleId?.name === SystemRole.SUPER_ADMIN;

  if (isAdmin) {
    // Admins are not allowed in the standard user area! Kick them to /admin.
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
