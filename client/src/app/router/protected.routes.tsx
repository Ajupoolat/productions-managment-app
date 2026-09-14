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
const MyProductionsPage = lazy(
  () => import('../../features/productions/pages/MyProductionsPage')
);
const MyAssignmentsPage = lazy(
  () => import('../../features/productions/pages/MyAssignmentsPage')
);
const RestrictedProductionViewPage = lazy(
  () => import('../../features/productions/pages/RestrictedProductionViewPage')
);
const ProductionDashboardLayout = lazy(
  () => import('../layouts/ProductionDashboardLayout')
);
const ProductionOverviewPage = lazy(
  () => import('../../features/productions/pages/ProductionOverviewPage')
);
const ProductionCastPage = lazy(
  () => import('../../features/productions/pages/ProductionCastPage')
);
const ProductionCrewPage = lazy(
  () => import('../../features/productions/pages/ProductionCrewPage')
);
const ProductionLocationsPage = lazy(
  () => import('../../features/productions/pages/ProductionLocationsPage')
);
const ProductionFundsPage = lazy(
  () => import('../../features/productions/pages/ProductionFundsPage')
);
const ProductionCostumesPage = lazy(
  () => import('../../features/productions/pages/ProductionCostumesPage')
);
const CastPage = lazy(
  () => import('../../features/admin/pages/CastPage')
);
const CrewPage = lazy(
  () => import('../../features/admin/pages/CrewPage')
);

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
        // Cast/Crew My Work
        {
          element: <PermissionGuard requiredPermission="my_work.view" />,
          children: [
            {
              path: '/my-productions',
              element: <MyProductionsPage />,
            },
            {
              path: '/my-productions/:id',
              element: <RestrictedProductionViewPage />,
            },
            {
              path: '/my-assignments',
              element: <MyAssignmentsPage />,
            },
          ],
        },

        // Productions
        {
          element: <PermissionGuard requiredPermission="productions.view" />,
          children: [
            { path: 'productions', element: <ProductionsPage /> },
            {
              path: 'productions/:id',
              element: <ProductionDashboardLayout />,
              children: [
                { index: true, element: <ProductionOverviewPage /> },
                { path: 'cast', element: <ProductionCastPage /> },
                { path: 'crew', element: <ProductionCrewPage /> },
                { path: 'locations', element: <ProductionLocationsPage /> },
                { path: 'funds', element: <ProductionFundsPage /> },
                { path: 'costumes', element: <ProductionCostumesPage /> },
              ],
            },
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
