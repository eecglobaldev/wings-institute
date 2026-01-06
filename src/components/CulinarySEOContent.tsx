'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { markdownToHtml } from '@/utils/markdownToHtml';

// FAQ Data keys for translation - English and Vernacular Voice Search
const faqKeys = [
  // English FAQs
  { qKey: 'cu.seo_faq1_q', aKey: 'cu.seo_faq1_a' },
  { qKey: 'cu.seo_faq2_q', aKey: 'cu.seo_faq2_a' },
  { qKey: 'cu.seo_faq3_q', aKey: 'cu.seo_faq3_a' },
  { qKey: 'cu.seo_faq4_q', aKey: 'cu.seo_faq4_a' },
  { qKey: 'cu.seo_faq5_q', aKey: 'cu.seo_faq5_a' },
  { qKey: 'cu.seo_faq6_q', aKey: 'cu.seo_faq6_a' },
  { qKey: 'cu.seo_faq7_q', aKey: 'cu.seo_faq7_a' },
  { qKey: 'cu.seo_faq8_q', aKey: 'cu.seo_faq8_a' },
  { qKey: 'cu.seo_faq9_q', aKey: 'cu.seo_faq9_a' },
  { qKey: 'cu.seo_faq10_q', aKey: 'cu.seo_faq10_a' },
  // Vernacular Voice Search FAQs (Gujlish/Hinglish)
  { qKey: 'cu.seo_vfaq1_q', aKey: 'cu.seo_vfaq1_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq2_q', aKey: 'cu.seo_vfaq2_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq3_q', aKey: 'cu.seo_vfaq3_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq4_q', aKey: 'cu.seo_vfaq4_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq5_q', aKey: 'cu.seo_vfaq5_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq6_q', aKey: 'cu.seo_vfaq6_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq7_q', aKey: 'cu.seo_vfaq7_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq8_q', aKey: 'cu.seo_vfaq8_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq9_q', aKey: 'cu.seo_vfaq9_a', isVernacular: true },
  { qKey: 'cu.seo_vfaq10_q', aKey: 'cu.seo_vfaq10_a', isVernacular: true },
];

