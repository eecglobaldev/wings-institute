import type { Metadata } from 'next';
import { CareerNavigatorPageClient } from './CareerNavigatorPageClient';

export const metadata: Metadata = {
  title: 'AI Career Navigator | Find Your Perfect Career Path | Wings',
  description: 'Confused between cabin crew, ground staff or hospitality? Take our AI-powered assessment to discover your ideal career path in aviation & hospitality industry.',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools/career-navigator',
  },
};

export default function CareerNavigatorPage() {
  return <CareerNavigatorPageClient />;
}

