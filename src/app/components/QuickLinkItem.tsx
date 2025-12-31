import { LucideIcon } from 'lucide-react';

interface QuickLinkItemProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  onClick?: () => void;
}

export function QuickLinkItem({ icon: Icon, label, count, onClick }: QuickLinkItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-xl transition-colors group"
    >
      <div className="w-11 h-11 rounded-xl bg-[var(--app-surface)] group-hover:bg-[var(--app-accent-soft)] flex items-center justify-center transition-colors">
        <Icon className="w-5 h-5 text-[var(--app-text-tertiary)] group-hover:text-[var(--app-accent)] transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-[var(--app-text-secondary)] text-xs font-medium leading-tight mb-0.5">
          {label}
        </p>
        {count !== undefined && (
          <p className="text-[var(--app-text-muted)] text-[10px]">{count}</p>
        )}
      </div>
    </button>
  );
}