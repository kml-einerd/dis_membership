import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { VideoPlayer } from './components/VideoPlayer';
import { ExpandableDescription } from './components/ExpandableDescription';
import { MaterialsCard } from './components/MaterialsCard';
import { ModuleChipsTabs } from './components/ModuleChipsTabs';
import { LessonListItem } from './components/LessonListItem';
import { LessonInteractionBlock } from '../components/community';
import { mockComments, mockQuestions, currentLessonOrigin } from '../data/mockCommunityData';
import type { CommentFormData, QuestionFormData } from '../components/community/types';

export default function VideoLesson() {
  const { goBack } = useNavigation();
  const [selectedModule, setSelectedModule] = useState('Módulo 2');

  const materials = [
    { id: '1', name: 'Guia de Métricas.pdf', type: 'pdf' as const },
    { id: '2', name: 'Template Analytics', type: 'link' as const },
    { id: '3', name: 'Exercício Prático.xlsx', type: 'file' as const },
  ];

  const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4'];

  interface Lesson {
    id: number;
    lessonNumber: number;
    title: string;
    duration: string;
    isWatched?: boolean;
    isCurrentLesson?: boolean;
    isLocked?: boolean;
    isBonusOffer?: boolean;
    discount?: string;
    watchProgress?: number;
  }

  // Module 2 lessons
  const module2Lessons: Lesson[] = [
    {
      id: 1,
      lessonNumber: 1,
      title: 'Introdução às Métricas de Marketing',
      duration: '8:30',
      isWatched: true,
    },
    {
      id: 2,
      lessonNumber: 2,
      title: 'Configurando Google Analytics',
      duration: '15:45',
      isWatched: true,
    },
    {
      id: 3,
      lessonNumber: 3,
      title: 'KPIs Fundamentais',
      duration: '10:20',
      isWatched: true,
      watchProgress: 100,
    },
    {
      id: 4,
      lessonNumber: 4,
      title: 'ROI e Conversão',
      duration: '11:15',
      watchProgress: 45,
    },
    {
      id: 5,
      lessonNumber: 5,
      title: 'Análise de Métricas Avançadas',
      duration: '12:00',
      isCurrentLesson: true,
    },
    {
      id: 6,
      lessonNumber: 6,
      title: 'Dashboard e Relatórios',
      duration: '14:30',
    },
    {
      id: 7,
      lessonNumber: 7,
      title: 'Otimização com Base em Dados',
      duration: '13:20',
    },
    {
      id: 8,
      lessonNumber: 8,
      title: 'Ferramentas Avançadas de Analytics',
      duration: '16:10',
      isLocked: true,
    },
    {
      id: 9,
      lessonNumber: 9,
      title: 'Estratégias Premium de Mensuração',
      duration: '18:45',
      isLocked: true,
      isBonusOffer: true,
      discount: '-60%',
    },
  ];

  // Module 1 lessons (sample)
  const module1Lessons: Lesson[] = [
    {
      id: 1,
      lessonNumber: 1,
      title: 'Fundamentos de Marketing Digital',
      duration: '9:15',
      isWatched: true,
    },
    {
      id: 2,
      lessonNumber: 2,
      title: 'Jornada do Cliente',
      duration: '12:30',
      isWatched: true,
    },
    {
      id: 3,
      lessonNumber: 3,
      title: 'Funis de Conversão',
      duration: '14:20',
      isWatched: true,
    },
    {
      id: 4,
      lessonNumber: 4,
      title: 'Personas e Segmentação',
      duration: '11:45',
      isWatched: true,
    },
  ];

  // Module 3 lessons (sample)
  const module3Lessons: Lesson[] = [
    {
      id: 1,
      lessonNumber: 1,
      title: 'Estratégias de Tráfego Pago',
      duration: '13:30',
    },
    {
      id: 2,
      lessonNumber: 2,
      title: 'Google Ads Essencial',
      duration: '16:20',
    },
    {
      id: 3,
      lessonNumber: 3,
      title: 'Facebook e Instagram Ads',
      duration: '15:40',
    },
    {
      id: 4,
      lessonNumber: 4,
      title: 'Remarketing Avançado',
      duration: '12:10',
      isLocked: true,
    },
  ];

  // Module 4 lessons (sample)
  const module4Lessons: Lesson[] = [
    {
      id: 1,
      lessonNumber: 1,
      title: 'Automação de Marketing',
      duration: '14:15',
    },
    {
      id: 2,
      lessonNumber: 2,
      title: 'Email Marketing Estratégico',
      duration: '11:50',
    },
    {
      id: 3,
      lessonNumber: 3,
      title: 'CRM e Relacionamento',
      duration: '13:25',
      isLocked: true,
      isBonusOffer: true,
    },
  ];

  const getLessonsForModule = (module: string) => {
    switch (module) {
      case 'Módulo 1':
        return module1Lessons;
      case 'Módulo 2':
        return module2Lessons;
      case 'Módulo 3':
        return module3Lessons;
      case 'Módulo 4':
        return module4Lessons;
      default:
        return module2Lessons;
    }
  };

  const currentLessons = getLessonsForModule(selectedModule);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-8">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(73,220,122,0.03),transparent_70%)]" />
      </div>

      {/* Header / Back Button */}
      <div className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-[var(--app-bg)]/60 backdrop-blur-xl border-b border-[var(--glass-border)]">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-all flex items-center justify-center group active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-primary)] group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex-1 px-4 text-center">
          <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">Assistindo Agora</span>
          <h2 className="text-[var(--text-primary)] text-sm font-semibold truncate">Análise de Métricas Avançadas</h2>
        </div>

        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      <div className="relative z-10">
        {/* Video Player */}
        <div className="pt-6 px-4 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl border border-[var(--glass-border-strong)]">
            <VideoPlayer
              thumbnailUrl="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvdXJzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NzA5OTU3MXww&ixlib=rb-4.1.0&q=80&w=1080"
              title="Análise de Métricas Avançadas"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="px-4 lg:px-8 max-w-5xl mx-auto mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Info Panel */}
            <div className="bg-[var(--glass-surface-1)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] text-[10px] font-bold rounded uppercase">Módulo 2</span>
                <span className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-wider">Aula 5 • 12 min</span>
              </div>
              <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4">Análise de Métricas Avançadas</h1>
              <p className="text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed">
                Nesta aula você aprenderá a analisar métricas avançadas de marketing digital, interpretar dados complexos e tomar decisões estratégicas baseadas em performance. Vamos explorar técnicas profissionais de análise, como calcular CAC, LTV, taxa de conversão por canal e muito mais.
              </p>
            </div>

            {/* Materials Card */}
            <MaterialsCard materials={materials} />

            {/* Community Interaction Block */}
            <LessonInteractionBlock
              origin={currentLessonOrigin}
              comments={mockComments}
              questions={mockQuestions}
              onCommentSubmit={(data: CommentFormData) => {
                console.log('Comment submitted:', data);
              }}
              onQuestionSubmit={(data: QuestionFormData) => {
                console.log('Question submitted:', data);
              }}
              onNavigateToForum={() => {
                // TODO: Navigate to forum
                console.log('Navigate to forum');
              }}
            />
          </div>

          <div className="space-y-6">
            {/* Module Navigation */}
            <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border-strong)] rounded-[var(--radius-2xl)] overflow-hidden flex flex-col h-[600px] sticky top-24 shadow-xl">
              <div className="p-5 border-b border-[var(--glass-border)]">
                <h3 className="text-white font-bold text-sm uppercase tracking-[0.1em]">Conteúdo do curso</h3>
              </div>

              <div className="p-3">
                <ModuleChipsTabs
                  modules={modules}
                  selectedModule={selectedModule}
                  onSelectModule={setSelectedModule}
                />
              </div>

              {/* Lesson List */}
              <div className="flex-1 overflow-y-auto scrollbar-custom p-3 space-y-2">
                {currentLessons.map((lesson) => (
                  <LessonListItem
                    key={lesson.id}
                    lessonNumber={lesson.lessonNumber}
                    title={lesson.title}
                    duration={lesson.duration}
                    isWatched={lesson.isWatched}
                    isCurrentLesson={lesson.isCurrentLesson}
                    isLocked={lesson.isLocked}
                    isBonusOffer={lesson.isBonusOffer}
                    discount={lesson.discount}
                    watchProgress={lesson.watchProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
