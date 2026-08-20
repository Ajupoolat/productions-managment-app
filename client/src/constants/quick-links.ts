import {
  Film,
  Users,
  HardHat,
  MapPin,
  DollarSign,
  Shirt,
  Bell,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';

interface QuickLinkItem {
  label: string;
  description: string;
  path: string;
  icon: LucideIcon;
  permission: string;
  gradient: string;
}
export const QuickLinks: QuickLinkItem[] = [
  {
    label: 'Productions',
    description: 'View and manage productions',
    path: '/productions',
    icon: Film,
    permission: 'productions.view',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    label: 'Cast',
    description: 'View cast assignments',
    path: '/cast',
    icon: Users,
    permission: 'cast.view',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    label: 'Crew',
    description: 'View crew assignments',
    path: '/crew',
    icon: HardHat,
    permission: 'crew.view',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    label: 'Locations',
    description: 'Browse and request locations',
    path: '/locations',
    icon: MapPin,
    permission: 'locations.view',
    gradient: 'from-emerald-500/20 to-green-500/20',
  },
  {
    label: 'Fund Requests',
    description: 'Submit and track fund requests',
    path: '/funds',
    icon: DollarSign,
    permission: 'funds.view',
    gradient: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    label: 'Costumes',
    description: 'Manage costume inventory',
    path: '/costumes',
    icon: Shirt,
    permission: 'costumes.view',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    label: 'Onboarding Reviews',
    description: 'Review onboarding applications',
    path: '/admin/onboarding',
    icon: ClipboardList,
    permission: 'onboarding.view',
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
];