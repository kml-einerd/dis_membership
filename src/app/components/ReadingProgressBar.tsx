import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      const scrolled = (scrollTop / scrollable) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
      <div
        className="h-full bg-[#7c5dfa] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
