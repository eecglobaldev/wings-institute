import type { Metadata } from 'next';
import { AdmissionsPageClient } from './AdmissionsPageClient';

export const metadata: Metadata = {
  title: 'Admissions Open 2026 | Wings Institute Vadodara | Apply Online Now',
  description: 'Join Gujarat\'s top aviation & hospitality institute. Easy online admission process, flexible payment plans, scholarship available. Limited seats for January 2026 batch!',
  alternates: {
    canonical: 'https://wingsinstitute.com/admissions',
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I pay the fees in installments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer flexible monthly EMI options at 0% interest. We believe financial constraints should never stop talent from flying."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an entrance exam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We conduct a basic profile screening and a personal interview to understand your communication level and passion. There is no complex written exam."
      }
    },
    {
      "@type": "Question",
      "name": "When does the new batch start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start new batches every month. You can contact our admission counselor to book your seat in the upcoming batch."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer scholarships?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, meritorious students can apply for the 'Wings Merit Scholarship' which offers up to ₹10,000 fee waiver. You can take the online scholarship test on our website."
      }
    }
  ]
};

export default function AdmissionsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <AdmissionsPageClient />
    </>
  );
}

