import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'locked' | 'discount';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] border-[var(--accent-primary-border)]',
  secondary: 'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] border-[var(--accent-secondary)]',
  success: 'bg-[var(--state-success-soft)] text-[var(--state-success)]',
  warning: 'bg-[var(--state-warning-soft)] text-[var(--state-warning)]',
  error: 'bg-[var(--state-error-soft)] text-[var(--state-error)]',
  locked: 'bg-[var(--glass-surface-3)] text-[var(--text-muted)] border-[var(--glass-border)]',
  discount: 'bg-[var(--accent-purchase)] text-white font-semibold',
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'primary', icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
