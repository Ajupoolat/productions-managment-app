import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuth } from '../../../shared/hooks/useAuth';

export function useLogout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout();

      navigate('/login');
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogout,
  };
}