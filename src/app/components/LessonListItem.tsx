import { Lock, Play, CheckCircle } from 'lucide-react';

interface LessonListItemProps {
  lessonNumber: number;
  title: string;
  duration: string;
  isWatched?: boolean;
  isCurrentLesson?: boolean;
  isLocked?: boolean;
  isBonusOffer?: boolean;
  discount?: string;
  watchProgress?: number;
  onClick?: () => void;
}

export function LessonListItem({
  lessonNumber,
  title,
  duration,
  isWatched = false,
  isCurrentLesson = false,
  isLocked = false,
  isBonusOffer = false,
  discount,
  watchProgress = 0,
  onClick,
}: LessonListItemProps) {
  const showFlowLine = isLocked || isBonusOffer;

  return (
    <button
      onClick={onClick}
      disabled={isCurrentLesson}
      className={`w-full text-left relative ${
        isCurrentLesson ? 'cursor-default' : ''
      }`}
    >
      {/* Flow line for locked/bonus */}
      {showFlowLine && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c5dfa] via-[#7c5dfa]/60 to-transparent rounded-full" />
      )}

      <div
        className={`py-3 px-4 rounded-xl transition-all ${
          isCurrentLesson
            ? 'bg-white/[0.06] border border-[#7c5dfa]/30'
            : showFlowLine
            ? 'bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05]'
            : 'hover:bg-white/[0.03] border border-transparent'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Left icon/number */}
          <div className="flex-shrink-0 pt-0.5">
            {isLocked ? (
              <div className="w-8 h-8 rounded-lg bg-[#7c5dfa]/10 border border-[#7c5dfa]/20 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-[#7c5dfa]" />
              </div>
            ) : isWatched ? (
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#7c5dfa]" />
              </div>
            ) : isCurrentLesson ? (
              <div className="w-8 h-8 rounded-lg bg-[#7c5dfa]/15 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-[#7c5dfa] fill-[#7c5dfa]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <span className="text-white/60 text-xs font-medium">
                  {lessonNumber}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4
                className={`font-medium text-sm leading-snug ${
                  isCurrentLesson
                    ? 'text-white'
                    : isLocked
                    ? 'text-white/60'
                    : 'text-white/85'
                }`}
              >
                {title}
              </h4>
              {discount && (
                <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-md font-medium bg-[#7c5dfa] text-white">
                  {discount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-xs">{duration}</span>
              {isLocked && (
                <span className="text-[#7c5dfa] text-[10px] font-medium px-2 py-0.5 bg-[#7c5dfa]/10 rounded-md">
                  Premium
                </span>
              )}
              {isBonusOffer && !isLocked && (
                <span className="text-[#7c5dfa] text-[10px] font-medium px-2 py-0.5 bg-[#7c5dfa]/10 rounded-md">
                  Bônus
                </span>
              )}
            </div>

            {/* Progress bar for partially watched lessons */}
            {watchProgress > 0 && watchProgress < 100 && !isCurrentLesson && (
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7c5dfa] rounded-full"
                  style={{ width: `${watchProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
