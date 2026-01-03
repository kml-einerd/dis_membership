import { ChevronRight, LucideIcon } from 'lucide-react';

interface ProfileActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function ProfileActionButton({ icon: Icon, label, onClick }: ProfileActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 p-4 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-xl transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--app-accent-soft)] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--app-accent)]" />
        </div>
        <span className="text-[var(--app-text-primary)] text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-[var(--app-text-muted)] group-hover:text-[var(--app-text-tertiary)] transition-colors" />
    </button>
  );
}