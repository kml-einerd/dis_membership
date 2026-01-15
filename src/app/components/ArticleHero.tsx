import { Clock, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleHeroProps {
  title: string;
  subtitle?: string;
  readTime: string;
  updatedDate: string;
  coverImageUrl?: string;
}

export function ArticleHero({
  title,
  subtitle,
  readTime,
  updatedDate,
  coverImageUrl,
}: ArticleHeroProps) {
  return (
    <div className="px-6 mb-6">
      <h1 className="text-white font-medium text-2xl leading-tight mb-3">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-white/60 text-base leading-relaxed mb-4">
          {subtitle}
        </p>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{readTime}</span>
        </div>
        <span className="text-white/20">•</span>
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{updatedDate}</span>
        </div>
      </div>

      {coverImageUrl && (
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <div className="aspect-video">
            <ImageWithFallback
              src={coverImageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Subtle desaturated overlay */}
            <div className="absolute inset-0 bg-[#0a0a0f]/10" />
          </div>
        </div>
      )}
    </div>
  );
}
