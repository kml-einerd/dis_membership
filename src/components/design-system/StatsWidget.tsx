import { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'purchase' | 'premium';
}

interface StatsWidgetProps {
  title?: string;
  stats: StatItem[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

const colorClasses = {
  primary: {
    bg: 'bg-[var(--accent-primary-soft)]',
    border: 'border-[var(--accent-primary-border)]',
    text: 'text-[var(--accent-primary)]',
    glow: 'shadow-[0_0_20px_var(--accent-primary-soft)]',
  },
  secondary: {
    bg: 'bg-[var(--accent-secondary-soft)]',
    border: 'border-[var(--accent-secondary-border)]',
    text: 'text-[var(--accent-secondary)]',
    glow: 'shadow-[0_0_20px_var(--accent-secondary-soft)]',
  },
  purchase: {
    bg: 'bg-[var(--accent-purchase-soft)]',
    border: 'border-[var(--accent-purchase-border)]',
    text: 'text-[var(--accent-purchase)]',
    glow: 'shadow-[0_0_20px_var(--accent-purchase-soft)]',
  },
  premium: {
    bg: 'bg-[var(--accent-premium-soft)]',
    border: 'border-[var(--accent-premium-border)]',
    text: 'text-[var(--accent-premium)]',
    glow: 'shadow-[0_0_20px_var(--accent-premium-soft)]',
  },
};

export function StatsWidget({ title, stats, layout = 'horizontal', className }: StatsWidgetProps) {
  const renderTrend = (change?: number) => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-[var(--state-success)]">
          <TrendingUp className="w-3 h-3" />
          <span className="text-xs font-medium">+{change}%</span>
        </div>
      );
    }
    if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-[var(--state-error)]">
          <TrendingDown className="w-3 h-3" />
          <span className="text-xs font-medium">{change}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-[var(--text-muted)]">
        <Minus className="w-3 h-3" />
        <span className="text-xs font-medium">0%</span>
      </div>
    );
  };

  const layoutClasses = {
    horizontal: 'flex items-center gap-6 overflow-x-auto scrollbar-hide',
    vertical: 'flex flex-col gap-4',
    grid: 'grid grid-cols-2 lg:grid-cols-4 gap-4',
  };

  return (
    <GlassSurface
      variant="surface-2"
      blur="medium"
      className={cn('p-5 rounded-[var(--radius-xl)]', className)}
    >
      {title && (
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          {title}
        </h3>
      )}
      
      <div className={layoutClasses[layout]}>
        {stats.map((stat, index) => {
          const colors = colorClasses[stat.color || 'primary'];
          
          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-4 min-w-0',
                layout === 'horizontal' && 'flex-shrink-0',
                layout === 'grid' && 'flex-col items-start p-4 rounded-[var(--radius-lg)] bg-[var(--glass-surface-1)] border border-[var(--glass-border-subtle)]'
              )}
            >
              {/* Icon */}
              {stat.icon && (
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center border',
                  colors.bg,
                  colors.border,
                  colors.glow
                )}>
                  <div className={colors.text}>
                    {stat.icon}
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-xs font-medium mb-1 truncate">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[var(--text-primary)] text-xl font-bold">
                    {stat.value}
                  </span>
                  {renderTrend(stat.change)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassSurface>
  );
}

