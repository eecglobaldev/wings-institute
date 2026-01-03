'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// FAQ Data for Schema
const virtualTourFaqData = [
  {
    question: "Can I visit Wings Institute campus before taking admission?",
    answer: "Absolutely! We encourage all prospective students and parents to visit our Alkapuri campus before enrolling. Campus tours are free and available Monday to Saturday, 10 AM to 7 PM. You can see our Airbus A330 Mock Cabin, Commercial Kitchen Lab, Makeover Studio, and interact with current students. No prior appointment is required, though booking helps us prepare better."
  },
  {
    question: "What facilities can I see during the Wings campus tour?",
    answer: "During the campus tour, you'll see: Airbus A330 Mock Cabin (24-seat business class with functional PA system and meal carts), Commercial Kitchen Lab (industrial ovens, gas hobs, stainless steel workstations), Makeover Studio & Spa (salon chairs, professional lighting, skincare stations), Fine-Dining Mock Restaurant, Computer Lab with GDS software, and air-conditioned classrooms."
  },
  {
    question: "How is the Airbus A330 Mock Cabin different from other institutes?",
    answer: "Unlike competitors who use basic mockups or rented facilities, Wings Institute owns a full-scale Airbus A330 mock cabin with 24 business-class seats, functional overhead bins, emergency exit doors for drill practice, a working PA system for announcement training, and authentic meal trolleys. This allows students to practise real scenarios before airline interviews."
  },
  {
    question: "Does Wings Institute have a commercial kitchen for culinary students?",
    answer: "Yes, our Commercial Kitchen Lab features industrial-grade equipment: high-pressure gas hobs, commercial convection ovens, deep fryers, grills, stainless steel prep tables, commercial refrigeration, and professional knife sets. Students train in conditions identical to 5-star hotel kitchens, learning HACCP food safety standards and portion control."
  },
  {
    question: "What is the Makeover Studio at Wings Institute?",
    answer: "The Makeover Studio is a professional grooming facility where students learn airline-standard presentation. It includes salon stations with professional lighting mirrors, makeup kits (MAC, Lakme), hair styling equipment (dryers, straighteners, curlers), manicure stations, and facial treatment areas. Students practise saree draping, corporate makeup, and skincare routines here."
  },
  {
    question: "Can parents accompany students during campus visits?",
    answer: "Parents are not just allowed but encouraged to join campus tours. We believe parents should see the infrastructure firsthand to understand the value of our training. Our counsellors address parent concerns about job security, ROI, and career prospects during these visits. Saturday visits are particularly popular with working parents."
  },
  {
    question: "Is the virtual tour available online?",
    answer: "Yes, we offer a comprehensive virtual tour on our website for students who cannot visit Vadodara immediately. The virtual tour includes 360° views of all facilities, video walkthroughs, and detailed descriptions. However, we recommend an in-person visit to fully experience our infrastructure and meet faculty before making your decision."
  },
  {
    question: "How do I book a campus tour at Wings Institute?",
    answer: "You can book a campus tour by calling +91-8758754444, sending a WhatsApp message, or filling out the enquiry form on our website. Walk-ins are welcome during tour hours (Mon-Sat, 10 AM - 7 PM), but we recommend booking to ensure a counsellor is available to answer your questions during the visit."
  }
];

