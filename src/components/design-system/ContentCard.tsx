import { Play, Lock, Clock, BookOpen } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Badge } from './Badge';
import { Progress } from './Progress';

interface ContentCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  duration?: string;
  type?: 'video' | 'article' | 'course';
  progress?: number;
  locked?: boolean;
  badge?: string;
  discount?: string;
  category?: string;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'wide' | 'featured';
  className?: string;
}

export function ContentCard({
  imageUrl,
  title,
  subtitle,
  duration,
  type = 'video',
  progress,
  locked = false,
  badge,
  discount,
  category,
  onClick,
  variant = 'default',
  className,
}: ContentCardProps) {
  const TypeIcon = type === 'article' ? BookOpen : Play;

  // Compact variant - horizontal layout
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-4 p-3 rounded-[var(--radius-lg)]',
          'bg-[var(--glass-surface-1)] border border-[var(--glass-border-subtle)]',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border)]',
          'transition-all duration-200 active:scale-[0.99]',
          locked && 'opacity-75',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-20 h-14 rounded-[var(--radius-md)] overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            {locked ? (
              <Lock className="w-4 h-4 text-white/80" />
            ) : (
              <TypeIcon className="w-4 h-4 text-white" />
            )}
          </div>
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/30">
              <div
                className="h-full bg-[var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <h4 className="text-[var(--text-primary)] text-sm font-medium leading-snug truncate">
            {title}
          </h4>
          {subtitle && (
            <p className="text-[var(--text-muted)] text-xs mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Play indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--glass-surface-3)] flex items-center justify-center">
          <TypeIcon className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
        </div>
      </button>
    );
  }

  // Wide variant - horizontal with more details
  if (variant === 'wide') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-start gap-4 p-4 rounded-[var(--radius-xl)]',
          'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border-strong)]',
          'transition-all duration-200 active:scale-[0.99]',
          locked && 'opacity-75',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-32 h-24 lg:w-40 lg:h-28 rounded-[var(--radius-lg)] overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {badge && (
            <div className="absolute top-2 left-2">
              <Badge variant="primary" size="sm">{badge}</Badge>
            </div>
          )}
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Lock className="w-6 h-6 text-white/80" />
            </div>
          )}
          {duration && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 rounded-md backdrop-blur-sm">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-white text-xs font-medium">{duration}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          {category && (
            <span className="text-[var(--accent-primary)] text-xs font-medium">
              {category}
            </span>
          )}
          <h3 className="text-[var(--text-primary)] text-base font-semibold leading-snug mt-1 line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[var(--text-tertiary)] text-sm mt-1 line-clamp-2">
              {subtitle}
            </p>
          )}
          {progress !== undefined && progress > 0 && (
            <div className="mt-3">
              <Progress value={progress} size="sm" variant="primary" />
              <span className="text-[var(--text-muted)] text-xs mt-1 block">
                {progress}% concluído
              </span>
            </div>
          )}
        </div>
      </button>
    );
  }

  // Featured variant - large with prominent styling
  if (variant === 'featured') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'group relative w-full aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden',
          'transition-all duration-300 active:scale-[0.98]',
          className
        )}
      >
        <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {badge && <Badge variant="primary">{badge}</Badge>}
          {discount && <Badge variant="discount">{discount}</Badge>}
          {locked && !discount && (
            <Badge variant="locked" icon={<Lock className="w-3 h-3" />}>Premium</Badge>
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {category && (
            <span className="text-[var(--accent-secondary)] text-xs font-semibold uppercase tracking-wide">
              {category}
            </span>
          )}
          <h3 className="text-white text-lg font-bold leading-tight mt-2 line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/70 text-sm mt-2 line-clamp-2">
              {subtitle}
            </p>
          )}
          {duration && (
            <div className="flex items-center gap-2 mt-3 text-white/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-300" />
      </button>
    );
  }

  // Default variant - poster style (2:3 ratio)
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full rounded-[var(--radius-lg)] overflow-hidden',
        'transition-all duration-300 active:scale-95',
        className
      )}
    >
      {/* 2:3 ratio container */}
      <div className="relative aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Locked badge */}
        {locked && (
          <div className="absolute top-3 right-3">
            <Badge variant="locked" icon={<Lock className="w-3 h-3" />}>
              Premium
            </Badge>
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">
              {discount}
            </Badge>
          </div>
        )}

        {/* Badge */}
        {badge && !discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{badge}</Badge>
          </div>
        )}

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 mb-0.5">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/70 text-xs leading-snug line-clamp-1">
              {subtitle}
            </p>
          )}
          {progress !== undefined && progress > 0 && (
            <div className="mt-2 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-300" />
      </div>
    </button>
  );
}

