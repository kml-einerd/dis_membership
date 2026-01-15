import { ArrowLeft, Play, FileText, Lock, Clock, BookOpen, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { VeloxLayout } from './components/layout/VeloxLayout';
import {
  GlassSurface,
  ChipTabs,
  Button,
  Progress,
  SidebarWidget,
} from './components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils/cn';

interface Lesson {
  id: string;
  title: string;
  instructor?: string;
  duration: string;
  type: 'video' | 'article';
  thumbnail?: string;
  locked?: boolean;
  completed?: boolean;
  module: string;
}

interface CourseData {
  title: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  thumbnail: string;
  instructorImage: string;
  totalLessons: number;
  totalDuration: string;
  description: string;
}

export default function CourseDetailV2() {
  const [activeModule, setActiveModule] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Get course data - default mock data for standalone preview
  const courseData: CourseData = {
    title: 'Passagens Baratas',
    instructor: 'Carlos Vieira',
    instructorTitle: 'Ensina sobre Viagens',
    category: 'Destinos',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    totalLessons: 24,
    totalDuration: '6h 30min',
    description: 'Carlos Vieira começou a viajar profissionalmente aos 22 anos e já visitou mais de 50 países gastando pouco. Aprenda suas técnicas exclusivas para encontrar passagens baratas, usar milhas de forma inteligente e planejar viagens inesquecíveis com orçamento limitado.',
  };

  const modules = ['Todos', 'Fundamentos', 'Técnicas Avançadas', 'Ferramentas'];

  // Lessons data organized by module
  const allLessons: Lesson[] = [
    {
      id: '1',
      title: 'Introdução: Por que você paga caro em passagens',
      instructor: courseData.instructor,
      duration: '12 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      completed: true,
      module: 'Fundamentos',
    },
    {
      id: '2',
      title: 'Os 10 melhores sites para comparar preços',
      instructor: courseData.instructor,
      duration: '18 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      completed: true,
      module: 'Fundamentos',
    },
    {
      id: '3',
      title: 'Quando comprar: o timing perfeito',
      instructor: courseData.instructor,
      duration: '22 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      module: 'Fundamentos',
    },
    {
      id: '4',
      title: 'Checklist completo antes de comprar',
      duration: '8 min',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      module: 'Fundamentos',
    },
    {
      id: '5',
      title: 'Alertas de preço automáticos',
      instructor: courseData.instructor,
      duration: '15 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      module: 'Técnicas Avançadas',
    },
    {
      id: '6',
      title: 'Voos com múltiplas paradas',
      instructor: courseData.instructor,
      duration: '28 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      locked: true,
      module: 'Técnicas Avançadas',
    },
    {
      id: '7',
      title: 'Como usar milhas e pontos',
      instructor: courseData.instructor,
      duration: '25 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      locked: true,
      module: 'Técnicas Avançadas',
    },
    {
      id: '8',
      title: 'Rastreador de Preços: Setup completo',
      instructor: courseData.instructor,
      duration: '20 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      locked: true,
      module: 'Ferramentas',
    },
  ];

  const filteredLessons = allLessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = activeModule === 'Todos' || lesson.module === activeModule;
    return matchesSearch && matchesModule;
  });

  const completedLessons = allLessons.filter(l => l.completed).length;
  const progressPercentage = Math.round((completedLessons / allLessons.length) * 100);

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.locked) {
      console.log('Navigate to: locked-preview', { lesson });
      return;
    }
    if (lesson.type === 'video') {
      console.log('Navigate to: video-lesson', { lesson });
    } else {
      console.log('Navigate to: article-reader', { article: lesson });
    }
  };

  const handleGoBack = () => {
    console.log('Navigate back');
  };

  // Get next lesson to continue
  const nextLesson = allLessons.find(l => !l.completed && !l.locked);

  // Sidebar content for desktop
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Course Progress */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Seu progresso
        </h3>

        <div className="relative w-28 h-28 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="var(--glass-surface-3)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="url(#courseProgressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 48 * progressPercentage / 100} ${2 * Math.PI * 48}`}
            />
            <defs>
              <linearGradient id="courseProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[var(--text-primary)] text-2xl font-bold">{progressPercentage}%</span>
            <span className="text-[var(--text-muted)] text-xs">completo</span>
          </div>
        </div>

        <div className="text-center text-sm text-[var(--text-tertiary)]">
          {completedLessons} de {allLessons.length} aulas concluídas
        </div>
      </GlassSurface>

      {/* Continue Watching */}
      {nextLesson && (
        <SidebarWidget title="Continuar de onde parou">
          <button
            onClick={() => handleLessonClick(nextLesson)}
            className="w-full flex items-center gap-3 p-2 rounded-[var(--radius-md)] hover:bg-[var(--glass-surface-hover)] transition-colors"
          >
            <div className="relative w-16 h-12 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0">
              <img src={nextLesson.thumbnail} alt={nextLesson.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-[var(--text-primary)] text-sm font-medium truncate">
                {nextLesson.title}
              </h4>
              <p className="text-[var(--text-muted)] text-xs">{nextLesson.duration}</p>
            </div>
          </button>
        </SidebarWidget>
      )}

      {/* Instructor Info */}
      <GlassSurface
        variant="surface-1"
        blur="light"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Sobre o instrutor
        </h3>
        <div className="flex items-center gap-4 mb-3">
          <img
            src={courseData.instructorImage}
            alt={courseData.instructor}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--glass-border)]"
          />
          <div>
            <h4 className="text-[var(--text-primary)] text-sm font-semibold">
              {courseData.instructor}
            </h4>
            <p className="text-[var(--text-muted)] text-xs">
              Especialista em viagens
            </p>
          </div>
        </div>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">
          Viajou para mais de 50 países com orçamento limitado.
        </p>
      </GlassSurface>
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()} showNavigation={false}>
      <div className="min-h-screen">
        {/* Hero Section - MasterClass Style */}
        <div className="relative">
          {/* Hero Image - Full Width */}
          <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
            <img
              src={courseData.instructorImage}
              alt={courseData.instructor}
              className="w-full h-full object-cover object-top"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--app-bg)]/30 to-transparent lg:hidden" />

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleGoBack}
              className="absolute top-4 left-4 lg:top-6 lg:left-6 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--glass-surface-3)] backdrop-blur-xl border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-colors flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </motion.button>
          </div>

          {/* Course Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 lg:px-6 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* Instructor Name */}
              <h1 className="text-white text-3xl lg:text-5xl font-bold leading-tight mb-2">
                {courseData.instructor}
              </h1>

              {/* Course Title - Red/Orange accent */}
              <p className="text-[var(--accent-purchase)] text-lg lg:text-2xl font-medium mb-3">
                {courseData.instructorTitle}
              </p>

              {/* Lessons & Duration */}
              <p className="text-[var(--text-tertiary)] text-sm lg:text-base mb-4">
                {courseData.totalLessons} video lessons ({courseData.totalDuration})
              </p>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed mb-5 line-clamp-3 lg:line-clamp-none max-w-xl">
                {courseData.description}
              </p>

              {/* Category Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-4 py-1.5 border border-[var(--accent-purchase)] rounded-full text-[var(--accent-purchase)] text-sm font-medium">
                  {courseData.category}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 lg:px-6 py-6 pb-24 lg:pb-6">
          {/* Progress Bar - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:hidden mb-6"
          >
            <GlassSurface
              variant="surface-2"
              blur="medium"
              className="p-4 rounded-[var(--radius-xl)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--text-secondary)] text-sm">Seu progresso</span>
                <span className="text-[var(--text-primary)] text-sm font-bold">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} variant="gradient" size="md" />
              <p className="text-[var(--text-muted)] text-xs mt-2">
                {completedLessons} de {allLessons.length} aulas concluídas
              </p>
            </GlassSurface>
          </motion.div>

          {/* Module Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-4"
          >
            <ChipTabs tabs={modules} activeTab={activeModule} onChange={setActiveModule} />
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Programs"
                className="w-full pl-11 pr-4 py-3 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary-border)] transition-colors"
              />
            </div>
          </motion.div>

          {/* PREMIUM UPSELL BANNER - Inline entre lições */}
          {filteredLessons.some(l => l.locked) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              className="mb-6"
            >
              <GlassSurface
                variant="surface-3"
                blur="heavy"
                glow
                glowColor="var(--accent-purchase)"
                borderGradient="purchase"
                className="p-6 rounded-[var(--radius-2xl)] text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purchase)]/10 via-transparent to-[var(--accent-premium)]/10" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-[var(--accent-purchase)]" />
                  </div>

                  <h3 className="text-[var(--text-primary)] text-xl font-black mb-2">
                    Desbloqueie Todas as Aulas
                  </h3>

                  <p className="text-[var(--text-tertiary)] text-sm mb-4 max-w-md mx-auto">
                    Você completou as aulas gratuitas! Acesse <span className="text-[var(--accent-purchase)] font-bold">18 aulas premium</span> e ferramentas exclusivas
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-5">
                    <span className="text-[var(--text-muted)] text-lg line-through">R$ 997</span>
                    <span className="text-[var(--text-primary)] text-4xl font-black">R$ 397</span>
                  </div>

                  <Button
                    variant="purchase"
                    size="lg"
                    fullWidth
                    onClick={() => console.log('Navigate to: sales-video')}
                    className="font-black shadow-2xl mb-4"
                  >
                    GARANTIR ACESSO PREMIUM
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-[var(--text-muted)] text-xs">
                    <span>✓ Acesso vitalício</span>
                    <span>✓ Certificado</span>
                    <span>✓ Suporte VIP</span>
                    <span>✓ 30 dias garantia</span>
                  </div>
                </div>
              </GlassSurface>
            </motion.div>
          )}

          {/* Lessons List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="space-y-3"
          >
            {filteredLessons.map((lesson, index) => (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.03 }}
                onClick={() => handleLessonClick(lesson)}
                className={cn(
                  'w-full flex items-center gap-4 p-3 rounded-[var(--radius-lg)] transition-all duration-300 active:scale-[0.99] group relative overflow-hidden',
                  'bg-[var(--glass-surface-1)] border border-[var(--glass-border-subtle)]',
                  'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border)]',
                  lesson.locked && 'border-l-2 border-l-[var(--accent-purchase)] bg-[var(--accent-purchase-soft)]/5'
                )}
              >
                {lesson.locked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purchase)]/5 to-transparent pointer-events-none" />
                )}

                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-24 h-16 lg:w-28 lg:h-18 rounded-[var(--radius-md)] overflow-hidden shadow-xl">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Play/Lock overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                    {lesson.locked ? (
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-purchase)] flex items-center justify-center shadow-[0_0_15px_var(--accent-purchase)]">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    ) : lesson.completed ? (
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center border border-[var(--accent-primary-border)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[var(--accent-primary)] group-hover:border-transparent group-hover:text-black transition-all">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Type badge */}
                  {lesson.type === 'article' && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[var(--accent-secondary)] rounded text-[8px] text-white font-bold uppercase">
                      Artigo
                    </div>
                  )}
                </div>

                {/* Content info */}
                <div className="flex-1 min-w-0 text-left">
                  <h3 className={cn(
                    'text-sm lg:text-base font-semibold leading-snug mb-1 line-clamp-2',
                    lesson.locked ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                  )}>
                    {lesson.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    {lesson.instructor && (
                      <>
                        <span>with {lesson.instructor}</span>
                        <span className="hidden sm:inline">•</span>
                      </>
                    )}
                    <span className="hidden sm:inline">{lesson.duration}</span>
                    {lesson.locked && (
                      <>
                        <span>•</span>
                        <span className="text-[var(--accent-premium)]">Premium</span>
                      </>
                    )}
                    {lesson.completed && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline text-[var(--accent-primary)]">Concluído</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Duration badge - Desktop */}
                <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                  <span className="text-[var(--text-muted)] text-sm">{lesson.duration}</span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-muted)] text-sm">
                Nenhuma aula encontrada para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </VeloxLayout>
  );
}
