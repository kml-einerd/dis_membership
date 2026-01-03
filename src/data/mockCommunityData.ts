import type {
  User,
  Comment,
  Question,
  QuestionGroup,
  ContentOrigin,
  Reaction,
} from '../components/community/types';

// ============================================
// MOCK USERS
// ============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Maria Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    isPremium: true,
    isInstructor: false,
    isModerator: false,
  },
  {
    id: 'user-2',
    name: 'João Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    isPremium: false,
    isInstructor: false,
    isModerator: false,
  },
  {
    id: 'user-3',
    name: 'Ana Costa',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    isPremium: true,
    isInstructor: false,
    isModerator: false,
  },
  {
    id: 'instructor-1',
    name: 'Prof. Carlos Mendes',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    isPremium: true,
    isInstructor: true,
    isModerator: true,
  },
  {
    id: 'user-4',
    name: 'Pedro Oliveira',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    isPremium: false,
    isInstructor: false,
    isModerator: false,
  },
];

// ============================================
// MOCK CONTENT ORIGINS
// ============================================

export const mockOrigins: ContentOrigin[] = [
  {
    courseId: 'course-1',
    courseName: 'Marketing Digital Completo',
    moduleId: 'mod-2',
    moduleName: 'Módulo 2: Métricas',
    lessonId: 'lesson-5',
    lessonName: 'Análise de Métricas Avançadas',
    lessonType: 'video',
    timestamp: 225,
  },
  {
    courseId: 'course-1',
    courseName: 'Marketing Digital Completo',
    moduleId: 'mod-2',
    moduleName: 'Módulo 2: Métricas',
    lessonId: 'lesson-4',
    lessonName: 'Configurando Google Analytics',
    lessonType: 'video',
    timestamp: 180,
  },
  {
    courseId: 'course-1',
    courseName: 'Marketing Digital Completo',
    moduleId: 'mod-1',
    moduleName: 'Módulo 1: Fundamentos',
    lessonId: 'lesson-3',
    lessonName: '10 Estratégias de Marketing',
    lessonType: 'article',
  },
];

// ============================================
// DEFAULT REACTIONS
// ============================================

const createDefaultReactions = (counts: number[] = [0, 0, 0, 0, 0]): Reaction[] => [
  { type: 'heart', count: counts[0], hasReacted: false },
  { type: 'fire', count: counts[1], hasReacted: false },
  { type: 'mind_blown', count: counts[2], hasReacted: false },
  { type: 'clap', count: counts[3], hasReacted: false },
  { type: 'hundred', count: counts[4], hasReacted: false },
];

// ============================================
// MOCK COMMENTS
// ============================================

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    type: 'comment',
    user: mockUsers[0],
    origin: mockOrigins[0],
    content: 'Excelente aula! Finalmente entendi como calcular o CAC e LTV de forma correta. O exemplo prático com a planilha foi muito esclarecedor.',
    rating: 5,
    reactions: createDefaultReactions([24, 12, 8, 5, 3]),
    createdAt: new Date('2024-01-15T10:30:00'),
    isHighlighted: true,
    replies: [
      {
        id: 'reply-1',
        user: mockUsers[3],
        content: 'Fico feliz que tenha ajudado, Maria! Continue praticando com os exercícios.',
        createdAt: new Date('2024-01-15T14:00:00'),
      },
    ],
  },
  {
    id: 'comment-2',
    type: 'comment',
    user: mockUsers[1],
    origin: mockOrigins[0],
    content: 'Muito didático! Porém senti falta de mais exemplos práticos para e-commerce.',
    rating: 4,
    reactions: createDefaultReactions([8, 4, 2, 1, 0]),
    createdAt: new Date('2024-01-14T16:45:00'),
    isHighlighted: false,
  },
  {
    id: 'comment-3',
    type: 'comment',
    user: mockUsers[2],
    origin: mockOrigins[2],
    content: 'Artigo sensacional! Já implementei 3 das estratégias e já vi resultados na primeira semana.',
    rating: 5,
    reactions: createDefaultReactions([45, 22, 15, 8, 6]),
    createdAt: new Date('2024-01-13T09:20:00'),
    isHighlighted: true,
  },
  {
    id: 'comment-4',
    type: 'comment',
    user: mockUsers[4],
    origin: mockOrigins[1],
    content: 'Bem explicado, mas o Google Analytics 4 mudou algumas coisas desde a gravação. Seria legal atualizar.',
    rating: 3,
    reactions: createDefaultReactions([5, 2, 0, 3, 0]),
    createdAt: new Date('2024-01-12T11:00:00'),
    isHighlighted: false,
  },
];

// ============================================
// MOCK QUESTIONS
// ============================================

