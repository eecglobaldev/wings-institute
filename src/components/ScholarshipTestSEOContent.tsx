'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// FAQ Data for Schema
const scholarshipFaqData = [
  {
    question: "What is the WINGS National Aptitude Test (W-NAT)?",
    answer: "The W-NAT is Wings Institute's merit-based scholarship examination designed to identify talented students passionate about aviation and hospitality careers. It tests General Knowledge, English Proficiency, Logical Reasoning, and Service Aptitude through an online quiz format. Students scoring 80% or above qualify for fee waivers up to ₹10,000."
  },
  {
    question: "Who is eligible for the Wings Scholarship Test?",
    answer: "Students who have passed 12th standard (any stream - Arts, Commerce, or Science) with a minimum of 50% marks are eligible. The scholarship is open to students from all states in India, though Wings Institute primarily serves Gujarat, Rajasthan, and Maharashtra regions."
  },
  {
    question: "What is the format of the W-NAT scholarship exam?",
    answer: "The W-NAT consists of 5 multiple-choice questions randomly selected from a bank of 20+ questions covering four categories: Logical Reasoning, English Grammar & Vocabulary, Aviation & Hospitality Service Scenarios, and General Knowledge. The test takes approximately 5 minutes to complete."
  },
  {
    question: "How much scholarship amount can I get through W-NAT?",
    answer: "Students who score 4 out of 5 (80%) or higher receive an instant scholarship code worth ₹10,000 fee waiver. This code is valid for 15 minutes after generation and must be claimed immediately via WhatsApp to the counselling team to lock the discount."
  },
  {
    question: "Can I retake the W-NAT if I fail?",
    answer: "Yes, you can retake the test immediately if you score below the qualifying mark (4/5). Each attempt presents a fresh set of questions from our question bank, ensuring a fair assessment every time. There is no limit on the number of attempts."
  },
  {
    question: "Is the Wings scholarship test available online or offline?",
    answer: "The W-NAT scholarship test is available both online (on our website) and offline (at our Alkapuri campus in Vadodara). The online version provides instant results and scholarship codes, while campus applicants receive their scholarship certificates during the counselling session."
  },
  {
    question: "What courses does the Wings scholarship cover?",
    answer: "The W-NAT scholarship applies to all diploma programmes at Wings Institute: Air Hostess & Cabin Crew Training, Airport Management & Ground Staff, Hotel Management & Hospitality Operations, Culinary Arts & Professional Cooking, and Travel & Tourism Management."
  },
  {
    question: "When does the Wings scholarship code expire?",
    answer: "The scholarship code generated after passing the W-NAT is valid for exactly 15 minutes. This urgency ensures committed students secure their seats promptly. If the code expires, you must retake the test to generate a new one."
  }
];

