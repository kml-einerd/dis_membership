import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQAccordion({ faqs, title = 'Perguntas frequentes' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-24">
      <h2 className="text-white font-medium text-lg mb-4">{title}</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className="w-full text-left bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-3 p-4">
                <h3 className="text-white text-sm font-medium leading-snug flex-1">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-white/60 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {isOpen && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-white/60 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
