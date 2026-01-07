/**
 * InterviewCoachSEOContent.tsx
 * 
 * Semantic Content Injection Module for Job Interview Coach Tool
 * SEO Strategy: Mock interview keywords, airline-specific questions
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// --- INTERVIEW MODULES DATA ---
const interviewModules = [
  {
    role: "Cabin Crew",
    airline: "IndiGo, Vistara, Air India",
    rounds: ["HR Round", "Group Discussion", "Technical Round", "Grooming Assessment"],
    sampleQuestions: [
      "Tell me about a time you handled a difficult passenger.",
      "Why do you want to become cabin crew?",
      "How would you handle a medical emergency on board?",
      "Describe your understanding of safety protocols."
    ]
  },
  {
    role: "Ground Staff",
    airline: "Airport Authority, Airlines",
    rounds: ["HR Round", "Technical Round", "Situation Handling"],
    sampleQuestions: [
      "How would you handle an irate passenger who missed their flight?",
      "Explain the check-in process for international flights.",
      "What is DCS and how is it used?",
      "How do you prioritise tasks during peak hours?"
    ]
  },
  {
    role: "Hotel Front Office",
    airline: "Taj, Marriott, Hyatt",
    rounds: ["HR Round", "Role Play", "Guest Scenario"],
    sampleQuestions: [
      "How would you handle a guest complaint about their room?",
      "Describe the check-in process for VIP guests.",
      "What is upselling and how would you apply it?",
      "How do you maintain composure under pressure?"
    ]
  }
];

// --- FAQ DATA ---
const interviewFaqData = [
  {
    question: "What types of interview questions does the AI coach cover?",
    answer: "Our AI Interview Coach covers three categories: HR Questions (personality, motivation, background), Technical Questions (safety protocols, procedures, airline knowledge), and Situational Questions (handling difficult passengers, emergencies, conflicts). The question bank includes 500+ questions sourced from actual IndiGo, Vistara, Air India, and international airline interviews."
  },
  {
    question: "How does the AI provide feedback on my interview answers?",
    answer: "The AI analyses your response across multiple dimensions: Content Quality (relevance, completeness, structure), Delivery (confidence, pace, clarity), Filler Words (counting 'umm', 'like', pauses), and Sentiment (detecting nervousness vs. confidence). You receive a score out of 100 with specific suggestions for improvement."
  },
  {
    question: "Is my voice data stored or shared?",
    answer: "No. We have a strict privacy policy. All voice processing happens in real-time on your device using edge computing. Your audio is never uploaded to external servers or stored. Only anonymised performance metrics (scores, completion rates) are saved for progress tracking."
  },
  {
    question: "Can the AI simulate Group Discussion (GD) rounds?",
    answer: "Yes. Our GD Simulator presents you with a topic and simulates 3-4 other 'virtual candidates' making points. You must interject, agree, disagree, and summarise—just like a real GD. The AI scores your participation rate, point quality, and leadership behaviour."
  },
  {
    question: "How accurate are the model answers provided?",
    answer: "Model answers are crafted by our faculty who have 15+ years of airline HR experience. They are reviewed by current airline recruiters to ensure they reflect what hiring managers actually want to hear. Model answers include both 'what to say' and 'what NOT to say'."
  },
  {
    question: "Can I practise specifically for IndiGo or Emirates interviews?",
    answer: "Yes. We have airline-specific modules with questions and assessment criteria tailored to each company's interview style. IndiGo focuses heavily on situational handling, while Emirates places more weight on grooming and international etiquette."
  }
];

// --- SCHEMA.ORG ---
const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings Job Interview Coach",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "AI-powered mock interview simulator for cabin crew, ground staff, and hotel front office roles. Features real-time voice analysis, sentiment detection, and 500+ questions from actual airline interviews.",
  "featureList": "HR Round Simulation, Group Discussion Practice, Technical Questions, Voice Confidence Analysis, Instant AI Scoring, Model Answers, Airline-Specific Modules (IndiGo, Vistara, Emirates)",
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
    "ratingValue": "4.9",
    "ratingCount": "275",
    "bestRating": "5"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": interviewFaqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// --- MAIN COMPONENT ---
export const InterviewCoachSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const softwareScriptId = 'interview-coach-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    const faqScriptId = 'interview-coach-faq-schema';
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
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Icons.MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                Job Interview Coach: Complete Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                500+ Questions • AI Feedback • Airline-Specific Modules
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-cyan-200 dark:border-cyan-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </div>
        </button>

        <div
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-cyan-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6">

            <h2 id="interview-overview">Conquer Your Interview Fear with AI-Powered Practice</h2>
            
            <p>
              The <strong>#1 reason students fail airline interviews</strong> is not lack of knowledge—it's lack of practice. Most candidates get nervous because they've never faced tough questions under pressure. Our <strong>AI Interview Coach</strong> simulates real IndiGo, Vistara, and international airline interviews, providing instant feedback so you can practise until you're perfect.
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Icons.Lock className="w-5 h-5 text-cyan-600" />
                Data Safety Policy
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                <strong>Your privacy is protected.</strong> Voice data is processed in real-time on your device and is <strong>never stored or uploaded</strong>. We only save anonymised performance scores for progress tracking. This addresses the #1 concern students have about AI interview tools.
              </p>
            </div>

            <h2 id="interview-modules">Role-Specific Interview Modules</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              {interviewModules.map((module, idx) => (
                <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-2">{module.role}</h4>
                  <p className="text-xs text-cyan-600 mb-4">{module.airline}</p>
                  <div className="mb-4">
                    <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Interview Rounds</div>
                    <div className="flex flex-wrap gap-2">
                      {module.rounds.map((round, i) => (
                        <span key={i} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded text-xs">{round}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase mb-2">Sample Questions</div>
                    <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                      {module.sampleQuestions.slice(0, 2).map((q, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icons.MessageCircle className="w-3 h-3 mt-1 text-cyan-500 shrink-0" />
                          <span className="line-clamp-2">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="interview-features">AI Analysis Features</h2>

            <p>
              Our Interview Coach doesn't just ask questions—it <strong>analyses your response</strong> like a real HR manager would:
            </p>

            <ul>
              <li><strong>Content Quality:</strong> Is your answer relevant, structured, and complete?</li>
              <li><strong>Voice Confidence:</strong> Sentiment analysis detects nervousness vs. authority</li>
              <li><strong>Speech Patterns:</strong> Filler words ("umm," "like") are flagged and counted</li>
              <li><strong>Response Time:</strong> Too fast = nervous; too slow = unprepared</li>
              <li><strong>Model Answers:</strong> See how an ideal response should sound</li>
            </ul>

            <h2 id="interview-keywords">Target Keywords: Airline Interview Preparation</h2>

            <p>
              This tool helps you prepare for common search queries like:
            </p>

            <ul>
              <li><strong>Mock interview for cabin crew</strong> – Practice with AI feedback</li>
              <li><strong>IndiGo interview questions</strong> – Real questions from recent drives</li>
              <li><strong>Air hostess interview tips</strong> – What to say and what NOT to say</li>
              <li><strong>Ground staff interview preparation</strong> – DCS, check-in procedures</li>
              <li><strong>Airline GD topics</strong> – Group discussion practice</li>
            </ul>

            <h2 id="interview-faq">Frequently Asked Questions</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {interviewFaqData.map((faq, idx) => (
                <details key={idx} className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden" open>
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm md:text-base">{faq.question}</span>
                    <Icons.ChevronDown className="w-4 h-4 text-zinc-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Interview?</h3>
              <p className="text-cyan-100 mb-6">Practise unlimited times with AI feedback. Available to Wings students.</p>
              <Link href={ROUTES['admissions']} className="px-8 py-4 bg-white text-cyan-600 rounded-full font-bold hover:bg-cyan-50 transition-colors cursor-pointer inline-block">
                Apply for Admission
              </Link>
            </div>

          </div>
        </div>

        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>Job Interview Coach</h2>
            <p>AI-powered mock interview tool with 500+ questions from actual airline interviews. Covers HR, GD, and technical rounds for cabin crew, ground staff, and hotel roles.</p>
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default InterviewCoachSEOContent;

