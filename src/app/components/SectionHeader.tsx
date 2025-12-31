import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
}

export function SectionHeader({ title, showViewAll = true, onViewAllClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 mb-3.5">
      <h2 className="text-white font-medium text-base">{title}</h2>
      {showViewAll && (
        <button
          onClick={onViewAllClick}
          className="flex items-center gap-0.5 text-white/40 hover:text-white/60 transition-colors text-xs font-medium"
        >
          <span>Ver tudo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}