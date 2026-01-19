import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Search, ChevronDown, ChevronRight, Lock, Play, FileText, CheckCircle2,
    Clock, BookOpen, Crown, Grid3X3, List, LayoutList, X, Sparkles,
    Filter, Zap, Gift, Bell, TrendingUp, BookMarked, GraduationCap
} from 'lucide-react';
import { VeloxLayout } from './components/layout/VeloxLayout';
import {
    ChipTabs,
    GlassSurface,
    Progress,
    Badge,
    Button,
} from './components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils/cn';

// ==========================================
// LIBRARY V4 — REVOLUTIONARY COMMAND CENTER
// Líderes: Jobs (simplicidade) + Musk (disrupção)
// ==========================================

// ==========================================
// TYPES
// ==========================================
type ContentType = 'video' | 'article' | 'long-read' | 'extension';
type ViewMode = 'list' | 'grid' | 'compact';

interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: ContentType;
    locked?: boolean;
    completed?: boolean;
    description?: string;
}

interface Module {
    id: string;
    title: string;
    lessonsCount: number;
    duration: string;
    lessons: Lesson[];
    progress: number;
    locked?: boolean;
    imageUrl?: string;
    badge?: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    modules: Module[];
    totalLessons: number;
    totalDuration: string;
    progress: number;
    locked?: boolean;
    badge?: string;
}

interface ExtensionPromo {
    id: string;
    type: 'extension';
    variant: 'simple' | 'cta' | 'discount' | 'combo';
    title: string;
    subtitle: string;
    imageUrl?: string;
    icon: any;
    color: string;
    discount?: number;
    originalPrice?: string;
    price?: string;
    ctaText?: string;
}

// ==========================================
// SAMPLE DATA
// ==========================================
const TRAVEL_IMAGES = {
    airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    miles: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
    passport: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=800',
    tools: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=800',
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
};

const COURSES: Course[] = [
    // CURSO COMPLETO: Múltiplos módulos (pasta com subpastas)
    {
        id: 'course-1',
        title: 'Viagens Econômicas: Do Zero ao Expert',
        description: 'Domine todas as técnicas para viajar gastando até 70% menos',
        imageUrl: TRAVEL_IMAGES.airplane,
        totalLessons: 30,
        totalDuration: '10h 30min',
        progress: 45,
        badge: 'Em Andamento',
        modules: [
            {
                id: 'm1',
                title: 'Fundamentos de Viagens Econômicas',
                lessonsCount: 8,
                duration: '2h 30min',
                progress: 75,
                imageUrl: TRAVEL_IMAGES.beach,
                lessons: [
                    { id: '1-1', title: 'Boas-vindas ao curso', duration: '5min', type: 'video', completed: true },
                    { id: '1-2', title: 'Por que você paga caro em passagens', duration: '12min', type: 'video', completed: true },
                    { id: '1-3', title: 'Os 3 pilares da economia em viagens', duration: '15min', type: 'video', completed: true },
                    { id: '1-4', title: 'Guia: Melhores sites de busca', duration: '8min', type: 'article', completed: true },
                    { id: '1-5', title: 'Quando comprar sua passagem', duration: '20min', type: 'video', completed: true },
                    { id: '1-6', title: 'O timing perfeito', duration: '14min', type: 'video' },
                    { id: '1-7', title: 'Aeroportos alternativos', duration: '18min', type: 'video' },
                    { id: '1-8', title: 'Checklist completo do viajante econômico', duration: '15min', type: 'long-read' },
                ],
            },
            {
                id: 'm2',
                title: 'Técnicas Avançadas de Busca',
                lessonsCount: 10,
                duration: '3h 45min',
                progress: 20,
                imageUrl: TRAVEL_IMAGES.passport,
                lessons: [
                    { id: '2-1', title: 'Configurando alertas automáticos', duration: '20min', type: 'video', completed: true },
                    { id: '2-2', title: 'Erros de tarifa: como encontrar', duration: '25min', type: 'video', completed: true },
                    { id: '2-3', title: 'Múltiplas paradas estratégicas', duration: '22min', type: 'video' },
                    { id: '2-4', title: 'Stopover gratuito: guia completo', duration: '18min', type: 'video' },
                    { id: '2-5', title: 'VPNs e preços regionais', duration: '15min', type: 'video' },
                ],
            },
            {
                id: 'm3',
                title: 'Milhas e Pontos: Acúmulo Acelerado',
                lessonsCount: 12,
                duration: '4h 15min',
                progress: 0,
                locked: true,
                imageUrl: TRAVEL_IMAGES.miles,
                badge: 'Premium',
                lessons: [],
            },
        ],
    },
    // CURSO SIMPLES: Apenas 1 módulo (pasta única - aulas diretamente visíveis)
    {
        id: 'course-2',
        title: 'Guia Rápido: Erros de Tarifa',
        description: 'Aprenda a encontrar e aproveitar erros de tarifa em menos de 1 hora',
        imageUrl: TRAVEL_IMAGES.paris,
        totalLessons: 5,
        totalDuration: '45min',
        progress: 60,
        badge: 'Rápido',
        modules: [
            {
                id: 'simple-1',
                title: 'Guia Rápido: Erros de Tarifa', // Mesmo título do curso
                lessonsCount: 5,
                duration: '45min',
                progress: 60,
                imageUrl: TRAVEL_IMAGES.paris,
                lessons: [
                    { id: 's-1', title: 'O que são erros de tarifa', duration: '8min', type: 'video', completed: true },
                    { id: 's-2', title: 'Onde monitorar erros', duration: '10min', type: 'video', completed: true },
                    { id: 's-3', title: 'Como agir rápido', duration: '12min', type: 'video', completed: true },
                    { id: 's-4', title: 'Checklist de compra segura', duration: '7min', type: 'article' },
                    { id: 's-5', title: 'Casos reais e exemplos', duration: '8min', type: 'video' },
                ],
            },
        ],
    },
];

