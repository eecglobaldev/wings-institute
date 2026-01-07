/**
 * CareerNavigatorSEOContent.tsx
 * 
 * Semantic Content Injection Module for AI Career Navigator Tool
 * SEO Strategy: Career guidance keywords, course selection help
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// --- CAREER ROLES DATA ---
const careerRoles = [
  {
    role: "Cabin Crew / Air Hostess",
    personality: "Extroverted, Service-Oriented, Travel Lover",
    heightReq: "Female: 155cm+, Male: 170cm+",
    salaryRange: "₹35,000 - ₹3,00,000/month",
    lifestyle: "Travel-intensive, irregular hours",
    course: "Air Hostess & Cabin Crew Training"
  },
  {
    role: "Airport Ground Staff",
    personality: "Organised, Detail-Oriented, Stability Seeker",
    heightReq: "No strict requirement",
    salaryRange: "₹18,000 - ₹80,000/month",
    lifestyle: "Shift-based, local posting",
    course: "Airport Management Diploma"
  },
  {
    role: "Hotel Front Office",
    personality: "Hospitable, Patient, Problem-Solver",
    heightReq: "Presentable appearance",
    salaryRange: "₹15,000 - ₹60,000/month",
    lifestyle: "Fixed location, shift rotations",
    course: "Hotel Management Diploma"
  },
  {
    role: "Culinary Chef",
    personality: "Creative, Disciplined, Passionate",
    heightReq: "No requirement",
    salaryRange: "₹20,000 - ₹2,00,000/month",
    lifestyle: "Kitchen-based, physically demanding",
    course: "Culinary Arts Certificate"
  },
  {
    role: "Travel Consultant",
    personality: "Entrepreneurial, Sales-Driven, Networker",
    heightReq: "No requirement",
    salaryRange: "₹15,000 - ₹1,00,000/month",
    lifestyle: "Office-based or remote, sales targets",
    course: "Travel & Tourism Management"
  }
];

// --- FAQ DATA ---
const careerNavFaqData = [
  {
    question: "How does the AI Career Navigator decide which role suits me?",
    answer: "The Career Navigator uses a multi-factor analysis: 1) Psychometric Assessment covering 50+ personality dimensions (leadership, service orientation, stress tolerance), 2) Physical Parameters (height, BMI matched against airline requirements), 3) Lifestyle Preferences (travel vs stability, office vs field), 4) Educational Background. The AI cross-references your profile against actual hiring criteria from IndiGo, Emirates, Taj Hotels, and more."
  },
  {
    question: "Is the height requirement really that strict for cabin crew?",
    answer: "Yes, for flying roles. IndiGo and Air India require minimum 155cm for females and 170cm for males. However, if you don't meet height requirements, you can still have a successful aviation career in ground staff, cargo, or airport retail roles—all of which the Navigator considers."
  },
  {
    question: "What if I'm confused between cabin crew and hotel management?",
    answer: "This is exactly why we built the Career Navigator. Many students are attracted to the 'glamour' of flying but may be better suited for hotel hospitality based on their personality. The tool helps you make an objective decision based on data, not emotions. It shows you a detailed comparison of both paths."
  },
  {
    question: "Can the Career Navigator help my parents understand my career choice?",
    answer: "Yes! The Navigator generates a detailed PDF report that includes: career path comparison, salary projections over 10 years, job security analysis, and 'day in the life' descriptions. Many students use this report to explain their chosen career to skeptical parents."
  },
  {
    question: "How accurate are the career recommendations?",
    answer: "In validation testing with 500+ students, 87% who followed the Navigator's primary recommendation successfully cleared their first job interview. The tool is continuously updated based on changing airline requirements and industry trends."
  },
  {
    question: "Does the Navigator consider my educational background?",
    answer: "Yes. The tool asks about your highest qualification, stream (Arts/Science/Commerce), percentage, and any gaps. Some airlines have minimum educational requirements (12th pass with 50% for cabin crew), and the Navigator factors this into recommendations."
  }
];

// --- SCHEMA.ORG ---
const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings AI Career Navigator",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "AI-powered career guidance tool for aviation and hospitality students. Uses psychometric profiling to match personality traits, physical parameters, and preferences to the ideal job role.",
  "featureList": "Psychometric Assessment, Height/BMI Analysis, Personality Mapping, Career Comparison Tool, PDF Report Generation, Course Recommendations",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStoreOnly",
    "seller": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "ratingCount": "210",
    "bestRating": "5"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": careerNavFaqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// --- MAIN COMPONENT ---
export const CareerNavigatorSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const softwareScriptId = 'career-navigator-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    const faqScriptId = 'career-navigator-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      [softwareScriptId, faqScriptId].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Icons.Compass className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                AI Career Navigator: Complete Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Psychometric Profiling • Role Matching • Course Recommendations
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </button>

        <div
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6">

            <h2 id="navigator-overview">Find Your Perfect Aviation or Hospitality Career</h2>
            
            <p>
              The biggest mistake students make is <strong>choosing a course without understanding which role suits their personality</strong>. Someone who prefers stability might struggle as cabin crew (irregular hours, constant travel). Someone who loves travel might get bored in ground staff roles. Our <strong>AI Career Navigator</strong> uses psychometric science to match you with the perfect career.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">How the Navigator Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-white">Input Data</div>
                  <div className="text-zinc-500 text-xs">Education, Height, BMI, Languages</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-white">Assessment</div>
                  <div className="text-zinc-500 text-xs">50+ Psychometric Questions</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-white">AI Analysis</div>
                  <div className="text-zinc-500 text-xs">Match vs Airline Criteria</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-lg">4</span>
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-white">Roadmap</div>
                  <div className="text-zinc-500 text-xs">Personalised Career Path</div>
                </div>
              </div>
            </div>

            <h2 id="navigator-roles">Career Roles Covered</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Role</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Best For</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Height Req.</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Salary Range</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  {careerRoles.map((role, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${idx % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900/50'}`}>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{role.role}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{role.personality}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{role.heightReq}</td>
                      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">{role.salaryRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="navigator-questions">Sample Psychometric Questions</h2>

            <p>
              The assessment includes questions designed to reveal your true preferences:
            </p>

            <ul>
              <li><strong>"Do you prefer predictable routines or exciting variety?"</strong> – Gauges stability vs. adventure preference</li>
              <li><strong>"How do you handle angry customers?"</strong> – Measures service temperament</li>
              <li><strong>"Would you rather lead a team or support a leader?"</strong> – Identifies leadership vs. team player traits</li>
              <li><strong>"How comfortable are you being away from home for weeks?"</strong> – Assesses travel readiness</li>
              <li><strong>"Do you enjoy physical work or desk-based tasks?"</strong> – Matches job physicality</li>
            </ul>

            <h2 id="navigator-output">What You'll Receive</h2>

            <p>
              After completing the assessment, you receive:
            </p>

            <ol>
              <li><strong>Primary Recommendation:</strong> Your best-fit career role with match percentage</li>
              <li><strong>Alternative Options:</strong> 2-3 backup roles that also suit your profile</li>
              <li><strong>Personality Insights:</strong> Your scores on leadership, service orientation, stress tolerance</li>
              <li><strong>Course Recommendation:</strong> Which Wings diploma/certificate to enrol in</li>
              <li><strong>PDF Report:</strong> Shareable document for parents and counsellors</li>
            </ol>

            <h2 id="navigator-keywords">Target Keywords: Career Guidance</h2>

            <ul>
              <li><strong>Aviation career guidance</strong> – Data-driven career pathing</li>
              <li><strong>Which course is best for air hostess</strong> – Role matching</li>
              <li><strong>Cabin crew vs ground staff</strong> – Comparison analysis</li>
              <li><strong>Air hostess height requirement</strong> – Eligibility check</li>
              <li><strong>Best career after 12th in aviation</strong> – Course selection</li>
            </ul>

            <h2 id="navigator-faq">Frequently Asked Questions</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {careerNavFaqData.map((faq, idx) => (
                <details key={idx} className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden" open>
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm md:text-base">{faq.question}</span>
                    <Icons.ChevronDown className="w-4 h-4 text-zinc-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Discover Your Perfect Career Path</h3>
              <p className="text-blue-100 mb-6">Take the AI assessment and get personalised course recommendations.</p>
              <Link href={ROUTES['admissions']} className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors cursor-pointer inline-block">
                Apply for Admission
              </Link>
            </div>

          </div>
        </div>

        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>AI Career Navigator</h2>
            <p>Psychometric career guidance tool for aviation and hospitality. Matches your personality, height, and preferences to the ideal job role and course.</p>
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default CareerNavigatorSEOContent;

