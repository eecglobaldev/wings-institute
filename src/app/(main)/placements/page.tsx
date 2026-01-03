import { Metadata } from 'next';
import { PlacementsPageClient } from './PlacementsPageClient';

export const metadata: Metadata = {
  title: '100% Placement Assistance | Wings Institute | IndiGo, Emirates, Marriott',
  description: 'See where Wings graduates work: IndiGo, SpiceJet, Qatar Airways, Emirates, Taj, Marriott & more. 5000+ successful placements. View alumni testimonials & success stories.',
  alternates: {
    canonical: 'https://wingsinstitute.com/placements',
  },
  openGraph: {
    title: '100% Placement Assistance | Wings Institute | IndiGo, Emirates, Marriott',
    description: 'See where Wings graduates work: IndiGo, SpiceJet, Qatar Airways, Emirates, Taj, Marriott & more.',
    url: 'https://wingsinstitute.com/placements',
    type: 'website',
    images: [
      {
        url: '/images/placements/wings-placements.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute alumni working at major airlines and hotels',
      },
    ],
  },
};

export default function PlacementsPage() {
  return <PlacementsPageClient />;
}
