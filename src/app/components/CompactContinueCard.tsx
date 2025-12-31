import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompactContinueCardProps {
  title: string;
  imageUrl: string;
  duration?: string;
  progress: number;
  onClick?: () => void;
}

export function CompactContinueCard({
  title,
  imageUrl,
  duration,
  progress,
  onClick,
}: CompactContinueCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[180px] group"
    >
      <div className="relative rounded-xl overflow-hidden mb-1.5">
        <div className="aspect-video bg-[#141419]">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Minimal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        {/* Duration badge - minimal */}
        {duration && (
          <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white/90">
            {duration}
          </div>
        )}

        {/* Thin progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-[#7c5dfa] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h4 className="text-white/80 text-xs text-left line-clamp-1 leading-tight">
        {title}
      </h4>
    </button>
  );
}
