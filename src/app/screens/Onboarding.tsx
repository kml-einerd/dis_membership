import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';

const questions = [
  {
    id: 1,
    question: 'Qual é o seu objetivo principal?',
    options: [
      'Viajar gastando menos',
      'Encontrar passagens em promoção',
      'Aprender técnicas de busca',
      'Acumular milhas e pontos',
    ],
  },
  {
    id: 2,
    question: 'Com que frequência você viaja?',
    options: [
      'Raramente (1-2x ao ano)',
      'Ocasionalmente (3-4x ao ano)',
      'Frequentemente (5-10x ao ano)',
      'Muito frequente (mais de 10x)',
    ],
  },
  {
    id: 3,
    question: 'Qual tipo de viagem te interessa mais?',
    options: [
      'Praias e destinos tropicais',
      'Cidades e cultura',
      'Aventura e natureza',
      'Qualquer lugar com preço bom',
    ],
  },
];

export default function Onboarding() {
  const { navigateTab } = useNavigation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('onboarding_complete', 'true');
      navigateTab('home');
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-[var(--app-bg)] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-[var(--app-border)] relative">
        <div
          className="h-full bg-[var(--app-accent)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        <div>
          {/* Step indicator */}
          <p className="text-[var(--app-text-muted)] text-sm mb-8">
            Passo {step + 1} de {questions.length}
          </p>

          {/* Question */}
          <h1 className="text-[var(--app-text-primary)] text-2xl font-medium leading-tight mb-8">
            {currentQuestion.question}
          </h1>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full flex items-center justify-between p-4 rounded-[var(--app-radius-md)] border transition-all ${
                    isSelected
                      ? 'bg-[var(--app-accent-soft)] border-[var(--app-accent)]'
                      : 'bg-[var(--app-surface-hover)] border-[var(--app-border)] hover:bg-[var(--app-surface)]'
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? 'text-[var(--app-accent)]' : 'text-[var(--app-text-secondary)]'
                    }`}
                  >
                    {option}
                  </span>
                  {isSelected && (
                    <Check className="w-5 h-5 text-[var(--app-accent)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-[var(--app-radius-md)] font-medium transition-all ${
            canProceed
              ? 'bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-white'
              : 'bg-[var(--app-surface)] text-[var(--app-text-muted)] cursor-not-allowed'
          }`}
        >
          <span>{step === questions.length - 1 ? 'Começar' : 'Próximo'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
