import { ReactNode, useState } from 'react';
import { 
  Home, 
  Compass, 
  Library, 
  ShoppingBag, 
  User, 
  Search,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { useNavigation, type TabRoute } from '../../app/navigation/NavigationContext';
import { motion, AnimatePresence } from 'motion/react';

interface VeloxLayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
  showNavigation?: boolean;
}

interface NavItem {
  id: TabRoute;
  icon: typeof Home;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: 'Dashboard' },
  { id: 'explore', icon: Compass, label: 'Explorar' },
  { id: 'library', icon: Library, label: 'Biblioteca' },
  { id: 'store', icon: ShoppingBag, label: 'Loja' },
];

export function VeloxLayout({ children, rightSidebar, showNavigation = true }: VeloxLayoutProps) {
  const { currentTab, navigateTab, navigate } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[var(--app-bg)] relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(73,220,122,0.06),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(34,242,239,0.04),transparent_70%)]" />
      </div>

      {/* Desktop Navigation Header */}
      {showNavigation && (
        <header className="sticky top-0 z-50 hidden lg:block">
          <div className="mx-auto max-w-[1600px] px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-[var(--text-primary)] text-xl font-bold tracking-tight">
                  Velox
                </span>
              </div>

              {/* Navigation Pills */}
              <nav className="flex items-center">
                <div className="flex items-center gap-1 p-1.5 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-full backdrop-blur-xl">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTab(item.id)}
                        className={cn(
                          'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-[var(--accent-primary)] text-white shadow-lg'
                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-surface-hover)]'
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-full backdrop-blur-xl min-w-[240px]">
                    <Search className="w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar..."
                      className="flex-1 bg-transparent text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] outline-none"
                    />
                    <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[var(--glass-surface-3)] rounded-md text-[10px] text-[var(--text-muted)] font-medium">
                      ⌘ K
                    </kbd>
                  </div>
                </div>

                {/* Action Icons */}
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-colors">
                  <Bell className="w-4.5 h-4.5 text-[var(--text-tertiary)]" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-purchase)] rounded-full" />
                </button>

                <button
                  onClick={() => navigate('settings')}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-colors"
                >
                  <Settings className="w-4.5 h-4.5 text-[var(--text-tertiary)]" />
                </button>

                {/* User Profile */}
                <button
                  onClick={() => navigate('profile')}
                  className="flex items-center gap-3 pl-1 pr-3 py-1 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-full hover:bg-[var(--glass-surface-hover)] transition-colors group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=100"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--glass-border)]"
                  />
                  <div className="hidden xl:block text-left">
                    <p className="text-[var(--text-primary)] text-sm font-medium leading-tight">
                      Ana Carolina
                    </p>
                    <p className="text-[var(--text-muted)] text-xs">
                      Premium
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-tertiary)] transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {showNavigation && (
        <header className="sticky top-0 z-50 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--app-bg)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-[var(--text-primary)] text-lg font-bold">
                Velox
              </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)]"
              >
                <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
              </button>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)]">
                <Bell className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-purchase)] rounded-full" />
              </button>
              <button
                onClick={() => navigate('profile')}
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[var(--glass-border)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=100"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--app-bg)]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-xl">
                  <Search className="w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar conteúdo..."
                    className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)]"
                >
                  <X className="w-5 h-5 text-[var(--text-tertiary)]" />
                </button>
              </div>
              
              {/* Search Suggestions */}
              <div className="mt-6">
                <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-wide font-medium mb-3 px-1">
                  Buscar recentes
                </h3>
                <div className="space-y-1">
                  {['Passagens baratas', 'Europa low cost', 'Milhas aéreas'].map((term, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[var(--glass-surface-hover)] transition-colors"
                    >
                      <Search className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-[var(--text-secondary)]">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="mx-auto max-w-[1600px]">
          <div className={cn(
            'flex gap-6',
            rightSidebar ? 'lg:pr-6' : ''
          )}>
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>

            {/* Right Sidebar - Desktop Only */}
            {rightSidebar && (
              <aside className="hidden xl:block w-[320px] flex-shrink-0 py-6">
                <div className="sticky top-[100px]">
                  {rightSidebar}
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe">
          <div className="relative bg-[var(--app-bg)]/80 backdrop-blur-xl border-t border-[var(--glass-border)]">
            <div className="flex items-center justify-around h-16 px-2">
              {[...navItems, { id: 'profile' as TabRoute, icon: User, label: 'Perfil' }].map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTab(item.id)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 flex-1 h-full',
                      'transition-all duration-200 active:scale-95'
                    )}
                  >
                    <div className="relative">
                      <Icon
                        className={cn(
                          'w-5 h-5 transition-colors duration-200',
                          isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-primary)]"
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-medium transition-colors duration-200',
                        isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

