import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Wings Institute Vadodara | Enquiry & Campus Visit Booking',
  description: 'Get in touch with Wings Institute Alkapuri, Vadodara. Book a free counselling session, schedule campus visit, or call +91-8758754444 for admission enquiries.',
  alternates: {
    canonical: 'https://wingsinstitute.com/contact-us',
  },
  openGraph: {
    title: 'Contact Wings Institute Vadodara | Enquiry & Campus Visit Booking',
    description: 'Get in touch with Wings Institute Alkapuri, Vadodara. Book a free counselling session, schedule campus visit.',
    url: 'https://wingsinstitute.com/contact-us',
    type: 'website',
    images: [
      {
        url: '/images/contact/wings-campus.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute Vadodara campus location in Alkapuri',
      },
    ],
  },
};

// ContactPage Schema
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Wings Institute Vadodara",
  "description": "Get in touch with Wings Institute Alkapuri, Vadodara. Book a free counselling session, schedule campus visit, or call for admission enquiries.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "image": "https://wingsinstitute.com/images/wings-logo.png",
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
    "telephone": "+91-8758754444",
    "email": "info@wingsinstitute.com",
    "url": "https://wingsinstitute.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    "priceRange": "$$"
  }
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      
      <ContactPageClient />
    </>
  );
}
