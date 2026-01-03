import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// JOBS: "Typography is one of the most important aspects of design"
export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <h2 className="text-[var(--text-primary)] text-xl lg:text-2xl font-black tracking-tight">
        {title}
      </h2>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-1.5 text-[var(--accent-primary)] text-sm font-semibold hover:gap-2.5 transition-all duration-300"
        >
          {action.label}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
