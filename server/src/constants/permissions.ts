/**
 * All permission definitions for the system.
 * Each permission has a key (module.action), module, action, and description.
 */
export const PERMISSIONS = [
  // USERS
  { key: 'users.view', module: 'users', action: 'view', description: 'View user profiles and listings' },
  { key: 'users.update', module: 'users', action: 'update', description: 'Update user details' },
  { key: 'users.deactivate', module: 'users', action: 'deactivate', description: 'Deactivate user accounts' },

  // ROLES & PERMISSIONS
  { key: 'roles.view', module: 'roles', action: 'view', description: 'View system roles' },
  { key: 'roles.create', module: 'roles', action: 'create', description: 'Create new roles' },
  { key: 'roles.update', module: 'roles', action: 'update', description: 'Update role details and permissions' },
  { key: 'permissions.view', module: 'permissions', action: 'view', description: 'View available permissions' },
  { key: 'permissions.manage', module: 'permissions', action: 'manage', description: 'Manage permission assignments' },

  // ONBOARDING
  { key: 'onboarding.view', module: 'onboarding', action: 'view', description: 'View onboarding applications' },
  { key: 'onboarding.review', module: 'onboarding', action: 'review', description: 'Review onboarding applications' },
  { key: 'onboarding.approve', module: 'onboarding', action: 'approve', description: 'Approve onboarding applications' },
  { key: 'onboarding.reject', module: 'onboarding', action: 'reject', description: 'Reject onboarding applications' },

  // PRODUCTIONS
  { key: 'productions.view', module: 'productions', action: 'view', description: 'View productions' },
  { key: 'productions.create', module: 'productions', action: 'create', description: 'Create new productions' },
  { key: 'productions.update', module: 'productions', action: 'update', description: 'Update production details' },

  // CAST
  { key: 'cast.view', module: 'cast', action: 'view', description: 'View cast assignments' },
  { key: 'cast.assign', module: 'cast', action: 'assign', description: 'Assign cast to productions' },

  // CREW
  { key: 'crew.view', module: 'crew', action: 'view', description: 'View crew assignments' },
  { key: 'crew.assign', module: 'crew', action: 'assign', description: 'Assign crew to productions' },

  // LOCATIONS
  { key: 'locations.view', module: 'locations', action: 'view', description: 'View locations' },
  { key: 'locations.create', module: 'locations', action: 'create', description: 'Create new locations' },
  { key: 'locations.update', module: 'locations', action: 'update', description: 'Update location details' },
  { key: 'locations.request', module: 'locations', action: 'request', description: 'Request location bookings' },
  { key: 'locations.approve', module: 'locations', action: 'approve', description: 'Approve location requests' },

  // FUNDS
  { key: 'funds.view', module: 'funds', action: 'view', description: 'View fund requests' },
  { key: 'funds.request', module: 'funds', action: 'request', description: 'Submit fund requests' },
  { key: 'funds.approve', module: 'funds', action: 'approve', description: 'Approve fund requests' },
  { key: 'funds.reject', module: 'funds', action: 'reject', description: 'Reject fund requests' },

  // COSTUMES
  { key: 'costumes.view', module: 'costumes', action: 'view', description: 'View costumes' },
  { key: 'costumes.create', module: 'costumes', action: 'create', description: 'Create new costumes' },
  { key: 'costumes.update', module: 'costumes', action: 'update', description: 'Update costume details' },
  { key: 'costumes.assign', module: 'costumes', action: 'assign', description: 'Assign costumes to cast' },

  // REPORTS & AUDIT
  { key: 'reports.view', module: 'reports', action: 'view', description: 'View reports and analytics' },
  { key: 'audit_logs.view', module: 'audit_logs', action: 'view', description: 'View audit logs' },

  // NOTIFICATIONS
  { key: 'notifications.view', module: 'notifications', action: 'view', description: 'View notifications' },
] as const;
