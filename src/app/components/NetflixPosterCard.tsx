import { Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NetflixPosterCardProps {
  title: string;
  imageUrl: string;
  metadata?: string;
  badge?: 'Novo' | 'Popular' | 'Premium';
  isLocked?: boolean;
  discount?: string;
  onClick?: () => void;
}

export function NetflixPosterCard({
  title,
  imageUrl,
  metadata,
  badge,
  isLocked = false,
  discount,
  onClick,
}: NetflixPosterCardProps) {
  const showFlowLine = isLocked || discount;

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[128px] group relative"
    >
      {/* Flow line for locked/highlighted items */}
      {showFlowLine && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c5dfa] via-[#7c5dfa]/60 to-transparent rounded-full z-10" />
      )}

      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          showFlowLine
            ? 'ring-1 ring-[#7c5dfa]/20 shadow-[0_0_24px_rgba(124,93,250,0.12)]'
            : ''
        } ${
          !isLocked ? 'group-hover:ring-1 group-hover:ring-white/20' : ''
        }`}
      >
        {/* Poster Image - Full Bleed */}
        <div className="w-[128px] h-[190px] bg-[#141419] relative">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Desaturated overlay + vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/30" />

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${
                  badge === 'Novo'
                    ? 'bg-[#7c5dfa] text-white'
                    : badge === 'Popular'
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'bg-black/60 text-[#7c5dfa] backdrop-blur-sm'
                }`}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Discount badge - top right */}
          {discount && (
            <div className="absolute top-2 right-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-[#7c5dfa] text-white">
                {discount}
              </span>
            </div>
          )}

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-[#7c5dfa]/15 flex items-center justify-center border border-[#7c5dfa]/30">
                  <Lock className="w-4 h-4 text-[#7c5dfa]" />
                </div>
                <span className="text-[#7c5dfa] text-[10px] font-medium">Premium</span>
              </div>
            </div>
          )}

          {/* Bottom content overlay - Netflix style */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            {metadata && (
              <p className="text-white/60 text-[9px] mb-1 font-medium tracking-wide">
                {metadata}
              </p>
            )}
            <h4 className="text-white font-medium text-xs leading-tight line-clamp-2">
              {title}
            </h4>
          </div>
        </div>
      </div>
    </button>
  );
}