// Extension promos que aparecem entre conteúdos
const EXTENSION_PROMOS: ExtensionPromo[] = [
    {
        id: 'ext-1',
        type: 'extension',
        variant: 'discount',
        title: 'Rastreador de Voos PRO',
        subtitle: 'Alertas 24/7 de promoções',
        imageUrl: TRAVEL_IMAGES.tools,
        icon: Bell,
        color: '#FF7E00',
        discount: 50,
        originalPrice: 'R$ 197',
        price: 'R$ 97',
    },
    {
        id: 'ext-2',
        type: 'extension',
        variant: 'cta',
        title: 'Comparador de Milhas',
        subtitle: 'Compare 15+ programas',
        icon: TrendingUp,
        color: '#56E88A',
        ctaText: 'Testar Grátis',
    },
];

const FILTER_TABS = ['Todos', 'Em Progresso', 'Concluídos', 'Premium'];
const CONTENT_TYPES = ['Todos', 'Vídeos', 'Leituras', 'Guias'];

// ==========================================
// COMMAND BAR — Spotlight-style Search
// ==========================================
interface CommandBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    placeholder?: string;
}

function CommandBar({ value, onChange, onClear, placeholder = "Buscar aulas, módulos, técnicas..." }: CommandBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcut: Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                inputRef.current?.blur();
                onClear();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClear]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl",
                "backdrop-blur-xl bg-black/60",
                "border border-white/10",
                "transition-all duration-300",
                "focus-within:border-[var(--accent-primary)]/40",
                "focus-within:shadow-[0_0_30px_rgba(86,232,138,0.15)]"
            )}>
                <div className="flex items-center gap-3 px-5 h-14">
                    <Search className="w-6 h-6 text-white/40" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent text-white text-base placeholder-white/30 outline-none"
                    />
                    {value ? (
                        <button
                            onClick={onClear}
                            className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/60" />
                        </button>
                    ) : (
                        <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-white/40 text-xs font-medium">⌘K</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ==========================================
// VIEW MODE TOGGLE
// ==========================================
interface ViewModeToggleProps {
    mode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
    const modes: { id: ViewMode; icon: any; label: string }[] = [
        { id: 'list', icon: List, label: 'Lista' },
        { id: 'grid', icon: Grid3X3, label: 'Grade' },
        { id: 'compact', icon: LayoutList, label: 'Compacto' },
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
            {modes.map(({ id, icon: Icon, label }) => (
                <button
                    key={id}
                    onClick={() => onChange(id)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all",
                        mode === id
                            ? "bg-[var(--accent-primary)] text-black"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline text-xs font-bold">{label}</span>
                </button>
            ))}
        </div>
    );
}

// ==========================================
// CONTENT TYPE BADGE
// ==========================================
function ContentTypeBadge({ type, locked }: { type: ContentType; locked?: boolean }) {
    const config = {
        video: { icon: Play, label: 'Vídeo', color: 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/30' },
        article: { icon: FileText, label: 'Leitura', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
        'long-read': { icon: BookOpen, label: 'Guia', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
        extension: { icon: Gift, label: 'Extensão', color: 'bg-[var(--accent-purchase)]/20 text-[var(--accent-purchase)] border-[var(--accent-purchase)]/30' },
    };

    const { icon: Icon, label, color } = config[type] || config.video;

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
            locked ? "bg-white/5 text-white/40 border-white/10" : color
        )}>
            <Icon className="w-3 h-3" />
            {label}
        </div>
    );
}

// ==========================================
// PROGRESS RING (Compact)
// ==========================================
function ProgressRing({ progress, size = 48, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700"
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-primary)" />
                        <stop offset="100%" stopColor="var(--accent-secondary)" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{progress}%</span>
            </div>
        </div>
    );
}

// ==========================================
// LESSON ROW (List View)
// ==========================================
function LessonRow({ lesson, onClick, index }: { lesson: Lesson; onClick: () => void; index: number }) {
    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors text-left group"
        >
            {/* Status Icon */}
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                lesson.completed
                    ? "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30"
                    : lesson.locked
                        ? "bg-white/5 border border-white/10"
                        : "bg-white/5 border border-white/10 group-hover:border-[var(--accent-primary)]/30"
            )}>
                {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />
                ) : lesson.locked ? (
                    <Lock className="w-4 h-4 text-white/40" />
                ) : lesson.type === 'video' ? (
                    <Play className="w-4 h-4 text-white/60 ml-0.5" />
                ) : lesson.type === 'long-read' ? (
                    <BookOpen className="w-4 h-4 text-white/60" />
                ) : (
                    <FileText className="w-4 h-4 text-white/60" />
                )}
            </div>

            {/* Lesson Info */}
            <div className="flex-1 min-w-0">
                <h4 className={cn(
                    "text-sm font-medium leading-snug line-clamp-1",
                    lesson.locked ? "text-white/40" : lesson.completed ? "text-white/60" : "text-white group-hover:text-[var(--accent-primary)] transition-colors"
                )}>
                    {lesson.title}
                </h4>
                <p className="text-white/30 text-xs mt-0.5">{lesson.duration}</p>
            </div>

            {/* Content Type Badge */}
            <ContentTypeBadge type={lesson.type} locked={lesson.locked} />

            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
        </motion.button>
    );
}

