// Imports externos primeiro
import React, { useState, createContext, useContext } from 'react';

// Imports de componentes de telas
import Home from './Home';
import Library from './Library';
import Profile from './Profile';
import Extensions from './Extensions';
import ForumScreen from './ForumScreen';
import CourseDetail from './CourseDetail';
import VideoLesson from './VideoLesson';
import ArticleReader from './ArticleReader';
import Settings from './Settings';
import EditProfile from './EditProfile';
import Onboarding from './Onboarding';

// Interface para contexto de navegação
interface NavigationContextType {
  currentScreen: string;
  navigate: (screen: string, data?: any) => void;
  navigationData?: any;
}

// Criar Context para navegação global
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Hook personalizado para usar navegação
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

// Interface para demonstração
interface AppProps {
  initialScreen?: string;
}

// Componente principal com export default
export default function App({ initialScreen = 'home' }: AppProps) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [navigationData, setNavigationData] = useState<any>(null);

  // Função de navegação
  const navigate = (screen: string, data?: any) => {
    console.log('[Navigation] Navigating to:', screen, data);
    setCurrentScreen(screen);
    setNavigationData(data || null);
    // Scroll to top ao navegar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderizar tela baseado em currentScreen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'library':
        return <Library />;
      case 'profile':
        return <Profile />;
      case 'store':
      case 'extensions':
        return <Extensions />;
      case 'forum':
        return <ForumScreen />;
      case 'course':
        return <CourseDetail />;
      case 'video':
        return <VideoLesson />;
      case 'article':
        return <ArticleReader />;
      case 'settings':
        return <Settings />;
      case 'edit-profile':
        return <EditProfile />;
      case 'onboarding':
        return <Onboarding />;
      default:
        console.warn('[Navigation] Unknown screen:', currentScreen);
        return <Home />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, navigationData }}>
      <div className="min-h-screen bg-black">
        {renderScreen()}
      </div>
    </NavigationContext.Provider>
  );
}
