
import { 
  Navbar, 
  PromoBanner, 
  Hero, 
  Testimonials, 
  Integrations, 
  Features, 
  Footer, 
  Chatbot, 
  ScrollToTop 
} from './components';

function App() {
  return (
    <div className="min-h-screen bg-dark-amethyst-400 text-mauve-900 flex flex-col relative font-sans antialiased">
      {/* Navigation Headers */}
      <Navbar />
      <PromoBanner />
      
      {/* Main Landing Sections */}
      <main className="flex-grow">
        <Hero />
        <Testimonials />
        <Features />
        <Integrations />
      </main>

      {/* Footer Column links */}
      <Footer />
      
      {/* Floating Bottom Right Interactive Widgets */}
      <Chatbot />
      <ScrollToTop />
    </div>
  );
}

export default App;
