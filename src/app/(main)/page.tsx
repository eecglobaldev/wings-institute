import { Metadata } from 'next';
import { cookies } from 'next/headers';
import HomePage from './HomePageClient';

// Server-side metadata for SEO
export const metadata: Metadata = {
  title: 'Wings Institute Vadodara | Air Hostess & Hotel Management Training Since 2008',
  description: "Gujarat's premier aviation & hospitality institute. Air Hostess, Cabin Crew, Hotel Management, Culinary Arts courses. Airbus A330 Mock Cabin. 100% placement assistance. Enroll now!",
  keywords: [
    'air hostess training Vadodara',
    'cabin crew course Gujarat',
    'hotel management Vadodara',
    'aviation training institute',
    'culinary arts course',
    'travel tourism management',
    'Wings Institute',
    'airport management',
    'hospitality training Gujarat'
  ],
  openGraph: {
    title: 'Wings Institute Vadodara | Air Hostess & Hotel Management Training Since 2008',
    description: "Gujarat's premier aviation & hospitality institute. Airbus A330 Mock Cabin. 100% placement assistance.",
    url: 'https://wingsinstitute.com',
    siteName: 'Wings Institute',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute - Aviation & Hospitality Training'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wings Institute Vadodara | Aviation & Hospitality Training',
    description: "Gujarat's premier aviation & hospitality institute since 2008.",
    images: ['/images/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://wingsinstitute.com',
  },
};

// JSON-LD Schema for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": "https://wingsinstitute.com/#organization",
  "name": "Wings Institute Air Hostess & Hotel Management",
  "alternateName": "Wings",
  "legalName": "Wings Institute Air Hostess & Hotel Management",
  "url": "https://wingsinstitute.com",
  "logo": "https://wingsinstitute.com/images/wings-logo.png",
  "image": "https://wingsinstitute.com/images/meal-service-training.jpg",
  "description": "Wings Institute offers premier aviation, hotel management and hospitality, cooking culinary training and travel and tourism in Vadodara, Gujarat, India. Since 2008, it empowers students with hands-on practice in mock and training facilities and dedicated job placement support.",
  "slogan": "We don't just teach courses; we build careers.",
  "foundingDate": "2008",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2nd floor, RG Square 14, Nutan Bharat Society, Alkapuri",
    "addressLocality": "Vadodara",
    "addressRegion": "Gujarat",
    "postalCode": "390007",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.3151688,
    "longitude": 73.1707874
  },
  "hasMap": "https://maps.app.goo.gl/6ipxRiyHntzMAris8",
  "telephone": "+91-8758754444",
  "email": "info@wingsinstitute.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "19:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "5000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.instagram.com/wingsinstitute",
    "https://www.facebook.com/wingsaviationtraining",
    "https://www.youtube.com/@wingsinstitute",
    "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training"
  ]
};

export default async function Page() {
  // Get initial language from cookies for SSR
  const cookieStore = await cookies();
  const initialLang = (cookieStore.get('lang')?.value as 'en' | 'hi' | 'gu') || 'en';

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <HomePage initialLang={initialLang} />
    </>
  );
}
