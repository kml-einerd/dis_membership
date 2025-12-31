import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedOfferCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  discount?: string;
  price: string;
  originalPrice?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export function FeaturedOfferCard({
  title,
  subtitle,
  imageUrl,
  discount,
  price,
  originalPrice,
  isHighlighted = false,
  onClick,
}: FeaturedOfferCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group w-full overflow-hidden rounded-2xl ${
        isHighlighted
          ? 'bg-gradient-to-br from-[#7c5dfa]/10 via-transparent to-transparent'
          : ''
      }`}
    >
      {/* Flow line for highlighted */}
      {isHighlighted && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c5dfa] via-[#7c5dfa]/60 to-transparent z-10" />
      )}

      {/* Subtle glow effect */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-[#7c5dfa]/5 blur-xl rounded-2xl" />
      )}

      <div className="relative bg-white/[0.03] border border-white/[0.08] hover:border-[#7c5dfa]/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#7c5dfa]/10">
        {/* Image with Netflix overlay */}
        <div className="aspect-video relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Discount pill */}
          {discount && (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#7c5dfa] rounded-lg">
              <span className="text-white text-xs font-medium">{discount}</span>
            </div>
          )}

          {/* Sparkles icon for highlighted */}
          {isHighlighted && (
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#7c5dfa]/90 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-medium text-lg leading-tight mb-1.5">
              {title}
            </h3>
            <p className="text-white/70 text-sm leading-snug mb-3">
              {subtitle}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-xl">{price}</span>
              {originalPrice && (
                <span className="text-white/40 text-sm line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
