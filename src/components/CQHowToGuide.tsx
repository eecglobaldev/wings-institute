
import React, { useState } from 'react';
import { Icons } from '@/components/Icons';

export const CQHowToGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-12 animate-fade-in-up">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-wings-red/5 rounded-[2.5rem] blur-xl"></div>
      
      <div className="relative glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Icons.Gamepad2 className="w-3 h-3" /> Quick Start
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white leading-tight">
              Level Up Your Career in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">3 Steps</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2 rounded-full bg-white/50 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-500 dark:text-zinc-400 transition-colors backdrop-blur-sm"
            aria-label="Dismiss Guide"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Step 1 */}
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-amber-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
              1
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Select Department</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose from 16 specialized zones like Cabin Crew, Front Office, or Ramp Handling.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-orange-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
              2
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Complete Sets</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Answer 20 questions per set. Score 60% (12/20) to unlock the next difficulty level.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-wings-red/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-wings-red/10 text-wings-red flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
              3
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Master & Earn XP</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Read the 'Expert Insight' after every question to learn real industry standards.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
