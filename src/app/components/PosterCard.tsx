import { Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PosterCardProps {
  title: string;
  imageUrl: string;
  badge?: 'Novo' | 'Popular' | 'Premium';
  isLocked?: boolean;
  discount?: string;
  onClick?: () => void;
}

export function PosterCard({
  title,
  imageUrl,
  badge,
  isLocked = false,
  discount,
  onClick,
}: PosterCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[128px] group relative"
    >
      {/* Flow line for locked/highlighted items */}
      {(isLocked || discount) && (
        <div className="absolute left-0 top-0 bottom-8 w-[3px] bg-gradient-to-b from-[#7c5dfa] to-[#7c5dfa]/30 rounded-full z-10" />
      )}

      <div
        className={`relative rounded-2xl overflow-hidden mb-2 ${
          isLocked || discount
            ? 'ring-1 ring-[#7c5dfa]/30 shadow-[0_0_20px_rgba(124,93,250,0.15)]'
            : ''
        }`}
      >
        <div className="w-[128px] h-[190px] bg-white/5">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* Top badge */}
        {badge && (
          <div className="absolute top-2 left-2">
            <span
              className={`text-[10px] px-2 py-1 rounded-lg font-medium ${
                badge === 'Novo'
                  ? 'bg-[#7c5dfa] text-white'
                  : badge === 'Popular'
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'bg-black/60 text-[#7c5dfa] backdrop-blur-sm'
              }`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-2 right-2">
            <span className="text-xs px-2 py-1 rounded-lg font-medium bg-[#7c5dfa] text-white">
              {discount}
            </span>
          </div>
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-[#7c5dfa]/20 flex items-center justify-center border border-[#7c5dfa]/40">
                <Lock className="w-5 h-5 text-[#7c5dfa]" />
              </div>
              <span className="text-[#7c5dfa] text-xs font-medium">Premium</span>
            </div>
          </div>
        )}
      </div>

      <h4 className="text-white/90 text-sm text-left line-clamp-2 leading-snug px-1">
        {title}
      </h4>
    </button>
  );
}
