import { Settings, User, CreditCard, Bookmark, Download, Clock, TrendingUp } from 'lucide-react';
import { UserCard } from './components/UserCard';
import { ProfileActionButton } from './components/ProfileActionButton';
import { QuickLinkItem } from './components/QuickLinkItem';
import { useNavigation } from './navigation/NavigationContext';

export default function Profile() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mb-4">
        <h1 className="text-[var(--app-text-primary)] text-2xl font-medium">Perfil</h1>
        <button
          onClick={() => navigate('settings')}
          className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
        >
          <Settings className="w-4 h-4 text-[var(--app-text-secondary)]" />
        </button>
      </div>

      <div className="px-6">
        {/* User Card */}
        <UserCard
          avatarUrl="https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          name="Ana Carolina Silva"
          email="ana.silva@email.com"
          plan="premium"
        />

        {/* Primary Actions */}
        <div className="mb-6">
          <h2 className="text-[var(--app-text-muted)] text-xs uppercase tracking-wide font-medium mb-3">
            Ações principais
          </h2>
          <div className="space-y-2">
            <ProfileActionButton
              icon={User}
              label="Editar perfil"
              onClick={() => navigate('edit-profile')}
            />
            <ProfileActionButton
              icon={CreditCard}
              label="Extensões e ferramentas"
              onClick={() => navigate('store')}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-[var(--app-text-muted)] text-xs uppercase tracking-wide font-medium mb-3">
            Acesso rápido
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <QuickLinkItem icon={Bookmark} label="Salvos" count={12} onClick={() => navigate('library')} />
            <QuickLinkItem icon={Download} label="Extensões" count={3} onClick={() => navigate('store')} />
            <QuickLinkItem icon={Clock} label="Histórico" onClick={() => navigate('library')} />
            <QuickLinkItem icon={TrendingUp} label="Progresso" count={67} onClick={() => navigate('library')} />
          </div>
        </div>
      </div>
    </div>
  );
}