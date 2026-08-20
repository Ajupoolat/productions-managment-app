import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// /**
//  * PublicRoute — for pages like Login/Signup.
//  * Redirects authenticated users away to the home page.
//  */
// export default function PublicRoute() {
//   const { isAuthenticated } = useAuth();

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }

export default function PublicRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Check if the user is an admin
    const isAdmin = user?.roleId?.name === 'SUPER_ADMIN';
    
    // Send them to the right place
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
}
