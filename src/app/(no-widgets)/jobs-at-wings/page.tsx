import type { Metadata } from 'next';
import { CareersPageClient } from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Jobs at Wings Institute Vadodara | Teaching & Admin Careers',
  description: 'Join Wings Institute team! We\'re hiring: Aviation Trainer, Hospitality Faculty, English Teacher, Counsellor & Admin staff. Women-powered workplace. Apply now!',
  alternates: {
    canonical: 'https://wingsinstitute.com/jobs-at-wings',
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}

