import { useState } from 'react';

interface ChipTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function ChipTabs({ tabs, activeTab, onChange }: ChipTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-6 pb-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-[var(--app-accent)] text-white shadow-sm'
                : 'bg-[var(--app-surface-hover)] text-[var(--app-text-tertiary)] hover:bg-[var(--app-surface)] border border-[var(--app-border-subtle)]'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
