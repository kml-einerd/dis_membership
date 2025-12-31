import { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface AppContainerProps {
  children: ReactNode;
  maxWidth?: 'mobile' | 'desktop';
  className?: string;
}

export function AppContainer({ children, maxWidth = 'mobile', className }: AppContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidth === 'mobile' && 'max-w-[480px]',
      maxWidth === 'desktop' && 'max-w-[1200px]',
      className
    )}>
      {children}
    </div>
  );
}
