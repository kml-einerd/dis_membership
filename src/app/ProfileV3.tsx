import React from 'react';
import { Settings, User, CreditCard, Bookmark, Download, Clock, TrendingUp, Award, LogOut, ChevronRight, Crown, Mail, Calendar, Edit3 } from 'lucide-react';
import { useNavigation, type Route } from './navigation/NavigationContext';
import { VeloxLayout } from '../components/layout/VeloxLayout';
import {
    GlassSurface,
    Button,
    Progress,
    Badge,
} from '../components/design-system';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';

// ==========================================
// V7 PROFILE - ACHIEVEMENT SHOWCASE
// Philosophy: Jobs (personal) + Musk (gamification)
// ==========================================

// User stats
const USER_STATS = [
    { icon: Bookmark, label: 'Salvos', value: 12, color: 'primary' },
    { icon: Download, label: 'Downloads', value: 3, color: 'secondary' },
    { icon: Clock, label: 'Horas', value: 18, color: 'purchase' },
    { icon: TrendingUp, label: 'Progresso', value: '67%', color: 'premium' },
];

// Achievements
const ACHIEVEMENTS = [
    { id: '1', title: 'Primeira aula', description: 'Completou sua primeira aula', earned: true, icon: '🎯' },
    { id: '2', title: 'Estudante dedicado', description: '5 horas de estudo', earned: true, icon: '📚' },
    { id: '3', title: 'Maratonista', description: '10 aulas em uma semana', earned: false, icon: '🏃' },
    { id: '4', title: 'Expert', description: 'Complete todos os módulos', earned: false, icon: '🏆' },
];

// Menu items
const MENU_ITEMS = [
    { icon: User, label: 'Editar perfil', route: 'edit-profile' as const },
    { icon: CreditCard, label: 'Assinatura', route: 'store' as const, badge: 'Básico' },
    { icon: Settings, label: 'Configurações', route: 'settings' as const },
];