// Static FAQ Data for Schema.org structured data (English only for SEO)
const faqDataSchema = [
  {
    question: "What is the difference between a culinary arts course and a chef course?",
    answer: "Culinary arts is a broader term encompassing all aspects of food preparation, presentation, and kitchen management. A chef course is typically part of culinary arts training. At Wings Institute, our Professional Certificate in Culinary Arts covers cooking techniques, bakery, confectionery, food service, and kitchen management—making you a complete culinary professional, not just a cook."
  },
  {
    question: "Can I open my own café or cloud kitchen after this course?",
    answer: "Absolutely! Our curriculum specifically covers menu planning, food costing, vendor management, kitchen hygiene (FSSAI compliance), and basic business operations. Many of our alumni have successfully launched cafés, cloud kitchens, and catering businesses across Vadodara, Ahmedabad, and other Gujarat cities. The rise of Swiggy and Zomato has made cloud kitchens a low-investment, high-return business opportunity."
  },
  {
    question: "What equipment will I train on at Wings Institute?",
    answer: "You'll train on industry-grade commercial kitchen equipment including: high-pressure gas burners (6-12 burner ranges), industrial convection ovens, salamanders, deep fryers, planetary mixers for bakery, proofing cabinets, commercial refrigeration units, stainless steel workstations, and professional knife sets. This ensures you're job-ready from day one—no adjustment period needed when you join a hotel kitchen."
  },
  {
    question: "Do you teach Indian cuisine including tandoor cooking?",
    answer: "Yes, Indian cuisine is a major module in our curriculum. You'll learn regional curries (Punjabi, South Indian, Gujarati, Mughlai), tandoor cooking on an actual tandoor oven, biryani preparation, Indian breads (naan, roti, paratha), and traditional desserts (gulab jamun, kheer, halwa). We also cover modern plating techniques for Indian dishes."
  },
  {
    question: "Is bakery and cake decoration included in the course?",
    answer: "Yes, our Bakery & Confectionery module covers bread making (white bread, whole wheat, focaccia), pastries (puff pastry, croissants), cakes (sponge, pound, chiffon), cake decoration (piping, fondant work, ganache), cookies, and desserts. You'll learn both egg-based and eggless variants to cater to all customer preferences."
  },
  {
    question: "What is the salary of a fresher chef in India?",
    answer: "Fresher chefs (Commis III) in India typically start at ₹12,000-18,000 per month in 3-star properties. In 5-star hotels like Taj, Oberoi, and Marriott, starting salaries range from ₹15,000-25,000 plus meals and accommodation. International hotels in Dubai, Qatar, and cruise ships offer ₹40,000-80,000 for experienced commis chefs. Executive Chefs can earn ₹1-3 Lakhs per month."
  },
  {
    question: "Why can't I learn cooking at home instead of joining a course?",
    answer: "Home cooking and professional cooking are completely different. Commercial kitchens use high-pressure gas burners that generate 10x more heat than home stoves, industrial equipment, standardised recipes for consistency, HACCP food safety protocols, and volume cooking techniques. Training on home equipment will leave you unprepared for the speed, precision, and hygiene standards of professional kitchens."
  },
  {
    question: "Do I need to know English to become a chef?",
    answer: "While kitchen terminology is often in French/English, you don't need fluent English to start. However, for career growth—especially in 5-star hotels or international positions—English communication is essential. Our Cambridge Spoken English module transforms vernacular students into confident English speakers, covering hospitality vocabulary and kitchen terminology."
  },
  {
    question: "What are cloud kitchens and why are they popular in Gujarat?",
    answer: "Cloud kitchens (also called ghost kitchens) are delivery-only restaurants without dine-in facilities. They operate through Swiggy, Zomato, and direct delivery. Gujarat's growing food delivery market, lower rental costs, and entrepreneurial culture make cloud kitchens a lucrative opportunity. You can start a cloud kitchen with ₹5-10 Lakhs investment—far less than a traditional restaurant."
  },
  {
    question: "Can I work on cruise ships after this culinary course?",
    answer: "Yes! Cruise lines actively recruit trained chefs for their onboard restaurants. Cruise chef salaries range from ₹60,000-1,50,000 per month (tax-free) with free food and accommodation. However, most cruise companies require 1-2 years of land-based hotel experience first. Our 6-month internship in 5-star hotels helps you build this experience."
  },
  {
    question: "Chef banne ke liye kya karna padta hai?",
    answer: "Chef banne mate: 1) Professional culinary course karo (Wings Institute ma 12 months), 2) Commercial kitchen ma practical training lo, 3) 6 months hotel internship complete karo, 4) Commis III level thi start karo, 5) Experience thi promotion malo. Home cooking thi professional chef nai bani shakay - industrial kitchen training jruri che!"
  },
  {
    question: "Cooking course fees ketli che Vadodara ma?",
    answer: "Wings Institute ma Culinary course ₹84,000 che (approximately). 6 months classroom training + 6 months paid internship include che. Commercial kitchen access, bakery training, knife skills, all ingredients - badhu fees ma include. EMI option available. Internship ma ₹1,500-5,000 stipend male - partially course fee recover!"
  },
  {
    question: "Chef ki salary kitni hoti hai India mein?",
    answer: "Fresher chef (Commis III): ₹12,000-18,000/month. 5-star hotels (Taj, Oberoi): ₹15,000-25,000 + meals. 3-5 years experience: ₹35,000-50,000. Sous Chef: ₹60,000-80,000. Executive Chef: ₹1-3 Lakh. Cruise ships: ₹60,000-1,50,000 tax-free! Dubai/Singapore better packages aape."
  },
  {
    question: "Ghar par cooking shikhine chef bani shakay ke nai?",
    answer: "NAHI! Home cooking ane professional cooking bilkul alag che. Commercial kitchen ma 10x vadhare heat hoy, industrial equipment, standard recipes, HACCP food safety, volume cooking - aa badhu ghar par nathi shikhatu. Home training thi hotel kitchen ma survive j nathi kari shakay - speed, precision, hygiene standards match nai thay."
  },
  {
    question: "Potanu cafe ya cloud kitchen kholvu che - course help karase?",
    answer: "100% karase! Wings curriculum ma specifically: menu planning, food costing, FSSAI compliance, vendor management, business operations shikhvaay. Alumni Vadodara, Ahmedabad ma successful cafes, cloud kitchens, catering businesses chalaye che. Swiggy/Zomato era ma cloud kitchen ₹5-10 Lakh investment thi start thai shake!"
  },
  {
    question: "Bakery ane cake decoration shikhvaay che ke nai?",
    answer: "Haan! Full Bakery & Confectionery module che: Bread making (white, whole wheat, focaccia), pastries (puff, croissants), cakes (sponge, pound, chiffon), cake decoration (piping, fondant, ganache), cookies, desserts. Egg-based ane eggless banne variants shikhvaay - Jain/vegetarian customers mate important!"
  },
  {
    question: "Cruise ship ma chef ki job kaise milti hai?",
    answer: "Cruise chef jobs mate: 1) Professional culinary training (Wings course), 2) 1-2 years 5-star hotel experience, 3) Swimming basic aavdvu jruri, 4) Medical fitness, 5) Passport. Wings Institute 6 months internship aa experience build kare. Cruise salary: ₹60,000-1,50,000 tax-free + free food, accommodation, travel!"
  },
  {
    question: "Indian cuisine ane tandoor cooking shikhvaay che?",
    answer: "Haan! Major module che: Regional curries (Punjabi, South Indian, Gujarati, Mughlai), tandoor cooking on REAL tandoor oven, biryani, Indian breads (naan, roti, paratha), traditional desserts (gulab jamun, kheer, halwa). Modern plating techniques pan shikhvaay Indian dishes mate. Wings kitchen ma actual tandoor che!"
  },
  {
    question: "Cloud kitchen su che? Gujarat ma kyun popular che?",
    answer: "Cloud kitchen = delivery-only restaurant, no dine-in. Swiggy/Zomato par operate karo. Gujarat ma popular kyun: 1) Growing food delivery market, 2) Lower rental costs (no dining area), 3) Gujarati entrepreneurial culture, 4) ₹5-10 Lakh thi start - traditional restaurant thi bahut cheaper! Wings ma business operations pan shikhvaay."
  },
  {
    question: "Culinary course duration ketlo che?",
    answer: "Wings Institute ma Culinary course 12 months total: 6 months intensive classroom + practical training, then 6 months paid internship at Taj/Marriott/ITC. Part-time basis - daily 4 hours. Indian, Continental, Bakery, Kitchen Management badhu cover thay. Course complete - directly chef job ready!"
  }
];

