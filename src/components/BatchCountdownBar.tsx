'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

export const BatchCountdownBar: React.FC = () => {
  // Initialize with random values on mount to create dynamic urgency for every visit
  const [timeLeft, setTimeLeft] = useState(() => ({
    days: Math.floor(Math.random() * 4) + 1, // Randomly 1 to 4 days
    hours: Math.floor(Math.random() * 23) + 1, // Randomly 1 to 23 hours
    minutes: Math.floor(Math.random() * 50) + 10, // Randomly 10 to 59 minutes
    seconds: 0
  }));

  // Randomize seats left between 2 and 7
  const [seatsLeft] = useState(() => Math.floor(Math.random() * 6) + 2);
  
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle hydration - only show after mount to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // Don't render until client-side mounted (prevents hydration mismatch)
  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 right-0 z-40 px-0 md:px-4 pb-[env(safe-area-inset-bottom)] animate-fade-in-up">
      <div className="max-w-5xl mx-auto">
        {/* Docked on mobile (rounded-t-xl), Floating on desktop (rounded-2xl) */}
        <div className="relative overflow-hidden rounded-t-2xl rounded-b-none md:rounded-2xl glass-panel bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] md:shadow-2xl border-t border-zinc-200 dark:border-white/10 md:border backdrop-blur-xl">
          
          <div className="relative z-10 flex flex-row items-center justify-between p-3 md:p-4 gap-3 md:gap-4">
            
            {/* Left: Urgency & Timer */}
            <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
               {/* Icon - Neutral background now */}
               <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-100 dark:bg-white/5 items-center justify-center border border-zinc-200 dark:border-white/10 shrink-0">
                  <Icons.Timer className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 dark:text-zinc-400" />
               </div>
               
               <div className="flex flex-col justify-center min-w-0">
                  {/* Text - Indigo Text */}
                  <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                    <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                      <span className="hidden sm:inline">Next Batch Closing • </span>
                      <span className="text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-black tracking-tight">Only {seatsLeft} Seats Left</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300">
                     <span className="hidden xs:inline text-zinc-400">Ends in:</span>
                     <div className="flex gap-1 font-mono text-zinc-900 dark:text-white text-xs md:text-sm font-bold">
                        {/* Neutral Timer Boxes */}
                        <span className="bg-zinc-100 dark:bg-white/10 px-1.5 py-1 rounded-md border border-zinc-200 dark:border-white/5 min-w-[32px] text-center">{timeLeft.days}d</span>
                        <span className="self-center">:</span>
                        <span className="bg-zinc-100 dark:bg-white/10 px-1.5 py-1 rounded-md border border-zinc-200 dark:border-white/5 min-w-[32px] text-center">{timeLeft.hours}h</span>
                        <span className="self-center">:</span>
                        <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-1.5 py-1 rounded-md border border-zinc-900 dark:border-white min-w-[32px] text-center">{timeLeft.minutes}m</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: CTA & Close */}
            <div className="flex items-center gap-3 shrink-0">
               <Link 
                href="/scholarship-test"
                 className=" lg:flex group relative px-5 py-2.5 md:px-6 md:py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-xs md:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap"
               >
                  <span>Take Scholarship Test</span> 
                  <Icons.ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               
               <button 
                 onClick={() => setIsVisible(false)}
                 className="p-2 md:p-3 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
               >
                  <Icons.X className="w-4 h-4" />
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchCountdownBar;

