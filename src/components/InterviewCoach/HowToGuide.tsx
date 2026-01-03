
import React, { useState } from 'react';
import { Icons } from '@/components/Icons';

export const HowToGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-10 animate-fade-in-up">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-wings-red/5 rounded-[2.5rem] blur-xl"></div>
      
      <div className="relative glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wings-red/10 border border-wings-red/20 text-wings-red text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-wings-red animate-pulse"></span> Quick Guide
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white leading-tight">
              Master Your Interview in <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600">3 Simple Steps</span>
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
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Select a Role</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose your target industry (Cabin Crew, Ground Staff, or Hotel) and specific interview round.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              <Icons.Mic className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Record Answer</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Listen to the AI question. Tap the microphone, speak your answer naturally, and stop when done.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:border-wings-red/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-wings-red/10 text-wings-red flex items-center justify-center font-display font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Get AI Feedback</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Receive instant scoring on confidence, clarity, and content, along with a perfect model answer.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
