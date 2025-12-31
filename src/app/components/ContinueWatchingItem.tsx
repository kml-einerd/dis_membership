import { Clock, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContinueWatchingItemProps {
  thumbnailUrl: string;
  title: string;
  progress: number;
  duration?: string;
  completed?: boolean;
  onClick?: () => void;
}

export function ContinueWatchingItem({
  thumbnailUrl,
  title,
  progress,
  duration,
  completed = false,
  onClick,
}: ContinueWatchingItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] transition-all group w-full text-left"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-black">
        <ImageWithFallback
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Progress bar overlay */}
        {!completed && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-[var(--app-accent)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Completed badge */}
        {completed && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[var(--app-accent)]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[var(--app-text-primary)] text-sm font-medium leading-snug mb-0.5 line-clamp-2">
          {title}
        </h4>
        <div className="flex items-center gap-2 text-[var(--app-text-muted)] text-xs">
          {!completed && (
            <>
              <span>{Math.round(progress)}%</span>
              <span>•</span>
            </>
          )}
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          )}
          {completed && <span className="text-[var(--app-accent)]">Concluído</span>}
        </div>
      </div>
    </button>
  );
}
