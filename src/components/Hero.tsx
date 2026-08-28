import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Clock, Ban, Tag } from 'lucide-react';
import { Button } from '../common';
import { HERO_DECISION_CARDS } from '../constants';
import type { DecisionCard } from '../types';

interface HeroProps {
  onNavigate: (view: 'landing' | 'demo') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`🎉 Awesome! We've registered ${email} for the 30-day free trial. Check your inbox for activation!`);
    setEmail('');
  };

  const getStatusIcon = (status: DecisionCard['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'Proposed':
        return <AlertCircle className="h-4 w-4 text-sky-400" />;
      case 'Rejected':
        return <Ban className="h-4 w-4 text-rose-400" />;
    }
  };

  const getStatusColor = (status: DecisionCard['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Proposed':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  const getImpactColor = (impact: DecisionCard['impact']) => {
    switch (impact) {
      case 'High': return 'bg-rose-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
    }
  };

  // Double the list to make a seamless scrolling marquee
  const scrollingCards = [...HERO_DECISION_CARDS, ...HERO_DECISION_CARDS];

  return (
    <section id="hero-section" className="relative pt-8 pb-20 md:py-28 overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-royal-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-80 w-80 rounded-full bg-mauve-magic-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column 1: Headline, description, CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-royal-violet-500/10 text-mauve-magic-600 border border-royal-violet-500/20 w-fit mb-6">
              <span className="flex h-2 w-2 rounded-full bg-mauve-magic-500 animate-pulse" />
              Decision Log v2.0
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Document the <span className="bg-gradient-to-r from-mauve-magic-500 via-mauve-600 to-royal-violet-700 bg-clip-text text-transparent">"Why"</span> of your decisions.
            </h1>
            
            <p className="text-base sm:text-lg text-mauve-600 mb-8 max-w-xl leading-relaxed">
              Stop losing crucial context in buried Slack threads, Jira backlogs, and outdated Notion pages. Decision Log builds a searchable, collaborative timeline of architectural and product choices.
            </p>

            {/* Trial CTA Email Form & Sandbox CTA */}
            <div className="flex flex-col gap-3.5 mb-8 max-w-lg">
              <form onSubmit={handleStartTrial} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-5 py-3 rounded-xl bg-violet-midnight-500/50 border border-indigo-ink-500/40 text-white placeholder-mauve-600/70 focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 backdrop-blur-sm text-sm"
                />
                <Button type="submit" variant="primary" className="whitespace-nowrap">
                  Start Trial Free
                </Button>
              </form>
              <Button 
                type="button" 
                variant="accent" 
                onClick={() => onNavigate('demo')}
                className="w-full shadow-lg shadow-mauve-magic-500/10"
              >
                Try Interactive Sandbox App <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            {/* Quick stats / notes */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-mauve-600">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-mauve-magic-500" />
                <span>30-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-mauve-magic-500" />
                <span>No debit card details</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-mauve-magic-500" />
                <span>Slack & GitHub integrated</span>
              </div>
            </div>
          </div>

          {/* Column 2: Scrolling list of cards */}
          <div className="lg:col-span-6 relative h-[480px] w-full flex items-center justify-center overflow-hidden rounded-3xl border border-indigo-ink-500/10 bg-gradient-to-b from-indigo-ink-100/5 to-violet-midnight-200/5 backdrop-blur-[2px]">
            {/* Overlay gradients for fade effect on top/bottom */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0c0021] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0021] to-transparent z-10 pointer-events-none" />

            {/* Vertical scrolling track */}
            <div className="w-full max-w-md px-4 flex flex-col gap-4 animate-scroll-up py-4">
              {scrollingCards.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="flex flex-col gap-3 p-4 rounded-xl border border-indigo-ink-500/20 bg-dark-amethyst-500/70 hover:bg-violet-midnight-500/80 hover:border-royal-violet-500/30 transition-all duration-300 shadow-md group relative overflow-hidden cursor-default"
                >
                  {/* Status Indicator Line - The user requested "image, small title and line" */}
                  {/* We represent this line as a colored top-accent or impact progress bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${getImpactColor(card.impact)} opacity-60`} />

                  {/* Header Row: Category Badge & Status Indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-mauve-600 flex items-center gap-1">
                      <Tag className="h-3 w-3 text-royal-violet-600" />
                      {card.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] ${getStatusColor(card.status)}`}>
                      {getStatusIcon(card.status)}
                      {card.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-sm text-white group-hover:text-mauve-magic-500 transition-colors duration-200 line-clamp-1">
                    {card.title}
                  </h3>

                  {/* Footer Row: Author Image/Avatar & Details */}
                  <div className="flex items-center justify-between pt-2 border-t border-indigo-ink-500/10">
                    <div className="flex items-center gap-2">
                      {/* Author image/mock avatar */}
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-royal-violet-600 to-mauve-magic-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-royal-violet-500/30">
                        {card.authorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-mauve-900 font-medium leading-none">{card.authorName}</span>
                        <span className="text-[9px] text-mauve-600 leading-none mt-0.5">{card.authorRole}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-mauve-600">{card.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
