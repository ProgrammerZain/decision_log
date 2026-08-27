
import { useState, useEffect } from 'react';
import { 
  Navbar, 
  PromoBanner, 
  Hero, 
  Testimonials, 
  Integrations, 
  Features, 
  Footer, 
  Chatbot, 
  ScrollToTop,
  DecisionLogDemo
} from './components';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'demo'>('landing');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-dark-amethyst-400 text-mauve-900 flex flex-col relative font-sans antialiased">
      {/* Navigation Headers */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <PromoBanner />
      
      {/* Main Landing Sections */}
      <main className="flex-grow">
        {currentView === 'landing' ? (
          <div className="animate-fade-in">
            <Hero onNavigate={setCurrentView} />
            <Testimonials />
            <Features />
            <Integrations />
          </div>
        ) : (
          <div className="animate-fade-in-scale">
            <DecisionLogDemo onNavigate={setCurrentView} />
          </div>
        )}
      </main>

      {/* Footer Column links */}
      {currentView === 'landing' && <Footer />}
      
      {/* Floating Bottom Right Interactive Widgets */}
      <Chatbot />
      <ScrollToTop />
    </div>
  );
}

export default App;

