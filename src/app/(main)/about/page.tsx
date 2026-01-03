import { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Wings Institute Vadodara | Aviation & Hospitality Training Since 2008',
  description: 'Discover Wings Institute\'s 17-year legacy in aviation & hospitality education. Meet our expert faculty, explore world-class facilities, and join 5000+ successful alumni.',
  alternates: {
    canonical: 'https://wingsinstitute.com/about',
  },
  openGraph: {
    title: 'About Wings Institute Vadodara | Aviation & Hospitality Training Since 2008',
    description: 'Discover Wings Institute\'s 17-year legacy in aviation & hospitality education.',
    url: 'https://wingsinstitute.com/about',
    type: 'website',
    images: [
      {
        url: '/images/about/wings-campus.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute Vadodara campus - aviation and hospitality training',
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
