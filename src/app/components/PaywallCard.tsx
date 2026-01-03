import { Lock, Check, ArrowRight } from 'lucide-react';

interface Benefit {
  text: string;
}

interface PaywallCardProps {
  title?: string;
  benefits: Benefit[];
  price: string;
  originalPrice?: string;
  ctaText?: string;
  onClick?: () => void;
}

export function PaywallCard({
  title = 'Desbloqueie o acesso completo',
  benefits,
  price,
  originalPrice,
  ctaText = 'Desbloquear',
  onClick,
}: PaywallCardProps) {
  return (
    <div className="relative">
      {/* Subtle glow */}
      <div className="absolute -inset-1 bg-[#7c5dfa]/10 blur-xl rounded-3xl" />

      <div className="relative bg-gradient-to-br from-[#141419] to-[#0a0a0f] border border-white/[0.12] rounded-3xl p-6">
        {/* Header with lock icon */}
        <div className="flex items-start gap-3 mb-5">
          <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7c5dfa] to-[#6b4de8] flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-lg leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2.5 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#7c5dfa]/20 flex items-center justify-center mt-0.5">
                <Check className="w-2.5 h-2.5 text-[#7c5dfa]" />
              </div>
              <span className="text-white/70 text-sm leading-relaxed">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-white font-medium text-2xl">{price}</span>
          {originalPrice && (
            <span className="text-white/30 text-sm line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={onClick}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#7c5dfa] hover:bg-[#6b4de8] rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#7c5dfa]/30 group"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Trust badge */}
        <p className="text-white/40 text-xs text-center mt-3">
          Garantia de 30 dias • Acesso vitalício
        </p>
      </div>
    </div>
  );
}
