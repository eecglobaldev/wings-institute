'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop component handles scroll behavior on navigation:
 * - Scrolls to top on forward navigation (new page)
 * - Preserves scroll position on back navigation using sessionStorage
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const isBackNavigationRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Save scroll position before leaving the previous page (only on forward navigation)
    if (previousPathnameRef.current && previousPathnameRef.current !== pathname) {
      if (!isBackNavigationRef.current) {
        // Only save scroll position on forward navigation
        const currentScroll = window.scrollY || window.pageYOffset;
        if (currentScroll > 0) {
          sessionStorage.setItem(`scroll-${previousPathnameRef.current}`, String(currentScroll));
        }
      }
    }

    // Check if there's a saved scroll position for this pathname
    const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
    
    if (savedScroll && isBackNavigationRef.current) {
      // Restore scroll position for back navigation
      const scrollPos = parseInt(savedScroll, 10);
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPos, behavior: 'auto' });
        // Clear the saved position after restoring
        sessionStorage.removeItem(`scroll-${pathname}`);
      });
      // Reset the flag
      isBackNavigationRef.current = false;
    } else {
      // Forward navigation - scroll to top
      if (previousPathnameRef.current !== pathname) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }

    // Update previous pathname
    previousPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen for popstate (back/forward button)
    const handlePopState = () => {
      isBackNavigationRef.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
