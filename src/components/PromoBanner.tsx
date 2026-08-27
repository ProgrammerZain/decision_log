import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-violet-midnight-400 via-indigo-ink-500 to-violet-midnight-400 border-y border-royal-violet-500/20 py-2.5 px-4 text-center text-sm z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-mauve-900">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-mauve-magic-500/20 text-mauve-magic-600 border border-mauve-magic-500/30 animate-pulse-slow">
          <Sparkles className="h-3 w-3" />
          Limited Offer
        </span>
        <span className="font-medium text-xs sm:text-sm">
          Decision Log is <span className="text-mauve-magic-500 font-semibold underline decoration-wavy decoration-royal-violet-400">free for 1 month</span> for new users. No debit card info needed!
        </span>
        <a 
          href="#demo"
          className="text-xs font-semibold text-white hover:text-mauve-magic-500 flex items-center gap-0.5 ml-2 transition-colors duration-150 group"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('demo-section') || document.getElementById('hero-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Claim Trial <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-mauve-600 hover:text-white p-1 transition-colors duration-150 cursor-pointer"
        aria-label="Close offer banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
