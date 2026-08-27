import React from 'react';
import { 
  StripeIcon, 
  GithubIcon, 
  SlackIcon, 
  NotionIcon, 
  LinearIcon, 
  FramerIcon 
} from '../common';
import { TESTIMONIAL_COMPANIES } from '../constants';

export const Testimonials: React.FC = () => {
  const renderLogo = (type: string) => {
    const props = { className: "h-6 w-auto fill-current opacity-50 hover:opacity-100 transition-all duration-300 text-mauve-600 hover:text-white" };
    switch (type) {
      case 'stripe':
        return <StripeIcon {...props} size={28} />;
      case 'github':
        return <GithubIcon {...props} size={26} />;
      case 'slack':
        return <SlackIcon {...props} size={26} />;
      case 'notion':
        return <NotionIcon {...props} size={24} />;
      case 'linear':
        return <LinearIcon {...props} size={24} />;
      case 'framer':
        return <FramerIcon {...props} size={24} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 border-y border-indigo-ink-500/10 bg-gradient-to-r from-dark-amethyst-400 via-violet-midnight-500/10 to-dark-amethyst-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-mauve-600 mb-8">
          Trusted by engineering and product teams at industry leaders
        </p>
        
        {/* Responsive Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {TESTIMONIAL_COMPANIES.map((company) => (
            <div 
              key={company.id} 
              className="flex items-center justify-center gap-2 group transition-transform duration-300 hover:scale-105"
            >
              {renderLogo(company.logoType)}
              <span className="text-sm font-semibold text-mauve-600/50 group-hover:text-white transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
