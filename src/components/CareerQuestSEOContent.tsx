/**
 * CareerQuestSEOContent.tsx
 * 
 * Semantic Content Injection Module for CareerQuest AI Knowledge Simulator
 * SEO Strategy: Aviation quiz keywords, hospitality knowledge test, career readiness
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// --- DEPARTMENT CATEGORIES DATA ---
const quizCategories = [
  {
    category: "Aviation",
    departments: [
      { name: "Cabin Crew - Safety", description: "Emergency procedures, safety demos, evacuation drills" },
      { name: "Cabin Crew - Service", description: "F&B service, passenger care, hospitality" },
      { name: "Airport Check-In", description: "DCS systems, baggage, travel documents" },
      { name: "AVSEC - Aviation Security", description: "DGR, security protocols, anti-sabotage" },
      { name: "Boarding Gate", description: "Boarding procedures, announcements, turnaround" },
      { name: "Frisking & Screening", description: "HHMD/DFMD, prohibited items" },
      { name: "Ramp Operations", description: "Marshaling, baggage handling, ground safety" },
      { name: "International Travel", description: "Visa, customs, immigration" },
      { name: "Aviation English & PA", description: "In-flight announcements, vocabulary" }
    ]
  },
  {
    category: "Hospitality",
    departments: [
      { name: "Hotel Management (General)", description: "Industry overview, star classifications" },
      { name: "Front Office", description: "Check-in/out, concierge, PMS, reservations" },
      { name: "F&B Service", description: "Fine dining, wine service, banquet operations" },
      { name: "Food Production", description: "Culinary arts, kitchen hygiene, cooking methods" },
      { name: "Housekeeping", description: "Room cleaning, bed making, laundry standards" }
    ]
  },
  {
    category: "Career Skills",
    departments: [
      { name: "Grooming & Etiquette", description: "Professional appearance standards" },
      { name: "Interview Readiness", description: "HR questions, STAR method, situational judgement" }
    ]
  }
];

// --- FAQ DATA ---
const careerQuestFaqData = [
  {
    question: "What is CareerQuest AI and how does it work?",
    answer: "CareerQuest AI is an intelligent knowledge simulator designed for Aviation and Hospitality career preparation. It uses AI to generate scenario-based questions across 16 specialised departments covering Cabin Crew Safety, Airport Operations, Hotel Management, Culinary Arts, and more. The system adapts difficulty based on your performance and provides detailed explanations for every answer."
  },
  {
    question: "How many departments and questions are available in CareerQuest?",
    answer: "CareerQuest covers 16 departments organised into three categories: Aviation (9 departments including Cabin Crew Safety, AVSEC, Check-In, Boarding Gate, Ramp Operations), Hospitality (5 departments including Front Office, F&B Service, Food Production, Housekeeping), and Career Skills (2 departments: Grooming and Interview Prep). Each department has 5 sets of 20 questions each—totalling 100 questions per department, or 1,600+ questions across the platform."
  },
  {
    question: "What makes CareerQuest different from regular quiz apps?",
    answer: "CareerQuest uses AI-generated questions that simulate real-world operational scenarios you'll face in airlines and hotels. Questions are not memorised from textbooks but created dynamically based on industry protocols. You get: 1) Scenario-based situational questions, 2) AI-generated motivational feedback, 3) Expert explanations for every answer, 4) Progressive difficulty unlocking (score 60% to advance), 5) Bilingual support (English/Hindi)."
  },
  {
    question: "Is CareerQuest available in Hindi?",
    answer: "Yes! CareerQuest supports both English and Hindi. You can switch languages at any time. All questions, explanations, and UI elements are fully translated. This helps vernacular students from Gujarat, Rajasthan, and other Hindi-speaking regions prepare confidently in their preferred language."
  },
  {
    question: "How does the scoring and progression system work?",
    answer: "Each department has 5 difficulty sets: Set 1 (Fundamentals), Set 2 (SOPs), Set 3 (Operational Scenarios), Set 4 (Emergency & Critical Care), Set 5 (Mastery & Regulations). You must score at least 12/20 (60%) to unlock the next set. Your XP (experience points) accumulate across sessions, and streak bonuses reward consecutive correct answers."
  },
  {
    question: "Can CareerQuest help me prepare for airline interviews?",
    answer: "Absolutely. The 'Interview Readiness' department specifically covers HR questions, situational judgement tests (SJT), and the STAR method (Situation, Task, Action, Result) used by recruiters. Additionally, domain knowledge from AVSEC, Safety, and Service departments gives you the technical depth that impresses interviewers at IndiGo, Vistara, Air India, and international airlines."
  },
  {
    question: "Do I need an internet connection to use CareerQuest?",
    answer: "Yes, CareerQuest requires an internet connection as questions are generated in real-time by AI. This ensures fresh, varied questions every session rather than repetitive memorised content. However, once questions load, they remain available even if connection drops temporarily."
  },
  {
    question: "Is CareerQuest free for Wings Institute students?",
    answer: "Yes. CareerQuest is available exclusively to enrolled Wings Institute students as part of our AI-integrated training ecosystem. Students can access it through the Wings Institute website after logging in with their credentials. External users may have limited access during promotional periods."
  }
];

// --- SCHEMA.ORG ---
const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wings CareerQuest AI",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "AI-powered career readiness quiz platform for aviation and hospitality students. Features 16 departments, 1,600+ scenario-based questions, bilingual support (English/Hindi), progressive difficulty, and expert explanations.",
  "featureList": "AI Question Generation, 16 Specialised Departments, Scenario-Based Learning, Bilingual Support (English/Hindi), Progressive Difficulty, Expert Explanations, XP & Streak System, Interview Preparation",
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
    "ratingCount": "320",
    "bestRating": "5"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": careerQuestFaqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// --- MAIN COMPONENT ---
export const CareerQuestSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const softwareScriptId = 'careerquest-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    const faqScriptId = 'careerquest-faq-schema';
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
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Icons.Gamepad2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                CareerQuest AI: Complete Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                16 Departments • 1,600+ Questions • Bilingual (English/Hindi)
              </p>
            </div>
          </div>
          <Icons.ChevronDown className={`w-6 h-6 text-amber-600 dark:text-amber-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:scale-110`} />
        </button>

        {/* Expandable Content - Always in DOM for SEO */}
        <div 
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: 'auto' }}
        >
          <article className="prose prose-zinc dark:prose-invert max-w-none">

            {/* Section 1: Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Icons.Sparkles className="w-5 h-5" />
                </span>
                What is CareerQuest AI?
              </h2>

              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                <strong>CareerQuest AI</strong> is India's first AI-powered knowledge simulator designed specifically for <strong>Aviation and Hospitality career preparation</strong>. Unlike traditional quiz apps that recycle the same memorised questions, CareerQuest uses artificial intelligence to generate <strong>scenario-based operational questions</strong> that mirror real-world situations you'll encounter in airlines, airports, and hotels.
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                  <Icons.Target className="w-5 h-5" />
                  Why CareerQuest Matters
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>AI-Generated Questions:</strong> Fresh scenarios every session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Industry-Accurate:</strong> Based on airline SOPs and hotel protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Expert Explanations:</strong> Learn 'why' not just 'what'</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Bilingual:</strong> Full English and Hindi support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Progressive Difficulty:</strong> Unlock harder sets as you improve</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Interview Ready:</strong> Covers HR, technical, and situational questions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Departments Coverage */}
            <section className="mb-12">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Icons.LayoutGrid className="w-5 h-5" />
                </span>
                16 Specialised Departments
              </h2>

              <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                CareerQuest covers every aspect of aviation and hospitality careers through <strong>16 specialised departments</strong>. Each department contains <strong>100 questions</strong> organised into 5 progressive difficulty sets.
              </p>

              <div className="space-y-6">
                {quizCategories.map((cat) => (
                  <div key={cat.category} className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
                    <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                      <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        {cat.category === 'Aviation' && <Icons.Plane className="w-5 h-5 text-blue-500" />}
                        {cat.category === 'Hospitality' && <Icons.Building className="w-5 h-5 text-teal-500" />}
                        {cat.category === 'Career Skills' && <Icons.Briefcase className="w-5 h-5 text-purple-500" />}
                        {cat.category}
                        <span className="text-xs font-normal text-zinc-500 ml-2">({cat.departments.length} departments)</span>
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {cat.departments.map((dept) => (
                          <div key={dept.name} className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl text-sm">
                            <div className="font-semibold text-zinc-900 dark:text-white mb-1">{dept.name}</div>
                            <div className="text-zinc-500 dark:text-zinc-400 text-xs">{dept.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: How It Works */}
            <section className="mb-12">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Icons.Zap className="w-5 h-5" />
                </span>
                How CareerQuest Works
              </h2>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { step: 1, title: "Select Department", desc: "Choose from Aviation, Hospitality, or Career Skills categories", icon: "LayoutGrid" },
                  { step: 2, title: "Start Quiz", desc: "AI generates 20 scenario-based questions instantly", icon: "Sparkles" },
                  { step: 3, title: "Answer & Learn", desc: "Get expert explanations for every question", icon: "BookOpen" },
                  { step: 4, title: "Progress", desc: "Score 60%+ to unlock harder difficulty sets", icon: "TrendingUp" }
                ].map((item) => (
                  <div key={item.step} className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 text-center relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>
                    {React.createElement((Icons as Record<string, React.ComponentType<{className?: string}>>)[item.icon], { className: "w-8 h-8 text-amber-600 mx-auto mb-3" })}
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icons.Trophy className="w-5 h-5 text-amber-600" />
                  Progressive Difficulty System
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-200 dark:border-amber-800">
                        <th className="py-2 px-4 text-left font-bold text-zinc-900 dark:text-white">Set</th>
                        <th className="py-2 px-4 text-left font-bold text-zinc-900 dark:text-white">Focus Area</th>
                        <th className="py-2 px-4 text-left font-bold text-zinc-900 dark:text-white">Questions</th>
                        <th className="py-2 px-4 text-left font-bold text-zinc-900 dark:text-white">Unlock Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-700 dark:text-zinc-300">
                      <tr className="border-b border-amber-100 dark:border-amber-900/50">
                        <td className="py-2 px-4 font-semibold">Set 1</td>
                        <td className="py-2 px-4">Fundamentals & Terminology</td>
                        <td className="py-2 px-4">20</td>
                        <td className="py-2 px-4 text-green-600">Always Unlocked</td>
                      </tr>
                      <tr className="border-b border-amber-100 dark:border-amber-900/50">
                        <td className="py-2 px-4 font-semibold">Set 2</td>
                        <td className="py-2 px-4">Standard Procedures (SOPs)</td>
                        <td className="py-2 px-4">20</td>
                        <td className="py-2 px-4">12/20 in Set 1</td>
                      </tr>
                      <tr className="border-b border-amber-100 dark:border-amber-900/50">
                        <td className="py-2 px-4 font-semibold">Set 3</td>
                        <td className="py-2 px-4">Operational Scenarios</td>
                        <td className="py-2 px-4">20</td>
                        <td className="py-2 px-4">12/20 in Set 2</td>
                      </tr>
                      <tr className="border-b border-amber-100 dark:border-amber-900/50">
                        <td className="py-2 px-4 font-semibold">Set 4</td>
                        <td className="py-2 px-4">Emergency & Critical Care</td>
                        <td className="py-2 px-4">20</td>
                        <td className="py-2 px-4">12/20 in Set 3</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-semibold">Set 5</td>
                        <td className="py-2 px-4">Mastery & Regulations</td>
                        <td className="py-2 px-4">20</td>
                        <td className="py-2 px-4">12/20 in Set 4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 4: SEO Keywords Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Icons.Award className="w-5 h-5" />
                </span>
                Prepare for Aviation & Hospitality Careers
              </h2>

              <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                Whether you're preparing for <strong>cabin crew interviews at IndiGo</strong>, <strong>ground staff roles at Vadodara Airport</strong>, or <strong>front office positions at Taj Hotels</strong>, CareerQuest gives you the domain knowledge and situational judgement skills that recruiters demand. Our AI-generated questions cover:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800/50">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <Icons.Plane className="w-5 h-5" /> Aviation Knowledge
                  </h4>
                  <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>• DGCA regulations and safety protocols</li>
                    <li>• Emergency evacuation procedures</li>
                    <li>• Dangerous Goods Regulations (DGR)</li>
                    <li>• Airport security (AVSEC/BCAS)</li>
                    <li>• Check-in and boarding procedures</li>
                    <li>• In-flight service excellence</li>
                  </ul>
                </div>
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-5 border border-teal-200 dark:border-teal-800/50">
                  <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-3 flex items-center gap-2">
                    <Icons.Building className="w-5 h-5" /> Hospitality Knowledge
                  </h4>
                  <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>• Front office operations and PMS</li>
                    <li>• F&B service styles and etiquette</li>
                    <li>• Culinary fundamentals and HACCP</li>
                    <li>• Housekeeping standards</li>
                    <li>• Guest complaint handling</li>
                    <li>• Revenue management basics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Icons.HelpCircle className="w-5 h-5" />
                </span>
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {careerQuestFaqData.map((faq, index) => (
                  <details 
                    key={index}
                    open
                    className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-white pr-4 text-sm md:text-base">{faq.question}</span>
                      <Icons.ChevronDown className="w-5 h-5 text-amber-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-12">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
                <p className="mb-6 opacity-90 max-w-xl mx-auto">
                  Challenge yourself across 16 departments with AI-generated questions. Build real confidence for your aviation and hospitality career.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href={ROUTES['career-quest']}
                    className="px-8 py-4 bg-white text-amber-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2 shadow-lg inline-flex"
                  >
                    <Icons.Gamepad2 className="w-5 h-5" />
                    Start CareerQuest
                  </Link>
                  <Link 
                    href={ROUTES['ai-tools']}
                    className="px-8 py-4 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2 inline-flex"
                  >
                    <Icons.Cpu className="w-5 h-5" />
                    Explore All AI Tools
                  </Link>
                </div>
              </div>
            </section>

          </article>
        </div>

        {/* Noscript Fallback */}
        <noscript>
          <div className="prose prose-zinc max-w-none mt-8">
            <h2>CareerQuest AI - Aviation & Hospitality Knowledge Simulator</h2>
            <p>AI-powered quiz platform with 16 departments covering Cabin Crew Safety, AVSEC, Airport Operations, Hotel Front Office, F&B Service, and more. 1,600+ scenario-based questions with bilingual support (English/Hindi).</p>
          </div>
        </noscript>

        {/* Print Styles */}
        <style>{`
          @media print {
            .overflow-hidden { overflow: visible !important; max-height: none !important; opacity: 1 !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default CareerQuestSEOContent;

