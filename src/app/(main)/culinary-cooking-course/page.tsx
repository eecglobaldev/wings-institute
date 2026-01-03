import { Metadata } from 'next';
import { CulinaryPageClient } from './CulinaryPageClient';

export const metadata: Metadata = {
  title: 'Culinary Arts Course Vadodara | Professional Chef Training | Wings',
  description: 'Become a professional chef with hands-on culinary training. Indian, Continental, Bakery & Confectionery. HACCP certified. Placement at 5-star hotels & restaurants.',
  alternates: {
    canonical: 'https://wingsinstitute.com/culinary-cooking-course',
  },
  openGraph: {
    title: 'Culinary Arts Course Vadodara | Professional Chef Training | Wings',
    description: 'Become a professional chef with hands-on culinary training. Indian, Continental, Bakery & Confectionery.',
    url: 'https://wingsinstitute.com/culinary-cooking-course',
    type: 'website',
    images: [
      {
        url: '/images/culinary-course/culinary-training.jpg',
        width: 1200,
        height: 630,
        alt: 'Culinary arts students at Wings Institute Vadodara professional kitchen',
      },
    ],
  },
};

export default function CulinaryPage() {
  return <CulinaryPageClient />;
}
