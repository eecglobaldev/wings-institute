'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';

const aboutFaqData = [
  {
    question: "When was Wings Institute established?",
    answer: "Wings Institute was established in 2008 in Vadodara, Gujarat. With over 16 years of experience in aviation and hospitality education, we are one of the oldest and most trusted training institutes in Western India. Our parent company, EEC (Educational & Employment Consultants), has been serving the education sector since 1997."
  },
  {
    question: "Who are the founders of Wings Institute?",
    answer: "Wings Institute was founded by Mili Mehta and Amit Jalan. Mili Mehta is an experienced educationalist who believes education is a responsibility, not a business. Amit Jalan is a pioneer in the Study Abroad industry since 1997, bringing deep operational expertise and a vast global network to the Wings ecosystem."
  },
  {
    question: "What makes Wings Institute different from other aviation academies?",
    answer: "Wings Institute stands apart due to its owned infrastructure including an Airbus A330 Mock Cabin (24-seat business class with functional PA system), Commercial Kitchen Lab, and Makeover Studio. Unlike competitors who rent facilities, our owned infrastructure ensures consistent, high-quality practical training. We also integrate AI tools for interview prep and career guidance."
  },
  {
    question: "Is Wings Institute affiliated with any airlines or universities?",
    answer: "Wings Institute has placement partnerships with major airlines including IndiGo, Air India, SpiceJet, Qatar Airways, and Emirates. While we are an independent training institute (not a college affiliated to a university), our curriculum is industry-aligned and our diploma is recognised by employers across aviation and hospitality sectors."
  },
  {
    question: "What are the core values of Wings Institute?",
    answer: "Wings Institute operates on three core values: 1) Student Centricity - every decision prioritises student outcomes, 2) Absolute Integrity - transparent policies with no hidden fees or fake placement claims, 3) Modern Pedagogy - we combine traditional training with AI tools and practical simulations to prepare students for evolving industry demands."
  },
  {
    question: "How many students has Wings Institute trained and placed?",
    answer: "Since 2008, Wings Institute has trained and placed over 5,000 students in airlines, airports, hotels, and hospitality companies across India and abroad. Our alumni work at Qatar Airways, Emirates, IndiGo, Taj Hotels, Marriott, and various international cruise lines. View our placement page for verified success stories."
  },
  {
    question: "Does Wings Institute have any branches outside Vadodara?",
    answer: "Our flagship campus is in Alkapuri, Vadodara. We also operate through franchise partners in select cities. For franchise enquiries, visit our Franchise page. Students from Gujarat, Rajasthan, and Maharashtra often relocate to Vadodara for our comprehensive training as our facilities are unique in the region."
  },
  {
    question: "What accreditations does Wings Institute hold?",
    answer: "Wings Institute is a private vocational training institute focused on industry-relevant skills. While we don't offer UGC-affiliated degrees, our training programmes are designed in consultation with airline HR professionals and hotel industry experts. Our placement record is our strongest accreditation—employers trust Wings graduates."
  }
];

