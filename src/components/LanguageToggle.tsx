'use client';

/**
 * WINGS INSTITUTE - LANGUAGE TOGGLE (SSR Version)
 * 3-way toggle switch for English, Hindi, Gujarati
 * Uses cookies for server-side persistence
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types';

const LANGUAGES: { code: Language; label: string; native: string; name: string }[] = [
  { code: 'en', label: 'EN', native: 'A' , name: 'English'},
  { code: 'hi', label: 'HI', native: 'अ' , name: 'हिंदी'},
  { code: 'gu', label: 'GU', native: 'અ' , name: 'ગુજરાતી'},
];

interface LanguageToggleProps {
  isHomepage?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ isHomepage = false }) => {
  const { language, setLanguage } = useLanguage();

  const currentIndex = LANGUAGES.findIndex(l => l.code === language);

  return (
    <>
      {isHomepage && (
        <div className="relative flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 border border-zinc-200 dark:border-zinc-700">
          {/* Language buttons */}
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`relative z-10 w-auto px-4 h-8 flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                language === lang.code
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
              aria-label={`Switch to ${lang.label}`}
              title={lang.code === 'en' ? 'English' : lang.code === 'hi' ? 'हिंदी' : 'ગુજરાતી'}
            >
              <span className={language === lang.code ? 'scale-110 bg-white dark:bg-zinc-900 rounded-full p-1 px-2' : ''}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}
      
      {!isHomepage && (
        <div className="relative flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 border border-zinc-200 dark:border-zinc-700">
          {/* Sliding indicator */}
          <div
            className="absolute h-8 w-10 bg-white dark:bg-zinc-900 rounded-full shadow-md transition-all duration-300 ease-out border border-zinc-200 dark:border-zinc-600"
            style={{ left: `${4 + currentIndex * 40}px` }}
          />
          
          {/* Language buttons */}
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`relative z-10 w-10 h-8 flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                language === lang.code
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
              aria-label={`Switch to ${lang.label}`}
              title={lang.code === 'en' ? 'English' : lang.code === 'hi' ? 'हिंदी' : 'ગુજરાતી'}
            >
              <span className={language === lang.code ? 'scale-110' : ''}>
                {lang.native}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageToggle;