// ==========================================
// MODULE ACCORDION (List View)
// ==========================================
interface ModuleAccordionProps {
    module: Module;
    isExpanded: boolean;
    onToggle: () => void;
    onLessonClick: (lesson: Lesson) => void;
    index: number;
}

function ModuleAccordion({ module, isExpanded, onToggle, onLessonClick, index }: ModuleAccordionProps) {
    const completedLessons = module.lessons.filter(l => l.completed).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <div className={cn(
                "overflow-hidden rounded-2xl transition-all duration-300",
                "backdrop-blur-xl border",
                module.locked
                    ? "bg-black/50 border-[var(--accent-purchase)]/30 shadow-[0_0_30px_rgba(255,126,0,0.1)]"
                    : "bg-black/60 border-white/10 hover:border-white/20"
            )}>
                {/* Module Header */}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-colors"
                >
                    {/* Progress or Lock */}
                    {module.locked ? (
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-purchase)]/20 border border-[var(--accent-purchase)]/30 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-[var(--accent-purchase)]" />
                        </div>
                    ) : (
                        <ProgressRing progress={module.progress} />
                    )}

                    {/* Module Info */}
                    <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={cn(
                                "text-base font-bold leading-tight line-clamp-1",
                                module.locked ? "text-white/50" : "text-white"
                            )}>
                                {module.title}
                            </h3>
                            {module.badge && (
                                <Badge
                                    variant={module.locked ? "locked" : "primary"}
                                    className={cn(
                                        "text-[10px]",
                                        module.locked
                                            ? "bg-[var(--accent-purchase)]/20 text-[var(--accent-purchase)] border-[var(--accent-purchase)]/30"
                                            : "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border-[var(--accent-primary)]/30"
                                    )}
                                >
                                    {module.badge}
                                </Badge>
                            )}
                        </div>
                        <p className="text-white/40 text-xs">
                            {completedLessons}/{module.lessonsCount} aulas • {module.duration}
                        </p>
                    </div>

                    {/* Expand Arrow */}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                    >
                        <ChevronDown className="w-5 h-5 text-white/40" />
                    </motion.div>
                </button>

                {/* Lessons List */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="border-t border-white/5 divide-y divide-white/5">
                                {module.lessons.map((lesson, i) => (
                                    <LessonRow
                                        key={lesson.id}
                                        lesson={lesson}
                                        onClick={() => onLessonClick(lesson)}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ==========================================
// MODULE CARD (Grid View)
// ==========================================
function ModuleCard({ module, onClick, index }: { module: Module; onClick: () => void; index: number }) {
    const completedLessons = module.lessons.filter(l => l.completed).length;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative w-full text-left"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-300",
                "backdrop-blur-xl border",
                module.locked
                    ? "bg-black/50 border-[var(--accent-purchase)]/30"
                    : "bg-black/60 border-white/10 group-hover:border-[var(--accent-primary)]/30"
            )} style={{ aspectRatio: '3/2' }}>
                {/* Background Image */}
                {module.imageUrl && (
                    <>
                        <img
                            src={module.imageUrl}
                            alt={module.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </>
                )}

                {/* Locked Overlay */}
                {module.locked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <div className="w-14 h-14 rounded-full bg-[var(--accent-purchase)]/20 border border-[var(--accent-purchase)]/40 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-[var(--accent-purchase)]" />
                        </div>
                    </div>
                )}

                {/* Badge */}
                {module.badge && (
                    <div className="absolute top-3 left-3 z-20">
                        <Badge
                            variant={module.locked ? "locked" : "primary"}
                            className={cn(
                                "text-[10px] font-bold",
                                module.locked
                                    ? "bg-[var(--accent-purchase)] text-white"
                                    : "bg-[var(--accent-primary)] text-black"
                            )}
                        >
                            {module.badge}
                        </Badge>
                    </div>
                )}

                {/* Progress Ring - Top Right */}
                {!module.locked && (
                    <div className="absolute top-3 right-3 z-20">
                        <ProgressRing progress={module.progress} size={36} strokeWidth={3} />
                    </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className={cn(
                        "text-base font-bold leading-tight mb-1 line-clamp-2",
                        module.locked ? "text-white/60" : "text-white group-hover:text-[var(--accent-primary)] transition-colors"
                    )}>
                        {module.title}
                    </h3>
                    <p className="text-white/40 text-xs">
                        {completedLessons}/{module.lessonsCount} aulas • {module.duration}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// COMPACT ROW (Compact View)
// ==========================================
function ModuleCompactRow({ module, onClick, index }: { module: Module; onClick: () => void; index: number }) {
    const completedLessons = module.lessons.filter(l => l.completed).length;

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
                module.locked
                    ? "bg-[var(--accent-purchase)]/5 hover:bg-[var(--accent-purchase)]/10"
                    : "hover:bg-white/5"
            )}
        >
            {/* Mini Progress */}
            {module.locked ? (
                <Lock className="w-4 h-4 text-[var(--accent-purchase)]" />
            ) : (
                <div className="w-8 h-8 relative">
                    <ProgressRing progress={module.progress} size={32} strokeWidth={2} />
                </div>
            )}

            {/* Title */}
            <div className="flex-1 text-left min-w-0">
                <h4 className={cn(
                    "text-sm font-medium line-clamp-1",
                    module.locked ? "text-white/50" : "text-white group-hover:text-[var(--accent-primary)] transition-colors"
                )}>
                    {module.title}
                </h4>
            </div>

            {/* Stats */}
            <span className="text-white/30 text-xs whitespace-nowrap">
                {completedLessons}/{module.lessonsCount}
            </span>

            {/* Badge */}
            {module.badge && (
                <Badge
                    variant={module.locked ? "locked" : "primary"}
                    className="text-[9px] px-1.5 py-0.5"
                >
                    {module.badge}
                </Badge>
            )}

            <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
        </motion.button>
    );
}

// ==========================================
// EXTENSION PROMO CARD (Contextual Upsell)
// ==========================================
function ExtensionPromoCard({ promo, index }: { promo: ExtensionPromo; index: number }) {
    const Icon = promo.icon;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log(`Extension clicked: ${promo.id}`)}
            className="w-full text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl p-5 transition-all"
                style={{
                    background: `linear-gradient(135deg, ${promo.color}15 0%, rgba(0,0,0,0.8) 100%)`,
                    border: `1px solid ${promo.color}40`,
                    boxShadow: `0 0 30px ${promo.color}15`,
                }}
            >
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${promo.color}20`, border: `1px solid ${promo.color}40` }}
                    >
                        <Icon className="w-6 h-6" style={{ color: promo.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h4 className="text-white text-sm font-bold mb-0.5">{promo.title}</h4>
                        <p className="text-white/50 text-xs">{promo.subtitle}</p>
                    </div>

                    {/* Price/CTA */}
                    {promo.variant === 'discount' && promo.price && (
                        <div className="text-right">
                            <p className="text-white/40 text-xs line-through">{promo.originalPrice}</p>
                            <p className="font-bold" style={{ color: promo.color }}>{promo.price}</p>
                        </div>
                    )}
                    {promo.variant === 'cta' && promo.ctaText && (
                        <div
                            className="px-3 py-1.5 rounded-lg text-xs font-bold"
                            style={{ background: promo.color, color: '#000' }}
                        >
                            {promo.ctaText}
                        </div>
                    )}

                    {/* Discount Badge */}
                    {promo.discount && (
                        <div
                            className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black"
                            style={{ background: promo.color, color: '#000' }}
                        >
                            -{promo.discount}%
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// GLOBAL PROGRESS HEADER
// ==========================================
function GlobalProgressHeader({ course }: { course: Course }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl p-5",
                "backdrop-blur-xl bg-black/60 border border-white/10"
            )}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5" />

                <div className="relative flex items-center gap-5">
                    <ProgressRing progress={course.progress} size={64} strokeWidth={5} />

                    <div className="flex-1">
                        <h2 className="text-white text-lg font-bold mb-1">{course.title}</h2>
                        <div className="flex items-center gap-4 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5" />
                                {course.modules.length} módulos
                            </span>
                            <span className="flex items-center gap-1">
                                <BookMarked className="w-3.5 h-3.5" />
                                {course.totalLessons} aulas
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {course.totalDuration}
                            </span>
                        </div>
                    </div>

                    {course.badge && (
                        <Badge variant="primary" className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border-[var(--accent-primary)]/30">
                            {course.badge}
                        </Badge>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ==========================================
// MAIN COMPONENT: LibraryV4
// ==========================================
export default function LibraryV4() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);

    // Toggle course expansion
    const toggleCourse = (courseId: string) => {
        setExpandedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    // Toggle module expansion
    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    // Handle lesson click
    const handleLessonClick = (lesson: Lesson) => {
        if (lesson.locked) {
            console.log('Navigate to: locked-preview', { lesson });
        } else if (lesson.type === 'video') {
            console.log('Navigate to: video-lesson', { lesson });
        } else {
            console.log('Navigate to: article-reader', { lesson });
        }
    };

    // Handle module click (for grid/compact)
    const handleModuleClick = (module: Module) => {
        if (module.locked) {
            console.log('Navigate to: locked-preview', { module });
        } else {
            toggleModule(module.id);
            setViewMode('list');
        }
    };

    // Check if course is simple (only 1 module)
    const isSimpleCourse = (course: Course) => course.modules.length === 1;

    // Filter courses based on search
    const filteredCourses = useMemo(() => {
        return COURSES.filter(course => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesCourse = course.title.toLowerCase().includes(query);
                const matchesModule = course.modules.some(m => m.title.toLowerCase().includes(query));
                const matchesLesson = course.modules.some(m =>
                    m.lessons.some(l => l.title.toLowerCase().includes(query))
                );
                if (!matchesCourse && !matchesModule && !matchesLesson) return false;
            }

            // Status filter
            if (activeFilter === 'Em Progresso') {
                return course.progress > 0 && course.progress < 100;
            }
            if (activeFilter === 'Concluídos') {
                return course.progress === 100;
            }
            if (activeFilter === 'Premium') {
                return course.locked || course.modules.some(m => m.locked);
            }

            return true;
        });
    }, [searchQuery, activeFilter]);

    return (
        <VeloxLayout>
            <div className="px-4 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
                <div className="max-w-[var(--v7-max-content)] mx-auto">

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
                            </div>
                            <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">
                                Biblioteca
                            </h1>
                        </div>
                        <p className="text-white/50 text-sm lg:text-base">
                            Navegue por todos os seus cursos e módulos
                        </p>
                    </motion.div>

                    {/* Command Bar (Search) */}
                    <div className="mb-6">
                        <CommandBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onClear={() => setSearchQuery('')}
                        />
                    </div>

                    {/* Filters + View Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
                    >
                        <ChipTabs
                            tabs={FILTER_TABS}
                            activeTab={activeFilter}
                            onChange={setActiveFilter}
                        />
                        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
                    </motion.div>

                    {/* Courses List */}
                    <div className="space-y-4">
                        {filteredCourses.map((course, courseIndex) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: courseIndex * 0.1 }}
                            >
                                {/* Course Header */}
                                <button
                                    onClick={() => toggleCourse(course.id)}
                                    className="w-full mb-3"
                                >
                                    <div className={cn(
                                        "relative overflow-hidden rounded-2xl p-5",
                                        "backdrop-blur-xl bg-black/60 border border-white/10",
                                        "hover:border-[var(--accent-primary)]/30 transition-all",
                                        "group"
                                    )}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5" />

                                        <div className="relative flex items-center gap-5">
                                            {/* Course Image */}
                                            <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={course.imageUrl}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/20" />
                                                {/* Mini Progress */}
                                                <div className="absolute bottom-1 right-1">
                                                    <ProgressRing progress={course.progress} size={24} strokeWidth={2} />
                                                </div>
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h2 className="text-white text-lg font-bold line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
                                                        {course.title}
                                                    </h2>
                                                    {course.badge && (
                                                        <Badge variant="primary" className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border-[var(--accent-primary)]/30 text-[10px]">
                                                            {course.badge}
                                                        </Badge>
                                                    )}
                                                    {/* Indicator: Simple vs Multi-module */}
                                                    <Badge
                                                        variant="primary"
                                                        className={cn(
                                                            "text-[9px]",
                                                            isSimpleCourse(course)
                                                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                                        )}
                                                    >
                                                        {isSimpleCourse(course) ? '📄 Curso Direto' : `📁 ${course.modules.length} Módulos`}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-white/50">
                                                    <span className="flex items-center gap-1">
                                                        <BookMarked className="w-3.5 h-3.5" />
                                                        {course.totalLessons} aulas
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {course.totalDuration}
                                                    </span>
                                                    <span className="font-bold text-[var(--accent-primary)]">
                                                        {course.progress}% completo
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Expand Arrow */}
                                            <motion.div
                                                animate={{ rotate: expandedCourses.includes(course.id) ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
                                            >
                                                <ChevronDown className="w-5 h-5 text-white/40" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </button>

                                {/* Course Content */}
                                <AnimatePresence>
                                    {expandedCourses.includes(course.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            {/* CURSO SIMPLES: Mostrar aulas diretamente */}
                                            {isSimpleCourse(course) ? (
                                                <div className={cn(
                                                    "rounded-2xl overflow-hidden ml-4 lg:ml-8",
                                                    "backdrop-blur-xl bg-black/50 border border-white/10"
                                                )}>
                                                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                                            <FileText className="w-4 h-4 text-blue-400" />
                                                        </div>
                                                        <span className="text-white/60 text-sm font-medium">
                                                            Aulas do curso ({course.modules[0].lessons.length} aulas)
                                                        </span>
                                                    </div>
                                                    <div className="divide-y divide-white/5">
                                                        {course.modules[0].lessons.map((lesson, i) => (
                                                            <LessonRow
                                                                key={lesson.id}
                                                                lesson={lesson}
                                                                onClick={() => handleLessonClick(lesson)}
                                                                index={i}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                /* CURSO COM MÚLTIPLOS MÓDULOS: Accordion */
                                                <div className="space-y-3 ml-4 lg:ml-8">
                                                    {viewMode === 'list' && course.modules.map((module, index) => (
                                                        <ModuleAccordion
                                                            key={module.id}
                                                            module={module}
                                                            isExpanded={expandedModules.includes(module.id)}
                                                            onToggle={() => toggleModule(module.id)}
                                                            onLessonClick={handleLessonClick}
                                                            index={index}
                                                        />
                                                    ))}

                                                    {viewMode === 'grid' && (
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {course.modules.map((module, index) => (
                                                                <ModuleCard
                                                                    key={module.id}
                                                                    module={module}
                                                                    onClick={() => handleModuleClick(module)}
                                                                    index={index}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}

                                                    {viewMode === 'compact' && (
                                                        <div className={cn(
                                                            "rounded-2xl overflow-hidden",
                                                            "backdrop-blur-xl bg-black/60 border border-white/10"
                                                        )}>
                                                            <div className="divide-y divide-white/5">
                                                                {course.modules.map((module, index) => (
                                                                    <ModuleCompactRow
                                                                        key={module.id}
                                                                        module={module}
                                                                        onClick={() => handleModuleClick(module)}
                                                                        index={index}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-white/20" />
                            </div>
                            <p className="text-white/40 text-sm">
                                Nenhum conteúdo encontrado
                            </p>
                        </div>
                    )}

                    {/* Bottom Extension Promos */}
                    {!searchQuery && activeFilter === 'Todos' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-10 space-y-4"
                        >
                            <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider">
                                🚀 Potencialize seus estudos
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {EXTENSION_PROMOS.map((promo, i) => (
                                    <ExtensionPromoCard key={promo.id} promo={promo} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Premium Upsell */}
                    {COURSES.some(c => c.modules.some(m => m.locked)) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-10"
                        >
                            <div className={cn(
                                "relative overflow-hidden rounded-2xl p-6 lg:p-8 text-center",
                                "backdrop-blur-xl bg-black/60",
                                "border border-[var(--accent-purchase)]/30",
                                "shadow-[0_0_40px_rgba(255,126,0,0.1)]"
                            )}>
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purchase)]/5 to-transparent" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent-purchase)]/20 border border-[var(--accent-purchase)]/30 flex items-center justify-center mx-auto mb-4">
                                        <Crown className="w-7 h-7 text-[var(--accent-purchase)]" />
                                    </div>
                                    <h3 className="text-white text-xl font-black mb-2">
                                        Desbloqueie todos os módulos
                                    </h3>
                                    <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                                        Acesse milhas, técnicas avançadas e muito mais
                                    </p>
                                    <Button
                                        variant="purchase"
                                        size="lg"
                                        onClick={() => console.log('Navigate to: store')}
                                        className="font-black"
                                    >
                                        Ver planos
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </VeloxLayout>
    );
}
