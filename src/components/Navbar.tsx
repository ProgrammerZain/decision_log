import React, { useState, useEffect } from 'react';
import { Menu, X, Layers, Sun, Moon } from 'lucide-react';
import { Button } from '../common';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  currentView: 'landing' | 'demo';
  onNavigate: (view: 'landing' | 'demo') => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, theme, onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = () => {
    onNavigate('demo');
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-amethyst-500/80 border-b border-indigo-ink-500/20 backdrop-blur-md py-3 shadow-lg shadow-dark-amethyst-100/10' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('landing')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-royal-violet-500 to-mauve-magic-500 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-dark-amethyst-400 p-2 rounded-lg border border-royal-violet-500/30 flex items-center justify-center">
                <Layers className="h-5 w-5 text-mauve-magic-500" />
              </div>
            </div>
            <span className="text-xl font-bold text-royal-violet-500 dark:text-mauve-magic-500 group-hover:text-royal-violet-600 dark:group-hover:text-white transition-all duration-300">
              Decision Log
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {currentView === 'landing' ? (
              NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-mauve-600 hover:text-white transition-colors duration-150 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-mauve-magic-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
                >
                  {item.label}
                </a>
              ))
            ) : (
              <span className="text-xs text-mauve-magic-500 font-bold bg-royal-violet-600/10 border border-royal-violet-500/30 px-3.5 py-1.5 rounded-xl animate-pulse">
                Interactive Sandbox Active
              </span>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-xl border border-indigo-ink-500/15 bg-indigo-ink-100/5 text-mauve-600 hover:text-white hover:border-royal-violet-500/50 hover:bg-royal-violet-500/10 transition-all cursor-pointer focus:outline-none flex items-center justify-center"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5 text-royal-violet-500" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              )}
            </button>
            
            {currentView === 'landing' ? (
              <Button variant="primary" size="sm" onClick={handleDemoClick}>
                Try Demo
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => onNavigate('landing')}>
                Back to Website
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-xl border border-indigo-ink-500/15 bg-indigo-ink-100/5 text-mauve-600 hover:text-white hover:border-royal-violet-500/50 hover:bg-royal-violet-500/10 transition-all cursor-pointer focus:outline-none flex items-center justify-center"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5 text-royal-violet-500" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mauve-600 hover:text-white p-2 rounded-lg hover:bg-indigo-ink-500/20 focus:outline-none transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dark-amethyst-400 border-b border-indigo-ink-500/10 ${
        isOpen ? 'max-h-screen opacity-100 py-4 px-4' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-4">
          {currentView === 'landing' ? (
            <>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base text-mauve-600 hover:text-white py-2 border-b border-indigo-ink-500/5 transition-colors font-medium text-left"
                >
                  {item.label}
                </a>
              ))}
              <Button variant="primary" size="md" fullWidth className="mt-2" onClick={handleDemoClick}>
                Try Demo
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm text-center text-mauve-magic-500 font-bold bg-royal-violet-600/20 border border-royal-violet-500/30 px-3 py-2.5 rounded-lg">
                Interactive Sandbox Active
              </span>
              <Button variant="secondary" size="md" fullWidth className="mt-2" onClick={() => { onNavigate('landing'); setIsOpen(false); }}>
                Back to Website
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

