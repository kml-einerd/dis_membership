import { ChevronRight, Play, FileText, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';
import type { ContentOriginBadgeProps } from './types';

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function ContentOriginBadge({
  origin,
  compact = false,
  onClick,
}: ContentOriginBadgeProps) {
  const isClickable = !!onClick;
  const Icon = origin.lessonType === 'video' ? Play : FileText;

  if (compact) {
    return (
      <motion.button
        onClick={onClick}
        disabled={!isClickable}
        className={cn(
          'inline-flex items-center gap-1.5 text-xs text-white/50',
          isClickable && 'hover:text-white/70 transition-colors cursor-pointer'
        )}
        whileHover={isClickable ? { scale: 1.02 } : {}}
        whileTap={isClickable ? { scale: 0.98 } : {}}
      >
        <Icon className="w-3 h-3" />
        <span className="truncate max-w-[200px]">{origin.lessonName}</span>
        {origin.timestamp !== undefined && (
          <>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              {formatTimestamp(origin.timestamp)}
            </span>
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={!isClickable}
      className={cn(
        'flex flex-wrap items-center gap-1 text-xs',
        isClickable && 'group cursor-pointer'
      )}
      whileHover={isClickable ? { scale: 1.01 } : {}}
      whileTap={isClickable ? { scale: 0.99 } : {}}
    >
      {/* Course */}
      <span
        className={cn(
          'px-2 py-1 rounded-lg bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-medium',
          'border border-[var(--accent-primary-border)]',
          isClickable && 'group-hover:bg-[var(--accent-primary)]/20 transition-colors'
        )}
      >
        {origin.courseName}
      </span>

      <ChevronRight className="w-3 h-3 text-white/30" />

      {/* Module */}
      <span
        className={cn(
          'px-2 py-1 rounded-lg bg-[var(--glass-surface-2)] text-white/70 font-medium',
          'border border-[var(--glass-border)]',
          isClickable && 'group-hover:text-white/90 transition-colors'
        )}
      >
        {origin.moduleName}
      </span>

      <ChevronRight className="w-3 h-3 text-white/30" />

      {/* Lesson */}
      <span
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--glass-surface-2)] text-white/70 font-medium',
          'border border-[var(--glass-border)]',
          isClickable && 'group-hover:text-white/90 transition-colors'
        )}
      >
        <Icon className="w-3.5 h-3.5" />
        {origin.lessonName}
      </span>

      {/* Timestamp */}
      {origin.timestamp !== undefined && (
        <>
          <span className="text-white/30 mx-1">•</span>
          <span
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-lg',
              'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)]',
              'border border-[var(--accent-secondary-border)]',
              'font-mono text-[11px] font-semibold'
            )}
          >
            <Clock className="w-3 h-3" />
            aos {formatTimestamp(origin.timestamp)}
          </span>
        </>
      )}
    </motion.button>
  );
}

export default ContentOriginBadge;
