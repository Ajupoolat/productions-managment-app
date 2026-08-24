
import { Link } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { FormField } from '../../../shared/components/ui/Form/FormField';
import { Input } from '../../../shared/components/ui/Form/Inputs';

export default function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
    onSubmit,
  } = useLogin();


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel p-8 rounded-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-2">Log in to your Tendagon account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" error={errors.email?.message}>
            <Input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
              error={!!errors.email}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <Input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              error={!!errors.password}
            />
          </FormField>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
