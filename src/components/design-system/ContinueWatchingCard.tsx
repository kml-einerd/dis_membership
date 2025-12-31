import { Play } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Progress } from './Progress';
import { GlassSurface } from './GlassSurface';

interface ContinueWatchingCardProps {
  thumbnailUrl: string;
  title: string;
  progress: number;
  duration: string;
  onClick?: () => void;
  className?: string;
}

export function ContinueWatchingCard({ thumbnailUrl, title, progress, duration, onClick, className }: ContinueWatchingCardProps) {
  return (
    <GlassSurface
      variant="surface-1"
      blur="light"
      onClick={onClick}
      className={cn(
        'group flex items-center gap-3 p-3 rounded-[var(--radius-md)] cursor-pointer',
        'hover:bg-[var(--glass-surface-2)] transition-all duration-200',
        className
      )}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-16 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-4 h-4 text-black fill-black" />
          </div>
        </div>
        {/* Progress indicator on thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--glass-surface-3)]">
          <div
            className="h-full bg-[var(--accent-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[var(--text-primary)] text-sm font-medium leading-snug line-clamp-2 mb-1">
          {title}
        </h4>
        <p className="text-[var(--text-muted)] text-xs">
          {duration}
        </p>
      </div>
    </GlassSurface>
  );
}
