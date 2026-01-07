'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { markdownToHtml } from '@/utils/markdownToHtml';

// FAQ Data for Schema.org structured data
// Includes both English and vernacular (Gujlish/Hinglish) questions for Voice Search optimization
const faqData = [
  // EXISTING ENGLISH FAQs (Preserved)
  {
    question: "What is the salary of airport ground staff in India?",
    answer: "Airport ground staff salaries in India range from ₹18,000-25,000 per month for freshers (Customer Service Agent) to ₹45,000-80,000 for experienced Duty Managers. International ground handling companies like SATS, Celebi, and Menzies offer even higher packages. With 5-7 years of experience, you can reach Airport Manager level with salaries exceeding ₹1 Lakh per month."
  },
  {
    question: "Is there any height requirement for airport ground staff?",
    answer: "No, there are no strict height requirements for ground staff positions unlike cabin crew roles. Airlines and ground handling companies focus on your communication skills, professional appearance, and technical knowledge rather than physical attributes like height. This makes ground staff careers accessible to a wider range of candidates."
  },
  {
    question: "What is the difference between ground staff and cabin crew?",
    answer: "Cabin crew work inside the aircraft during flights, while ground staff work at the airport terminal. Ground staff handle check-in, boarding, baggage, security, and customer service on the ground. Ground staff enjoy more stable schedules, work near their home city, have no height restrictions, and experience less physical strain compared to cabin crew who travel constantly."
  },
  {
    question: "Can I get a job at Vadodara Airport after this course?",
    answer: "Yes, absolutely. Harni Airport (Vadodara) has regular recruitment drives for ground staff positions. Our alumni work at Vadodara Airport with airlines like IndiGo, SpiceJet, and Air India. We also place students at the larger Sardar Vallabhbhai Patel International Airport in Ahmedabad, which is just 100 km away and offers more opportunities."
  },
  {
    question: "What is AVSEC training and why is it important?",
    answer: "AVSEC stands for Aviation Security. It covers X-ray screening, passenger frisking, dangerous goods identification, and threat response protocols. AVSEC certification is mandatory for many airport security positions and gives you a significant edge in interviews. Wings Institute is one of the few institutes in India that includes AVSEC awareness training in the curriculum."
  },
  {
    question: "Do I need to know English to become airport ground staff?",
    answer: "Basic English communication is essential since you'll interact with passengers from across India and abroad. However, if you're from a Gujarati or Hindi medium background, don't worry—our Cambridge Spoken English module transforms you into a confident English speaker. Over 70% of our students start with limited English and become fluent by graduation."
  },
  {
    question: "What is CRS/GDS training and which software will I learn?",
    answer: "CRS (Computer Reservation System) and GDS (Global Distribution System) are airline booking software used worldwide. At Wings Institute, you'll receive hands-on training on Amadeus and Galileo—the two most widely used systems globally. This technical skill makes you valuable for ticketing counters, travel agencies, and airline reservation desks."
  },
  {
    question: "Is airport ground staff a good career for males?",
    answer: "Absolutely. In fact, ground staff roles like Ramp Agent, Cargo Handler, Security Executive, and Operations Supervisor have a high percentage of male employees. These roles involve logistics, security protocols, and operational management—areas where male candidates often excel and find long-term career satisfaction."
  },
  {
    question: "What is the age limit for airport ground staff jobs?",
    answer: "Most airlines and ground handling companies hire candidates between 18-28 years for entry-level positions. However, unlike cabin crew (which has stricter age limits), ground staff can continue working well into their 50s with career progression into management roles. This makes it a stable, long-term career choice."
  },
  {
    question: "How long does it take to get placed after completing the course?",
    answer: "On average, dedicated students receive job offers within 3-6 months of course completion. Some students get placed even before graduation during campus recruitment drives. We provide unlimited placement assistance—meaning we continue sending you for interviews until you're placed, regardless of how long it takes."
  },
  // ============================================================================
  // GUJARAT PARADIGM: Vernacular Voice Search FAQs (Gujlish/Hinglish)
  // ============================================================================
  {
    question: "Ground staff salary ketli hoy India ma?",
    answer: "Ground staff fresher salary ₹18,000-25,000/month thi start thay. 2-3 years pachhi ₹35,000-50,000 male. Duty Manager level par ₹60,000-80,000+. Airport Manager bano to ₹1 Lakh+ salary. International companies (SATS, Celebi) vadhare aape. Plus allowances, meals, transport - total package better che air hostess karta stability wise!"
  },
  {
    question: "Ground staff mate height jruri che ke nai?",
    answer: "NO! Ground staff mate koi height requirement nathi - aa sabse motu advantage che. Air hostess ma 155cm jruri, but ground staff ma nathi. Focus communication skills, professional appearance, ane technical knowledge par che. Height ochi che? Ground staff perfect option che - same airport environment, stable job, no height tension!"
  },
  {
    question: "Vadodara Airport ma job male ke nai?",
    answer: "Haan! Harni Airport (Vadodara) regularly recruitment kare che. Wings alumni IndiGo, SpiceJet, Air India ma Vadodara Airport par kaam kare che. Plus Ahmedabad International Airport (SVPI) only 100km dur che - bahut vadhare opportunities. Wings placement cell both airports track kare che."
  },
  {
    question: "Ground staff ane cabin crew ma farak su che?",
    answer: "Cabin crew plane ma flying kare che - travel constantly, hotels ma rehe. Ground staff airport terminal ma kaam kare - check-in, boarding, baggage, security. Ground staff GHAR jaay roj, stable schedule, no jet lag, no height restriction. Cabin crew glamorous, ground staff stable - choose according to your priority!"
  },
  {
    question: "AVSEC training su che? Jruri che ke?",
    answer: "AVSEC = Aviation Security. X-ray screening, passenger checking, dangerous goods identification, security protocols shikhvaay. Airport security jobs mate mandatory che. Wings Institute Gujarat ma few institutes ma thi che jo AVSEC awareness include kare. Aa training interview ma edge aape - security roles better salary pay kare."
  },
  {
    question: "Ground staff course duration ketlo che?",
    answer: "Wings Institute ma Airport Management course 12 months (1 year) che. Part-time basis - daily 4 hours, 6 days a week. Course ma DCS systems, Amadeus/Galileo GDS, AVSEC, ramp operations, customer service badhu cover thay. Practical training + placement assistance include che."
  },
  {
    question: "Gujarati medium thi ground staff bani shakay?",
    answer: "100% bani shakay! Basic English shikhvu padse - Wings ma Cambridge Spoken English module che. 70%+ students Gujarati/Hindi medium thi aave ane fluent English speakers bane course complete thyaa sudhi ma. Ground staff ma accent nathi jruri - clarity ane confidence jruri che jo ama shikhvaay!"
  },
  {
    question: "Boys mate ground staff better che ke girls mate?",
    answer: "Both mate excellent! Pan boys mate special advantage: Ramp Agent, Cargo Handler, Security Executive, Operations Supervisor - aa roles ma mostly male employees hoy che. Physical work, logistics, security - boys excel kare. Long-term career che, 50+ years sudhi kaam kari shakay."
  },
  {
    question: "GDS training su che? Kon sa software shikhvaay?",
    answer: "GDS = Global Distribution System - airline booking software che. Wings Institute ma Amadeus ane Galileo shikhvaay - worldwide most used systems. Ticketing counter, travel agency, airline reservation desk mate aa skills jruri che. Hands-on training mile - simulations nahi, real software!"
  },
  {
    question: "Ground staff course fees ketli che Wings ma?",
    answer: "Wings Institute ma Airport Management course approximately ₹1,18,000 che. EMI option available - 3-6 installments. Merit scholarship thi discount. Course ma badhu include: training materials, GDS software access, AVSEC awareness, placement assistance. Investment 6-12 months ma recover - first job thi!"
  }
];

