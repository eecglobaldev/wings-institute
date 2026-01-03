'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// FAQ Data for Schema
// Includes both English and vernacular (Gujlish/Hinglish) questions for Voice Search optimization
const admissionsFaqData = [
  // ============================================================================
  // EXISTING ENGLISH FAQs (Preserved)
  // ============================================================================
  {
    question: "What is the admission process for Wings Institute?",
    answer: "The admission process involves 4 steps: 1) Fill the enquiry form online or visit campus, 2) Attend a free career counselling session, 3) Submit required documents (10th, 12th marksheets, photos, Aadhar), 4) Pay the registration fee to confirm your seat. The entire process can be completed in a single visit."
  },
  {
    question: "What are the eligibility criteria for aviation courses at Wings?",
    answer: "For Air Hostess/Cabin Crew: 12th pass (any stream), Age 17-26, Height 155cm+ (Female) or 170cm+ (Male), good communication skills, and clear complexion. For Ground Staff: 12th pass, no strict height requirements. For Hotel Management: 10th/12th pass. Specific course pages have detailed eligibility."
  },
  {
    question: "What documents are required for admission?",
    answer: "Required documents include: 10th and 12th mark sheets (original + 2 photocopies), Transfer Certificate (TC) or Migration Certificate, 4 passport-size photographs (white background), Aadhar Card photocopy, and character certificate from previous institution. Medical fitness certificate is optional at admission but required before placement."
  },
  {
    question: "What is the fee structure for courses at Wings Institute?",
    answer: "Course fees vary by programme. Air Hostess training, Hotel Management, and Culinary Arts are premium programmes with comprehensive facilities. We offer flexible payment options including EMI plans and merit-based scholarships up to ₹10,000 through our W-NAT scholarship test. Contact our counsellors for exact fee details."
  },
  {
    question: "Are there scholarships available for deserving students?",
    answer: "Yes, Wings Institute offers the W-NAT (Wings National Aptitude Test) scholarship. Students scoring 80% or above receive an instant ₹10,000 fee waiver. Additional scholarships may be available for economically weaker sections and meritorious students. Take the online scholarship test on our website."
  },
  {
    question: "Can I pay fees in instalments?",
    answer: "Yes, Wings Institute offers flexible EMI options for fee payment. You can pay the registration fee upfront and the remaining amount in 2-4 instalments over the course duration. We also accept education loans from partner banks. Discuss payment plans with our admissions counsellor."
  },
  {
    question: "When do new batches start at Wings Institute?",
    answer: "New batches start every month throughout the year. However, major intakes happen in January, April, July, and October. We recommend joining at the start of a batch for the best learning experience. Limited seats are available per batch to ensure personalised attention."
  },
  {
    question: "Can I visit the campus before taking admission?",
    answer: "Absolutely! We encourage prospective students and parents to visit our Alkapuri campus before enrolling. You can see our Airbus A330 Mock Cabin, Commercial Kitchen Lab, Makeover Studio, and interact with current students. Campus tours are free and available Monday-Saturday, 10 AM to 7 PM."
  },
  // ============================================================================
  // GUJARAT PARADIGM: Vernacular Voice Search FAQs (Gujlish/Hinglish)
  // ============================================================================
  {
    question: "Wings Institute ma admission kai rite levu? / Wings Institute mein admission kaise lein?",
    answer: "Simple 4-step process: 1) Campus visit ya +91-8758754444 par call karo, 2) Free career counselling attend karo, 3) Documents submit karo (10th, 12th marksheets, photos, Aadhar), 4) Registration fee pay karo. Ek hi visit ma pooru thai shake! Walk-in welcome - Mon-Sat, 10 AM to 7 PM, Alkapuri, Vadodara."
  },
  {
    question: "Wings Institute ma eligibility su joie? / Wings Institute mein eligibility kya chahiye?",
    answer: "Air Hostess: 12th pass, Age 17-26, Height 155cm+ (Girls), 170cm+ (Boys). Ground Staff: 12th pass, height restriction nai. Hotel Management: 10th/12th pass. Culinary: 10th pass. Gujarati/Hindi medium accepted - Spoken English aapde shikadviye!"
  },
  {
    question: "Wings Institute ma admission mate documents su joie? / Documents kya chahiye admission ke liye?",
    answer: "Documents list: 1) 10th, 12th mark sheets (original + 2 copy), 2) TC ya Migration Certificate, 3) 4 passport photos (white background), 4) Aadhar Card copy, 5) Character Certificate. Medical certificate optional at admission - placement pehle required."
  },
  {
    question: "Wings Institute fees ketli che? EMI milse? / Wings Institute fees kitni hai? EMI milega?",
    answer: "Haan, EMI available che! Full payment par discount, ya 2-4 instalments ma pay kari shako. W-NAT Scholarship: 80%+ score karo to ₹10,000 instant waiver! Course fees mate +91-8758754444 par call karo - exact structure malse."
  },
  {
    question: "Scholarship kevi rite male Wings ma? / Scholarship kaise milega Wings mein?",
    answer: "W-NAT Scholarship Test online lo - 5 minutes lagse! 80% ya uthhi score karo to ₹10,000 fee waiver instantly. EWS students mate additional scholarships available. Website par test start karo - free che!"
  },
  {
    question: "New batch kyare start che Wings ma? / New batch kab start hogi Wings mein?",
    answer: "Every month new batch start che! Major intakes: January, April, July, October. Per batch limited seats - personalized attention mate. Current batch joining date janva mate +91-8758754444 call karo."
  },
  {
    question: "Campus visit kari shakayu enroll karta pehla? / Campus visit kar sakte hain admission se pehle?",
    answer: "Haan bilkul! Campus visit FREE che. Airbus A330 Mock Cabin jovanu, Kitchen Lab, Makeover Studio - badhu jovaanu! Current students saathe vaat karo. Timing: Monday-Saturday, 10 AM to 7 PM. Address: RG Square, Alkapuri, Vadodara. Google Maps par search karo!"
  },
  {
    question: "12th result pachi direct admission male che? / 12th ke baad direct admission milega?",
    answer: "Haan! 12th pass karta j admission start kari shako. Result avi gaya hoy to documents laine aavo. Result aavvanu baaki hoy to provisional admission mali shake - later documents submit kari dejo. Don't wait - seats limited che!"
  },
  {
    question: "Admission mate interview che ke test che? / Admission ke liye interview ya test hai?",
    answer: "Formal interview nai, basic counselling session che. Aptitude test nai - pan scholarship mate W-NAT test lo to ₹10,000 sudhi discount! Simply documents laine aavo, counsellor saathe vaat karo, admission confirm karo."
  },
  {
    question: "Wings Institute Vadodara kya che? Address su che? / Wings Institute Vadodara kahan hai? Address kya hai?",
    answer: "Address: 2nd Floor, RG Square 14, Nutan Bharat Society, Alkapuri, Vadodara - 390007, Gujarat. Vadodara Railway Station thi 4 km, Harni Airport thi 8 km. Google Maps par 'Wings Institute Vadodara' search karo - directions malse. Contact: +91-8758754444."
  }
];

