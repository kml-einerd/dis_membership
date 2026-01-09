// ============================================
// COMMUNITY SYSTEM - TYPE DEFINITIONS
// Filosofia Jobs + Musk: Simplicidade + Eficiência
// ============================================

// ============================================
// CORE TYPES
// ============================================

export type InteractionType = 'comment' | 'question';

export type ReactionType = 'heart' | 'fire' | 'mind_blown' | 'clap' | 'hundred';

export type QuestionStatus = 'pending' | 'answered' | 'resolved';

// ============================================
// USER
// ============================================

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isPremium: boolean;
  isInstructor: boolean;
  isModerator: boolean;
}

// ============================================
// CONTENT ORIGIN
// ============================================

export interface ContentOrigin {
  courseId: string;
  courseName: string;
  moduleId: string;
  moduleName: string;
  lessonId: string;
  lessonName: string;
  lessonType: 'video' | 'article';
  timestamp?: number; // momento exato no vídeo (em segundos)
}

// ============================================
// MEDIA ATTACHMENT
// ============================================

export interface MediaAttachment {
  id: string;
  type: 'image' | 'screenshot';
  url: string;
  thumbnailUrl: string;
  caption?: string;
}

// ============================================
// REACTIONS
// ============================================

export interface Reaction {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}

// ============================================
// COMMENT
// ============================================

export interface CommentReply {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  type: 'comment';
  user: User;
  origin: ContentOrigin;
  content: string;
  rating: number; // 1-5 estrelas
  reactions: Reaction[];
  createdAt: Date;
  isHighlighted: boolean; // destaque do instrutor
  replies?: CommentReply[];
}

// ============================================
// QUESTION & ANSWER
// ============================================

export interface Answer {
  id: string;
  user: User; // instrutor ou moderador
  content: string;
  attachments: MediaAttachment[];
  createdAt: Date;
  isVerified: boolean;
}

export interface Question {
  id: string;
  type: 'question';
  user: User;
  origin: ContentOrigin;
  title: string; // título curto (max 80 chars)
  content: string; // descrição detalhada
  attachments: MediaAttachment[];
  reactions: Reaction[];
  createdAt: Date;
  status: QuestionStatus;
  answer?: Answer;
  similarQuestionIds?: string[]; // IDs de perguntas agrupadas
  viewCount: number;
  helpfulCount: number; // "Essa resposta me ajudou"
}

// ============================================
// QUESTION GROUP (FAQ Inteligente)
// ============================================

export interface QuestionGroup {
  id: string;
  canonicalQuestion: Question; // pergunta principal do grupo
  similarQuestions: Question[]; // perguntas agrupadas
  totalAskers: number; // número total de pessoas com a mesma dúvida
  tags: string[]; // tags automáticas
  origin: ContentOrigin; // origem mais comum
}

// ============================================
// FILTERS
// ============================================

export interface ForumFilters {
  type?: 'all' | 'comments' | 'questions';
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  status?: 'all' | 'pending' | 'answered' | 'resolved';
  sortBy: 'recent' | 'popular' | 'helpful';
  searchQuery?: string;
}

// ============================================
// FORM DATA
// ============================================

export interface CommentFormData {
  content: string;
  rating: number;
  origin: ContentOrigin;
}

export interface QuestionFormData {
  title: string;
  content: string;
  attachments: File[];
  origin: ContentOrigin;
}

export interface SmartMatchResult {
  question: Question;
  matchScore: number;
  matchReason: 'title' | 'content';
}

// ============================================
// COMPONENT PROPS
// ============================================

export interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export interface ReactionBarProps {
  reactions: Reaction[];
  onReact: (type: ReactionType) => void;
  size?: 'sm' | 'md';
}

export interface ContentOriginBadgeProps {
  origin: ContentOrigin;
  compact?: boolean;
  onClick?: () => void;
}

export interface MediaAttachmentProps {
  attachments: MediaAttachment[];
  onAdd?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  editable?: boolean;
  maxAttachments?: number;
}

export interface LessonInteractionBlockProps {
  origin: ContentOrigin;
  comments: Comment[];
  questions: Question[];
  onCommentSubmit: (data: CommentFormData) => void;
  onQuestionSubmit: (data: QuestionFormData) => void;
}
