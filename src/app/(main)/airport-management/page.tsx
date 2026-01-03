import { Metadata } from 'next';
import { AirportManagementPageClient } from './AirportManagementPageClient';

export const metadata: Metadata = {
  title: 'Airport Management Course Vadodara | Ground Staff Training | Wings',
  description: 'Become airport ground staff with Amadeus GDS training, AVSEC certification & DGR handling. Placement at Vadodara, Ahmedabad & Mumbai airports. Apply now!',
  alternates: {
    canonical: 'https://wingsinstitute.com/airport-management',
  },
  openGraph: {
    title: 'Airport Management Course Vadodara | Ground Staff Training | Wings',
    description: 'Become airport ground staff with Amadeus GDS training, AVSEC certification & DGR handling. Placement at Vadodara, Ahmedabad & Mumbai airports.',
    url: 'https://wingsinstitute.com/airport-management',
    type: 'website',
    images: [
      {
        url: '/images/airport-management/airport-ground-staff.png',
        width: 1200,
        height: 630,
        alt: 'Airport management students learning GDS ticketing at Wings Institute Vadodara',
      },
    ],
  },
};

export default function AirportManagementPage() {
  return <AirportManagementPageClient />;
}
