import { Metadata } from 'next';
import { TravelTourismPageClient } from './TravelTourismPageClient';

export const metadata: Metadata = {
  title: 'Travel & Tourism Course Vadodara | GDS Ticketing Training | Wings',
  description: 'Master Amadeus & Galileo GDS, visa processing, tour packaging & itinerary planning. Start your own travel agency or work with MakeMyTrip, SOTC, Thomas Cook.',
  alternates: {
    canonical: 'https://wingsinstitute.com/travel-tourism-management',
  },
  openGraph: {
    title: 'Travel & Tourism Course Vadodara | GDS Ticketing Training | Wings',
    description: 'Master Amadeus & Galileo GDS, visa processing, tour packaging & itinerary planning.',
    url: 'https://wingsinstitute.com/travel-tourism-management',
    type: 'website',
    images: [
      {
        url: '/images/travel-tourism/travel-tourism-training.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel & tourism students learning GDS at Wings Institute Vadodara',
      },
    ],
  },
};

export default function TravelTourismPage() {
  return <TravelTourismPageClient />;
}
