import { Crown, CheckCircle, ArrowRight } from 'lucide-react';

interface Benefit {
  text: string;
}

interface MainUpgradeBannerProps {
  title: string;
  description: string;
  benefits: Benefit[];
  price: string;
  originalPrice?: string;
  ctaText?: string;
  onClick?: () => void;
}

export function MainUpgradeBanner({
  title,
  description,
  benefits,
  price,
  originalPrice,
  ctaText = 'Desbloquear agora',
  onClick,
}: MainUpgradeBannerProps) {
  return (
    <div className="relative group overflow-hidden rounded-3xl">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c5dfa]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.03] border border-white/[0.1] rounded-3xl p-6">
        {/* Header with crown icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7c5dfa] to-[#6b4de8] flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-xl leading-tight mb-2">
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-2.5 mb-5">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#7c5dfa] flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm leading-relaxed">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-white font-medium text-2xl">{price}</span>
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
            className="flex items-center gap-2 px-6 py-3.5 bg-[#7c5dfa] hover:bg-[#6b4de8] rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#7c5dfa]/30 group/cta"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
