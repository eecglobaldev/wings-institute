
import React from 'react';

export type PageType = 'advantage' | 'about' | 'contact' | 'ai-tools' | 'air-hostess' | 'airport-mgmt' | 'hotel-mgmt' | 'culinary' | 'travel-tourism' | 'admissions' | 'blog' | 'placements' | 'privacy' | 'career-quest' | 'franchise' | 'interview-coach' | 'scholarship' | 'roi-calculator' | 'pa-simulator' | 'career-navigator' | 'resume-builder' | 'careers' | 'virtual-tour' | 'transparency' | 'events';

// Event type for the events page
export interface WingsEvent {
  id: string;
  status: 'published' | 'draft' | 'cancelled';
  date: string; // ISO date string
  time: string; // HH:mm:ss
  duration_min: number;
  title: string;
  titleHi: string;
  titleGu: string;
  category: 'aviation' | 'hospitality' | 'culinary' | 'career' | 'grooming';
  location: string;
  locationHi: string;
  locationGu: string;
  capacity: number;
  registered_count: number;
  description: string;
  descriptionHi: string;
  descriptionGu: string;
  learning_outcomes: string[];
  learning_outcomesHi: string[];
  learning_outcomesGu: string[];
  image_url: string;
  tags: string[];
}

// Fix: Exporting Language type to resolve missing member error in LanguageContext.tsx
export type Language = 'en' | 'hi' | 'gu';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gridArea?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  features: string[];
  gradient: string;
}

export interface Stat {
  label: string;
  value: string;
  subtext: string;
}