// Generate Schema Functions
const generateEducationalProgramSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": "https://wingsinstitute.com/scholarship#program",
    "name": "WINGS National Aptitude Test (W-NAT) Scholarship Programme",
    "description": "Merit-based scholarship examination for aviation and hospitality students. Score 80% or above to receive up to ₹10,000 fee waiver on diploma courses at Wings Institute Vadodara.",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "url": "https://wingsinstitute.com"
    },
    "financialAidEligible": true,
    "educationalCredentialAwarded": "Merit-Based Fee Waiver Certificate",
    "programType": "Scholarship/Merit Test",
    "applicationDeadline": "2026-12-31",
    "startDate": "2026-01-01",
    "endDate": "2026-12-31",
    "maximumEnrollment": "Unlimited",
    "occupationalCredentialAwarded": "Wings Scholarship Code",
    "offers": {
      "@type": "Offer",
      "category": "Scholarship",
      "price": "0",
      "priceCurrency": "INR",
      "eligibleRegion": {
        "@type": "Country",
        "name": "India"
      },
      "availability": "https://schema.org/InStock"
    },
    "hasCourse": [
      {
        "@type": "Course",
        "name": "Air Hostess & Cabin Crew Training",
        "url": "https://wingsinstitute.com/air-hostess"
      },
      {
        "@type": "Course",
        "name": "Airport Management & Ground Staff",
        "url": "https://wingsinstitute.com/airport-mgmt"
      },
      {
        "@type": "Course",
        "name": "Hotel Management & Hospitality Operations",
        "url": "https://wingsinstitute.com/hotel-mgmt"
      },
      {
        "@type": "Course",
        "name": "Culinary Arts & Professional Cooking",
        "url": "https://wingsinstitute.com/culinary"
      },
      {
        "@type": "Course",
        "name": "Travel & Tourism Management",
        "url": "https://wingsinstitute.com/travel-tourism"
      }
    ]
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": scholarshipFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const ScholarshipTestSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Educational Program Schema
    const programScriptId = 'scholarship-program-schema';
    const existingProgramScript = document.getElementById(programScriptId);
    if (existingProgramScript) existingProgramScript.remove();

    const programScript = document.createElement('script');
    programScript.id = programScriptId;
    programScript.type = 'application/ld+json';
    programScript.textContent = JSON.stringify(generateEducationalProgramSchema());
    document.head.appendChild(programScript);

    // FAQ Schema
    const faqScriptId = 'scholarship-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const programScriptToRemove = document.getElementById(programScriptId);
      if (programScriptToRemove) programScriptToRemove.remove();
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-700/30 hover:border-amber-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Icons.GraduationCap className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              About the W-NAT Scholarship Programme
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Detailed information about eligibility, test structure, and fee waivers
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content - Always in DOM for SEO */}
      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          {/* Section 1: The WINGS SCHOLARSHIP Initiative */}
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icons.Award className="w-5 h-5" />
              </span>
              Merit-Based Financial Aid: The WINGS Scholarship Initiative
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              At <strong>Wings Institute Vadodara</strong>, we believe that financial constraints should never be a barrier to pursuing your dreams in <strong>aviation</strong> and <strong>hospitality</strong>. The <strong>WINGS – Freedom to Fly</strong> scholarship initiative is our commitment to supporting meritorious students who demonstrate aptitude, dedication, and passion for service-oriented careers.
            </p>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              Unlike generic entrance exams that test rote learning, the <strong>Wings National Aptitude Test (W-NAT)</strong> evaluates the qualities that actually matter in aviation and hospitality: <strong>communication skills</strong>, <strong>logical thinking</strong>, <strong>service temperament</strong>, and <strong>general awareness</strong>. This ensures that scholarships reach students who are genuinely suited for these industries.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                <Icons.Users className="w-5 h-5" />
                Eligibility Criteria for W-NAT
              </h3>
              <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-3">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Educational Qualification:</strong> 12th Pass (Arts, Commerce, or Science stream)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Minimum Marks:</strong> 50% aggregate in 12th standard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Age:</strong> 17-26 years (as of enrolment date)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Nationality:</strong> Indian citizens (PIO/OCI also eligible)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Applicable Courses:</strong> All diploma programmes (Air Hostess, Ground Staff, Hotel Management, Culinary, Travel & Tourism)</span>
                </li>
              </ul>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Students from <strong>Gujarat</strong>, <strong>Rajasthan</strong>, <strong>Madhya Pradesh</strong>, and <strong>Maharashtra</strong> particularly benefit from this initiative, as Wings Institute operates as the premier <strong>aviation training institute in Western India</strong>. However, the scholarship is open to applicants from all Indian states.
            </p>
          </section>

          {/* Section 2: The Test Structure */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icons.ClipboardList className="w-5 h-5" />
              </span>
              What to Expect: W-NAT Test Structure
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              The <strong>Wings National Aptitude Test</strong> is designed to be quick yet comprehensive. Unlike lengthy entrance examinations, W-NAT respects your time while accurately assessing your potential for a career in aviation or hospitality.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-amber-500" />
                  Test Format
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <li><strong>Mode:</strong> Online (Website) / Offline (Campus)</li>
                  <li><strong>Questions:</strong> 5 MCQs (randomly selected)</li>
                  <li><strong>Duration:</strong> 5 minutes (approx.)</li>
                  <li><strong>Passing Score:</strong> 4 out of 5 (80%)</li>
                  <li><strong>Language:</strong> English</li>
                  <li><strong>Retakes:</strong> Unlimited attempts</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icons.BookOpen className="w-5 h-5 text-amber-500" />
                  Question Categories
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <li><strong>Logical Reasoning:</strong> Number series, patterns, odd-one-out</li>
                  <li><strong>English Proficiency:</strong> Grammar, vocabulary, spelling</li>
                  <li><strong>Service Aptitude:</strong> Hospitality scenarios, customer handling</li>
                  <li><strong>General Knowledge:</strong> Aviation, travel, current affairs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                <Icons.Gift className="w-5 h-5" />
                Scholarship Rewards
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-200 dark:border-green-800">
                      <th className="py-3 px-4 text-left font-bold text-green-900 dark:text-green-200">Score</th>
                      <th className="py-3 px-4 text-left font-bold text-green-900 dark:text-green-200">Scholarship Amount</th>
                      <th className="py-3 px-4 text-left font-bold text-green-900 dark:text-green-200">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700 dark:text-zinc-300">
                    <tr className="border-b border-green-100 dark:border-green-900/50">
                      <td className="py-3 px-4">5/5 (100%)</td>
                      <td className="py-3 px-4 font-bold text-green-600">₹10,000 Fee Waiver</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Scholarship Unlocked</span></td>
                    </tr>
                    <tr className="border-b border-green-100 dark:border-green-900/50">
                      <td className="py-3 px-4">4/5 (80%)</td>
                      <td className="py-3 px-4 font-bold text-green-600">₹10,000 Fee Waiver</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Scholarship Unlocked</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Below 4/5</td>
                      <td className="py-3 px-4 text-zinc-500">No scholarship</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-zinc-400 text-white text-xs rounded-full">Retake Available</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>Important:</strong> The scholarship code generated after passing is valid for <strong>15 minutes only</strong>. This time-sensitive approach ensures that committed students secure their seats promptly. The code must be sent to our counselling team via WhatsApp within this window to lock the fee waiver.
            </p>
          </section>

          {/* Section 3: Registration Logic */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icons.Navigation className="w-5 h-5" />
              </span>
              How to Apply: Step-by-Step Registration
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              The W-NAT registration process is designed for simplicity. No lengthy forms, no document uploads at this stage—just your name, phone number, and 5 minutes of your time.
            </p>

            <div className="grid gap-4 mb-8">
              {[
                { step: 1, title: 'Register Online', desc: 'Enter your full name and phone number on the scholarship test page. This creates your unique test session.', icon: 'UserPlus' },
                { step: 2, title: 'Take the W-NAT', desc: 'Answer 5 multiple-choice questions covering logic, English, service aptitude, and general knowledge.', icon: 'FileQuestion' },
                { step: 3, title: 'Receive Instant Results', desc: 'Score 4/5 or above? Your unique scholarship code (e.g., WIN-1234-2026) is generated immediately.', icon: 'Medal' },
                { step: 4, title: 'Claim via WhatsApp', desc: 'Send your code to +91-8758754444 within 15 minutes to lock your ₹10,000 fee waiver.', icon: 'MessageCircle' },
                { step: 5, title: 'Counselling Session', desc: 'Our team schedules a free career counselling session to discuss your preferred course and complete admission.', icon: 'CalendarCheck' }
              ].map((item) => {
                const IconComponent = Icons[item.icon as keyof typeof Icons];
                return (
                  <div key={item.step} className="flex gap-4 p-4 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-amber-500" />
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Icons.Info className="w-5 h-5" />
                The Gujarat Paradigm: Why Scholarships Matter
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                In Gujarat, we understand the value of every rupee. A ₹10,000 scholarship on a diploma course represents a significant reduction in family burden. More importantly, it accelerates your <strong>ROI (Return on Investment)</strong>—you start earning at ₹35,000-50,000 per month within 12 months of completing your course, rather than spending 3-4 years in a degree programme. Calculate your potential earnings using our{' '}
                <Link href={ROUTES['roi-calculator']} className="text-blue-600 dark:text-blue-400 underline hover:no-underline font-medium">
                  Salary ROI Calculator
                </Link>.
              </p>
            </div>
          </section>

          {/* Section 4: Why Choose Wings */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icons.Star className="w-5 h-5" />
              </span>
              Why Take the Wings Scholarship Test?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Icons.Timer className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">5-Minute Test</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">No lengthy exams. Quick assessment that values your time.</p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Icons.Banknote className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">₹10,000 Instant Reward</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Immediate fee waiver for qualifying students. No waiting.</p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Icons.RotateCcw className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Unlimited Retakes</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Didn't qualify? Fresh questions each time. Keep trying.</p>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Since <strong>2008</strong>, Wings Institute has been the trusted name in <strong>aviation and hospitality training in Vadodara</strong>. Our alumni work with <strong>IndiGo</strong>, <strong>Air India</strong>, <strong>Qatar Airways</strong>, <strong>Emirates</strong>, <strong>Taj Hotels</strong>, and <strong>Marriott</strong>. The W-NAT scholarship is our way of ensuring that talented students, regardless of financial background, can join this legacy. View our{' '}
              <Link href={ROUTES['placements']} className="text-amber-600 dark:text-amber-400 underline hover:no-underline font-medium">
                verified placement records
              </Link>{' '}
              to see where our graduates are working today.
            </p>
          </section>

          {/* Section 5: FAQs */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Frequently Asked Questions About W-NAT
            </h2>

            <div className="space-y-4">
              {scholarshipFaqData.map((faq, index) => (
                <details 
                  key={index}
                  open
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-amber-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
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
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Unlock Your Scholarship?</h3>
              <p className="mb-6 opacity-90">
                Scroll up and click "Start Test Now" to begin your 5-minute assessment. Join 1000+ students who have already benefited from the Wings scholarship programme.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-white/20 rounded-full">📍 Alkapuri, Vadodara</span>
                <span className="px-4 py-2 bg-white/20 rounded-full">📞 +91-8758754444</span>
                <span className="px-4 py-2 bg-white/20 rounded-full">🎓 Since 2008</span>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Noscript Fallback for SEO */}
      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>Merit-Based Financial Aid: The WINGS Scholarship Initiative</h2>
          <p>At Wings Institute Vadodara, we believe that financial constraints should never be a barrier to pursuing your dreams in aviation and hospitality. The WINGS – Freedom to Fly scholarship initiative supports meritorious students through the Wings National Aptitude Test (W-NAT).</p>
          <h3>Eligibility: 12th Pass (any stream) with minimum 50% marks</h3>
          <h3>Test Format: 5 MCQs, 5 minutes, 80% to qualify</h3>
          <h3>Reward: Up to ₹10,000 fee waiver</h3>
          <p>Contact: +91-8758754444 | Location: Alkapuri, Vadodara</p>
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

export default ScholarshipTestSEOContent;

