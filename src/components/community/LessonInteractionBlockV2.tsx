import { useState, useEffect } from 'react';
import { MessageCircle, HelpCircle, ChevronRight, Users, Sparkles, Star, X, Send, Image, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/cn';
import { StarRating } from './StarRating';
import { ReactionBarCompact } from './ReactionBar';
import type {
    ContentOrigin,
    Comment,
    Question,
    QuestionGroup,
    CommentFormData,
    QuestionFormData,
    InteractionType,
    ReactionType,
    SmartMatchResult,
} from './types';

// ============================================
// LESSON INTERACTION BLOCK V2
// Jobs Philosophy: Clarity + Elegance
// Musk Philosophy: 10x Efficiency
// ============================================

interface LessonInteractionBlockV2Props {
    origin: ContentOrigin;
    comments: Comment[];
    questions: Question[];
    questionGroups?: QuestionGroup[];
    onCommentSubmit: (data: CommentFormData) => void;
    onQuestionSubmit: (data: QuestionFormData) => void;
    onNavigateToForum?: () => void;
    onSmartMatchSelect?: (question: Question) => void;
}

export function LessonInteractionBlockV2({
    origin,
    comments,
    questions,
    questionGroups = [],
    onCommentSubmit,
    onQuestionSubmit,
    onNavigateToForum,
    onSmartMatchSelect,
}: LessonInteractionBlockV2Props) {
    const [activeTab, setActiveTab] = useState<InteractionType | null>(null);
    const [showSuccess, setShowSuccess] = useState<'comment' | 'question' | null>(null);

    // Comment form state
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState(5);

    // Question form state
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const [smartMatches, setSmartMatches] = useState<SmartMatchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const recentComments = comments.slice(0, 3);
    const answeredQuestions = questions.filter((q) => q.status === 'answered').length;
    const pendingQuestions = questions.filter((q) => q.status === 'pending').length;
    const avgRating = comments.length > 0
        ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
        : 0;

    // Smart Match: Search for similar questions as user types
    useEffect(() => {
        if (questionTitle.length >= 5) {
            setIsSearching(true);
            const timer = setTimeout(() => {
                // Simulate smart matching
                const matches = questions
                    .filter(q =>
                        q.status === 'answered' &&
                        (q.title.toLowerCase().includes(questionTitle.toLowerCase()) ||
                            q.content.toLowerCase().includes(questionTitle.toLowerCase()))
                    )
                    .slice(0, 3)
                    .map(q => ({
                        question: q,
                        matchScore: Math.floor(Math.random() * 30) + 70,
                        matchReason: 'title' as const,
                    }));
                setSmartMatches(matches);
                setIsSearching(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setSmartMatches([]);
        }
    }, [questionTitle, questions]);

    const handleCommentSubmit = () => {
        if (!commentText.trim()) return;
        onCommentSubmit({
            content: commentText,
            rating: commentRating,
            origin,
        });
        setCommentText('');
        setCommentRating(5);
        setActiveTab(null);
        setShowSuccess('comment');
        setTimeout(() => setShowSuccess(null), 3000);
    };

    const handleQuestionSubmit = () => {
        if (!questionTitle.trim() || !questionContent.trim()) return;
        onQuestionSubmit({
            title: questionTitle,
            content: questionContent,
            attachments,
            origin,
        });
        setQuestionTitle('');
        setQuestionContent('');
        setAttachments([]);
        setActiveTab(null);
        setShowSuccess('question');
        setTimeout(() => setShowSuccess(null), 3000);
    };

    const handleReaction = (type: ReactionType) => {
        console.log('Reaction:', type);
    };

    const handleSmartMatchClick = (question: Question) => {
        if (onSmartMatchSelect) {
            onSmartMatchSelect(question);
        }
        // Could also navigate to forum or show answer inline
    };

    return (
        <section className="mt-8">
            {/* Section header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--community-comment-soft)] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--community-comment)]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Comunidade</h3>
                        {comments.length > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-white/50">
                                <StarRating value={avgRating} size="sm" readonly />
                                <span>({comments.length} avaliações)</span>
                            </div>
                        )}
                    </div>
                </div>

                {onNavigateToForum && (
                    <motion.button
                        onClick={onNavigateToForum}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium 
                       bg-[var(--glass-surface-2)] border border-[var(--glass-border)]
                       text-[var(--community-comment)] hover:bg-[var(--glass-surface-hover)] transition-all"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Ver Fórum
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                )}
            </div>

            {/* Main interaction card */}
            <motion.div
                className={cn(
                    'rounded-2xl overflow-hidden',
                    'bg-[var(--community-card-bg)] backdrop-blur-md',
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
                                showSuccess === 'comment'
                                    ? 'bg-[var(--community-comment-soft)]'
                                    : 'bg-[var(--community-question-soft)]'
                            )}
                        >
                            <p className={cn(
                                'text-sm font-medium',
                                showSuccess === 'comment'
                                    ? 'text-[var(--community-comment)]'
                                    : 'text-[var(--community-question)]'
                            )}>
                                {showSuccess === 'comment'
                                    ? '✓ Comentário publicado com sucesso!'
                                    : '✓ Pergunta enviada! Você será notificado quando responderem.'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Selection Cards - Jobs Philosophy: Two clear choices */}
                <div className="grid grid-cols-2 gap-3 p-4">
                    {/* Comment Card */}
                    <motion.button
                        onClick={() => setActiveTab(activeTab === 'comment' ? null : 'comment')}
                        className={cn(
                            'relative flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-xl transition-all',
                            'border-2',
                            activeTab === 'comment'
                                ? 'bg-[var(--community-comment-soft)] border-[var(--community-comment)]'
                                : 'bg-[var(--glass-surface-1)] border-transparent hover:bg-[var(--glass-surface-hover)] hover:border-[var(--community-comment-border)]'
                        )}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            boxShadow: activeTab === 'comment' ? 'var(--community-comment-glow)' : 'none'
                        }}
                    >
                        <motion.div
                            className={cn(
                                'w-14 h-14 rounded-2xl flex items-center justify-center',
                                activeTab === 'comment'
                                    ? 'bg-[var(--community-comment)] text-black'
                                    : 'bg-[var(--glass-surface-2)] text-white/70'
                            )}
                            animate={activeTab === 'comment' ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <MessageCircle className="w-7 h-7" />
                        </motion.div>
                        <div className="text-center">
                            <p className={cn(
                                'text-base font-bold',
                                activeTab === 'comment' ? 'text-[var(--community-comment)]' : 'text-white'
                            )}>
                                💬 Comentar
                            </p>
                            <p className="text-xs text-white/50 mt-0.5">Avalie esta aula</p>
                        </div>
                        {activeTab === 'comment' && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--community-comment)] flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <Star className="w-2.5 h-2.5 text-black fill-current" />
                            </motion.div>
                        )}
                    </motion.button>

                    {/* Question Card */}
                    <motion.button
                        onClick={() => setActiveTab(activeTab === 'question' ? null : 'question')}
                        className={cn(
                            'relative flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-xl transition-all',
                            'border-2',
                            activeTab === 'question'
                                ? 'bg-[var(--community-question-soft)] border-[var(--community-question)]'
                                : 'bg-[var(--glass-surface-1)] border-transparent hover:bg-[var(--glass-surface-hover)] hover:border-[var(--community-question-border)]'
                        )}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            boxShadow: activeTab === 'question' ? 'var(--community-question-glow)' : 'none'
                        }}
                    >
                        <motion.div
                            className={cn(
                                'w-14 h-14 rounded-2xl flex items-center justify-center',
                                activeTab === 'question'
                                    ? 'bg-[var(--community-question)] text-black'
                                    : 'bg-[var(--glass-surface-2)] text-white/70'
                            )}
                            animate={activeTab === 'question' ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <HelpCircle className="w-7 h-7" />
                        </motion.div>
                        <div className="text-center">
                            <p className={cn(
                                'text-base font-bold',
                                activeTab === 'question' ? 'text-[var(--community-question)]' : 'text-white'
                            )}>
                                ❓ Perguntar
                            </p>
                            <p className="text-xs text-white/50 mt-0.5">Tire sua dúvida</p>
                        </div>
                        {activeTab === 'question' && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--community-question)] flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <Sparkles className="w-2.5 h-2.5 text-black" />
                            </motion.div>
                        )}
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
                            className="border-t border-[var(--glass-border)]"
                        >
                            {activeTab === 'comment' ? (
                                /* Comment Form */
                                <div className="p-5 space-y-4">
                                    {/* Rating */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-white/70">Sua avaliação</label>
                                        <StarRating value={commentRating} onChange={setCommentRating} size="lg" />
                                    </div>

                                    {/* Text input */}
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="O que você achou desta aula? Compartilhe sua experiência..."
                                        className={cn(
                                            'w-full h-24 px-4 py-3 rounded-xl resize-none',
                                            'bg-[var(--glass-surface-1)] border border-[var(--glass-border)]',
                                            'text-white placeholder:text-white/30',
                                            'focus:outline-none focus:ring-2 focus:ring-[var(--community-comment)]/30 focus:border-[var(--community-comment-border)]',
                                            'transition-all'
                                        )}
                                    />

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => setActiveTab(null)}
                                            className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <motion.button
                                            onClick={handleCommentSubmit}
                                            disabled={!commentText.trim()}
                                            className={cn(
                                                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all',
                                                commentText.trim()
                                                    ? 'bg-[var(--community-comment)] text-black hover:brightness-110'
                                                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                                            )}
                                            whileHover={commentText.trim() ? { scale: 1.02 } : {}}
                                            whileTap={commentText.trim() ? { scale: 0.98 } : {}}
                                        >
                                            <Send className="w-4 h-4" />
                                            Publicar
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                /* Question Form - With Smart Match */
                                <div className="p-5 space-y-4">
                                    {/* Title input */}
                                    <div>
                                        <label className="text-sm font-medium text-white/70 mb-2 block">Título da pergunta</label>
                                        <input
                                            type="text"
                                            value={questionTitle}
                                            onChange={(e) => setQuestionTitle(e.target.value)}
                                            placeholder="Ex: Como configurar o Google Analytics?"
                                            maxLength={80}
                                            className={cn(
                                                'w-full px-4 py-3 rounded-xl',
                                                'bg-[var(--glass-surface-1)] border border-[var(--glass-border)]',
                                                'text-white placeholder:text-white/30',
                                                'focus:outline-none focus:ring-2 focus:ring-[var(--community-question)]/30 focus:border-[var(--community-question-border)]',
                                                'transition-all'
                                            )}
                                        />
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-white/30">{questionTitle.length}/80</span>
                                            {isSearching && (
                                                <span className="text-xs text-[var(--community-question)] flex items-center gap-1">
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Buscando similares...
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Smart Match Results - Musk Disruption: Show existing answers */}
                                    <AnimatePresence>
                                        {smartMatches.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="p-4 rounded-xl bg-[var(--community-answer-soft)] border border-[var(--community-answer-border)]"
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sparkles className="w-4 h-4 text-[var(--community-answer)]" />
                                                    <span className="text-sm font-bold text-[var(--community-answer)]">
                                                        Perguntas similares já respondidas
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {smartMatches.map((match, index) => (
                                                        <motion.button
                                                            key={match.question.id}
                                                            onClick={() => handleSmartMatchClick(match.question)}
                                                            className="w-full text-left p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-all group"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                        >
                                                            <p className="text-sm font-medium text-white group-hover:text-[var(--community-answer)] transition-colors line-clamp-1">
                                                                {match.question.title}
                                                            </p>
                                                            <p className="text-xs text-white/50 mt-0.5">
                                                                {match.matchScore}% similar • {match.question.helpfulCount} acharam útil
                                                            </p>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Description */}
                                    <div>
                                        <label className="text-sm font-medium text-white/70 mb-2 block">Descreva sua dúvida</label>
                                        <textarea
                                            value={questionContent}
                                            onChange={(e) => setQuestionContent(e.target.value)}
                                            placeholder="Explique detalhadamente o que você está tentando fazer e onde está com dificuldade..."
                                            className={cn(
                                                'w-full h-28 px-4 py-3 rounded-xl resize-none',
                                                'bg-[var(--glass-surface-1)] border border-[var(--glass-border)]',
                                                'text-white placeholder:text-white/30',
                                                'focus:outline-none focus:ring-2 focus:ring-[var(--community-question)]/30 focus:border-[var(--community-question-border)]',
                                                'transition-all'
                                            )}
                                        />
                                    </div>

                                    {/* Attachment button */}
                                    <div className="flex items-center gap-3">
                                        <label className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer',
                                            'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
                                            'text-white/60 hover:text-white hover:bg-[var(--glass-surface-hover)] transition-all'
                                        )}>
                                            <Image className="w-4 h-4" />
                                            <span className="text-sm">Anexar imagem</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        setAttachments([...attachments, ...Array.from(e.target.files)].slice(0, 3));
                                                    }
                                                }}
                                            />
                                        </label>
                                        {attachments.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                {attachments.map((file, idx) => (
                                                    <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                                                        {file.name.slice(0, 15)}...
                                                        <button onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}>
                                                            <X className="w-3 h-3 hover:text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-2">
                                        <button
                                            onClick={() => setActiveTab(null)}
                                            className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <motion.button
                                            onClick={handleQuestionSubmit}
                                            disabled={!questionTitle.trim() || !questionContent.trim()}
                                            className={cn(
                                                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all',
                                                (questionTitle.trim() && questionContent.trim())
                                                    ? 'bg-[var(--community-question)] text-black hover:brightness-110'
                                                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                                            )}
                                            whileHover={(questionTitle.trim() && questionContent.trim()) ? { scale: 1.02 } : {}}
                                            whileTap={(questionTitle.trim() && questionContent.trim()) ? { scale: 0.98 } : {}}
                                        >
                                            <Send className="w-4 h-4" />
                                            Enviar Pergunta
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Recent activity summary */}
                <div className="p-5 border-t border-[var(--glass-border)]">
                    {/* Stats row */}
                    <div className="flex items-center justify-between mb-4 text-xs text-white/50">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-3.5 h-3.5" />
                                {comments.length} comentários
                            </span>
                            <span className="flex items-center gap-1 text-[var(--community-verified)]">
                                ✓ {answeredQuestions} respondidas
                            </span>
                            {pendingQuestions > 0 && (
                                <span className="text-amber-400">
                                    {pendingQuestions} aguardando
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
                                        comment.isHighlighted && 'ring-1 ring-[var(--accent-premium-border)] bg-[var(--accent-premium-soft)]/30'
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

export default LessonInteractionBlockV2;
