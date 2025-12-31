import { ArrowLeft } from 'lucide-react';
import { ProgressDots } from './ProgressDots';

interface OnboardingHeaderProps {
  onBack?: () => void;
  questionNumber?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export function OnboardingHeader({
  onBack,
  questionNumber,
  showProgress = false,
  currentStep = 0,
  totalSteps = 3,
}: OnboardingHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white/80" />
          </button>
        )}
        {questionNumber && (
          <span className="text-white/50 text-sm">{questionNumber}</span>
        )}
      </div>
      {showProgress && (
        <ProgressDots total={totalSteps} current={currentStep} />
      )}
    </div>
  );
}
