import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '../schemas/signup.schema';
import type { SignupFormValues } from '../schemas/signup.schema';
import * as authService from '../services/auth.service';

export function useSignup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormValues) => {
    setIsLoading(true);

    try {
      const { confirmPassword, ...payload } = formData;

      const response = await authService.registerUser(payload);

      toast.success(
        response.message || 'Registration successful. Please log in.'
      );

      navigate('/login');
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || 'Registration failed');
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