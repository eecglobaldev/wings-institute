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
    question: "What is GDS training and why is it important for travel careers?",
    answer: "GDS (Global Distribution System) is the software backbone of the travel industry. Amadeus, Galileo, and Sabre are the three major GDS platforms used by airlines, hotels, and travel agencies worldwide to book tickets, manage reservations, and access real-time inventory. Without GDS skills, you cannot work in airline ticketing, travel agencies, or corporate travel management. At Wings Institute, you get hands-on training on actual GDS terminals—not just simulations—making you immediately employable."
  },
  {
    question: "Can I open my own travel agency after this course?",
    answer: "Absolutely! Our curriculum is specifically designed for the Gujarati entrepreneurial mindset. You'll learn business registration (MSME, GST), IATA accreditation process, vendor tie-ups with hotels and transporters, tour costing and profit margins, and digital marketing for travel agencies. Many of our alumni like Vashisth Shukal, Jenil Patel, and Tauseef Patel have successfully started their own travel companies in Vadodara, Ahmedabad, and Dubai."
  },
  {
    question: "What is the difference between IATA and non-IATA travel agencies?",
    answer: "IATA-accredited agencies can issue airline tickets directly and earn higher commissions. Non-IATA agencies must book through consolidators, earning lower margins. While IATA accreditation requires a substantial security deposit (₹20-50 Lakhs), many successful agencies operate as non-IATA initially and grow into IATA status. Our course covers both models so you can choose the path that fits your investment capacity."
  },
  {
    question: "Is there demand for travel professionals after COVID-19?",
    answer: "The travel industry is experiencing a massive resurgence. India's domestic travel market grew 35% in 2023, and international departures have exceeded pre-pandemic levels. The demand for trained travel consultants—especially those skilled in visa processing and GDS operations—has never been higher. Companies are actively hiring to meet the pent-up travel demand, creating excellent opportunities for fresh graduates."
  },
  {
    question: "What is the salary of a travel consultant or ticketing agent in India?",
    answer: "Freshers typically start at ₹12,000-18,000 per month in travel agencies or airline GSAs (General Sales Agents). With 2-3 years of experience and GDS expertise, salaries rise to ₹25,000-40,000. Senior travel consultants and visa specialists earn ₹40,000-60,000. Travel agency owners and successful visa consultants can earn ₹1-5 Lakhs monthly depending on business volume."
  },
  {
    question: "Do you teach visa processing for all countries?",
    answer: "Yes, our curriculum covers visa processing for major destinations: USA (B1/B2), UK, Schengen (Europe), Canada, Australia, UAE, Singapore, and Thailand. You'll learn document checklists, appointment booking, form filling, cover letter drafting, and handling visa rejections. Visa consultancy is a high-margin business with minimal investment—many of our alumni run successful visa processing centres."
  },
  {
    question: "What software and systems will I learn in this course?",
    answer: "You'll get hands-on training on: Amadeus/Galileo GDS for flight bookings, hotel booking portals, travel CRM systems, visa application portals (VFS, BLS, etc.), currency exchange calculations, and Microsoft Office for itinerary documentation. These are the exact tools used by MakeMyTrip, Yatra, Thomas Cook, and independent travel agencies."
  },
  {
    question: "Can I work abroad after this travel and tourism course?",
    answer: "Yes! Dubai, Qatar, and Singapore have large travel and tourism sectors with demand for trained professionals. Many of our alumni work in travel agencies, airline offices, and tour operations in the Gulf. GDS skills are internationally recognised, and our Cambridge English certification helps with communication requirements for overseas positions."
  },
  {
    question: "What is the investment required to start a travel agency?",
    answer: "A basic home-based travel agency can start with ₹50,000-1 Lakh (computer, internet, GDS subscription). A proper office setup costs ₹2-5 Lakhs. For IATA accreditation, you'll need ₹20-50 Lakhs as security deposit. However, many successful agencies start as non-IATA and grow organically. Our course teaches you how to start lean and scale profitably."
  },
  {
    question: "Do I need to know English to work in travel and tourism?",
    answer: "Basic English is essential for GDS operations, visa documentation, and client communication—especially for international travel. However, you don't need to be fluent from day one. Our Cambridge Spoken English module takes students from vernacular backgrounds to professional English proficiency. Many successful travel agents in Gujarat primarily communicate in Gujarati/Hindi with local clients while handling English documentation."
  },
  // ============================================================================
  // GUJARAT PARADIGM: Vernacular Voice Search FAQs (Gujlish/Hinglish)
  // ============================================================================
  {
    question: "Potani travel agency kholvi che - course help karase?",
    answer: "100% karase! Wings curriculum specifically Gujarat entrepreneurial mindset mate designed che. Business registration (MSME, GST), IATA accreditation, vendor tie-ups, tour costing, digital marketing - badhu shikhvaay. Alumni Vadodara, Ahmedabad, Dubai ma successful travel agencies chalaye che. 6 months course pachhi ready to start!"
  },
  {
    question: "GDS training su che? Jruri che travel job mate?",
    answer: "GDS = Global Distribution System - airline/hotel booking software. Amadeus, Galileo, Sabre - aa worldwide use thay. Travel agency, airline ticketing, corporate travel mate GDS skills MANDATORY che. Wings Institute ma real GDS terminals par hands-on training - simulations nahi! Aa skill thi immediately job ready!"
  },
  {
    question: "Travel agent ki salary kitni hoti hai India mein?",
    answer: "Fresher: ₹12,000-18,000/month. 2-3 years experience: ₹25,000-40,000. Senior consultant/visa specialist: ₹40,000-60,000. Travel agency owner: ₹1-5 Lakh/month depending on business. Commission-based earning pan hoy - busy season ma double-triple income possible!"
  },
  {
    question: "Travel agency start karvama ketla paisa jruri?",
    answer: "Home-based agency: ₹50,000-1 Lakh (computer, internet, GDS). Office setup: ₹2-5 Lakhs. IATA accreditation: ₹20-50 Lakh security deposit. Pan most successful agencies non-IATA thi start kare ane grow kare. Wings ma lean startup model shikhvaay - ₹50,000 thi start kari shakay!"
  },
  {
    question: "Visa processing shikhvaay che course ma?",
    answer: "Haan! Major countries badha: USA (B1/B2), UK, Schengen (Europe), Canada, Australia, UAE, Singapore, Thailand. Document checklists, VFS/BLS appointment booking, form filling, cover letter, rejection handling - badhu practical shikhvaay. Visa consultancy high-margin, low-investment business che!"
  },
  {
    question: "Travel tourism course duration ane fees ketli che?",
    answer: "Wings Institute ma Travel Tourism course 6 months che - Gujarat ma shortest professional course! Fees approximately ₹66,000. Part-time basis - daily 4 hours. GDS (Amadeus/Galileo), air ticketing, visa processing, tour operations - badhu cover thay. 6 months pachhi - job ya poti agency start!"
  },
  {
    question: "COVID pachhi travel industry ma scope che ke nai?",
    answer: "Bahut scope che! India domestic travel 35%+ growth 2023 ma. International departures pre-pandemic thi vadhare! Trained travel consultants - especially GDS ane visa specialists - ni demand highest ever. Companies actively hiring che. Perfect time to enter travel industry!"
  },
  {
    question: "IATA ane non-IATA travel agency ma farak su che?",
    answer: "IATA agency: Direct airline tickets issue kari shake, higher commission. Non-IATA: Consolidators through book kare, lower margin. IATA mate ₹20-50 Lakh security deposit jruri. Pan smart strategy: Non-IATA thi start karo, grow karo, pachhi IATA apply karo. Wings ma both models shikhvaay!"
  },
  {
    question: "Abroad ma job male travel course pachhi?",
    answer: "Haan! Dubai, Qatar, Singapore ma big travel industry che. Wings alumni Gulf ma travel agencies, airline offices, tour operations ma kaam kare che. GDS skills internationally recognised che. Wings Cambridge English certification help kare international jobs mate. Vadodara thi Dubai travel career possible!"
  },
  {
    question: "Gujarati medium thi travel agent bani shakay?",
    answer: "100% bani shakay! Basic English GDS ane visa documentation mate jruri - pan fluent nathi hovu jruri! Wings Cambridge Spoken English module che. Gujarat ma successful travel agents clients saathe Gujarati/Hindi ma vaat kare, documentation English ma handle kare. Course ma both skills shikhvaay!"
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
    "@id": "https://wingsinstitute.com/travel-tourism#course",
    "name": "Travel & Tourism Management",
    "alternateName": "Certificate in Travel and Tourism Management",
    "description": "A six-month, part-time program focused on the science of travel, including itinerary design, visa documentation, GDS training (Amadeus/Galileo), air ticketing, and tour operations.",
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
      "duration": "P6M",
      "instructor": {
        "@type": "Person",
        "name": "Travel Industry Experts",
        "description": "Professionals with travel agency and tour operator experience"
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
      "price": "66000",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "offeredBy": {
        "@id": "https://wingsinstitute.com/#organization"
      }
    },
    "educationalCredentialAwarded": "Certificate in Travel and Tourism Management",
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "name": "Travel & Tourism Professional Certificate",
      "credentialCategory": "certificate"
    },
    "teaches": [
      { "@type": "DefinedTerm", "name": "Travel itinerary design", "sameAs": "https://www.wikidata.org/wiki/Q3804535" },
      { "@type": "DefinedTerm", "name": "Visa documentation", "sameAs": "https://www.wikidata.org/wiki/Q1403912" },
      { "@type": "DefinedTerm", "name": "Tour operations", "sameAs": "https://www.wikidata.org/wiki/Q49389" },
      { "@type": "DefinedTerm", "name": "Amadeus GDS Training" },
      { "@type": "DefinedTerm", "name": "Galileo GDS Training" },
      { "@type": "DefinedTerm", "name": "Air ticketing & fare calculation" },
      { "@type": "DefinedTerm", "name": "Currency exchange & forex" }
    ],
    "coursePrerequisites": "12th Pass (any stream), Age 17-30 years",
    "numberOfCredits": 6,
    "timeRequired": "P6M",
    "inLanguage": ["en", "hi", "gu"],
    "image": {
      "@type": "ImageObject",
      "url": "/images/travel-tourism/travel-tourism-course.png",
      "width": 1200,
      "height": 630,
      "caption": "Travel & Tourism students learning GDS ticketing and tour planning at Wings Institute Vadodara",
      "contentLocation": {
        "@type": "Place",
        "name": "Wings Institute Tourism Lab",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3151688,
          "longitude": 73.1707874
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "54",
      "bestRating": "5"
    },
    // Voice Search: Speakable specification for course descriptions
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".travel-tourism-course-summary",
        ".course-description-heading",
        ".course-highlights"
      ],
      "xpath": [
        "//*[@id='travel-tourism-course-description']",
        "//section[contains(@class, 'course-overview')]/p[1]"
      ]
    },
    // Voice Search: Additional properties for Answer Engine Optimization
    "keywords": "best travel and tourism course Vadodara, GDS training Gujarat, travel agent training Alkapuri, tourism course near me, travel management institute Gujarat, Amadeus Galileo training India, travel tourism academy Vadodara, travel agent fees Vadodara, best travel training institute Gujarat 2026, IATA certification course, tour operator training",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Career aspirants seeking travel agency and tourism industry jobs"
    },
    "learningResourceType": "Practical Training Program with GDS Certification",
    "competencyRequired": "12th pass qualification, interest in travel industry"
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
      { "@type": "ListItem", "position": 3, "name": "Travel & Tourism", "item": "https://wingsinstitute.com/travel-tourism" }
    ]
  };
};

