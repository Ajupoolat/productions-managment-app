// Centralized API route constants
// All backend endpoint paths used by feature services

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  ONBOARDING: {
    SUBMIT: '/onboarding',
    MY_APPLICATION: '/onboarding/me',
    ADMIN_LIST: '/onboarding/admin',
    ADMIN_DETAIL: (id: string) => `/onboarding/admin/${id}`,
    ADMIN_REVIEW: (id: string) => `/onboarding/admin/${id}/review`,
  },
  ROLES: {
    GET_ALL: '/roles',
  },
} as const;
