import { BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompactArticleCardProps {
  title: string;
  readTime: string;
  imageUrl: string;
  onClick?: () => void;
}

export function CompactArticleCard({
  title,
  imageUrl,
  readTime,
  onClick,
}: CompactArticleCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[160px] group"
    >
      <div className="relative rounded-xl overflow-hidden mb-2">
        <div className="aspect-video bg-[#141419]">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="absolute top-1.5 left-1.5">
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-[#7c5dfa]/90 text-white flex items-center gap-1">
            <BookOpen className="w-2.5 h-2.5" />
            Artigo
          </span>
        </div>

        <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white/90">
          {readTime}
        </div>
      </div>

      <h4 className="text-white/85 text-xs text-left line-clamp-2 leading-snug">
        {title}
      </h4>
    </button>
  );
}
