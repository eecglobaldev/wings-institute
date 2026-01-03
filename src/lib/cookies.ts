'use server';

import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'hi' | 'gu';

/**
 * Get the current theme from cookies
 */
export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  return (theme === 'dark' ? 'dark' : 'light') as Theme;
}

/**
 * Get the current language from cookies
 */
export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value;
  if (lang === 'hi' || lang === 'gu') {
    return lang;
  }
  return 'en';
}

/**
 * Set the theme in cookies (Server Action)
 */
export async function setTheme(theme: Theme): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('theme', theme, {
    maxAge: 31536000, // 1 year
    path: '/',
    sameSite: 'lax',
  });
}

/**
 * Set the language in cookies (Server Action)
 */
export async function setLanguage(lang: Language): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('lang', lang, {
    maxAge: 31536000, // 1 year
    path: '/',
    sameSite: 'lax',
  });
}

