import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import type { ReactionBarProps, ReactionType } from './types';

// Reaction emoji config
const reactionConfig: Record<
  ReactionType,
  { emoji: string; label: string; color: string; bgColor: string }
> = {
  heart: {
    emoji: '❤️',
    label: 'Amei',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 hover:bg-red-500/20',
  },
  fire: {
    emoji: '🔥',
    label: 'Muito bom',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
  },
  mind_blown: {
    emoji: '🤯',
    label: 'Surpreendeu',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
  },
  clap: {
    emoji: '👏',
    label: 'Parabéns',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 hover:bg-yellow-500/20',
  },
  hundred: {
    emoji: '💯',
    label: 'Perfeito',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20',
  },
};

const sizeClasses = {
  sm: {
    container: 'gap-1',
    button: 'px-2 py-1 text-xs rounded-lg',
    emoji: 'text-sm',
    count: 'text-xs',
  },
  md: {
    container: 'gap-1.5',
    button: 'px-3 py-1.5 text-sm rounded-xl',
    emoji: 'text-base',
    count: 'text-sm',
  },
};

export function ReactionBar({ reactions, onReact, size = 'md' }: ReactionBarProps) {
  const classes = sizeClasses[size];

  // Sort reactions by count (highest first)
  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count);

  return (
    <div className={cn('flex flex-wrap items-center', classes.container)}>
      {sortedReactions.map((reaction) => {
        const config = reactionConfig[reaction.type];

        return (
          <motion.button
            key={reaction.type}
            onClick={() => onReact(reaction.type)}
            className={cn(
              'flex items-center gap-1.5 border transition-all',
              classes.button,
              reaction.hasReacted
                ? cn(
                    'border-white/20',
                    config.bgColor.replace('hover:', ''),
                    'ring-1 ring-white/10'
                  )
                : cn('border-white/[0.06]', config.bgColor)
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Emoji with pop animation */}
            <motion.span
              className={classes.emoji}
              animate={
                reaction.hasReacted
                  ? {
                      scale: [1, 1.3, 1],
                      transition: { duration: 0.3 },
                    }
                  : {}
              }
            >
              {config.emoji}
            </motion.span>

            {/* Count with counter animation */}
            <AnimatePresence mode="wait">
              <motion.span
                key={reaction.count}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={cn(
                  'font-medium tabular-nums',
                  classes.count,
                  reaction.hasReacted ? config.color : 'text-white/60'
                )}
              >
                {reaction.count > 0 ? reaction.count : ''}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

// Compact version for inline display
export function ReactionBarCompact({
  reactions,
  onReact,
}: Pick<ReactionBarProps, 'reactions' | 'onReact'>) {
  // Only show reactions with count > 0
  const activeReactions = reactions.filter((r) => r.count > 0);

  if (activeReactions.length === 0) {
    return (
      <button
        onClick={() => onReact('heart')}
        className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
      >
        <span>❤️</span>
        <span>Reagir</span>
      </button>
    );
  }

  const totalReactions = activeReactions.reduce((sum, r) => sum + r.count, 0);
  const topEmojis = activeReactions
    .slice(0, 3)
    .map((r) => reactionConfig[r.type].emoji);

  return (
    <motion.button
      onClick={() => onReact('heart')}
      className="flex items-center gap-1 text-xs text-white/60 hover:text-white/80 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex -space-x-1">
        {topEmojis.map((emoji, i) => (
          <span key={i} className="text-sm">
            {emoji}
          </span>
        ))}
      </span>
      <span className="font-medium">{totalReactions}</span>
    </motion.button>
  );
}

export default ReactionBar;
