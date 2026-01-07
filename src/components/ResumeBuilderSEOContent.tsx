/**
 * ResumeBuilderSEOContent.tsx
 * 
 * Semantic Content Injection Module for Resume Architect Tool
 * SEO Strategy: ATS-ready resume keywords, aviation CV formats
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// --- ATS KEYWORDS DATA ---
const atsKeywords = {
  aviation: ["Safety protocols", "Emergency procedures", "DGCA regulations", "Passenger handling", "In-flight service", "PA announcements", "First Aid certified", "Fire Fighting trained", "Dangerous Goods awareness", "Crew coordination"],
  hospitality: ["Guest relations", "Front office operations", "PMS software", "Revenue management", "Upselling", "Check-in/Check-out", "Concierge services", "Night audit", "Guest satisfaction", "Service recovery"],
  grooming: ["Professional appearance", "Uniform standards", "Personal grooming", "Presentation skills", "Etiquette", "Body language", "Posture", "Hygiene standards"],
  communication: ["Fluent English", "Multilingual", "Clear diction", "Customer interaction", "Conflict resolution", "Email communication", "Telephone etiquette"]
};

// --- TEMPLATE DATA ---
const resumeTemplates = [
  { name: "IndiGo Style", format: "Single-column, modern, blue accents", bestFor: "Domestic airline cabin crew, ground staff" },
  { name: "Emirates Premium", format: "Two-column, elegant, gold highlights", bestFor: "International airlines, premium roles" },
  { name: "Taj Hotels Classic", format: "Traditional, conservative, minimal design", bestFor: "Luxury hotel front office, concierge" },
  { name: "Marriott Corporate", format: "Modern, ATS-optimised, clean layout", bestFor: "International hotel chains, corporate" },
  { name: "Fresh Graduate", format: "Skills-first, education highlight, no experience required", bestFor: "Freshers, first job seekers" }
];

// --- FAQ DATA ---
const resumeFaqData = [
  {
    question: "What is ATS and why does it matter for airline resumes?",
    answer: "ATS (Applicant Tracking System) is software used by IndiGo, Emirates, Taj Hotels, and most large employers to automatically filter resumes before humans see them. 75% of resumes are rejected by ATS due to missing keywords, incorrect formatting, or non-standard fonts. Our Resume Architect ensures your CV passes these automated filters."
  },
  {
    question: "Which keywords should be in an air hostess resume?",
    answer: "Key aviation keywords include: Safety protocols, Emergency procedures, In-flight service, Passenger handling, PA announcements, First Aid certified, Fire Fighting trained, Dangerous Goods awareness, Crew coordination, DGCA regulations. Our tool automatically suggests these based on your target role."
  },
  {
    question: "Can I use creative designs for airline resumes?",
    answer: "No. ATS systems struggle to read creative layouts, columns, graphics, and unusual fonts. For aviation and hospitality, stick to single-column, plain-text formats with standard fonts (Arial, Calibri). Our templates are specifically designed to be ATS-compliant while still looking professional."
  },
  {
    question: "How does the Magic Writer feature work?",
    answer: "Magic Writer uses AI to transform casual descriptions into professional terminology. For example: 'I served food to passengers' becomes 'Executed meal service protocols ensuring passenger comfort and dietary compliance.' It adds industry-specific keywords while maintaining authenticity."
  },
  {
    question: "What if I have no work experience?",
    answer: "Our 'Fresh Graduate' template is designed specifically for freshers. It emphasises: Educational qualifications, Training certifications (Wings diploma), Soft skills (communication, grooming), Extracurricular activities, and Internship experience. Many airlines specifically hire freshers for cabin crew roles."
  },
  {
    question: "Can the tool check my existing resume?",
    answer: "Yes. Upload your current resume, and our ATS Scanner will analyse it against 50+ airline-specific keywords, flag formatting issues, and provide a compatibility score. You'll see exactly why your resume might be getting rejected and how to fix it."
  }
];

// --- SCHEMA.ORG ---
const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings Resume Architect",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "ATS-optimised resume builder for aviation and hospitality careers. Features airline-specific keywords, Magic Writer AI, job matching scores, and templates for IndiGo, Emirates, Taj Hotels, and more.",
  "featureList": "ATS Scanner, Magic Writer AI, Aviation Keywords Database, Job Match Scoring, Multiple Export Formats (PDF, Word), IndiGo/Emirates/Taj Templates",
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
    "ratingValue": "4.8",
    "ratingCount": "195",
    "bestRating": "5"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": resumeFaqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// --- MAIN COMPONENT ---
export const ResumeBuilderSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const softwareScriptId = 'resume-builder-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    const faqScriptId = 'resume-builder-faq-schema';
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
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Icons.FileText className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                Resume Architect: Complete Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                ATS Scanner • Magic Writer • Aviation Templates
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </button>

        <div
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-emerald-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6">

            <h2 id="resume-overview">Beat the Bots: ATS-Ready Resumes for Aviation Careers</h2>
            
            <p>
              Did you know that <strong>75% of resumes are rejected by Applicant Tracking Systems (ATS)</strong> before a human ever sees them? Airlines like IndiGo, Emirates, and Air India use ATS to filter thousands of applications. If your resume doesn't have the right keywords in the right format, you're automatically rejected—regardless of your qualifications.
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">The Resume Architect Difference</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Icons.Search className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-zinc-900 dark:text-white">ATS Scanner</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">Checks against 50+ airline keywords</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-zinc-900 dark:text-white">Magic Writer</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">AI-powered professional language</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.Target className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-zinc-900 dark:text-white">Job Match Score</strong>
                    <p className="text-zinc-600 dark:text-zinc-400">% compatibility with specific jobs</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="resume-keywords">Essential ATS Keywords by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              {Object.entries(atsKeywords).map(([category, keywords]) => (
                <div key={category} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                  <h4 className="font-bold text-zinc-900 dark:text-white capitalize mb-3 flex items-center gap-2">
                    <Icons.Tag className="w-4 h-4 text-emerald-600" />
                    {category} Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h2 id="resume-templates">Available Resume Templates</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Template</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Format</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  {resumeTemplates.map((template, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${idx % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900/50'}`}>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{template.name}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{template.format}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{template.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="resume-magic-writer">Magic Writer: Before & After Examples</h2>

            <div className="space-y-4 my-8 not-prose">
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-200 dark:border-red-800/30">
                <div className="text-xs font-bold text-red-600 uppercase mb-2">❌ Before (Casual)</div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">"I served food and drinks to passengers on flights."</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <div className="text-xs font-bold text-emerald-600 uppercase mb-2">✅ After (Professional)</div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">"Executed meal service protocols ensuring passenger comfort and dietary compliance. Managed trolley operations for 180-seat aircraft, maintaining hygiene standards and service timing."</p>
              </div>
            </div>

            <h2 id="resume-keywords-seo">Target Keywords: Resume Building</h2>

            <ul>
              <li><strong>Resume for air hostess fresher</strong> – Fresh graduate templates</li>
              <li><strong>Ground staff CV format</strong> – Airport operations focus</li>
              <li><strong>Cabin crew resume template</strong> – IndiGo/Emirates style</li>
              <li><strong>ATS-friendly resume for airlines</strong> – Keyword optimisation</li>
              <li><strong>Aviation resume samples India</strong> – Indian market templates</li>
            </ul>

            <h2 id="resume-faq">Frequently Asked Questions</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {resumeFaqData.map((faq, idx) => (
                <details key={idx} className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden" open>
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm md:text-base">{faq.question}</span>
                    <Icons.ChevronDown className="w-4 h-4 text-zinc-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Build Your ATS-Ready Resume Today</h3>
              <p className="text-emerald-100 mb-6">Get past the bots and into the interview room. Available to Wings students.</p>
              <Link href={ROUTES['admissions']} className="px-8 py-4 bg-white text-emerald-600 rounded-full font-bold hover:bg-emerald-50 transition-colors cursor-pointer inline-block">
                Apply for Admission
              </Link>
            </div>

          </div>
        </div>

        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>Resume Architect</h2>
            <p>ATS-optimised resume builder with airline-specific keywords, Magic Writer AI, and templates for IndiGo, Emirates, Taj Hotels, and more. Beat the automated filters.</p>
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default ResumeBuilderSEOContent;

