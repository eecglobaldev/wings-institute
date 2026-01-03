'use client';

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { translations } from '@/locales';
import type { Language, TranslationDictionary } from '@/locales/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: Language;
}

/**
 * SSR-compatible Language Provider
 * Uses cookies for persistence and router.refresh() for server re-render
 */
export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const setLanguage = async (lang: Language) => {
    // Set cookie via API route
    await fetch('/api/set-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: lang }),
    });

    // Update body class for font changes
    document.body.classList.remove('lang-en', 'lang-hi', 'lang-gu');
    document.body.classList.add(`lang-${lang}`);

    startTransition(() => {
      router.refresh(); // Refresh to get new server-rendered content
    });
  };

  const t = (key: string): string => {
    const dict = translations[initialLanguage] as TranslationDictionary;
    const fallback = translations['en'] as TranslationDictionary;
    return dict[key] || fallback[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: initialLanguage,
        setLanguage,
        t,
        isPending,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;

