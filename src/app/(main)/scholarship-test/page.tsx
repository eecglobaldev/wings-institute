import type { Metadata } from 'next';
import { ScholarshipPageClient } from './ScholarshipPageClient';

export const metadata: Metadata = {
  title: 'Scholarship Test | Win Up to ₹50,000 Off | Wings Institute Vadodara',
  description: 'Take the Wings Scholarship Test and win up to ₹50,000 discount on course fees. 10 questions, instant results. Open to all 12th pass students. Attempt now!',
  alternates: {
    canonical: 'https://wingsinstitute.com/scholarship-test',
  },
};

export default function ScholarshipTestPage() {
  return <ScholarshipPageClient />;
}

