import { useState } from 'react';
import { MessageCircle, Star, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { StarRating } from './StarRating';
import { ReactionBar } from './ReactionBar';
import { ContentOriginBadge } from './ContentOriginBadge';
import type { Comment, ReactionType } from './types';

interface CommentCardProps {
  comment: Comment;
  onReact?: (type: ReactionType) => void;
  onNavigateToLesson?: () => void;
  compact?: boolean;
}

export function CommentCard({
  comment,
  onReact,
  onNavigateToLesson,
  compact = false,
}: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(false);

  const handleReaction = (type: ReactionType) => {
    if (onReact) onReact(type);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  if (compact) {
    return (
      <motion.div
        className={cn(
          'p-4 rounded-xl',
          'bg-[var(--glass-surface-1)] border border-[var(--glass-border)]',
          'hover:bg-[var(--glass-surface-2)] transition-all'
        )}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex gap-3">
          <img
            src={comment.user.avatarUrl}
            alt={comment.user.name}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-white">
                {comment.user.name}
              </span>
              {comment.user.isPremium && (
                <Crown className="w-3 h-3 text-[var(--accent-premium)]" />
              )}
              <StarRating value={comment.rating} size="sm" readonly />
            </div>
            <p className="text-sm text-white/70 line-clamp-2">{comment.content}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      layout
      className={cn(
        'p-5 lg:p-6 rounded-2xl',
        'bg-[var(--glass-surface-1)] border border-[var(--glass-border)]',
        'backdrop-blur-md',
        comment.isHighlighted &&
          'ring-2 ring-[var(--accent-premium-border)] bg-[var(--accent-premium-soft)]/20'
      )}
      whileHover={{ y: -2 }}
    >
      {/* Highlighted badge */}
      {comment.isHighlighted && (
        <div className="flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-lg bg-[var(--accent-premium-soft)] border border-[var(--accent-premium-border)] w-fit">
          <Crown className="w-4 h-4 text-[var(--accent-premium)]" />
          <span className="text-xs font-bold text-[var(--accent-premium)] uppercase tracking-wider">
            Destaque do Instrutor
          </span>
        </div>
      )}

      {/* User header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <img
            src={comment.user.avatarUrl}
            alt={comment.user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">
                {comment.user.name}
              </h4>
              {comment.user.isPremium && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] rounded uppercase">
                  Premium
                </span>
              )}
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>

        {/* Rating */}
        <StarRating value={comment.rating} size="md" readonly />
      </div>

      {/* Comment content */}
      <p className="text-sm lg:text-base text-white/80 leading-relaxed mb-4">
        {comment.content}
      </p>

      {/* Origin badge */}
      <div className="mb-4">
        <ContentOriginBadge
          origin={comment.origin}
          onClick={onNavigateToLesson}
        />
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
        <ReactionBar reactions={comment.reactions} onReact={handleReaction} size="md" />

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comment.replies.length} resposta{comment.replies.length > 1 ? 's' : ''}</span>
          </button>
        )}
      </div>

      {/* Replies section */}
      <AnimatePresence>
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-[var(--glass-border)] space-y-3"
          >
            {comment.replies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 p-3 rounded-xl bg-[var(--glass-surface-2)]"
              >
                <img
                  src={reply.user.avatarUrl}
                  alt={reply.user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">
                      {reply.user.name}
                    </span>
                    {reply.user.isInstructor && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] rounded uppercase">
                        Instrutor
                      </span>
                    )}
                    <span className="text-xs text-white/40">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{reply.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default CommentCard;
