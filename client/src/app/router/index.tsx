import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import { authRoutes } from './auth.routes';
import { protectedRoutes } from './protected.routes';
import { adminRoutes } from './admin.routes';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Auth routes (login, signup) — guarded by PublicRoute
      authRoutes,

      // Protected routes (dashboard, onboarding) — guarded by ProtectedRoute
      protectedRoutes,

      // Admin routes — guarded by ProtectedRoute
      adminRoutes,

      // Catch-all
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
