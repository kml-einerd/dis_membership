import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEffect } from 'react';

// Screens - V7 Revolutionary Version
import OnboardingV2 from './screens/OnboardingV2';
import HomeV7 from './screens/HomeV7';
import LibraryV4 from './screens/LibraryV4';
import CourseDetailV2 from './screens/CourseDetailV2';
import ExtensionsV7 from './ExtensionsV7';
import ProfileV3 from './ProfileV3';
import ForumScreen from './screens/ForumScreen';
// Note: Old versions (ExploreV3, LibraryV3) moved to screens/_excluir/
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

  /* 
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
  */

  // Render the current route
  const renderScreen = () => {
    switch (currentRoute) {
      case 'onboarding':
        return <OnboardingV2 />;
      case 'home':
        return <HomeV7 />;
      case 'library':
        return <LibraryV4 />;
      case 'course-detail':
        return <CourseDetailV2 />;
      case 'store':
        return <ExtensionsV7 />;
      case 'profile':
        return <ProfileV3 />;
      case 'forum':
        return <ForumScreen />;
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
        return <HomeV7 />;
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
