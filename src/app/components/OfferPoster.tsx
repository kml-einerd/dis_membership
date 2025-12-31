import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OfferPosterProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  discount?: string;
  price: string;
  originalPrice?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export function OfferPoster({
  title,
  subtitle,
  imageUrl,
  discount,
  price,
  originalPrice,
  isHighlighted = false,
  onClick,
}: OfferPosterProps) {
  return (
    <button
      onClick={onClick}
      className="relative group w-full text-left"
    >
      {/* Subtle glow for highlighted */}
      {isHighlighted && (
        <div className="absolute -inset-1 bg-[#7c5dfa]/10 blur-xl rounded-2xl" />
      )}

      {/* Flow line for highlighted */}
      {isHighlighted && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c5dfa] via-[#7c5dfa]/60 to-transparent rounded-full z-10" />
      )}

      <div className="relative bg-white/[0.03] border border-white/[0.08] hover:border-[#7c5dfa]/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#7c5dfa]/10">
        {/* Vertical Poster Image - Netflix style tall aspect ratio */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Netflix-style gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          {/* Discount pill - top right, small Steam-like */}
          {discount && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#7c5dfa] rounded-md">
              <span className="text-white text-xs font-medium">{discount}</span>
            </div>
          )}

          {/* Sparkles badge for highlighted */}
          {isHighlighted && (
            <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#7c5dfa]/90 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          )}

          {/* Title overlay at bottom - Netflix style */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-medium text-base leading-tight mb-1">
              {title}
            </h3>
            <p className="text-white/60 text-xs leading-snug mb-2.5 line-clamp-2">
              {subtitle}
            </p>

            {/* Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium text-lg">{price}</span>
              {originalPrice && (
                <span className="text-white/30 text-xs line-through">
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
