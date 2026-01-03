/**
 * Translations Index
 * 
 * @file locales/index.ts
 * @description Aggregates all translations and exports them
 */

import { en } from './en';
import { hi } from './hi';
import { gu } from './gu';
import type { Language, TranslationDictionary, Translations } from './types';

export type { Language, TranslationDictionary, Translations };

export const translations: Translations = {
  en,
  hi,
  gu,
};

export { en, hi, gu };
export default translations;
