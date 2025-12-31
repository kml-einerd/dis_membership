import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  showTabBar?: boolean;
}

export function AppShell({ children, showTabBar = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--app-bg)]">
      {/* Desktop container wrapper */}
      <div className="mx-auto max-w-[520px] min-h-screen bg-[var(--app-bg)] relative">
        {/* Content */}
        <div className={showTabBar ? 'pb-16' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
}
