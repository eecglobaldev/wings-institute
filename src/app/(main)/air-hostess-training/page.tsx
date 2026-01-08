import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AirHostessPageClient from './AirHostessPageClient';

export const metadata: Metadata = {
  title: 'Air Hostess Training Course Vadodara | Cabin Crew | Wings Institute',
  description: "Become a cabin crew with Gujarat's top air hostess training. Airbus A330 mock cabin, safety drills, grooming & placement at IndiGo, Emirates, Qatar Airways. Enroll now!",
  keywords: [
    'air hostess training Vadodara',
    'cabin crew course Gujarat',
    'air hostess course fees',
    'flight attendant training India',
    'Wings Institute air hostess',
    'cabin crew training near me',
    'air hostess placement',
    'aviation training Vadodara'
  ],
  openGraph: {
    title: 'Air Hostess Training Course Vadodara | Cabin Crew | Wings Institute',
    description: "Become a cabin crew with Gujarat's top air hostess training. Airbus A330 mock cabin. 100% placement.",
    url: 'https://wingsinstitute.com/air-hostess-training',
    siteName: 'Wings Institute',
    images: [
      {
        url: '/images/og-air-hostess.jpg',
        width: 1200,
        height: 630,
        alt: 'Air Hostess Training at Wings Institute'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Air Hostess Training Course | Cabin Crew | Wings Institute',
    description: "Gujarat's top air hostess training with Airbus A330 mock cabin.",
    images: ['/images/og-air-hostess.jpg'],
  },
  alternates: {
    canonical: 'https://wingsinstitute.com/air-hostess-training',
  },
};

// JSON-LD Schema for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Air Hostess & Cabin Crew Training",
  "description": "Professional cabin crew training program with Airbus A330 mock aircraft, safety drills, grooming classes, and 100% placement assistance at major airlines.",
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
      "name": "I am from a Gujarati medium background. Can I join?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! 70% of our students come from vernacular backgrounds. Our specialized 'Spoken English' module starts from the basics and transforms you into a fluent speaker before you graduate."
      }
    },
    {
      "@type": "Question",
      "name": "What is the height requirement for Cabin Crew?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most domestic airlines, the minimum height requirement for females is 155 cm (approx 5'1\"). For international airlines like Emirates, it is 160 cm or an arm-reach of 212 cm while standing on tiptoes."
      }
    },
    {
      "@type": "Question",
      "name": "Do you guarantee a job?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No honest institute can 'guarantee' a job. We provide 100% Placement Assistance. We train you, build your resume, conduct mock interviews, and send you for unlimited interviews until you get placed."
      }
    }
  ]
};

export default async function Page() {
  const cookieStore = await cookies();
  const initialLang = (cookieStore.get('lang')?.value as 'en' | 'hi' | 'gu') || 'en';

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
      
      <AirHostessPageClient initialLang={initialLang} />
    </>
  );
}
