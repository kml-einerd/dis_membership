import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';

interface ArticleCardProps {
  title: string;
  preview: string;
  onClick?: () => void;
  className?: string;
}

export function ArticleCard({ title, preview, onClick, className }: ArticleCardProps) {
  return (
    <GlassSurface
      variant="surface-1"
      blur="light"
      onClick={onClick}
      className={cn(
        'group p-4 rounded-[var(--radius-md)] cursor-pointer',
        'hover:bg-[var(--glass-surface-2)] transition-all duration-200',
        className
      )}
      role="button"
      tabIndex={0}
    >
      <h3 className="text-[var(--text-primary)] text-sm font-semibold leading-snug mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-[var(--text-tertiary)] text-xs leading-relaxed mb-3 line-clamp-2">
        {preview}
      </p>
      <div className="flex items-center gap-1.5 text-[var(--accent-primary)] text-xs font-medium group-hover:gap-2 transition-all">
        <span>Ler mais</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </GlassSurface>
  );
}
