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

// AboutPage Schema
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Wings Institute Vadodara",
  "description": "Discover Wings Institute's 17-year legacy in aviation & hospitality education. Meet our expert faculty, explore world-class facilities, and join 5000+ successful alumni.",
  "mainEntity": {
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "foundingDate": "2008",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "50+"
    },
    "alumni": {
      "@type": "Person",
      "name": "5000+ Alumni"
    }
  }
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      
      <AboutPageClient />
    </>
  );
}
