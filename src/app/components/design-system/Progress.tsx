import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'purchase' | 'gradient';
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

    const getBarClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-[var(--accent-primary)]';
        case 'secondary':
          return 'bg-[var(--accent-secondary)]';
        case 'purchase':
          return 'bg-[var(--accent-purchase)]';
        case 'gradient':
          return 'bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]';
        default:
          return 'bg-[var(--accent-primary)]';
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[var(--text-tertiary)]">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={cn(
          'w-full bg-[var(--glass-surface-3)] rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              getBarClasses()
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
