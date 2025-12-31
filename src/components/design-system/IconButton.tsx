import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'glass';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'glass', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-200',
          'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'glass' && 'bg-[var(--glass-surface-2)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)]',
          variant === 'ghost' && 'hover:bg-[var(--glass-surface-2)]',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
