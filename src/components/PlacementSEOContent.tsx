'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';

const verifiedAlumni = [
  {
    name: "Aanal Desai",
    role: "Cabin Crew",
    company: "Qatar Airways",
    companyType: "International Airline",
    location: "Doha, Qatar",
    year: "2024",
    salaryRange: "₹1.5L - ₹2.5L/month",
    highlight: true
  },
  {
    name: "Mohd. Fahad Diwan",
    role: "Ground Staff",
    company: "IndiGo Airlines",
    companyType: "Domestic Airline",
    location: "Ahmedabad",
    year: "2024",
    salaryRange: "₹25,000 - ₹35,000/month",
    highlight: true
  },
  {
    name: "Rummana Salat",
    role: "Ground Staff",
    company: "Singapore Airlines / Air Arabia",
    companyType: "International Airline",
    location: "Ahmedabad",
    year: "2020",
    salaryRange: "₹25,000 - ₹35,000/month",
    highlight: true
  },
  {
    name: "Ronak Makwana",
    role: "Ground Staff",
    company: "Vistara",
    companyType: "Domestic Airline",
    location: "Ahmedabad",
    year: "2024",
    salaryRange: "₹28,000 - ₹40,000/month",
    highlight: false
  },
  {
    name: "Mansi Bhatt",
    role: "Customs Cargo Executive",
    company: "Customs Cargo - Vadodara Airport",
    companyType: "Airport Operations",
    location: "Vadodara",
    year: "2024",
    salaryRange: "₹22,000 - ₹30,000/month",
    highlight: true
  },
  {
    name: "Ayushi Patel",
    role: "Guest Relations Associate",
    company: "St. Regis Hotel",
    companyType: "5-Star Hospitality",
    location: "Doha, Qatar",
    year: "2022",
    salaryRange: "₹80,000 - ₹1.2L/month",
    highlight: true
  },
  {
    name: "Akash Pitroda",
    role: "Ground Staff",
    company: "Etihad Airways",
    companyType: "International Airline",
    location: "Ahmedabad",
    year: "2025",
    salaryRange: "₹25,000 - ₹35,000/month",
    highlight: false
  },
  {
    name: "Pushkar Taylor",
    role: "Cruise Staff",
    company: "Marella Voyager (British Cruise Line)",
    companyType: "International Cruise",
    location: "International Waters",
    year: "2023",
    salaryRange: "₹90,000 - ₹1.5L/month",
    highlight: false
  },
  {
    name: "Shahid Malek",
    role: "Airport Lounge GSO",
    company: "Bengaluru International Airport",
    companyType: "Airport Hospitality",
    location: "Bengaluru",
    year: "2023",
    salaryRange: "₹25,000 - ₹35,000/month",
    highlight: false
  },
  {
    name: "Heer Dabhi",
    role: "Ground Staff",
    company: "Air Arabia",
    companyType: "International Airline",
    location: "Ahmedabad",
    year: "2024",
    salaryRange: "₹25,000 - ₹35,000/month",
    highlight: false
  },
  {
    name: "Maaz Shaikh",
    role: "Sous Chef",
    company: "Hell's Kitchen Dubai",
    companyType: "Premium Restaurant",
    location: "Dubai, UAE",
    year: "2023",
    salaryRange: "₹1L - ₹1.8L/month",
    highlight: true
  },
  {
    name: "Nandini Singh",
    role: "Cabin Crew",
    company: "Air India",
    companyType: "National Carrier",
    location: "Delhi",
    year: "2023",
    salaryRange: "₹45,000 - ₹65,000/month",
    highlight: false
  }
];

const placementFaqData = [
  {
    question: "What is the actual placement rate at Wings Institute Vadodara?",
    answer: "Wings Institute maintains a 98% placement assistance success rate. Since 2008, we have placed over 2,000 students in airlines, airports, hotels, and cruise lines."
  },
  {
    question: "Which airlines and hotels recruit from Wings Institute?",
    answer: "Our active recruiting partners include: Airlines - IndiGo, Air India, Vistara, SpiceJet, Air Arabia, Qatar Airways, Emirates, Singapore Airlines. Hotels - Taj Hotels, Marriott, Hyatt, ITC Hotels."
  },
  {
    question: "What is the starting salary for Wings graduates?",
    answer: "Domestic airlines offer ₹35,000 - ₹50,000/month for cabin crew. International airlines offer ₹1.5L - ₹3L/month tax-free with accommodation."
  },
  {
    question: "How long does it take to get placed after completing the course?",
    answer: "On average, 70% of our students receive offer letters within 60 days of course completion. Many students are placed even before graduation."
  }
];

const generateEducationalOrgWithAlumniSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "alternateName": "Wings",
    "url": "https://wingsinstitute.com",
    "logo": "https://wingsinstitute.com/images/wings-logo-red.png",
    "description": "Gujarat's premier aviation and hospitality training institute since 2008.",
    "foundingDate": "2008",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd floor, RG Square 14, Nutan Bharat Society, Alkapuri",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390007",
      "addressCountry": "IN"
    },
    "alumni": verifiedAlumni.filter(a => a.highlight).map(alumnus => ({
      "@type": "Person",
      "name": alumnus.name,
      "jobTitle": alumnus.role,
      "worksFor": {
        "@type": "Organization",
        "name": alumnus.company
      }
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "450",
      "bestRating": "5"
    }
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": placementFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export function PlacementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const orgScriptId = 'placement-org-schema';
    const existingOrgScript = document.getElementById(orgScriptId);
    if (existingOrgScript) existingOrgScript.remove();

    const orgScript = document.createElement('script');
    orgScript.id = orgScriptId;
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(generateEducationalOrgWithAlumniSchema());
    document.head.appendChild(orgScript);

    const faqScriptId = 'placement-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const scriptsToRemove = [orgScriptId, faqScriptId];
      scriptsToRemove.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
          aria-controls="placement-seo-content"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Icons.Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                Verified Placement Records & ROI Analysis
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Real Names. Real Companies. Real Salaries.
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </button>

        <div
          id="placement-seo-content"
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: isExpanded ? 'visible' : 'auto' }}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed">

            <h2 id="verified-placements">Verified Placements in Top Airlines & Hotels</h2>
            
            <p>
              At <strong>Wings Institute Vadodara</strong>, we provide evidence. Every placement listed below is <strong>verified</strong> with documented offer letters and LinkedIn profiles.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30 my-8 not-prose">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Icons.ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">The Wings Verification Promise</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    Every placement claim on this page can be independently verified. Visit our campus in Alkapuri, Vadodara to see original offer letters.
                  </p>
                </div>
              </div>
            </div>

            <h3>Hall of Fame: Featured Alumni Placements</h3>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <caption className="text-left text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">
                  Wings Institute Verified Placements 2023-2025
                </caption>
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Student Name</th>
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Company</th>
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Role</th>
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  {verifiedAlumni.map((alumnus, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${alumnus.highlight ? 'bg-blue-50 dark:bg-blue-950/20' : idx % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900/50'}`}>
                      <td className="px-4 py-3">
                        <strong className="text-zinc-900 dark:text-white">{alumnus.name}</strong>
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-blue-600 dark:text-blue-400">{alumnus.company}</strong>
                      </td>
                      <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{alumnus.role}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{alumnus.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="roi-analysis">Return on Investment Analysis</h2>

            <p>
              The question every Gujarati family asks: <strong>&quot;Is the investment worth it?&quot;</strong> Let&apos;s answer with data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">12-18</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Months to ROI</div>
                <div className="text-xs text-zinc-500 mt-1">Course fees recovered</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-emerald-600 mb-2">₹50L+</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">10-Year Earnings</div>
                <div className="text-xs text-zinc-500 mt-1">International airline career</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-purple-600 mb-2">100+</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Countries Visited</div>
                <div className="text-xs text-zinc-500 mt-1">Free travel benefit</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Hall of Fame?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                The next success story could be yours. Join 2,000+ alumni who transformed their careers through Wings Institute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/admissions"
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Start Your Application <Icons.ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="tel:+918758754444" 
                  className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-400 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-4 h-4" /> +91-8758754444
                </a>
              </div>
            </div>

          </div>
        </div>

        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>Verified Placements at Wings Institute Vadodara</h2>
            <p>Wings Institute has placed students at Qatar Airways, IndiGo Airlines, Singapore Airlines, Air Arabia, Taj Hotels, Marriott, and 100+ global brands since 2008.</p>
            <p>Contact: +91-8758754444 | Visit: Alkapuri, Vadodara</p>
          </div>
        </noscript>
      </div>
    </section>
  );
}

export default PlacementSEOContent;

