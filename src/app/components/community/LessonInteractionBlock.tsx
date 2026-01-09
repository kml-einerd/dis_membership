import { useState } from 'react';
import { MessageCircle, HelpCircle, ChevronRight, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { CommentForm } from './CommentForm';
import { QuestionForm } from './QuestionForm';
import { StarRating } from './StarRating';
import { ReactionBarCompact } from './ReactionBar';
import type {
  ContentOrigin,
  Comment,
  Question,
  CommentFormData,
  QuestionFormData,
  InteractionType,
  ReactionType,
} from './types';

interface LessonInteractionBlockProps {
  origin: ContentOrigin;
  comments: Comment[];
  questions: Question[];
  onCommentSubmit: (data: CommentFormData) => void;
  onQuestionSubmit: (data: QuestionFormData) => void;
  onNavigateToForum?: () => void;
}

export function LessonInteractionBlock({
  origin,
  comments,
  questions,
  onCommentSubmit,
  onQuestionSubmit,
  onNavigateToForum,
}: LessonInteractionBlockProps) {
  const [activeTab, setActiveTab] = useState<InteractionType | null>(null);
  const [showSuccess, setShowSuccess] = useState<'comment' | 'question' | null>(null);

  const recentComments = comments.slice(0, 3);
  const answeredQuestions = questions.filter((q) => q.status === 'answered').length;
  const pendingQuestions = questions.filter((q) => q.status === 'pending').length;

  // Calculate average rating
  const avgRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
      : 0;

  const handleCommentSubmit = (data: CommentFormData) => {
    onCommentSubmit(data);
    setActiveTab(null);
    setShowSuccess('comment');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleQuestionSubmit = (data: QuestionFormData) => {
    onQuestionSubmit(data);
    setActiveTab(null);
    setShowSuccess('question');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleReaction = (type: ReactionType) => {
    console.log('Reaction:', type);
    // TODO: Implement reaction logic
  };

  return (
    <section className="mt-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-[var(--accent-primary)]" />
          <h3 className="text-lg font-bold text-white">Comunidade</h3>
          {comments.length > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 text-xs text-white/60">
              <StarRating value={avgRating} size="sm" readonly />
              <span className="ml-1">({comments.length})</span>
            </div>
          )}
        </div>

        {onNavigateToForum && (
          <motion.button
            onClick={onNavigateToForum}
            className="flex items-center gap-1 text-xs text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors"
            whileHover={{ x: 2 }}
          >
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Main interaction card */}
      <motion.div
        className={cn(
          'rounded-2xl overflow-hidden',
          'bg-[var(--glass-surface-1)] backdrop-blur-md',
          'border border-[var(--glass-border)]'
        )}
        layout
      >
        {/* Success messages */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                'px-6 py-4 border-b border-[var(--glass-border)]',
                'bg-[var(--accent-primary-soft)]'
              )}
            >
              <p className="text-sm font-medium text-[var(--accent-primary)]">
                {showSuccess === 'comment'
                  ? '✓ Comentário publicado com sucesso!'
                  : '✓ Pergunta enviada! Você será notificado quando responderem.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab buttons - Jobs simplicity: just 2 big buttons */}
        <div className="grid grid-cols-2 divide-x divide-[var(--glass-border)] border-b border-[var(--glass-border)]">
          <motion.button
            onClick={() => setActiveTab(activeTab === 'comment' ? null : 'comment')}
            className={cn(
              'flex flex-col items-center justify-center gap-2 py-5 transition-all',
              activeTab === 'comment'
                ? 'bg-[var(--accent-primary-soft)]'
                : 'hover:bg-[var(--glass-surface-hover)]'
            )}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center',
                activeTab === 'comment'
                  ? 'bg-[var(--accent-primary)] text-black'
                  : 'bg-[var(--glass-surface-2)] text-white/70'
              )}
              animate={activeTab === 'comment' ? { scale: [1, 1.1, 1] } : {}}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
            <div className="text-center">
              <p
                className={cn(
                  'text-sm font-bold',
                  activeTab === 'comment'
                    ? 'text-[var(--accent-primary)]'
                    : 'text-white'
                )}
              >
                Comentário
              </p>
              <p className="text-xs text-white/50 mt-0.5">
                Avalie e compartilhe
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setActiveTab(activeTab === 'question' ? null : 'question')}
            className={cn(
              'flex flex-col items-center justify-center gap-2 py-5 transition-all',
              activeTab === 'question'
                ? 'bg-[var(--accent-secondary-soft)]'
                : 'hover:bg-[var(--glass-surface-hover)]'
            )}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center',
                activeTab === 'question'
                  ? 'bg-[var(--accent-secondary)] text-black'
                  : 'bg-[var(--glass-surface-2)] text-white/70'
              )}
              animate={activeTab === 'question' ? { scale: [1, 1.1, 1] } : {}}
            >
              <HelpCircle className="w-6 h-6" />
            </motion.div>
            <div className="text-center">
              <p
                className={cn(
                  'text-sm font-bold',
                  activeTab === 'question'
                    ? 'text-[var(--accent-secondary)]'
                    : 'text-white'
                )}
              >
                Pergunta
              </p>
              <p className="text-xs text-white/50 mt-0.5">Tire sua dúvida</p>
            </div>
          </motion.button>
        </div>

        {/* Expanded form area */}
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-5 border-b border-[var(--glass-border)]"
            >
              {activeTab === 'comment' ? (
                <CommentForm
                  origin={origin}
                  onSubmit={handleCommentSubmit}
                  onCancel={() => setActiveTab(null)}
                />
              ) : (
                <QuestionForm
                  origin={origin}
                  onSubmit={handleQuestionSubmit}
                  onCancel={() => setActiveTab(null)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent activity summary */}
        <div className="p-5">
          {/* Stats row */}
          <div className="flex items-center justify-between mb-4 text-xs text-white/50">
            <div className="flex items-center gap-4">
              <span>{comments.length} comentários</span>
              <span>{answeredQuestions} perguntas respondidas</span>
              {pendingQuestions > 0 && (
                <span className="text-amber-400">
                  {pendingQuestions} aguardando resposta
                </span>
              )}
            </div>
          </div>

          {/* Recent comments preview */}
          {recentComments.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                Comentários recentes
              </p>
              {recentComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  className={cn(
                    'flex gap-3 p-3 rounded-xl',
                    'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
                    comment.isHighlighted &&
                      'ring-1 ring-[var(--accent-premium-border)] bg-[var(--accent-premium-soft)]/30'
                  )}
                  whileHover={{ scale: 1.01 }}
                >
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
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] rounded">
                          PRO
                        </span>
                      )}
                      <StarRating value={comment.rating} size="sm" readonly />
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2">
                      {comment.content}
                    </p>
                    <div className="mt-2">
                      <ReactionBarCompact
                        reactions={comment.reactions}
                        onReact={handleReaction}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {comments.length === 0 && questions.length === 0 && (
            <div className="text-center py-6">
              <p className="text-white/40 text-sm">
                Seja o primeiro a interagir com esta aula!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default LessonInteractionBlock;
