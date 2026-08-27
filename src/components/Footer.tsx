import React, { useState } from 'react';
import { Layers, Heart, ArrowRight } from 'lucide-react';
import { FOOTER_SECTIONS } from '../constants';
import { GithubIcon } from '../common';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`📨 Subscribed! We will send monthly release updates to ${email}.`);
    setEmail('');
  };

  return (
    <footer className="bg-dark-amethyst-500 border-t border-indigo-ink-500/10 pt-16 pb-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-indigo-ink-500/10">
          
          {/* Logo & Intro Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-dark-amethyst-400 p-1.5 rounded-lg border border-royal-violet-500/30 flex items-center justify-center">
                <Layers className="h-5 w-5 text-mauve-magic-500" />
              </div>
              <span className="text-lg font-bold text-white group-hover:text-mauve-magic-500 transition-colors duration-150">
                Decision Log
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-mauve-600 leading-relaxed max-w-sm">
              The async consensus platform. Document why technical decisions are made and keep stakeholders aligned across slack channels and repositories automatically.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-mauve-600 hover:text-white p-1 transition-colors duration-150" aria-label="Twitter logo">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-mauve-600 hover:text-white p-1 transition-colors duration-150" aria-label="GitHub logo">
                <GithubIcon size={18} className="fill-current" />
              </a>
              <a href="#" className="text-mauve-600 hover:text-white p-1 transition-colors duration-150" aria-label="LinkedIn logo">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href} 
                        className="text-xs text-mauve-600 hover:text-white transition-colors duration-150 font-medium"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Stay in the loop
            </h4>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Sign up for our developer newsletter to receive insights on ADR templates and async alignment.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-3 py-2 rounded-xl bg-violet-midnight-500/40 border border-indigo-ink-500/30 text-white placeholder-mauve-600/50 focus:outline-none focus:border-royal-violet-500 text-xs"
              />
              <button 
                type="submit" 
                className="p-2.5 rounded-xl bg-royal-violet-600 hover:bg-royal-violet-500 text-white transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Lower Footer section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-mauve-600">
          <p>© {new Date().getFullYear()} Decision Log Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for developers everywhere.
          </p>
        </div>

      </div>
    </footer>
  );
};