export function TravelTourismSEOContent() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Save scroll position before navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        sessionStorage.setItem('seo-scroll-travel-tourism', String(scrollPosition));
      };

      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href="/admissions"]');
        if (link) {
          const scrollPosition = window.scrollY || window.pageYOffset;
          sessionStorage.setItem('seo-scroll-travel-tourism', String(scrollPosition));
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
      const storageKey = 'seo-expanded-travel-tourism';
      const scrollKey = 'seo-scroll-travel-tourism';
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
            const section = document.getElementById('travel-tourism-seo-content');
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
      const storageKey = 'seo-expanded-travel-tourism';
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
      { id: 'travel-tourism-course-schema', data: generateCourseSchema() },
      { id: 'travel-tourism-faq-schema', data: generateFAQSchema() },
      { id: 'travel-tourism-breadcrumb-schema', data: generateBreadcrumbSchema() },
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
          id="travel-tourism-seo-content"
          className="w-full group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl md:text-2xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5]' : 'leading-tight'}`}>
                {t('tt.seo_title')}
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${isVernacular ? 'leading-[1.7] font-medium' : 'leading-normal'}`}>
                {t('tt.seo_subtitle')}
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
            {/* SECTION 1: THE BUSINESS OF TRAVEL */}
            {/* ============================================ */}
            <section id="travel-tourism-management-course">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-teal-500 rounded-full"></span>
                {t('tt.sec1_title')}
              </h2>
              
              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec1_p1')) }} />

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec1_p2')) }} />

              <div className="my-8 p-6 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border-l-4 border-teal-500 rounded-r-xl">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                  <Icons.Briefcase className="w-5 h-5 text-teal-500" />
                  {t('tt.two_paths_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <h4 className={`font-bold text-teal-700 dark:text-teal-400 mb-2 ${vernacularHeading}`}>{t('tt.path1_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.path1_desc')) }} />
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <h4 className={`font-bold text-cyan-700 dark:text-cyan-400 mb-2 ${vernacularHeading}`}>{t('tt.path2_title')}</h4>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.path2_desc')) }} />
                  </div>
                </div>
              </div>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec1_p3')) }} />
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 2: TECHNICAL SKILLS */}
            {/* ============================================ */}
            <section id="gds-ticketing-mastery">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-cyan-500 rounded-full"></span>
                {t('tt.sec2_title')}
              </h2>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec2_intro')) }} />

              {/* GDS Training */}
              <div className="my-8 p-6 bg-cyan-50 dark:bg-cyan-900/10 rounded-2xl border border-cyan-200 dark:border-cyan-800/30">
                <h3 className={`text-xl font-bold text-cyan-800 dark:text-cyan-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                  {t('tt.gds_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_intro')) }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.gds_learn_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_pnr')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_availability')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_fare')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_ticketing')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_modifications')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_cancellations')) }} />
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.gds_recognition_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_amadeus')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_galileo')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_sabre')) }} />
                    </ul>
                    <p className={`mt-3 text-xs text-cyan-700 dark:text-cyan-400 font-medium ${vernacularText}`}>
                      {t('tt.gds_note')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Air Ticketing */}
              <div className="my-8 p-6 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-200 dark:border-teal-800/30">
                <h3 className={`text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                  {t('tt.ticketing_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>
                  {t('tt.ticketing_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg">
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-2 ${vernacularPill}`}>{t('tt.fare_classes_title')}</h4>
                    <ul className={`text-xs text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>{t('tt.fare_classes1')}</li>
                      <li>{t('tt.fare_classes2')}</li>
                      <li>{t('tt.fare_classes3')}</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg">
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-2 ${vernacularPill}`}>{t('tt.routing_title')}</h4>
                    <ul className={`text-xs text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>{t('tt.routing1')}</li>
                      <li>{t('tt.routing2')}</li>
                      <li>{t('tt.routing3')}</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg">
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-2 ${vernacularPill}`}>{t('tt.addons_title')}</h4>
                    <ul className={`text-xs text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>{t('tt.addons1')}</li>
                      <li>{t('tt.addons2')}</li>
                      <li>{t('tt.addons3')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visa Processing */}
              <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</span>
                  {t('tt.visa_title')}
                </h3>
                <p className={`text-zinc-700 dark:text-zinc-300 mb-4 ${vernacularText}`}>
                  {t('tt.visa_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.visa_countries_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_usa')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_uk')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_schengen')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_canada')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_australia')) }} />
                      <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_others')) }} />
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.visa_skills_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>{t('tt.visa_skill1')}</li>
                      <li>{t('tt.visa_skill2')}</li>
                      <li>{t('tt.visa_skill3')}</li>
                      <li>{t('tt.visa_skill4')}</li>
                      <li>{t('tt.visa_skill5')}</li>
                      <li>{t('tt.visa_skill6')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tour Packaging & Additional Skills */}
              <div className="my-8 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2 ${vernacularHeading}`}>
                  <span className="w-8 h-8 rounded-lg bg-zinc-700 text-white flex items-center justify-center text-sm font-bold">4</span>
                  {t('tt.tour_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.itinerary_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>{t('tt.itinerary1')}</li>
                      <li>{t('tt.itinerary2')}</li>
                      <li>{t('tt.itinerary3')}</li>
                      <li>{t('tt.itinerary4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-2 ${vernacularHeading}`}>{t('tt.business_ops_title')}</h4>
                    <ul className={`space-y-1 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                      <li>{t('tt.business_ops1')}</li>
                      <li>{t('tt.business_ops2')}</li>
                      <li>{t('tt.business_ops3')}</li>
                      <li>{t('tt.business_ops4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`}>
                {t('tt.sec2_outro')} <Link href="/airport-management" className="text-teal-600 font-semibold underline hover:no-underline cursor-pointer">{t('tt.airport_mgmt_link')}</Link>
              </p>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 3: POST-PANDEMIC TRAVEL BOOM */}
            {/* ============================================ */}
            <section id="post-pandemic-travel-boom">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-green-500 rounded-full"></span>
                {t('tt.sec3_title')}
              </h2>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec3_p1')) }} />

              <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30 text-center">
                  <div className="text-3xl font-black text-green-600 mb-1">{t('tt.stat1_value')}</div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.stat1_label')}</p>
                </div>
                <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800/30 text-center">
                  <div className="text-3xl font-black text-teal-600 mb-1">{t('tt.stat2_value')}</div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.stat2_label')}</p>
                </div>
                <div className="p-5 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800/30 text-center">
                  <div className="text-3xl font-black text-cyan-600 mb-1">{t('tt.stat3_value')}</div>
                  <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.stat3_label')}</p>
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('tt.salary_title')}</h3>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mb-6`}>
                {t('tt.salary_intro')}
              </p>

              {/* Salary Table */}
              <div className="my-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-teal-100 dark:bg-teal-900/30">
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('tt.table_role')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('tt.table_exp')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('tt.table_salary')}</th>
                      <th className={`p-4 font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 ${vernacularTableCell}`}>{t('tt.table_growth')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role1_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role1_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role1_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role1_growth')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role2_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role2_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role2_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role2_growth')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role3_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role3_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role3_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role3_growth')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role4_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role4_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role4_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role4_growth')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role5_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role5_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role5_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role5_growth')}</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role6_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role6_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role6_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role6_growth')}</td>
                    </tr>
                    <tr>
                      <td className={`p-4 font-medium ${vernacularTableCell}`}>{t('tt.role7_name')}</td>
                      <td className={`p-4 ${vernacularTableCell}`}>{t('tt.role7_exp')}</td>
                      <td className={`p-4 text-teal-600 font-bold ${vernacularTableCell}`}>{t('tt.role7_salary')}</td>
                      <td className={`p-4 text-sm ${vernacularTableCell}`}>{t('tt.role7_growth')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6 p-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800/30">
                <p className={`text-yellow-800 dark:text-yellow-300 font-medium flex items-start gap-2 ${vernacularText}`}>
                  <Icons.TrendingUp className="w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gujarat_advantage')) }} />
                </p>
              </div>

              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 ${vernacularHeading}`}>{t('tt.local_title')}</h3>

              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                    <Icons.MapPin className="w-4 h-4 text-teal-600" /> {t('tt.vadodara_title')}
                  </h4>
                  <ul className={`space-y-2 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{t('tt.vadodara1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{t('tt.vadodara2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{t('tt.vadodara3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{t('tt.vadodara4')}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h4 className={`font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2 ${vernacularHeading}`}>
                    <Icons.Globe className="w-4 h-4 text-cyan-600" /> {t('tt.gujarat_title')}
                  </h4>
                  <ul className={`space-y-2 text-sm text-zinc-600 dark:text-zinc-400 ${vernacularListItem}`}>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{t('tt.gujarat1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{t('tt.gujarat2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{t('tt.gujarat3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{t('tt.gujarat4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 4: A DAY IN THE LIFE - NARRATIVE STORYTELLING */}
            {/* ============================================ */}
            <section id="day-in-life-travel-tourism-student">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-teal-500 rounded-full"></span>
                {t('tt.sec4_title')}
              </h2>

              {/* Opening Hook */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-2xl border border-teal-200 dark:border-teal-800/50 mb-8">
                <div className={`absolute -top-3 left-6 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full uppercase tracking-wide ${vernacularPill}`}>
                  {t('tt.sec4_badge')}
                </div>
                <p className={`text-lg md:text-xl italic text-zinc-700 dark:text-zinc-300 ${vernacularParagraph}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.sec4_quote')) }} />
              </div>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`}>
                {t('tt.sec4_intro')}
              </p>

              {/* Morning: GDS Training */}
              <div className="mt-10 relative pl-8 border-l-4 border-teal-300 dark:border-teal-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.gds_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.gds_p2')}
                </p>
                <blockquote className={`my-6 p-4 bg-teal-50 dark:bg-teal-950/30 border-l-4 border-teal-500 rounded-r-xl font-mono text-sm text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>
                  <p>{t('tt.gds_command')}</p>
                  <p className="mt-2 text-zinc-500">{t('tt.gds_translation')}</p>
                  <p className="mt-3">{t('tt.gds_response')}</p>
                </blockquote>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{t('tt.amadeus_label')}</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('tt.amadeus_desc')}</p>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{t('tt.galileo_label')}</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('tt.galileo_desc')}</p>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl text-center">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{t('tt.sabre_label')}</div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${vernacularText}`}>{t('tt.sabre_desc')}</p>
                  </div>
                </div>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_p3')) }} />
                <div className="mt-4 p-4 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
                  <p className={`text-sm text-teal-800 dark:text-teal-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.gds_tip')) }} />
                </div>
              </div>

              {/* Mid-Morning: Itinerary Creation */}
              <div className="mt-10 relative pl-8 border-l-4 border-blue-300 dark:border-blue-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.itinerary_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.itinerary_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.itinerary_p2')}
                </p>
                <div className="my-6 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className={`font-bold text-blue-800 dark:text-blue-200 mb-4 ${vernacularHeading}`}>{t('tt.sample_project_title')}</h4>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 text-sm ${vernacularText}`}>
                    <div>
                      <p className={`font-medium text-blue-700 dark:text-blue-300 mb-2 ${vernacularPill}`}>{t('tt.sample_day1')}</p>
                      <p>{t('tt.sample_day1_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-blue-700 dark:text-blue-300 mb-2 ${vernacularPill}`}>{t('tt.sample_day2')}</p>
                      <p>{t('tt.sample_day2_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-blue-700 dark:text-blue-300 mb-2 ${vernacularPill}`}>{t('tt.sample_day3')}</p>
                      <p>{t('tt.sample_day3_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-blue-700 dark:text-blue-300 mb-2 ${vernacularPill}`}>{t('tt.sample_day4')}</p>
                      <p>{t('tt.sample_day4_desc')}</p>
                    </div>
                  </div>
                  <p className={`mt-4 text-xs text-blue-600 dark:text-blue-400 font-medium ${vernacularText}`}>{t('tt.sample_total')}</p>
                </div>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`}>
                  {t('tt.itinerary_p3')}
                </p>
                <ul className={`mt-6 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🏖️</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.package_beach')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🏔️</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.package_adventure')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🕌</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.package_pilgrimage')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">💼</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.package_corporate')) }} />
                  </li>
                </ul>
              </div>

              {/* Noon: Visa & Passport Workshop */}
              <div className="mt-10 relative pl-8 border-l-4 border-purple-300 dark:border-purple-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.visa_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.visa_p2')}
                </p>
                <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇺🇸</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_usa_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_usa_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇬🇧</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_uk_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_uk_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇪🇺</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_schengen_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_schengen_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇦🇺</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_australia_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_australia_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇨🇦</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_canada_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_canada_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇦🇪</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_uae_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_uae_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇸🇬</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_singapore_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_singapore_desc')}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
                    <div className="text-2xl mb-2">🇸🇦</div>
                    <h4 className={`font-bold text-purple-800 dark:text-purple-200 text-sm ${vernacularPill}`}>{t('tt.visa_saudi_label')}</h4>
                    <p className={`text-xs text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tt.visa_saudi_desc')}</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                  <p className={`text-sm text-purple-800 dark:text-purple-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.visa_career')) }} />
                </div>
              </div>

              {/* Afternoon: Client Interaction & Grooming */}
              <div className="mt-10 relative pl-8 border-l-4 border-rose-300 dark:border-rose-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.grooming_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.grooming_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.grooming_p2')}
                </p>
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
                    <h4 className={`font-bold text-rose-800 dark:text-rose-200 mb-2 ${vernacularHeading}`}>{t('tt.appearance_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('tt.appearance1')}</li>
                      <li>• {t('tt.appearance2')}</li>
                      <li>• {t('tt.appearance3')}</li>
                      <li>• {t('tt.appearance4')}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
                    <h4 className={`font-bold text-rose-800 dark:text-rose-200 mb-2 ${vernacularHeading}`}>{t('tt.communication_title')}</h4>
                    <ul className={`text-sm text-zinc-600 dark:text-zinc-400 space-y-1 ${vernacularListItem}`}>
                      <li>• {t('tt.communication1')}</li>
                      <li>• {t('tt.communication2')}</li>
                      <li>• {t('tt.communication3')}</li>
                      <li>• {t('tt.communication4')}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl border border-rose-200 dark:border-rose-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.grooming_story')) }} />
                </div>
              </div>

              {/* Late Afternoon: Cambridge English */}
              <div className="mt-10 relative pl-8 border-l-4 border-emerald-300 dark:border-emerald-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.english_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.english_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.english_p2')}
                </p>
                <div className="my-6 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h4 className={`font-bold text-emerald-800 dark:text-emerald-200 mb-4 ${vernacularHeading}`}>{t('tt.english_vocab_title')}</h4>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 text-sm ${vernacularText}`}>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularPill}`}>{t('tt.english_vocab_title')}</p>
                      <p>{t('tt.english_vocab_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularPill}`}>{t('tt.english_client_title')}</p>
                      <p>{t('tt.english_client_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularPill}`}>{t('tt.english_email_title')}</p>
                      <p>{t('tt.english_email_desc')}</p>
                    </div>
                    <div>
                      <p className={`font-medium text-emerald-700 dark:text-emerald-300 mb-2 ${vernacularPill}`}>{t('tt.english_phone_title')}</p>
                      <p>{t('tt.english_phone_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <p className={`text-emerald-800 dark:text-emerald-200 font-medium ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.english_advantage')) }} />
                </div>
              </div>

              {/* Special: Industry Expert Visits */}
              <div className="mt-10 relative pl-8 border-l-4 border-amber-300 dark:border-amber-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.expert_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.expert_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.expert_p2')}
                </p>
                <ul className={`mt-6 space-y-3 text-lg text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🏢</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.expert1')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✈️</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.expert2')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">🏨</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.expert3')) }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">📋</span>
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.expert4')) }} />
                  </li>
                </ul>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.expert_p3')}
                </p>
              </div>

              {/* Internship Section */}
              <div className="mt-10 relative pl-8 border-l-4 border-cyan-300 dark:border-cyan-700">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.internship_section_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.internship_p1')) }} />
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.internship_p2')) }} />
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
                    <h4 className={`font-bold text-cyan-800 dark:text-cyan-200 mb-3 ${vernacularHeading}`}>{t('tt.agency_intern_title')}</h4>
                    <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                      <li>✓ {t('tt.agency_intern1')}</li>
                      <li>✓ {t('tt.agency_intern2')}</li>
                      <li>✓ {t('tt.agency_intern3')}</li>
                      <li>✓ {t('tt.agency_intern4')}</li>
                      <li>✓ {t('tt.agency_intern5')}</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <h4 className={`font-bold text-indigo-800 dark:text-indigo-200 mb-3 ${vernacularHeading}`}>{t('tt.airport_intern_title')}</h4>
                    <ul className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ${vernacularListItem}`}>
                      <li>✓ {t('tt.airport_intern1')}</li>
                      <li>✓ {t('tt.airport_intern2')}</li>
                      <li>✓ {t('tt.airport_intern3')}</li>
                      <li>✓ {t('tt.airport_intern4')}</li>
                      <li>✓ {t('tt.airport_intern5')}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl border border-cyan-200 dark:border-cyan-700">
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.internship_paradigm')) }} />
                </div>
              </div>

              {/* Closing */}
              <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 rounded-2xl border border-teal-500/20">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
                  {t('tt.closing_title')}
                </h3>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300`}>
                  {t('tt.closing_p1')}
                </p>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`}>
                  {t('tt.closing_p2')}
                </p>
                <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mt-4`} dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tt.closing_p3')) }} />
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link 
                    href="/contact-us"
                    className={`px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors ${vernacularButton}`}
                  >
                    {t('tt.btn_counselling')}
                  </Link>
                  <Link 
                    href="/admissions"
                    className={`px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity ${vernacularButton}`}
                  >
                    {t('tt.btn_application')}
                  </Link>
                </div>
              </div>
            </section>

            <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

            {/* ============================================ */}
            {/* SECTION 5: FAQ */}
            {/* ============================================ */}
            <section id="travel-tourism-faq">
              <h2 className={`text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3 ${vernacularHeading}`}>
                <span className="w-2 h-10 bg-purple-500 rounded-full"></span>
                {t('tt.faq_seo_title')}
              </h2>

              <p className={`text-lg ${vernacularParagraph} text-zinc-700 dark:text-zinc-300 mb-8`}>
                {t('tt.faq_seo_intro')}
              </p>

              <div className="space-y-6">
                {/* Standard FAQs */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>1. {t('tt.seo_faq1_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq1_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>2. {t('tt.seo_faq2_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq2_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>3. {t('tt.seo_faq3_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq3_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>4. {t('tt.seo_faq4_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq4_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>5. {t('tt.seo_faq5_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq5_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>6. {t('tt.seo_faq6_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq6_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>7. {t('tt.seo_faq7_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq7_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>8. {t('tt.seo_faq8_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq8_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>9. {t('tt.seo_faq9_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq9_a')}</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>10. {t('tt.seo_faq10_q')}</h3>
                  <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_faq10_a')}</p>
                </div>

                {/* Vernacular Voice Search FAQs */}
                <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
                  <h4 className={`text-xl font-bold text-zinc-900 dark:text-white mb-6 ${vernacularHeading}`}>{t('tt.vfaq_header')}</h4>
                  <div className="space-y-4">
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>11. {t('tt.seo_vfaq1_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq1_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>12. {t('tt.seo_vfaq2_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq2_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>13. {t('tt.seo_vfaq3_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq3_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>14. {t('tt.seo_vfaq4_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq4_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>15. {t('tt.seo_vfaq5_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq5_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>16. {t('tt.seo_vfaq6_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq6_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>17. {t('tt.seo_vfaq7_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq7_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>18. {t('tt.seo_vfaq8_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq8_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>19. {t('tt.seo_vfaq9_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq9_a')}</p>
                    </div>
                    <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                      <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>20. {t('tt.seo_vfaq10_q')}</h3>
                      <p className={`text-zinc-700 dark:text-zinc-300 ${vernacularText}`}>{t('tt.seo_vfaq10_a')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schema.org FAQ JSON-LD is automatically injected via useEffect */}
            </section>

            {/* Final CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl text-white text-center">
              <h3 className={`text-2xl font-bold mb-4 ${vernacularHeading}`}>{t('tt.cta_title')}</h3>
              <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${vernacularText}`}>
                {t('tt.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact-us"
                  className={`px-8 py-4 bg-white text-teal-600 rounded-full font-bold hover:bg-zinc-100 transition-colors ${vernacularButton}`}
                >
                  {t('tt.cta_btn_counselling')}
                </Link>
                <a 
                  href="tel:+918758754444"
                  className={`px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 ${vernacularButton}`}
                >
                  <Icons.Phone className="w-5 h-5" />
                  {t('tt.cta_btn_call')}
                </a>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
};

export default TravelTourismSEOContent;

