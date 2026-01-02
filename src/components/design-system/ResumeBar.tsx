import { Play, Clock } from 'lucide-react';
import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';
import { Button } from './Button';

interface ResumeBarProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    progress: number;
    timeRemaining?: string;
    onClick?: () => void;
    className?: string;
    /** When true, adds extra visual emphasis as the "North Star" element */
    highlighted?: boolean;
}

export function ResumeBar({
    imageUrl,
    title,
    subtitle,
    progress,
    timeRemaining = '12 min restantes',
    onClick,
    className,
    highlighted = false,
}: ResumeBarProps) {
    return (
        <GlassSurface
            variant="surface-2"
            blur={highlighted ? "heavy" : "medium"}
            glow={highlighted}
            glowColor="var(--accent-primary)"
            className={cn(
                'p-4 lg:p-5 rounded-[var(--radius-xl)] relative overflow-hidden transition-all duration-300',
                // Apenas destacado quando highlighted=true
                highlighted && 'ring-2 ring-[var(--accent-primary)]/40 shadow-[0_0_40px_rgba(73,220,122,0.15)]',
                className
            )}
        >
            {/* Gradient background only for highlighted state */}
            {highlighted && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />
            )}

            <div className="relative flex items-center gap-4">
                {/* Thumbnail with Play Overlay */}
                <div
                    className={cn(
                        "relative rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group",
                        highlighted ? "w-20 h-14 lg:w-28 lg:h-18 shadow-xl" : "w-16 h-12 lg:w-24 lg:h-16"
                    )}
                    onClick={onClick}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className={cn(
                            "rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                            highlighted ? "w-10 h-10 lg:w-11 lg:h-11" : "w-8 h-8 lg:w-10 lg:h-10"
                        )}>
                            <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-black fill-current ml-0.5" />
                        </div>
                    </div>
                    {/* Progress bar on thumbnail */}
                    {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                            <div
                                className="h-full bg-[var(--accent-primary)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-muted)] text-[10px] lg:text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Continuar de onde parou
                    </p>
                    <h3 className="text-[var(--text-primary)] text-sm lg:text-base font-bold truncate">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-[var(--text-tertiary)] text-[10px] lg:text-xs mt-0.5 hidden sm:block">
                            {subtitle}
                        </p>
                    )}

                    {/* Progress Bar */}
                    <div className="mt-2 lg:mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1.5 lg:h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-[var(--text-muted)] text-[10px] lg:text-xs font-bold tabular-nums">
                            {progress}%
                        </span>
                    </div>

                    {/* Time remaining - desktop only */}
                    {timeRemaining && (
                        <div className="hidden lg:flex items-center gap-1.5 mt-2 text-[var(--text-muted)]">
                            <Clock className="w-3 h-3" />
                            <span className="text-[10px] font-medium">{timeRemaining}</span>
                        </div>
                    )}
                </div>

                {/* Play Button - Desktop */}
                <div className="hidden sm:block flex-shrink-0">
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onClick}
                        className="gap-2 font-bold"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Continuar
                    </Button>
                </div>

                {/* Play Button - Mobile */}
                <button
                    onClick={onClick}
                    className="sm:hidden w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform shadow-lg shadow-[var(--accent-primary)]/30"
                >
                    <Play className="w-4 h-4 text-black fill-current ml-0.5" />
                </button>
            </div>
        </GlassSurface>
    );
}
