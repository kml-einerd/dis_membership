import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEffect } from 'react';

// Screens - V5 premium refactored versions
import OnboardingV2 from './screens/OnboardingV2';
import HomeV5 from './screens/HomeV5';
import ExploreV2 from './screens/ExploreV2';
import LibraryV2 from './screens/LibraryV2';
import CourseDetail from './screens/CourseDetail';
import StoreV3 from './StoreV3';
import ProfileV2 from './ProfileV2';
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

  // Render the current route
  const renderScreen = () => {
    switch (currentRoute) {
      case 'onboarding':
        return <OnboardingV2 />;
      case 'home':
        return <HomeV5 />;
      case 'explore':
        return <ExploreV2 />;
      case 'library':
        return <LibraryV2 />;
      case 'course-detail':
        return <CourseDetail />;
      case 'store':
        return <StoreV3 />;
      case 'profile':
        return <ProfileV2 />;
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
        return <HomeV5 />;
    }
  };

  return renderScreen();
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
