import { Check } from 'lucide-react';

interface Benefit {
  text: string;
}

interface BenefitsListProps {
  benefits: Benefit[];
  title?: string;
}

export function BenefitsList({ benefits, title = 'Por que essa oferta?' }: BenefitsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-white font-medium text-lg mb-4">{title}</h2>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7c5dfa]/15 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-[#7c5dfa]" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed flex-1">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
