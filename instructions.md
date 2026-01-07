# Wings Institute SSR Website - Project Instructions

**Last Updated:** January 2026  
**Project Type:** Next.js 15 SSR (Server-Side Rendering)  
**Original Source:** Migrated from Vite + React 19 CSR (Client-Side Rendering)  
**Domain:** `wingsinstitute.com`  
**Status:** ✅ Production Ready (100% Visual & Functional Parity Achieved)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Project Structure](#project-structure)
4. [Key Patterns & Conventions](#key-patterns--conventions)
5. [Route Organization](#route-organization)
6. [Component Architecture](#component-architecture)
7. [Styling System](#styling-system)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [SEO Implementation](#seo-implementation)
10. [Data Fetching & Services](#data-fetching--services)
11. [Environment Variables](#environment-variables)
12. [Deployment Configuration](#deployment-configuration)
13. [Critical Implementation Notes](#critical-implementation-notes)
14. [Maintenance Guidelines](#maintenance-guidelines)

---

## 🎯 Project Overview

### What This Project Is

This is the **Server-Side Rendered (SSR)** version of the Wings Institute website, migrated from a Vite + React 19 Client-Side Rendered (CSR) application. The website is for Wings Institute, an aviation and hospitality training institute in Vadodara, India.

### Key Features

- **27+ Pages**: Course pages, AI tools, blog, admissions, placements, etc.
- **Multi-language Support**: English, Hindi, Gujarati
- **AI-Powered Tools**: Resume Builder, Interview Coach, PA Simulator, Career Navigator, Career Quest
- **Firebase Integration**: User authentication, data persistence
- **Google Generative AI (Gemini)**: AI-powered features (transcription, feedback)
- **Rich SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD schema
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode Support**: Theme switching with persistence

### Migration Status

✅ **100% Complete**: All pages migrated with visual and functional parity  
✅ **SEO Verified**: All meta tags, schemas, and sitemaps verified  
✅ **Performance Optimized**: Image optimization, lazy loading, code splitting

---

## 🛠 Technical Stack

### Core Framework

- **Next.js**: `16.1.1` (App Router with React Server Components)
- **React**: `19.2.3`
- **TypeScript**: `^5`
- **Node.js**: `>=18.0.0` (specified in `package.json` engines)

### Styling

- **Tailwind CSS**: `^3.4.17` (build-time compilation, not CDN)
- **Custom CSS**: `globals.css` with custom animations, utilities, and theme variables
- **PostCSS**: `^8.5.6` with Autoprefixer

### Key Dependencies

```json
{
  "@google/genai": "^1.34.0",      // Google Gemini AI
  "firebase": "^12.7.0",           // Authentication & database
  "lucide-react": "^0.562.0",     // Icons
  "date-fns": "^4.1.0",            // Date formatting
  "axios": "^1.13.2"               // HTTP client
}
```

### Build Tools

- **Turbopack**: Next.js's fast bundler (enabled by default)
- **ESLint**: Code linting with Next.js config
- **TypeScript**: Strict mode enabled

---

## 📁 Project Structure

```
wings-ssr/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout (metadata, fonts, providers)
│   │   ├── globals.css          # Global styles, Tailwind imports
│   │   ├── not-found.tsx        # 404 page
│   │   ├── (main)/              # Route group: Main pages (with widgets)
│   │   │   ├── layout.tsx       # Layout: Header + Footer + Widgets
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── HomePageClient.tsx
│   │   │   ├── about/
│   │   │   ├── admissions/
│   │   │   ├── air-hostess-training/
│   │   │   ├── airport-management/
│   │   │   ├── blog/
│   │   │   ├── contact-us/
│   │   │   └── ... (all main pages)
│   │   ├── (no-widgets)/        # Route group: Pages without floating widgets
│   │   │   ├── layout.tsx       # Layout: Header + Footer (NO widgets)
│   │   │   ├── ai-tools/        # AI tools pages
│   │   │   └── jobs-at-wings/
│   │   ├── (fullscreen)/        # Route group: Fullscreen pages
│   │   │   ├── layout.tsx       # Layout: No Header/Footer
│   │   │   └── virtual-tour/
│   │   └── api/                 # API routes
│   │       ├── set-language/
│   │       └── set-theme/
│   ├── components/              # Shared React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── BatchCountdownBar.tsx
│   │   ├── WhatsAppWidget.tsx
│   │   ├── AitoolWidget.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── *SEOContent.tsx      # SEO content components
│   │   └── ... (60+ components)
│   ├── contexts/                # React contexts
│   │   └── LanguageContext.tsx  # i18n context
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAudioRecorder.ts
│   │   └── useHydrated.ts
│   ├── services/                # Business logic & API calls
│   │   ├── firebaseConfig.ts
│   │   ├── userService.ts
│   │   ├── geminiService.ts
│   │   ├── emailService.ts
│   │   └── messageService.ts
│   ├── locales/                 # Translation files
│   │   ├── en.ts
│   │   ├── hi.ts
│   │   ├── gu.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   └── markdownToHtml.ts
│   ├── lib/                     # Library code
│   │   ├── cookies.ts
│   │   ├── events.ts
│   │   └── routes.ts
│   └── data/                    # Static data
│       ├── cities.ts
│       └── MasterEventSchedule_2026.json
├── public/                      # Static assets
│   ├── images/                  # All images
│   ├── PA-audiofiles/          # Audio files
│   ├── robots.txt
│   ├── sitemap_*.xml           # SEO sitemaps
│   └── llm.txt
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🔑 Key Patterns & Conventions

### 1. Server vs Client Components

**Rule**: Default to Server Components, use `'use client'` only when needed.

**Use Server Components for:**
- Static content rendering
- Data fetching (Firebase, APIs)
- SEO metadata (`generateMetadata`)
- Initial page structure

**Use Client Components (`'use client'`) for:**
- Interactive features (buttons, forms, modals)
- Browser APIs (`window`, `document`, `localStorage`, `sessionStorage`)
- React hooks (`useState`, `useEffect`, `useContext`)
- Event handlers (`onClick`, `onChange`)
- Third-party libraries that require browser APIs

**Pattern:**
```typescript
// app/(main)/air-hostess-training/page.tsx (Server Component)
import { generateMetadata } from 'next';
import { AirHostessPageClient } from './AirHostessPageClient';

export async function generateMetadata() {
  return {
    title: 'Air Hostess Training | Wings Institute',
    // ... SEO metadata
  };
}

export default function Page() {
  return <AirHostessPageClient />;
}
```

```typescript
// app/(main)/air-hostess-training/AirHostessPageClient.tsx (Client Component)
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AirHostessPageClient() {
  const { t } = useLanguage();
  // ... interactive logic
}
```

### 2. Route Groups

Next.js route groups `(folder)` organize routes without affecting URLs:

- **`(main)`**: Pages with Header, Footer, and floating widgets (WhatsApp, AI widget, BatchCountdownBar)
- **`(no-widgets)`**: Pages with Header/Footer but NO floating widgets (AI tools, careers page)
- **`(fullscreen)`**: Fullscreen pages without Header/Footer (virtual tour)

**URL Structure:**
- `(main)/about/page.tsx` → `/about`
- `(no-widgets)/ai-tools/resume-builder/page.tsx` → `/ai-tools/resume-builder`
- `(fullscreen)/virtual-tour/page.tsx` → `/virtual-tour`

### 3. Page Structure Pattern

Every page follows this pattern:

```
app/(route-group)/page-name/
├── page.tsx              # Server Component: Metadata + Client wrapper
└── *PageClient.tsx       # Client Component: Interactive UI
```

**Example:**
```typescript
// page.tsx
export async function generateMetadata() {
  return { title: '...', canonical: 'https://wingsinstitute.com/...' };
}

export default function Page() {
  return <AirHostessPageClient />;
}
```

### 4. Naming Consistency

**CRITICAL**: Preserve ALL names from the original CSR codebase:

- ✅ Component names: `AdvantagePage`, `WhatsAppWidget`, `PowerModuleCard`
- ✅ CSS class names: `.glass-panel`, `.aurora-bg`, `.orb`
- ✅ Function names: `registerUser`, `sendEmailOtp`, `transcribeAudio`
- ✅ Type names: `PageType`, `WingsEvent`, `Language`
- ✅ Translation keys: `hero.badge`, `stat.trust`, `am.mod1_title`
- ✅ State variables: `isLoading`, `formData`, `currentPage`

**Only rename when required by Next.js conventions** (e.g., `App.tsx` → `layout.tsx`).

### 5. Image Optimization

**Always use `next/image` instead of `<img>`:**

```typescript
import Image from 'next/image';

// ✅ Correct
<Image
  src="/images/hero.jpg"
  alt="Description"
  width={1200}
  height={630}
  priority={true}  // For above-the-fold images
  fetchPriority="high"
  quality={90}
/>

// ❌ Wrong
<img src="/images/hero.jpg" alt="Description" />
```

**Image Configuration** (`next.config.ts`):
- Formats: AVIF, WebP
- Device sizes: `[640, 750, 828, 1080, 1200, 1920]`
- Image sizes: `[16, 32, 48, 64, 96, 128, 256]`
- Qualities: `[75, 90]`
- Remote patterns: `wingsinstitute.com`, `img.youtube.com`

### 6. Browser API Guards

**Always guard browser APIs in Client Components:**

```typescript
'use client';

import { useEffect, useState } from 'react';

export function MyComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>; // Or return null
  }

  // Now safe to use window, document, localStorage, etc.
  return <div>{window.location.href}</div>;
}
```

**Common patterns:**
- Google Maps iframes: Render only after mount
- `localStorage`/`sessionStorage`: Check `typeof window !== 'undefined'`
- `window.scrollTo`: Use in `useEffect` hooks

### 7. Scroll Behavior

**Global scroll management** via `ScrollToTop` component:

- **Forward navigation**: Scroll to top
- **Back navigation**: Restore previous scroll position (via `sessionStorage`)

Located in: `src/components/ScrollToTop.tsx`  
Integrated in: `src/components/Providers.tsx`

### 8. State Persistence

**Use `sessionStorage` for:**
- Expanded/collapsed state of SEO content sections
- Scroll position restoration
- Temporary UI state (not critical data)

**Use `localStorage` for:**
- Theme preference
- Language preference
- User preferences

**Pattern:**
```typescript
useEffect(() => {
  const saved = sessionStorage.getItem('key');
  if (saved) {
    setState(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  sessionStorage.setItem('key', JSON.stringify(state));
}, [state]);
```

---

## 🗺 Route Organization

### Main Routes (`(main)`)

All routes under `(main)` have Header, Footer, and floating widgets:

| Route | File Path | Description |
|-------|-----------|-------------|
| `/` | `(main)/page.tsx` | Homepage |
| `/about` | `(main)/about/page.tsx` | About page |
| `/admissions` | `(main)/admissions/page.tsx` | Admissions form |
| `/air-hostess-training` | `(main)/air-hostess-training/page.tsx` | Course page |
| `/airport-management` | `(main)/airport-management/page.tsx` | Course page |
| `/hotel-management` | `(main)/hotel-management/page.tsx` | Course page |
| `/culinary-cooking-course` | `(main)/culinary-cooking-course/page.tsx` | Course page |
| `/travel-tourism-management` | `(main)/travel-tourism-management/page.tsx` | Course page |
| `/placements` | `(main)/placements/page.tsx` | Placements page |
| `/blog` | `(main)/blog/page.tsx` | Blog listing |
| `/contact-us` | `(main)/contact-us/page.tsx` | Contact page |
| `/franchise` | `(main)/franchise/page.tsx` | Franchise page |
| `/scholarship-test` | `(main)/scholarship-test/page.tsx` | Scholarship page |
| `/salary-roi-calculator` | `(main)/salary-roi-calculator/page.tsx` | ROI calculator |
| `/transparency` | `(main)/transparency/page.tsx` | Transparency page |
| `/free-workshops-events` | `(main)/free-workshops-events/page.tsx` | Events page |
| `/privacy-policy` | `(main)/privacy-policy/page.tsx` | Privacy policy |
| `/login` | `(main)/login/page.tsx` | Login page |
| `/student-portal` | `(main)/student-portal/page.tsx` | Student portal |

### No-Widgets Routes (`(no-widgets)`)

Routes without floating widgets (for focused experiences):

| Route | File Path | Description |
|-------|-----------|-------------|
| `/ai-tools` | `(no-widgets)/ai-tools/page.tsx` | AI tools listing |
| `/ai-tools/resume-builder` | `(no-widgets)/ai-tools/resume-builder/page.tsx` | Resume Builder |
| `/ai-tools/interview-coach` | `(no-widgets)/ai-tools/interview-coach/page.tsx` | Interview Coach |
| `/ai-tools/pa-simulator` | `(no-widgets)/ai-tools/pa-simulator/page.tsx` | PA Simulator |
| `/ai-tools/career-navigator` | `(no-widgets)/ai-tools/career-navigator/page.tsx` | Career Navigator |
| `/ai-tools/career-quest` | `(no-widgets)/ai-tools/career-quest/page.tsx` | Career Quest |
| `/jobs-at-wings` | `(no-widgets)/jobs-at-wings/page.tsx` | Careers page |

### Fullscreen Routes (`(fullscreen)`)

Fullscreen experiences without Header/Footer:

| Route | File Path | Description |
|-------|-----------|-------------|
| `/virtual-tour` | `(fullscreen)/virtual-tour/page.tsx` | Virtual tour gallery |

### Redirects

Configured in `next.config.ts`:

```typescript
{
  source: '/air-hostess',
  destination: '/air-hostess-training',
  permanent: true,  // 301 redirect
}
```

All AI tool short URLs redirect to `/ai-tools/` paths:
- `/resume-builder` → `/ai-tools/resume-builder`
- `/interview-coach` → `/ai-tools/interview-coach`
- etc.

---

## 🧩 Component Architecture

### Layout Hierarchy

```
RootLayout (app/layout.tsx)
├── Providers (LanguageContext, ScrollToTop)
├── (main)/layout.tsx
│   ├── Header
│   ├── Breadcrumbs
│   ├── Main Content
│   ├── Footer
│   ├── BatchCountdownBar (floating)
│   ├── WhatsAppWidget (floating)
│   └── AitoolWidget (floating)
├── (no-widgets)/layout.tsx
│   ├── Header
│   ├── Breadcrumbs
│   ├── Main Content
│   └── Footer
└── (fullscreen)/layout.tsx
    └── Main Content (no Header/Footer)
```

### Component Categories

1. **Layout Components**: `Header`, `Footer`, `Breadcrumbs`
2. **Widget Components**: `WhatsAppWidget`, `AitoolWidget`, `BatchCountdownBar`
3. **Page Components**: `HomePageClient`, `AirHostessPageClient`, etc.
4. **SEO Components**: `*SEOContent.tsx` (expandable SEO content sections)
5. **Form Components**: `AdmissionsPageClient`, `StudentLogin`
6. **AI Tool Components**: `ResumeBuilderPageClient`, `InterviewCoachPageClient`, etc.
7. **Utility Components**: `LanguageToggle`, `ScrollToTop`, `FAQSection`

### Component Naming

- **Page Components**: `*PageClient.tsx` (e.g., `AirHostessPageClient.tsx`)
- **SEO Components**: `*SEOContent.tsx` (e.g., `AirHostessSEOContent.tsx`)
- **Shared Components**: PascalCase (e.g., `Header.tsx`, `Footer.tsx`)

---

## 🎨 Styling System

### Tailwind CSS Configuration

**File**: `tailwind.config.ts`

**Custom Theme:**
- Colors: `wings.red`, `wings.dark`, `wings.gray`
- Shadows: `glass`, `glass-hover`, `glow`, `inner-light`
- Animations: `blob`, `float`, `shimmer`, `fade-in-up`, `spin-slow`, `marquee`, `radar-spin`, `scanline`, `slide-down`

**Custom Utilities:**
- `.glass-panel`: Glassmorphism effect
- `.aurora-bg`: Background gradient with orbs
- `.orb`: Animated background orb
- `.bg-grid-pattern`: Grid pattern overlay

### Global Styles

**File**: `src/app/globals.css`

Contains:
- Tailwind imports (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Custom CSS variables (colors, fonts)
- Custom animations
- Utility classes
- Dark mode styles

### Font Configuration

**Fonts loaded in `app/layout.tsx`:**

- **Inter**: Primary font (English)
- **Noto Devanagari**: Hindi font
- **Noto Gujarati**: Gujarati font

Loaded via `next/font` for optimization.

### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-first approach**: Base styles for mobile, then `md:`, `lg:`, etc.

---

## 🌍 Internationalization (i18n)

### Language Support

- **English** (`en`): Default
- **Hindi** (`hi`): Devanagari script
- **Gujarati** (`gu`): Gujarati script

### Implementation

**Context**: `src/contexts/LanguageContext.tsx`

**Translation Files**: `src/locales/en.ts`, `hi.ts`, `gu.ts`

**Usage:**
```typescript
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t, language } = useLanguage();
  
  return <h1>{t('hero.title')}</h1>;
}
```

### Language Persistence

- Stored in cookies (`lang` cookie)
- Read server-side in `layout.tsx`
- Updated via API route: `/api/set-language`

### Translation Key Structure

```typescript
{
  "hero": {
    "title": "Welcome to Wings Institute",
    "subtitle": "Premier aviation training"
  },
  "am": {  // Airport Management
    "mod1_title": "Ground Staff",
    "mod1_desc": "..."
  }
}
```

**Naming convention**: `{page}.{section}_{item}` (e.g., `am.mod1_title`)

---

## 🔍 SEO Implementation

### Metadata Strategy

**Every page has `generateMetadata()`:**

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title | Wings Institute',
    description: 'Page description...',
    canonical: 'https://wingsinstitute.com/page-path',
    openGraph: {
      title: '...',
      description: '...',
      url: 'https://wingsinstitute.com/page-path',
      images: [{ url: '/images/og-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...',
    },
  };
}
```

### Structured Data (JSON-LD)

**Components**: `*SEOContent.tsx` files contain JSON-LD schemas:

- `Organization` schema
- `Course` schema
- `Article` schema (blog)
- `BreadcrumbList` schema
- `FAQPage` schema

**Example**: `src/components/AirHostessSEOContent.tsx`

### Sitemaps

**Location**: `public/sitemap_*.xml`

- `sitemap_index.xml`: Main sitemap index
- `sitemap-pages.xml`: Static pages
- `sitemap-courses.xml`: Course pages
- `sitemap-ai-tools.xml`: AI tool pages
- `sitemap-blog.xml`: Blog posts
- `sitemap-images.xml`: Image sitemap

**Note**: Sitemaps are static files (copied from original CSR site).

### Robots.txt

**Location**: `public/robots.txt`

Contains GEO-optimized rules for different search engines.

### Canonical URLs

**Base domain**: `https://wingsinstitute.com`

**Pattern**: Every page has a canonical URL:
```typescript
canonical: 'https://wingsinstitute.com/air-hostess-training'
```

**Configuration**: `metadataBase` in `app/layout.tsx`:
```typescript
metadataBase: new URL('https://wingsinstitute.com')
```

---

## 📡 Data Fetching & Services

### Firebase

**Configuration**: `src/services/firebaseConfig.ts`

**Services**:
- `userService.ts`: User registration, authentication
- `messageService.ts`: Contact form submissions

**Usage**:
```typescript
import { registerUser } from '@/services/userService';

// In Client Component
const handleSubmit = async () => {
  await registerUser(userData);
};
```

### Google Generative AI (Gemini)

**Service**: `src/services/geminiService.ts`

**Functions**:
- `transcribeAudio()`: Audio transcription
- `getFinalAIFeedback()`: Interview feedback
- `analyzePAAnnouncement()`: PA announcement analysis

**Environment Variable**: `NEXT_PUBLIC_GEMINI_API_KEY` (client-side access)

**Usage**:
```typescript
import { transcribeAudio } from '@/services/geminiService';

const transcript = await transcribeAudio(audioBlob);
```

### Email Service

**Service**: `src/services/emailService.ts`

**Functions**:
- `sendEmailOtp()`: Send OTP emails
- `sendContactEmail()`: Send contact form emails

---

## 🔐 Environment Variables

### Required Variables

Create `.env.local` file:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Server-side only (optional)
API_KEY=your_gemini_api_key  # For server-side Gemini calls
```

### Variable Naming

- **`NEXT_PUBLIC_*`**: Exposed to client-side (browser)
- **No prefix**: Server-side only (not accessible in browser)

**Important**: Client-side code must use `NEXT_PUBLIC_GEMINI_API_KEY`, not `API_KEY`.

---

## 🚀 Deployment Configuration

### Next.js Config

**File**: `next.config.ts`

**Key Settings**:
- Image optimization: AVIF, WebP formats
- Security headers: HSTS, CSP, X-Frame-Options, etc.
- Redirects: Legacy URL redirects (301)
- Cache headers: Static assets, sitemaps
- Trailing slash: Disabled (`trailingSlash: false`)

### Deployment Platforms

**Supported**:
1. **Vercel** (recommended): Zero-config deployment
2. **DigitalOcean App Platform**: Configured for 1GB RAM, 1 CPU
3. **Cloudflare Workers**: Edge deployment (see `cloudflare/` folder)

### Build Configuration

**Node.js**: `>=18.0.0`  
**npm**: `>=9.0.0`

**Build Command**: `npm run build`  
**Start Command**: `npm start`  
**Dev Command**: `npm run dev`

### Static Files

**Location**: `public/`

- Images: `public/images/`
- Audio: `public/PA-audiofiles/`
- Sitemaps: `public/sitemap_*.xml`
- Robots: `public/robots.txt`
- LLM.txt: `public/llm.txt`

---

## ⚠️ Critical Implementation Notes

### 1. SSR Compatibility

**Always check browser API usage:**

```typescript
// ❌ Wrong (will break SSR)
const width = window.innerWidth;

// ✅ Correct
const [width, setWidth] = useState(0);
useEffect(() => {
  setWidth(window.innerWidth);
}, []);
```

### 2. Image Loading

**Priority images** (above-the-fold):
```typescript
<Image
  src="/images/hero.jpg"
  priority={true}
  fetchPriority="high"
  quality={90}
/>
```

**Lazy images** (below-the-fold):
```typescript
<Image
  src="/images/gallery.jpg"
  loading="lazy"
  quality={75}
/>
```

### 3. Google Maps

**Must render client-side only:**

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return <div>Loading map...</div>;
}

return <iframe src="https://maps.google.com/..." />;
```

### 4. Modal/Overlay Z-Index

**Critical z-index values**:
- Header: `z-[60]`
- Mobile menu overlay: `z-[50]`
- Lightbox overlay: `z-[100]`
- Close button: `z-[101]`

### 5. Form Submissions

**Use Server Actions or API routes:**

```typescript
// Server Action (preferred)
async function submitForm(formData: FormData) {
  'use server';
  // Process form data
}

// Or API route: app/api/submit/route.ts
```

### 6. State Persistence

**Use `sessionStorage` for:**
- Expanded SEO content state
- Scroll position
- Temporary UI state

**Use `localStorage` for:**
- Theme preference
- Language preference

### 7. Translation Keys

**Always use translation keys, never hardcode text:**

```typescript
// ❌ Wrong
<h1>Welcome to Wings Institute</h1>

// ✅ Correct
<h1>{t('hero.title')}</h1>
```

### 8. Component Splitting

**Split large components:**
- Server Component: Metadata + structure
- Client Component: Interactive UI

**Pattern**: `page.tsx` (Server) → `*PageClient.tsx` (Client)

---

## 🔧 Maintenance Guidelines

### Adding a New Page

1. **Create route folder**: `app/(main)/new-page/`
2. **Create `page.tsx`**: Server Component with `generateMetadata()`
3. **Create `*PageClient.tsx`**: Client Component with `'use client'`
4. **Add translations**: Update `locales/en.ts`, `hi.ts`, `gu.ts`
5. **Add SEO content**: Create `*SEOContent.tsx` if needed
6. **Update sitemap**: Add to `public/sitemap-pages.xml`
7. **Test**: Verify SSR rendering, SEO, translations

### Modifying Existing Pages

1. **Preserve naming**: Keep component/function names from CSR version
2. **Maintain SSR**: Ensure no browser API usage in Server Components
3. **Update translations**: Add new keys to all 3 language files
4. **Test translations**: Verify all languages work
5. **Check SEO**: Verify metadata, canonical URLs, schemas

### Adding New Components

1. **Choose location**: `src/components/` for shared, page folder for page-specific
2. **Determine type**: Server Component (default) or Client Component (`'use client'`)
3. **Follow naming**: PascalCase, descriptive names
4. **Add TypeScript types**: Define props interface
5. **Document usage**: Add JSDoc comments

### Updating Styles

1. **Use Tailwind first**: Prefer utility classes
2. **Custom CSS**: Add to `globals.css` if needed
3. **Theme variables**: Update `tailwind.config.ts` for theme changes
4. **Responsive**: Test on mobile, tablet, desktop
5. **Dark mode**: Ensure dark mode styles work

### Debugging SSR Issues

1. **Check console**: Look for hydration mismatches
2. **Verify browser APIs**: Ensure guarded with `useEffect` or `isMounted`
3. **Check metadata**: Verify `generateMetadata()` returns correct data
4. **Test build**: Run `npm run build` to catch SSR errors
5. **Check logs**: Server-side errors appear in build logs

### Performance Optimization

1. **Image optimization**: Use `next/image`, set `priority` for above-fold
2. **Code splitting**: Lazy load heavy components
3. **Bundle size**: Check with `npm run build` output
4. **Lazy loading**: Use `dynamic()` for heavy components
5. **Cache headers**: Configure in `next.config.ts`

### SEO Maintenance

1. **Metadata**: Ensure every page has `generateMetadata()`
2. **Canonical URLs**: Always use `https://wingsinstitute.com/...`
3. **Structured data**: Verify JSON-LD schemas
4. **Sitemaps**: Update when adding/removing pages
5. **Robots.txt**: Keep updated for crawler rules

---

## 📚 Additional Resources

### Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **React Server Components**: https://react.dev/reference/rsc/server-components
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

### Project-Specific Docs

- **Migration Plan**: `../SSR_MIGRATION_PLAN.md`
- **Progress Tracker**: `../PROGRESS.md`
- **Visual Verification**: `../VISUAL_VERIFICATION.md`
- **SEO Verification**: `../SEO_VERIFICATION_REPORT.md`

### Key Files to Reference

- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind theme
- `src/app/layout.tsx`: Root layout, metadata base
- `src/contexts/LanguageContext.tsx`: i18n implementation
- `src/services/*.ts`: Service layer patterns

---

## ✅ Checklist for LLMs Editing This Project

Before making changes, ensure:

- [ ] Understand Server vs Client Component distinction
- [ ] Check if browser APIs are used (must be in Client Component)
- [ ] Verify image optimization (`next/image` with proper props)
- [ ] Update translations in all 3 language files
- [ ] Maintain naming consistency with CSR version
- [ ] Test SSR rendering (`npm run build`)
- [ ] Verify SEO metadata is present
- [ ] Check canonical URLs use `wingsinstitute.com`
- [ ] Ensure responsive design works
- [ ] Test dark mode compatibility
- [ ] Verify no hydration mismatches
- [ ] Update sitemaps if adding/removing pages

---

## 🎯 Summary

This SSR website is a **production-ready Next.js 15 application** with:

- ✅ **100% visual and functional parity** with the original CSR version
- ✅ **27+ pages** fully migrated and verified
- ✅ **Comprehensive SEO** implementation
- ✅ **Multi-language support** (English, Hindi, Gujarati)
- ✅ **AI-powered features** integrated
- ✅ **Performance optimized** (images, code splitting, lazy loading)
- ✅ **Fully responsive** and accessible

**Domain**: `wingsinstitute.com`  
**Framework**: Next.js 15 (App Router)  
**Status**: Production Ready

When editing this project, **maintain SSR compatibility**, **preserve naming conventions**, and **follow the patterns established** in the migration. Always test with `npm run build` to catch SSR issues before deployment.

---

**Last Updated**: January 2026  
**Maintained By**: Wings Institute Development Team