// Generate Schema.org FAQPage JSON-LD
const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
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
    "@id": "https://wingsinstitute.com/airport-mgmt#course",
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
      "instructor": {
        "@type": "Person",
        "name": "Industry Professionals",
        "description": "Aviation industry experts with airport operations experience"
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
      "price": "118000",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "offeredBy": {
        "@id": "https://wingsinstitute.com/#organization"
      }
    },
    "educationalCredentialAwarded": "Diploma in Airport Management",
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "name": "Airport Ground Staff Professional Certificate",
      "credentialCategory": "diploma"
    },
    "teaches": [
      { "@type": "DefinedTerm", "name": "Ground operations", "sameAs": "https://www.wikidata.org/wiki/Q849706" },
      { "@type": "DefinedTerm", "name": "Airport hospitality", "sameAs": "https://www.wikidata.org/wiki/Q13376269" },
      { "@type": "DefinedTerm", "name": "Logistics", "sameAs": "https://www.wikidata.org/wiki/Q543425" },
      { "@type": "DefinedTerm", "name": "Departure Control System (DCS)" },
      { "@type": "DefinedTerm", "name": "Amadeus & Galileo GDS" },
      { "@type": "DefinedTerm", "name": "AVSEC (Aviation Security)" },
      { "@type": "DefinedTerm", "name": "Dangerous Goods Regulations (DGR)" }
    ],
    "coursePrerequisites": "12th Pass (any stream), Age 17-28 years",
    "numberOfCredits": 12,
    "timeRequired": "P12M",
    "inLanguage": ["en", "hi", "gu"],
    "image": {
      "@type": "ImageObject",
      "url": "/images/airport-management/airport-ground-staff.png",
      "width": 1200,
      "height": 630,
      "caption": "Airport management students learning GDS ticketing and check-in counter operations at Wings Institute Vadodara",
      "contentLocation": {
        "@type": "Place",
        "name": "Wings Institute Computer Lab",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3151688,
          "longitude": 73.1707874
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "89",
      "bestRating": "5"
    },
    // Voice Search: Speakable specification for course descriptions
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".airport-management-course-summary",
        ".course-description-heading",
        ".course-highlights"
      ],
      "xpath": [
        "//*[@id='airport-management-course-description']",
        "//section[contains(@class, 'course-overview')]/p[1]"
      ]
    },
    // Voice Search: Additional properties for Answer Engine Optimization
    "keywords": "best airport management course Vadodara, ground staff training Gujarat, airport ground staff training Alkapuri, aviation course near me, ground staff institute Gujarat, airport management training India, ground staff academy Vadodara, airport management fees Vadodara, best ground staff training institute Gujarat 2026, customer service agent training",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Career aspirants seeking airport and ground handling jobs"
    },
    "learningResourceType": "Practical Training Program",
    "competencyRequired": "Basic English communication, 12th pass qualification, no height restrictions"
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
      { "@type": "ListItem", "position": 3, "name": "Airport Management", "item": "https://wingsinstitute.com/airport-mgmt" }
    ]
  };
};

