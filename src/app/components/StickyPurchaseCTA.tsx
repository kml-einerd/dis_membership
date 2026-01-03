import { ArrowRight } from 'lucide-react';

interface StickyPurchaseCTAProps {
  ctaText?: string;
  price: string;
  originalPrice?: string;
  onClick?: () => void;
}

export function StickyPurchaseCTA({
  ctaText = 'Quero desbloquear',
  price,
  originalPrice,
  onClick,
}: StickyPurchaseCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/[0.08] px-6 py-4 z-50">
      <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-medium text-xl">{price}</span>
            {originalPrice && (
              <span className="text-white/30 text-sm line-through">
                {originalPrice}
              </span>
            )}
          </div>
          <span className="text-white/40 text-xs">Pagamento único</span>
        </div>

        <button
          onClick={onClick}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#7c5dfa] hover:bg-[#6b4de8] rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#7c5dfa]/30 group"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
