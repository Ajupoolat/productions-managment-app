import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute — ensures the user is authenticated.
 * Waits for checkAuth to finish before making a redirect decision.
 *
 * Handles the onboarding flow:
 *  - Users without a roleId are forced into /onboarding or /onboarding/status
 *  - Users with a roleId are blocked from visiting /onboarding
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, user, onboardingApplication } = useAuth();
  const location = useLocation();

  // Wait for checkAuth() to finish before deciding
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Intercept users who haven't completed onboarding or haven't been approved yet (roleId is null)
  if (!user?.roleId) {
    if (onboardingApplication) {
      if (onboardingApplication.status === 'CHANGES_REQUESTED') {
        // If changes requested, allow them to visit either /onboarding/status OR /onboarding
        if (location.pathname !== '/onboarding/status' && location.pathname !== '/onboarding') {
          return <Navigate to="/onboarding/status" replace />;
        }
      } else {
        // If PENDING (or somehow APPROVED but role is null), force to /onboarding/status
        if (location.pathname !== '/onboarding/status') {
          return <Navigate to="/onboarding/status" replace />;
        }
      }
    } else {
      // If they haven't submitted the app, they MUST go to /onboarding
      console.log('is this is working')
      if (location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />;
      }
    }
  } else {
    // If they ARE onboarded and approved, they shouldn't be visiting the onboarding flow
    if (location.pathname.startsWith('/onboarding')) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
