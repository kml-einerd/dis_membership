import { Settings, User, CreditCard, Bookmark, Download, Clock, TrendingUp, Award, LogOut, ChevronRight, Crown, Mail, Calendar } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { VeloxLayout } from '../components/layout/VeloxLayout';
import {
  GlassSurface,
  Button,
  Progress,
  SidebarWidget,
} from '../components/design-system';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';

export default function ProfileV2() {
  const { navigate } = useNavigation();

  const userStats = [
    { icon: Bookmark, label: 'Salvos', value: 12, color: 'primary' },
    { icon: Download, label: 'Downloads', value: 3, color: 'secondary' },
    { icon: Clock, label: 'Horas', value: 18, color: 'purchase' },
    { icon: TrendingUp, label: 'Progresso', value: '67%', color: 'premium' },
  ];

  const achievements = [
    { id: '1', title: 'Primeira aula', description: 'Completou sua primeira aula', earned: true },
    { id: '2', title: 'Estudante dedicado', description: '5 horas de estudo', earned: true },
    { id: '3', title: 'Maratonista', description: '10 aulas em uma semana', earned: false },
    { id: '4', title: 'Expert', description: 'Complete todos os módulos', earned: false },
  ];

  const menuItems = [
    { icon: User, label: 'Editar perfil', onClick: () => navigate('edit-profile') },
    { icon: CreditCard, label: 'Assinatura', onClick: () => navigate('store'), badge: 'Básico' },
    { icon: Settings, label: 'Configurações', onClick: () => navigate('settings') },
  ];

  // Sidebar content
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Activity Summary */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Atividade recente
        </h3>
        <div className="space-y-4">
          {[
            { title: 'Completou aula', desc: 'Quando comprar: timing perfeito', time: 'Há 2 horas' },
            { title: 'Salvou conteúdo', desc: 'Guia Europa Econômica', time: 'Há 1 dia' },
            { title: 'Ganhou conquista', desc: 'Estudante dedicado', time: 'Há 2 dias' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-[var(--text-primary)] text-sm font-medium">{activity.title}</p>
                <p className="text-[var(--text-muted)] text-xs truncate">{activity.desc}</p>
                <p className="text-[var(--text-subtle)] text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassSurface>

      {/* Upgrade Banner */}
      <GlassSurface
        variant="surface-3"
        blur="heavy"
        glow
        glowColor="var(--accent-premium)"
        className="p-5 rounded-[var(--radius-xl)] text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[var(--accent-premium-soft)] border border-[var(--accent-premium-border)] flex items-center justify-center mx-auto mb-4">
          <Crown className="w-6 h-6 text-[var(--accent-premium)]" />
        </div>
        <h3 className="text-[var(--text-primary)] text-base font-bold mb-2">
          Seja Premium
        </h3>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-4">
          Acesse todos os conteúdos e ferramentas exclusivas
        </p>
        <Button variant="purchase" size="md" fullWidth onClick={() => navigate('store')}>
          Ver planos
        </Button>
      </GlassSurface>
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      <div className="px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassSurface
            variant="surface-2"
            blur="medium"
            className="p-6 rounded-[var(--radius-2xl)]"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=200"
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[var(--glass-border)]"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center ring-4 ring-[var(--app-bg)]">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-[var(--text-primary)] text-2xl font-bold mb-1">
                  Ana Carolina Silva
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[var(--text-tertiary)] text-sm">
                  <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <Mail className="w-4 h-4" />
                    ana.silva@email.com
                  </span>
                  <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <Calendar className="w-4 h-4" />
                    Membro desde Jan 2024
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] rounded-full text-[var(--accent-primary)] text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Plano Básico
                  </span>
                </div>
              </div>

              {/* Edit Button - Desktop */}
              <div className="hidden sm:block">
                <Button variant="secondary" size="md" onClick={() => navigate('edit-profile')}>
                  Editar perfil
                </Button>
              </div>
            </div>

            {/* Edit Button - Mobile */}
            <div className="sm:hidden mt-4">
              <Button variant="secondary" size="md" fullWidth onClick={() => navigate('edit-profile')}>
                Editar perfil
              </Button>
            </div>
          </GlassSurface>
        </motion.div>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-3">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                primary: 'bg-[var(--accent-primary-soft)] border-[var(--accent-primary-border)] text-[var(--accent-primary)]',
                secondary: 'bg-[var(--accent-secondary-soft)] border-[var(--accent-secondary-border)] text-[var(--accent-secondary)]',
                purchase: 'bg-[var(--accent-purchase-soft)] border-[var(--accent-purchase-border)] text-[var(--accent-purchase)]',
                premium: 'bg-[var(--accent-premium-soft)] border-[var(--accent-premium-border)] text-[var(--accent-premium)]',
              };

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <GlassSurface
                    variant="surface-1"
                    blur="light"
                    className="p-4 rounded-[var(--radius-xl)] text-center"
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-xl border flex items-center justify-center mx-auto mb-2',
                      colorClasses[stat.color as keyof typeof colorClasses]
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-[var(--text-primary)] text-lg font-bold">{stat.value}</p>
                    <p className="text-[var(--text-muted)] text-xs">{stat.label}</p>
                  </GlassSurface>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Progress Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <GlassSurface
            variant="surface-2"
            blur="medium"
            className="p-5 rounded-[var(--radius-xl)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--text-primary)] text-base font-semibold">
                Progresso geral
              </h3>
              <span className="text-[var(--accent-primary)] text-sm font-bold">67%</span>
            </div>
            <Progress value={67} variant="gradient" size="lg" />
            <div className="flex justify-between mt-3 text-xs text-[var(--text-muted)]">
              <span>8 aulas concluídas</span>
              <span>4 aulas restantes</span>
            </div>
          </GlassSurface>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-[var(--text-primary)] text-base font-semibold mb-4">
            Conquistas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <GlassSurface
                  variant={achievement.earned ? 'surface-2' : 'surface-1'}
                  blur="light"
                  className={cn(
                    'p-4 rounded-[var(--radius-lg)]',
                    !achievement.earned && 'opacity-50'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                    achievement.earned
                      ? 'bg-[var(--accent-premium-soft)] border border-[var(--accent-premium-border)]'
                      : 'bg-[var(--glass-surface-3)]'
                  )}>
                    <Award className={cn(
                      'w-5 h-5',
                      achievement.earned ? 'text-[var(--accent-premium)]' : 'text-[var(--text-muted)]'
                    )} />
                  </div>
                  <h4 className="text-[var(--text-primary)] text-sm font-semibold mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-[var(--text-muted)] text-xs">
                    {achievement.description}
                  </p>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Menu Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <h3 className="text-[var(--text-primary)] text-base font-semibold mb-4">
            Configurações
          </h3>
          <GlassSurface
            variant="surface-2"
            blur="medium"
            className="rounded-[var(--radius-xl)] overflow-hidden divide-y divide-[var(--glass-border-subtle)]"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 hover:bg-[var(--glass-surface-hover)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--glass-surface-3)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--text-tertiary)]" />
                  </div>
                  <span className="flex-1 text-left text-[var(--text-primary)] text-sm font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              );
            })}
          </GlassSurface>
        </motion.section>

        {/* Logout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="ghost" size="md" fullWidth className="text-[var(--state-error)]">
            <LogOut className="w-4 h-4" />
            Sair da conta
          </Button>
        </motion.section>
      </div>
    </VeloxLayout>
  );
}

