import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RefinedHeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  progress: number;
  onContinue?: () => void;
}

export function RefinedHeroBanner({
  title,
  subtitle,
  imageUrl,
  progress,
  onContinue,
}: RefinedHeroBannerProps) {
  return (
    <div className="px-6 mb-6">
      <div className="relative h-[280px] rounded-3xl overflow-hidden group">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Consistent desaturated overlay + gradient */}
          <div className="absolute inset-0 bg-[#0a0a0f]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-[#0a0a0f]/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="space-y-1.5 mb-4">
            <h3 className="text-white font-medium text-xl leading-tight max-w-[280px]">
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-snug max-w-[260px]">
              {subtitle}
            </p>
          </div>

          {/* Thin Progress Bar */}
          <div className="mb-4">
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7c5dfa] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/40 text-[10px] mt-1.5 block font-medium">
              {progress}% concluído
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onContinue}
            className="flex items-center justify-center gap-2 bg-[#7c5dfa] hover:bg-[#6b4de8] text-white px-8 py-3 rounded-2xl transition-all duration-200 active:scale-[0.98] font-medium"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