// Generate Schema.org FAQPage JSON-LD
const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqDataSchema.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate Course Schema JSON-LD
const generateCourseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://wingsinstitute.com/culinary#course",
    "name": "Culinary (Cooking) Course",
    "alternateName": "Professional Certificate in Culinary Arts",
    "description": "A year-long culinary course blending six months of intensive training with a six-month paid internship in commercial kitchen techniques, covering Indian cuisine, Continental cooking, Bakery & Confectionery.",
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
      "instructor": {
        "@type": "Person",
        "name": "Master Chefs",
        "description": "Professional chefs with 5-star hotel and international experience"
      },
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
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3151688,
          "longitude": 73.1707874
        }
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "Vocational Training",
      "priceCurrency": "INR",
      "price": "84000",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "offeredBy": {
        "@id": "https://wingsinstitute.com/#organization"
      }
    },
    "educationalCredentialAwarded": "Professional Certificate in Culinary Arts",
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "name": "Culinary Arts Professional Certificate",
      "credentialCategory": "certificate"
    },
    "teaches": [
      { "@type": "DefinedTerm", "name": "Commercial kitchen techniques", "sameAs": "https://www.wikidata.org/wiki/Q2578660" },
      { "@type": "DefinedTerm", "name": "International cuisines", "sameAs": "https://www.wikidata.org/wiki/Q192775" },
      { "@type": "DefinedTerm", "name": "Food safety & sanitation", "sameAs": "https://www.wikidata.org/wiki/Q1143828" },
      { "@type": "DefinedTerm", "name": "Knife skills (Julienne, Brunoise)" },
      { "@type": "DefinedTerm", "name": "Bakery & Confectionery" },
      { "@type": "DefinedTerm", "name": "Indian regional cuisines" },
      { "@type": "DefinedTerm", "name": "Mother sauces & stocks" }
    ],
    "coursePrerequisites": "10th Pass minimum, Age 16-30 years, Passion for cooking",
    "numberOfCredits": 12,
    "timeRequired": "P12M",
    "inLanguage": ["en", "hi", "gu"],
    "image": {
      "@type": "ImageObject",
      "url": "/images/slider-images/wings-cooking-course.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Culinary students preparing Continental cuisine in commercial kitchen lab at Wings Institute Vadodara",
      "contentLocation": {
        "@type": "Place",
        "name": "Wings Institute Commercial Kitchen Lab",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3151688,
          "longitude": 73.1707874
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "67",
      "bestRating": "5"
    },
    // Voice Search: Speakable specification for course descriptions
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".culinary-course-summary",
        ".course-description-heading",
        ".course-highlights"
      ],
      "xpath": [
        "//*[@id='culinary-course-description']",
        "//section[contains(@class, 'course-overview')]/p[1]"
      ]
    },
    // Voice Search: Additional properties for Answer Engine Optimization
    "keywords": "best culinary arts course Vadodara, chef training Gujarat, cooking course Alkapuri, culinary training near me, professional cooking institute Gujarat, chef academy India, culinary arts Vadodara, chef training fees Vadodara, best culinary training institute Gujarat 2026, commercial kitchen training, cruise ship chef course",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Career aspirants seeking professional chef and culinary jobs"
    },
    "learningResourceType": "Practical Culinary Training Program",
    "competencyRequired": "10th pass qualification, passion for cooking"
  };
};

