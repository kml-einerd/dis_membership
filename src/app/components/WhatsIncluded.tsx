import { Check } from 'lucide-react';

interface IncludedItem {
  title: string;
  description?: string;
}

interface WhatsIncludedProps {
  items: IncludedItem[];
  title?: string;
}

export function WhatsIncluded({ items, title = "O que está incluído" }: WhatsIncludedProps) {
  return (
    <div className="mb-8">
      <h2 className="text-white font-medium text-lg mb-4">{title}</h2>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7c5dfa]/20 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-[#7c5dfa]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm font-medium leading-snug mb-0.5">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-white/50 text-xs leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
