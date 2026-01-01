import { Play, Clock } from 'lucide-react';
import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';
import { Button } from './Button';
import { motion } from 'motion/react';

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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <GlassSurface
                variant="surface-2"
                blur="heavy"
                glow={highlighted}
                glowColor="var(--accent-primary)"
                className={cn(
                    'p-4 lg:p-6 rounded-[var(--radius-2xl)] relative overflow-hidden transition-all duration-300',
                    // Destacado como "estrela do norte" com borda accent
                    highlighted && 'ring-2 ring-[var(--accent-primary)]/40 shadow-[0_0_40px_rgba(73,220,122,0.15)]',
                    className
                )}
            >
                {/* Subtle animated gradient background for highlighted state */}
                {highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />
                )}

                <div className="relative flex items-center gap-4 lg:gap-6">
                    {/* Thumbnail with Play Overlay - Larger & more prominent */}
                    <div
                        className="relative w-20 h-14 lg:w-32 lg:h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group shadow-xl"
                        onClick={onClick}
                    >
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                            {/* Pulsing play button */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shadow-[0_0_20px_var(--accent-primary)] group-hover:scale-110 transition-transform"
                            >
                                <Play className="w-4 h-4 lg:w-5 lg:h-5 text-black fill-current ml-0.5" />
                            </motion.div>
                        </div>
                        {/* Progress bar on thumbnail */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                            <div
                                className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Label with icon */}
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[var(--accent-primary)] text-[10px] lg:text-xs font-bold uppercase tracking-wider">
                                ▶ Continue de onde parou
                            </span>
                        </div>
                        
                        <h3 className="text-[var(--text-primary)] text-sm lg:text-lg font-bold truncate leading-tight">
                            {title}
                        </h3>
                        
                        {subtitle && (
                            <p className="text-[var(--text-tertiary)] text-[10px] lg:text-xs mt-0.5 hidden sm:block">
                                {subtitle}
                            </p>
                        )}

                        {/* Progress & Time */}
                        <div className="mt-2 lg:mt-3 flex items-center gap-3">
                            <div className="flex-1 h-1.5 lg:h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full shadow-[0_0_12px_var(--accent-primary)]"
                                />
                            </div>
                            <span className="text-[var(--text-primary)] text-[10px] lg:text-xs font-bold tabular-nums">
                                {progress}%
                            </span>
                        </div>

                        {/* Time remaining - visible on desktop */}
                        <div className="hidden lg:flex items-center gap-1.5 mt-2 text-[var(--text-muted)]">
                            <Clock className="w-3 h-3" />
                            <span className="text-[10px] font-medium">{timeRemaining}</span>
                        </div>
                    </div>

                    {/* Play Button - Desktop - Larger & more prominent */}
                    <div className="hidden sm:block flex-shrink-0">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={onClick}
                            className="gap-2.5 font-black shadow-lg shadow-[var(--accent-primary)]/20 hover:shadow-[var(--accent-primary)]/40 transition-shadow"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Continuar
                        </Button>
                    </div>

                    {/* Play Button - Mobile - Larger with pulse animation */}
                    <motion.button
                        onClick={onClick}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="sm:hidden w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform shadow-lg shadow-[var(--accent-primary)]/40"
                    >
                        <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                    </motion.button>
                </div>
            </GlassSurface>
        </motion.div>
    );
}
