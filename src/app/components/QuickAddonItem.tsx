import { Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuickAddonItemProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  price: string;
  discount?: string;
  ctaText?: string;
  onClick?: () => void;
}

export function QuickAddonItem({
  title,
  description,
  thumbnailUrl,
  price,
  discount,
  ctaText = 'Adicionar',
  onClick,
}: QuickAddonItemProps) {
  return (
    <div className="relative">
      {/* Flow line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c5dfa]/40 via-[#7c5dfa]/20 to-transparent rounded-full" />

      <button
        onClick={onClick}
        className="w-full text-left py-3 pl-4 pr-3 hover:bg-white/[0.03] rounded-xl transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white/5">
            <ImageWithFallback
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {discount && (
              <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-[#7c5dfa] rounded text-[10px] font-medium text-white">
                {discount}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white/85 font-medium text-sm leading-snug mb-1 group-hover:text-white transition-colors">
              {title}
            </h4>
            <p className="text-white/50 text-xs leading-snug line-clamp-1">
              {description}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="text-right">
              <div className="text-white font-medium text-base">{price}</div>
            </div>
            <div className="w-20">
              <div className="px-3 py-2 bg-[#7c5dfa]/10 hover:bg-[#7c5dfa]/15 border border-[#7c5dfa]/20 rounded-lg transition-colors">
                <span className="text-[#7c5dfa] text-xs font-medium whitespace-nowrap">
                  {ctaText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
