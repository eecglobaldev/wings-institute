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

// JSON-LD Schema for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Airport Management & Ground Staff Training",
  "description": "Professional airport ground staff training program with Amadeus GDS training, AVSEC certification, DGR handling, and 100% placement assistance at Vadodara, Ahmedabad & Mumbai airports.",
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
    "category": "Aviation Training",
    "availability": "https://schema.org/InStock"
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between Ground Staff and Cabin Crew?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cabin Crew work inside the aircraft (in the air). Ground Staff work at the airport terminal (on the ground) handling Check-in, Boarding, Ramp, and Security. Ground Staff careers offer great stability and growth without the extensive travel."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be 12th pass to join?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the minimum qualification for Airport Ground Staff jobs is 12th pass. However, Graduates often get faster promotions to Duty Manager roles."
      }
    },
    {
      "@type": "Question",
      "name": "Will I get a job at my home city airport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most likely, yes. Since every city has an airport, ground staff jobs are available locally, unlike cabin crew who are based in major hubs like Delhi, Mumbai, or Bangalore."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a height requirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Unlike Cabin Crew, there are no strict height requirements for Ground Staff roles. Your communication skills and grooming matter more."
      }
    }
  ]
};

export default function AirportManagementPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <AirportManagementPageClient />
    </>
  );
}
