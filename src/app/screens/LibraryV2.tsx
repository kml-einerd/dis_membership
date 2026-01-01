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
      title: 'Módulo 1: Fundamentos de Viagens Econômicas',
      lessonsCount: 15,
      duration: '4h 35min',
      progress: 53,
      lessons: [
        { id: '1-1', title: 'Boas-vindas: Como este curso vai mudar suas viagens', duration: '5min', type: 'video', completed: true },
        { id: '1-2', title: 'Por que você paga mais caro em passagens', duration: '12min', type: 'video', completed: true },
        { id: '1-3', title: 'Os 3 pilares de uma viagem econômica', duration: '15min', type: 'video', completed: true },
        { id: '1-4', title: 'Melhores sites para comparar preços (2025)', duration: '18min', type: 'video', completed: true },
        { id: '1-5', title: 'Google Flights: O guia completo', duration: '22min', type: 'video', completed: true },
        { id: '1-6', title: 'Skyscanner vs Kayak vs Momondo', duration: '16min', type: 'video', completed: true },
        { id: '1-7', title: 'Quando comprar: timing perfeito', duration: '20min', type: 'video', completed: true },
        { id: '1-8', title: 'Dias da semana mais baratos para voar', duration: '14min', type: 'video' },
        { id: '1-9', title: 'Aeroportos alternativos: economia de até 60%', duration: '18min', type: 'video' },
        { id: '1-10', title: 'Voos diretos vs conexões: quando vale a pena', duration: '12min', type: 'video' },
        { id: '1-11', title: 'Bagagem: como evitar taxas extras', duration: '15min', type: 'article' },
        { id: '1-12', title: 'Checklist completa antes de comprar', duration: '10min', type: 'article' },
        { id: '1-13', title: 'Exercício prático: Encontre sua primeira oferta', duration: '25min', type: 'video' },
        { id: '1-14', title: 'Template: Planilha de comparação de preços', duration: '8min', type: 'article' },
        { id: '1-15', title: 'Resumo e próximos passos', duration: '5min', type: 'video' },
      ],
    },
    {
      id: '2',
      title: 'Módulo 2: Técnicas Avançadas de Busca',
      lessonsCount: 18,
      duration: '6h 20min',
      progress: 0,
      lessons: [
        { id: '2-1', title: 'Alertas de preço automáticos: Setup completo', duration: '20min', type: 'video' },
        { id: '2-2', title: 'Como encontrar erros de tarifa antes dos outros', duration: '25min', type: 'video' },
        { id: '2-3', title: 'Voos com múltiplas paradas: economize 40%', duration: '22min', type: 'video', locked: true },
        { id: '2-4', title: 'Stopover estratégico: 2 destinos pelo preço de 1', duration: '18min', type: 'video', locked: true },
        { id: '2-5', title: 'Open jaw tickets: o segredo dos profissionais', duration: '20min', type: 'video', locked: true },
        { id: '2-6', title: 'Busca avançada: filtros que ninguém usa', duration: '15min', type: 'video', locked: true },
        { id: '2-7', title: 'Modo anônimo: mito ou verdade?', duration: '12min', type: 'video', locked: true },
        { id: '2-8', title: 'VPN para passagens: quando funciona', duration: '14min', type: 'video', locked: true },
        { id: '2-9', title: 'Matrix ITA: a ferramenta secreta da Google', duration: '28min', type: 'video', locked: true },
        { id: '2-10', title: 'Positioning flights: técnica avançada', duration: '16min', type: 'video', locked: true },
        { id: '2-11', title: 'Como usar o Hopper para prever preços', duration: '18min', type: 'video', locked: true },
        { id: '2-12', title: 'Extensões Chrome essenciais', duration: '15min', type: 'article', locked: true },
        { id: '2-13', title: 'Caso real: SP para Paris por R$ 1.200', duration: '20min', type: 'video', locked: true },
        { id: '2-14', title: 'Caso real: Brasil-Ásia por R$ 2.000', duration: '22min', type: 'video', locked: true },
        { id: '2-15', title: 'Exercício: Encontre um erro de tarifa', duration: '30min', type: 'article', locked: true },
        { id: '2-16', title: 'Template: Planilha de rastreamento de ofertas', duration: '10min', type: 'article', locked: true },
        { id: '2-17', title: 'Fórum de dúvidas e casos reais', duration: '15min', type: 'article', locked: true },
        { id: '2-18', title: 'Resumo do módulo avançado', duration: '8min', type: 'video', locked: true },
      ],
    },
    {
      id: '3',
      title: 'Módulo 3: Milhas e Pontos - Sistema Completo',
      lessonsCount: 24,
      duration: '8h 45min',
      progress: 0,
      lessons: [
        { id: '3-1', title: 'Introdução ao mundo das milhas', duration: '15min', type: 'video', locked: true },
        { id: '3-2', title: 'Tipos de milhas: aéreas vs bancos', duration: '18min', type: 'video', locked: true },
        { id: '3-3', title: 'Melhores cartões de crédito para acumular', duration: '25min', type: 'video', locked: true },
        { id: '3-4', title: 'Como acumular sem viajar', duration: '20min', type: 'video', locked: true },
        { id: '3-5', title: 'Programas de fidelidade: qual escolher', duration: '22min', type: 'video', locked: true },
        { id: '3-6', title: 'Transferência de pontos: guia completo', duration: '28min', type: 'video', locked: true },
        { id: '3-7', title: 'Sweet spots: passagens baratas em milhas', duration: '30min', type: 'video', locked: true },
        { id: '3-8', title: 'Como resgatar primeira classe por 30k milhas', duration: '35min', type: 'video', locked: true },
        { id: '3-9', title: 'Calendários de baixa temporada', duration: '15min', type: 'article', locked: true },
        { id: '3-10', title: 'Latam Pass: Guia completo', duration: '25min', type: 'video', locked: true },
      ],
    },
    {
      id: '4',
      title: 'Módulo 4: Destinos Específicos - Europa',
      lessonsCount: 20,
      duration: '7h 10min',
      progress: 0,
      lessons: [
        { id: '4-1', title: 'Planejamento: Quanto custa viajar pela Europa', duration: '20min', type: 'video', locked: true },
        { id: '4-2', title: 'Melhores épocas para visitar cada país', duration: '18min', type: 'video', locked: true },
        { id: '4-3', title: 'Voos low-cost na Europa: Ryanair, EasyJet, Wizz', duration: '25min', type: 'video', locked: true },
        { id: '4-4', title: 'Passes de trem: Eurail vs Interrail', duration: '22min', type: 'video', locked: true },
        { id: '4-5', title: 'Hospedagem: Hostels vs Airbnb vs Hotéis', duration: '20min', type: 'video', locked: true },
      ],
    },
    {
      id: '5',
      title: 'Módulo 5: Ferramentas e Automação',
      lessonsCount: 12,
      duration: '3h 40min',
      progress: 0,
      lessons: [
        { id: '5-1', title: 'Rastreador de preços: Setup completo', duration: '18min', type: 'video', locked: true },
        { id: '5-2', title: 'Alertas no Telegram e WhatsApp', duration: '15min', type: 'video', locked: true },
        { id: '5-3', title: 'Extensão Chrome: Instalação e uso', duration: '20min', type: 'video', locked: true },
        { id: '5-4', title: 'App mobile: Tutorial completo', duration: '16min', type: 'video', locked: true },
        { id: '5-5', title: 'Planilhas automatizadas de controle', duration: '22min', type: 'article', locked: true },
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
            const isLocked = module.lessons.some(l => l.locked);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + moduleIndex * 0.05 }}
              >
                <GlassSurface
                  variant={isLocked ? "surface-3" : "surface-2"}
                  blur="medium"
                  glow={isLocked}
                  glowColor="var(--accent-purchase)"
                  borderGradient={isLocked ? "purchase" : "none"}
                  className={cn(
                    "rounded-[var(--radius-xl)] overflow-hidden transition-all duration-500",
                    isLocked && "shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                  )}
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center gap-4 p-4 lg:p-5 hover:bg-[var(--glass-surface-hover)] transition-colors relative"
                  >
                    {isLocked && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purchase)]/[0.02] to-transparent pointer-events-none" />
                    )}
                    
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
                        {!isLocked && (
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
                        )}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isLocked ? (
                          <Lock className="w-4 h-4 text-[var(--accent-purchase)]" />
                        ) : (
                          <span className="text-[var(--text-primary)] text-xs font-bold">{module.progress}%</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={cn(
                          "text-sm lg:text-base font-bold leading-snug line-clamp-2",
                          isLocked ? "text-[var(--text-tertiary)]" : "text-[var(--text-primary)]"
                        )}>
                          {module.title}
                        </h3>
                        {isLocked && (
                          <Badge variant="locked" size="sm" className="bg-[var(--accent-purchase-soft)] text-[var(--accent-purchase)] border-none">PREMIUM</Badge>
                        )}
                      </div>
                      <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-bold">
                        {completedLessons}/{module.lessonsCount} aulas • {module.duration}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <div className={cn(
                      'w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-transform',
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
                                'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                                lesson.completed
                                  ? 'bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)]'
                                  : lesson.locked
                                  ? 'bg-white/5 border border-white/5 group-hover:bg-[var(--accent-purchase-soft)] group-hover:border-[var(--accent-purchase-border)]'
                                  : 'bg-white/5 border border-white/10 group-hover:bg-[var(--accent-primary)] group-hover:border-transparent group-hover:text-black'
                              )}>
                                {lesson.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />
                                ) : lesson.locked ? (
                                  <Lock className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-purchase)] transition-colors" />
                                ) : lesson.type === 'video' ? (
                                  <Play className={cn("w-4 h-4 ml-0.5", !lesson.completed && "fill-current")} />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className={cn(
                                  'text-sm leading-snug transition-colors',
                                  lesson.locked
                                    ? 'text-[var(--text-tertiary)] font-medium'
                                    : lesson.completed
                                    ? 'text-[var(--text-secondary)]'
                                    : 'text-[var(--text-primary)] font-bold group-hover:text-[var(--accent-primary)]'
                                )}>
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider">{lesson.duration}</span>
                                  {lesson.completed && (
                                    <span className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-wider">Concluído</span>
                                  )}
                                  {lesson.locked && (
                                    <span className="text-[var(--accent-purchase)] text-[10px] font-bold uppercase tracking-wider">Bloqueado</span>
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

