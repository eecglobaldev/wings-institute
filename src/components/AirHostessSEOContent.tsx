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
    question: "Do I need to know swimming to become a cabin crew?",
    answer: "Not necessarily for joining our course, but yes for airline selection. Most airlines require cabin crew to pass a basic swimming test (typically 25-50 metres without assistance) as part of their emergency training. If you cannot swim currently, we recommend enrolling in swimming classes during your course with us. Many of our students learn swimming while training at Wings—it is never too late to start."
  },
  {
    question: "Can I join if I wear glasses or contact lenses?",
    answer: "Yes, absolutely. Airlines accept candidates with corrected vision of 6/6 (or 6/9 correctable to 6/6). Both spectacles and contact lenses are permitted. However, for the interview and on-duty, most airlines prefer contact lenses for aesthetic uniformity. Candidates with very high prescriptions (above -5 or +5 diopters) should check specific airline requirements."
  },
  {
    question: "What is the age limit for air hostess recruitment?",
    answer: "For domestic airlines like Indigo and SpiceJet, the typical age range is 18-27 years for freshers. International airlines like Emirates and Qatar Airways accept candidates up to 30-32 years, and experienced crew can join even later. Our course is designed for candidates aged 17-26 years, as this gives you the best window for placement."
  },
  {
    question: "Is there any weight or BMI requirement for cabin crew?",
    answer: "Airlines do not specify exact weight, but they require candidates to have a proportionate weight-to-height ratio (generally BMI between 18-25). Our in-house fitness centre and yoga sessions help students achieve and maintain healthy BMI throughout the course. We also provide nutrition guidance and diet plans."
  },
  {
    question: "Can boys/males become cabin crew?",
    answer: "Absolutely yes! Male cabin crew (often called flight stewards or flight attendants) are actively hired by all airlines. In fact, international carriers like Emirates and Singapore Airlines have a significant percentage of male cabin crew. At Wings Institute, approximately 30% of our cabin crew students are male, and they enjoy equal placement opportunities."
  },
  {
    question: "What is the difference between Wings Institute diploma and the Indigo Cadet Program?",
    answer: "The Indigo ifly/Cadet Program is a direct airline recruitment programme that trains you specifically for Indigo. Our Wings Institute diploma prepares you for all airlines—domestic and international. We also cover ground staff, hotel management, and travel agency roles, giving you multiple career options. Additionally, our alumni have been selected by Indigo, so our training is equally competitive."
  },
  {
    question: "How many interviews will I get after completing the course?",
    answer: "We provide unlimited interview opportunities until you are placed. Our placement cell actively tracks airline and hotel recruitment drives across India and sends eligible students for interviews. On average, committed students attend 5-10 interviews within 6 months of course completion. Some crack their first attempt; others may need multiple tries—we support you throughout."
  },
  {
    question: "I am from a Gujarati medium school. Can I become cabin crew?",
    answer: "Yes, this is one of our specialities. Over 70% of our students come from Gujarati or Hindi medium backgrounds. Our Cambridge Spoken English module starts from the basics—alphabets if needed—and transforms you into a confident English speaker. Many of our successful alumni, including those now flying with Qatar Airways, started with limited English proficiency."
  },
  {
    question: "Are tattoos allowed for cabin crew?",
    answer: "Visible tattoos are generally not allowed. Tattoos on the face, neck, hands, and lower arms (areas visible in uniform) will disqualify you from most airline selections. Tattoos that can be covered by the uniform (upper arms, back, legs) are typically acceptable. If you are considering a tattoo, we strongly advise waiting until after your airline career is established."
  },
  {
    question: "Can I pursue a degree alongside the Wings Institute course?",
    answer: "Yes, our batches are designed for this. Classes run part-time (Monday to Friday, 4 hours daily), allowing you to pursue BA, B.Com, or any distance/open university degree simultaneously. Many of our students complete their graduation while training with us, giving them both a degree and industry-ready skills."
  },
  // ============================================================================
  // GUJARAT PARADIGM: Vernacular Voice Search FAQs (Gujlish/Hinglish)
  // These capture how Gujarati users actually speak to Google Assistant/Alexa
  // ============================================================================
  {
    question: "Air hostess course fees ketli che Wings Institute ma?",
    answer: "Wings Institute ma Air Hostess course fees approximately ₹1,30,000 che, je ma training materials, Airbus A330 mock cabin practice, grooming sessions, English classes, and placement assistance badhu include che. EMI option pan available che - 3-6 installments ma fee bhari shakay. Merit scholarship thi 30% sudhi discount pan male. Current offers mate +91-8758754444 par call karo."
  },
  {
    question: "Air hostess banne ke liye height kitni chahiye?",
    answer: "Girls mate minimum 155cm (5'1\") height jruri che, boys mate 170cm (5'7\"). Pan height apart, arm reach 212cm pan check thay che - koi koi short candidates arm reach pass kari ne select thay che. Height requirement meet nathi thatu? Ground staff ma same salary milti che ane NO height requirement! Wings ma both options shikhvay che."
  },
  {
    question: "Placement guarantee che Wings ma?",
    answer: "100% placement ASSISTANCE che - guarantee koi pan ethical institute nathi aapi shaktu. Wings Institute ma unlimited interview opportunities male che jya sudhi tame place nathi thata. Average placement rate 85%+ che. Alumni Qatar Airways, Emirates, Singapore Airlines, IndiGo, Taj Hotels ma kaam kare che. Placement cell actively airline drives track kare che."
  },
  {
    question: "Swimming aavdi jruri che air hostess mate?",
    answer: "Domestic airlines (IndiGo, SpiceJet) ma usually swimming test nathi hotu. International airlines (Emirates, Qatar Airways) ma 25-50 meter swimming aavdvi jruri che. Wings Institute ma course during pan swimming shikhi shakay - Vadodara ma swimming classes recommend karay che. Many students course during shikhae che!"
  },
  {
    question: "Gujarati medium thi cabin crew bani shakay ke nai?",
    answer: "100% bani shakay! Wings Institute na 70%+ students Gujarati/Hindi medium thi aave che. Amaro special Cambridge Spoken English module che jo basics thi start thay - alphabets thi shikhvay jrur pade to. Qatar Airways ma fly karta amara alumni pan originally Gujarati medium hata. English weak che? Tension nai, ama e fix kari daiye!"
  },
  {
    question: "Emirates Qatar Airways ma job kevi rite male?",
    answer: "International airlines India ma Open Day recruitment events kare che. Wings Institute students ne specifically Emirates/Qatar interviews mate prepare karay che - grooming, resume, body language, English accent training. Strategy: First IndiGo ma join thao, 1-2 years experience pachhi international jump karo. Wings alumni aa path successfully follow kare che."
  },
  {
    question: "Course duration ketla months che air hostess no?",
    answer: "Air Hostess course 12 months (1 year) che - part-time basis par daily 4 hours. 6 days a week classes hoy che (Mon-Sat). Course ma include che: Airbus A330 mock cabin training, safety drills, meal service, grooming, spoken English, interview preparation. Course pachhi unlimited placement assistance."
  },
  {
    question: "Boys pan cabin crew bani shake ke girls j?",
    answer: "Boys pan 100% bani shake! Male cabin crew ne flight steward kevaay. Emirates, Singapore Airlines ma 30-40% male crew hoy che. Wings Institute ma pan 30% students male che. Same training, same opportunities. International airlines ma male crew ni demand vadhti jay che."
  },
  {
    question: "Tattoo hoy to air hostess nai bani shakay?",
    answer: "Visible tattoos (face, neck, hands, lower arms) allowed NATHI - direct reject. Pan uniform thi dhankay teva tattoos (upper arm, back, legs) mostly allowed che. Tattoo karavu che? Pehla airline career establish karo, pachhi hidden areas ma karavo. Remove karvanu expensive che ane guaranteed nathi."
  },
  {
    question: "EMI option che ke nai fees ma Wings ma?",
    answer: "Haan! Wings Institute ma flexible EMI option available che. 3 thi 6 installments ma course fee bhari shakay. Down payment aapine baki EMI ma karo. Merit scholarship pan available - deserving students ne 20-30% fee discount. Education loan assistance pan provide karay che. +91-8758754444 par call karjo details mate."
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
    "@id": "https://wingsinstitute.com/air-hostess#course",
    "name": "Air Hostess Training",
    "alternateName": "Cabin Crew Training Course",
    "description": "A 12-month part-time aviation and hospitality program (4 hours daily) that transforms students into cabin-crew professionals. Training includes Airbus A330 mock cabin drills, safety procedures, grooming, and interview preparation.",
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
        "name": "Ex-Cabin Crew Instructors",
        "description": "Industry professionals with airline experience"
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
      "price": "130000",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "offeredBy": {
        "@id": "https://wingsinstitute.com/#organization"
      }
    },
    "educationalCredentialAwarded": "Professional Certificate in Aviation and Hospitality",
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "name": "Cabin Crew Professional Certificate",
      "credentialCategory": "certificate"
    },
    "teaches": [
      { "@type": "DefinedTerm", "name": "In-flight safety procedures", "sameAs": "https://www.wikidata.org/wiki/Q641680" },
      { "@type": "DefinedTerm", "name": "Meal service & hospitality", "sameAs": "https://www.wikidata.org/wiki/Q1261559" },
      { "@type": "DefinedTerm", "name": "Grooming and body language", "sameAs": "https://www.wikidata.org/wiki/Q1195679" },
      { "@type": "DefinedTerm", "name": "Emergency evacuation drills" },
      { "@type": "DefinedTerm", "name": "First aid and CPR" },
      { "@type": "DefinedTerm", "name": "Aviation English communication" }
    ],
    "coursePrerequisites": "12th Pass (any stream), Age 17-26 years, Minimum height: Female 155cm, Male 170cm",
    "numberOfCredits": 12,
    "timeRequired": "P12M",
    "inLanguage": ["en", "hi", "gu"],
    "image": {
      "@type": "ImageObject",
      "url": "/images/slider-images/meal-service-training.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Cabin crew trainees practicing meal service inside Airbus A330 mock aircraft at Wings Institute Vadodara",
      "contentLocation": {
        "@type": "Place",
        "name": "Wings Institute A330 Mock Cabin",
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
      "reviewCount": "156",
      "bestRating": "5"
    },
    // Voice Search: Speakable specification for course descriptions
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".air-hostess-course-summary",
        ".course-description-heading",
        ".course-highlights"
      ],
      "xpath": [
        "//*[@id='air-hostess-course-description']",
        "//section[contains(@class, 'course-overview')]/p[1]"
      ]
    },
    // Voice Search: Additional properties for Answer Engine Optimization
    "keywords": "best air hostess course Vadodara, cabin crew training Gujarat, air hostess training Alkapuri, aviation course near me, air hostess institute Gujarat, flight attendant course India, cabin crew academy Vadodara, air hostess fees Vadodara, best aviation training institute Gujarat 2026",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Career aspirants seeking aviation jobs"
    },
    "learningResourceType": "Practical Training Program",
    "competencyRequired": "Basic English communication, 12th pass qualification"
  };
};

