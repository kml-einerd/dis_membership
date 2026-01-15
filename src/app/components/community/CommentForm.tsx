import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { StarRating } from './StarRating';
import type { CommentFormData, ContentOrigin } from './types';

interface CommentFormProps {
  origin: ContentOrigin;
  onSubmit: (data: CommentFormData) => void;
  onCancel?: () => void;
}

export function CommentForm({ origin, onSubmit, onCancel }: CommentFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = rating > 0 && content.trim().length >= 10;

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit({
      content: content.trim(),
      rating,
      origin,
    });

    // Reset form
    setRating(0);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-5"
    >
      {/* Rating section */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/70">
          Como você avalia esta aula?
        </label>
        <StarRating value={rating} onChange={setRating} size="lg" />
        <AnimatePresence>
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-white/50"
            >
              {rating === 5 && 'Excelente! Que bom que gostou.'}
              {rating === 4 && 'Muito bom! O que poderia melhorar?'}
              {rating === 3 && 'Legal! Conte-nos mais sobre sua experiência.'}
              {rating === 2 && 'Hmm, o que não funcionou para você?'}
              {rating === 1 && 'Sentimos muito. Como podemos melhorar?'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Comment textarea */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/70">
          Seu comentário
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe sua experiência com esta aula... (mínimo 10 caracteres)"
          className={cn(
            'w-full min-h-[100px] p-4 rounded-xl',
            'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
            'text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary-border)]',
            'resize-none transition-all'
          )}
        />
        <div className="flex justify-between items-center text-xs">
          <span
            className={cn(
              'transition-colors',
              content.length < 10
                ? 'text-white/40'
                : content.length > 500
                  ? 'text-amber-400'
                  : 'text-[var(--accent-primary)]'
            )}
          >
            {content.length}/500 caracteres
          </span>
          {content.length > 0 && content.length < 10 && (
            <span className="text-amber-400">
              Mínimo de 10 caracteres
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <motion.button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white/80 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancelar
          </motion.button>
        )}

        <motion.button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl',
            'text-sm font-semibold transition-all',
            isValid
              ? 'bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary-hover)]'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          )}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span>Publicar</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CommentForm;
