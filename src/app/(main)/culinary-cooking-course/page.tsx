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

// JSON-LD Schema for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Culinary Arts & Professional Chef Training",
  "description": "Professional chef training program covering Indian, Continental, Bakery & Confectionery cuisines. HACCP certified kitchen training with hands-on practice. 100% placement assistance at 5-star hotels & restaurants.",
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
    "category": "Culinary Training",
    "availability": "https://schema.org/InStock"
  }
};

export default function CulinaryPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      
      <CulinaryPageClient />
    </>
  );
}
