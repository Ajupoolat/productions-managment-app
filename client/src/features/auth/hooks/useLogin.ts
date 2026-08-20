import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '../schemas/login.schema';
import type { LoginFormValues } from '../schemas/login.schema';
import * as authService from '../services/auth.service';
import { useAppStore } from '../../../store/app.store';
import { SystemRole } from '../../../constants/roles';

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await authService.loginUser(formData);

      setUser(response.data.user);

      toast.success('Logged in successfully');

      const loggedUser = response.data.user;
     
      const isAdmin = loggedUser.roleId.name === SystemRole.SUPER_ADMIN;

      if (isAdmin) {
        console.log('the admin route is working')
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    isLoading,
    onSubmit,
  };
}