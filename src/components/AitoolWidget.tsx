'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from './Icons';

export const AitoolWidget: React.FC = () => {
  const router = useRouter();
  // Use static ID to prevent hydration mismatch (Date.now() differs between server/client)
  const widgetIdRef = useRef('aitool-widget');

  return (
    // Raised bottom position on mobile to avoid overlap with BatchCountdownBar
    // Positioned on left side
    <div 
      data-aitool-widget="true"
      data-widget-id={widgetIdRef.current}
      className="fixed bottom-40 md:bottom-44 left-6 md:left-8 z-50"
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

