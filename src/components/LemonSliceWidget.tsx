'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';

export const LemonSliceWidget: React.FC = () => {
  const pathname = usePathname();
  const [showBubble, setShowBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const previousPageRef = useRef(pathname);
  const widgetIdRef = useRef('lemonslice-widget');
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Reset visibility when page changes
  useEffect(() => {
    if (pathname && pathname !== previousPageRef.current) {
      setIsVisible(true);
      setShowBubble(false);
      setIsAgentOpen(false);
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

  // Load and initialize Lemon Slice widget
  useEffect(() => {
    if (typeof window === 'undefined' || !isAgentOpen) {
      // Cleanup when agent is closed
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return;
    }

    if (!containerRef.current) return;

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://unpkg.com/@lemonsliceai/lemon-slice-widget"]');
    
    const createWidget = () => {
      if (containerRef.current) {
        // Clear any existing widget
        containerRef.current.innerHTML = '';
        // Create new widget
        const widget = document.createElement('lemon-slice-widget');
        widget.setAttribute('agent-id', 'agent_c6adc2896a61d2fc');
        containerRef.current.appendChild(widget);
      }
    };

    if (existingScript && scriptLoadedRef.current) {
      // Script already loaded, just create the widget
      createWidget();
      return;
    }

    if (!scriptLoadedRef.current) {
      // Load the script
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@lemonsliceai/lemon-slice-widget';
      script.onload = () => {
        scriptLoadedRef.current = true;
        createWidget();
      };
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup: remove widget when agent closes
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isAgentOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Bubble Button Container */}
      <div 
        data-lemonslice-widget="true"
        data-widget-id={widgetIdRef.current}
        className="fixed bottom-24 md:bottom-64 right-6 md:right-8 z-[45] flex flex-col items-end gap-0 group"
      >
        {/* Main Lemon Slice Button */}
        <button
          onClick={() => setIsAgentOpen(!isAgentOpen)}
          className="relative w-12 h-12 md:w-16 md:h-16 rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white bg-blue-500"
          aria-label="Open Video Agent"
        >
          {/* Blue Ring Animation */}
          <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
          
          {/* Video/Play Icon */}
          <Icons.PlayCircle className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
        </button>
      </div>

      {/* Lemon Slice Agent Container - Only shown when opened */}
      {isAgentOpen && (
        <div className="fixed bottom-44 md:bottom-40 right-6 md:right-8 z-[45]">
          {/* Collapse Button */}
          <button
            onClick={() => setIsAgentOpen(false)}
            className="absolute -top-10 right-0 p-2 rounded-full bg-zinc-200 dark:bg-white/20 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-white/30 transition-colors shadow-sm backdrop-blur-sm mb-2 z-[100]"
            aria-label="Collapse Video Agent"
          >
            <Icons.X className="w-4 h-4" />
          </button>
          {/* Agent Widget Container */}
          <div ref={containerRef} />
        </div>
      )}
    </>
  );
};

export default LemonSliceWidget;
