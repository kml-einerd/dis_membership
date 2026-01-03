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
  borderGradient?: 'premium' | 'purchase' | 'primary' | 'none';
  children?: React.ReactNode;
}

const variantClasses: Record<GlassVariant, string> = {
  'surface-1': 'bg-[var(--glass-surface-1)] border-[var(--glass-border-subtle)]',
  'surface-2': 'bg-[var(--glass-surface-2)] border-[var(--glass-border)]',
  'surface-3': 'bg-[var(--glass-surface-3)] border-[var(--glass-border-strong)]',
  'hover': 'bg-[var(--glass-surface-hover)] border-[var(--glass-border-strong)]',
};

const borderGradientClasses: Record<string, string> = {
  premium: 'border-l-2 border-l-[var(--accent-premium)]',
  purchase: 'border-l-2 border-l-[var(--accent-purchase)]',
  primary: 'border-l-2 border-l-[var(--accent-primary)]',
  none: '',
};

const blurClasses: Record<GlassBlur, string> = {
  light: 'backdrop-blur-[16px]',
  medium: 'backdrop-blur-[24px]',
  heavy: 'backdrop-blur-[32px]',
};

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ 
    variant = 'surface-2', 
    blur = 'medium', 
    noise = false, 
    glow = false, 
    glowColor, 
    borderGradient = 'none',
    className, 
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative border transition-all duration-300',
          variantClasses[variant],
          blurClasses[blur],
          borderGradientClasses[borderGradient],
          noise && 'glass-noise',
          glow && 'shadow-2xl',
          className
        )}
        style={glow && glowColor ? {
          boxShadow: `0 0 40px ${glowColor}15, 0 0 80px ${glowColor}08`,
          borderColor: `${glowColor}25`
        } : undefined}
        {...props}
      >
        {glow && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 blur-3xl"
            style={{ 
              background: `radial-gradient(circle at center, ${glowColor || 'var(--accent-primary)'}, transparent 70%)` 
            }}
          />
        )}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    );
  }
);

GlassSurface.displayName = 'GlassSurface';