export const mockQuestions: Question[] = [
  {
    id: 'question-1',
    type: 'question',
    user: mockUsers[1],
    origin: mockOrigins[1],
    title: 'Como configurar o Google Analytics 4 corretamente?',
    content: 'Estou tentando configurar o GA4 no meu site mas não estou conseguindo ver os dados. Já instalei o código no head mas nada aparece no painel. O que pode estar errado?',
    attachments: [
      {
        id: 'att-1',
        type: 'screenshot',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
        caption: 'Print do meu painel GA4',
      },
    ],
    reactions: createDefaultReactions([12, 3, 0, 0, 0]),
    createdAt: new Date('2024-01-14T08:30:00'),
    status: 'answered',
    answer: {
      id: 'answer-1',
      user: mockUsers[3],
      content: 'Olá João! Pelo print, parece que você instalou o código do Universal Analytics ao invés do GA4. O GA4 usa um formato diferente: gtag.js. Siga estes passos:\n\n1. Acesse Admin > Data Streams\n2. Clique no seu site\n3. Copie o código de configuração que começa com "G-"\n4. Instale usando Google Tag Manager (recomendado)\n\nSe precisar, disponibilizei um tutorial detalhado no material complementar da Aula 6.',
      attachments: [],
      createdAt: new Date('2024-01-14T14:20:00'),
      isVerified: true,
    },
    viewCount: 234,
    helpfulCount: 89,
    similarQuestionIds: ['question-2', 'question-3'],
  },
  {
    id: 'question-2',
    type: 'question',
    user: mockUsers[2],
    origin: mockOrigins[1],
    title: 'Onde coloco o código de rastreamento do GA4?',
    content: 'Sou iniciante e não sei onde exatamente preciso colocar o código. Pode ser em qualquer lugar do HTML?',
    attachments: [],
    reactions: createDefaultReactions([8, 2, 0, 0, 0]),
    createdAt: new Date('2024-01-13T15:00:00'),
    status: 'answered',
    answer: {
      id: 'answer-2',
      user: mockUsers[3],
      content: 'Ana, o código deve ser inserido dentro da tag <head> do seu site, preferencialmente logo após a abertura da tag. Isso garante que o rastreamento comece o mais cedo possível no carregamento da página.',
      attachments: [],
      createdAt: new Date('2024-01-13T16:30:00'),
      isVerified: true,
    },
    viewCount: 156,
    helpfulCount: 62,
    similarQuestionIds: ['question-1', 'question-3'],
  },
  {
    id: 'question-3',
    type: 'question',
    user: mockUsers[4],
    origin: mockOrigins[1],
    title: 'Erro ao conectar GA4 com minha conta',
    content: 'Quando tento conectar dá um erro de permissão. Já verifiquei que sou admin da conta.',
    attachments: [
      {
        id: 'att-2',
        type: 'screenshot',
        url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200',
        caption: 'Mensagem de erro',
      },
    ],
    reactions: createDefaultReactions([5, 1, 0, 0, 0]),
    createdAt: new Date('2024-01-12T10:00:00'),
    status: 'answered',
    answer: {
      id: 'answer-3',
      user: mockUsers[3],
      content: 'Pedro, esse erro geralmente acontece quando a conta do Google usada no navegador é diferente da conta admin do GA. Tente:\n1. Fazer logout de todas as contas Google\n2. Logar apenas com a conta admin\n3. Tentar novamente\n\nSe persistir, limpe os cookies do navegador.',
      attachments: [],
      createdAt: new Date('2024-01-12T11:45:00'),
      isVerified: true,
    },
    viewCount: 98,
    helpfulCount: 45,
    similarQuestionIds: ['question-1', 'question-2'],
  },
  {
    id: 'question-4',
    type: 'question',
    user: mockUsers[0],
    origin: mockOrigins[0],
    title: 'Como calcular ROI de campanhas orgânicas?',
    content: 'No vídeo você mostra como calcular ROI de campanhas pagas, mas como faço para medir o retorno de estratégias orgânicas como SEO e conteúdo?',
    attachments: [],
    reactions: createDefaultReactions([15, 8, 3, 0, 0]),
    createdAt: new Date('2024-01-15T09:00:00'),
    status: 'pending',
    viewCount: 45,
    helpfulCount: 0,
  },
];

// ============================================
// MOCK QUESTION GROUPS (FAQ Inteligente)
// ============================================

export const mockQuestionGroups: QuestionGroup[] = [
  {
    id: 'group-1',
    canonicalQuestion: mockQuestions[0],
    similarQuestions: [mockQuestions[1], mockQuestions[2]],
    totalAskers: 47,
    tags: ['google-analytics', 'configuracao', 'ga4'],
    origin: mockOrigins[1],
  },
  {
    id: 'group-2',
    canonicalQuestion: mockQuestions[3],
    similarQuestions: [],
    totalAskers: 12,
    tags: ['roi', 'metricas', 'organico'],
    origin: mockOrigins[0],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getCommentsByOrigin = (origin: ContentOrigin): Comment[] => {
  return mockComments.filter(
    (c) =>
      c.origin.courseId === origin.courseId &&
      c.origin.lessonId === origin.lessonId
  );
};

export const getQuestionsByOrigin = (origin: ContentOrigin): Question[] => {
  return mockQuestions.filter(
    (q) =>
      q.origin.courseId === origin.courseId &&
      q.origin.lessonId === origin.lessonId
  );
};

export const getQuestionGroupsByOrigin = (origin: ContentOrigin): QuestionGroup[] => {
  return mockQuestionGroups.filter(
    (g) =>
      g.origin.courseId === origin.courseId &&
      g.origin.lessonId === origin.lessonId
  );
};

export const searchSimilarQuestions = (query: string): Question[] => {
  if (!query || query.length < 3) return [];

  const lowerQuery = query.toLowerCase();
  return mockQuestions
    .filter((q) =>
      q.title.toLowerCase().includes(lowerQuery) ||
      q.content.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 3);
};

// Current lesson origin (for demo)
export const currentLessonOrigin: ContentOrigin = mockOrigins[0];

// Re-export types for convenience
export type { Comment, Question, QuestionGroup, ContentOrigin, User, Reaction };
export type { ReactionType } from '../components/community/types';
