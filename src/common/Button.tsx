import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mauve-magic-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-royal-violet-600 to-indigo-velvet-600 text-white hover:from-royal-violet-500 hover:to-indigo-velvet-500 shadow-md shadow-royal-violet-950/20 border border-royal-violet-500/30',
    secondary: 'bg-dark-amethyst-400 border border-indigo-ink-600/80 text-mauve-600 hover:text-white hover:bg-indigo-ink-500/30 hover:border-indigo-ink-500',
    accent: 'bg-gradient-to-r from-mauve-magic-500 to-mauve-500 text-dark-amethyst-100 font-semibold hover:from-mauve-magic-400 hover:to-mauve-400 shadow-lg shadow-mauve-magic-500/10',
    ghost: 'text-mauve-600 hover:text-white hover:bg-indigo-ink-500/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
