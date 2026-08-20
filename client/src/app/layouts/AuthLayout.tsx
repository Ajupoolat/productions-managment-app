import { Outlet } from 'react-router-dom';

/**
 * AuthLayout — wraps authentication screens (Login, Signup).
 * Centered card layout with a dark background.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <Outlet />
    </div>
  );
}