export function AirportManagementSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Save scroll position before navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        sessionStorage.setItem('seo-scroll-airport-management', String(scrollPosition));
      };

      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href="/admissions"]');
        if (link) {
          const scrollPosition = window.scrollY || window.pageYOffset;
          sessionStorage.setItem('seo-scroll-airport-management', String(scrollPosition));
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
      const storageKey = 'seo-expanded-airport-management';
      const scrollKey = 'seo-scroll-airport-management';
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
            const section = document.getElementById('airport-management-seo-content');
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
      const storageKey = 'seo-expanded-airport-management';
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
      { id: 'airport-management-course-schema', data: generateCourseSchema() },
      { id: 'airport-management-faq-schema', data: generateFAQSchema() },
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
          onClick={handleToggle}
          id="airport-management-seo-content"
          className="w-full group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('am.seo_title')}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('am.seo_subtitle')}
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
            {/* SECTION 1: THE BACKBONE OF AVIATION */}
            {/* ============================================ */}
            <section id="airport-ground-staff-training">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
                {t('am.hero_title')}
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.hero_p1')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.hero_p2')) }} />

              <div className="my-8 p-6 bg-gradient-to-r from-blue-600/5 to-indigo-500/5 border-l-4 border-blue-600 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Target className="w-5 h-5 text-blue-600" />
                  {t('am.who_for_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('am.who_for_intro')}</p>
                <ul className={`space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.who_for_1')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.who_for_2')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.who_for_3')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.who_for_4')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.who_for_5')) }} />
                  </li>
                </ul>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.hero_p3')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 2: TECHNICAL SYLLABUS */}
            {/* ============================================ */}
            <section id="airport-ground-staff-syllabus">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
                {t('am.syllabus_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.syllabus_intro')) }} />

              {/* Terminal Operations */}
              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                  {t('am.mod1_title_seo')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('am.mod1_intro')}</p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod1_item1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item6')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod1_item7')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('am.mod1_item8')}</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <p className={`text-sm text-blue-800 dark:text-blue-300 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod1_highlight')) }} />
                </div>
              </div>

              {/* Ramp Services */}
              <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800/30">
                <h3 className={`text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                  {t('am.mod2_title_seo')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('am.mod2_intro')}</p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod2_item1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('am.mod2_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod2_item3')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('am.mod2_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('am.mod2_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('am.mod2_item6')}</span>
                  </li>
                </ul>
              </div>

              {/* AVSEC Security */}
              <div className="my-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/30">
                <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold">3</span>
                  {t('am.mod3_title_seo')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod3_intro')) }} />
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod3_item1')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('am.mod3_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod3_item3')) }} />
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('am.mod3_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('am.mod3_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('am.mod3_item6')}</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className={`text-sm text-red-800 dark:text-red-300 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.mod3_highlight')) }} />
                </div>
              </div>

              {/* Cargo & Freight */}
              <div className="my-8 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <h3 className={`text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm font-bold">4</span>
                  {t('am.mod4_title_seo')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('am.mod4_intro')}</p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('am.mod4_item1')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('am.mod4_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('am.mod4_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('am.mod4_item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 3: LOCAL OPPORTUNITIES */}
            {/* ============================================ */}
            <section id="ground-staff-jobs-vadodara-gujarat">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-purple-600 rounded-full"></span>
                {t('am.jobs_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.jobs_intro')) }} />

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('am.airports_title')}</h3>
              
              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Icons.Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('am.airport1_name')}</h4>
                      <span className="text-xs text-zinc-500">IATA: BDQ</span>
                    </div>
                  </div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.airport1_desc')) }} />
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Icons.Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('am.airport2_name')}</h4>
                      <span className="text-xs text-zinc-500">IATA: AMD ({t('am.ahmedabad')})</span>
                    </div>
                  </div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.airport2_desc')) }} />
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Icons.Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('am.airport3_name')}</h4>
                      <span className="text-xs text-zinc-500">IATA: STV</span>
                    </div>
                  </div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.airport3_desc')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                      <Icons.Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('am.airport4_name')}</h4>
                      <span className="text-xs text-zinc-500">IATA: RAJ</span>
                    </div>
                  </div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.airport4_desc')}</p>
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('am.roles_title')}</h3>

              <div className="my-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.table_role')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.table_dept')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.table_resp')}</th>
                    </tr>
                  </thead>
                  <tbody className={`text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.role1_name')}</td>
                      <td className="p-4">{t('am.role1_dept')}</td>
                      <td className="p-4">{t('am.role1_resp')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.role2_name')}</td>
                      <td className="p-4">{t('am.role2_dept')}</td>
                      <td className="p-4">{t('am.role2_resp')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.role3_name')}</td>
                      <td className="p-4">{t('am.role3_dept')}</td>
                      <td className="p-4">{t('am.role3_resp')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.role4_name')}</td>
                      <td className="p-4">{t('am.role4_dept')}</td>
                      <td className="p-4">{t('am.role4_resp')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.role5_name')}</td>
                      <td className="p-4">{t('am.role5_dept')}</td>
                      <td className="p-4">{t('am.role5_resp')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.role6_name')}</td>
                      <td className="p-4">{t('am.role6_dept')}</td>
                      <td className="p-4">{t('am.role6_resp')}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t('am.role7_name')}</td>
                      <td className="p-4">{t('am.role7_dept')}</td>
                      <td className="p-4">{t('am.role7_resp')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('am.alumni_title')}</h3>

              <div className="my-6 p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    <Image src="/images/success-stories/Riya-Parmar.jpg" alt={t('am.alumni_img_alt')} width={80} height={80} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-zinc-900 dark:text-white mb-1 ${vernacularHeading}`}>{t('am.alumni_name')}</h4>
                    <p className={`text-amber-700 dark:text-amber-400 font-medium mb-3 ${vernacularPill}`}>{t('am.alumni_role')}</p>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('am.alumni_quote')}</p>
                  </div>
                </div>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('am.travel_tourism_intro')} <Link href="/travel-tourism-management" className={`text-blue-600 font-semibold underline hover:no-underline cursor-pointer ${vernacularButton}`}>{t('am.travel_tourism_link')}</Link> {t('am.travel_tourism_suffix')}
              </p>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 4: SALARY & GROWTH */}
            {/* ============================================ */}
            <section id="ground-staff-salary-structure">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                {t('am.salary_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('am.salary_intro')}</p>

              {/* Career Progression Table */}
              <div className="my-8 overflow-x-auto">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('am.salary_table_title')}</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.sal_level')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.sal_designation')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.sal_experience')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.sal_monthly')}</th>
                    </tr>
                  </thead>
                  <tbody className={`text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_entry')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row1_title')}</td>
                      <td className="p-4">{t('am.sal_row1_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹18,000 - ₹25,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-blue-200 dark:bg-blue-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_junior')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row2_title')}</td>
                      <td className="p-4">{t('am.sal_row2_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹35,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-indigo-200 dark:bg-indigo-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_mid')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row3_title')}</td>
                      <td className="p-4">{t('am.sal_row3_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹35,000 - ₹45,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_senior')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row4_title')}</td>
                      <td className="p-4">{t('am.sal_row4_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹45,000 - ₹80,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-amber-200 dark:bg-amber-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_management')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row5_title')}</td>
                      <td className="p-4">{t('am.sal_row5_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹80,000 - ₹1,20,000</td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <span className={`px-2 py-1 bg-red-200 dark:bg-red-700 rounded text-xs font-bold ${vernacularPill}`}>{t('am.level_executive')}</span>
                      </td>
                      <td className="p-4 font-medium">{t('am.sal_row6_title')}</td>
                      <td className="p-4">{t('am.sal_row6_exp')}</td>
                      <td className="p-4 text-green-600 font-bold">₹1,20,000 - ₹2,50,000</td>
                    </tr>
                  </tbody>
                </table>
                <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-2 italic ${vernacularText}`}>{t('am.salary_note')}</p>
              </div>

              <div className="my-6 p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                <p className={`text-green-800 dark:text-green-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.TrendingUp className="w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.career_longevity')) }} />
                </p>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 5: CABIN CREW VS GROUND STAFF */}
            {/* ============================================ */}
            <section id="cabin-crew-vs-ground-staff">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                {t('am.compare_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('am.compare_intro')}</p>

              {/* Comparison Table */}
              <div className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-orange-100 dark:bg-orange-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.cmp_factor')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.cmp_cabin')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('am.cmp_ground')}</th>
                    </tr>
                  </thead>
                  <tbody className={`text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.cmp_row1_factor')}</td>
                      <td className="p-4">{t('am.cmp_row1_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row1_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.cmp_row2_factor')}</td>
                      <td className="p-4">{t('am.cmp_row2_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row2_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.cmp_row3_factor')}</td>
                      <td className="p-4 text-red-600">{t('am.cmp_row3_cabin')}</td>
                      <td className="p-4 text-green-600">{t('am.cmp_row3_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.cmp_row4_factor')}</td>
                      <td className="p-4">{t('am.cmp_row4_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row4_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.cmp_row5_factor')}</td>
                      <td className="p-4 text-amber-600">{t('am.cmp_row5_cabin')}</td>
                      <td className="p-4 text-green-600">{t('am.cmp_row5_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.cmp_row6_factor')}</td>
                      <td className="p-4">{t('am.cmp_row6_cabin')}</td>
                      <td className="p-4 text-green-600">{t('am.cmp_row6_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.cmp_row7_factor')}</td>
                      <td className="p-4">{t('am.cmp_row7_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row7_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('am.cmp_row8_factor')}</td>
                      <td className="p-4">{t('am.cmp_row8_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row8_ground')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('am.cmp_row9_factor')}</td>
                      <td className="p-4 text-green-600">{t('am.cmp_row9_cabin')}</td>
                      <td className="p-4">{t('am.cmp_row9_ground')}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t('am.cmp_row10_factor')}</td>
                      <td className="p-4">{t('am.cmp_row10_cabin')}</td>
                      <td className="p-4 text-green-600">{t('am.cmp_row10_ground')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <p className={`text-blue-800 dark:text-blue-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.Info className="w-5 h-5 shrink-0 mt-0.5" />
                 <Link href="/air-hostess-training" className={`text-wings-red font-semibold underline hover:no-underline cursor-pointer ${vernacularButton}`}>{t('am.wings_advantage_title')}</Link>

                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.wings_advantage')) }} />
                </p>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 6: A DAY IN THE LIFE - NARRATIVE STORYTELLING */}
            {/* ============================================ */}
            <section id="day-in-life-ground-staff-student">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-cyan-500 rounded-full"></span>
                {t('am.daylife_title')}
              </h2>

              {/* Opening Hook */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 mb-8">
                <div className={`absolute -top-3 left-6 px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full uppercase tracking-wide ${vernacularPill}`}>
                  {t('am.daylife_badge')}
                </div>
                <p className={`text-lg md:text-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.daylife_quote')) }} />
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.daylife_intro')) }} />

              {/* Morning: Grooming & Presentation */}
              <div className="mt-10 relative pl-8 border-l-4 border-cyan-300 dark:border-cyan-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.morning_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.morning_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.morning_p2')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.morning_p3')}</p>
                <div className="mt-4 p-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                  <p className={`text-sm text-cyan-800 dark:text-cyan-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.morning_tip')) }} />
                </div>
              </div>

              {/* Mid-Morning: GDS & Ticketing */}
              <div className="mt-10 relative pl-8 border-l-4 border-blue-300 dark:border-blue-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.gds_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.gds_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.gds_p2')) }} />
                <blockquote className={`my-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded-r-xl font-mono text-sm text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>
                  <p>{t('am.gds_command')}</p>
                  <p className="mt-2 text-zinc-500">{t('am.gds_command_trans')}</p>
                </blockquote>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('am.gds_p3')}</p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Amadeus</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('am.gds_amadeus')}</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Galileo</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('am.gds_galileo')}</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">DCS</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('am.gds_dcs')}</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
                  <p className={`text-sm text-blue-800 dark:text-blue-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.gds_career_boost')) }} />
                </div>
              </div>

              {/* Late Morning: Check-in Simulation */}
              <div className="mt-10 relative pl-8 border-l-4 border-emerald-300 dark:border-emerald-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.checkin_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.checkin_p2')}</p>
                <ul className={`mt-4 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">😤</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_scenario1')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">😰</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_scenario2')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🧳</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_scenario3')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">👴</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_scenario4')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">👶</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.checkin_scenario5')) }} />
                  </li>
                </ul>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-6 ${vernacularText}`}>{t('am.checkin_p3')}</p>
              </div>

              {/* Afternoon: Customer Service & Personality */}
              <div className="mt-10 relative pl-8 border-l-4 border-violet-300 dark:border-violet-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.personality_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.personality_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.personality_p2')}</p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
                    <h4 className={`font-bold text-violet-800 dark:text-violet-200 mb-2 ${vernacularHeading}`}>{t('am.personality_card1_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.personality_card1_desc')}</p>
                  </div>
                  <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
                    <h4 className={`font-bold text-violet-800 dark:text-violet-200 mb-2 ${vernacularHeading}`}>{t('am.personality_card2_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.personality_card2_desc')}</p>
                  </div>
                  <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
                    <h4 className={`font-bold text-violet-800 dark:text-violet-200 mb-2 ${vernacularHeading}`}>{t('am.personality_card3_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.personality_card3_desc')}</p>
                  </div>
                  <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
                    <h4 className={`font-bold text-violet-800 dark:text-violet-200 mb-2 ${vernacularHeading}`}>{t('am.personality_card4_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.personality_card4_desc')}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl border border-violet-200 dark:border-violet-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.personality_story')) }} />
                </div>
              </div>

              {/* Late Afternoon: Security & AVSEC */}
              <div className="mt-10 relative pl-8 border-l-4 border-red-300 dark:border-red-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.avsec_title_seo')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.avsec_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.avsec_p2')}</p>
                <div className="my-6 p-6 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className={`font-bold text-red-800 dark:text-red-200 mb-4 ${vernacularHeading}`}>{t('am.avsec_learn_title')}</h4>
                  <ul className={`space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item3')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item4')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item5')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span>{t('am.avsec_item6')}</span>
                    </li>
                  </ul>
                </div>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('am.avsec_p3')}</p>
              </div>

              {/* Evening: Cambridge English */}
              <div className="mt-10 relative pl-8 border-l-4 border-amber-300 dark:border-amber-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.english_title_seo')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.english_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.english_p3')}</p>
                <ul className={`mt-4 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">🎤</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_item1')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">🗣️</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_item2')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">📢</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_item3')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">🎯</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_item4')) }} />
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-700">
                  <p className={`text-amber-800 dark:text-amber-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.english_promise')) }} />
                </div>
              </div>

            

              {/* Internship Experience */}
              <div className="mt-10 relative pl-8 border-l-4 border-teal-300 dark:border-teal-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.internship_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.internship_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.internship_p2')) }} />
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl">
                    <h4 className={`font-bold text-teal-800 dark:text-teal-200 mb-2 ${vernacularHeading}`}>{t('am.internship_loc1_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.internship_loc1_desc')}</p>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl">
                    <h4 className={`font-bold text-teal-800 dark:text-teal-200 mb-2 ${vernacularHeading}`}>{t('am.internship_loc2_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('am.internship_loc2_desc')}</p>
                  </div>
                </div>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('am.internship_p3')}</p>
              </div>

              {/* Closing */}
              <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-2xl border border-cyan-500/20">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('am.closing_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('am.closing_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('am.closing_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('am.closing_p3')) }} />
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link 
                    href="/virtual-tour"
                    className={`px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors ${vernacularButton}`}
                  >
                    {t('am.btn_campus_tour')}
                  </Link>
                  <Link 
                    href="/admissions"
                    className={`px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity ${vernacularButton}`}
                  >
                    {t('am.btn_start_application')}
                  </Link>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 7: FAQ */}
            {/* ============================================ */}
            <section id="ground-staff-faq">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-teal-500 rounded-full"></span>
                {t('am.faq_title_seo')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 mb-8 ${vernacularParagraph}`}>{t('am.faq_intro')}</p>

              {/* English FAQs */}
              <div className="space-y-6">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                  <div key={num} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                      {num}. {t(`am.faq${num}_q`)}
                    </h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t(`am.faq${num}_a`)) }} />
                  </div>
                ))}
              </div>

              {/* Vernacular FAQs */}
              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-6 ${vernacularHeading}`}>{t('am.vfaq_header')}</h3>
              <div className="space-y-6">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                  <div key={num} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                      {num}. {t(`am.vfaq${num}_q`)}
                    </h3>
                    <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t(`am.vfaq${num}_a`)}</p>
                  </div>
                ))}
              </div>

              {/* Schema.org FAQ JSON-LD is automatically injected via useEffect */}
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>{t('am.cta_title')}</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularText}`}>{t('am.cta_desc')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className={`px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-zinc-100 transition-colors ${vernacularButton}`}
                >
                  {t('am.cta_btn_apply')}
                </Link>
                <a 
                  href="tel:+918758754444"
                  className={`px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 ${vernacularButton}`}
                >
                  <Icons.Phone className="w-5 h-5" />
                  {t('am.cta_btn_call')}
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
};

export default AirportManagementSEOContent;