// Generate Schema Functions
const generatePlaceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "url": "https://wingsinstitute.com",
    "description": "Premier aviation and hospitality training institute in Vadodara with Airbus A330 Mock Cabin, Commercial Kitchen Lab, and Makeover Studio.",
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
    "image": {
      "@type": "ImageObject",
      "url": "/images/virtual-tour/mock-cabin-360.jpg",
      "width": 1200,
      "height": 630,
      "caption": "360-degree virtual tour of Wings Institute Airbus A330 mock cabin at Alkapuri campus, Vadodara",
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
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Airbus A330 Mock Cabin",
        "value": true,
        "description": "24-seat business class mock cabin with functional PA system, emergency doors, and meal trolleys"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Commercial Kitchen Lab",
        "value": true,
        "description": "Industrial-grade kitchen with commercial ovens, gas hobs, and stainless steel workstations"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Makeover Studio & Spa",
        "value": true,
        "description": "Professional grooming facility with salon stations, makeup kits, and skincare equipment"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Fine-Dining Mock Restaurant",
        "value": true,
        "description": "Simulated restaurant environment for hospitality service training"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Computer Lab with GDS",
        "value": true,
        "description": "Amadeus and Galileo GDS software for travel and ticketing training"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air-Conditioned Classrooms",
        "value": true,
        "description": "Modern classrooms with audio-visual equipment"
      }
    ],
    "hasMap": "https://maps.app.goo.gl/6ipxRiyHntzMAris8"
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": virtualTourFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const VirtualTourSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Place/Facility Schema
    const placeScriptId = 'virtual-tour-place-schema';
    const existingPlaceScript = document.getElementById(placeScriptId);
    if (existingPlaceScript) existingPlaceScript.remove();

    const placeScript = document.createElement('script');
    placeScript.id = placeScriptId;
    placeScript.type = 'application/ld+json';
    placeScript.textContent = JSON.stringify(generatePlaceSchema());
    document.head.appendChild(placeScript);

    // FAQ Schema
    const faqScriptId = 'virtual-tour-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const placeScriptToRemove = document.getElementById(placeScriptId);
      if (placeScriptToRemove) placeScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-sky-900/30 border border-cyan-500/20 hover:border-cyan-400/40 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Icons.Eye className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white">
              Explore Our World-Class Training Facilities
            </h2>
            <p className="text-sm text-zinc-400">
              Detailed information about campus infrastructure and tour booking
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content - Always in DOM for SEO */}
      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-invert max-w-none pt-8">
          
          {/* Section 1: Infrastructure Overview */}
          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icons.Building2 className="w-5 h-5" />
              </span>
              Gujarat's Most Advanced Aviation Training Infrastructure
            </h2>
            
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              What you see in the virtual tour isn't a render—it's <strong className="text-white">real infrastructure</strong> owned and operated by Wings Institute. Unlike competitors who conduct "practical training" in generic classrooms, our students learn in environments that mirror actual airlines and 5-star hotels.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-6">
              This infrastructure advantage is why <strong className="text-white">airlines prefer Wings graduates</strong>—they're "Day 1 Ready" and require minimal additional training. It's also why our placement rate consistently outperforms institutes that rely on theory-based education.
            </p>
          </section>

          {/* Section 2: Facility Details */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icons.LayoutGrid className="w-5 h-5" />
              </span>
              Facility Breakdown
            </h2>

            <div className="space-y-6 mb-8">
              {/* Mock Cabin */}
              <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Icons.Plane className="w-5 h-5 text-cyan-400" />
                  Airbus A330 Mock Cabin
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-zinc-300 mb-4">
                      Our crown jewel—a <strong className="text-white">full-scale Airbus A330 cabin</strong> replica that provides the most realistic training environment in Western India.
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>24 business-class seats with armrests and tray tables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Functional PA system for announcement practice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Emergency exit doors for evacuation drills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Authentic meal trolleys and galley setup</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/20">
                    <h4 className="font-bold text-white mb-2">Training Scenarios</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Pre-flight safety demonstrations</li>
                      <li>• Meal service and trolley operations</li>
                      <li>• Emergency evacuation (water safety, fire)</li>
                      <li>• Passenger handling and conflict resolution</li>
                      <li>• First aid and medical emergency response</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Commercial Kitchen */}
              <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Icons.ChefHat className="w-5 h-5 text-amber-400" />
                  Commercial Kitchen Lab
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-zinc-300 mb-4">
                      Our kitchen replicates a <strong className="text-white">5-star hotel production kitchen</strong>, ensuring culinary students are job-ready from day one.
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>High-pressure commercial gas burners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Industrial convection ovens and grills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Stainless steel prep stations (HACCP compliant)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Commercial refrigeration station</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-500/20">
                    <h4 className="font-bold text-white mb-2">Curriculum Highlights</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Knife skills (julienne, brunoise, chiffonade)</li>
                      <li>• Indian regional cuisines (tandoor, curries)</li>
                      <li>• Continental cooking and mother sauces</li>
                      <li>• Bakery, pastry, and cake decoration</li>
                      <li>• Food costing and portion control</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Makeover Studio */}
              <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Icons.ScanFace className="w-5 h-5 text-pink-400" />
                  Makeover Studio & Spa
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-zinc-300 mb-4">
                      Airlines have strict grooming standards. Our studio ensures students <strong className="text-white">look interview-ready</strong> from week one.
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span>Professional salon chairs with lighting mirrors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span>MAC & Lakme makeup kits for practice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span>Hair styling equipment (dryers, straighteners)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span>Skincare and facial treatment stations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-pink-900/30 rounded-xl p-4 border border-pink-500/20">
                    <h4 className="font-bold text-white mb-2">Grooming Training</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Corporate makeup (day and interview looks)</li>
                      <li>• Saree draping (6 styles)</li>
                      <li>• Hair buns, braids, and professional cuts</li>
                      <li>• Skin care routines for aviation</li>
                      <li>• Uniform presentation and posture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Book a Tour */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icons.Calendar className="w-5 h-5" />
              </span>
              Book Your Campus Visit
            </h2>

            <div className="bg-gradient-to-r from-cyan-900/30 to-sky-900/30 border border-cyan-500/20 rounded-2xl p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-white mb-4">Visit Information</h3>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li className="flex items-start gap-3">
                      <Icons.Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span><strong className="text-white">Tour Hours:</strong> Mon-Sat, 10:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.Timer className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span><strong className="text-white">Duration:</strong> 45-60 minutes (includes counselling)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.Banknote className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span><strong className="text-white">Cost:</strong> FREE (no booking fee)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span><strong className="text-white">Parents:</strong> Encouraged to join</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-4">How to Book</h3>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li className="flex items-start gap-3">
                      <Icons.Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>Call: <a href="tel:+918758754444" className="text-cyan-400 font-medium hover:text-cyan-300">+91-8758754444</a></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.MessageCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>WhatsApp: <a href="https://wa.me/918758754444" className="text-cyan-400 font-medium hover:text-cyan-300">+91-8758754444</a></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>Online: Fill enquiry form on website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>Walk-in: No appointment required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Campus Tour FAQs
            </h2>

            <div className="space-y-4">
              {virtualTourFaqData.map((faq, index) => (
                <details 
                  key={index}
                  open
                  className="group bg-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-300 text-sm leading-relaxed border-t border-zinc-700/50 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-cyan-600 to-sky-600 rounded-3xl p-8 text-white border border-cyan-500/30">
              <h3 className="text-2xl font-bold mb-4">See It to Believe It</h3>
              <p className="mb-6 opacity-90">
                Pictures don't do justice. Visit our Alkapuri campus and experience Gujarat's most advanced aviation training infrastructure firsthand.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href={ROUTES['contact']}
                  className="px-6 py-3 bg-white text-cyan-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Calendar className="w-5 h-5" />
                  Book Campus Tour
                </Link>
                <a 
                  href="https://maps.app.goo.gl/6ipxRiyHntzMAris8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2 border border-white/30"
                >
                  <Icons.Map className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Noscript Fallback for SEO */}
      <noscript>
        <div className="prose prose-invert max-w-none pt-8">
          <h2>Explore Wings Institute Campus - Vadodara</h2>
          <p>Facilities: Airbus A330 Mock Cabin (24 seats, PA system), Commercial Kitchen Lab, Makeover Studio & Spa, Fine-Dining Mock Restaurant, Computer Lab with GDS.</p>
          <p>Campus Tours: Mon-Sat, 10 AM - 7 PM. Free entry. Parents welcome. Contact: +91-8758754444 | Alkapuri, Vadodara</p>
        </div>
      </noscript>

      {/* Print Styles */}
      <style>{`
        @media print {
          .overflow-hidden { overflow: visible !important; max-height: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default VirtualTourSEOContent;

