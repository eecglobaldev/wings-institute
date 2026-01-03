/**
 * AIToolsSEOContent.tsx
 * 
 * Semantic Content Injection Module for AI Tools Landing Page
 * The "Innovation Core" - Blue Ocean differentiation strategy
 * 
 * SEO Strategy: Tech-forward positioning, long-tail traffic capture
 * Target: Students seeking modern training methods, career guidance tools
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';
import type { PageType } from '@/types';

// --- AI TOOLS DATA ---
const aiToolsData = [
  {
    id: "career-navigator",
    name: "AI Career Navigator",
    tagline: "Personalised Career Pathing Based on Psychometrics",
    description: "Not sure whether to become cabin crew or ground staff? Our AI Career Navigator analyses your personality traits, physical attributes (height, BMI), and career preferences to recommend the perfect aviation or hospitality role for you.",
    features: [
      "Psychometric assessment covering 50+ personality dimensions",
      "Height/BMI analysis matched against airline hiring criteria",
      "Interest mapping: Stability vs Travel, Leadership vs Service",
      "Personalised career roadmap with course recommendations",
      "Comparison of 20+ aviation and hospitality roles"
    ],
    targetKeywords: ["aviation career guidance", "which course is best for air hostess", "cabin crew vs ground staff"],
    icon: "Compass",
    color: "blue",
    pageType: "career-navigator" as PageType
  },
  {
    id: "interview-coach",
    name: "Job Interview Coach",
    tagline: "Real-Time AI Feedback on Your Interview Performance",
    description: "The #1 fear of students is facing an airline interview. Our AI Interview Coach simulates real IndiGo, Vistara, and Qatar Airways interviews, providing instant feedback on your answers, voice modulation, and confidence levels.",
    features: [
      "HR, GD (Group Discussion), and Technical round simulations",
      "Real-time voice analysis and sentiment detection",
      "Instant AI scoring with model answers",
      "Specific modules for Cabin Crew, Ground Staff, and Hotel Front Office",
      "Question bank curated from actual airline interviews",
      "Data privacy: Voice data processed in real-time, never stored"
    ],
    targetKeywords: ["mock interview for cabin crew", "indigo interview questions", "airline interview preparation"],
    icon: "MessageSquare",
    color: "cyan",
    pageType: "interview-coach" as PageType
  },
  {
    id: "pa-simulator",
    name: "In-Flight PA Simulator",
    tagline: "Master Cabin Announcements with AI Voice Analysis",
    description: "A cabin crew's voice is their command. This tool analyses your pronunciation, pacing (Words Per Minute), and clarity as you practise standard airline announcements. Available in English and Hindi.",
    features: [
      "Scenarios: Gate Arrival, Turbulence, Exit Row Briefing, Medical Emergency, Cabin Decompression",
      "AI Voice Analysis with speech rate tracking (optimal: 130-150 WPM)",
      "Multi-language support: English and Hindi announcements",
      "Accent neutralisation feedback for global standards",
      "Workflow: Select Scenario → Record → Analyse → Improve"
    ],
    targetKeywords: ["aviation english practice", "cabin crew announcement script", "air hostess voice training"],
    icon: "Mic",
    color: "purple",
    pageType: "pa-simulator" as PageType
  },
  {
    id: "resume-builder",
    name: "Resume Architect",
    tagline: "ATS-Ready Resumes for Aviation & Hospitality",
    description: "Airlines use Applicant Tracking Systems (ATS) that automatically reject resumes missing key industry keywords. Our Resume Architect ensures your CV passes ATS filters by optimising for terms like 'Safety,' 'Grooming,' 'First Aid,' and 'Customer Service Excellence.'",
    features: [
      "ATS Scanner: Checks resume against 50+ airline-specific keywords",
      "Magic Writer: Transforms casual language into professional terminology",
      "Job Matching: Shows your % compatibility with specific job postings",
      "Aviation-specific templates (IndiGo style, Emirates style, Taj Hotels style)",
      "Export to PDF, Word, and direct submission formats"
    ],
    targetKeywords: ["resume for air hostess fresher", "ground staff cv format", "cabin crew resume template"],
    icon: "FileText",
    color: "emerald",
    pageType: "resume-builder" as PageType
  },
  {
    id: "career-quest",
    name: "Career Quest",
    tagline: "Gamified Learning Across 16 Aviation Departments",
    description: "Learning doesn't have to be boring. Career Quest transforms aviation and hospitality education into an interactive game where you earn XP, badges, and compete on global leaderboards while mastering real industry skills.",
    features: [
      "16 specialised departments: From Ramp Handling to Front Office",
      "Skill gap analysis identifying your weak spots",
      "Progressive difficulty levels from Trainee to Elite",
      "Gamified rewards with badges and achievements",
      "Global leaderboard competition with Wings students"
    ],
    targetKeywords: ["aviation training games", "hospitality skill test", "airline job preparation quiz"],
    icon: "Trophy",
    color: "amber",
    pageType: "career-quest" as PageType
  }
];

// --- FAQ DATA ---
const aiToolsFaqData = [
  {
    question: "Are these AI tools available to non-Wings students?",
    answer: "Currently, the full 5-Tool AI Suite is exclusively available to enrolled Wings Institute students as part of their course package. However, we occasionally offer limited free trials of the Career Navigator tool during open house events and education fairs."
  },
  {
    question: "How is Wings Institute's AI different from ChatGPT or other AI tools?",
    answer: "Our AI tools are purpose-built for aviation and hospitality training. Unlike generic AI chatbots, our Interview Coach is trained on actual airline interview questions from IndiGo, Vistara, and Emirates. Our PA Simulator uses aviation-specific pronunciation standards. These tools understand industry context that general AI cannot."
  },
  {
    question: "Is my voice data stored when I use the Interview Coach or PA Simulator?",
    answer: "No. We have a strict Data Safety Policy. All voice data is processed in real-time on your device and is never uploaded to external servers. Once your session ends, the audio is automatically deleted. We only store your anonymised performance scores for progress tracking."
  },
  {
    question: "Can I access these tools on my mobile phone?",
    answer: "Yes. All five AI tools are mobile-responsive and work on smartphones and tablets. The Interview Coach and PA Simulator require microphone access, which works seamlessly on modern mobile browsers (Chrome, Safari). For the best experience, we recommend using headphones."
  },
  {
    question: "How accurate is the AI Career Navigator's career recommendation?",
    answer: "The Career Navigator has been validated against actual airline hiring outcomes. In internal testing with 500+ students, 87% of students who followed the recommended career path successfully cleared their first interview. The tool is continuously updated based on changing airline requirements."
  },
  {
    question: "Will the Resume Architect help me get past IndiGo's ATS system?",
    answer: "Our Resume Architect is specifically optimised for Indian aviation ATS systems. It includes keyword databases from IndiGo, Air India, SpiceJet, Vistara, and major international airlines. Students who use our tool see a 3x higher interview callback rate compared to generic resumes."
  },
  {
    question: "How often are the AI tools updated?",
    answer: "We update our AI tools monthly. The Interview Coach question bank is refreshed with new questions from recent airline recruitment drives. The Career Navigator's eligibility criteria are updated whenever airlines change their requirements. All updates are free for enrolled students."
  },
  {
    question: "Can these tools really replace human interview coaching?",
    answer: "Our AI tools complement, not replace, human coaching. They are designed for unlimited practice—something no human coach can provide. Students typically use AI tools for daily practice (100+ reps) and then attend weekly human mock interviews with our faculty for nuanced feedback."
  }
];

// --- SCHEMA.ORG GENERATION ---
const generateSoftwareApplicationSchema = () => {
  return aiToolsData.map(tool => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "eligibleRegion": "IN",
      "availability": "https://schema.org/InStoreOnly",
      "seller": {
        "@type": "EducationalOrganization",
        "@id": "https://wingsinstitute.com/#organization",
        "name": "Wings Institute Air Hostess & Hotel Management"
      }
    },
    "featureList": tool.features.join(", "),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "320",
      "bestRating": "5"
    },
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization"
    }
  }));
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aiToolsFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// --- MAIN COMPONENT ---
export const AIToolsSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Software Application Schema (array)
    const softwareScriptId = 'ai-tools-software-schema';
    const existingSoftwareScript = document.getElementById(softwareScriptId);
    if (existingSoftwareScript) existingSoftwareScript.remove();

    const softwareScript = document.createElement('script');
    softwareScript.id = softwareScriptId;
    softwareScript.type = 'application/ld+json';
    softwareScript.textContent = JSON.stringify(generateSoftwareApplicationSchema());
    document.head.appendChild(softwareScript);

    // FAQ Schema
    const faqScriptId = 'ai-tools-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const scriptsToRemove = [softwareScriptId, faqScriptId];
      scriptsToRemove.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-300 dark:border-blue-700', text: 'text-blue-600 dark:text-blue-400', glow: 'shadow-blue-500/20' },
    cyan: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', border: 'border-cyan-300 dark:border-cyan-700', text: 'text-cyan-600 dark:text-cyan-400', glow: 'shadow-cyan-500/20' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-300 dark:border-purple-700', text: 'text-purple-600 dark:text-purple-400', glow: 'shadow-purple-500/20' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-300 dark:border-emerald-700', text: 'text-emerald-600 dark:text-emerald-400', glow: 'shadow-emerald-500/20' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-300 dark:border-amber-700', text: 'text-amber-600 dark:text-amber-400', glow: 'shadow-amber-500/20' },
  };

  return (
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Accordion Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
          aria-controls="ai-tools-seo-content"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Icons.Bot className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                India's First AI-Integrated Aviation Training Ecosystem
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                5 Proprietary AI Tools • Unlimited Practice • Privacy-First Design
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-cyan-200 dark:border-cyan-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </div>
        </button>

        {/* Expandable Content - Always in DOM for SEO */}
        <div
          id="ai-tools-seo-content"
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: isExpanded ? 'visible' : 'auto' }}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-cyan-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline">

            {/* ==================== SECTION 1: HERO NARRATIVE ==================== */}
            <h2 id="ai-ecosystem">India's First AI-Integrated Aviation Training Ecosystem</h2>
            
            <p>
              While traditional aviation institutes still rely on <strong>textbooks and rote memorisation</strong>, Wings Institute has built something revolutionary: a proprietary <strong>5-Tool AI Suite</strong> that transforms how students prepare for airline careers.
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800/30 my-8 not-prose">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Icons.Sparkles className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">The Wings Difference: AI vs. Paper</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    <strong>Textbooks teach you theory; AI tools teach you precision.</strong> Our Interview Coach analyses your voice confidence in real-time. Our PA Simulator measures your speaking rate to the exact word-per-minute. Our Resume Architect scans your CV against the same ATS systems used by IndiGo and Emirates. This is training for the digital age.
                  </p>
                </div>
              </div>
            </div>

            <h3>Why AI-Powered Training Matters</h3>

            <ul>
              <li><strong>Unlimited Repetition:</strong> Practice 100 interviews a day without a human coach getting tired</li>
              <li><strong>24/7 Access:</strong> Train at midnight if that's when you're most focused</li>
              <li><strong>Private & Safe:</strong> Fail safely in front of AI, learn faster without embarrassment</li>
              <li><strong>Instant Feedback:</strong> No waiting for a teacher to grade your performance</li>
              <li><strong>Data-Driven Improvement:</strong> Track your progress with objective metrics, not subjective opinions</li>
            </ul>

            {/* ==================== SECTION 2: TOOL GRID ==================== */}
            <h2 id="tool-suite">The 5-Tool AI Suite: Complete Overview</h2>

            <p>
              Each tool in our ecosystem is designed to target a specific stage of your career preparation journey—from choosing the right course to cracking the final interview.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              {aiToolsData.map((tool) => {
                const colors = colorClasses[tool.color];
                const IconComponent = Icons[tool.icon as keyof typeof Icons];
                
                return (
                  <div 
                    key={tool.id}
                    className={`${colors.bg} p-6 rounded-2xl border ${colors.border} shadow-lg ${colors.glow} hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center ${colors.text}`}>
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white">{tool.name}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{tool.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                      {tool.description.substring(0, 150)}...
                    </p>
                    <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 mb-4">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icons.Check className={`w-3 h-3 mt-0.5 ${colors.text} shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={ROUTES[tool.pageType]}
                      className={`text-sm font-semibold ${colors.text} hover:underline flex items-center gap-1`}
                    >
                      Explore {tool.name} <Icons.ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* ==================== SECTION 3: DETAILED TOOL BREAKDOWN ==================== */}
            <h2 id="ai-career-navigator">Tool 1: AI Career Navigator – Find Your Perfect Aviation Role</h2>

            <p>
              The biggest mistake students make is choosing a course without understanding which role suits their personality. Our <strong>AI Career Navigator</strong> uses psychometric profiling to match your traits to the perfect job.
            </p>

            <p>
              <strong>How It Works:</strong>
            </p>
            <ol>
              <li><strong>Input Your Data:</strong> Education level, height, BMI, language proficiency, interests</li>
              <li><strong>Psychometric Assessment:</strong> 50+ questions measuring leadership, service orientation, stress tolerance</li>
              <li><strong>AI Analysis:</strong> Your profile is matched against airline hiring criteria from IndiGo, Emirates, Marriott, etc.</li>
              <li><strong>Personalised Roadmap:</strong> Receive a detailed career path with course recommendations</li>
            </ol>

            <p>
              <em>Example Output: "Based on your high service orientation (85%) and preference for stability over travel, we recommend <strong>Airport Ground Staff</strong>. Suggested course: Diploma in Airport Management."</em>
            </p>

            <h2 id="job-interview-coach">Tool 2: Job Interview Coach – Conquer Your Fear</h2>

            <p>
              Interviews are where dreams are won or lost. Our <strong>AI Interview Coach</strong> simulates real airline and hotel interviews, providing instant feedback on:
            </p>

            <ul>
              <li><strong>Content Quality:</strong> Are you answering the question correctly?</li>
              <li><strong>Voice Confidence:</strong> Sentiment analysis detects nervousness vs. confidence</li>
              <li><strong>Speech Patterns:</strong> Filler words ("umm," "like") are flagged</li>
              <li><strong>Response Time:</strong> Are you answering too fast (nervous) or too slow (unprepared)?</li>
            </ul>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/30 my-8 not-prose">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <Icons.Lock className="w-5 h-5 text-purple-600" />
                Privacy-First Design
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                <strong>Your voice data is never stored.</strong> All audio processing happens in real-time on your device. When your session ends, the audio is automatically deleted. We only store anonymised performance scores for progress tracking. This addresses the #1 concern students have about AI tools.
              </p>
            </div>

            <h2 id="in-flight-pa-simulator">Tool 3: In-Flight PA Simulator – Master the Mic</h2>

            <p>
              Every cabin crew member must deliver announcements with perfect clarity. Our <strong>PA Simulator</strong> offers practice scenarios for every in-flight situation:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase tracking-wider">Scenario</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase tracking-wider">Script Type</th>
                    <th className="px-4 py-3 text-left font-bold text-sm uppercase tracking-wider">Languages</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Gate Arrival Welcome</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Standard, Premium</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">English, Hindi</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Turbulence Warning</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Emergency</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">English, Hindi</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Exit Row Briefing</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Safety</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">English</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Medical Emergency</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Emergency</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">English, Hindi</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Cabin Decompression</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Emergency</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">English</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Tech Specs:</strong> AI Voice Analysis • Speech Rate Tracking (optimal: 1.00x / 130-150 WPM) • Accent Neutralisation Feedback • Real-time Waveform Visualisation
            </p>

            <h2 id="resume-builder">Tool 4: Resume Architect – Beat the Bots</h2>

            <p>
              Did you know that <strong>75% of resumes are rejected by ATS</strong> (Applicant Tracking Systems) before a human ever sees them? Airlines like IndiGo, Emirates, and Air India use ATS to filter thousands of applications. Our Resume Architect is built to beat these systems.
            </p>

            <h3>ATS Keyword Optimisation</h3>

            <p>
              We've analysed hundreds of successful aviation resumes to identify the keywords that trigger positive ATS scores:
            </p>

            <ul>
              <li><strong>Safety & Compliance:</strong> "Safety protocols," "Emergency procedures," "DGCA regulations"</li>
              <li><strong>Service Excellence:</strong> "Passenger comfort," "Service recovery," "Guest relations"</li>
              <li><strong>Grooming & Presentation:</strong> "Professional appearance," "Uniform standards," "Personal grooming"</li>
              <li><strong>Communication:</strong> "Fluent English," "Multilingual," "PA announcements"</li>
              <li><strong>Certifications:</strong> "First Aid certified," "Fire Fighting trained," "Dangerous Goods awareness"</li>
            </ul>

            <h2 id="career-quest">Tool 5: Career Quest – Learn While Playing</h2>

            <p>
              The most effective learning happens when you're having fun. <strong>Career Quest</strong> transforms aviation and hospitality training into a gamified experience with XP points, badges, and leaderboard competition.
            </p>

            <p>
              <strong>16 Departments Covered:</strong> Cabin Service • Galley Operations • Ramp Handling • Cargo Management • Check-in • Boarding Gate • Security (AVSEC) • Lounge Hospitality • Front Office • Housekeeping • F&B Service • Banquets • Kitchen Operations • Guest Relations • Revenue Management • Night Audit
            </p>

            {/* ==================== SECTION 4: FAQ ==================== */}
            <h2 id="ai-tools-faq">Frequently Asked Questions About AI Tools</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {aiToolsFaqData.map((faq, idx) => (
                <details 
                  key={idx} 
                  open
                  className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-semibold text-zinc-900 dark:text-white pr-4 text-sm md:text-base">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                      <Icons.ChevronDown className="w-4 h-4 text-zinc-500" />
                    </div>
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Experience the Future of Aviation Training</h3>
              <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
                These tools are exclusively available to Wings Institute students. Join India's most technologically advanced aviation academy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href={ROUTES['admissions']}
                  className="px-8 py-4 bg-white text-cyan-600 rounded-full font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2"
                >
                  Apply for Admission <Icons.ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="tel:+918758754444" 
                  className="px-8 py-4 bg-cyan-500 text-white rounded-full font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-4 h-4" /> +91-8758754444
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Noscript Fallback */}
        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>India's First AI-Integrated Aviation Training</h2>
            <p>Wings Institute offers 5 proprietary AI tools: Career Navigator, Interview Coach, PA Simulator, Resume Architect, and Career Quest. These tools are exclusively available to enrolled students.</p>
            
            <h2>AI Tools Overview</h2>
            <ul>
              <li><strong>AI Career Navigator</strong> - Psychometric career matching</li>
              <li><strong>Job Interview Coach</strong> - Real-time interview feedback</li>
              <li><strong>In-Flight PA Simulator</strong> - Voice training for announcements</li>
              <li><strong>Resume Architect</strong> - ATS-optimised CV builder</li>
              <li><strong>Career Quest</strong> - Gamified learning</li>
            </ul>
            
            <p>Contact: +91-8758754444 | Visit: Alkapuri, Vadodara</p>
          </div>
        </noscript>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #ai-tools-seo-content {
            max-height: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AIToolsSEOContent;

