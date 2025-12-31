import { BookOpen, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleCardProps {
  title: string;
  preview?: string;
  readTime: string;
  imageUrl?: string;
  textOnly?: boolean;
  onClick?: () => void;
}

export function ArticleCard({
  title,
  preview,
  readTime,
  imageUrl,
  textOnly = false,
  onClick,
}: ArticleCardProps) {
  if (textOnly) {
    return (
      <button
        onClick={onClick}
        className="flex-shrink-0 w-[280px] p-5 bg-white/5 hover:bg-white/8 rounded-2xl border border-white/10 transition-all group text-left"
      >
        <div className="flex items-start gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[#7c5dfa]/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-[#7c5dfa]" />
          </div>
          <span className="text-[#7c5dfa] text-xs font-medium px-2 py-1 bg-[#7c5dfa]/10 rounded-lg">
            Artigo
          </span>
        </div>

        <h4 className="text-white font-medium mb-2 line-clamp-2 leading-snug">
          {title}
        </h4>

        {preview && (
          <p className="text-white/50 text-sm mb-4 line-clamp-3 leading-relaxed">
            {preview}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs">{readTime} leitura</span>
          <div className="flex items-center gap-1 text-[#7c5dfa] text-sm font-medium group-hover:gap-2 transition-all">
            <span>Ler mais</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[200px] group"
    >
      {imageUrl && (
        <div className="relative rounded-2xl overflow-hidden mb-2">
          <div className="aspect-[4/3] bg-white/5">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="absolute top-2 left-2">
            <span className="text-xs px-2 py-1 rounded-lg font-medium bg-[#7c5dfa]/90 text-white flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Artigo
            </span>
          </div>
        </div>
      )}

      <h4 className="text-white/90 text-sm text-left line-clamp-2 leading-snug mb-1">
        {title}
      </h4>
      <span className="text-white/40 text-xs">{readTime} leitura</span>
    </button>
  );
}