// Generate BreadcrumbList Schema
const generateBreadcrumbSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wingsinstitute.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://wingsinstitute.com/#courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Air Hostess Training",
        "item": "https://wingsinstitute.com/air-hostess"
      }
    ]
  };
};

export function AirHostessSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Vernacular-specific styling classes
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
      { id: 'air-hostess-course-schema', data: generateCourseSchema() },
      { id: 'air-hostess-faq-schema', data: generateFAQSchema() },
      { id: 'air-hostess-breadcrumb-schema', data: generateBreadcrumbSchema() },
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
            <div className="w-12 h-12 rounded-xl bg-wings-red/10 flex items-center justify-center text-wings-red shrink-0">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5]' : 'leading-tight'}`}>
                {t('ah.seo_title')}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${isVernacular ? 'leading-[1.7] font-medium' : 'leading-normal'}`}>
                {t('ah.seo_subtitle')}
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
        </button>

        {/* Expandable Content */}
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-6 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 border border-zinc-200 dark:border-white/10 shadow-xl">
            
            {/* ============================================ */}
            {/* SECTION 1: THE HERO NARRATIVE */}
            {/* ============================================ */}
            <section id="air-hostess-training-vadodara">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-wings-red rounded-full"></span>
                {t('ah.hero_title')}
              </h2>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.hero_p1')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.hero_p2')) }} />

              <div className="my-8 p-6 bg-gradient-to-r from-wings-red/5 to-orange-500/5 border-l-4 border-wings-red rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Plane className="w-5 h-5 text-wings-red" />
                  {t('ah.wings_advantage_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.wings_advantage_intro')) }} />
                <ul className={`space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-wings-red shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.advantage_safety')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-wings-red shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.advantage_evacuation')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-wings-red shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.advantage_fire')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-wings-red shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.advantage_pa')) }} />
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-wings-red shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.advantage_meal')) }} />
                  </li>
                </ul>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.hero_p3')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.hero_p4')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 2: ELIGIBILITY & REALITY */}
            {/* ============================================ */}
            <section id="eligibility-cabin-crew">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
                {t('ah.elig_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.elig_intro')) }} />

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.height_title')}</h3>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.height_intro')}</p>

              <ul className={`my-6 space-y-3 ${vernacularListItem}`}>
                <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <span className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center text-sm font-bold shrink-0">F</span>
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.height_female')) }} />
                </li>
                <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">M</span>
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.height_male')) }} />
                </li>
              </ul>

              <div className="my-6 p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                <p className={`text-green-800 dark:text-green-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.height_reassurance')) }} />
                </p>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.skin_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.skin_intro')) }} />

              <ul className={`my-4 space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                <li>• {t('ah.skin_item1')}</li>
                <li>• {t('ah.skin_item2')}</li>
                <li>• {t('ah.skin_item3')}</li>
              </ul>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.skin_p2')) }} />

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.edu_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.edu_p1')) }} />

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.edu_p2')}</p>

              {/* Eligibility Comparison Table */}
              <div className="my-8 overflow-x-auto">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.table_title')}</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.table_criteria')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.table_indigo')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.table_airindia')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.table_intl')}</th>
                    </tr>
                  </thead>
                  <tbody className={`text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('ah.table_min_age')}</td>
                      <td className="p-4">{t('ah.table_val_18')}</td>
                      <td className="p-4">{t('ah.table_val_18')}</td>
                      <td className="p-4">{t('ah.table_val_21')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('ah.table_max_age')}</td>
                      <td className="p-4">{t('ah.table_val_27')}</td>
                      <td className="p-4">{t('ah.table_val_26')}</td>
                      <td className="p-4">{t('ah.table_val_no_limit')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('ah.table_height_f')}</td>
                      <td className="p-4">{t('ah.table_val_155')}</td>
                      <td className="p-4">{t('ah.table_val_157')}</td>
                      <td className="p-4">{t('ah.table_val_160')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('ah.table_height_m')}</td>
                      <td className="p-4">{t('ah.table_val_170')}</td>
                      <td className="p-4">{t('ah.table_val_170')}</td>
                      <td className="p-4">{t('ah.table_val_173')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('ah.table_education')}</td>
                      <td className="p-4">{t('ah.table_val_12th')}</td>
                      <td className="p-4">{t('ah.table_val_12th')}</td>
                      <td className="p-4">{t('ah.table_val_12th_eng')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('ah.table_marital')}</td>
                      <td className="p-4">{t('ah.table_val_unmarried')}</td>
                      <td className="p-4">{t('ah.table_val_no_restrict')}</td>
                      <td className="p-4">{t('ah.table_val_no_restrict')}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t('ah.table_vision')}</td>
                      <td className="p-4">{t('ah.table_val_vision_66')}</td>
                      <td className="p-4">{t('ah.table_val_vision_69')}</td>
                      <td className="p-4">{t('ah.table_val_contacts')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 3: DETAILED CURRICULUM */}
            {/* ============================================ */}
            <section id="cabin-crew-curriculum">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-purple-600 rounded-full"></span>
                {t('ah.curr_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.curr_intro')}</p>

              {/* Module A */}
              <div className="my-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/30">
                <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold">{t('ah.modA_badge')}</span>
                  {t('ah.modA_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.modA_intro')) }} />
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item1')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item6')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item7')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t('ah.modA_item8')}</span>
                  </li>
                </ul>
              </div>

              {/* Module B */}
              <div className="my-8 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <h3 className={`text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm font-bold">{t('ah.modB_badge')}</span>
                  {t('ah.modB_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('ah.modB_intro')}</p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item1')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('ah.modB_item6')}</span>
                  </li>
                </ul>
              </div>

              {/* Module C */}
              <div className="my-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-200 dark:border-pink-800/30">
                <h3 className={`text-xl font-bold text-pink-800 dark:text-pink-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center text-sm font-bold">{t('ah.modC_badge')}</span>
                  {t('ah.modC_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>
                  {t('ah.modC_intro')} <Link href="/virtual-tour" className={`text-wings-red font-semibold underline hover:no-underline cursor-pointer ${vernacularButton}`}>{t('ah.modC_link')}</Link>.
                </p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item1')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>{t('ah.modC_item6')}</span>
                  </li>
                </ul>
              </div>

              {/* Module D */}
              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{t('ah.modD_badge')}</span>
                  {t('ah.modD_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('ah.modD_intro')}</p>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${vernacularListItem}`}>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item1')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item2')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item3')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item4')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item5')}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icons.CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{t('ah.modD_item6')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 4: FEES & ROI */}
            {/* ============================================ */}
            <section id="cabin-crew-fees-roi">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                {t('ah.fees_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.fees_intro')}</p>

              <div className="my-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-800/30">
                <h3 className={`text-xl font-bold text-green-800 dark:text-green-300 mb-4 ${vernacularHeading}`}>{t('ah.roi_title')}</h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>{t('ah.roi_intro')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <h4 className={`font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>{t('ah.roi_optA_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('ah.roi_optA_duration')}</li>
                      <li>• {t('ah.roi_optA_fees')}</li>
                      <li>• {t('ah.roi_optA_total')}</li>
                      <li>• {t('ah.roi_optA_salary')}</li>
                      <li>• {t('ah.roi_optA_roi')}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-wings-red/5 dark:bg-wings-red/10 rounded-xl border-2 border-wings-red/20">
                    <h4 className={`font-bold text-wings-red mb-2 ${vernacularHeading}`}>{t('ah.roi_optB_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('ah.roi_optB_duration')}</li>
                      <li>• {t('ah.roi_optB_fees')}</li>
                      <li>• {t('ah.roi_optB_includes')}</li>
                      <li>• {t('ah.roi_optB_salary')}</li>
                      <li>• {t('ah.roi_optB_roi')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.fees_includes_title')}</h3>
              
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.fees_includes_intro')}</p>

              <ul className={`my-4 space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item3')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item4')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item5')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item6')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{t('ah.fees_item7')}</span>
                </li>
              </ul>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.payment_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.payment_intro')}</p>

              <ul className={`my-4 space-y-2 text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.payment_emi')) }} />
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.payment_merit')) }} />
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.payment_early')) }} />
                </li>
              </ul>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.payment_cta')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 5: PLACEMENT & SALARY */}
            {/* ============================================ */}
            <section id="cabin-crew-salary-placement">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
                {t('ah.placement_title')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.placement_intro')}</p>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.recruiters_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.recruiters_intro')}</p>

              <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Indigo Airlines</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Air India</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Vistara</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>SpiceJet</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Qatar Airways</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Emirates</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Singapore Airlines</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
                  <span className={`font-bold text-zinc-900 dark:text-white ${vernacularText}`}>Air Arabia</span>
                </div>
              </div>

              {/* Salary Table */}
              <div className="my-8 overflow-x-auto">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.salary_table_title')}</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-100 dark:bg-indigo-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.salary_role')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.salary_airline_type')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.salary_starting')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('ah.salary_after3')}</th>
                    </tr>
                  </thead>
                  <tbody className={`text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('ah.salary_cabin_crew')}</td>
                      <td className="p-4">{t('ah.salary_domestic')}</td>
                      <td className="p-4 text-green-600 font-bold">₹35,000 - ₹50,000</td>
                      <td className="p-4">₹60,000 - ₹80,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('ah.salary_cabin_crew')}</td>
                      <td className="p-4">{t('ah.salary_full_service')}</td>
                      <td className="p-4 text-green-600 font-bold">₹50,000 - ₹70,000</td>
                      <td className="p-4">₹80,000 - ₹1,00,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="p-4 font-medium">{t('ah.salary_cabin_crew')}</td>
                      <td className="p-4">{t('ah.salary_intl')}</td>
                      <td className="p-4 text-green-600 font-bold">₹1,00,000 - ₹1,50,000</td>
                      <td className="p-4">₹1,50,000 - ₹2,50,000</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className="p-4 font-medium">{t('ah.salary_ground_staff')}</td>
                      <td className="p-4">{t('ah.salary_airport_ops')}</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹35,000</td>
                      <td className="p-4">₹45,000 - ₹60,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t('ah.salary_gse')}</td>
                      <td className="p-4">{t('ah.salary_5star')}</td>
                      <td className="p-4 text-green-600 font-bold">₹25,000 - ₹40,000</td>
                      <td className="p-4">₹50,000 - ₹70,000</td>
                    </tr>
                  </tbody>
                </table>
                <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-2 italic ${vernacularText}`}>{t('ah.salary_note')}</p>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 ${vernacularHeading}`}>{t('ah.alumni_title')}</h3>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>{t('ah.alumni_intro')}</p>

              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-[#5C0632] to-[#8B0A50] rounded-2xl text-white">
                  <div className={`text-xs font-bold uppercase tracking-widest opacity-80 mb-2 ${vernacularPill}`}>{t('ah.alumni1_airline')}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Image src="/images/air-hostess-course-page/anal-desai-qatar-airways.jpg" alt="Aanal Desai" width={48} height={48} className="w-12 h-12 rounded-full" />
                    <h4 className={`text-xl font-bold ${vernacularHeading}`}>{t('ah.alumni1_name')}</h4>
                  </div>
                  <p className={`text-sm opacity-90 ${vernacularText}`}>{t('ah.alumni1_story')}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#000080] to-[#0000CD] rounded-2xl text-white">
                  <div className={`text-xs font-bold uppercase tracking-widest opacity-80 mb-2 ${vernacularPill}`}>{t('ah.alumni2_airline')}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Image src="/images/success-stories/Mohd-Fahad-Diwan.jpeg" alt="Mohd. Fahad Diwan" width={48} height={48} className="w-12 h-12 rounded-full" />
                    <h4 className={`text-xl font-bold ${vernacularHeading}`}>{t('ah.alumni2_name')}</h4>
                  </div>
                  <p className={`text-sm opacity-90 ${vernacularText}`}>{t('ah.alumni2_story')}</p>
                </div>
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('ah.alumni_cta')} <Link href="/placements" className={`text-wings-red font-semibold underline hover:no-underline cursor-pointer ${vernacularButton}`}>{t('ah.alumni_link')}</Link> {t('ah.alumni_suffix')}
              </p>
              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`}>
                {t('ah.ground_staff_intro')} <Link href="/airport-management" className={`text-wings-red font-semibold underline hover:no-underline cursor-pointer ${vernacularButton}`}>{t('ah.ground_staff_link')}</Link> {t('ah.ground_staff_suffix')}
              </p>

              {/* <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: `${t('ah.ground_staff_intro')} <button type="button" class="text-wings-red font-semibold underline hover:no-underline cursor-pointer">${t('ah.ground_staff_link')}</button> ${t('ah.ground_staff_suffix')}` }} /> */}
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 6: A DAY IN THE LIFE - NARRATIVE STORYTELLING */}
            {/* ============================================ */}
            <section id="day-in-life-cabin-crew-student">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-pink-500 rounded-full"></span>
                {t('ah.daylife_title')}
              </h2>

              {/* Opening Hook */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-2xl border border-pink-200 dark:border-pink-800/50 mb-8">
                <div className={`absolute -top-3 left-6 px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full uppercase tracking-wide ${vernacularPill}`}>
                  {t('ah.daylife_badge')}
                </div>
                <p className={`text-lg md:text-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.daylife_quote')) }} />
              </div>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.daylife_intro')) }} />

              {/* Morning: Grooming & Fitness */}
              <div className="mt-10 relative pl-8 border-l-4 border-pink-300 dark:border-pink-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('ah.morning_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.morning_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.morning_p2')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.morning_p3')) }} />
                <div className="mt-4 p-4 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                  <p className={`text-sm text-pink-800 dark:text-pink-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.morning_tip')) }} />
                </div>
              </div>

              {/* Late Morning: Mock Cabin Training */}
              <div className="mt-10 relative pl-8 border-l-4 border-sky-300 dark:border-sky-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('ah.mockcabin_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.mockcabin_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.mockcabin_p2')) }} />
                <blockquote className={`my-6 p-4 bg-sky-50 dark:bg-sky-950/30 border-l-4 border-sky-500 rounded-r-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>
                  {t('ah.mockcabin_quote')}
                </blockquote>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.mockcabin_p3')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.mockcabin_p4')}</p>
              </div>

              {/* Noon: Emergency Drills */}
              <div className="mt-10 relative pl-8 border-l-4 border-red-300 dark:border-red-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('ah.emergency_title')}
                </h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.emergency_p1')) }} />
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.emergency_p2')) }} />
                <ul className={`mt-6 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🔥</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.emergency_fire')) }} />
                  </li>
                </ul>
              </div>

              {/* Afternoon: First Aid & Medical */}
              <div className="mt-10 relative pl-8 border-l-4 border-green-300 dark:border-green-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.firstaid_title_seo')}</h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.firstaid_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.firstaid_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.firstaid_p3')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.firstaid_p4')}</p>
              </div>

              {/* Late Afternoon: English & Communication */}
              <div className="mt-10 relative pl-8 border-l-4 border-amber-300 dark:border-amber-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.english_title_seo')}</h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.english_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.english_p2')}</p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('ah.english_week1')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('ah.english_week1_desc')}</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('ah.english_week5')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('ah.english_week5_desc')}</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('ah.english_week13')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('ah.english_week13_desc')}</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                    <h4 className={`font-bold text-amber-800 dark:text-amber-200 mb-2 ${vernacularHeading}`}>{t('ah.english_ongoing')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('ah.english_ongoing_desc')}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl border border-amber-200 dark:border-amber-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.english_story')}</p>
                </div>
              </div>

              {/* Evening: Industry Connect */}
              <div className="mt-10 relative pl-8 border-l-4 border-violet-300 dark:border-violet-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.industry_title')}</h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.industry_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.industry_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.industry_p3')}</p>
              </div>

              {/* Internships */}
              <div className="mt-10 relative pl-8 border-l-4 border-indigo-300 dark:border-indigo-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.internship_title')}</h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.internship_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.internship_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.internship_p3')}</p>
              </div>

              {/* Closing */}
              <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-wings-red/10 to-pink-500/10 dark:from-wings-red/20 dark:to-pink-500/20 rounded-2xl border border-wings-red/20">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>{t('ah.daylife_closing_title')}</h3>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.daylife_closing_p1')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.daylife_closing_p2')}</p>
                <p className={`text-lg text-zinc-700 dark:text-zinc-300 mt-4 ${vernacularText}`}>{t('ah.daylife_closing_p3')}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link 
                    href="/virtual-tour"
                    className={`px-6 py-3 bg-wings-red text-white font-bold rounded-xl hover:bg-wings-red/90 transition-colors ${vernacularButton}`}
                  >
                    {t('ah.daylife_btn_tour')}
                  </Link>
                  <Link 
                    href="/admissions"
                    className={`px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity ${vernacularButton}`}
                  >
                    {t('ah.daylife_btn_apply')}
                  </Link>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 7: FAQ */}
            {/* ============================================ */}
            <section id="cabin-crew-faq">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                {t('ah.faq_title_seo')}
              </h2>

              <p className={`text-lg text-zinc-700 dark:text-zinc-300 mb-8 ${vernacularParagraph}`}>{t('ah.faq_intro')}</p>

              <div className="space-y-6">
                {/* FAQ 1 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>1. {t('ah.faq1_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq1_a')) }} />
                </div>

                {/* FAQ 2 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>2. {t('ah.faq2_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq2_a')) }} />
                </div>

                {/* FAQ 3 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>3. {t('ah.faq3_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq3_a')) }} />
                </div>

                {/* FAQ 4 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>4. {t('ah.faq4_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq4_a')) }} />
                </div>

                {/* FAQ 5 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>5. {t('ah.faq5_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq5_a')) }} />
                </div>

                {/* FAQ 6 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>6. {t('ah.faq6_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq6_a')) }} />
                </div>

                {/* FAQ 7 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>7. {t('ah.faq7_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq7_a')) }} />
                </div>

                {/* FAQ 8 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>8. {t('ah.faq8_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq8_a')) }} />
                </div>

                {/* FAQ 9 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>9. {t('ah.faq9_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq9_a')) }} />
                </div>

                {/* FAQ 10 */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>10. {t('ah.faq10_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('ah.faq10_a')) }} />
                </div>
              </div>

              <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

              {/* Vernacular FAQs */}
              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-6 ${vernacularHeading}`}>{t('ah.vfaq_header')}</h3>
              
              <div className="space-y-6">
                {/* Vernacular FAQ 1 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>1. {t('ah.vfaq1_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq1_a')}</p>
                </div>

                {/* Vernacular FAQ 2 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>2. {t('ah.vfaq2_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq2_a')}</p>
                </div>

                {/* Vernacular FAQ 3 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>3. {t('ah.vfaq3_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq3_a')}</p>
                </div>

                {/* Vernacular FAQ 4 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>4. {t('ah.vfaq4_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq4_a')}</p>
                </div>

                {/* Vernacular FAQ 5 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>5. {t('ah.vfaq5_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq5_a')}</p>
                </div>

                {/* Vernacular FAQ 6 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>6. {t('ah.vfaq6_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq6_a')}</p>
                </div>

                {/* Vernacular FAQ 7 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>7. {t('ah.vfaq7_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq7_a')}</p>
                </div>

                {/* Vernacular FAQ 8 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>8. {t('ah.vfaq8_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq8_a')}</p>
                </div>

                {/* Vernacular FAQ 9 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>9. {t('ah.vfaq9_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq9_a')}</p>
                </div>

                {/* Vernacular FAQ 10 */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <h3 className={`text-lg font-bold text-orange-800 dark:text-orange-300 mb-2 ${vernacularHeading}`}>10. {t('ah.vfaq10_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('ah.vfaq10_a')}</p>
                </div>
              </div>
            </section>

            <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-wings-red to-red-700 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>{t('ah.cta_title')}</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularText}`}>{t('ah.cta_desc')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admissions"
                  className={`px-8 py-4 bg-white text-wings-red rounded-full font-bold hover:bg-zinc-100 transition-colors ${vernacularButton}`}
                >
                  {t('ah.cta_btn_apply')}
                </Link>
                <a 
                  href="tel:+918758754444"
                  className={`px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors ${vernacularButton}`}
                >
                  {t('ah.cta_btn_call')}
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
};

export default AirHostessSEOContent;

