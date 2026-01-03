'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

// Course Schema JSON-LD
const generateCourseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://wingsinstitute.com/airport-management#course",
    "name": "Airport Management",
    "alternateName": "Ground Staff Training Course",
    "description": "A one-year, part-time program preparing students for corporate careers in airport operations, emphasising ground operations, logistics, passenger handling, and aviation security.",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "sameAs": "https://wingsinstitute.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "part-time",
      "courseWorkload": "PT4H",
      "duration": "P12M",
      "location": {
        "@type": "Place",
        "name": "Wings Institute Alkapuri Campus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2nd floor, RG Square 14, Nutan Bharat Society, Alkapuri",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "postalCode": "390007",
          "addressCountry": "IN"
        }
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "Vocational Training",
      "priceCurrency": "INR",
      "price": "118000",
      "availability": "https://schema.org/InStock"
    },
    "educationalCredentialAwarded": "Diploma in Airport Management"
  };
};

// Breadcrumb Schema
const generateBreadcrumbSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wingsinstitute.com/" },
      { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://wingsinstitute.com/#courses" },
      { "@type": "ListItem", "position": 3, "name": "Airport Management", "item": "https://wingsinstitute.com/airport-management" }
    ]
  };
};

export function AirportManagementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const vernacularText = isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed';
  const vernacularHeading = isVernacular ? 'leading-[1.6]' : 'leading-tight';
  const vernacularParagraph = isVernacular ? 'leading-[1.9]' : 'leading-relaxed';

  // Inject Schema.org JSON-LD
  useEffect(() => {
    const schemas = [
      { id: 'airport-management-course-schema', data: generateCourseSchema() },
      { id: 'airport-management-breadcrumb-schema', data: generateBreadcrumbSchema() },
    ];

    schemas.forEach(({ id, data }) => {
      const existingScript = document.getElementById(id);
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach(({ id }) => {
        const scriptToRemove = document.getElementById(id);
        if (scriptToRemove) scriptToRemove.remove();
      });
    };
  }, []);

  return (
    <section className="px-6 mb-16 lg:mb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Accordion Trigger */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('am.seo_title') || 'Complete Course Guide'}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('am.seo_subtitle') || 'Syllabus, career paths, salary & more'}
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </button>

        {/* Expandable Content */}
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-6 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 border border-zinc-200 dark:border-white/10 shadow-xl">
            
            {/* Section 1: Overview */}
            <section id="airport-ground-staff-training">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
                {t('am.hero_title') || 'Airport Management Course Overview'}
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('am.hero_p1') || 'The Airport Management course at Wings Institute is designed to prepare students for dynamic careers in airport ground operations. Our comprehensive 12-month program covers terminal operations, passenger handling, baggage management, and aviation security protocols.'}
              </p>

              <div className="my-8 p-6 bg-gradient-to-r from-blue-600/5 to-indigo-500/5 border-l-4 border-blue-600 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Target className="w-5 h-5 text-blue-600" />
                  {t('am.who_for_title') || 'Who Is This Course For?'}
                </h3>
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>12th pass students from any stream seeking aviation careers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Candidates who don&apos;t meet cabin crew height requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Those preferring stable work schedules over flying duties</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* Section 2: Salary & Career */}
            <section id="ground-staff-salary-structure">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                {t('am.salary_title') || 'Salary & Career Growth'}
              </h2>

              <div className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Level</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Designation</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Experience</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Monthly Salary</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4"><span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-bold">Entry</span></td>
                      <td className="p-4 font-medium">Customer Service Agent</td>
                      <td className="p-4">0-1 years</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4"><span className="px-2 py-1 bg-blue-200 dark:bg-blue-700 rounded text-xs font-bold">Junior</span></td>
                      <td className="p-4 font-medium">Senior Agent / Team Lead</td>
                      <td className="p-4">1-3 years</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹35,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4"><span className="px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded text-xs font-bold">Senior</span></td>
                      <td className="p-4 font-medium">Duty Manager / Shift Lead</td>
                      <td className="p-4">5-7 years</td>
                      <td className="p-4 text-green-600 font-bold">₹45,000 - ₹80,000</td>
                    </tr>
                    <tr>
                      <td className="p-4"><span className="px-2 py-1 bg-amber-200 dark:bg-amber-700 rounded text-xs font-bold">Management</span></td>
                      <td className="p-4 font-medium">Airport Manager</td>
                      <td className="p-4">10+ years</td>
                      <td className="p-4 text-green-600 font-bold">₹80,000 - ₹1,20,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* Section 3: Comparison */}
            <section id="cabin-crew-vs-ground-staff">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                Cabin Crew vs Ground Staff: Which Is Right For You?
              </h2>

              <div className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-orange-100 dark:bg-orange-900/30">
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Factor</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Cabin Crew</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Ground Staff</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Work Location</td>
                      <td className="p-4">Inside aircraft, traveling</td>
                      <td className="p-4">Airport terminal, fixed location</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Height Requirement</td>
                      <td className="p-4 text-red-600">Yes (155cm+ for women)</td>
                      <td className="p-4 text-green-600">No height restriction</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Schedule</td>
                      <td className="p-4">Irregular, night flights</td>
                      <td className="p-4">More predictable shifts</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Career Longevity</td>
                      <td className="p-4">Age limits for flying</td>
                      <td className="p-4 text-green-600">Work until 55-60 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <p className={`text-blue-800 dark:text-blue-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <span><strong>Wings Advantage:</strong> Our unique curriculum prepares you for both paths. Start with ground staff and transition to cabin crew later, or build a stable career in airport management.</span>
                </p>
              </div>
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>Ready to Start Your Aviation Career?</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularText}`}>
                Join Gujarat&apos;s premier airport management program. Limited seats available for the upcoming batch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-zinc-100 transition-colors"
                >
                  Apply Now →
                </Link>
                <a 
                  href="tel:+918758754444"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Call: +91 87587 54444
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
}

export default AirportManagementSEOContent;

