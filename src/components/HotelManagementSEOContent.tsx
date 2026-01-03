'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

// Course Schema JSON-LD
const generateCourseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://wingsinstitute.com/hotel-management#course",
    "name": "Hotel Management",
    "alternateName": "Diploma in Hospitality Management",
    "description": "Comprehensive hotel management training covering Front Office, F&B Service, Housekeeping & Kitchen operations with 6-month internship at 5-star hotels.",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "sameAs": "https://wingsinstitute.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "full-time",
      "courseWorkload": "PT6H",
      "duration": "P18M",
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
      "price": "145000",
      "availability": "https://schema.org/InStock"
    },
    "educationalCredentialAwarded": "Diploma in Hotel Management"
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
      { "@type": "ListItem", "position": 3, "name": "Hotel Management", "item": "https://wingsinstitute.com/hotel-management" }
    ]
  };
};

export function HotelManagementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const vernacularText = isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed';
  const vernacularHeading = isVernacular ? 'leading-[1.6]' : 'leading-tight';

  // Inject Schema.org JSON-LD
  useEffect(() => {
    const schemas = [
      { id: 'hotel-management-course-schema', data: generateCourseSchema() },
      { id: 'hotel-management-breadcrumb-schema', data: generateBreadcrumbSchema() },
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
            <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('hm.seo_title') || 'Complete Course Guide'}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('hm.seo_subtitle') || 'Syllabus, internship, salary & career paths'}
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
            <section id="hotel-management-training">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-amber-600 rounded-full"></span>
                Hotel Management Course Overview
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>
                The Hotel Management Diploma at Wings Institute is an 18-month comprehensive program designed to prepare students for careers in the global hospitality industry. Our curriculum covers all core departments of hotel operations, from front office management to culinary arts.
              </p>

              <div className="my-8 p-6 bg-gradient-to-r from-amber-600/5 to-orange-500/5 border-l-4 border-amber-600 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Target className="w-5 h-5 text-amber-600" />
                  Who Is This Course For?
                </h3>
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>12th pass students seeking luxury hospitality careers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Those passionate about food, service, and guest experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Aspirants for international hotel placements (Gulf, Europe, USA)</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* Section 2: Salary & Career */}
            <section id="hotel-management-salary">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                Salary & Career Growth
              </h2>

              <div className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Department</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">Entry Salary</th>
                      <th className="p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700">5+ Years</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Front Office</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                      <td className="p-4 text-green-600 font-bold">₹50,000 - ₹80,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">F&B Service</td>
                      <td className="p-4 text-green-600 font-bold">₹15,000 - ₹22,000</td>
                      <td className="p-4 text-green-600 font-bold">₹45,000 - ₹70,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Housekeeping</td>
                      <td className="p-4 text-green-600 font-bold">₹15,000 - ₹20,000</td>
                      <td className="p-4 text-green-600 font-bold">₹40,000 - ₹65,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Kitchen (Chef)</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹28,000</td>
                      <td className="p-4 text-green-600 font-bold">₹60,000 - ₹1,50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
                <p className={`text-amber-800 dark:text-amber-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.TrendingUp className="w-5 h-5 shrink-0 mt-0.5" />
                  <span><strong>International Opportunities:</strong> Gulf countries offer 2-3x higher salaries with tax-free income. European cruise ships offer $1,500-3,000/month + tips.</span>
                </p>
              </div>
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>Start Your 5-Star Career Today</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularText}`}>
                Join Gujarat&apos;s premier hotel management program with guaranteed internship at luxury properties. Limited seats available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className="px-8 py-4 bg-white text-amber-600 rounded-full font-bold hover:bg-zinc-100 transition-colors"
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

export default HotelManagementSEOContent;

