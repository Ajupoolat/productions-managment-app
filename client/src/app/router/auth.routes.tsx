import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import PublicRoute from '../../shared/components/PublicRoute';

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('../../features/auth/pages/SignupPage'));

export const authRoutes: RouteObject = {
  element: <PublicRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'signup', element: <SignupPage /> },
      ],
    },
  ],
};
