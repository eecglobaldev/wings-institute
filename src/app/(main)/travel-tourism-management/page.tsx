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

// JSON-LD Schema for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Travel & Tourism Management",
  "description": "Master Amadeus & Galileo GDS systems, visa processing, tour packaging & itinerary planning. Start your own travel agency or work with leading travel companies like MakeMyTrip, SOTC, and Thomas Cook. 100% placement assistance.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "url": "https://wingsinstitute.com"
  },
  "educationalLevel": "Diploma",
  "timeRequired": "P12M",
  "courseMode": "Full-time",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Full-time",
    "instructor": {
      "@type": "Person",
      "name": "Wings Institute Faculty"
    }
  },
  "offers": {
    "@type": "Offer",
    "category": "Travel & Tourism Training",
    "availability": "https://schema.org/InStock"
  }
};

export default function TravelTourismPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      
      <TravelTourismPageClient />
    </>
  );
}
