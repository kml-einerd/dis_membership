import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-[var(--app-text-muted)] text-xs uppercase tracking-[0.2em] font-medium mb-4">
        {title}
      </h3>
      <div className="bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-xl overflow-hidden divide-y divide-[var(--app-border-subtle)]">
        {children}
      </div>
    </div>
  );
}