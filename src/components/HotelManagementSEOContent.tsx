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
  { qKey: 'hm.seo_faq1_q', aKey: 'hm.seo_faq1_a' },
  { qKey: 'hm.seo_faq2_q', aKey: 'hm.seo_faq2_a' },
  { qKey: 'hm.seo_faq3_q', aKey: 'hm.seo_faq3_a' },
  { qKey: 'hm.seo_faq4_q', aKey: 'hm.seo_faq4_a' },
  { qKey: 'hm.seo_faq5_q', aKey: 'hm.seo_faq5_a' },
  { qKey: 'hm.seo_faq6_q', aKey: 'hm.seo_faq6_a' },
  { qKey: 'hm.seo_faq7_q', aKey: 'hm.seo_faq7_a' },
  { qKey: 'hm.seo_faq8_q', aKey: 'hm.seo_faq8_a' },
  { qKey: 'hm.seo_faq9_q', aKey: 'hm.seo_faq9_a' },
  { qKey: 'hm.seo_faq10_q', aKey: 'hm.seo_faq10_a' },
  // Vernacular Voice Search FAQs (Gujlish/Hinglish)
  { qKey: 'hm.seo_vfaq1_q', aKey: 'hm.seo_vfaq1_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq2_q', aKey: 'hm.seo_vfaq2_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq3_q', aKey: 'hm.seo_vfaq3_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq4_q', aKey: 'hm.seo_vfaq4_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq5_q', aKey: 'hm.seo_vfaq5_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq6_q', aKey: 'hm.seo_vfaq6_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq7_q', aKey: 'hm.seo_vfaq7_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq8_q', aKey: 'hm.seo_vfaq8_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq9_q', aKey: 'hm.seo_vfaq9_a', isVernacular: true },
  { qKey: 'hm.seo_vfaq10_q', aKey: 'hm.seo_vfaq10_a', isVernacular: true },
];

