'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { Language } from '@/types';

interface ProvidersProps {
  children: ReactNode;
  language: Language;
}

/**
 * Client-side providers wrapper
 * Contains all context providers for the application
 */
export function Providers({ children, language }: ProvidersProps) {
  return (
    <LanguageProvider initialLanguage={language}>
      {children}
    </LanguageProvider>
  );
}

export default Providers;

