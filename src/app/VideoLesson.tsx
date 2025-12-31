import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { VideoPlayer } from './components/VideoPlayer';
import { ExpandableDescription } from './components/ExpandableDescription';
import { MaterialsCard } from './components/MaterialsCard';
import { ModuleChipsTabs } from './components/ModuleChipsTabs';
import { LessonListItem } from './components/LessonListItem';

export default function VideoLesson() {
  const { goBack } = useNavigation();
  const [selectedModule, setSelectedModule] = useState('Módulo 2');

  const materials = [
    { id: '1', name: 'Guia de Métricas.pdf', type: 'pdf' as const },
    { id: '2', name: 'Template Analytics', type: 'link' as const },
    { id: '3', name: 'Exercício Prático.xlsx', type: 'file' as const },
  ];

  const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4'];

  // Module 2 lessons
  const module2Lessons = [
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
  const module1Lessons = [
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
  const module3Lessons = [
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
  const module4Lessons = [
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
    <div className="min-h-screen bg-[#0a0a0f] pb-8">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Video Player */}
      <div className="pt-4 px-6">
        <VideoPlayer
          thumbnailUrl="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvdXJzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NzA5OTU3MXww&ixlib=rb-4.1.0&q=80&w=1080"
          title="Análise de Métricas Avançadas"
        />
      </div>

      {/* Info Panel */}
      <ExpandableDescription
        title="Análise de Métricas Avançadas"
        metadata="Módulo 2 • Aula 5 • 12 min"
        description="Nesta aula você aprenderá a analisar métricas avançadas de marketing digital, interpretar dados complexos e tomar decisões estratégicas baseadas em performance. Vamos explorar técnicas profissionais de análise, como calcular CAC, LTV, taxa de conversão por canal e muito mais."
        hasMaterials={true}
      />

      {/* Materials Card */}
      <MaterialsCard materials={materials} />

      {/* Module Navigation */}
      <div className="mb-4">
        <h3 className="text-white font-medium text-base px-6 mb-3.5">
          Conteúdo do curso
        </h3>
        <ModuleChipsTabs
          modules={modules}
          selectedModule={selectedModule}
          onSelectModule={setSelectedModule}
        />
      </div>

      {/* Lesson List */}
      <div className="px-6 space-y-2">
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
  );
}
