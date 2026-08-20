import { Link } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';

import { useSignup } from '../hooks/useSignup';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
    onSubmit,
  } = useSignup();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel p-8 rounded-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
            <UserPlus size={24} />
          </div>

          <h2 className="text-2xl font-bold">
            Create an account
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Join Tendagon to get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Full Name
            </label>

            <input
              {...register('fullName')}
              type="text"
              className="input-field"
              placeholder="John Doe"
            />

            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>

            <input
              {...register('email')}
              type="email"
              className="input-field"
              placeholder="john@example.com"
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>

            <input
              {...register('password')}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>

            <input
              {...register('confirmPassword')}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-6"
          >
            {isLoading ? (
              <Loader2
                className="animate-spin"
                size={20}
              />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}

          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}