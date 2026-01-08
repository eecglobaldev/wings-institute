'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';

export const LemonSliceWidget: React.FC = () => {
  const pathname = usePathname();
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // Inject widget styles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const styleId = 'lemon-slice-widget-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        lemon-slice-widget {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          min-height: 400px !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        lemon-slice-widget * {
          background: transparent !important;
        }
        lemon-slice-widget iframe,
        lemon-slice-widget video {
          background: transparent !important;
          border: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Load and initialize Lemon Slice widget
  useEffect(() => {
    if (typeof window === 'undefined' || !isAgentOpen) {
      // Cleanup when closed
      if (containerRef.current) {
        // Safely clear content without causing removeChild errors
        try {
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
        } catch (e) {
          // Fallback: use innerHTML if removeChild fails
          containerRef.current.innerHTML = '';
        }
      }
      setIsLoading(false);
      return;
    }

    if (!containerRef.current) return;

    const existingScript = document.querySelector('script[src="https://unpkg.com/@lemonsliceai/lemon-slice-widget"]');
    let observer: MutationObserver | null = null;
    let loadingTimeout: NodeJS.Timeout | null = null;
    
    const createWidget = () => {
      if (!containerRef.current) return;
      
      // Safely clear existing content
      if (!containerRef.current) return;
      
      try {
        // Use innerHTML for safer clearing (avoids removeChild errors)
        containerRef.current.innerHTML = '';
      } catch (e) {
        // If innerHTML fails, try removing children one by one
        if (containerRef.current) {
          try {
            const children = Array.from(containerRef.current.children);
            children.forEach(child => {
              try {
                if (child.parentNode === containerRef.current) {
                  containerRef.current?.removeChild(child);
                }
              } catch (e2) {
                // Ignore if already removed
              }
            });
          } catch (e3) {
            // Final fallback - do nothing
          }
        }
      }
      
      setIsLoading(true);
      try {
        const widget = document.createElement('lemon-slice-widget');
        widget.setAttribute('agent-id', 'agent_c6adc2896a61d2fc');
        
        // Use MutationObserver to detect when widget content is rendered
        observer = new MutationObserver(() => {
          if (!containerRef.current) return;
          
          // Check if widget has rendered content (not just empty/black)
          const hasContent = containerRef.current.querySelector('iframe, video, canvas, svg') || 
                            (containerRef.current.innerHTML.trim().length > 100);
          
          if (hasContent) {
            setIsLoading(false);
            if (observer) {
              observer.disconnect();
              observer = null;
            }
            if (loadingTimeout) {
              clearTimeout(loadingTimeout);
              loadingTimeout = null;
            }
          }
        });
        
        containerRef.current.appendChild(widget);
        
        // Start observing
        observer.observe(containerRef.current, {
          childList: true,
          subtree: true,
          attributes: true
        });
        
        // Fallback: hide loading after widget should have loaded
        loadingTimeout = setTimeout(() => {
          setIsLoading(false);
          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }, 5000);
      } catch (error) {
        console.error('Error creating Lemon Slice widget:', error);
        setIsLoading(false);
      }
    };

    const waitForCustomElement = (callback: () => void, maxAttempts = 20) => {
      let attempts = 0;
      const check = () => {
        if (customElements.get('lemon-slice-widget')) {
          callback();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(check, 100);
        } else {
          console.warn('Lemon Slice widget custom element not found, creating anyway');
          callback();
        }
      };
      check();
    };

    if (existingScript && scriptLoadedRef.current) {
      waitForCustomElement(createWidget);
    } else if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@lemonsliceai/lemon-slice-widget';
      script.onload = () => {
        scriptLoadedRef.current = true;
        waitForCustomElement(createWidget);
      };
      script.onerror = () => {
        console.error('Failed to load Lemon Slice widget script');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Clear timeouts
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      
      // Disconnect observer
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      
      // Safely clear container
      if (containerRef.current) {
        try {
          // Check if container still exists in DOM before clearing
          if (containerRef.current.parentNode || document.body.contains(containerRef.current)) {
            // Use innerHTML first (safer and faster)
            containerRef.current.innerHTML = '';
          }
        } catch (e) {
          // Ignore cleanup errors - component may already be unmounted
        }
      }
    };
  }, [isAgentOpen]);

  return (
    <>
      {/* Lemon Slice Agent Container - Auto-opened on page load */}
      {/* Positioned at middle of right edge */}
      {isAgentOpen && (
        <div className="fixed -bottom-24 right-0 md:right-0 -translate-y-1/2 z-[45]">
          {/* Collapse Button */}
          <button
            onClick={() => setIsAgentOpen(false)}
            className="absolute -top-10 right-0 p-2 rounded-full bg-zinc-200 dark:bg-white/20 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-white/30 transition-colors shadow-sm backdrop-blur-sm mb-2 z-[100]"
            aria-label="Collapse Video Agent"
          >
            <Icons.X className="w-4 h-4" />
          </button>
          {/* Agent Widget Container - Completely invisible */}
          <div 
            ref={containerRef} 
            style={{ 
              minWidth: '320px',
              minHeight: '400px',
              width: 'auto',
              height: 'auto',
              background: 'transparent',
              boxShadow: 'none',
              borderRadius: '0',
              border: 'none',
              outline: 'none',
              padding: '0',
              margin: '0'
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading video agent...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LemonSliceWidget;