// Static FAQ Data for Schema.org structured data (English only for SEO)
const faqDataSchema = [
  {
    question: "What is the difference between a 3-year hotel management degree and a 1-year diploma?",
    answer: "A 3-year degree focuses heavily on theory, general education subjects, and academic credentials. A 1-year diploma like ours focuses 100% on practical, job-ready skills. In hospitality, hotels hire based on skills, grooming, and attitude—not marksheets. Our diploma + 6-month internship gets you earning 2 years before a degree holder even graduates. This is the Gujarat Paradigm: faster ROI through focused vocational training."
  },
  {
    question: "What are the hotel management course fees in Vadodara?",
    answer: "Hotel management course fees vary significantly across institutes. At Wings Institute, we offer comprehensive fee packages that include all training materials, practical lab access, internship placement assistance, and multiple certifications. We also provide EMI options and merit-based scholarships. Contact our admissions counsellor at +91-87587-54444 for exact fee details and current offers."
  },
  {
    question: "Is cooking compulsory in hotel management?",
    answer: "No, cooking is just one of four major departments in hotel management. You can specialise in Front Office (reception, guest relations), F&B Service (restaurant management), Housekeeping (room operations), or Food Production (culinary). Many successful hotel professionals never enter the kitchen—Front Office and Housekeeping managers often have the highest career growth in hotel chains."
  },
  {
    question: "Do students get paid during the hotel internship?",
    answer: "Yes! All Wings Institute students undergo a mandatory 6-month industrial training in 5-star properties like Taj, Marriott, Hyatt, and ITC. Students typically receive a monthly stipend ranging from ₹1,500 to ₹5,000 depending on the property and location. Many students also receive tips, meals, and accommodation. More importantly, 60-70% of interns receive permanent job offers from their internship hotels."
  },
  {
    question: "Can I work on cruise ships after hotel management?",
    answer: "Absolutely! Hotel management graduates are highly sought after by international cruise liners like Royal Caribbean, Carnival, and MSC. Cruise jobs offer tax-free salaries of ₹80,000-2,00,000 per month with free food, accommodation, and travel. However, most cruise companies require 1-2 years of onshore 5-star hotel experience before hiring, which is why our internship programme is so valuable."
  },
  {
    question: "What is the salary of a hotel management fresher in India?",
    answer: "Hotel management freshers in India typically start at ₹15,000-25,000 per month in domestic 3-4 star properties. In 5-star chains like Taj, Oberoi, and Marriott, starting salaries range from ₹18,000-30,000 plus tips, meals, and accommodation. International hotels in Dubai, Qatar, and Singapore offer ₹50,000-80,000 for freshers. With 3-5 years of experience, salaries can reach ₹50,000-1,00,000 in supervisory roles."
  },
  {
    question: "What equipment and labs does Wings Institute have for practical training?",
    answer: "Wings Institute has industry-grade infrastructure including: a Fine-Dine Mock Restaurant with formal table settings, silverware, and service stations; a Commercial Kitchen with high-pressure burners, industrial ovens, bakery equipment, and professional cutlery; a Front Office Lab with PMS software training; and Housekeeping training. Students practice on real equipment used in 5-star hotels."
  },
  {
    question: "What is Front Office in hotel management?",
    answer: "Front Office is the 'face' of the hotel—the first and last point of contact for guests. Front Office executives handle check-in/check-out, reservations, guest complaints, billing (night audit), concierge services, and VIP guest relations. This department uses Property Management Systems (PMS) like Opera, Fidelio, and IDS. Front Office roles often have the fastest career progression to General Manager positions."
  },
  {
    question: "Can I open my own restaurant or café after this course?",
    answer: "Yes! Many of our alumni have successfully launched their own restaurants, cafés, cloud kitchens, and catering businesses in Vadodara, Ahmedabad, and across Gujarat. Our curriculum covers food costing, menu planning, kitchen management, and customer service—essential skills for entrepreneurship. We also teach basic business operations as part of our hospitality training."
  },
  {
    question: "Is there any age limit for hotel management course?",
    answer: "Our hotel management programme accepts candidates aged 17-28 years. Unlike aviation where strict age limits apply for cabin crew, hospitality careers have no upper age restrictions for employment. You can start as a Front Office Executive at 20 and continue working until retirement, progressing through supervisory and management roles. This makes hospitality a stable, long-term career choice."
  },
  {
    question: "Hotel management ma scope che ke nai Gujarat ma?",
    answer: "Bahut scope che! India ma 2026 sudhi ma 15 million new hospitality jobs expected che. Gujarat ma Statue of Unity, Dwarka, Somnath, Ahmedabad heritage tourism boom che. Taj, Marriott, Hyatt constantly hiring. Wings alumni Vadodara thi direct Dubai, Singapore hotels ma gaya che. Cruise ships ma ₹1-2 lakh tax-free salary male che!"
  },
  {
    question: "Hotel management course fees ketli che Vadodara ma?",
    answer: "Wings Institute ma Hotel Management course ₹84,000 che (approximately). 6 months classroom training + 6 months paid internship include che. Internship ma ₹1,500 - ₹5,000/month stipend male che. EMI option available - 3-6 installments. Merit scholarship thi 30% sudhi discount. Total investment recover thai jay 1 year ma!"
  },
  {
    question: "Cooking nathi aavdti to hotel management thai shake?",
    answer: "Haan 100%! Hotel management ma 4 departments che - Front Office, F&B Service, Housekeeping, and Food Production. Only Food Production ma cooking jruri che. Front Office (reception) ane Housekeeping ma cooking nathi jruri - ane aa departments ma fastest career growth che. GM (General Manager) mostly Front Office background thi aave che!"
  },
  {
    question: "Internship ma pagar male che ke nai?",
    answer: "Haan! Wings Institute students ne 6 months mandatory internship hoy che Taj, Marriott, Hyatt, ITC ma. Stipend ₹1,500 thi ₹5,000/month male che property ane location par depend kare. Tips pan male, meals free, koi koi jagya accommodation pan. 60-70% students ne permanent job offer male che same hotel thi!"
  },
  {
    question: "Cruise ship ma job kevi rite male hotel management pachhi?",
    answer: "Hotel management graduates ne cruise companies prefer kare che! Royal Caribbean, Carnival, MSC ma tax-free ₹80,000-2,00,000/month salary hoy. Requirements: 1-2 years 5-star hotel experience, basic swimming, medical fitness, passport. Wings Institute internship aa experience aape che. Course pachhi 1-2 year hotel karo, pachhi cruise apply karo."
  },
  {
    question: "Hotel management fresher salary ketli hoy India ma?",
    answer: "Starting salary depend kare hotel par: 3-4 star hotels ma ₹15,000-25,000/month. 5-star (Taj, Oberoi, Marriott) ma ₹18,000-30,000 + tips + meals. Dubai/Singapore ma freshers ₹50,000-80,000 male. 3-5 years pachhi supervisor level par ₹50,000-1,00,000. Tips ane service charge extra - kai months ma double salary jaay!"
  },
  {
    question: "Front Office su che hotel ma?",
    answer: "Front Office hotel no 'face' che - guest pehla ane chella ahi j aave. Work: check-in/check-out, room booking, guest complaints handle karvu, billing, VIP guest relations. Property Management Systems (PMS) shikhvu pade - Opera, Fidelio software. Front Office thi GM sudhi nu path fastest che hospitality ma!"
  },
  {
    question: "Potanu restaurant cafe kholvu che - aa course help karase?",
    answer: "100% karase! Wings curriculum ma food costing, menu planning, kitchen management, customer service, basic business operations badhu shikhvay che. Amara alumni Vadodara, Ahmedabad ma successful restaurants, cafes, cloud kitchens, catering businesses chalaye che. Practical training + industry connections = business success!"
  },
  {
    question: "Age limit che hotel management course mate?",
    answer: "Wings Institute ma 17-28 years candidates accept che. Pan hotel industry ma job mate NO upper age limit! Air hostess thi different che - hotel ma 50-60 years sudhi kaam kari shakay. Career growth: Trainee → Executive → Supervisor → Manager → General Manager. Long-term stable career che."
  },
  {
    question: "3 year degree karu ke 1 year diploma - su best che?",
    answer: "Gujarat Paradigm follow karo: 1-year diploma best che! 3-year degree = theory heavy, 2 extra years college. 1-year Wings diploma = 100% practical skills + 6 months paid internship. Hotels skills, grooming, attitude par hire kare - marksheet nathi jota. Diploma students 2 years pehla earning start kare degree students thi!"
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
    "@id": "https://wingsinstitute.com/hotel-mgmt#course",
    "name": "Hotel Management",
    "alternateName": "Diploma in Hotel Management & Hospitality Operations",
    "description": "A 12-month program with six months of classroom training and a six-month paid hotel internship, covering front-office operations, F&B service, housekeeping, and culinary fundamentals.",
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
        "name": "Experienced Hoteliers",
        "description": "Industry professionals from 5-star hotel backgrounds"
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
    "educationalCredentialAwarded": "Diploma in Hotel Management",
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "name": "Hotel Management Professional Certificate",
      "credentialCategory": "diploma"
    },
    "teaches": [
      { "@type": "DefinedTerm", "name": "Front office operations", "sameAs": "https://www.wikidata.org/wiki/Q1057973" },
      { "@type": "DefinedTerm", "name": "Culinary arts", "sameAs": "https://www.wikidata.org/wiki/Q339025" },
      { "@type": "DefinedTerm", "name": "Food and beverage service", "sameAs": "https://www.wikidata.org/wiki/Q5465513" },
      { "@type": "DefinedTerm", "name": "Housekeeping management" },
      { "@type": "DefinedTerm", "name": "Property Management System (PMS)" },
      { "@type": "DefinedTerm", "name": "Guest relations & hospitality" }
    ],
    "coursePrerequisites": "12th Pass (any stream), Age 17-28 years",
    "numberOfCredits": 12,
    "timeRequired": "P12M",
    "inLanguage": ["en", "hi", "gu"],
    "image": {
      "@type": "ImageObject",
      "url": "/images/slider-images/hotel-management-course.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Hotel management students practicing front desk operations and guest services at Wings Institute Vadodara",
      "contentLocation": {
        "@type": "Place",
        "name": "Wings Institute Mock Hotel Reception",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3151688,
          "longitude": 73.1707874
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "112",
      "bestRating": "5"
    },
    // Voice Search: Speakable specification for course descriptions
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".hotel-management-course-summary",
        ".course-description-heading",
        ".course-highlights"
      ],
      "xpath": [
        "//*[@id='hotel-management-course-description']",
        "//section[contains(@class, 'course-overview')]/p[1]"
      ]
    },
    // Voice Search: Additional properties for Answer Engine Optimization
    "keywords": "best hotel management course Vadodara, hospitality training Gujarat, hotel management training Alkapuri, hospitality course near me, hotel management institute Gujarat, front office training India, hotel management academy Vadodara, hotel management fees Vadodara, best hospitality training institute Gujarat 2026",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Career aspirants seeking hospitality and hotel industry jobs"
    },
    "learningResourceType": "Practical Training Program with Industrial Internship",
    "competencyRequired": "Basic English communication, 10th/12th pass qualification"
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
      { "@type": "ListItem", "position": 3, "name": "Hotel Management", "item": "https://wingsinstitute.com/hotel-mgmt" }
    ]
  };
};

