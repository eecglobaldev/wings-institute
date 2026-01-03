'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { useHydrated } from '@/hooks/useHydrated';

interface PowerModuleCardProps {
  title: string;
  roleTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  color: string;
  index: number;
  tapLabel: string;
  curriculumLabel: string;
  includedLabel: string;
}

const THEMES: Record<string, { bg: string; accent: string; light: string }> = {
  red: { bg: 'bg-gradient-to-br from-rose-900 via-red-900 to-red-950', accent: 'text-rose-600', light: 'bg-rose-50' },
  blue: { bg: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-indigo-950', accent: 'text-blue-600', light: 'bg-blue-50' },
  indigo: { bg: 'bg-gradient-to-br from-indigo-900 via-violet-900 to-violet-950', accent: 'text-indigo-600', light: 'bg-indigo-50' },
  purple: { bg: 'bg-gradient-to-br from-purple-900 via-fuchsia-900 to-fuchsia-950', accent: 'text-purple-600', light: 'bg-purple-50' },
  amber: { bg: 'bg-gradient-to-br from-amber-900 via-orange-900 to-orange-950', accent: 'text-amber-600', light: 'bg-amber-50' },
  orange: { bg: 'bg-gradient-to-br from-orange-900 via-red-900 to-red-950', accent: 'text-orange-600', light: 'bg-orange-50' },
  teal: { bg: 'bg-gradient-to-br from-teal-900 via-emerald-900 to-emerald-950', accent: 'text-teal-600', light: 'bg-teal-50' },
  cyan: { bg: 'bg-gradient-to-br from-cyan-900 via-sky-900 to-sky-950', accent: 'text-cyan-600', light: 'bg-cyan-50' },
  emerald: { bg: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-teal-950', accent: 'text-emerald-600', light: 'bg-emerald-50' },
  yellow: { bg: 'bg-gradient-to-br from-yellow-900 via-amber-900 to-amber-950', accent: 'text-yellow-600', light: 'bg-yellow-50' },
};

export const PowerModuleCard: React.FC<PowerModuleCardProps> = ({ 
  title, 
  roleTitle,
  icon: Icon, 
  desc, 
  color, 
  index,
  tapLabel,
  curriculumLabel,
  includedLabel
}) => {
  const [isActive, setIsActive] = useState(false);
  const isHydrated = useHydrated();

  const handleInteraction = (e: React.MouseEvent) => {
    // Only toggle on mobile (no hover support) or explicit click
    if (isHydrated && window.matchMedia("(pointer: coarse)").matches) {
       e.preventDefault();
       setIsActive(!isActive);
    }
  };

  const theme = THEMES[color] || { bg: 'bg-zinc-900', accent: 'text-zinc-600', light: 'bg-zinc-50' };

  const handleMouseEnter = () => {
    if (isHydrated && !window.matchMedia("(pointer: coarse)").matches) {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHydrated && !window.matchMedia("(pointer: coarse)").matches) {
      setIsActive(false);
    }
  };

  return (
    <div 
      className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/5"
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${theme.bg}`}>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="absolute top-4 right-6 text-[120px] font-black text-white/5 leading-none select-none font-display">0{index}</div>
      </div>

      {/* Front Content */}
      <div className={`relative h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${isActive ? '-translate-y-16 scale-90 opacity-0' : 'translate-y-0 opacity-100'}`}>
         <div className="relative w-24 h-24 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg mb-6 backdrop-blur-md">
            <Icon className="w-10 h-10 text-white" />
         </div>
         <h3 className="text-2xl font-display font-bold text-white mb-2 leading-[1.3]">{title}</h3>
         <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-wide text-white/90 leading-[1.5]">{roleTitle}</span>
         </div>
         <div className="absolute bottom-10 flex items-center gap-2 text-white/60 text-[11px] font-bold uppercase tracking-wide leading-none">
            <Icons.ArrowUpRight className="w-3 h-3 shrink-0" /> <span className="leading-[1.5]">{tapLabel}</span>
         </div>
      </div>

      {/* Slide Up Panel */}
      <div 
        className={`
          absolute inset-x-0 bottom-0 h-[90%] bg-white dark:bg-zinc-900 rounded-t-[2.5rem] p-8 flex flex-col
          transition-transform duration-500 cubic-bezier(0.4,0,0.2,1) z-20 will-change-transform
          ${isActive ? 'translate-y-0' : 'translate-y-[101%]'}
        `}
      >
         <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-6 shrink-0"></div>
         
         <div className="flex items-center gap-3 mb-6 shrink-0">
             <div className={`p-2 rounded-lg ${theme.light} dark:bg-white/5`}>
                <Icon className={`w-6 h-6 ${theme.accent}`} />
             </div>
             <span className="text-xs font-bold uppercase tracking-wide text-zinc-400 leading-[1.5]">Module 0{index}</span>
         </div>

         <h3 className="text-2xl font-bold mb-4 leading-[1.3] text-zinc-900 dark:text-white shrink-0">{curriculumLabel}</h3>
         
         <div className="flex-grow overflow-y-auto scrollbar-hide pr-2">
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-[1.8] font-medium">
               {desc}
            </p>
         </div>

         <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <div className={`flex items-center gap-2 text-[11px] font-bold ${theme.accent} uppercase tracking-wide leading-none`}>
               <Icons.CheckCircle2 className="w-4 h-4 shrink-0" /> <span className="leading-[1.5]">{includedLabel}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PowerModuleCard;

