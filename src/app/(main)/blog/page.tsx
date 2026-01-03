import type { Metadata } from 'next';
import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Aviation & Hospitality Career Blog India 2026 | Air Hostess Salary Guide, Interview Tips | Wings Institute Vadodara Gujarat',
  description: 'Expert career guides: Air hostess salary India 2026 (₹35K-2L), cabin crew interview secrets, hotel management jobs, chef careers. Free advice from Wings Institute Vadodara - Gujarat\'s #1 aviation & hospitality training institute.',
  alternates: {
    canonical: 'https://wingsinstitute.com/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}

