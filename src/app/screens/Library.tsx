import { ChevronDown, ChevronUp, Lock, Play, FileText, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';

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
}

export default function Library() {
  const { navigate, goBack, canGoBack } = useNavigation();
  const [expandedModules, setExpandedModules] = useState<string[]>(['1']);

  const modules: Module[] = [
    {
      id: '1',
      title: 'Fundamentos: Como Encontrar Passagens Baratas',
      lessonsCount: 10,
      duration: '3h 20min',
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

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-24">
      {/* Header */}
      <div className="px-6 pt-4 pb-4">
        <div className="flex items-center gap-3">
          {canGoBack && (
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--app-text-secondary)]" />
            </button>
          )}
          <h1 className="text-[var(--app-text-primary)] text-2xl font-medium">
            Biblioteca
          </h1>
        </div>
      </div>

      {/* Modules List */}
      <div className="px-6 space-y-3">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.id);

          return (
            <div
              key={module.id}
              className="bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[var(--app-surface)] transition-colors"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-[var(--app-text-primary)] text-sm font-medium mb-1">
                    {module.title}
                  </h3>
                  <p className="text-[var(--app-text-muted)] text-xs">
                    {module.lessonsCount} aulas • {module.duration}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[var(--app-text-tertiary)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" />
                )}
              </button>

              {/* Lessons List */}
              {isExpanded && (
                <div className="border-t border-[var(--app-border-subtle)] divide-y divide-[var(--app-border-subtle)]">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-[var(--app-surface)] transition-colors text-left"
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        lesson.completed
                          ? 'bg-[var(--app-accent)]/15'
                          : lesson.locked
                          ? 'bg-[var(--app-surface)]'
                          : 'bg-[var(--app-surface)]'
                      }`}>
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 text-[var(--app-text-muted)]" />
                        ) : lesson.type === 'video' ? (
                          <Play className={`w-4 h-4 ${lesson.completed ? 'text-[var(--app-accent)]' : 'text-[var(--app-text-tertiary)]'}`} />
                        ) : (
                          <FileText className="w-4 h-4 text-[var(--app-text-tertiary)]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm leading-snug mb-0.5 truncate ${
                          lesson.locked
                            ? 'text-[var(--app-text-muted)]'
                            : 'text-[var(--app-text-primary)]'
                        }`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[var(--app-text-muted)] text-xs">
                          <span>{lesson.duration}</span>
                          {lesson.completed && (
                            <>
                              <span>•</span>
                              <span className="text-[var(--app-accent)]">Concluído</span>
                            </>
                          )}
                          {lesson.locked && (
                            <>
                              <span>•</span>
                              <span>Premium</span>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
