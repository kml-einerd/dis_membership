import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Play, FileText, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  GlassSurface,
  Progress,
  SectionHeader,
  ContentCard,
  SidebarWidget,
} from '../../components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/cn';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article';
  locked?: boolean;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: Lesson[];
  progress: number;
}

export default function LibraryV2() {
  const { navigate } = useNavigation();
  const [expandedModules, setExpandedModules] = useState<string[]>(['1']);
  const [activeTab, setActiveTab] = useState('Todos');

  const tabs = ['Todos', 'Em progresso', 'Concluídos', 'Salvos'];

  const modules: Module[] = [
    {
      id: '1',
      title: 'Fundamentos: Como Encontrar Passagens Baratas',
      lessonsCount: 10,
      duration: '3h 20min',
      progress: 40,
      lessons: [
        { id: '1-1', title: 'Introdução: Por que você paga caro', duration: '12min', type: 'video', completed: true },
        { id: '1-2', title: 'Melhores sites para comparar preços', duration: '18min', type: 'video', completed: true },
        { id: '1-3', title: 'Quando comprar: timing perfeito', duration: '15min', type: 'video' },
        { id: '1-4', title: 'Checklist antes de comprar', duration: '8min', type: 'article' },
      ],
    },
    {
      id: '2',
      title: 'Técnicas Avançadas de Busca',
      lessonsCount: 12,
      duration: '4h 50min',
      progress: 0,
      lessons: [
        { id: '2-1', title: 'Alertas de preço automáticos', duration: '20min', type: 'video' },
        { id: '2-2', title: 'Voos com múltiplas paradas', duration: '25min', type: 'video', locked: true },
        { id: '2-3', title: 'Milhas e pontos: maximizando', duration: '30min', type: 'video', locked: true },
      ],
    },
    {
      id: '3',
      title: 'Ferramentas e Extensões',
      lessonsCount: 8,
      duration: '2h 30min',
      progress: 0,
      lessons: [
        { id: '3-1', title: 'Rastreador de preços: setup', duration: '15min', type: 'video', locked: true },
        { id: '3-2', title: 'Alertas no Telegram', duration: '12min', type: 'article', locked: true },
      ],
    },
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.locked) {
      navigate('locked-preview');
    } else if (lesson.type === 'video') {
      navigate('video-lesson');
    } else {
      navigate('article-reader');
    }
  };

  const totalProgress = Math.round(
    modules.reduce((acc, m) => acc + m.progress, 0) / modules.length
  );

  // Sidebar content
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Overall Progress */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Progresso geral
        </h3>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="var(--glass-surface-3)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56 * totalProgress / 100} ${2 * Math.PI * 56}`}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[var(--text-primary)] text-3xl font-bold">{totalProgress}%</span>
            <span className="text-[var(--text-muted)] text-xs">completo</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[var(--text-primary)] text-lg font-bold">4</p>
            <p className="text-[var(--text-muted)] text-xs">Aulas concluídas</p>
          </div>
          <div>
            <p className="text-[var(--text-primary)] text-lg font-bold">26</p>
            <p className="text-[var(--text-muted)] text-xs">Aulas restantes</p>
          </div>
        </div>
      </GlassSurface>

      {/* Study Stats */}
      <GlassSurface
        variant="surface-1"
        blur="light"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Estatísticas
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-soft)] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
              </div>
              <span className="text-[var(--text-secondary)] text-sm">Tempo de estudo</span>
            </div>
            <span className="text-[var(--text-primary)] text-sm font-semibold">2h 30min</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-secondary-soft)] flex items-center justify-center">
                <Play className="w-4 h-4 text-[var(--accent-secondary)]" />
              </div>
              <span className="text-[var(--text-secondary)] text-sm">Vídeos assistidos</span>
            </div>
            <span className="text-[var(--text-primary)] text-sm font-semibold">4</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-purchase-soft)] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[var(--accent-purchase)]" />
              </div>
              <span className="text-[var(--text-secondary)] text-sm">Artigos lidos</span>
            </div>
            <span className="text-[var(--text-primary)] text-sm font-semibold">2</span>
          </div>
        </div>
      </GlassSurface>

      {/* Continue Where You Left */}
      <SidebarWidget
        title="Continue de onde parou"
      >
        <ContentCard
          imageUrl="https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400"
          title="Quando comprar: timing perfeito"
          subtitle="Aula 3 de 10 • 15min"
          progress={45}
          variant="compact"
          onClick={() => navigate('video-lesson')}
        />
      </SidebarWidget>
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      <div className="px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-[var(--text-primary)] text-2xl lg:text-3xl font-bold mb-2">
            Minha Biblioteca
          </h1>
          <p className="text-[var(--text-tertiary)] text-sm lg:text-base">
            Acompanhe seu progresso nos módulos
          </p>
        </motion.div>

        {/* Progress Overview - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:hidden mb-6"
        >
          <GlassSurface
            variant="surface-2"
            blur="medium"
            className="p-4 rounded-[var(--radius-xl)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--text-secondary)] text-sm">Progresso geral</span>
              <span className="text-[var(--text-primary)] text-sm font-bold">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} variant="gradient" size="md" />
            <div className="flex justify-between mt-3 text-xs text-[var(--text-muted)]">
              <span>4 aulas concluídas</span>
              <span>26 restantes</span>
            </div>
          </GlassSurface>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <ChipTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </motion.div>

        {/* Modules List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {modules.map((module, moduleIndex) => {
            const isExpanded = expandedModules.includes(module.id);
            const completedLessons = module.lessons.filter(l => l.completed).length;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + moduleIndex * 0.05 }}
              >
                <GlassSurface
                  variant="surface-2"
                  blur="medium"
                  className="rounded-[var(--radius-xl)] overflow-hidden"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center gap-4 p-4 lg:p-5 hover:bg-[var(--glass-surface-hover)] transition-colors"
                  >
                    {/* Progress Circle */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="var(--glass-surface-3)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="var(--accent-primary)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 20 * module.progress / 100} ${2 * Math.PI * 20}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[var(--text-primary)] text-xs font-bold">{module.progress}%</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="text-[var(--text-primary)] text-sm lg:text-base font-semibold leading-snug line-clamp-2">
                        {module.title}
                      </h3>
                      <p className="text-[var(--text-muted)] text-xs lg:text-sm mt-1">
                        {completedLessons}/{module.lessonsCount} aulas • {module.duration}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <div className={cn(
                      'w-8 h-8 rounded-full bg-[var(--glass-surface-3)] flex items-center justify-center transition-transform',
                      isExpanded && 'rotate-180'
                    )}>
                      <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
                    </div>
                  </button>

                  {/* Lessons List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--glass-border-subtle)] divide-y divide-[var(--glass-border-subtle)]">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <motion.button
                              key={lesson.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lessonIndex * 0.03 }}
                              onClick={() => handleLessonClick(lesson)}
                              className="w-full flex items-center gap-4 p-4 hover:bg-[var(--glass-surface-hover)] transition-colors text-left"
                            >
                              {/* Status Icon */}
                              <div className={cn(
                                'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
                                lesson.completed
                                  ? 'bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)]'
                                  : lesson.locked
                                  ? 'bg-[var(--glass-surface-2)]'
                                  : 'bg-[var(--glass-surface-3)]'
                              )}>
                                {lesson.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />
                                ) : lesson.locked ? (
                                  <Lock className="w-4 h-4 text-[var(--text-muted)]" />
                                ) : lesson.type === 'video' ? (
                                  <Play className="w-4 h-4 text-[var(--text-tertiary)] ml-0.5" />
                                ) : (
                                  <FileText className="w-4 h-4 text-[var(--text-tertiary)]" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className={cn(
                                  'text-sm leading-snug',
                                  lesson.locked
                                    ? 'text-[var(--text-muted)]'
                                    : lesson.completed
                                    ? 'text-[var(--text-secondary)]'
                                    : 'text-[var(--text-primary)] font-medium'
                                )}>
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[var(--text-muted)] text-xs">{lesson.duration}</span>
                                  {lesson.completed && (
                                    <span className="text-[var(--accent-primary)] text-xs font-medium">Concluído</span>
                                  )}
                                  {lesson.locked && (
                                    <span className="text-[var(--accent-premium)] text-xs font-medium">Premium</span>
                                  )}
                                </div>
                              </div>

                              {/* Type Badge */}
                              <div className={cn(
                                'hidden sm:flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                                lesson.type === 'video'
                                  ? 'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)]'
                                  : 'bg-[var(--accent-purchase-soft)] text-[var(--accent-purchase)]'
                              )}>
                                {lesson.type === 'video' ? (
                                  <>
                                    <Play className="w-3 h-3" />
                                    Vídeo
                                  </>
                                ) : (
                                  <>
                                    <FileText className="w-3 h-3" />
                                    Artigo
                                  </>
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassSurface>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </VeloxLayout>
  );
}

