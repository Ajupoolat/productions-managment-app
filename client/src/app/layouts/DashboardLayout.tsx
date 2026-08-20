import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { usePermission } from '../../shared/hooks/usePermission';
import {
  userNavigationSections,
  adminNavigationSections,
  type NavigationSection,
} from '../../config/navigation.config';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * DashboardLayout — wraps the main protected app area.
 * Contains a top navbar, a sidebar, and the main content area.
 *
 * The sidebar navigation is entirely driven by permissions, not role names.
 * It detects whether we are in the /admin area and shows the correct navigation.
 */
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { hasPermission } = usePermission();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Determine which navigation config to use based on current path
  const isAdminArea = location.pathname.startsWith('/admin');
  const sections = isAdminArea ? adminNavigationSections : userNavigationSections;

  /**
   * Filter navigation sections: only show items the user has permission for.
   * Sections with no visible items are hidden entirely.
   */
  const visibleSections = sections
    .map((section): NavigationSection => ({
      ...section,
      items: section.items.filter(
        (item) => !item.permission || hasPermission(item.permission)
      ),
    }))
    .filter((section) => section.items.length > 0);

  const renderSidebarContent = () => (
    <div className="p-4 flex flex-col gap-1">
      {visibleSections.map((section, sectionIndex) => (
        <div key={section.title || sectionIndex}>
          {/* Section Title */}
          {section.title && (
            <div className="mt-5 mb-2 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {section.title}
            </div>
          )}

          {/* Navigation Items */}
          {section.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/' || item.path === '/admin'}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}


    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="text-xl font-bold text-white tracking-tight">Tendagon</h1>
            {isAdminArea && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-md border border-primary/20">
                Admin
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-medium text-slate-200">
                {user?.fullName}
              </span>
              <span className="block text-xs text-slate-500">
                {user?.roleId?.name || 'Standard User'}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-800 hover:border-slate-700 ml-2 flex items-center gap-2"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            w-64 border-r border-slate-800 bg-slate-900/30 overflow-y-auto flex flex-col
            fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            pt-16 md:pt-0
          `}
        >
          {renderSidebarContent()}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
