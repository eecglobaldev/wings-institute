import { Metadata } from 'next';
import { TransparencyPageClient } from './TransparencyPageClient';

export const metadata: Metadata = {
  title: 'Our Promise | Transparency & Trust | Wings Institute Vadodara',
  description: 'Wings Institute commitment to transparency: verified placements, honest fee structure, real student testimonials. No false promises. See our trust guarantees.',
  alternates: {
    canonical: 'https://wingsinstitute.com/transparency',
  },
};

export default function TransparencyPage() {
  return <TransparencyPageClient />;
}
