import { Check } from 'lucide-react';

interface PreferenceChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function PreferenceChip({ label, selected, onToggle }: PreferenceChipProps) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        selected
          ? 'bg-[var(--app-accent-soft)] text-[var(--app-accent)] border border-[var(--app-accent)]/30'
          : 'bg-[var(--app-surface-hover)] text-[var(--app-text-tertiary)] border border-[var(--app-border-subtle)] hover:bg-[var(--app-surface)]'
      }`}
    >
      {selected && <Check className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </button>
  );
}