import type { Metadata } from 'next';
import { AdmissionsPageClient } from './AdmissionsPageClient';

export const metadata: Metadata = {
  title: 'Admissions Open 2026 | Wings Institute Vadodara | Apply Online Now',
  description: 'Join Gujarat\'s top aviation & hospitality institute. Easy online admission process, flexible payment plans, scholarship available. Limited seats for January 2026 batch!',
  alternates: {
    canonical: 'https://wingsinstitute.com/admissions',
  },
};

export default function AdmissionsPage() {
  return <AdmissionsPageClient />;
}

