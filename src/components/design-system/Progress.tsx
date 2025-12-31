import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = 'sm', variant = 'primary', showLabel = false, className, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[var(--text-tertiary)]">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={cn(
          'w-full bg-[var(--glass-surface-2)] rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              variant === 'primary' && 'bg-[var(--accent-primary)]',
              variant === 'secondary' && 'bg-[var(--accent-secondary)]'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
