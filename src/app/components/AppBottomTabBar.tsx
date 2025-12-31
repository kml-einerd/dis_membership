import { Home, Compass, Library, Puzzle, User } from 'lucide-react';
import { useNavigation, TabRoute } from '../navigation/NavigationContext';

export function AppBottomTabBar() {
  const { currentTab, navigateTab } = useNavigation();

  const tabs: { id: TabRoute; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'explore', icon: Compass, label: 'Explorar' },
    { id: 'library', icon: Library, label: 'Biblioteca' },
    { id: 'store', icon: Puzzle, label: 'Extensões' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--app-surface)]/95 backdrop-blur-xl border-t border-[var(--app-border)] safe-area-bottom z-50">
      <div className="flex items-center justify-around px-2 py-2 max-w-[520px] mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigateTab(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px]"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? 'text-[var(--app-accent)]'
                    : 'text-[var(--app-text-muted)]'
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--app-accent)]'
                    : 'text-[var(--app-text-muted)]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}