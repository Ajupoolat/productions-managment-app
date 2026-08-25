import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import ProtectedRoute from '../../shared/components/ProtectedRoute';
import PermissionGuard from '../../shared/components/PermissionGuard';
import AdminAreaGuard from '../../shared/components/AdminAreaGuard';
import DashboardLayout from '../layouts/DashboardLayout';

// Lazy-loaded admin pages
const DashboardPage = lazy(
  () => import('../../features/dashboard/pages/DashboardPage')
);
const OnboardingApplicationsPage = lazy(
  () => import('../../features/admin/pages/OnboardingApplicationsPage')
);
const ApplicationReviewPage = lazy(
  () => import('../../features/admin/pages/ApplicationReviewPage')
);
const UsersPage = lazy(
  () => import('../../features/users/pages/UsersPage')
);
const ProfilePage = lazy(() => import('../../features/profile/pages/ProfilePage'));
const RolesPage = lazy(
  () => import('../../features/roles/pages/RolesPage')
);
const PermissionsPage = lazy(
  () => import('../../features/permissions/pages/PermissionsPage')
);
const AdminProductionsPage = lazy(
  () => import('../../features/admin/pages/AdminProductionsPage')
);
const AdminProductionDetailsPage = lazy(
  () => import('../../features/admin/pages/AdminProductionDetailsPage')
);
const LocationsPage = lazy(
  () => import('../../features/locations/pages/LocationsPage')
);
const FundsPage = lazy(
  () => import('../../features/funds/pages/FundsPage')
);
const CostumesPage = lazy(
  () => import('../../features/costumes/pages/CostumesPage')
);
const AuditLogsPage = lazy(
  () => import('../../features/audit-logs/pages/AuditLogsPage')
);

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <ProtectedRoute />,
  children: [
    {
      element: <AdminAreaGuard />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
        // Admin Dashboard
        {
          index: true,
          element: <DashboardPage />,
        },
        // Profile
        {
          path: 'profile',
          element: <ProfilePage />,
        },

        // Onboarding Reviews
        {
          element: <PermissionGuard requiredPermission="onboarding.view" />,
          children: [
            { path: 'onboarding', element: <OnboardingApplicationsPage /> },
            { path: 'onboarding/:id', element: <ApplicationReviewPage /> },
          ],
        },

        // Users
        {
          element: <PermissionGuard requiredPermission="users.view" />,
          children: [
            { path: 'users', element: <UsersPage /> },
          ],
        },

        // Roles
        {
          element: <PermissionGuard requiredPermission="roles.view" />,
          children: [
            { path: 'roles', element: <RolesPage /> },
          ],
        },

        // Permissions
        {
          element: <PermissionGuard requiredPermission="permissions.view" />,
          children: [
            { path: 'permissions', element: <PermissionsPage /> },
          ],
        },

        // Productions
        {
          element: <PermissionGuard requiredPermission="productions.view" />,
          children: [
            { path: 'productions', element: <AdminProductionsPage /> },
            { path: 'productions/:id', element: <AdminProductionDetailsPage /> },
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

        // Audit Logs
        {
          element: <PermissionGuard requiredPermission="audit_logs.view" />,
          children: [
            { path: 'audit-logs', element: <AuditLogsPage /> },
          ],
        },
          ],
        },
      ],
    },
  ],
};
