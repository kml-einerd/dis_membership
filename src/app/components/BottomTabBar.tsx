import { Home, Compass, BookMarked, User } from 'lucide-react';

interface BottomTabBarProps {
  activeTab?: 'home' | 'explore' | 'library' | 'profile';
}

export function BottomTabBar({ activeTab = 'home' }: BottomTabBarProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'explore', icon: Compass, label: 'Explorar' },
    { id: 'library', icon: BookMarked, label: 'Biblioteca' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#141419]/95 backdrop-blur-xl border-t border-white/5 safe-bottom">
      <div className="flex items-center justify-around px-6 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              className="flex flex-col items-center gap-1 py-1 min-w-[60px]"
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'text-[#7c5dfa]' : 'text-white/40'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#7c5dfa] font-medium' : 'text-white/40'
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
