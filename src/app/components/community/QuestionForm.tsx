import { useState, useEffect, useRef } from 'react';
import { Send, ImagePlus, X, Lightbulb, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { searchSimilarQuestions } from '../../utils/mockCommunityData';
import type { QuestionFormData, ContentOrigin, Question, MediaAttachment } from './types';

interface QuestionFormProps {
  origin: ContentOrigin;
  onSubmit: (data: QuestionFormData) => void;
  onCancel?: () => void;
  onViewAnswer?: (question: Question) => void;
}

export function QuestionForm({
  origin,
  onSubmit,
  onCancel,
  onViewAnswer,
}: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<MediaAttachment[]>([]);
  const [similarQuestions, setSimilarQuestions] = useState<Question[]>([]);
  const [showSimilar, setShowSimilar] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search for similar questions as user types
  useEffect(() => {
    if (title.length >= 5) {
      const results = searchSimilarQuestions(title);
      setSimilarQuestions(results);
      setShowSimilar(results.length > 0);
    } else {
      setSimilarQuestions([]);
      setShowSimilar(false);
    }
  }, [title]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));

    if (imageFiles.length + attachments.length > 3) {
      alert('Máximo de 3 imagens');
      return;
    }

    setAttachments((prev) => [...prev, ...imageFiles]);

    // Create previews
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setAttachmentPreviews((prev) => [
          ...prev,
          {
            id: `preview-${Date.now()}-${Math.random()}`,
            type: 'image',
            url,
            thumbnailUrl: url,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setAttachmentPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = title.trim().length >= 10 && content.trim().length >= 20;

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      attachments,
      origin,
    });

    // Reset
    setTitle('');
    setContent('');
    setAttachments([]);
    setAttachmentPreviews([]);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-5"
    >
      {/* Title input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/70">
          Qual é sua dúvida? (título)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 80))}
          placeholder="Ex: Como configurar o Google Analytics?"
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
            'text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary-border)]',
            'transition-all'
          )}
        />
        <p className="text-xs text-white/40">{title.length}/80 caracteres</p>
      </div>

      {/* Similar questions preview - Musk innovation */}
      <AnimatePresence>
        {showSimilar && similarQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'p-4 rounded-xl',
              'bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)]'
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span className="text-sm font-semibold text-[var(--accent-secondary)]">
                {similarQuestions.length} pessoa{similarQuestions.length > 1 ? 's' : ''} já perguntou algo parecido
              </span>
            </div>

            <div className="space-y-2">
              {similarQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    'bg-white/5 border border-white/10',
                    'hover:bg-white/10 transition-colors'
                  )}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate">
                      "{q.title}"
                    </p>
                    <p className="text-xs text-white/40 flex items-center gap-2 mt-0.5">
                      {q.status === 'answered' && (
                        <span className="flex items-center gap-1 text-[var(--accent-primary)]">
                          <Check className="w-3 h-3" />
                          Respondida
                        </span>
                      )}
                      <span>{q.helpfulCount} acharam útil</span>
                    </p>
                  </div>

                  {q.status === 'answered' && onViewAnswer && (
                    <motion.button
                      onClick={() => onViewAnswer(q)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold',
                        'bg-[var(--accent-primary)] text-black',
                        'hover:bg-[var(--accent-primary-hover)] transition-colors'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ver resposta
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setShowSimilar(false)}
              className="mt-3 text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Minha dúvida é diferente →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content textarea */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/70">
          Descreva sua dúvida em detalhes
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quanto mais detalhes você fornecer, melhor poderemos ajudar... (mínimo 20 caracteres)"
          className={cn(
            'w-full min-h-[120px] p-4 rounded-xl',
            'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
            'text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary-border)]',
            'resize-none transition-all'
          )}
        />
        <p className="text-xs text-white/40">{content.length} caracteres</p>
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/70">
          Anexos (opcional)
        </label>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {attachmentPreviews.map((preview, index) => (
              <motion.div
                key={preview.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={preview.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.button
                  onClick={() => removeAttachment(index)}
                  className={cn(
                    'absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full',
                    'bg-red-500 text-white flex items-center justify-center',
                    'opacity-0 group-hover:opacity-100 transition-opacity'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {attachments.length < 3 && (
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'w-16 h-16 rounded-lg',
                'border-2 border-dashed border-white/20',
                'bg-[var(--glass-surface-1)]',
                'flex flex-col items-center justify-center gap-0.5',
                'text-white/40 hover:text-white/60 hover:border-white/30',
                'transition-all'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ImagePlus className="w-4 h-4" />
              <span className="text-[9px]">Anexar</span>
            </motion.button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        <p className="text-xs text-white/40">
          Anexe screenshots ou prints para ajudar a explicar (máx. 3)
        </p>
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
          <span>Enviar Pergunta</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default QuestionForm;
