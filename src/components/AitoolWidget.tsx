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
    // Nudged left on mobile (right-6) to prevent edge crowding and improve text visibility
    <div 
      data-aitool-widget="true"
      data-widget-id={widgetIdRef.current}
      className="fixed bottom-56 md:bottom-96 right-6 md:right-8 z-[50] flex flex-col items-end gap-0 group"
    >
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

