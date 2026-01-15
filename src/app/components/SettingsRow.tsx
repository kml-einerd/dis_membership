import { ChevronRight, LucideIcon } from 'lucide-react';

interface SettingsRowProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  showChevron?: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  onClick?: () => void;
  destructive?: boolean;
}

export function SettingsRow({
  icon: Icon,
  label,
  value,
  showChevron = false,
  toggle = false,
  toggleValue = false,
  onToggleChange,
  onClick,
  destructive = false,
}: SettingsRowProps) {
  const handleClick = () => {
    if (toggle && onToggleChange) {
      onToggleChange(!toggleValue);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[var(--app-surface)] rounded-xl transition-colors group"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon
          className={`w-4 h-4 flex-shrink-0 ${
            destructive ? 'text-red-400' : 'text-[var(--app-text-tertiary)]'
          }`}
        />
        <span
          className={`text-sm ${
            destructive ? 'text-red-400' : 'text-[var(--app-text-secondary)]'
          } truncate`}
        >
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {value && (
          <span className="text-[var(--app-text-muted)] text-sm">{value}</span>
        )}

        {toggle && (
          <div
            className={`relative w-11 h-6 rounded-full transition-colors ${
              toggleValue ? 'bg-[var(--app-accent)]' : 'bg-[var(--app-surface)]'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                toggleValue ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        )}

        {showChevron && !toggle && (
          <ChevronRight className="w-4 h-4 text-[var(--app-text-muted)] group-hover:text-[var(--app-text-tertiary)] transition-colors" />
        )}
      </div>
    </button>
  );
}