import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type Route =
  | 'onboarding'
  | 'home'
  | 'explore'
  | 'library'
  | 'store'
  | 'profile'
  | 'edit-profile'
  | 'settings'
  | 'course-detail'
  | 'video-lesson'
  | 'article-reader'
  | 'minimal-article'
  | 'locked-preview'
  | 'sales-video'
  | 'sales-article';

export type TabRoute = 'home' | 'explore' | 'library' | 'store' | 'profile';

interface NavigationState {
  currentTab: TabRoute;
  stack: Route[];
  params: Record<string, any>;
}

interface NavigationContextType {
  currentRoute: Route;
  currentTab: TabRoute;
  params: Record<string, any>;
  navigate: (route: Route, params?: Record<string, any>) => void;
  navigateTab: (tab: TabRoute) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  // Check if onboarding is complete
  const hasCompletedOnboarding = localStorage.getItem('onboarding_complete') === 'true';
  
  const [state, setState] = useState<NavigationState>({
    currentTab: 'home',
    stack: [hasCompletedOnboarding ? 'home' : 'onboarding'],
    params: {},
  });

  const navigate = useCallback((route: Route, params: Record<string, any> = {}) => {
    setState((prev) => ({
      ...prev,
      stack: [...prev.stack, route],
      params,
    }));
  }, []);

  const navigateTab = useCallback((tab: TabRoute) => {
    setState({
      currentTab: tab,
      stack: [tab],
      params: {},
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.stack.length <= 1) return prev;
      const newStack = prev.stack.slice(0, -1);
      const newRoute = newStack[newStack.length - 1];
      // If going back to a tab route, update currentTab
      const tabRoutes: TabRoute[] = ['home', 'explore', 'library', 'store', 'profile'];
      return {
        ...prev,
        currentTab: tabRoutes.includes(newRoute as TabRoute) ? (newRoute as TabRoute) : prev.currentTab,
        stack: newStack,
        params: {},
      };
    });
  }, []);

  const currentRoute = state.stack[state.stack.length - 1];
  const canGoBack = state.stack.length > 1;

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        currentTab: state.currentTab,
        params: state.params,
        navigate,
        navigateTab,
        goBack,
        canGoBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
