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
  purchase: 'bg-[var(--accent-purchase)] hover:bg-[var(--accent-purchase-hover)] text-white shadow-[0_0_16px_var(--accent-purchase-soft)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-[var(--radius-sm)]',
  md: 'h-11 px-6 text-base rounded-[var(--radius-md)]',
  lg: 'h-12 px-8 text-lg rounded-[var(--radius-lg)]',
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
