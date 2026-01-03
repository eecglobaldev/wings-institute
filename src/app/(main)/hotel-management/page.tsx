import { Metadata } from 'next';
import { HotelManagementPageClient } from './HotelManagementPageClient';

export const metadata: Metadata = {
  title: 'Hotel Management Course Vadodara | Diploma in Hospitality | Wings',
  description: 'Comprehensive hotel management training: Front Office, F&B Service, Housekeeping & Kitchen. 6-month internship at 5-star hotels. Placement at Taj, Marriott, Oberoi.',
  alternates: {
    canonical: 'https://wingsinstitute.com/hotel-management',
  },
  openGraph: {
    title: 'Hotel Management Course Vadodara | Diploma in Hospitality | Wings',
    description: 'Comprehensive hotel management training with 6-month internship at 5-star hotels. Placement at Taj, Marriott, Oberoi.',
    url: 'https://wingsinstitute.com/hotel-management',
    type: 'website',
    images: [
      {
        url: '/images/airport-management/fine-dine-restaurant.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel management students at Wings Institute Vadodara fine dining restaurant',
      },
    ],
  },
};

export default function HotelManagementPage() {
  return <HotelManagementPageClient />;
}
