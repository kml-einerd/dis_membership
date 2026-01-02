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
  heroOverlay?: boolean; // Sidebar flutua sobre o hero
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

export function VeloxLayout({ children, rightSidebar, showNavigation = true, heroOverlay = false }: VeloxLayoutProps) {
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
              {/* Logo - Clicável para voltar à Home */}
              <button 
                onClick={() => navigateTab('home')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-[var(--text-primary)] text-xl font-bold tracking-tight">
                  Velox
                </span>
              </button>

              {/* Navigation Pills */}
              <nav className="flex items-center">
                <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-2xl shadow-2xl">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTab(item.id)}
                        className={cn(
                          'relative px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300',
                          isActive
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Icon className={cn("w-3.5 h-3.5", isActive ? "fill-current" : "")} />
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative group">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl min-w-[200px] group-focus-within:border-[var(--accent-primary-border)] transition-all">
                    <Search className="w-3.5 h-3.5 text-white/30 group-focus-within:text-[var(--accent-primary)] transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="BUSCAR..."
                      className="flex-1 bg-transparent text-white text-[10px] font-bold tracking-widest placeholder-white/20 outline-none"
                    />
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2">
                  <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all active:scale-90 group">
                    <Bell className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-[var(--accent-purchase)] rounded-full shadow-[0_0_8px_var(--accent-purchase)]" />
                  </button>

                  <button
                    onClick={() => navigate('settings')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all active:scale-90 group"
                  >
                    <Settings className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* User Profile */}
                <button
                  onClick={() => navigate('profile')}
                  className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white/[0.03] border border-white/5 rounded-full hover:bg-white/10 transition-all group active:scale-95"
                >
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=100"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[var(--accent-primary-border)] transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--accent-primary)] rounded-full border-2 border-[#040a0a]" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-white text-[10px] font-black uppercase tracking-tighter leading-none">
                      Ana Silva
                    </p>
                    <p className="text-[var(--accent-premium)] text-[8px] font-black uppercase tracking-widest mt-0.5">
                      Premium
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {showNavigation && (
        <header className="sticky top-0 z-50 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--app-bg)]/60 backdrop-blur-2xl border-b border-white/5">
            {/* Logo - Clicável para voltar à Home */}
            <button 
              onClick={() => navigateTab('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-base font-black uppercase tracking-tighter">
                Velox
              </span>
            </button>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 active:scale-90"
              >
                <Search className="w-4 h-4 text-white/60" />
              </button>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 active:scale-90">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[var(--accent-purchase)] rounded-full shadow-[0_0_5px_var(--accent-purchase)]" />
              </button>
              <button
                onClick={() => navigate('profile')}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/10 active:scale-90"
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
        {heroOverlay ? (
          // Modo Hero Overlay: Sidebar flutua sobre o conteúdo
          <div className="relative">
            {/* Main Content - Full Width */}
            <div className="w-full">
              {children}
            </div>

            {/* Right Sidebar - Fixed (sem scroll próprio) - Desktop Only */}
            {rightSidebar && (
              <aside className="hidden xl:block fixed top-[100px] right-6 w-[320px] z-30">
                {rightSidebar}
              </aside>
            )}
          </div>
        ) : (
          // Modo padrão: Layout em colunas
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
        )}
      </main>

      {/* Mobile Bottom Tab Bar */}
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe">
          <div className="relative bg-[var(--app-bg)]/60 backdrop-blur-2xl border-t border-white/5 pt-2 pb-1">
            <div className="flex items-center justify-around h-14 px-2">
              {[...navItems, { id: 'profile' as TabRoute, icon: User, label: 'Perfil' }].map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTab(item.id)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 flex-1 h-full',
                      'transition-all duration-300 active:scale-90 group'
                    )}
                  >
                    <div className="relative">
                      <Icon
                        className={cn(
                          'w-5 h-5 transition-all duration-300',
                          isActive ? 'text-[var(--accent-primary)] scale-110' : 'text-white/30 group-hover:text-white/60'
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[9px] font-black uppercase tracking-widest transition-all duration-300',
                        isActive ? 'text-[var(--accent-primary)]' : 'text-white/20'
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

