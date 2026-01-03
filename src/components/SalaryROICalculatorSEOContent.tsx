'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// FAQ Data for Schema
const roiCalculatorFaqData = [
  {
    question: "What is the ROI (Return on Investment) of an aviation course?",
    answer: "The ROI of an aviation course like Air Hostess Training is exceptionally high. With course fees around ₹1.5 Lakhs and starting salaries of ₹35,000-45,000 per month for domestic airlines, students recover their entire investment within 4-5 months of employment. Compare this to a 3-year BBA degree costing ₹3-5 Lakhs where you only start earning at age 21-22."
  },
  {
    question: "How does the Wings Salary Calculator work?",
    answer: "The Wings Salary ROI Calculator takes two inputs: your chosen career path (Cabin Crew, Ground Staff, Hotel Management, Culinary, or Travel & Tourism) and your current educational qualification. It then computes your expected starting salary, break-even period (months to recover course fees), and projected 5-year total earnings based on industry salary data for Wings graduates."
  },
  {
    question: "What is the starting salary for air hostess in India 2026?",
    answer: "In 2026, entry-level air hostess salaries in India range from ₹35,000 to ₹45,000 per month for domestic airlines (IndiGo, Air India, SpiceJet). For international carriers like Emirates, Qatar Airways, and Singapore Airlines, starting salaries can reach ₹1.5 to ₹2.5 Lakhs per month including allowances and perks."
  },
  {
    question: "Is a diploma better than a degree for aviation careers?",
    answer: "Yes, for aviation careers specifically, a 1-year diploma is often more valuable than a 3-year degree. Airlines like IndiGo and Air India only require 12th pass qualification—they train crew themselves. A diploma from Wings Institute gives you practical skills (mock cabin training, grooming, interviews) that get you hired faster. You start earning at age 19 instead of 22."
  },
  {
    question: "How long does it take to recover aviation course fees?",
    answer: "Wings graduates typically recover their course fees within 4-6 months of employment. For example, if your course fee is ₹1.5 Lakhs and your starting salary is ₹40,000/month, you recover the investment in just 4 months. This is the fastest ROI in the education sector."
  },
  {
    question: "What is the 5-year earning potential after cabin crew training?",
    answer: "A Wings cabin crew graduate can expect to earn approximately ₹25-35 Lakhs over 5 years. This includes salary progression from Junior Crew (₹40k/month) to Senior Crew (₹80k/month) to In-Flight Manager (₹1.8 Lakh/month). International placements can double these figures."
  },
  {
    question: "Which course has the highest salary ROI at Wings Institute?",
    answer: "Cabin Crew/Air Hostess training offers the highest ROI due to high starting salaries and rapid career progression. Hotel Management and Culinary Arts also offer excellent ROI, especially for students targeting international hotel chains like Taj, Marriott, or Hyatt where Executive Chef salaries can exceed ₹3 Lakhs/month."
  },
  {
    question: "Does the calculator account for inflation and salary increments?",
    answer: "Yes, our calculator models a realistic career trajectory with salary increments at 2-year and 5-year milestones. It accounts for industry-standard promotions (Junior to Senior to Manager level) and uses 2026 salary benchmarks from actual Wings graduate placements."
  }
];

