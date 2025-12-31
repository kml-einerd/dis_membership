import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type GlassVariant = 'surface-1' | 'surface-2' | 'surface-3' | 'hover';
export type GlassBlur = 'light' | 'medium' | 'heavy';

interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  blur?: GlassBlur;
  noise?: boolean;
  glow?: boolean;
  glowColor?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<GlassVariant, string> = {
  'surface-1': 'bg-[var(--glass-surface-1)] border-[var(--glass-border-subtle)]',
  'surface-2': 'bg-[var(--glass-surface-2)] border-[var(--glass-border)]',
  'surface-3': 'bg-[var(--glass-surface-3)] border-[var(--glass-border-strong)]',
  'hover': 'bg-[var(--glass-surface-hover)] border-[var(--glass-border-strong)]',
};

const blurClasses: Record<GlassBlur, string> = {
  light: 'backdrop-blur-[16px]',
  medium: 'backdrop-blur-[24px]',
  heavy: 'backdrop-blur-[32px]',
};

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ variant = 'surface-2', blur = 'medium', noise = false, glow = false, glowColor, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative border',
          variantClasses[variant],
          blurClasses[blur],
          noise && 'glass-noise',
          className
        )}
        style={glow && glowColor ? {
          boxShadow: `0 0 32px ${glowColor}15, 0 0 64px ${glowColor}08`
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassSurface.displayName = 'GlassSurface';
