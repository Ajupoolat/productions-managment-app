import { ShieldX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * UnauthorizedPage — shown when a user navigates to a route
 * they do not have the required permission for.
 */
export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
        <ShieldX className="text-red-400" size={40} />
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">
        Access Denied
      </h1>

      <p className="text-slate-400 max-w-md mb-2">
        You don't have the required permissions to access this page.
      </p>
      <p className="text-slate-500 text-sm max-w-md mb-8">
        If you believe this is an error, please contact your system administrator
        to request the necessary permissions.
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-medium transition-colors border border-primary/20"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
