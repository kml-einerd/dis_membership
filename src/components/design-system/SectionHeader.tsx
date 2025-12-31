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

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-3', className)}>
      <h2 className="text-[var(--text-primary)] text-base font-semibold">
        {title}
      </h2>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-1 text-[var(--accent-primary)] text-sm font-medium hover:gap-1.5 transition-all"
        >
          {action.label}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
