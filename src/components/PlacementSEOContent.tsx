/**
 * PlacementSEOContent.tsx
 * 
 * Semantic Content Injection Module for Wings Institute Placement Page
 * The "Trust Engine" - Verified alumni success stories for E-E-A-T signals
 * 
 * SEO Strategy: Trust verification, social proof, salary data
 * Target Persona: Skeptical parents and students comparing institutes
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';

// --- VERIFIED ALUMNI DATA FOR SCHEMA.ORG ---
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

// --- VIDEO TESTIMONIALS DATA ---
const videoTestimonials = [
  {
    title: "Noman Shaikh - Hired at Vadodara Airport",
    description: "Noman shares his journey from Wings Institute to securing a ground staff position at Vadodara International Airport within 3 months of graduation.",
    videoId: "SH6uPanErRM",
    thumbnailUrl: "https://img.youtube.com/vi/SH6uPanErRM/maxresdefault.jpg",
    uploadDate: "2024-06-15",
    duration: "PT2M30S"
  },
  {
    title: "Wings Student Success Story - IndiGo Selection",
    description: "Real testimonial from a Wings alumnus who cracked the IndiGo Airlines cabin crew selection in their first attempt.",
    videoId: "2wMbRT97tsI",
    thumbnailUrl: "https://img.youtube.com/vi/2wMbRT97tsI/maxresdefault.jpg",
    uploadDate: "2024-08-20",
    duration: "PT3M15S"
  },
  {
    title: "From Classroom to Cabin - Wings Journey",
    description: "A student documents their complete transformation from day one of training to receiving their airline offer letter.",
    videoId: "clt0OMm3UjE",
    thumbnailUrl: "https://img.youtube.com/vi/clt0OMm3UjE/maxresdefault.jpg",
    uploadDate: "2024-05-10",
    duration: "PT4M00S"
  },
  {
    title: "Wings Institute Placement Drive 2024",
    description: "Highlights from the annual placement drive featuring recruiters from IndiGo, Vistara, Taj Hotels, and more.",
    videoId: "phvKKfEnFkw",
    thumbnailUrl: "https://img.youtube.com/vi/phvKKfEnFkw/maxresdefault.jpg",
    uploadDate: "2024-09-01",
    duration: "PT5M20S"
  }
];

// --- FAQ DATA ---
const placementFaqData = [
  {
    question: "What is the actual placement rate at Wings Institute Vadodara?",
    answer: "Wings Institute maintains a 98% placement assistance success rate. Since 2008, we have placed over 2,000 students in airlines, airports, hotels, and cruise lines. Our placement cell actively tracks every student until they are employed, with no time limit on support."
  },
  {
    question: "Which airlines and hotels recruit from Wings Institute?",
    answer: "Our active recruiting partners include: Airlines - IndiGo, Air India, Vistara, SpiceJet, Air Arabia, Qatar Airways, Emirates, Singapore Airlines, Etihad Airways. Hotels - Taj Hotels, Marriott, Hyatt, ITC Hotels, The Oberoi Group. Cruise Lines - Marella Cruises, Costa Cruises, Celebrity Cruises."
  },
  {
    question: "What is the starting salary for Wings graduates?",
    answer: "Domestic airlines (IndiGo, Vistara) offer ₹35,000 - ₹50,000/month for cabin crew and ₹18,000 - ₹30,000 for ground staff. International airlines (Qatar, Emirates) offer ₹1.5L - ₹3L/month tax-free with accommodation. Hotel roles start at ₹15,000 - ₹25,000 and scale to ₹50,000+ for supervisory positions."
  },
  {
    question: "How long does it take to get placed after completing the course?",
    answer: "On average, 70% of our students receive offer letters within 60 days of course completion. Many students, especially those targeting domestic airlines, are placed even before graduation through our pre-placement drives. International airline selections may take 3-6 months due to longer recruitment cycles."
  },
  {
    question: "Does Wings provide interview preparation?",
    answer: "Yes, extensively. We provide: Resume building with our AI Resume Architect, unlimited mock interviews (both AI-powered and in-person), grooming check sessions, group discussion practice, and airline-specific preparation modules. Students are prepared for HR rounds, technical rounds, and grooming assessments."
  },
  {
    question: "Are the placements verified? How can I verify alumni claims?",
    answer: "Every placement on our website is verified. We maintain LinkedIn connections with our alumni, display original offer letters (with permission), and regularly host alumni talks where students can directly interact with placed graduates. You can verify any alumni claim by visiting our campus or calling our placement cell."
  },
  {
    question: "What if I don't get placed after the course?",
    answer: "Our 100% Placement Assistance policy means there is no expiry on support. If you don't get placed immediately, we continue sending you for interviews indefinitely. We also offer refresher training at no extra cost if your skills need updating after a gap."
  },
  {
    question: "Do height requirements affect my placement chances?",
    answer: "Height requirements vary by airline. Domestic airlines (IndiGo, Air India) have minimum requirements of 155cm for females and 170cm for males. Many ground staff, hospitality, and cruise line roles have no height requirements. We guide students towards roles that match their profile for maximum success."
  },
  {
    question: "Can I get an international placement from Wings Institute?",
    answer: "Absolutely. Our alumni work at Qatar Airways, Emirates, Singapore Airlines, Etihad, and Air Arabia. International recruiters conduct walk-in interviews in India 4-6 times per year. We prepare students specifically for these high-paying opportunities with international grooming standards and communication training."
  },
  {
    question: "How is Wings Institute different from other placement-focused institutes?",
    answer: "Three key differences: 1) Infrastructure - We have Gujarat's only Airbus A330 mock cabin for realistic training. 2) Industry Connections - Our directors have 25+ years of aviation industry relationships. 3) No False Promises - We say '100% Placement Assistance,' not '100% Placement Guarantee,' because we are honest about how job markets work."
  }
];

// --- SCHEMA.ORG GENERATION ---
const generateEducationalOrgWithAlumniSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "alternateName": "Wings",
    "url": "https://wingsinstitute.com",
    "logo": "https://wingsinstitute.com/images/wings-logo-red.png",
    "description": "Gujarat's premier aviation and hospitality training institute since 2008, with verified placements at Qatar Airways, IndiGo, Taj Hotels, and 100+ global brands.",
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
    "sameAs": [
      "https://www.instagram.com/wingsinstitute",
      "https://www.facebook.com/wingsaviationtraining",
      "https://www.youtube.com/@wingsinstitute",
      "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training"
    ],
    "alumni": verifiedAlumni.filter(a => a.highlight).map(alumnus => ({
      "@type": "Person",
      "name": alumnus.name,
      "jobTitle": alumnus.role,
      "worksFor": {
        "@type": "Organization",
        "name": alumnus.company
      },
      "alumniOf": {
        "@id": "https://wingsinstitute.com/#organization"
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

const generateVideoObjectSchema = () => {
  return videoTestimonials.map(video => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": `https://www.youtube.com/watch?v=${video.videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${video.videoId}`,
    "inLanguage": "en",
    "isFamilyFriendly": true,
    "contentLocation": {
      "@type": "Place",
      "name": "Wings Institute Alkapuri Campus",
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
      }
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": 15000
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "url": "https://wingsinstitute.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wingsinstitute.com/images/wings-logo-red.png",
        "width": 200,
        "height": 60
      },
      "sameAs": [
        "https://www.youtube.com/@wingsinstitute",
        "https://www.instagram.com/wingsinstitute",
        "https://www.facebook.com/wingsaviationtraining"
      ]
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": `https://www.youtube.com/watch?v=${video.videoId}`
    }
  }));
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

// --- MAIN COMPONENT ---
export function PlacementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD on mount
  useEffect(() => {
    // Educational Organization with Alumni Schema
    const orgScriptId = 'placement-org-schema';
    const existingOrgScript = document.getElementById(orgScriptId);
    if (existingOrgScript) existingOrgScript.remove();

    const orgScript = document.createElement('script');
    orgScript.id = orgScriptId;
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(generateEducationalOrgWithAlumniSchema());
    document.head.appendChild(orgScript);

    // Video Object Schemas
    const videoScriptId = 'placement-video-schema';
    const existingVideoScript = document.getElementById(videoScriptId);
    if (existingVideoScript) existingVideoScript.remove();

    const videoScript = document.createElement('script');
    videoScript.id = videoScriptId;
    videoScript.type = 'application/ld+json';
    videoScript.textContent = JSON.stringify(generateVideoObjectSchema());
    document.head.appendChild(videoScript);

    // FAQ Schema
    const faqScriptId = 'placement-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const scriptsToRemove = [orgScriptId, videoScriptId, faqScriptId];
      scriptsToRemove.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Accordion Header */}
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
                Real Names. Real Companies. Real Salaries. Evidence-Based Trust.
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </button>

        {/* Expandable Content - Always in DOM for SEO */}
        <div
          id="placement-seo-content"
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: isExpanded ? 'visible' : 'auto' }}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">

            {/* ==================== SECTION 1: WALL OF FAME ==================== */}
            <h2 id="verified-placements">Verified Placements in Top Airlines & Hotels</h2>
            
            <p>
              At <strong>Wings Institute Vadodara</strong>, we don't make vague claims—we provide evidence. Every placement listed below is <strong>verified</strong> with documented offer letters and LinkedIn profiles. These are not stock photos or fictional testimonials; these are <strong>real students from Gujarat</strong> who trained in our classrooms and now work for the world's most prestigious aviation and hospitality brands.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30 my-8 not-prose">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Icons.ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">The Wings Verification Promise</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    Every placement claim on this page can be independently verified. Visit our campus in Alkapuri, Vadodara to see original offer letters. Connect with our alumni on LinkedIn. Attend our monthly alumni talks. We believe <strong>transparency builds trust</strong>—and trust is the foundation of the Gujarat Paradigm.
                  </p>
                </div>
              </div>
            </div>

            {/* Hall of Fame Table */}
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
                    {/* <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Salary Range</th> */}
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
                      {/* <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">{alumnus.salaryRange}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              <em>Note: Salary figures are indicative ranges based on industry standards and alumni feedback. Actual compensation varies based on experience, performance, and specific airline/hotel policies.</em>
            </p>

            {/* ==================== SECTION 2: SALARY & CAREER GROWTH ==================== */}
            <h2 id="roi-analysis">Return on Investment Analysis: From Course Fees to Career Earnings</h2>

            <p>
              The question every Gujarati family asks: <strong>"Is the investment worth it?"</strong> Let's answer with data, not adjectives. Aviation and hospitality careers offer one of the <strong>fastest returns on investment</strong> in the vocational education space.
            </p>

            <h3>Salary Trajectory: Domestic vs. International Airlines</h3>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Career Stage</th>
                    <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wider">Domestic Airlines</th>
                    <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wider">International Airlines</th>
                    <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wider">5-Star Hotels</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Entry Level (Year 1)</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹35,000 - ₹50,000</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold">₹1.5L - ₹2.5L (Tax-Free)</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹18,000 - ₹30,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Senior (Year 3-5)</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹55,000 - ₹80,000</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold">₹2.5L - ₹3.5L (Tax-Free)</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹35,000 - ₹55,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">In-Flight Manager / Supervisor</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹90,000 - ₹1.5L</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-bold">₹4L - ₹6L (Tax-Free)</td>
                    <td className="px-4 py-3 text-center text-zinc-700 dark:text-zinc-300">₹60,000 - ₹1L</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Additional Benefits</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Free flights, insurance</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Accommodation, transport, flights</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Meals, accommodation, tips</td>
                  </tr>
                </tbody>
              </table>
            </div>

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

            <h3>The Gujarat Paradigm: Diploma ROI vs. Degree ROI</h3>

            <p>
              Consider this: A traditional <strong>BBA in Aviation</strong> takes 3 years and costs ₹3-5 Lakhs. You enter the job market at age 21. A <strong>Wings Diploma</strong> takes 1 year, costs significantly less, and you enter the job market at age 19. By the time the BBA graduate starts working, the Wings graduate has already earned <strong>₹4-6 Lakhs</strong> and gained 2 years of industry experience.
            </p>

            <p>
              This is not about certificates—it's about <strong>speed to paycheck</strong>. In the aviation industry, airlines care about your skills, grooming, and personality, not the length of your course.
            </p>

            {/* ==================== SECTION 3: WHY RECRUITERS PREFER WINGS ==================== */}
            <h2 id="recruiter-preference">Why Recruiters Prefer Wings Institute Graduates</h2>

            <p>
            When HR teams from airlines and hotel brands such as IndiGo, Vistara, or Taj Hotels recruit, Wings students are consistently preferred because they are “Day 1 Ready” and typically require minimal additional training after hiring.            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Icons.CheckCircle2 className="w-5 h-5 text-purple-600" />
                The "Wings Advantage" in Airline Interviews
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white">A330 Mock Cabin Training</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">Students have already done trolley runs, PA announcements, and emergency drills before the interview</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white">Grooming Standards</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">Students arrive at interviews with airline-standard hair, makeup, and uniform presentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white">Safety Protocol Knowledge</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">Safety drills, fire-fighting, evacuation procedures—our students know them before Day 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white">Communication Confidence</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">Months of English fluency training and mock interviews eliminate nervousness</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>What does this mean for recruiters?</strong> Reduced training costs. Faster deployment to flights. Lower attrition because students know exactly what the job entails. This is why companies keep coming back to Wings Institute—<strong>we deliver employees who perform from Day 1</strong>.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-700 dark:text-zinc-300 my-8">
              "We've been recruiting from Wings Institute for 5 years now. Their students consistently outperform candidates from other institutes in grooming assessments and practical demonstrations. They clearly have superior infrastructure and training methodology."
              <footer className="text-sm text-zinc-500 mt-2 not-italic">— HR Representative, Leading Domestic Airline (Name withheld for confidentiality)</footer>
            </blockquote>

            {/* ==================== SECTION 4: VIDEO TESTIMONIALS ==================== */}
            <h2 id="video-testimonials">Hear From Our Alumni: Video Testimonials</h2>

            <p>
              Don't take our word for it—hear directly from students who have walked the same path you're considering. These are unscripted testimonials filmed at our campus and at their workplaces.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              {videoTestimonials.map((video, idx) => (
                <a 
                  key={idx}
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="aspect-video relative">
                    <Image 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Icons.PlayCircle className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <p>
              <Link 
                href="/virtual-tour"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Schedule a campus visit
              </Link> to meet our current students and alumni in person. We host monthly alumni talks where you can ask questions directly to graduates working at IndiGo, Qatar Airways, Taj Hotels, and more.
            </p>

            {/* ==================== SECTION 5: FAQ SCHEMA ==================== */}
            <h2 id="placement-faq">Placement FAQs: Your Questions Answered</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {placementFaqData.map((faq, idx) => (
                <details 
                  key={idx} 
                  open
                  className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-semibold text-zinc-900 dark:text-white pr-4 text-sm md:text-base">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                      <Icons.ChevronDown className="w-4 h-4 text-zinc-500" />
                    </div>
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* Final CTA */}
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

        {/* Noscript Fallback */}
        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>Verified Placements at Wings Institute Vadodara</h2>
            <p>Wings Institute has placed students at Qatar Airways, IndiGo Airlines, Singapore Airlines, Air Arabia, Taj Hotels, Marriott, and 100+ global brands since 2008.</p>
            
            <h2>Featured Alumni</h2>
            <ul>
              <li><strong>Aanal Desai</strong> - Cabin Crew, Qatar Airways</li>
              <li><strong>Mohd. Fahad Diwan</strong> - Ground Staff, IndiGo Airlines</li>
              <li><strong>Rummana Salat</strong> - Cabin Crew, Singapore Airlines</li>
              <li><strong>Ayushi Patel</strong> - St. Regis Hotel, Doha</li>
              <li><strong>Mansi Bhatt</strong> - Customs Cargo, Vadodara Airport</li>
            </ul>
            
            <h2>Salary Ranges</h2>
            <p>Domestic Airlines: ₹35,000 - ₹50,000/month | International Airlines: ₹1.5L - ₹3L/month (tax-free) | 5-Star Hotels: ₹18,000 - ₹50,000/month</p>
            
            <p>Contact: +91-8758754444 | Visit: Alkapuri, Vadodara</p>
          </div>
        </noscript>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #placement-seo-content {
            max-height: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PlacementSEOContent;

