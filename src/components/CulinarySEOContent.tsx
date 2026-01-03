'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

const generateCourseSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://wingsinstitute.com/culinary-cooking-course#course",
  "name": "Culinary Arts & Professional Chef Training",
  "description": "Comprehensive culinary training covering Indian cuisine, Continental, Bakery & Confectionery with HACCP certification.",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "full-time",
    "duration": "P12M"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "125000"
  }
});

export function CulinarySEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  useEffect(() => {
    const id = 'culinary-course-schema';
    const existingScript = document.getElementById(id);
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(generateCourseSchema());
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  return (
    <section className="px-6 mb-16 lg:mb-20">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.6]' : ''}`}>
                Complete Chef Training Guide
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Curriculum, career paths & salary expectations
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </button>

        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 border border-zinc-200 dark:border-white/10 shadow-xl">
            
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-10 bg-orange-600 rounded-full"></span>
              Culinary Arts Course Overview
            </h2>
            
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              The Culinary Arts program at Wings Institute transforms passionate food enthusiasts into professional chefs. Our comprehensive 12-month program covers Indian cuisine, Continental cooking, Bakery & Confectionery, with hands-on training in our commercial-grade kitchen.
            </p>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8">Chef Salary in India</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-100 dark:bg-orange-900/30">
                    <th className="p-4 font-bold">Position</th>
                    <th className="p-4 font-bold">Entry Salary</th>
                    <th className="p-4 font-bold">5+ Years</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Commis Chef</td>
                    <td className="p-4 text-green-600 font-bold">₹15,000 - ₹22,000</td>
                    <td className="p-4 text-green-600 font-bold">₹35,000 - ₹50,000</td>
                  </tr>
                  <tr className="border-b bg-zinc-50 dark:bg-zinc-800/50">
                    <td className="p-4">Pastry Chef</td>
                    <td className="p-4 text-green-600 font-bold">₹18,000 - ₹28,000</td>
                    <td className="p-4 text-green-600 font-bold">₹45,000 - ₹70,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Executive Chef</td>
                    <td className="p-4 text-green-600 font-bold">-</td>
                    <td className="p-4 text-green-600 font-bold">₹80,000 - ₹2,00,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Start Your Chef Journey</h3>
              <Link href="/admissions" className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-zinc-100 transition-colors">
                Apply Now →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default CulinarySEOContent;

