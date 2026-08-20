import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useAppStore } from '../../store/app.store';

/**
 * AppLayout — top-level wrapper.
 * Checks authentication status on mount, shows a loading spinner,
 * then renders nested routes via <Outlet />.
 */
export default function AppLayout() {
  const { checkAuth, isLoading } = useAppStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return <Outlet />;
}
