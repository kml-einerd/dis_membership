import { Play, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  progress: number;
  onContinue?: () => void;
  onDetails?: () => void;
}

export function HeroBanner({
  title,
  subtitle,
  imageUrl,
  progress,
  onContinue,
  onDetails,
}: HeroBannerProps) {
  return (
    <div className="px-6 mb-8">
      <div className="relative h-[300px] rounded-3xl overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Desaturated overlay + vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/40 to-[#0a0a0f]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="space-y-2 mb-4">
            <h3 className="text-white text-2xl font-medium leading-tight">
              {title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7c5dfa] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/40 text-xs mt-1 block">
              {progress}% concluído
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onContinue}
              className="flex-1 flex items-center justify-center gap-2 bg-[#7c5dfa] hover:bg-[#6b4de8] text-white px-6 py-3 rounded-2xl transition-colors font-medium"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continuar</span>
            </button>
            <button
              onClick={onDetails}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white/80 px-5 py-3 rounded-2xl transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
