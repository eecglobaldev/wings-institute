/**
 * Translation Keys Type Definition
 * 
 * @file locales/types.ts
 * @description Type definitions for i18n translations
 */

/**
 * Supported languages in the application
 */
export type Language = 'en' | 'hi' | 'gu';

/**
 * Translation dictionary type
 * Maps string keys to string values
 */
export type TranslationDictionary = Record<string, string>;

/**
 * Complete translations object type
 * Contains all three language dictionaries
 */
export type Translations = {
  en: TranslationDictionary;
  hi: TranslationDictionary;
  gu: TranslationDictionary;
};
