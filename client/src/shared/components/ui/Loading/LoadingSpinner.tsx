
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  classNameContainer?:string;
}

export default function LoadingSpinner({
  size = 32,
  className = '',
  classNameContainer='h-screen-min'
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${classNameContainer}`}>
      <Loader2
        size={size}
        className={`animate-spin text-primary ${className}`}
      />
    </div>
  );
}