// Generate Schema Functions
const generateWebApplicationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://wingsinstitute.com/roi-calculator#app",
    "name": "Wings Salary ROI Calculator",
    "alternateName": "Aviation Course ROI Calculator",
    "description": "Calculate the return on investment for aviation and hospitality courses. Compare diploma vs degree earnings, estimate break-even period, and project 5-year salary growth for Cabin Crew, Ground Staff, Hotel Management, Culinary, and Travel careers.",
    "url": "https://wingsinstitute.com/roi-calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management"
    },
    "featureList": [
      "Career path salary comparison",
      "Break-even period calculation",
      "5-year earnings projection",
      "Diploma vs Degree ROI comparison",
      "Industry-specific salary data"
    ],
    "screenshot": "https://wingsinstitute.com/images/roi-calculator-screenshot.png",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-01",
    "inLanguage": "en-IN"
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": roiCalculatorFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const SalaryROICalculatorSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Web Application Schema
    const appScriptId = 'roi-calculator-app-schema';
    const existingAppScript = document.getElementById(appScriptId);
    if (existingAppScript) existingAppScript.remove();

    const appScript = document.createElement('script');
    appScript.id = appScriptId;
    appScript.type = 'application/ld+json';
    appScript.textContent = JSON.stringify(generateWebApplicationSchema());
    document.head.appendChild(appScript);

    // FAQ Schema
    const faqScriptId = 'roi-calculator-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const appScriptToRemove = document.getElementById(appScriptId);
      if (appScriptToRemove) appScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/30 hover:border-emerald-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Icons.Calculator className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Understanding Salary ROI for Aviation & Hospitality Careers
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Learn how the calculator works and why diploma ROI beats degree programmes
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content - Always in DOM for SEO */}
      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          {/* Section 1: The Logic Behind ROI */}
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icons.TrendingUp className="w-5 h-5" />
              </span>
              Calculate the Return on Your Education Investment
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              Education is an investment, not an expense. The <strong>Wings Salary ROI Calculator</strong> helps you make data-driven decisions about your career path. Instead of relying on vague promises like "good placement," our calculator shows you exactly <strong>when you'll recover your course fees</strong> and <strong>how much you'll earn over 5 years</strong>.
            </p>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              The calculator uses real salary data from <strong>Wings Institute graduates</strong> placed in airlines like <strong>IndiGo</strong>, <strong>Air India</strong>, <strong>Qatar Airways</strong>, and hotels like <strong>Taj</strong>, <strong>Marriott</strong>, and <strong>Hyatt</strong>. It models a realistic career trajectory with promotions at the 2-year and 5-year marks.
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2">
                <Icons.Calculator className="w-5 h-5" />
                How the Calculator Works
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Inputs</h4>
                  <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Career Path:</strong> Cabin Crew, Ground Staff, Hotel, Culinary, or Travel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Education Level:</strong> 10th, 12th, or Graduate</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Outputs</h4>
                  <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-start gap-2">
                      <Icons.ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Starting Salary:</strong> Expected monthly income at entry level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Break-Even Period:</strong> Months to recover course fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>5-Year Earnings:</strong> Total projected income with promotions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: The Gujarat Paradigm - Diploma vs Degree */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icons.Brain className="w-5 h-5" />
              </span>
              The Gujarat Paradigm: Why Diploma Beats Degree for Aviation
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              In Gujarat, we understand the value of <strong>efficiency</strong> and <strong>practical ROI</strong>. The <strong>"Gujarat Paradigm"</strong> is simple: why spend 3-4 years and ₹3-5 Lakhs on a BBA or BCom when you can be <strong>earning ₹35,000-45,000 per month within 12 months</strong> of starting a diploma course?
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="py-4 px-4 text-left font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Parameter</th>
                    <th className="py-4 px-4 text-center font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">3-Year Degree (BBA/BCom)</th>
                    <th className="py-4 px-4 text-center font-bold text-emerald-700 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700">1-Year Diploma (Wings)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-zinc-900">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Duration</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">3-4 Years</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">12 Months</td>
                  </tr>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Total Cost</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">₹3-5 Lakhs</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">₹1.2-1.5 Lakhs</td>
                  </tr>
                  <tr className="bg-white dark:bg-zinc-900">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Age When You Start Earning</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">21-22 Years</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">19 Years</td>
                  </tr>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Starting Salary</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">₹15,000-25,000</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">₹35,000-45,000</td>
                  </tr>
                  <tr className="bg-white dark:bg-zinc-900">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">Break-Even Period</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">12-20 Months</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">4-5 Months</td>
                  </tr>
                  <tr className="bg-emerald-50 dark:bg-emerald-900/20">
                    <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">5-Year Total Earnings</td>
                    <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">₹12-18 Lakhs</td>
                    <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border border-zinc-200 dark:border-zinc-700">₹25-35 Lakhs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <Icons.Zap className="w-5 h-5" />
                The Time Value of Money
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Starting your career 2-3 years earlier means you're <strong>earning and saving</strong> while your peers are still studying. By the time a BBA graduate starts their first job at ₹20,000/month, a Wings diploma graduate has already earned ₹8-10 Lakhs and is likely promoted to Senior Crew earning ₹60,000-80,000/month.
              </p>
            </div>
          </section>

          {/* Section 3: Real-World Examples */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icons.Users className="w-5 h-5" />
              </span>
              Real Wings Graduate Success Stories
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-panel p-6 rounded-2xl border border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Icons.Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">Priya Shah, IndiGo Cabin Crew</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2023 Graduate</p>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                  "I completed my Air Hostess diploma at Wings in 12 months. Started at IndiGo with ₹42,000/month. Recovered my ₹1.5 Lakh course fee in just 4 months. Now earning ₹75,000/month as Senior Crew after 2 years."
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Course Fee:</span>
                    <span className="font-bold text-zinc-900 dark:text-white ml-2">₹1.5 Lakhs</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Current Salary:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 ml-2">₹75,000/month</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Icons.ConciergeBell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">Rahul Patel, Taj Hotel Manager</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2022 Graduate</p>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                  "Hotel Management diploma from Wings got me placed at Taj Vadodara. Started at ₹28,000/month, now Department Manager earning ₹65,000/month. The practical training at Wings' fine dining setup was exactly what hotels look for."
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Course Fee:</span>
                    <span className="font-bold text-zinc-900 dark:text-white ml-2">₹1.2 Lakhs</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Current Salary:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 ml-2">₹65,000/month</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Why Use This Calculator */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icons.Target className="w-5 h-5" />
              </span>
              Why Use the Wings Salary ROI Calculator?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Icons.Brain className="w-5 h-5 text-emerald-500" />
                  Data-Driven Decisions
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Don't rely on generic placement statistics. See exactly how your specific career choice translates into rupees and time.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Icons.Users className="w-5 h-5 text-emerald-500" />
                  Convince Your Family
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Show your parents the numbers. When they see the 4-month break-even period, they'll understand why a diploma makes sense.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Icons.BarChart3 className="w-5 h-5 text-emerald-500" />
                  Compare Career Paths
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Unsure between Cabin Crew and Ground Staff? Compare 5-year earnings side by side to make an informed choice.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" />
                  No Marketing Fluff
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Real salary data from actual placements. No inflated numbers or unrealistic promises—just honest projections.
                </p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              The calculator is designed for students and parents in <strong>Gujarat</strong>, <strong>Rajasthan</strong>, and <strong>Maharashtra</strong> who value practical ROI over prestige. It embodies the <strong>Gujarati business spirit</strong>—every rupee spent on education should multiply. If you're ready to see your projected earnings, scroll up and select your career path. For personalised counselling, visit our{' '}
              <Link href={ROUTES['admissions']} className="text-emerald-600 dark:text-emerald-400 underline hover:no-underline font-medium">
                Admissions page
              </Link>{' '}
              or call <strong>+91-8758754444</strong>.
            </p>
          </section>

          {/* Section 5: FAQs */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Frequently Asked Questions About Salary & ROI
            </h2>

            <div className="space-y-4">
              {roiCalculatorFaqData.map((faq, index) => (
                <details 
                  key={index}
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-emerald-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
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
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Calculate Your Future Earnings?</h3>
              <p className="mb-6 opacity-90">
                Select your career path above and see exactly how much you'll earn over the next 5 years. Numbers don't lie—let the data guide your decision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href={ROUTES['scholarship']}
                  className="px-6 py-3 bg-white text-emerald-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Award className="w-5 h-5" />
                  Take Scholarship Test
                </Link>
                <a 
                  href="tel:+918758754444"
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Call +91-8758754444
                </a>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Noscript Fallback for SEO */}
      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>Calculate the Return on Your Education Investment</h2>
          <p>The Wings Salary ROI Calculator helps you compare aviation diploma vs degree ROI. Input your career path (Cabin Crew, Ground Staff, Hotel, Culinary, Travel) and education level to see starting salary, break-even period, and 5-year earnings.</p>
          <h3>Gujarat Paradigm: 1-year diploma = Start earning at 19. 3-year degree = Start at 22.</h3>
          <h3>Cabin Crew Starting Salary: ₹35,000 - ₹45,000/month</h3>
          <h3>Break-Even: 4-5 months to recover course fees</h3>
          <p>Contact Wings Institute: +91-8758754444 | Alkapuri, Vadodara</p>
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

