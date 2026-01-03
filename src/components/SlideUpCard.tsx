'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

interface SlideUpCardProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  colorClass: string;
  iconColorClass: string;
  isWhite?: boolean;
  tapLabel: string;
  certLabel: string;
}

export const SlideUpCard: React.FC<SlideUpCardProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  desc, 
  colorClass, 
  iconColorClass, 
  isWhite = false, 
  tapLabel, 
  certLabel 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(!isRevealed);
  };

  return (
    <div 
      className={`relative h-[600px] w-full rounded-[3.5rem] overflow-hidden group cursor-pointer transition-all duration-700 shadow-2xl border border-white/10 ${colorClass}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onClick={handleToggle}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* --- FRONT STATE --- */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${isRevealed ? '-translate-y-20 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}`}>
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-10 shadow-2xl">
           <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-display font-black text-white leading-[1.1] tracking-tightest uppercase max-w-[200px] mx-auto">
            {title}
          </h3>
          <p className="text-[11px] md:text-xs font-black text-white/70 uppercase tracking-[0.3em] leading-[1.6]">
            {subtitle}
          </p>
        </div>
        
        <div className="absolute bottom-12 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white text-[11px] font-black uppercase tracking-[0.2em] leading-none backdrop-blur-md flex items-center gap-3 group-hover:scale-105 transition-all shadow-lg">
           <Icons.Sparkles className="w-3.5 h-3.5 shrink-0" /> <span className="leading-[1.5]">{tapLabel}</span>
        </div>
      </div>

      {/* --- REVEALED STATE (SLIDE UP) --- */}
      <div className={`absolute inset-0 bg-white dark:bg-zinc-950 flex flex-col transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) will-change-transform ${isRevealed ? 'translate-y-0' : 'translate-y-full'}`}>
         
         {/* Top Branding Strip for White/Reveal cards */}
         {isWhite && <div className="h-10 w-full bg-[#0f172a] shrink-0"></div>}
         
         <div className="flex-1 p-10 md:p-14 flex flex-col text-left">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl ${iconColorClass} flex items-center justify-center mb-10 shrink-0 shadow-lg border border-black/5 dark:border-white/5`}>
                <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            
            <h4 className="text-3xl md:text-4xl font-display font-black text-zinc-900 dark:text-white mb-8 tracking-tighter uppercase leading-[1.2]">
              {title}
            </h4>

            <p className="text-zinc-700 dark:text-zinc-300 leading-[1.9] text-lg md:text-xl font-semibold mb-12">
                {desc}
            </p>

            <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-black text-green-600 dark:text-green-400 uppercase tracking-[0.2em] leading-[1.5]">
                    <Icons.CheckCircle2 className="w-5 h-5 shrink-0" /> <span>{certLabel}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                   <Icons.ArrowRight className="w-4 h-4 text-zinc-400" />
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SlideUpCard;

