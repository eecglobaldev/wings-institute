import type { Metadata } from 'next';
import { StudentPortalPageClient } from './StudentPortalPageClient';

export const metadata: Metadata = {
  title: 'Student Portal | Wings Institute',
  description: 'Access your Wings Institute student portal for course materials, schedules, and resources. Practice with AI tools, view placements, and track your progress.',
  alternates: {
    canonical: 'https://wingsinstitute.com/student-portal',
  },
};

export default function StudentPortalPage() {
  return <StudentPortalPageClient />;
}

