import { Home, Compass, Library, ShoppingBag, User } from 'lucide-react';
import { useNavigation, type TabRoute } from '../navigation/NavigationContext';
import { cn } from '../../lib/cn';

interface TabItem {
  id: TabRoute;
  icon: typeof Home;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'home', icon: Home, label: 'Início' },
  { id: 'explore', icon: Compass, label: 'Explorar' },
  { id: 'library', icon: Library, label: 'Biblioteca' },
  { id: 'store', icon: ShoppingBag, label: 'Loja' },
  { id: 'profile', icon: User, label: 'Perfil' },
];

export function AppBottomTabBarV2() {
  const { currentTab, navigateTab } = useNavigation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* iOS-like frosted glass tab bar */}
      <div className="relative mx-auto max-w-[480px]">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-[var(--glass-surface-3)] backdrop-blur-[32px] border-t border-[var(--glass-border)]" />

        {/* Tabs */}
        <nav className="relative flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => navigateTab(tab.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 flex-1 h-full',
                  'transition-all duration-200 active:scale-95'
                )}
              >
                {/* Icon with active indicator */}
                <div className="relative">
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-colors duration-200',
                      isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'text-[10px] font-medium transition-colors duration-200',
                    isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