// ==========================================
// V7 PROFILE HERO
// ==========================================
function ProfileHero({ onEdit }: { onEdit: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <GlassSurface
                variant="surface-2"
                blur="medium"
                className="relative overflow-hidden p-6 lg:p-8 rounded-2xl lg:rounded-3xl"
            >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=300"
                            alt="Avatar"
                            className="w-28 h-28 lg:w-36 lg:h-36 rounded-3xl object-cover ring-4 ring-white/10"
                        />
                        <button
                            onClick={onEdit}
                            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center ring-4 ring-[var(--app-bg)] hover:bg-[var(--accent-primary-hover)] transition-colors"
                        >
                            <Edit3 className="w-5 h-5 text-black" />
                        </button>

                        {/* Status indicator */}
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--app-bg)]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-white text-2xl lg:text-3xl font-black mb-1">
                            Ana Carolina Silva
                        </h1>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-white/50 text-sm mb-4">
                            <span className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4" />
                                ana.silva@email.com
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                Membro desde Jan 2024
                            </span>
                        </div>

                        {/* Plan Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] rounded-full">
                            <Crown className="w-4 h-4 text-[var(--accent-primary)]" />
                            <span className="text-[var(--accent-primary)] text-sm font-bold">Plano Básico</span>
                        </div>
                    </div>
                </div>
            </GlassSurface>
        </motion.div>
    );
}

// ==========================================
// V7 STATS ROW - Horizontal Layout
// ==========================================
function StatsRow() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
        >
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {USER_STATS.map((stat, index) => {
                    const Icon = stat.icon;
                    const colors = {
                        primary: { bg: 'var(--accent-primary-soft)', border: 'var(--accent-primary-border)', text: 'var(--accent-primary)' },
                        secondary: { bg: 'var(--accent-secondary-soft)', border: 'var(--accent-secondary-border)', text: 'var(--accent-secondary)' },
                        purchase: { bg: 'var(--accent-purchase-soft)', border: 'var(--accent-purchase-border)', text: 'var(--accent-purchase)' },
                        premium: { bg: 'var(--accent-premium-soft)', border: 'var(--accent-premium-border)', text: 'var(--accent-premium)' },
                    };
                    const color = colors[stat.color as keyof typeof colors];

                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="flex-shrink-0"
                        >
                            <GlassSurface
                                variant="surface-1"
                                blur="light"
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[140px]"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: color.bg, border: `1px solid ${color.border}` }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: color.text }} />
                                </div>
                                <div>
                                    <p className="text-white text-lg font-black">{stat.value}</p>
                                    <p className="text-white/40 text-xs">{stat.label}</p>
                                </div>
                            </GlassSurface>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ==========================================
// V7 ACHIEVEMENTS SHOWCASE
// ==========================================
function AchievementsGrid() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
        >
            <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Conquistas
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                    >
                        <GlassSurface
                            variant={achievement.earned ? "surface-2" : "surface-1"}
                            blur="light"
                            className={cn(
                                "p-4 rounded-2xl text-center transition-all",
                                !achievement.earned && "opacity-50"
                            )}
                        >
                            <div className="text-3xl mb-2">{achievement.icon}</div>
                            <h4 className="text-white text-sm font-bold mb-1">{achievement.title}</h4>
                            <p className="text-white/40 text-xs">{achievement.description}</p>
                            {achievement.earned && (
                                <div className="mt-2">
                                    <Badge variant="success" className="bg-[var(--accent-primary)] text-black text-[10px]">
                                        Conquistado
                                    </Badge>
                                </div>
                            )}
                        </GlassSurface>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

// ==========================================
// V7 PROGRESS SECTION
// ==========================================
function ProgressSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
        >
            <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Progresso geral
            </h3>

            <GlassSurface
                variant="surface-2"
                blur="medium"
                className="p-5 rounded-2xl"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-sm">Conclusão do curso</span>
                    <span className="text-white text-sm font-bold">67%</span>
                </div>
                <Progress value={67} variant="gradient" size="lg" />
                <div className="flex justify-between mt-3 text-xs text-white/40">
                    <span>8 aulas concluídas</span>
                    <span>4 aulas restantes</span>
                </div>
            </GlassSurface>
        </motion.section>
    );
}

// ==========================================
// V7 MENU SECTION
// ==========================================
function MenuSection({ navigate }: { navigate: (route: Route) => void }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-8"
        >
            <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Configurações
            </h3>

            <GlassSurface
                variant="surface-2"
                blur="medium"
                className="rounded-2xl overflow-hidden divide-y divide-white/5"
            >
                {MENU_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.route)}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white/60" />
                            </div>
                            <span className="flex-1 text-left text-white text-sm font-medium">
                                {item.label}
                            </span>
                            {item.badge && (
                                <Badge variant="success" className="bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] text-[10px]">
                                    {item.badge}
                                </Badge>
                            )}
                            <ChevronRight className="w-5 h-5 text-white/30" />
                        </button>
                    );
                })}
            </GlassSurface>
        </motion.section>
    );
}

// ==========================================
// MAIN COMPONENT: ProfileV3
// ==========================================
export default function ProfileV3() {
    const { navigate } = useNavigation();

    return (
        <VeloxLayout>
            <div className="px-4 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
                <div className="max-w-[var(--v7-max-content)] mx-auto">

                    {/* Profile Hero */}
                    <ProfileHero onEdit={() => navigate('edit-profile')} />

                    {/* Stats Row */}
                    <StatsRow />

                    {/* Progress Section */}
                    <ProgressSection />

                    {/* Achievements */}
                    <AchievementsGrid />

                    {/* Menu Section */}
                    <MenuSection navigate={navigate} />

                    {/* Logout Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button variant="ghost" size="md" fullWidth className="text-[var(--state-error)]">
                            <LogOut className="w-4 h-4" />
                            Sair da conta
                        </Button>
                    </motion.div>
                </div>
            </div>
        </VeloxLayout>
    );
}
