/**
 * PASimulatorSEOContent.tsx
 * 
 * Semantic Content Injection Module for In-Flight PA Simulator Tool
 * SEO Strategy: Long-tail keywords for aviation English, cabin announcements
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// --- SCENARIO DATA ---
const paScenarios = [
  { name: "Gate Arrival Welcome", type: "Standard", difficulty: "Beginner", languages: ["English", "Hindi"] },
  { name: "Pre-Flight Safety Demonstration", type: "Safety", difficulty: "Beginner", languages: ["English", "Hindi"] },
  { name: "Meal Service Announcement", type: "Service", difficulty: "Beginner", languages: ["English", "Hindi"] },
  { name: "Turbulence Warning", type: "Emergency", difficulty: "Intermediate", languages: ["English", "Hindi"] },
  { name: "Exit Row Briefing", type: "Safety", difficulty: "Intermediate", languages: ["English"] },
  { name: "Landing Preparation", type: "Standard", difficulty: "Beginner", languages: ["English", "Hindi"] },
  { name: "Medical Emergency", type: "Emergency", difficulty: "Advanced", languages: ["English", "Hindi"] },
  { name: "Cabin Decompression", type: "Emergency", difficulty: "Advanced", languages: ["English"] },
  { name: "Emergency Evacuation", type: "Emergency", difficulty: "Advanced", languages: ["English", "Hindi"] },
  { name: "Duty-Free Sales Pitch", type: "Commercial", difficulty: "Intermediate", languages: ["English"] }
];

// --- FAQ DATA ---
const paFaqData = [
  {
    question: "What speech rate is considered optimal for cabin announcements?",
    answer: "The optimal speech rate for in-flight announcements is 130-150 words per minute (WPM). Our PA Simulator tracks your WPM in real-time and provides feedback. Speaking too fast (>160 WPM) causes passengers to miss important safety information, while speaking too slow (<120 WPM) sounds unprofessional and boring."
  },
  {
    question: "Can I practise cabin crew announcements in Hindi?",
    answer: "Yes. Our PA Simulator supports both English and Hindi announcements. On domestic Indian carriers like IndiGo and Air India, crew members must deliver announcements in both languages. We provide scripts and AI analysis for both."
  },
  {
    question: "How does the AI voice analysis work?",
    answer: "Our AI analyses multiple dimensions of your voice: 1) Speech Rate (WPM), 2) Clarity Score based on pronunciation, 3) Volume Consistency, 4) Pause Patterns (natural pauses vs. filler sounds), 5) Accent Characteristics. You receive a composite score out of 100 with specific improvement suggestions."
  },
  {
    question: "What emergency scenarios are available to practise?",
    answer: "We offer five emergency scenarios: Turbulence Warning, Medical Emergency, Cabin Decompression, Emergency Evacuation, and Security Threat. These are the exact scripts used by major airlines. Emergency announcements require a calm but authoritative tone—our AI specifically evaluates this."
  },
  {
    question: "Is the PA Simulator available on mobile phones?",
    answer: "Yes. The PA Simulator works on any device with a microphone—smartphones, tablets, and laptops. For best results, use headphones to prevent echo. The app works in Chrome, Safari, and Firefox browsers."
  },
  {
    question: "How many times can I practise each announcement?",
    answer: "Unlimited. Unlike classroom training where you might get 5-10 chances to practise, our AI-powered simulator allows infinite repetitions. This is the key advantage—you can practise 100 times a day until your delivery is perfect."
  }
];

// --- SCHEMA.ORG ---
const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings In-Flight PA Simulator",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "AI-powered in-flight public announcement practice tool for cabin crew training. Features voice analysis, speech rate tracking, and scenarios for gate arrival, turbulence, emergency evacuation, and more.",
  "featureList": "AI Voice Analysis, Speech Rate Tracking (WPM), Multi-language Support (English/Hindi), Emergency Scenario Library, Accent Neutralisation Feedback",
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
    "ratingCount": "185",
    "bestRating": "5"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": paFaqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// --- MAIN COMPONENT ---
export const PASimulatorSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const softwareScriptId = 'pa-simulator-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    const faqScriptId = 'pa-simulator-faq-schema';
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
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Icons.Mic className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                In-Flight PA Simulator: Complete Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                AI Voice Analysis • 10 Scenarios • English/Hindi Support
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-purple-200 dark:border-purple-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
        </button>

        <div
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-purple-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6">

            <h2 id="pa-overview">Master Cabin Announcements with AI Voice Training</h2>
            
            <p>
              A cabin crew member's voice is their command. Whether you're delivering a <strong>welcome announcement</strong> or managing a <strong>medical emergency</strong>, your voice must convey authority, clarity, and calm. Our <strong>In-Flight PA Simulator</strong> provides unlimited practice with real-time AI feedback on every aspect of your delivery.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Technical Specifications</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-bold text-purple-600">Speech Rate</div>
                  <div className="text-zinc-600 dark:text-zinc-400">130-150 WPM (1.00x)</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600">Languages</div>
                  <div className="text-zinc-600 dark:text-zinc-400">English, Hindi</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600">Scenarios</div>
                  <div className="text-zinc-600 dark:text-zinc-400">10 Categories</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600">Analysis</div>
                  <div className="text-zinc-600 dark:text-zinc-400">Real-time AI</div>
                </div>
              </div>
            </div>

            <h2 id="pa-scenarios">Available Announcement Scenarios</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Scenario</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Type</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Difficulty</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase">Languages</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  {paScenarios.map((scenario, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${idx % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900/50'}`}>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{scenario.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          scenario.type === 'Emergency' ? 'bg-red-100 text-red-700' :
                          scenario.type === 'Safety' ? 'bg-amber-100 text-amber-700' :
                          scenario.type === 'Commercial' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {scenario.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{scenario.difficulty}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{scenario.languages.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="pa-workflow">How to Use the PA Simulator</h2>

            <ol>
              <li><strong>Select Scenario:</strong> Choose from 10 categories based on your training level</li>
              <li><strong>Review Script:</strong> Read the standard airline script (IndiGo/Air India format)</li>
              <li><strong>Record Your Voice:</strong> Click record and deliver the announcement</li>
              <li><strong>AI Analysis:</strong> Receive instant feedback on WPM, clarity, pauses, and confidence</li>
              <li><strong>Improve & Repeat:</strong> View suggestions and practise until you achieve 90%+ score</li>
            </ol>

            <h2 id="pa-keywords">Target Keywords for Aviation English</h2>

            <p>
              Our PA Simulator is designed to help you master the specific vocabulary and phrasing used in <strong>aviation English</strong>. This includes terms like:
            </p>

            <ul>
              <li><strong>Cabin crew announcement script</strong> for gate arrival and departure</li>
              <li><strong>Aviation English practice</strong> for non-native speakers</li>
              <li><strong>Air hostess voice training</strong> exercises</li>
              <li><strong>Emergency announcement protocol</strong> (turbulence, evacuation)</li>
              <li><strong>In-flight service announcement</strong> templates</li>
            </ul>

            <h2 id="pa-faq">Frequently Asked Questions</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {paFaqData.map((faq, idx) => (
                <details key={idx} className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden" open>
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm md:text-base">{faq.question}</span>
                    <Icons.ChevronDown className="w-4 h-4 text-zinc-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm">{faq.answer}</div>
                </details>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Ready to Master the Mic?</h3>
              <p className="text-purple-100 mb-6">This tool is available to Wings Institute students. Enrol today.</p>
              <Link href={ROUTES['admissions']} className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-50 transition-colors cursor-pointer inline-block">
                Apply for Admission
              </Link>
            </div>

          </div>
        </div>

        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>In-Flight PA Simulator</h2>
            <p>AI-powered cabin announcement practice tool with voice analysis, speech rate tracking, and 10 scenarios including emergencies. Available in English and Hindi.</p>
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default PASimulatorSEOContent;

