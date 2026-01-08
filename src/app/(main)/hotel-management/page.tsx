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

// JSON-LD Schema for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Hotel Management & Hospitality Training",
  "description": "Comprehensive hotel management training covering Front Office, F&B Service, Housekeeping & Kitchen operations. Includes 6-month paid internship at 5-star hotels like Taj, Marriott, and Oberoi. 100% placement assistance.",
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
    "category": "Hospitality Training",
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
      "name": "Is cooking compulsory in Hotel Management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No! Hotel Management has four major departments: Front Office, Housekeeping, F&B Service, and Kitchen. You can choose to specialize in Front Office or Management if you don't like cooking."
      }
    },
    {
      "@type": "Question",
      "name": "Do we get paid during the internship?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! All our students undergo a 6-month industrial training in 5-star hotels like Taj, Oberoi, and Marriott, where they typically earn a monthly stipend ranging from ₹1500 to ₹5000 depending on the property."
      }
    },
    {
      "@type": "Question",
      "name": "Can I work on Cruise Ships after this course?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Hotel Management graduates are highly sought after by Cruise Liners. However, most cruise companies require 1-2 years of onshore 5-star hotel experience before hiring."
      }
    }
  ]
};

export default function HotelManagementPage() {
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
      
      <HotelManagementPageClient />
    </>
  );
}
