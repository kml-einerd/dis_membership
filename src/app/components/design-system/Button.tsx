import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'purchase';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white shadow-[0_0_16px_var(--accent-primary-soft)]',
  secondary: 'bg-[var(--glass-surface-3)] hover:bg-[var(--glass-surface-hover)] text-[var(--text-primary)] border border-[var(--glass-border)]',
  ghost: 'hover:bg-[var(--glass-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  purchase: 'bg-[var(--accent-purchase)] hover:bg-[var(--accent-purchase-hover)] text-white shadow-[0_0_16px_var(--accent-purchase-soft)] font-semibold',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 min-h-[44px] px-4 text-sm rounded-xl',
  md: 'h-11 min-h-[44px] px-6 text-base rounded-xl',
  lg: 'h-14 min-h-[44px] px-10 text-lg rounded-xl font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out',
          'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          'hover:shadow-lg transform',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
