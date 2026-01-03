import type { Metadata } from 'next';
import { PASimulatorPageClient } from './PASimulatorPageClient';

export const metadata: Metadata = {
  title: 'PA Announcement Simulator | Cabin Crew Training Tool | Wings',
  description: 'Practice in-flight announcements like a real cabin crew. AI evaluates your pronunciation, pace & clarity. Master pre-flight, safety & emergency PA scripts.',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools/pa-simulator',
  },
};

export default function PASimulatorPage() {
  return <PASimulatorPageClient />;
}

