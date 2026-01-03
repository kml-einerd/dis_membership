import { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Star, ChevronDown, MessageCircle, HelpCircle, CheckCircle, Users, ThumbsUp, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import { ChipTabs } from '../../components/design-system/ChipTabs';
import { StarRating } from '../../components/community/StarRating';
import { ReactionBarCompact } from '../../components/community/ReactionBar';
import { cn } from '../../lib/cn';
import {
  mockComments,
  mockQuestionGroups,
  mockQuestions,
  type Comment,
  type QuestionGroup,
  type ReactionType,
} from '../../data/mockCommunityData';

// ============================================
// FORUM SCREEN V2 - REVOLUTIONARY DESIGN
// Jobs Philosophy: Crystal Clear Navigation
// Musk Philosophy: 10x Information Density
// ============================================

type ForumTab = 'comments' | 'questions';
type SortBy = 'recent' | 'popular' | 'helpful';

export default function ForumScreen() {
  const [activeTab, setActiveTab] = useState<ForumTab>('questions');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Stats for hero
  const stats = {
    totalDiscussions: mockComments.length + mockQuestions.length,
    answeredToday: mockQuestions.filter(q => q.status === 'answered').length,
    activeUsers: 234,
  };

  // Filter and sort data
  const filteredComments = mockComments
    .filter((c) =>
      searchQuery
        ? c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === 'popular') {
        const aReactions = a.reactions.reduce((sum, r) => sum + r.count, 0);
        const bReactions = b.reactions.reduce((sum, r) => sum + r.count, 0);
        return bReactions - aReactions;
      }
      if (sortBy === 'helpful') return b.rating - a.rating;
      return 0;
    });

  const filteredQuestionGroups = mockQuestionGroups
    .filter((g) =>
      searchQuery
        ? g.canonicalQuestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.canonicalQuestion.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return b.canonicalQuestion.createdAt.getTime() - a.canonicalQuestion.createdAt.getTime();
      }
      if (sortBy === 'popular') return b.totalAskers - a.totalAskers;
      if (sortBy === 'helpful') return b.canonicalQuestion.helpfulCount - a.canonicalQuestion.helpfulCount;
      return 0;
    });

  const handleReaction = (type: ReactionType) => {
    console.log('Reaction:', type);
  };

  const toggleGroupExpand = (groupId: string) => {
    const newSet = new Set(expandedGroups);
    if (newSet.has(groupId)) {
      newSet.delete(groupId);
    } else {
      newSet.add(groupId);
    }
    setExpandedGroups(newSet);
  };

  const sortOptions: { value: SortBy; label: string; icon: typeof Clock }[] = [
    { value: 'recent', label: 'Recentes', icon: Clock },
    { value: 'popular', label: 'Populares', icon: TrendingUp },
    { value: 'helpful', label: 'Mais úteis', icon: Star },
  ];

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'agora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <VeloxLayout>
      <div className="min-h-screen pb-20">
        {/* Hero header with stats */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(86,232,138,0.06),transparent_70%)]" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(34,242,239,0.04),transparent_70%)]" />
          </div>

          <div className="relative px-4 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl lg:text-5xl font-black text-white mb-3 tracking-tight">
                Fórum
              </h1>
              <p className="text-white/60 text-base lg:text-lg max-w-2xl mx-auto">
                Tire dúvidas e compartilhe experiências com a comunidade
              </p>
            </motion.div>

            {/* Stats bar - Musk: Information density */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--community-comment)] animate-pulse" />
                <span className="text-white/70">{stats.totalDiscussions} discussões</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[var(--community-verified)]" />
                <span className="text-white/70">{stats.answeredToday} respondidas hoje</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-[var(--community-question)]" />
                <span className="text-white/70">{stats.activeUsers} ativos</span>
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar discussões, perguntas..."
                  className={cn(
                    'w-full pl-12 pr-4 py-4 rounded-2xl',
                    'bg-[var(--community-card-bg)] border border-[var(--glass-border)]',
                    'text-white placeholder:text-white/40',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--community-comment)]/30 focus:border-[var(--community-comment-border)]',
                    'transition-all backdrop-blur-md'
                  )}
                />
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="inline-flex p-1 rounded-2xl bg-[var(--community-card-bg)] border border-[var(--glass-border)]">
                <button
                  onClick={() => setActiveTab('questions')}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all',
                    activeTab === 'questions'
                      ? 'bg-[var(--community-question)] text-black'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  <HelpCircle className="w-4 h-4" />
                  Perguntas & Respostas
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all',
                    activeTab === 'comments'
                      ? 'bg-[var(--community-comment)] text-black'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  <MessageCircle className="w-4 h-4" />
                  Comentários
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/60">Ordenar por:</span>
            </div>

            <div className="flex gap-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                      sortBy === option.value
                        ? 'bg-[var(--community-comment)] text-black'
                        : 'bg-[var(--glass-surface-2)] border border-[var(--glass-border)] text-white/60 hover:text-white'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content grid */}
          <AnimatePresence mode="wait">
            {activeTab === 'questions' ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {filteredQuestionGroups.length > 0 ? (
                  filteredQuestionGroups.map((group, index) => (
                    <QuestionGroupCardV2
                      key={group.id}
                      group={group}
                      isExpanded={expandedGroups.has(group.id)}
                      onToggle={() => toggleGroupExpand(group.id)}
                      index={index}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="Nenhuma pergunta encontrada"
                    description="Tente ajustar sua busca ou seja o primeiro a perguntar!"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="comments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-4"
              >
                {filteredComments.length > 0 ? (
                  filteredComments.map((comment, index) => (
                    <CommentCardV2
                      key={comment.id}
                      comment={comment}
                      onReact={handleReaction}
                      index={index}
                      formatTimeAgo={formatTimeAgo}
                    />
                  ))
                ) : (
                  <div className="col-span-2">
                    <EmptyState
                      title="Nenhum comentário encontrado"
                      description="Tente ajustar sua busca ou volte às aulas para comentar!"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </VeloxLayout>
  );
}

// ============================================
// QUESTION GROUP CARD V2 - FAQ Inteligente
// ============================================

interface QuestionGroupCardV2Props {
  group: QuestionGroup;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function QuestionGroupCardV2({ group, isExpanded, onToggle, index }: QuestionGroupCardV2Props) {
  const q = group.canonicalQuestion;
  const hasAnswer = q.answer && q.status === 'answered';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'rounded-2xl overflow-hidden transition-all',
        'bg-[var(--community-card-bg)] border',
        hasAnswer
          ? 'border-[var(--community-verified-border)]'
          : 'border-[var(--glass-border)]'
      )}
    >
      {/* Question header */}
      <button
        onClick={onToggle}
        className="w-full p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start gap-4">
          {/* Status indicator */}
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
            hasAnswer
              ? 'bg-[var(--community-verified-soft)] text-[var(--community-verified)]'
              : 'bg-[var(--community-question-soft)] text-[var(--community-question)]'
          )}>
            {hasAnswer ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <HelpCircle className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-white font-bold text-base lg:text-lg mb-2 line-clamp-2">
              {q.title}
            </h3>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
              {group.totalAskers > 1 && (
                <span className="flex items-center gap-1 text-[var(--community-question)]">
                  <Users className="w-3.5 h-3.5" />
                  {group.totalAskers} pessoas perguntaram
                </span>
              )}
              <span className="flex items-center gap-1">
                📍 {q.origin.courseName} • {q.origin.lessonName}
              </span>
              {hasAnswer && (
                <span className="flex items-center gap-1 text-[var(--community-helpful)]">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {q.helpfulCount} acharam útil
                </span>
              )}
            </div>
          </div>

          {/* Expand arrow */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              {/* Question content */}
              <div className="p-4 rounded-xl bg-black/20 mb-4">
                <p className="text-sm text-white/70">{q.content}</p>
                {q.attachments.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {q.attachments.map((att) => (
                      <img
                        key={att.id}
                        src={att.thumbnailUrl}
                        alt={att.caption || ''}
                        className="w-16 h-16 rounded-lg object-cover border border-white/10"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Answer */}
              {hasAnswer && q.answer && (
                <div className="p-4 rounded-xl bg-[var(--community-verified-soft)] border border-[var(--community-verified-border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-[var(--community-verified)]" />
                    <span className="text-sm font-bold text-[var(--community-verified)]">
                      Resposta Verificada
                    </span>
                    <span className="text-xs text-white/40 ml-auto">
                      por {q.answer.user.name}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 whitespace-pre-line">
                    {q.answer.content}
                  </p>

                  {/* Helpful button */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--community-helpful-soft)] text-[var(--community-helpful)] text-sm font-medium hover:bg-[var(--community-helpful)]/20 transition-all">
                      <ThumbsUp className="w-4 h-4" />
                      Isso me ajudou
                    </button>
                    <button className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                      Ir para a aula
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Similar questions */}
              {group.similarQuestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    Perguntas similares ({group.similarQuestions.length})
                  </p>
                  <div className="space-y-2">
                    {group.similarQuestions.slice(0, 3).map((sq) => (
                      <div
                        key={sq.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                      >
                        <span className="text-sm text-white/70 line-clamp-1">{sq.title}</span>
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// COMMENT CARD V2 - Social Premium
// ============================================

interface CommentCardV2Props {
  comment: Comment;
  onReact: (type: ReactionType) => void;
  index: number;
  formatTimeAgo: (date: Date) => string;
}

function CommentCardV2({ comment, onReact, index, formatTimeAgo }: CommentCardV2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'p-5 rounded-2xl transition-all',
        'bg-[var(--community-card-bg)] border border-[var(--glass-border)]',
        'hover:border-[var(--community-comment-border)]',
        comment.isHighlighted && 'ring-1 ring-[var(--accent-premium-border)]'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={comment.user.avatarUrl}
          alt={comment.user.name}
          className="w-10 h-10 rounded-full object-cover border border-white/10"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{comment.user.name}</span>
            {comment.user.isPremium && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] rounded">
                PRO
              </span>
            )}
            {comment.isHighlighted && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[var(--community-verified-soft)] text-[var(--community-verified)] rounded">
                ⭐ Destaque
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating value={comment.rating} size="sm" readonly />
            <span className="text-xs text-white/40">• {formatTimeAgo(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-white/80 mb-3 line-clamp-3">{comment.content}</p>

      {/* Origin badge */}
      <div className="flex items-center gap-1.5 mb-3 text-xs text-white/40">
        <span>📍</span>
        <span className="hover:text-[var(--community-comment)] cursor-pointer transition-colors">
          {comment.origin.courseName}
        </span>
        <span>•</span>
        <span>{comment.origin.lessonName}</span>
      </div>

      {/* Reactions */}
      <ReactionBarCompact reactions={comment.reactions} onReact={onReact} />
    </motion.div>
  );
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex flex-col items-center justify-center py-20 px-6 rounded-2xl',
        'bg-[var(--community-card-bg)] border border-[var(--glass-border)]'
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--glass-surface-2)] border border-[var(--glass-border)] flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-white/30" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 text-center max-w-md">{description}</p>
    </motion.div>
  );
}
