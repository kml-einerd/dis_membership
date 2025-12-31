import { OptionRow } from './OptionRow';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

export function QuestionCard({
  question,
  options,
  selectedOption,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-white font-medium leading-tight">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <OptionRow
            key={option}
            label={option}
            selected={selectedOption === option}
            onClick={() => onSelectOption(option)}
          />
        ))}
      </div>
    </div>
  );
}