// Generate BreadcrumbList Schema
const generateBreadcrumbSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wingsinstitute.com/" },
      { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://wingsinstitute.com/#courses" },
      { "@type": "ListItem", "position": 3, "name": "Culinary Arts", "item": "https://wingsinstitute.com/culinary" }
    ]
  };
};

export function CulinarySEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Vernacular-specific styling classes for improved readability
  const vernacularText = isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed';
  const vernacularHeading = isVernacular ? 'leading-[1.6]' : 'leading-tight';
  const vernacularParagraph = isVernacular ? 'leading-[1.9]' : 'leading-relaxed';
  const vernacularButton = isVernacular ? 'leading-[1.7] font-semibold' : 'leading-normal';
  const vernacularPill = isVernacular ? 'leading-[1.6] font-semibold' : 'leading-tight';
  const vernacularListItem = isVernacular ? 'leading-[1.8]' : 'leading-normal';
  const vernacularTableCell = isVernacular ? 'leading-[1.7] font-medium' : 'leading-normal';

  // Inject all Schema.org JSON-LD into document head
  useEffect(() => {
    const schemas = [
      { id: 'culinary-course-schema', data: generateCourseSchema() },
      { id: 'culinary-faq-schema', data: generateFAQSchema() },
      { id: 'culinary-breadcrumb-schema', data: generateBreadcrumbSchema() },
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
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('cu.seo_title')}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('cu.seo_subtitle')}
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
            
            {/* ============================================ */}
            {/* SECTION 1: THE ART OF COOKING */}
            {/* ============================================ */}
            <section id="professional-culinary-arts-certificate">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                {t('cu.sec1_title')}
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec1_p1')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec1_p2')) }} />

              <div className="my-8 p-6 bg-gradient-to-r from-orange-500/5 to-red-500/5 border-l-4 border-orange-500 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.ChefHat className="w-5 h-5 text-orange-500" />
                  {t('cu.why_wings_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why_wings_intro')) }} />
                <ul className={`space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why1')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why2')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why3')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why4')) }} />
                  </li>
                </ul>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec1_closing')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 2: THE SYLLABUS */}
            {/* ============================================ */}
            <section id="culinary-arts-syllabus">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-red-500 rounded-full"></span>
                {t('cu.sec2_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('cu.sec2_intro')}
              </p>

              {/* Knife Skills */}
              <div className="my-8 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                  {t('cu.knife_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('cu.knife_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.knife_cuts_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut1')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut2')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut3')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut4')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut5')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.knife_cut6')}` }} />
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.kitchen_fund_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.kitchen_fund1')}</li>
                      <li>• {t('cu.kitchen_fund2')}</li>
                      <li>• {t('cu.kitchen_fund3')}</li>
                      <li>• {t('cu.kitchen_fund4')}</li>
                      <li>• {t('cu.kitchen_fund5')}</li>
                      <li>• {t('cu.kitchen_fund6')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Indian Cuisine */}
              <div className="my-8 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-200 dark:border-orange-800/30">
                <h3 className={`text-xl font-bold text-orange-800 dark:text-orange-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                  {t('cu.indian_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('cu.indian_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.regional_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.regional1')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.regional2')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.regional3')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.regional4')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.regional5')}` }} />
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.tandoor_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.tandoor1')}</li>
                      <li>• {t('cu.tandoor2')}</li>
                      <li>• {t('cu.tandoor3')}</li>
                      <li>• {t('cu.tandoor4')}</li>
                      <li>• {t('cu.tandoor5')}</li>
                    </ul>
                    <p className={`mt-2 text-xs text-orange-700 dark:text-orange-400 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.tandoor_note')) }} />
                  </div>
                </div>
              </div>

              {/* Bakery & Confectionery */}
              <div className="my-8 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <h3 className={`text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm font-bold">3</span>
                  {t('cu.bakery_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('cu.bakery_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.breads_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.bread1')}</li>
                      <li>• {t('cu.bread2')}</li>
                      <li>• {t('cu.bread3')}</li>
                      <li>• {t('cu.bread4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.pastry_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.pastry1')}</li>
                      <li>• {t('cu.pastry2')}</li>
                      <li>• {t('cu.pastry3')}</li>
                      <li>• {t('cu.pastry4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.desserts_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.dessert1')}</li>
                      <li>• {t('cu.dessert2')}</li>
                      <li>• {t('cu.dessert3')}</li>
                      <li>• {t('cu.dessert4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Continental Cuisine */}
              <div className="my-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/30">
                <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold">4</span>
                  {t('cu.continental_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('cu.continental_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.sauces_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.sauce1')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.sauce2')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.sauce3')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.sauce4')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('cu.sauce5')}` }} />
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('cu.stocks_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>• {t('cu.stock1')}</li>
                      <li>• {t('cu.stock2')}</li>
                      <li>• {t('cu.stock3')}</li>
                      <li>• {t('cu.stock4')}</li>
                      <li>• {t('cu.stock5')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('cu.sec2_link')} <Link href="/hotel-management" className="text-orange-600 font-semibold underline hover:no-underline cursor-pointer">{t('cu.sec2_link_text')}</Link> {t('cu.sec2_link_suffix')}
              </p>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 3: INFRASTRUCTURE */}
            {/* ============================================ */}
            <section id="commercial-kitchen-training">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-yellow-500 rounded-full"></span>
                {t('cu.sec3_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec3_intro')) }} />

              <div className="my-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-800/30">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('cu.equipment_title')}</h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-6 ${vernacularParagraph}`}>
                  {t('cu.equipment_intro')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cooking Equipment */}
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <h4 className={`font-bold text-orange-600 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                      <Icons.Zap className="w-4 h-4" /> {t('cu.cooking_equip_title')}
                    </h4>
                    <ul className={`space-y-2 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cook_eq1')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cook_eq2')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cook_eq3')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cook_eq4')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cook_eq5')) }} />
                      </li>
                    </ul>
                  </div>

                  {/* Preparation & Storage */}
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <h4 className={`font-bold text-amber-600 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                      <Icons.Zap className="w-4 h-4" /> {t('cu.prep_title')}
                    </h4>
                    <ul className={`space-y-2 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.prep1')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.prep2')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.prep3')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.prep4')) }} />
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.prep5')) }} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="my-6 p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                <p className={`text-red-800 dark:text-red-300 font-medium flex items-start gap-2 ${vernacularParagraph}`}>
                  <Icons.AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.why_matters')) }} />
                </p>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 4: CAREER OUTLOOK */}
            {/* ============================================ */}
            <section id="chef-career-cloud-kitchens">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-500 rounded-full"></span>
                {t('cu.sec4_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('cu.sec4_intro')}
              </p>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('cu.career_prog_title')}</h3>

              {/* Salary Table */}
              <div className="my-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('cu.table_position')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('cu.table_experience')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('cu.table_domestic')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('cu.table_international')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Commis III (Trainee)</td>
                      <td className="p-4">0-1 Year</td>
                      <td className="p-4 text-green-600 font-bold">₹12,000 - ₹18,000</td>
                      <td className="p-4">₹25,000 - ₹40,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Commis II</td>
                      <td className="p-4">1-2 Years</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                      <td className="p-4">₹40,000 - ₹60,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Commis I</td>
                      <td className="p-4">2-4 Years</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹35,000</td>
                      <td className="p-4">₹60,000 - ₹80,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Demi Chef de Partie</td>
                      <td className="p-4">4-6 Years</td>
                      <td className="p-4 text-green-600 font-bold">₹35,000 - ₹50,000</td>
                      <td className="p-4">₹80,000 - ₹1,20,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Chef de Partie (CDP)</td>
                      <td className="p-4">6-8 Years</td>
                      <td className="p-4 text-green-600 font-bold">₹50,000 - ₹70,000</td>
                      <td className="p-4">₹1,00,000 - ₹1,50,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Sous Chef</td>
                      <td className="p-4">8-12 Years</td>
                      <td className="p-4 text-green-600 font-bold">₹70,000 - ₹1,00,000</td>
                      <td className="p-4">₹1,50,000 - ₹2,50,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Executive Chef</td>
                      <td className="p-4">12+ Years</td>
                      <td className="p-4 text-green-600 font-bold">₹1,00,000 - ₹3,00,000</td>
                      <td className="p-4">₹3,00,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('cu.cloud_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.cloud_intro')) }} />

              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                  <h4 className={`font-bold text-green-800 dark:text-green-300 mb-3 ${vernacularHeading}`}>{t('cu.cloud_why_title')}</h4>
                  <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cloud1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cloud2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cloud3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cloud4')}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
                  <h4 className={`font-bold text-amber-800 dark:text-amber-300 mb-3 ${vernacularHeading}`}>{t('cu.cafe_title')}</h4>
                  <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cafe1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cafe2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cafe3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{t('cu.cafe4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('cu.alumni_title')}</h3>

              <div className="my-6 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-200 dark:border-yellow-800/30">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    <Image src="/images/culinary-course/maaz-shaikh.jpg" alt="Maaz Shaikh - Wings Institute culinary graduate working at Gordon Ramsay Hell's Kitchen Dubai" width={80} height={80} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-zinc-900 dark:text-white mb-1 ${vernacularHeading}`}>Maaz Shaikh</h4>
                    <p className={`text-orange-700 dark:text-orange-400 font-medium mb-3 ${vernacularText}`}>{t('cu.alumni_role')}</p>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.alumni_desc')) }} />
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 5: A DAY IN THE LIFE - NARRATIVE STORYTELLING */}
            {/* ============================================ */}
            <section id="day-in-life-culinary-student">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                {t('cu.sec5_title')}
              </h2>

              {/* Opening Hook */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-2xl border border-orange-200 dark:border-orange-800/50 mb-8">
                <div className={`absolute -top-3 left-6 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wide ${vernacularPill}`}>
                  {t('cu.sec5_badge')}
                </div>
                <p className={`text-lg md:text-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec5_quote')) }} />
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.sec5_intro')) }} />

              {/* Early Morning: Mise en Place */}
              <div className="mt-10 relative pl-8 border-l-4 border-orange-300 dark:border-orange-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.mise_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.mise_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.mise_p2')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.mise_p3')) }} />
                <div className="mt-4 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <p className={`text-sm text-orange-800 dark:text-orange-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.mise_tip')) }} />
                </div>
              </div>

              {/* Morning: Knife Skills */}
              <div className="mt-10 relative pl-8 border-l-4 border-red-300 dark:border-red-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.knife_drill_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.knife_drill_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.knife_drill_p2')) }} />
                <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🥕</div>
                    <h4 className={`font-bold text-red-800 dark:text-red-200 text-sm ${vernacularPill}`}>{t('cu.brunoise')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.brunoise_desc')}</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🥒</div>
                    <h4 className={`font-bold text-red-800 dark:text-red-200 text-sm ${vernacularPill}`}>{t('cu.julienne')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.julienne_desc')}</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🌿</div>
                    <h4 className={`font-bold text-red-800 dark:text-red-200 text-sm ${vernacularPill}`}>{t('cu.chiffonade')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.chiffonade_desc')}</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🧅</div>
                    <h4 className={`font-bold text-red-800 dark:text-red-200 text-sm ${vernacularPill}`}>{t('cu.tourne')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.tourne_desc')}</p>
                  </div>
                </div>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.knife_drill_p3')) }} />
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-700">
                  <p className={`text-sm text-red-800 dark:text-red-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.knife_safety')) }} />
                </div>
              </div>

              {/* Late Morning: Commercial Kitchen Cooking */}
              <div className="mt-10 relative pl-8 border-l-4 border-amber-300 dark:border-amber-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.fire_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.fire_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('cu.fire_p2')}
                </p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                      <span className="text-xl">🇮🇳</span> {t('cu.indian_module')}
                    </h4>
                    <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                      <li>• {t('cu.indian_mod1')}</li>
                      <li>• {t('cu.indian_mod2')}</li>
                      <li>• {t('cu.indian_mod3')}</li>
                      <li>• {t('cu.indian_mod4')}</li>
                      <li>• {t('cu.indian_mod5')}</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className={`font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                      <span className="text-xl">🌍</span> {t('cu.intl_module')}
                    </h4>
                    <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                      <li>• {t('cu.intl_mod1')}</li>
                      <li>• {t('cu.intl_mod2')}</li>
                      <li>• {t('cu.intl_mod3')}</li>
                      <li>• {t('cu.intl_mod4')}</li>
                      <li>• {t('cu.intl_mod5')}</li>
                    </ul>
                  </div>
                </div>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.fire_p3')) }} />
                <blockquote className={`my-6 p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.fire_quote')) }} />
                </blockquote>
              </div>

              {/* Afternoon: Baking & Patisserie */}
              <div className="mt-10 relative pl-8 border-l-4 border-pink-300 dark:border-pink-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.baking_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.baking_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.baking_p2')) }} />
                <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🍞</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_breads')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_breads_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🎂</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_cakes')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_cakes_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🥐</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_viennoiserie')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_viennoiserie_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🍪</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_cookies')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_cookies_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🍫</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_chocolate')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_chocolate_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🍮</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularPill}`}>{t('cu.baking_desserts')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('cu.baking_desserts_desc')}</p>
                  </div>
                </div>
                <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-xl border border-pink-200 dark:border-pink-700">
                  <p className={`text-sm text-pink-800 dark:text-pink-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.baking_career')) }} />
                </div>
              </div>

              {/* Late Afternoon: Plating & Presentation */}
              <div className="mt-10 relative pl-8 border-l-4 border-purple-300 dark:border-purple-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.plating_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('cu.plating_p2')}
                </p>
                <ul className={`mt-6 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🔵</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_classic')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🎨</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_modern')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🌿</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_garnish')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">📸</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_photo')) }} />
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.plating_story')) }} />
                </div>
              </div>

              {/* Evening: English for Recipes */}
              <div className="mt-10 relative pl-8 border-l-4 border-emerald-300 dark:border-emerald-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.english_seo_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.english_seo_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.english_seo_p2')) }} />
                <div className="my-6 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h4 className={`font-bold text-emerald-800 dark:text-emerald-200 mb-4 ${vernacularHeading}`}>{t('cu.english_master_title')}</h4>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 text-sm ${vernacularText}`}>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('cu.kitchen_commands_title')}</p>
                      <p>{t('cu.kitchen_commands_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('cu.technical_terms_title')}</p>
                      <p>{t('cu.technical_terms_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('cu.menu_writing_title')}</p>
                      <p>{t('cu.menu_writing_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('cu.guest_interaction_title')}</p>
                      <p>{t('cu.guest_interaction_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special: MasterChef Visits */}
              <div className="mt-10 relative pl-8 border-l-4 border-yellow-300 dark:border-yellow-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.masterchef_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.masterchef_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('cu.masterchef_p2')}
                </p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('cu.masterchef_p3')}
                </p>
              </div>

              {/* The 6+6 Model */}
              <div className="mt-10 relative pl-8 border-l-4 border-orange-300 dark:border-orange-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">8</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.model_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.model_intro')) }} />
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                    <h4 className={`font-bold text-orange-800 dark:text-orange-200 mb-3 text-xl ${vernacularHeading}`}>{t('cu.learn_title')}</h4>
                    <ul className={`text-zinc-700 dark:text-zinc-300 space-y-2 text-sm ${vernacularListItem}`}>
                      <li>✓ {t('cu.learn1')}</li>
                      <li>✓ {t('cu.learn2')}</li>
                      <li>✓ {t('cu.learn3')}</li>
                      <li>✓ {t('cu.learn4')}</li>
                      <li>✓ {t('cu.learn5')}</li>
                      <li>✓ {t('cu.learn6')}</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <h4 className={`font-bold text-green-800 dark:text-green-200 mb-3 text-xl ${vernacularHeading}`}>{t('cu.earn_title')}</h4>
                    <ul className={`text-zinc-700 dark:text-zinc-300 space-y-2 text-sm ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: `✓ ${t('cu.earn1')}` }} />
                      <li>✓ {t('cu.earn2')}</li>
                      <li>✓ {t('cu.earn3')}</li>
                      <li>✓ {t('cu.earn4')}</li>
                      <li>✓ {t('cu.earn5')}</li>
                      <li>✓ {t('cu.earn6')}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.model_paradigm')) }} />
                </div>
              </div>

              {/* Internship & Career */}
              <div className="mt-10 relative pl-8 border-l-4 border-indigo-300 dark:border-indigo-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">9</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.destinations_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.destinations_intro')) }} />
                <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest1_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest1_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest2_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest2_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest3_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest3_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest4_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest4_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest5_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest5_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest6_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest6_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest7_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest7_desc')}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className={`font-bold text-zinc-900 dark:text-white ${vernacularPill}`}>{t('cu.dest8_name')}</span>
                    <p className={`text-xs text-zinc-500 mt-1 ${vernacularText}`}>{t('cu.dest8_desc')}</p>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-2xl border border-orange-500/20">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('cu.closing_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                  {t('cu.closing_p1')}
                </p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('cu.closing_p2')}
                </p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('cu.closing_p3')) }} />
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link 
                    href="/virtual-tour"
                    className={`px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors ${vernacularButton}`}
                  >
                    {t('cu.btn_kitchen_tour')}
                  </Link>
                  <Link 
                    href="/admissions"
                    className={`px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity ${vernacularButton}`}
                  >
                    {t('cu.btn_start_application')}
                  </Link>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 6: FAQ */}
            {/* ============================================ */}
            <section id="culinary-arts-faq">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-pink-500 rounded-full"></span>
                {t('cu.faq_seo_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 mb-8 ${vernacularParagraph}`}>
                {t('cu.faq_seo_intro')}
              </p>

              <div className="space-y-6">
                {/* English FAQs */}
                {faqKeys.filter(faq => !faq.isVernacular).map((faq, index) => (
                  <div key={index} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                      {index + 1}. {t(faq.qKey)}
                    </h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t(faq.aKey)) }} />
                  </div>
                ))}

                {/* Vernacular Voice Search FAQs Header */}
                <div className="mt-10 mb-4">
                  <h3 className={`text-xl font-bold text-orange-700 dark:text-orange-400 ${vernacularHeading}`}>
                    {t('cu.vfaq_header')}
                  </h3>
                </div>

                {/* Vernacular FAQs */}
                {faqKeys.filter(faq => faq.isVernacular).map((faq, index) => (
                  <div key={index + 10} className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800/30">
                    <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                      {index + 11}. {t(faq.qKey)}
                    </h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t(faq.aKey)) }} />
                  </div>
                ))}
              </div>

              {/* Schema.org FAQ JSON-LD is automatically injected via useEffect */}
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>{t('cu.cta_title')}</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularParagraph}`}>
                {t('cu.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className={`px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-zinc-100 transition-colors ${vernacularButton}`}
                >
                  {t('cu.cta_btn_apply')}
                </Link>
                <a 
                  href="tel:+918758754444"
                  className={`px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 ${vernacularButton}`}
                >
                  <Icons.Phone className="w-5 h-5" />
                  {t('cu.cta_btn_call')}
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
};

export default CulinarySEOContent;

