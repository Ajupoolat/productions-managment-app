import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import ProtectedRoute from '../../shared/components/ProtectedRoute';
import PermissionGuard from '../../shared/components/PermissionGuard';
import UserAreaGuard from '../../shared/components/UserAreaGuard';
import DashboardLayout from '../layouts/DashboardLayout';

// Lazy-loaded pages
const DashboardPage = lazy(
  () => import('../../features/dashboard/pages/DashboardPage')
);
const OnboardingFlowPage = lazy(
  () => import('../../features/onboarding/pages/OnboardingFlowPage')
);
const OnboardingStatusPage = lazy(
  () => import('../../features/onboarding/pages/OnboardingStatusPage')
);
const ProductionsPage = lazy(
  () => import('../../features/productions/pages/ProductionsPage')
);
const CastPage = lazy(
  () => import('../../features/admin/pages/CastPage')
);
const CrewPage = lazy(
  () => import('../../features/admin/pages/CrewPage')
);
const UnauthorizedPage = lazy(() => import('../../shared/components/UnauthorizedPage'));

const ProfilePage = lazy(() => import('../../features/profile/pages/ProfilePage'));
const LocationsPage = lazy(
  () => import('../../features/locations/pages/LocationsPage')
);
const FundsPage = lazy(
  () => import('../../features/funds/pages/FundsPage')
);
const CostumesPage = lazy(
  () => import('../../features/costumes/pages/CostumesPage')
);
const NotificationsPage = lazy(
  () => import('../../features/notifications/pages/NotificationsPage')
);

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    // Main dashboard layout with permission-driven sidebar
    {
      element: <UserAreaGuard />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
        // Dashboard — always accessible to authenticated users with a role
        {
          path: '/',
          element: <DashboardPage />,
        },
        // Profile — always accessible to authenticated users with a role
        {
          path: '/profile',
          element: <ProfilePage />,
        },

        // Productions
        {
          element: <PermissionGuard requiredPermission="productions.view" />,
          children: [
            { path: 'productions', element: <ProductionsPage /> },
          ],
        },

        // Cast
        {
          element: <PermissionGuard requiredPermission="cast.view" />,
          children: [
            { path: 'cast', element: <CastPage /> },
          ],
        },

        // Crew
        {
          element: <PermissionGuard requiredPermission="crew.view" />,
          children: [
            { path: 'crew', element: <CrewPage /> },
          ],
        },

        // Locations
        {
          element: <PermissionGuard requiredPermission="locations.view" />,
          children: [
            { path: 'locations', element: <LocationsPage /> },
          ],
        },

        // Fund Requests
        {
          element: <PermissionGuard requiredPermission="funds.view" />,
          children: [
            { path: 'funds', element: <FundsPage /> },
          ],
        },

        // Costumes
        {
          element: <PermissionGuard requiredPermission="costumes.view" />,
          children: [
            { path: 'costumes', element: <CostumesPage /> },
          ],
        },

        // Notifications
        {
          element: <PermissionGuard requiredPermission="notifications.view" />,
          children: [
            { path: 'notifications', element: <NotificationsPage /> },
          ],
        },
          ],
        },
      ],
    },

    // Onboarding pages — outside DashboardLayout (no sidebar for unapproved users)
    {
      children: [
        { path: 'onboarding', element: <OnboardingFlowPage /> },
        { path: 'onboarding/status', element: <OnboardingStatusPage /> },
      ],
    },
  ],
};
