import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-indigo-ink-500/20 
        bg-gradient-to-b from-violet-midnight-500/40 to-dark-amethyst-500/60 
        backdrop-blur-md p-6 transition-all duration-300
        ${hoverEffect ? 'hover:border-royal-violet-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-dark-amethyst-100/10' : ''}
        ${glow ? 'shadow-[0_0_20px_-3px_rgba(123,44,191,0.15)] border-royal-violet-500/30' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Decorative Gradient Glow inside the card */}
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-royal-violet-500/5 blur-2xl pointer-events-none" />
      {children}
    </div>
  );
};