const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": "https://wingsinstitute.com/#organization",
        "name": "Wings Institute Air Hostess & Hotel Management",
        "alternateName": "Wings",
        "url": "https://wingsinstitute.com",
        "legalName": "Wings Institute Air Hostess & Hotel Management",
        "description": "Wings Institute offers premier aviation, hotel management and hospitality, cooking culinary training and travel and tourism in Vadodara, Gujarat, India. Since 2008, it empowers students with hands-on practice in mock and training facilities and dedicated job placement support.",
        "slogan": "We don't just teach courses; we build careers.",
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
        "hasMap": "https://maps.app.goo.gl/6ipxRiyHntzMAris8",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        "sameAs": [
          "https://www.instagram.com/wingsinstitute",
          "https://www.facebook.com/wingsaviationtraining",
          "https://www.youtube.com/@wingsinstitute",
          "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training"
        ],
        "founder": [
          { "@id": "https://wingsinstitute.com/#person-mili-mehta" },
          { "@id": "https://wingsinstitute.com/#person-amit-jalan" }
        ],
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 20,
          "maxValue": 50
        },
        "areaServed": ["Gujarat", "Rajasthan", "Maharashtra", "Madhya Pradesh"]
      },
      {
        "@type": "Person",
        "@id": "https://wingsinstitute.com/#person-mili-mehta",
        "name": "Mili Mehta",
        "jobTitle": "Founding Director",
        "worksFor": { "@id": "https://wingsinstitute.com/#organization" },
        "url": "https://wingsinstitute.com",
        "sameAs": "https://www.linkedin.com/in/mili-mehta-99969880/",
        "description": "Founding Director of EEC & Wings. An experienced educationalist serving the industry since 1997."
      },
      {
        "@type": "Person",
        "@id": "https://wingsinstitute.com/#person-amit-jalan",
        "name": "Amit Jalan",
        "jobTitle": "Founding Director",
        "worksFor": { "@id": "https://wingsinstitute.com/#organization" },
        "url": "https://wingsinstitute.com",
        "sameAs": "https://in.linkedin.com/in/amitjalan",
        "description": "Founding Director of EEC. A pioneer in the Study Abroad industry since 1997."
      }
    ]
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export function AboutSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const orgScriptId = 'about-org-schema';
    const existingOrgScript = document.getElementById(orgScriptId);
    if (existingOrgScript) existingOrgScript.remove();

    const orgScript = document.createElement('script');
    orgScript.id = orgScriptId;
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(generateOrganizationSchema());
    document.head.appendChild(orgScript);

    const faqScriptId = 'about-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const orgScriptToRemove = document.getElementById(orgScriptId);
      if (orgScriptToRemove) orgScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-700/30 hover:border-purple-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Icons.Building2 className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              About Wings Institute: Our Story & Values
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              16+ years of excellence in aviation and hospitality education
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Icons.History className="w-5 h-5" />
              </span>
              Our Story: Building Careers Since 2008
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              <strong>Wings Institute</strong> was born from a simple belief: <em>quality vocational education can transform lives</em>. In 2008, when aviation training in Gujarat was limited to a few theory-based institutes, <strong>Mili Mehta</strong> and <strong>Amit Jalan</strong> set out to create something different.
            </p>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              What started as a small training centre in <strong>Alkapuri, Vadodara</strong> has grown into Western India&apos;s most trusted name in aviation and hospitality education.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
                <Icons.Users className="w-5 h-5" />
                Meet Our Founders
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center overflow-hidden">
                    <Image src="/images/founders/mili-mehta.jpeg" alt="Mili Mehta - Founder and Managing Director of Wings Institute Vadodara Gujarat" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-bold text-zinc-900 dark:text-white">Mrs. Mili Mehta</h4>
                      <a 
                        href="https://www.linkedin.com/in/mili-mehta-99969880/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                        title="Ms. Mili Mehta on LinkedIn"
                      >
                        <Icons.Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                      </a>
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">Founding Director</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      An experienced educationalist serving the industry since 1997.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center overflow-hidden">
                    <Image src="/images/founders/amit-jalan.jpeg" alt="Amit Jalan - CEO and Director of Wings Institute Aviation Training Vadodara" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-bold text-zinc-900 dark:text-white">Amit Jalan</h4>
                      <a 
                        href="https://www.linkedin.com/in/amitjalan/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                        title="Mr. Amit Jalan on LinkedIn"
                      >
                        <Icons.Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                      </a>
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">Founding Director</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      A pioneer in the Study Abroad industry since 1997.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Frequently Asked Questions About Wings
            </h2>

            <div className="space-y-4">
              {aboutFaqData.map((faq, index) => (
                <details 
                  key={index}
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-purple-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Join the Wings Family</h3>
              <p className="mb-6 opacity-90">
                Experience the Wings difference for yourself. Visit our campus, meet our faculty, and see why thousands of students have trusted us with their careers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-white text-purple-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Contact Us
                </Link>
                <Link 
                  href="/placements"
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Icons.Trophy className="w-5 h-5" />
                  View Success Stories
                </Link>
              </div>
            </div>
          </section>

        </article>
      </div>

      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>About Wings Institute: Building Careers Since 2008</h2>
          <p>Wings Institute was founded by Mili Mehta and Amit Jalan in Vadodara, Gujarat. Over 16 years, we&apos;ve trained 5,000+ students in aviation and hospitality.</p>
          <p>Contact: +91-8758754444</p>
        </div>
      </noscript>
    </section>
  );
}

export default AboutSEOContent;

