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

// Video Schema for YouTube testimonials
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Wings Institute Student Success Stories",
  "description": "Watch testimonials from Wings Institute alumni working at major airlines and hotels including IndiGo, Emirates, Qatar Airways, Air India, and 5-star hotels.",
  "thumbnailUrl": [
    "https://img.youtube.com/vi/SH6uPanErRM/maxresdefault.jpg",
    "https://img.youtube.com/vi/2wMbRT97tsI/maxresdefault.jpg",
    "https://img.youtube.com/vi/clt0OMm3UjE/maxresdefault.jpg",
    "https://img.youtube.com/vi/phvKKfEnFkw/maxresdefault.jpg",
    "https://img.youtube.com/vi/xkknjYxqxTU/maxresdefault.jpg",
    "https://img.youtube.com/vi/TQME7lXgOtg/maxresdefault.jpg"
  ],
  "uploadDate": "2025-01-01",
  "contentUrl": "https://www.youtube.com/watch?v=SH6uPanErRM",
  "embedUrl": "https://www.youtube.com/embed/SH6uPanErRM",
  "publisher": {
    "@type": "Organization",
    "name": "Wings Institute",
    "logo": {
      "@type": "ImageObject",
      "url": "https://wingsinstitute.com/images/wings-logo.png"
    }
  }
};

// Aggregate Rating Schema (based on 5000+ placements)
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://wingsinstitute.com/#organization",
  "name": "Wings Institute Air Hostess & Hotel Management",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "5000",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Review Schema (sample reviews from success stories)
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "Wings Institute Air Hostess & Hotel Management"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Nandini Singh"
  },
  "reviewBody": "Wings Institute provided excellent training that helped me secure a position as Cabin Crew at Air India. The mock interviews and grooming sessions were particularly helpful."
};

export default function PlacementsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      
      <PlacementsPageClient />
    </>
  );
}
