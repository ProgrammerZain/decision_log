import React from 'react';
import { Check } from 'lucide-react';
import { FEATURE_BLOCKS } from '../constants';

export const Features: React.FC = () => {
  
  // Render high-fidelity pure CSS product mockups in place of image placeholders
  const renderFeatureMock = (type: 'collaboration' | 'audit-log' | 'analytics') => {
    switch (type) {
      case 'collaboration':
        return (
          <div className="w-full max-w-lg p-6 rounded-2xl border border-indigo-ink-500/20 bg-dark-amethyst-500/80 shadow-2xl relative overflow-hidden text-left font-sans">
            {/* Ambient indicator */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-royal-violet-500 to-mauve-magic-500" />
            
            {/* Mock Card header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-semibold text-mauve-magic-500 tracking-wider">Proposal #104</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Active Vote</span>
            </div>

            <h4 className="text-base font-bold text-white mb-2 leading-tight">
              Migrate central API endpoints to Go serverless framework
            </h4>
            <p className="text-xs text-mauve-600 mb-6">
              Proposed by Marcus Cole to address high latency in our legacy Node.js monolithic gateways during peak hours.
            </p>

            {/* Voting List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-violet-midnight-500/40 border border-indigo-ink-500/10">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">SJ</div>
                  <span className="text-xs text-mauve-900 font-medium">Sarah Jenkins</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Approve
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-violet-midnight-500/40 border border-indigo-ink-500/10">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">JV</div>
                  <span className="text-xs text-mauve-900 font-medium">Jordan Vance</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Approve
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-violet-midnight-500/40 border border-indigo-ink-500/10">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center">AR</div>
                  <span className="text-xs text-mauve-900 font-medium">Alex Rivera</span>
                </div>
                <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Blocked
                </span>
              </div>
            </div>

            {/* Voting Progress bar */}
            <div>
              <div className="flex justify-between text-[10px] text-mauve-600 mb-1.5">
                <span>Consensus Progress</span>
                <span className="font-semibold text-white">66% Approved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-indigo-ink-100/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-royal-violet-600 to-mauve-magic-500 rounded-full" style={{ width: '66%' }} />
              </div>
            </div>
          </div>
        );
      case 'audit-log':
        return (
          <div className="w-full max-w-lg p-6 rounded-2xl border border-indigo-ink-500/20 bg-dark-amethyst-500/80 shadow-2xl relative overflow-hidden text-left font-sans">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-royal-violet-500 to-indigo-velvet-600" />
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] uppercase font-semibold text-mauve-magic-500 tracking-wider">Timeline Log</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Immutable Archive</span>
            </div>

            {/* Timeline track */}
            <div className="relative border-l-2 border-indigo-ink-500/20 pl-4 ml-2 space-y-6">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-[23px] top-0 h-3 w-3 rounded-full bg-mauve-magic-500 ring-4 ring-dark-amethyst-500" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Marcus Cole updated DB settings</span>
                  <span className="text-[10px] text-mauve-600">Today, 2:14 PM</span>
                </div>
                <p className="text-[11px] text-mauve-600 mt-1">Upgraded prod storage tier for Q3 capacity planning.</p>
                
                {/* Mock Code Diff */}
                <div className="mt-2.5 rounded-lg border border-indigo-ink-500/15 bg-violet-midnight-500/50 p-2 font-mono text-[10px] leading-tight">
                  <div className="text-rose-400 bg-rose-500/5 px-1.5 py-0.5 rounded">- db_instance_class = "db.t4g.medium"</div>
                  <div className="text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded mt-0.5">+ db_instance_class = "db.r6g.xlarge"</div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-[23px] top-0 h-3 w-3 rounded-full bg-royal-violet-500 ring-4 ring-dark-amethyst-500" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Proposal created</span>
                  <span className="text-[10px] text-mauve-600">Aug 25, 11:30 AM</span>
                </div>
                <p className="text-[11px] text-mauve-600 mt-0.5">Drafted by Marcus Cole (Backend Engineer)</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="w-full max-w-lg p-6 rounded-2xl border border-indigo-ink-500/20 bg-dark-amethyst-500/80 shadow-2xl relative overflow-hidden text-left font-sans">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-mauve-magic-500 to-mauve-500" />
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] uppercase font-semibold text-mauve-magic-500 tracking-wider">Metrics Dashboard</span>
              <span className="text-[10px] text-mauve-600">Last 30 Days</span>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-violet-midnight-500/40 border border-indigo-ink-500/10">
                <span className="text-[10px] text-mauve-600 block">Total Decisions Logged</span>
                <span className="text-2xl font-bold text-white mt-1 block">142</span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">+12% vs last month</span>
              </div>
              <div className="p-3 rounded-xl bg-violet-midnight-500/40 border border-indigo-ink-500/10">
                <span className="text-[10px] text-mauve-600 block">Resolution Speed</span>
                <span className="text-2xl font-bold text-white mt-1 block">2.1 Days</span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">Reduced by 56%</span>
              </div>
            </div>

            {/* Graph / Breakdown */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-semibold text-mauve-600 tracking-wider block">Decisions by Category</span>
              
              <div>
                <div className="flex justify-between text-[11px] text-mauve-900 mb-1">
                  <span>Architecture & Infrastructure</span>
                  <span className="font-semibold text-white">45%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-indigo-ink-100/10 overflow-hidden">
                  <div className="h-full bg-royal-violet-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-mauve-900 mb-1">
                  <span>Product Decisions</span>
                  <span className="font-semibold text-white">35%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-indigo-ink-100/10 overflow-hidden">
                  <div className="h-full bg-mauve-magic-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-mauve-900 mb-1">
                  <span>Security & Compliance</span>
                  <span className="font-semibold text-white">20%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-indigo-ink-100/10 overflow-hidden">
                  <div className="h-full bg-mauve-500 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="features" className="py-20 overflow-hidden bg-dark-amethyst-400 relative">
      {/* Decorative side lights */}
      <div className="absolute top-1/3 -right-60 -z-10 h-96 w-96 rounded-full bg-indigo-ink-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-60 -z-10 h-96 w-96 rounded-full bg-royal-violet-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-mauve-magic-500 mb-3">
            Core Features
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Built for velocity. Engineered for history.
          </p>
          <p className="text-base text-mauve-600">
            Decision Log solves the organizational memory leak. Discover key elements that streamline how your team documents critical engineering logic.
          </p>
        </div>

        {/* Alternating Sections */}
        <div className="space-y-28">
          {FEATURE_BLOCKS.map((feature, idx) => {
            const isImageLeft = idx % 2 === 1;
            
            return (
              <div 
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Column: Image or Text based on alternating configuration */}
                <div className={`lg:col-span-6 flex justify-center ${
                  isImageLeft ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div className="relative group p-1 rounded-2xl bg-gradient-to-tr from-indigo-ink-500/10 to-royal-violet-500/20 shadow-xl">
                    {/* Glowing highlight border in background on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-royal-violet-500/10 to-mauve-magic-500/15 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <div className="relative">
                      {renderFeatureMock(feature.mockType)}
                    </div>
                  </div>
                </div>

                {/* Right Column: Text content */}
                <div className={`lg:col-span-6 flex flex-col text-left ${
                  isImageLeft ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
                }`}>
                  <span className="text-xs font-semibold tracking-wider uppercase text-mauve-magic-500 mb-3 block">
                    {feature.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-mauve-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Bullet Benefits */}
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-mauve-900">
                        <span className="flex-shrink-0 mt-0.5 p-0.5 rounded-full bg-royal-violet-500/15 text-mauve-magic-500">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
