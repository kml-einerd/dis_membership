import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button, GlassSurface, Progress } from './components/design-system';
import { cn } from './utils/cn';

interface Question {
  id: string;
  question: string;
  options: { id: string; label: string; icon?: string }[];
}

const questions: Question[] = [
  {
    id: 'goal',
    question: 'Qual é o seu principal objetivo?',
    options: [
      { id: 'domestic', label: 'Viajar pelo Brasil', icon: '🇧🇷' },
      { id: 'international', label: 'Conhecer outros países', icon: '✈️' },
      { id: 'both', label: 'Ambos', icon: '🌍' },
    ],
  },
  {
    id: 'budget',
    question: 'Qual é o seu orçamento médio por viagem?',
    options: [
      { id: 'low', label: 'Até R$ 2.000', icon: '💰' },
      { id: 'medium', label: 'R$ 2.000 - R$ 5.000', icon: '💵' },
      { id: 'high', label: 'Acima de R$ 5.000', icon: '💎' },
    ],
  },
  {
    id: 'experience',
    question: 'Qual é o seu nível de experiência?',
    options: [
      { id: 'beginner', label: 'Iniciante - Primeira viagem', icon: '🌱' },
      { id: 'intermediate', label: 'Intermediário - Algumas viagens', icon: '🧳' },
      { id: 'advanced', label: 'Experiente - Viajo com frequência', icon: '🎯' },
    ],
  },
];

export default function OnboardingV2() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save onboarding completion
      localStorage.setItem('onboarding_complete', 'true');
      localStorage.setItem('onboarding_answers', JSON.stringify(answers));
      console.log('Navigate to: home');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const selectedAnswer = answers[currentQuestion.id];
  const canProceed = !!selectedAnswer;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Progress */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-xs">Configuração</p>
              <p className="text-[var(--text-primary)] text-sm font-semibold">
                {currentStep + 1} de {questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem('onboarding_complete', 'true');
              console.log('Navigate to: home');
            }}
            className="text-[var(--text-tertiary)] text-sm hover:text-[var(--text-primary)] transition-colors"
          >
            Pular
          </button>
        </div>
        <Progress value={progress} variant="primary" size="md" />
      </header>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 className="text-[var(--text-primary)] text-2xl font-bold mb-2 leading-tight">
          {currentQuestion.question}
        </h1>
        <p className="text-[var(--text-tertiary)] text-sm mb-8">
          Escolha a opção que melhor se adequa a você
        </p>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;

            return (
              <GlassSurface
                key={option.id}
                variant={isSelected ? 'surface-3' : 'surface-1'}
                blur="light"
                onClick={() => handleSelect(option.id)}
                className={cn(
                  'p-5 rounded-[var(--radius-lg)] cursor-pointer transition-all duration-200',
                  'hover:bg-[var(--glass-surface-2)]',
                  isSelected && 'ring-2 ring-[var(--accent-primary)] ring-offset-2 ring-offset-[var(--app-bg)]'
                )}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{option.icon}</div>
                    <span className="text-[var(--text-primary)] font-medium">
                      {option.label}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </GlassSurface>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canProceed}
          onClick={handleNext}
        >
          {isLastStep ? 'Começar' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}
