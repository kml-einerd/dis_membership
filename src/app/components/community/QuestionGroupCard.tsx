import { useState } from 'react';
import { Users, ChevronDown, ThumbsUp, Eye, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { AnswerCard } from './AnswerCard';
import { ContentOriginBadge } from './ContentOriginBadge';
import type { QuestionGroup } from './types';

interface QuestionGroupCardProps {
  group: QuestionGroup;
  onMarkHelpful?: () => void;
  onViewDiscussion?: () => void;
  onNavigateToLesson?: () => void;
}

export function QuestionGroupCard({
  group,
  onMarkHelpful,
  onViewDiscussion,
  onNavigateToLesson,
}: QuestionGroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { canonicalQuestion, similarQuestions, totalAskers, tags } = group;

  const totalViews = canonicalQuestion.viewCount;
  const totalHelpful = canonicalQuestion.helpfulCount;

  return (
    <motion.article
      layout
      className={cn(
        'rounded-2xl overflow-hidden',
        'bg-[var(--glass-surface-1)] border-2 border-[var(--glass-border-strong)]',
        'backdrop-blur-md'
      )}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="p-5 lg:p-6">
        {/* Title and count */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex-1">
            {canonicalQuestion.title}
          </h3>

          {/* People count badge */}
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0',
              'bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)]'
            )}
          >
            <Users className="w-4 h-4 text-[var(--accent-secondary)]" />
            <div className="text-right">
              <p className="text-lg font-bold text-[var(--accent-secondary)] leading-none">
                {totalAskers}
              </p>
              <p className="text-[10px] text-white/60 leading-tight mt-0.5">
                pessoa{totalAskers > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{totalViews} visualizações</span>
          </div>
          {totalHelpful > 0 && (
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{totalHelpful} acharam útil</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium',
                  'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
                  'text-white/60'
                )}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Similar questions collapse */}
        {similarQuestions.length > 0 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'w-full p-3 rounded-xl mb-4',
              'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
              'hover:bg-[var(--glass-surface-hover)] transition-all',
              'flex items-center justify-between'
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-sm font-semibold text-white/70">
              {similarQuestions.length} pergunta{similarQuestions.length > 1 ? 's' : ''} similar
              {similarQuestions.length > 1 ? 'es' : ''}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-white/50" />
            </motion.div>
          </motion.button>
        )}

        {/* Expanded similar questions */}
        <AnimatePresence>
          {isExpanded && similarQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-2"
            >
              {similarQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'flex items-start gap-2 p-3 rounded-lg',
                    'bg-[var(--glass-surface-3)] border border-[var(--glass-border)]'
                  )}
                >
                  <span className="text-white/40 text-xs mt-0.5">•</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70">{q.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                      <span>{q.user.name}</span>
                      {q.viewCount > 0 && (
                        <>
                          <span>•</span>
                          <span>{q.viewCount} views</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Origin */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Origem mais comum
          </p>
          <ContentOriginBadge origin={group.origin} onClick={onNavigateToLesson} />
        </div>

        {/* Answer section */}
        {canonicalQuestion.answer && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                Resposta Oficial
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <AnswerCard answer={canonicalQuestion.answer} />
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div
        className={cn(
          'px-5 lg:px-6 py-4',
          'bg-[var(--glass-surface-2)] border-t border-[var(--glass-border)]',
          'flex items-center justify-between gap-3'
        )}
      >
        {/* Helpful button */}
        {canonicalQuestion.answer && onMarkHelpful && (
          <motion.button
            onClick={onMarkHelpful}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1',
              'bg-[var(--accent-primary)] text-black',
              'hover:bg-[var(--accent-primary-hover)]',
              'font-semibold text-sm transition-all'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Isso me ajudou ({totalHelpful})</span>
          </motion.button>
        )}

        {/* View discussion button */}
        {onViewDiscussion && (
          <motion.button
            onClick={onViewDiscussion}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl',
              'bg-[var(--glass-surface-3)] border border-[var(--glass-border)]',
              'hover:bg-[var(--glass-surface-hover)] hover:border-white/20',
              'text-white/70 hover:text-white',
              'font-semibold text-sm transition-all'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver discussão</span>
            <span className="text-white/40">→</span>
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default QuestionGroupCard;
