import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';
import { motion } from 'motion/react';

interface ChipTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function ChipTabs({ tabs, activeTab, onChange, className }: ChipTabsProps) {
  return (
    <div className={cn('flex gap-2 px-6 overflow-x-auto scrollbar-hide', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return isActive ? (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            layoutId="activeTab"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={cn(
              'relative px-4 py-2.5 md:py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all min-h-[44px] md:min-h-0',
              'bg-[var(--accent-primary)] text-white active:scale-95',
              'shadow-[0_0_16px_var(--accent-primary-soft)]'
            )}
          >
            {tab}
          </motion.button>
        ) : (
          <GlassSurface
            key={tab}
            variant="surface-1"
            blur="light"
            onClick={() => onChange(tab)}
            className={cn(
              'px-4 py-2.5 md:py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all min-h-[44px] md:min-h-0',
              'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--glass-surface-2)] active:scale-95'
            )}
            role="button"
            tabIndex={0}
          >
            {tab}
          </GlassSurface>
        );
      })}
    </div>
  );
}
