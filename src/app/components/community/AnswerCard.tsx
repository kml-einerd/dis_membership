import { CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { MediaAttachmentCompact } from './MediaAttachment';
import type { Answer } from './types';

interface AnswerCardProps {
  answer: Answer;
  className?: string;
}

export function AnswerCard({ answer, className }: AnswerCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-5 rounded-xl',
        'bg-[var(--accent-primary-soft)] border-2 border-[var(--accent-primary-border)]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="relative">
            <img
              src={answer.user.avatarUrl}
              alt={answer.user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-primary)]"
            />
            {answer.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-black" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">
                {answer.user.name}
              </h4>
              {answer.user.isInstructor && (
                <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-[var(--accent-primary)] text-black rounded uppercase">
                  <Award className="w-3 h-3" />
                  Instrutor
                </span>
              )}
              {answer.user.isModerator && !answer.user.isInstructor && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] rounded uppercase">
                  Moderador
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Respondeu {formatDate(answer.createdAt)}
            </p>
          </div>
        </div>

        {/* Verified badge */}
        {answer.isVerified && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--accent-primary)]/20 border border-[var(--accent-primary-border)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="text-xs font-bold text-[var(--accent-primary)]">
              Verificada
            </span>
          </div>
        )}
      </div>

      {/* Answer content */}
      <div
        className={cn(
          'prose prose-sm max-w-none',
          'text-white/90 leading-relaxed'
        )}
      >
        {answer.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Attachments */}
      {answer.attachments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
            Anexos
          </p>
          <MediaAttachmentCompact attachments={answer.attachments} />
        </div>
      )}
    </motion.div>
  );
}

export default AnswerCard;