// Generate Schema Functions
const generateAdmissionsPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://wingsinstitute.com/admissions#webpage",
    "name": "Admissions - Wings Institute Vadodara",
    "description": "Apply for aviation, hotel management, and hospitality courses at Wings Institute Vadodara. Learn about eligibility, documents, fees, scholarships, and the admission process.",
    "url": "https://wingsinstitute.com/admissions",
    "isPartOf": {
      "@id": "https://wingsinstitute.com/#website"
    },
    "about": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Courses Available for Admission",
      "itemListElement": [
        {
          "@type": "Course",
          "position": 1,
          "name": "Air Hostess & Cabin Crew Training",
          "url": "https://wingsinstitute.com/air-hostess"
        },
        {
          "@type": "Course",
          "position": 2,
          "name": "Airport Management & Ground Staff",
          "url": "https://wingsinstitute.com/airport-mgmt"
        },
        {
          "@type": "Course",
          "position": 3,
          "name": "Hotel Management & Hospitality",
          "url": "https://wingsinstitute.com/hotel-mgmt"
        },
        {
          "@type": "Course",
          "position": 4,
          "name": "Culinary Arts & Professional Cooking",
          "url": "https://wingsinstitute.com/culinary"
        },
        {
          "@type": "Course",
          "position": 5,
          "name": "Travel & Tourism Management",
          "url": "https://wingsinstitute.com/travel-tourism"
        }
      ]
    }
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": admissionsFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const AdmissionsSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // WebPage Schema
    const pageScriptId = 'admissions-page-schema';
    const existingPageScript = document.getElementById(pageScriptId);
    if (existingPageScript) existingPageScript.remove();

    const pageScript = document.createElement('script');
    pageScript.id = pageScriptId;
    pageScript.type = 'application/ld+json';
    pageScript.textContent = JSON.stringify(generateAdmissionsPageSchema());
    document.head.appendChild(pageScript);

    // FAQ Schema
    const faqScriptId = 'admissions-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const pageScriptToRemove = document.getElementById(pageScriptId);
      if (pageScriptToRemove) pageScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/30 hover:border-green-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            <Icons.GraduationCap className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Admission Process, Eligibility & Documents
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Everything you need to know about joining Wings Institute
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-green-600 dark:text-green-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content - Always in DOM for SEO */}
      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          {/* Section 1: Admission Steps */}
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.ClipboardList className="w-5 h-5" />
              </span>
              Simple 4-Step Admission Process
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              Joining <strong>Wings Institute</strong> is straightforward. Our admission process is designed to be <strong>hassle-free</strong> and can often be completed in a <strong>single campus visit</strong>. Here's how it works:
            </p>

            <div className="grid gap-4 mb-8">
              {[
                { step: 1, title: 'Enquiry', desc: 'Fill the online form or call +91-8758754444. Our team will schedule a free counselling session at your convenience.', color: 'bg-blue-500' },
                { step: 2, title: 'Counselling', desc: 'Attend a 30-45 minute session with our career counsellor. Discuss course options, eligibility, fees, and placement prospects.', color: 'bg-green-500' },
                { step: 3, title: 'Document Submission', desc: 'Submit required documents: marksheets, photos, Aadhar card. Our team will verify and process your application same-day.', color: 'bg-amber-500' },
                { step: 4, title: 'Fee Payment & Confirmation', desc: 'Pay the registration fee (EMI options available). Receive your admission confirmation and batch joining date.', color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center font-bold text-lg`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Eligibility */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.UserCheck className="w-5 h-5" />
              </span>
              Eligibility Criteria by Course
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="py-3 px-4 text-left font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Course</th>
                    <th className="py-3 px-4 text-left font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Education</th>
                    <th className="py-3 px-4 text-left font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Age</th>
                    <th className="py-3 px-4 text-left font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Height</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700 font-medium">Air Hostess / Cabin Crew</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">12th Pass</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">17-26</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">F: 155cm+, M: 170cm+</td>
                  </tr>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700 font-medium">Airport Management</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">12th Pass</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">17-28</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">No restriction</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700 font-medium">Hotel Management</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">10th/12th Pass</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">17-30</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">No restriction</td>
                  </tr>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700 font-medium">Culinary Arts</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">10th Pass</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">17-35</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">No restriction</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700 font-medium">Travel & Tourism</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">12th Pass</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">17-30</td>
                    <td className="py-3 px-4 border border-zinc-200 dark:border-zinc-700">No restriction</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 text-sm">
              <strong>Note:</strong> Height requirements are for airline placements. Students below minimum height can still enrol and pursue ground staff or hospitality careers. View detailed eligibility on individual{' '}
              <Link href={ROUTES['air-hostess']} className="text-green-600 dark:text-green-400 underline hover:no-underline">
                course pages
              </Link>.
            </p>
          </section>

          {/* Section 3: Documents */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.FileText className="w-5 h-5" />
              </span>
              Documents Required for Admission
            </h2>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4">Document Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>10th Mark Sheet (Original + 2 copies)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>12th Mark Sheet (Original + 2 copies)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transfer Certificate (TC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Character Certificate</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>4 Passport-size Photos (White background)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Aadhar Card (Photocopy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Medical Fitness Certificate (Optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Passport (If available, for overseas placements)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Fees & Scholarships */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.Banknote className="w-5 h-5" />
              </span>
              Fees, EMI Options & Scholarships
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              We believe <strong>quality education should be accessible</strong>. Wings Institute offers multiple payment options to suit different financial situations:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.Banknote className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Full Payment</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Pay complete fees upfront and receive special discounts</p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.Calendar className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">EMI Plans</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Split fees into 2-4 easy monthly instalments</p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <Icons.Award className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">W-NAT Scholarship</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Score 80%+ in aptitude test for ₹10,000 fee waiver</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                <Icons.Sparkles className="w-5 h-5" />
                Take the Scholarship Test Now
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                Don't miss the chance to reduce your fees by ₹10,000! The <strong>W-NAT scholarship test</strong> takes only 5 minutes and can be taken online right now.
              </p>
              <Link 
                href={ROUTES['scholarship']}
                className="inline-block px-6 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Start Scholarship Test →
              </Link>
            </div>
          </section>

          {/* Section 5: FAQs */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Admission FAQs
            </h2>

            <div className="space-y-4">
              {admissionsFaqData.map((faq, index) => (
                <details 
                  key={index}
                  open
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-green-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="mb-6 opacity-90">
                Book a free counselling session today. Our team will guide you through the admission process and help you choose the right course.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href={ROUTES['contact']}
                  className="px-6 py-3 bg-white text-green-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Book Free Counselling
                </Link>
                <Link 
                  href={ROUTES['scholarship']}
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Icons.Award className="w-5 h-5" />
                  Take Scholarship Test
                </Link>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Noscript Fallback for SEO */}
      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>Simple 4-Step Admission Process at Wings Institute</h2>
          <p>1. Enquiry → 2. Counselling → 3. Documents → 4. Fee Payment. Eligibility: 12th Pass for most courses. Documents: Marksheets, Photos, Aadhar. Scholarships up to ₹10,000 available through W-NAT test.</p>
          <p>Contact: +91-8758754444 | Alkapuri, Vadodara</p>
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

export default AdmissionsSEOContent;