export function HotelManagementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Save scroll position before navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        sessionStorage.setItem('seo-scroll-hotel-management', String(scrollPosition));
      };

      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href="/admissions"]');
        if (link) {
          const scrollPosition = window.scrollY || window.pageYOffset;
          sessionStorage.setItem('seo-scroll-hotel-management', String(scrollPosition));
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('click', handleLinkClick);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('click', handleLinkClick);
      };
    }
  }, []);

  // Restore expanded state and scroll position from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = 'seo-expanded-hotel-management';
      const scrollKey = 'seo-scroll-hotel-management';
      const savedState = sessionStorage.getItem(storageKey);
      const savedScroll = sessionStorage.getItem(scrollKey);
      const urlHash = window.location.hash;
      
      if (savedState === 'true' || urlHash === '#seo-content') {
        setIsExpanded(true);
        setTimeout(() => {
          if (savedScroll) {
            const scrollPos = parseInt(savedScroll, 10);
            window.scrollTo({ top: scrollPos, behavior: 'auto' });
            sessionStorage.removeItem(scrollKey);
          } else {
            const section = document.getElementById('hotel-management-seo-content');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 300);
      }
    }
  }, []);

  // Save expanded state to sessionStorage when it changes
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (typeof window !== 'undefined') {
      const storageKey = 'seo-expanded-hotel-management';
      sessionStorage.setItem(storageKey, String(newState));
    }
  };

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
      { id: 'hotel-management-course-schema', data: generateCourseSchema() },
      { id: 'hotel-management-faq-schema', data: generateFAQSchema() },
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
          onClick={handleToggle}
          id="hotel-management-seo-content"
          className="w-full group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('hm.seo_title')}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('hm.seo_subtitle')}
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
            {/* SECTION 1: THE SKILL-BASED ADVANTAGE */}
            {/* ============================================ */}
            <section id="diploma-hotel-management-vadodara">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-amber-500 rounded-full"></span>
                {t('hm.sec1_title')}
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec1_p1')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec1_p2')) }} />

              <div className="my-8 p-6 bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-l-4 border-amber-500 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Target className="w-5 h-5 text-amber-500" />
                  {t('hm.paradigm_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('hm.paradigm_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <h4 className={`font-bold text-zinc-900 dark:text-white mb-2 text-red-600 ${vernacularHeading}`}>{t('hm.student_a_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('hm.student_a_1')}</li>
                      <li>• {t('hm.student_a_2')}</li>
                      <li>• {t('hm.student_a_3')}</li>
                      <li>• {t('hm.student_a_4')}</li>
                      <li>• {t('hm.student_a_5')}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-500/30">
                    <h4 className={`font-bold text-amber-600 mb-2 ${vernacularHeading}`}>{t('hm.student_b_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('hm.student_b_1')}</li>
                      <li>• {t('hm.student_b_2')}</li>
                      <li>• {t('hm.student_b_3')}</li>
                      <li>• {t('hm.student_b_4')}</li>
                      <li>• {t('hm.student_b_5')}</li>
                    </ul>
                  </div>
                </div>
                <p className={`text-amber-800 dark:text-amber-300 font-medium ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.paradigm_result')) }} />
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('hm.why_skills_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.why_skills_intro')) }} />

              <ul className={`my-4 space-y-3 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.skill1')) }} />
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.skill2')) }} />
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.skill3')) }} />
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.skill4')) }} />
                </li>
              </ul>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec1_closing')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 2: INFRASTRUCTURE & LABS */}
            {/* ============================================ */}
            <section id="hotel-management-infrastructure">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                {t('hm.sec2_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec2_intro')) }} />

              {/* Fine-Dine Mock Restaurant */}
              <div className="my-8 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <h3 className={`text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <Icons.Utensils className="w-4 h-4" />
                  </span>
                  {t('hm.mock_restaurant_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.mock_restaurant_intro')) }} />
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.mock_r1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('hm.mock_r2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('hm.mock_r3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('hm.mock_r4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('hm.mock_r5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('hm.mock_r6')}</span>
                  </li>
                </ul>
              </div>

              {/* Commercial Kitchen */}
              <div className="my-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/30">
                <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                    <Icons.ChefHat className="w-4 h-4" />
                  </span>
                  {t('hm.kitchen_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('hm.kitchen_intro')}
                </p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.kitchen1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('hm.kitchen2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('hm.kitchen3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.kitchen4')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('hm.kitchen5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('hm.kitchen6')}</span>
                  </li>
                </ul>
                <p className={`mt-4 text-sm text-red-700 dark:text-red-400 font-medium ${vernacularText}`}>
                  {t('hm.kitchen_culinary_link')} <Link href="/culinary-cooking-course" className="underline hover:no-underline font-bold cursor-pointer">{t('hm.kitchen_culinary_course')}</Link> {t('hm.kitchen_culinary_suffix')}
                </p>
              </div>

              {/* Front Office Lab */}
              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Icons.ConciergeBell className="w-4 h-4" />
                  </span>
                  {t('hm.frontoffice_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                  {t('hm.frontoffice_intro')}
                </p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.fo1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('hm.fo2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('hm.fo3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('hm.fo4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('hm.fo5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('hm.fo6')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 3: THE 4 PILLARS OF HOSPITALITY */}
            {/* ============================================ */}
            <section id="hotel-management-curriculum">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-purple-600 rounded-full"></span>
                {t('hm.sec3_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('hm.sec3_intro')}
              </p>

              {/* Pillar 1: Food Production */}
              <div className="my-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl border border-red-200 dark:border-red-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>{t('hm.pillar1_title')}</h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                      {t('hm.pillar1_intro')}
                    </p>
                    <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${vernacularListItem}`}>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_1')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_2')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_3')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_4')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_5')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-red-600" /> {t('hm.pillar1_6')}
                      </li>
                    </ul>
                    <p className={`mt-3 text-sm text-red-700 dark:text-red-400 ${vernacularText}`}>
                      {t('hm.pillar1_link')} <Link href="/culinary-cooking-course" className="underline hover:no-underline font-bold cursor-pointer">{t('hm.kitchen_culinary_course')}</Link>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 2: F&B Service */}
              <div className="my-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>{t('hm.pillar2_title')}</h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                      {t('hm.pillar2_intro')}
                    </p>
                    <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${vernacularListItem}`}>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_1')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_2')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_3')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_4')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_5')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-amber-600" /> {t('hm.pillar2_6')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Front Office */}
              <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>{t('hm.pillar3_title')}</h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                      {t('hm.pillar3_intro')}
                    </p>
                    <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${vernacularListItem}`}>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> {t('hm.pillar3_1')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> {t('hm.pillar3_2')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.pillar3_3')) }} />
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> {t('hm.pillar3_4')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> {t('hm.pillar3_5')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-blue-600" /> {t('hm.pillar3_6')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 4: Housekeeping */}
              <div className="my-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-2xl border border-teal-200 dark:border-teal-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                    04
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>{t('hm.pillar4_title')}</h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularParagraph}`}>
                      {t('hm.pillar4_intro')}
                    </p>
                    <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${vernacularListItem}`}>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_1')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_2')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_3')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_4')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_5')}
                      </li>
                      <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Icons.Check className="w-4 h-4 text-teal-600" /> {t('hm.pillar4_6')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('hm.sec3_closing')} <Link href="/#advantages" className="text-amber-600 font-semibold underline hover:no-underline cursor-pointer">{t('hm.sec3_pd_link')}</Link>{t('hm.sec3_closing2')}
              </p>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 4: THE INTERNSHIP EDGE */}
            {/* ============================================ */}
            <section id="hotel-management-internship">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                {t('hm.sec4_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec4_intro')) }} />

              <div className="my-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-800/30">
                <h3 className={`text-xl font-bold text-green-800 dark:text-green-300 mb-4 ${vernacularHeading}`}>{t('hm.intern_where')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Taj Hotels</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Marriott</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Hyatt</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">ITC Hotels</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Oberoi</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Radisson</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Leela</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Westin</span>
                  </div>
                </div>

                <h4 className={`font-bold text-zinc-900 dark:text-white mb-3 ${vernacularHeading}`}>{t('hm.intern_gain')}</h4>
                <ul className={`space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern1')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern2')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern3')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern4')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern5')) }} />
                  </li>
                </ul>
              </div>

              <div className="my-6 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
                <p className={`text-amber-800 dark:text-amber-300 font-medium flex items-start gap-2 ${vernacularParagraph}`}>
                  <Icons.Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.intern_hidden')) }} />
                </p>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 5: CAREER & SALARY */}
            {/* ============================================ */}
            <section id="hotel-management-salary-jobs">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
                {t('hm.sec5_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('hm.sec5_intro')}
              </p>

              {/* Salary Table */}
              <div className="my-8 overflow-x-auto">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('hm.salary_table_title')}</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-100 dark:bg-indigo-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('hm.table_role')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('hm.table_dept')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('hm.table_fresher')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('hm.table_exp')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Front Office Executive</td>
                      <td className="p-4">Reception</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                      <td className="p-4">₹35,000 - ₹50,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Guest Relations Executive</td>
                      <td className="p-4">Front Office</td>
                      <td className="p-4 text-green-600 font-bold">₹20,000 - ₹28,000</td>
                      <td className="p-4">₹40,000 - ₹60,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">F&amp;B Steward / Captain</td>
                      <td className="p-4">Restaurant</td>
                      <td className="p-4 text-green-600 font-bold">₹15,000 - ₹22,000</td>
                      <td className="p-4">₹30,000 - ₹45,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Restaurant Manager</td>
                      <td className="p-4">F&amp;B Service</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹35,000</td>
                      <td className="p-4">₹50,000 - ₹80,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Housekeeping Supervisor</td>
                      <td className="p-4">Housekeeping</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                      <td className="p-4">₹35,000 - ₹55,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">Executive Housekeeper</td>
                      <td className="p-4">Housekeeping</td>
                      <td className="p-4">—</td>
                      <td className="p-4">₹60,000 - ₹1,00,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">Commis Chef (Entry Level)</td>
                      <td className="p-4">Kitchen</td>
                      <td className="p-4 text-green-600 font-bold">₹15,000 - ₹20,000</td>
                      <td className="p-4">₹30,000 - ₹45,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Duty Manager / Asst. Manager</td>
                      <td className="p-4">Operations</td>
                      <td className="p-4">—</td>
                      <td className="p-4">₹50,000 - ₹90,000</td>
                    </tr>
                  </tbody>
                </table>
                <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-2 italic ${vernacularText}`}>
                  {t('hm.salary_note')}
                </p>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('hm.beyond_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('hm.beyond_intro')}
              </p>

              <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
                  <Icons.Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hm.beyond1_title')}</h4>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.beyond1_desc')}</p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
                  <Icons.Globe className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hm.beyond2_title')}</h4>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.beyond2_desc')}</p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
                  <Icons.Coffee className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hm.beyond3_title')}</h4>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.beyond3_desc')}</p>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 6: A DAY IN THE LIFE - NARRATIVE STORYTELLING */}
            {/* ============================================ */}
            <section id="day-in-life-hotel-management-student">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-amber-500 rounded-full"></span>
                {t('hm.sec6_title')}
              </h2>

              {/* Opening Hook */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/50 mb-8">
                <div className={`absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wide ${vernacularPill}`}>
                  {t('hm.sec6_badge')}
                </div>
                <p className={`text-lg md:text-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.sec6_quote')) }} />
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('hm.sec6_intro')}
              </p>

              {/* Morning: Grooming & Presentation */}
              <div className="mt-10 relative pl-8 border-l-4 border-amber-300 dark:border-amber-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.morning_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.morning_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.morning_p2')) }} />
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('hm.women_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('hm.women1')}</li>
                      <li>• {t('hm.women2')}</li>
                      <li>• {t('hm.women3')}</li>
                      <li>• {t('hm.women4')}</li>
                      <li>• {t('hm.women5')}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('hm.men_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('hm.men1')}</li>
                      <li>• {t('hm.men2')}</li>
                      <li>• {t('hm.men3')}</li>
                      <li>• {t('hm.men4')}</li>
                      <li>• {t('hm.men5')}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <p className={`text-sm text-amber-800 dark:text-amber-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.morning_tip')) }} />
                </div>
              </div>

              {/* Mid-Morning: Mock Restaurant Training */}
              <div className="mt-10 relative pl-8 border-l-4 border-rose-300 dark:border-rose-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.restaurant_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_p2')) }} />
                <blockquote className={`my-6 p-4 bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 rounded-r-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                  {t('hm.restaurant_quote')}
                </blockquote>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                  {t('hm.restaurant_p3')}
                </p>
                <ul className={`mt-6 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🥄</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_item1')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🍷</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_item2')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🎂</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_item3')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">😤</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.restaurant_item4')) }} />
                  </li>
                </ul>
              </div>

              {/* Noon: Spa & Wellness */}
              <div className="mt-10 relative pl-8 border-l-4 border-pink-300 dark:border-pink-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.spa_title_seo')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.spa_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('hm.spa_p2')}
                </p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🧴</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularHeading}`}>{t('hm.spa1_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.spa1_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">💇</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularHeading}`}>{t('hm.spa2_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.spa2_desc')}</p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
                    <div className="text-3xl mb-2">🕯️</div>
                    <h4 className={`font-bold text-pink-800 dark:text-pink-200 ${vernacularHeading}`}>{t('hm.spa3_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('hm.spa3_desc')}</p>
                  </div>
                </div>
                <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-xl border border-pink-200 dark:border-pink-700">
                  <p className={`text-sm text-pink-800 dark:text-pink-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.spa_career')) }} />
                </div>
              </div>

              {/* Afternoon: English & Communication */}
              <div className="mt-10 relative pl-8 border-l-4 border-emerald-300 dark:border-emerald-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.english_title_seo')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.english_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.english_p2')) }} />
                <div className="my-6 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h4 className={`font-bold text-emerald-800 dark:text-emerald-200 mb-4 ${vernacularHeading}`}>{t('hm.english_what_master')}</h4>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('hm.english_vocab_title')}</p>
                      <p className="text-sm">{t('hm.english_vocab_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('hm.english_phrases_title')}</p>
                      <p className="text-sm">{t('hm.english_phrases_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('hm.english_problem_title')}</p>
                      <p className="text-sm">{t('hm.english_problem_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularHeading}`}>{t('hm.english_upsell_title')}</p>
                      <p className="text-sm">{t('hm.english_upsell_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.english_story')) }} />
                </div>
              </div>

              {/* Late Afternoon: Interview Practice */}
              <div className="mt-10 relative pl-8 border-l-4 border-violet-300 dark:border-violet-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.interview_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.interview_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('hm.interview_p2')}
                </p>
                <ul className={`mt-6 space-y-4 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0">❓</span>
                    <div>
                      <p className={`font-bold ${vernacularHeading}`}>{t('hm.interview_q1')}</p>
                      <p className={`text-sm text-zinc-500 mt-1 ${vernacularText}`}>{t('hm.interview_a1')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0">❓</span>
                    <div>
                      <p className={`font-bold ${vernacularHeading}`}>{t('hm.interview_q2')}</p>
                      <p className={`text-sm text-zinc-500 mt-1 ${vernacularText}`}>{t('hm.interview_a2')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0">❓</span>
                    <div>
                      <p className={`font-bold ${vernacularHeading}`}>{t('hm.interview_q3')}</p>
                      <p className={`text-sm text-zinc-500 mt-1 ${vernacularText}`}>{t('hm.interview_a3')}</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl border border-violet-200 dark:border-violet-700">
                  <p className={`text-violet-800 dark:text-violet-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.interview_diff')) }} />
                </div>
              </div>

              {/* The 6+6 Model */}
              <div className="mt-10 relative pl-8 border-l-4 border-orange-300 dark:border-orange-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.model_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.model_intro')) }} />
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                    <h4 className={`font-bold text-orange-800 dark:text-orange-200 mb-3 text-xl ${vernacularHeading}`}>{t('hm.learn_title')}</h4>
                    <ul className={`text-zinc-700 dark:text-zinc-300 space-y-2 text-sm ${vernacularListItem}`}>
                      <li>✓ {t('hm.learn1')}</li>
                      <li>✓ {t('hm.learn2')}</li>
                      <li>✓ {t('hm.learn3')}</li>
                      <li>✓ {t('hm.learn4')}</li>
                      <li>✓ {t('hm.learn5')}</li>
                      <li>✓ {t('hm.learn6')}</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <h4 className={`font-bold text-green-800 dark:text-green-200 mb-3 text-xl ${vernacularHeading}`}>{t('hm.earn_title')}</h4>
                    <ul className={`text-zinc-700 dark:text-zinc-300 space-y-2 text-sm ${vernacularListItem}`}>
                      <li>✓ <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.earn1')) }} /></li>
                      <li>✓ {t('hm.earn2')}</li>
                      <li>✓ {t('hm.earn3')}</li>
                      <li>✓ {t('hm.earn4')}</li>
                      <li>✓ {t('hm.earn5')}</li>
                      <li>✓ {t('hm.earn6')}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.model_paradigm')) }} />
                </div>
              </div>

              {/* Internship Destinations */}
              <div className="mt-10 relative pl-8 border-l-4 border-indigo-300 dark:border-indigo-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.destinations_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.destinations_intro')) }} />
                <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Taj Hotels</span>
                    <p className="text-xs text-zinc-500 mt-1">Mumbai, Bengaluru, Goa</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Marriott</span>
                    <p className="text-xs text-zinc-500 mt-1">Delhi, Ahmedabad, Jaipur</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Oberoi</span>
                    <p className="text-xs text-zinc-500 mt-1">Mumbai, Udaipur</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Hyatt</span>
                    <p className="text-xs text-zinc-500 mt-1">Delhi, Chennai, Pune</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">ITC Hotels</span>
                    <p className="text-xs text-zinc-500 mt-1">Kolkata, Bengaluru</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Radisson</span>
                    <p className="text-xs text-zinc-500 mt-1">Vadodara, Ahmedabad</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">International</span>
                    <p className="text-xs text-zinc-500 mt-1">Dubai, Doha, Maldives</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center border border-zinc-200 dark:border-zinc-700">
                    <span className="font-bold text-zinc-900 dark:text-white">Cafés & QSR</span>
                    <p className="text-xs text-zinc-500 mt-1">Starbucks, Tata Neu, etc.</p>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-2xl border border-amber-500/20">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('hm.closing_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                  {t('hm.closing_p1')}
                </p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`}>
                  {t('hm.closing_p2')}
                </p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('hm.closing_p3')) }} />
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link 
                    href="/virtual-tour"
                    className={`px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors ${vernacularButton}`}
                  >
                    {t('hm.btn_campus_tour')}
                  </Link>
                  <Link 
                    href="/admissions"
                    className={`px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity ${vernacularButton}`}
                  >
                    {t('hm.btn_start_application')}
                  </Link>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 7: FAQ */}
            {/* ============================================ */}
            <section id="hotel-management-faq">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-pink-500 rounded-full"></span>
                {t('hm.faq_seo_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 mb-8 ${vernacularParagraph}`}>
                {t('hm.faq_seo_intro')}
              </p>

              <div className="space-y-6">
                {/* English FAQs Section */}
                {faqKeys.slice(0, 10).map((faq, index) => (
                  <div key={index} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                      {index + 1}. {t(faq.qKey)}
                    </h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                      {t(faq.aKey)}
                    </p>
                  </div>
                ))}
                
                {/* Vernacular Voice Search FAQs Section */}
                <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-700">
                  <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2 ${vernacularHeading}`}>
                    <span className="text-2xl">🗣️</span>
                    {t('hm.vfaq_header')}
                  </h3>
                  <div className="space-y-6">
                    {faqKeys.slice(10, 20).map((faq, index) => (
                      <div key={index + 10} className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200 dark:border-amber-800/30">
                        <h4 className={`text-lg font-bold text-amber-800 dark:text-amber-300 mb-2 ${vernacularHeading}`}>
                          {index + 11}. {t(faq.qKey)}
                        </h4>
                        <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                          {t(faq.aKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schema.org FAQ JSON-LD is automatically injected via useEffect */}
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>{t('hm.cta_title')}</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularParagraph}`}>
                {t('hm.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className={`px-8 py-4 bg-white text-amber-600 rounded-full font-bold hover:bg-zinc-100 transition-colors ${vernacularButton}`}
                >
                  {t('hm.cta_btn_apply')}
                </Link>
                <a 
                  href="tel:+918758754444"
                  className={`px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 ${vernacularButton}`}
                >
                  <Icons.Phone className="w-5 h-5" />
                  {t('hm.cta_btn_call')}
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
};

export default HotelManagementSEOContent;

