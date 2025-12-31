import { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface DesktopLayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
  className?: string;
}

export function DesktopLayout({ children, rightRail, className }: DesktopLayoutProps) {
  return (
    <div className={cn('lg:flex lg:gap-6 lg:max-w-[1200px] lg:mx-auto', className)}>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Right rail - only on desktop */}
      {rightRail && (
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          {rightRail}
        </div>
      )}
    </div>
  );
}
