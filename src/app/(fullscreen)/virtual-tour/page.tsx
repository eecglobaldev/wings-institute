import type { Metadata } from 'next';
import { VirtualTourPageClient } from './VirtualTourPageClient';

export const metadata: Metadata = {
  title: 'Virtual Campus Tour | Wings Institute Vadodara | 360° Experience',
  description: 'Explore Wings Institute campus virtually. See our Airbus A330 Mock Cabin, Commercial Kitchen, Fine-Dine Restaurant & classrooms. Book in-person visit today!',
  alternates: {
    canonical: 'https://wingsinstitute.com/virtual-tour',
  },
};

export default function VirtualTourPage() {
  return <VirtualTourPageClient />;
}

