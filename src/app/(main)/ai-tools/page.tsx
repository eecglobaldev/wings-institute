import type { Metadata } from 'next';
import { AIPageClient } from './AIPageClient';

export const metadata: Metadata = {
  title: 'Free AI Career Tools for Aviation & Hospitality | Wings Institute',
  description: 'Access AI-powered tools: Interview Coach, PA Simulator, Resume Builder, Career Navigator & Career Quest. Prepare for airline interviews with cutting-edge technology.',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools',
  },
};

// SoftwareApplication Schema for AI Tools Collection
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings Institute AI Career Tools",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1000+",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "Free AI-powered career tools for aviation and hospitality professionals. Includes Interview Coach, PA Simulator, Resume Builder, Career Navigator, and Career Quest.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "url": "https://wingsinstitute.com"
  },
  "featureList": [
    "AI Interview Coach with real-time feedback",
    "PA Simulator for in-flight announcements",
    "ATS-Compliant Resume Builder",
    "Career Navigator for role matching",
    "Career Quest interactive game"
  ]
};

export default function AIToolsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      
      <AIPageClient />
    </>
  );
}

