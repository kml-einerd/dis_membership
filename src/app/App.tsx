import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { AppShell } from './components/AppShell';
import { AppBottomTabBarV2 } from './components/AppBottomTabBarV2';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEffect } from 'react';

// Screens - V4 premium refactored versions
import OnboardingV2 from './screens/OnboardingV2';
import HomeV4 from './screens/HomeV4';
import Explore from './screens/Explore';
import Library from './screens/Library';
import CourseDetail from './screens/CourseDetail';
import StoreV2 from './StoreV2';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Settings from './Settings';
import VideoLesson from './VideoLesson';
import ArticleReader from './ArticleReader';
import MinimalArticleReader from './MinimalArticleReader';
import LockedContentPreview from './LockedContentPreview';
import SalesVideoScreen from './SalesVideoScreen';
import SalesArticleScreen from './SalesArticleScreen';

function AppContent() {
  const { currentRoute } = useNavigation();

  // Suppress console errors that don't affect functionality
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = String(args[0]);
      if (
        message.includes('CORS') || 
        message.includes('Cross-origin') ||
        message.includes('cross-origin') ||
        message.includes('reduxState') ||
        message.includes('logPreviewError')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = String(args[0]);
      if (message.includes('reduxState') || message.includes('logPreviewError')) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Suppress unhandled promise rejections from CORS
    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason);
      if (
        message.includes('CORS') || 
        message.includes('Cross-origin') ||
        message.includes('reduxState')
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const showTabBar = [
    'home',
    'explore',
    'library',
    'store',
    'profile',
  ].includes(currentRoute);

  // Render the current route
  const renderScreen = () => {
    switch (currentRoute) {
      case 'onboarding':
        return <OnboardingV2 />;
      case 'home':
        return <HomeV4 />;
      case 'explore':
        return <Explore />;
      case 'library':
        return <Library />;
      case 'course-detail':
        return <CourseDetail />;
      case 'store':
        return <StoreV2 />;
      case 'profile':
        return <Profile />;
      case 'edit-profile':
        return <EditProfile />;
      case 'settings':
        return <Settings />;
      case 'video-lesson':
        return <VideoLesson />;
      case 'article-reader':
        return <ArticleReader />;
      case 'minimal-article':
        return <MinimalArticleReader />;
      case 'locked-preview':
        return <LockedContentPreview />;
      case 'sales-video':
        return <SalesVideoScreen />;
      case 'sales-article':
        return <SalesArticleScreen />;
      default:
        return <Home />;
    }
  };

  return (
    <AppShell showTabBar={showTabBar}>
      {renderScreen()}
      {showTabBar && <AppBottomTabBarV2 />}
    </AppShell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErrorBoundary>
  );
}