import React from 'react';
import { Layers, Terminal, ArrowRight } from 'lucide-react';
import { 
  SlackIcon, 
  JiraIcon, 
  NotionIcon, 
  GithubIcon, 
  TeamsIcon, 
  LinearIcon, 
  Card 
} from '../common';
import { INTEGRATIONS } from '../constants';

export const Integrations: React.FC = () => {
  const getPluginIcon = (name: string) => {
    const iconProps = { className: "h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" };
    switch (name) {
      case 'slack': return <SlackIcon {...iconProps} />;
      case 'jira': return <JiraIcon {...iconProps} />;
      case 'notion': return <NotionIcon {...iconProps} />;
      case 'github': return <GithubIcon {...iconProps} />;
      case 'teams': return <TeamsIcon {...iconProps} />;
      case 'linear': return <LinearIcon {...iconProps} />;
      default: return <Layers {...iconProps} />;
    }
  };

  return (
    <section id="integrations" className="py-20 bg-dark-amethyst-500 relative">
      <div className="absolute inset-0 bg-radial-gradient from-violet-midnight-500/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-mauve-magic-500 mb-3">
            Ecosystem & Plugins
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Connects to your everyday tools
          </p>
          <p className="text-base text-mauve-600">
            Decision Log isn't another destination site. Our plugin layer captures decision metadata in the background while you chat, code, or manage tasks.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATIONS.map((plugin) => (
            <Card 
              key={plugin.id}
              className="group border border-indigo-ink-500/15 hover:border-royal-violet-500/30 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-violet-midnight-500 border border-indigo-ink-500/30 w-fit flex items-center justify-center">
                    {getPluginIcon(plugin.iconName)}
                  </div>
                  {plugin.badge && (
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-mauve-magic-500/10 text-mauve-magic-500 border border-mauve-magic-500/20">
                      {plugin.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-mauve-magic-500 transition-colors">
                  {plugin.name}
                </h3>
                <p className="text-sm text-mauve-600 leading-relaxed mb-6">
                  {plugin.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="flex items-center gap-1 text-xs font-semibold text-mauve-magic-500 group-hover:text-white transition-colors cursor-pointer w-fit mt-auto">
                Configure Plugin 
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Card>
          ))}
        </div>

        {/* Footer of Integration block: SDK CTA */}
        <div className="mt-12 p-6 rounded-2xl border border-indigo-ink-500/10 bg-violet-midnight-500/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-indigo-ink-500/25 border border-indigo-ink-500/30 text-mauve-magic-500">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Need a custom integration?</h4>
              <p className="text-xs text-mauve-600 mt-0.5">Use our open Webhook API and Node/Python SDK to build your own custom decision triggers.</p>
            </div>
          </div>
          <a 
            href="#docs"
            className="text-xs font-semibold text-mauve-magic-500 hover:text-white border border-mauve-magic-500/30 hover:border-white px-4 py-2 rounded-xl transition-all duration-150 flex-shrink-0"
          >
            Read API Docs
          </a>
        </div>

      </div>
    </section>
  );
};
