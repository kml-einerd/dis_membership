import { HelpCircle, CheckCircle2, Clock, Eye, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';
import { ReactionBar } from './ReactionBar';
import { ContentOriginBadge } from './ContentOriginBadge';
import { MediaAttachmentCompact } from './MediaAttachment';
import { AnswerCard } from './AnswerCard';
import type { Question, ReactionType } from './types';

interface QuestionCardProps {
  question: Question;
  onReact?: (type: ReactionType) => void;
  onNavigateToLesson?: () => void;
  onMarkHelpful?: () => void;
  compact?: boolean;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Aguardando',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  answered: {
    icon: CheckCircle2,
    label: 'Respondida',
    color: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-primary-soft)]',
    border: 'border-[var(--accent-primary-border)]',
  },
  resolved: {
    icon: CheckCircle2,
    label: 'Resolvida',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
};

export function QuestionCard({
  question,
  onReact,
  onNavigateToLesson,
  onMarkHelpful,
  compact = false,
}: QuestionCardProps) {
  const status = statusConfig[question.status];
  const StatusIcon = status.icon;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
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
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              status.bg,
              status.border,
              'border'
            )}
          >
            <StatusIcon className={cn('w-5 h-5', status.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
              {question.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>{question.user.name}</span>
              <span>•</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>
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
        'backdrop-blur-md'
      )}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3 flex-1">
          <img
            src={question.user.avatarUrl}
            alt={question.user.name}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                {question.user.name}
              </h4>
              {question.user.isPremium && (
                <span className="px-2 py-0.5 text-[9px] font-bold bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] rounded uppercase">
                  Pro
                </span>
              )}
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              Perguntou {formatDate(question.createdAt)}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border',
            status.bg,
            status.border
          )}
        >
          <StatusIcon className={cn('w-4 h-4', status.color)} />
          <span className={cn('text-xs font-bold', status.color)}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Question title */}
      <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2">
        <HelpCircle className="w-5 h-5 text-[var(--accent-secondary)] flex-shrink-0 mt-0.5" />
        <span>{question.title}</span>
      </h3>

      {/* Question content */}
      <p className="text-sm text-white/70 leading-relaxed mb-4">
        {question.content}
      </p>

      {/* Attachments */}
      {question.attachments.length > 0 && (
        <div className="mb-4">
          <MediaAttachmentCompact attachments={question.attachments} />
        </div>
      )}

      {/* Origin */}
      <div className="mb-4">
        <ContentOriginBadge
          origin={question.origin}
          onClick={onNavigateToLesson}
        />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{question.viewCount} visualizações</span>
        </div>
        {question.helpfulCount > 0 && (
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{question.helpfulCount} acharam útil</span>
          </div>
        )}
      </div>

      {/* Answer */}
      {question.answer && (
        <div className="mb-4">
          <AnswerCard answer={question.answer} />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
        <ReactionBar
          reactions={question.reactions}
          onReact={onReact || (() => {})}
          size="md"
        />

        {question.answer && onMarkHelpful && (
          <motion.button
            onClick={onMarkHelpful}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl',
              'text-sm font-semibold transition-all',
              'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
              'hover:bg-[var(--accent-primary-soft)] hover:border-[var(--accent-primary-border)]',
              'hover:text-[var(--accent-primary)]'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Isso me ajudou</span>
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default QuestionCard;
