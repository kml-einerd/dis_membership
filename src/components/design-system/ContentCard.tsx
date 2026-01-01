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
  const isPremium = badge?.toLowerCase().includes('premium') || badge?.toLowerCase().includes('exclusivo');

  // Default variant - poster style (2:3 ratio)
  const renderDefault = () => (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 active:scale-95',
        // Glow intensificado para conteúdo bloqueado - laranja neon
        locked && 'ring-2 ring-[#f97316] shadow-[0_0_30px_rgba(249,115,22,0.4),0_0_60px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5),0_0_80px_rgba(249,115,22,0.3)]',
        // Glow para conteúdo premium exclusivo - azul/dourado neon
        isPremium && !locked && 'ring-2 ring-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4),0_0_60px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5),0_0_80px_rgba(234,179,8,0.3)]',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Glow for paid/premium */}
        {(locked || isPremium) && (
          <div className={cn(
            "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity",
            locked ? "bg-[var(--accent-purchase)]" : "bg-[var(--accent-premium)]"
          )} />
        )}

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Border accent for paid/premium */}
        {locked && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-purchase)]" />}
        {isPremium && !locked && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-premium)]" />}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div>
            {discount ? (
              <Badge variant="discount">{discount}</Badge>
            ) : badge ? (
              <Badge variant="primary" className={cn(isPremium && 'bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] border-[var(--accent-premium-border)]')}>
                {badge}
              </Badge>
            ) : null}
          </div>
          {locked && (
            <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Lock className="w-3.5 h-3.5 text-[var(--accent-purchase)]" />
            </div>
          )}
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold line-clamp-1">
              {subtitle}
            </p>
          )}
          {progress !== undefined && progress > 0 && (
            <div className="mt-2.5 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  );

  // Compact variant - horizontal layout
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-4 p-3 rounded-[var(--radius-lg)]',
          'bg-[var(--glass-surface-1)] border border-[var(--glass-border-subtle)] backdrop-blur-md',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border)]',
          'transition-all duration-300 active:scale-[0.98]',
          locked && 'border-l-2 border-l-[var(--accent-purchase)] bg-[var(--accent-purchase-soft)]/5 shadow-[0_0_15px_rgba(249,115,22,0.05)]',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-20 h-14 rounded-[var(--radius-md)] overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            {locked ? (
              <Lock className="w-4 h-4 text-[var(--accent-purchase)]" />
            ) : (
              <TypeIcon className="w-4 h-4 text-white" />
            )}
          </div>
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div
                className="h-full bg-[var(--accent-primary)] shadow-[0_0_5px_var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <h4 className="text-[var(--text-primary)] text-sm font-semibold leading-snug truncate group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h4>
          {subtitle && (
            <p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-wide font-bold mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Play indicator */}
        <div className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all",
          locked ? "bg-[var(--accent-purchase-soft)] border-[var(--accent-purchase-border)]" : "bg-white/5 border-white/10 group-hover:bg-[var(--accent-primary)] group-hover:border-transparent group-hover:text-black"
        )}>
          {locked ? <Lock className="w-3.5 h-3.5 text-[var(--accent-purchase)]" /> : <TypeIcon className="w-3.5 h-3.5" />}
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
          'w-full flex items-start gap-5 p-5 rounded-[var(--radius-xl)]',
          'bg-[var(--glass-surface-2)] border border-[var(--glass-border)] backdrop-blur-xl',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border-strong)]',
          'transition-all duration-300 active:scale-[0.99] group',
          locked && 'border-l-4 border-l-[var(--accent-purchase)] bg-[var(--accent-purchase-soft)]/5',
          isPremium && 'border-l-4 border-l-[var(--accent-premium)] bg-[var(--accent-premium-soft)]/5',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-36 h-24 lg:w-48 lg:h-32 rounded-[var(--radius-xl)] overflow-hidden flex-shrink-0 shadow-2xl">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            {badge && (
              <Badge variant={isPremium ? 'warning' : 'primary'} size="sm" className="backdrop-blur-md">
                {badge}
              </Badge>
            )}
          </div>

          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase)] flex items-center justify-center shadow-[0_0_20px_var(--accent-purchase)]">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          {duration && !locked && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded-full backdrop-blur-md border border-white/10">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-white text-[10px] font-bold">{duration}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left pt-1">
          {category && (
            <span className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
              {category}
            </span>
          )}
          <h3 className="text-[var(--text-primary)] text-lg lg:text-xl font-bold leading-tight mt-1 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[var(--text-tertiary)] text-sm mt-2 line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {progress !== undefined && progress > 0 && (
            <div className="mt-4">
              <Progress value={progress} size="sm" variant="primary" />
              <span className="text-[var(--text-muted)] text-[10px] font-bold mt-1.5 block uppercase tracking-wider">
                {progress}% concluído
              </span>
            </div>
          )}
        </div>
      </button>
    );
  }

  return renderDefault();
}
