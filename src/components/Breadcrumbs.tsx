'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';
import { ROUTES, getPageType } from '@/lib/routes';
import type { PageType } from '@/types';

// Define page hierarchy and metadata
interface PageConfigItem {
  label: string;
  parent?: PageType;
  category?: string;
}

const PAGE_CONFIG: Record<PageType, PageConfigItem> = {
  // Home
  'advantage': { label: 'Home' },
  
  // Academy Programs (Courses)
  'air-hostess': { label: 'Air Hostess Training', parent: 'advantage', category: 'Courses' },
  'airport-mgmt': { label: 'Airport Management', parent: 'advantage', category: 'Courses' },
  'hotel-mgmt': { label: 'Hotel Management', parent: 'advantage', category: 'Courses' },
  'culinary': { label: 'Culinary Course', parent: 'advantage', category: 'Courses' },
  'travel-tourism': { label: 'Travel & Tourism', parent: 'advantage', category: 'Courses' },
  
  // AI Tools
  'ai-tools': { label: 'AI Tools', parent: 'advantage' },
  'resume-builder': { label: 'Resume Builder', parent: 'ai-tools' },
  'interview-coach': { label: 'Interview Coach', parent: 'ai-tools' },
  'pa-simulator': { label: 'PA Simulator', parent: 'ai-tools' },
  'career-navigator': { label: 'Career Navigator', parent: 'ai-tools' },
  'career-quest': { label: 'Career Quest', parent: 'ai-tools' },
  
  // Student Hub
  'placements': { label: 'Placements', parent: 'advantage', category: 'Student Hub' },
  'virtual-tour': { label: 'Virtual Tour', parent: 'advantage', category: 'Student Hub' },
  'scholarship': { label: 'Scholarship Test', parent: 'advantage', category: 'Student Hub' },
  'roi-calculator': { label: 'ROI Calculator', parent: 'advantage', category: 'Student Hub' },
  'blog': { label: 'Blog & News', parent: 'advantage', category: 'Student Hub' },
  'admissions': { label: 'Admissions', parent: 'advantage', category: 'Student Hub' },
  
  // Institutional
  'about': { label: 'About Us', parent: 'advantage' },
  'contact': { label: 'Contact', parent: 'advantage' },
  'careers': { label: 'Careers', parent: 'advantage' },
  'franchise': { label: 'Franchise', parent: 'advantage' },
  'privacy': { label: 'Privacy Policy', parent: 'advantage' },
  'transparency': { label: 'Transparency', parent: 'advantage' },
  
  // Events
  'events': { label: 'Free Workshops', parent: 'advantage', category: 'Student Hub' },
};

// Build breadcrumb trail from current page to home
function buildBreadcrumbTrail(page: PageType): { page: PageType; label: string }[] {
  const trail: { page: PageType; label: string }[] = [];
  let current: PageType | undefined = page;
  
  while (current) {
    const cfg: PageConfigItem | undefined = PAGE_CONFIG[current];
    if (cfg) {
      // If page has a category, add it as intermediate crumb
      if (cfg.category && trail.length === 0) {
        trail.unshift({ page: current, label: cfg.label });
        trail.unshift({ page: current, label: cfg.category });
      } else {
        trail.unshift({ page: current, label: cfg.label });
      }
      current = cfg.parent;
    } else {
      break;
    }
  }
  
  return trail;
}

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const currentPage = getPageType(pathname);
  
  // Don't show breadcrumbs on home page or if page not found
  if (!currentPage || currentPage === 'advantage') {
    return null;
  }

  const trail = buildBreadcrumbTrail(currentPage);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="w-full px-4 md:px-8 py-3 mt-20"
    >
      <ol className="flex items-center flex-wrap gap-1.5 text-xs md:text-sm max-w-screen-xl mx-auto">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          const isHome = index === 0 && crumb.page === 'advantage';
          const isCategory = crumb.label !== PAGE_CONFIG[crumb.page]?.label;
          
          return (
            <li key={`${crumb.page}-${index}`} className="flex items-center gap-1.5">
              {/* Separator (not before first item) */}
              {index > 0 && (
                <Icons.ChevronRight className="w-3 h-3 text-zinc-300 dark:text-zinc-600 shrink-0" />
              )}
              
              {isLast ? (
                // Current page - unclickable, styled differently
                <span 
                  className="text-zinc-400 dark:text-zinc-500 font-medium truncate max-w-[150px] md:max-w-[200px]"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : isHome ? (
                // Home icon link
                <Link
                  href="/"
                  className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                  aria-label="Go to Home"
                >
                  <Icons.Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-medium">Home</span>
                </Link>
              ) : isCategory ? (
                // Category label (non-navigable intermediate crumb)
                <span className="text-zinc-400 dark:text-zinc-500 font-medium">
                  {crumb.label}
                </span>
              ) : (
                // Navigable crumb
                <Link
                  href={ROUTES[crumb.page]}
                  className="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors truncate max-w-[120px] md:max-w-[180px]"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

