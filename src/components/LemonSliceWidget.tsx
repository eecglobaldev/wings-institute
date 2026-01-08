'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';

export const LemonSliceWidget: React.FC = () => {
  const pathname = usePathname();
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const previousPageRef = useRef(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Auto-open agent when page loads or changes
  useEffect(() => {
    if (pathname && pathname !== previousPageRef.current) {
      // Page changed - reset and auto-open
      setIsAgentOpen(false);
      previousPageRef.current = pathname;
      const timer = setTimeout(() => {
        setIsAgentOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isAgentOpen) {
      // Initial load - auto-open after a short delay
      const timer = setTimeout(() => {
        setIsAgentOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Load and initialize Lemon Slice widget
  useEffect(() => {
    if (typeof window === 'undefined' || !isAgentOpen) {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return;
    }

    if (!containerRef.current) return;

    const existingScript = document.querySelector('script[src="https://unpkg.com/@lemonsliceai/lemon-slice-widget"]');
    
    const createWidget = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const widget = document.createElement('lemon-slice-widget');
        widget.setAttribute('agent-id', 'agent_c6adc2896a61d2fc');
        containerRef.current.appendChild(widget);
      }
    };

    if (existingScript && scriptLoadedRef.current) {
      createWidget();
      return;
    }

    if (!scriptLoadedRef.current) {
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
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isAgentOpen]);

  return (
    <>
      {/* Lemon Slice Agent Container - Auto-opened on page load */}
      {/* Positioned at middle of right edge */}
      {isAgentOpen && (
        <div className="fixed top-1/2 right-6 md:right-8 -translate-y-1/2 z-[45]">
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
