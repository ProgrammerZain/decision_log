import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-24 z-40 p-3 rounded-xl border border-indigo-ink-500/30 
        bg-dark-amethyst-500/80 backdrop-blur-md text-mauve-600 hover:text-white 
        hover:border-royal-violet-500/50 hover:bg-indigo-ink-500/30 shadow-lg shadow-dark-amethyst-100/10 
        transition-all duration-300 cursor-pointer active:scale-95
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
