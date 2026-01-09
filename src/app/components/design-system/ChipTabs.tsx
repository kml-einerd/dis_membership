import { cn } from '../../utils/cn';
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
            whileTap={{ scale: 0.97 }}
            transition={{
              layout: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
            }}
            className={cn(
              'relative px-4 py-2.5 md:py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-[44px] md:min-h-0',
              'bg-[var(--accent-primary)] text-white',
              'shadow-[0_0_16px_var(--accent-primary-soft)]'
            )}
          >
            {tab}
          </motion.button>
        ) : (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'px-4 py-2.5 md:py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer min-h-[44px] md:min-h-0',
              'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
              'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]'
            )}
          >
            {tab}
          </motion.button>
        );
      })}
    </div>
  );
}
