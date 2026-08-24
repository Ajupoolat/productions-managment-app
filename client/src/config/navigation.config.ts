import {
  LayoutDashboard,
  Film,
  Users,
  HardHat,
  MapPin,
  DollarSign,
  Shirt,
  Bell,
  ClipboardList,
  Shield,
  KeyRound,
  FileText,
  User,
  type LucideIcon,
} from 'lucide-react';

/**
 * Navigation item definition.
 * If `permission` is undefined, the item is always visible (e.g., Dashboard).
 */
export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: string;
}

/**
 * Navigation section (for grouping items in the sidebar).
 */
export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

// ============================================
// USER NAVIGATION — shown under /
// ============================================
export const userNavigationSections: NavigationSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
      },
      {
        label: 'My Profile',
        path: '/profile',
        icon: User,
      },
    ],
  },
  {
    title: 'Production',
    items: [
      {
        label: 'Productions',
        path: '/productions',
        icon: Film,
        permission: 'productions.view',
      },
      {
        label: 'Cast',
        path: '/cast',
        icon: Users,
        permission: 'cast.view',
      },
      {
        label: 'Crew',
        path: '/crew',
        icon: HardHat,
        permission: 'crew.view',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        label: 'Locations',
        path: '/locations',
        icon: MapPin,
        permission: 'locations.view',
      },
      {
        label: 'Fund Requests',
        path: '/funds',
        icon: DollarSign,
        permission: 'funds.view',
      },
      {
        label: 'Costumes',
        path: '/costumes',
        icon: Shirt,
        permission: 'costumes.view',
      },
    ],
  },
];

// ============================================
// ADMIN NAVIGATION — shown under /admin
// ============================================
export const adminNavigationSections: NavigationSection[] = [
  {
    items: [
      {
        label: 'Admin Dashboard',
        path: '/admin',
        icon: LayoutDashboard,
      },
      {
        label: 'My Profile',
        path: '/admin/profile',
        icon: User,
      },
    ],
  },
  {
    title: 'User Management',
    items: [
      {
        label: 'Onboarding Reviews',
        path: '/admin/onboarding',
        icon: ClipboardList,
        permission: 'onboarding.view',
      },
      {
        label: 'Users',
        path: '/admin/users',
        icon: Users,
        permission: 'users.view',
      },
      {
        label: 'Roles',
        path: '/admin/roles',
        icon: Shield,
        permission: 'roles.view',
      },
      {
        label: 'Permissions',
        path: '/admin/permissions',
        icon: KeyRound,
        permission: 'permissions.view',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Productions',
        path: '/admin/productions',
        icon: Film,
        permission: 'productions.view',
      },
      {
        label: 'Locations',
        path: '/admin/locations',
        icon: MapPin,
        permission: 'locations.view',
      },
      {
        label: 'Fund Requests',
        path: '/admin/funds',
        icon: DollarSign,
        permission: 'funds.view',
      },
      {
        label: 'Costumes',
        path: '/admin/costumes',
        icon: Shirt,
        permission: 'costumes.view',
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        label: 'Audit Logs',
        path: '/admin/audit-logs',
        icon: FileText,
        permission: 'audit_logs.view',
      },
    ],
  },
];
