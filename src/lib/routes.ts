/**
 * Route mapping from PageType to Next.js URL paths
 * Preserves URL structure from CSR app
 */

import type { PageType } from '@/types';

export const ROUTES: Record<PageType, string> = {
  'advantage': '/',
  'about': '/about',
  'contact': '/contact-us',
  'ai-tools': '/ai-tools',
  'air-hostess': '/air-hostess-training',
  'airport-mgmt': '/airport-management',
  'hotel-mgmt': '/hotel-management',
  'culinary': '/culinary-cooking-course',
  'travel-tourism': '/travel-tourism-management',
  'admissions': '/admissions',
  'blog': '/blog',
  'placements': '/placements',
  'privacy': '/privacy-policy',
  'career-quest': '/ai-tools/career-quest',
  'franchise': '/franchise',
  'interview-coach': '/ai-tools/interview-coach',
  'scholarship': '/scholarship-test',
  'roi-calculator': '/salary-roi-calculator',
  'pa-simulator': '/ai-tools/pa-simulator',
  'career-navigator': '/ai-tools/career-navigator',
  'resume-builder': '/ai-tools/resume-builder',
  'careers': '/jobs-at-wings',
  'virtual-tour': '/virtual-tour',
  'transparency': '/transparency',
  'events': '/free-workshops-events',
};

export function getRoute(pageType: PageType): string {
  return ROUTES[pageType] || '/';
}

// Reverse mapping: URL path to PageType
export const PATH_TO_PAGE: Record<string, PageType> = Object.fromEntries(
  Object.entries(ROUTES).map(([page, path]) => [path, page as PageType])
) as Record<string, PageType>;

export function getPageType(pathname: string): PageType | undefined {
  return PATH_TO_PAGE[pathname];
}

