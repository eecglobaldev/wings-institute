'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

const contactFaqData = [
  {
    question: "Where is Wings Institute located in Vadodara?",
    answer: "Wings Institute is located at 2nd Floor, RG Square 14, Nutan Bharat Society, Alkapuri, Vadodara - 390007, Gujarat. We are opposite Nutan Bharat Club, a well-known landmark in Alkapuri. The campus is easily accessible by public transport and has parking facilities for two-wheelers and cars."
  },
  {
    question: "What are the office hours for Wings Institute?",
    answer: "Wings Institute is open Monday to Saturday from 10:00 AM to 7:00 PM. We are closed on Sundays and public holidays. For urgent queries, you can reach us on WhatsApp at +91-8758754444 outside office hours, and our team will respond on the next working day."
  },
  {
    question: "How can I schedule a free career counselling session?",
    answer: "You can book a free counselling session by calling +91-8758754444, sending a WhatsApp message, or filling out the contact form on our website. Walk-ins are also welcome during office hours, but we recommend booking in advance to ensure a counsellor is available. Sessions typically last 30-45 minutes."
  },
  {
    question: "Does Wings Institute offer campus visits before admission?",
    answer: "Yes, we encourage prospective students and parents to visit our campus before enrolling. During the visit, you can see our Airbus A330 Mock Cabin, Commercial Kitchen Lab, Makeover Studio, and interact with current students. Campus tours are available Monday to Saturday between 10:00 AM and 7:00 PM."
  },
  {
    question: "What documents should I bring for admission enquiry?",
    answer: "For initial enquiry, no documents are required. For admission, you'll need: 10th and 12th mark sheets (original + 2 photocopies), Transfer Certificate (TC), 4 passport-size photographs (white background), Aadhar Card copy, and a medical fitness certificate (if available). International students need passport and visa copies."
  },
  {
    question: "Is there a helpline for current students?",
    answer: "Yes, current students can reach the Student Support Desk at +91-8758754444 or email support@wingsinstitute.com. For placement-related queries, contact the Placement Cell directly. Emergency contacts are provided during orientation and are available 24/7 for enrolled students."
  },
  {
    question: "How do I reach Wings Institute from Vadodara Railway Station?",
    answer: "Wings Institute is approximately 4 km from Vadodara Junction Railway Station. You can take an auto-rickshaw (₹50-70) or use Ola/Uber (₹80-100). Tell the driver 'Nutan Bharat Society, Alkapuri' or 'RG Square near Alkapuri'. The journey takes 15-20 minutes depending on traffic."
  },
  {
    question: "Can parents attend the counselling session with students?",
    answer: "Absolutely! We encourage parents to attend counselling sessions. Understanding the course structure, fees, placement statistics, and career prospects helps families make informed decisions. Our counsellors address parent concerns about job security, ROI, and industry credibility during these sessions."
  }
];

const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "alternateName": "Wings",
    "url": "https://wingsinstitute.com",
    "logo": "https://wingsinstitute.com/images/Wings-logo-red.png",
    "description": "Wings Institute offers premier aviation, hotel management and hospitality, cooking culinary training and travel and tourism in Vadodara, Gujarat, India.",
    "slogan": "We don't just teach courses; we build careers.",
    "foundingDate": "2008",
    "telephone": "+91-8758754444",
    "email": "info@wingsinstitute.com",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8758754444",
        "contactType": "admissions",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/wingsinstitute",
      "https://www.facebook.com/wingsaviationtraining",
      "https://www.youtube.com/@wingsinstitute",
      "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training"
    ]
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contactFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export function ContactSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const businessScriptId = 'contact-business-schema';
    const existingBusinessScript = document.getElementById(businessScriptId);
    if (existingBusinessScript) existingBusinessScript.remove();

    const businessScript = document.createElement('script');
    businessScript.id = businessScriptId;
    businessScript.type = 'application/ld+json';
    businessScript.textContent = JSON.stringify(generateLocalBusinessSchema());
    document.head.appendChild(businessScript);

    const faqScriptId = 'contact-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const businessScriptToRemove = document.getElementById(businessScriptId);
      if (businessScriptToRemove) businessScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/30 hover:border-blue-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Icons.MapPin className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              How to Reach Wings Institute Vadodara
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Directions, office hours, and frequently asked questions
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Icons.Building2 className="w-5 h-5" />
              </span>
              Visit Wings Institute in Alkapuri, Vadodara
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              <strong>Wings Institute</strong> is located in the heart of <strong>Alkapuri</strong>, one of Vadodara&apos;s most prominent localities. Our campus at <strong>RG Square</strong> is easily accessible from all parts of the city.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <Icons.MapPinned className="w-5 h-5" />
                Full Address
              </h3>
              <address className="not-italic text-zinc-700 dark:text-zinc-300">
                <strong>Wings Institute Air Hostess & Hotel Management</strong><br />
                2nd Floor, RG Square 14<br />
                Nutan Bharat Society, Alkapuri<br />
                Vadodara, Gujarat - 390007<br />
                India
              </address>
              <div className="mt-4 flex flex-wrap gap-4">
                <a 
                  href="https://maps.app.goo.gl/6ipxRiyHntzMAris8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Icons.Map className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Phone</h4>
                <a href="tel:+918758754444" className="text-blue-600 dark:text-blue-400 font-medium">+91-8758754444</a>
              </div>
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">WhatsApp</h4>
                <a href="https://wa.me/918758754444" className="text-green-600 dark:text-green-400 font-medium">+91-8758754444</a>
              </div>
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Email</h4>
                <a href="mailto:info@wingsinstitute.com" className="text-red-600 dark:text-red-400 font-medium text-sm">info@wingsinstitute.com</a>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {contactFaqData.map((faq, index) => (
                <details 
                  key={index}
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-blue-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Visit Our Campus?</h3>
              <p className="mb-6 opacity-90">
                Book a free campus tour and career counselling session. See our Airbus A330 Mock Cabin and meet our faculty.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="tel:+918758754444"
                  className="px-6 py-3 bg-white text-blue-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a 
                  href="https://wa.me/918758754444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Icons.MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </section>

        </article>
      </div>

      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>Visit Wings Institute in Alkapuri, Vadodara</h2>
          <p>Address: 2nd Floor, RG Square 14, Nutan Bharat Society, Alkapuri, Vadodara - 390007, Gujarat</p>
          <p>Phone: +91-8758754444 | Hours: Mon-Sat 10AM-7PM</p>
        </div>
      </noscript>
    </section>
  );
}

export default ContactSEOContent;

