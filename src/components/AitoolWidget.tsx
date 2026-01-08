'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from './Icons';

export const AitoolWidget: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showBubble, setShowBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const previousPageRef = useRef(pathname);
  // Use static ID to prevent hydration mismatch (Date.now() differs between server/client)
  const widgetIdRef = useRef('aitool-widget');

  // Reset visibility when page changes (force reappear on navigation)
  useEffect(() => {
    if (pathname && pathname !== previousPageRef.current) {
      // Page changed - reset widget to visible state
      setIsVisible(true);
      setShowBubble(false);
      previousPageRef.current = pathname;
    }
  }, [pathname]);

  // Handle bubble animation with delay
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, pathname]);

  if (!isVisible) return null;

  return (
    // Raised bottom position on mobile to avoid overlap with BatchCountdownBar
    // Positioned on left side
    <div 
      data-aitool-widget="true"
      data-widget-id={widgetIdRef.current}
      className="fixed bottom-80 md:bottom-130 left-6 md:left-8 z-50 flex flex-col items-start gap-2 group"
    >
      {/* Speech Bubble - Hidden on mobile to reduce clutter */}
      <div 
        className={`hidden md:block relative bg-white text-zinc-900 px-4 py-3 rounded-2xl rounded-bl-none shadow-xl border border-zinc-100 max-w-[250px] transition-all duration-500 transform origin-bottom-left mb-[-2px] ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}
      >
        {/* Close Button - Positioned on top of the speech bubble */}
        <button 
          onClick={() => {
            setShowBubble(false);
            setIsVisible(false);
          }}
          className="absolute -top-2 -left-2 p-1.5 rounded-full bg-zinc-200 dark:bg-white/20 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-white/30 transition-colors shadow-sm backdrop-blur-sm z-[100]"
          aria-label="Close AI Tools"
        >
          <Icons.X className="w-3 h-3" />
        </button>
        
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0 animate-pulse"></div>
          <div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Try Free AI Tools</p>
          </div>
        </div>
      </div>

      {/* Main AI Tools Button */}
      <button
        onClick={() => router.push('/ai-tools')}
        className="relative w-12 h-12 md:w-16 md:h-16 rounded-full shadow-[0_4px_20px_rgba(147,51,234,0.4)] hover:shadow-[0_8px_30px_rgba(147,51,234,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white bg-purple-600"
      >
        {/* Purple Ring Animation */}
        <div className="absolute inset-0 border-2 border-purple-600 rounded-full animate-ping opacity-20"></div>
        
        <Icons.Brain className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
      </button>
    </div>
  );
};

export default AitoolWidget;

