'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { ROUTES } from '@/lib/routes';

// Job Listings Data
const jobListings = [
  {
    id: 'spoken-english-teacher',
    title: 'Spoken English Teacher',
    department: 'Academics',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    experience: '2-5 years',
    qualification: 'BA/MA in English (required)',
    salary: 'Best in Industry',
    description: 'We are looking for a passionate Spoken English Teacher to help our aviation and hospitality students master communication skills. The ideal candidate will have excellent pronunciation, grammar knowledge, and the ability to make learning engaging.',
    responsibilities: [
      'Conduct daily spoken English classes for batches of 15-25 students',
      'Focus on pronunciation, accent neutralisation, and fluency',
      'Prepare students for airline interviews and GD rounds',
      'Assess student progress through regular mock sessions',
      'Create engaging lesson plans with aviation/hospitality context'
    ],
    requirements: [
      'BA/MA in English Literature or Linguistics',
      'Minimum 2 years teaching experience',
      'Excellent spoken and written English',
      'Familiarity with IELTS/Cambridge English standards (preferred)',
      'Female candidates preferred'
    ]
  },
  {
    id: 'aviation-grooming-trainer',
    title: 'Aviation & Grooming Trainer',
    department: 'Training',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    experience: '3-7 years',
    qualification: 'Ex-Cabin Crew (preferred)',
    salary: 'Best in Industry',
    description: 'Join our team as an Aviation & Grooming Trainer to shape the next generation of cabin crew professionals. We prefer candidates with actual airline experience who can bring real-world insights to the classroom.',
    responsibilities: [
      'Train students in cabin crew duties, safety procedures, and service protocols',
      'Conduct grooming sessions including makeup, hair styling, and uniform presentation',
      'Demonstrate and supervise mock cabin drills in our A330 simulator',
      'Prepare students for airline assessment days and interviews',
      'Stay updated with latest airline grooming standards'
    ],
    requirements: [
      'Ex-Cabin Crew experience with domestic or international airline',
      'Strong knowledge of aviation safety and emergency procedures',
      'Expertise in professional grooming and personal presentation',
      'Excellent communication and mentoring skills',
      'Female candidates preferred'
    ]
  },
  {
    id: 'student-counsellor',
    title: 'Student Counsellor / Admissions Executive',
    department: 'Admissions',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    experience: '1-3 years',
    qualification: 'Graduate (any stream)',
    salary: 'Best in Industry + incentives',
    description: 'We need an enthusiastic Student Counsellor to guide prospective students and parents through the admission process. You will be the first point of contact and play a crucial role in shaping students\' career decisions.',
    responsibilities: [
      'Handle walk-in enquiries and phone/WhatsApp leads',
      'Conduct career counselling sessions for students and parents',
      'Explain course structures, fees, and placement prospects',
      'Follow up with leads and convert enquiries to admissions',
      'Maintain CRM records and generate daily reports'
    ],
    requirements: [
      'Graduate in any discipline',
      'Excellent communication in English, Hindi, and Gujarati',
      'Prior experience in education counselling (preferred)',
      'Target-oriented with proven sales/conversion skills',
      'Pleasant personality and professional demeanor'
    ]
  },
  {
    id: 'culinary-trainer',
    title: 'Culinary Arts Trainer / Chef Instructor',
    department: 'Training',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    experience: '5-10 years',
    qualification: 'Diploma/Degree in Culinary Arts',
    salary: 'Best in Industry',
    description: 'We are seeking an experienced Culinary Trainer to teach food production, bakery, and confectionery to our Hotel Management students. The ideal candidate will have hands-on experience in 5-star hotel kitchens.',
    responsibilities: [
      'Teach food production techniques (Indian, Continental, Oriental)',
      'Conduct bakery and confectionery practical sessions',
      'Train students in kitchen safety, hygiene, and HACCP standards',
      'Supervise commercial kitchen operations and maintain inventory',
      'Prepare students for hotel internships and placements'
    ],
    requirements: [
      'Diploma/Degree in Hotel Management or Culinary Arts',
      'Minimum 5 years experience in commercial kitchen (5-star preferred)',
      'Expertise in Indian and Continental cuisines',
      'Knowledge of bakery, pastry, and cake decoration',
      'Teaching aptitude and patience with beginners'
    ]
  },
  {
    id: 'hospitality-trainer',
    title: 'Hospitality & F&B Service Trainer',
    department: 'Training',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    experience: '3-5 years',
    qualification: 'Diploma in Hotel Management',
    salary: 'Best in Industry',
    description: 'Join us to train students in Food & Beverage Service, Front Office, and Housekeeping operations. You will use our mock restaurant and hotel simulation facilities to provide practical training.',
    responsibilities: [
      'Conduct F&B Service training (table setting, service styles, wine service)',
      'Train students in Front Office operations and guest handling',
      'Teach housekeeping standards and room readiness protocols',
      'Supervise practical sessions in mock restaurant and front desk',
      'Coordinate with hotels for student internship placements'
    ],
    requirements: [
      'Diploma in Hotel Management (NCHMCT or equivalent)',
      'Minimum 3 years experience in F&B or Front Office',
      '5-star hotel experience (preferred)',
      'Knowledge of PMS software (Opera, Fidelio)',
      'Excellent grooming and communication skills'
    ]
  }
];

// FAQ Data for Schema
const careersFaqData = [
  {
    question: "What is the work culture like at Wings Institute?",
    answer: "Wings Institute is an all-women organisation (Women Power Company) with a professional, supportive, and growth-oriented work culture. We foster a safe environment where women can thrive in their careers. Our team operates like a family, with regular training sessions, team outings, and opportunities for professional development."
  },
  {
    question: "Does Wings Institute hire freshers?",
    answer: "Yes, we do hire freshers for certain positions, particularly in administrative and support roles. For teaching and training positions, we prefer candidates with industry experience. Fresh graduates with exceptional communication skills are encouraged to apply for counsellor positions."
  },
  {
    question: "What are the working hours at Wings Institute?",
    answer: "Standard working hours are 10:00 AM to 7:00 PM, Monday to Saturday. Some positions may require flexibility for events, open days, or batch schedules. We offer one weekly off and all major public holidays."
  },
  {
    question: "Is prior experience in education sector mandatory?",
    answer: "Not for all positions. For teaching roles, we value industry experience over teaching experience. An ex-cabin crew member or hotel professional with the right attitude can be trained in teaching methodologies. For counsellor roles, sales and communication skills matter more than education sector experience."
  },
  {
    question: "What growth opportunities are available at Wings?",
    answer: "Wings Institute offers clear career progression. Trainers can grow to become Department Heads or Curriculum Developers. Counsellors can advance to Branch Manager or Regional Head roles. We also provide opportunities to lead franchise training and expand to new locations."
  },
  {
    question: "How can I apply for a job at Wings Institute?",
    answer: "You can apply by sending your updated CV to hr@wingsinstitute.com with the job title in the subject line. Alternatively, visit our Vadodara campus (Alkapuri) for a walk-in interview between 10 AM and 7 PM on weekdays. Shortlisted candidates will be called for a personal interview and demo session."
  }
];

// Generate Schema Functions
const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "alternateName": "Wings",
    "url": "https://wingsinstitute.com",
    "description": "Wings Institute is an all-women organisation (Women Power Company) offering premier aviation and hospitality training in Vadodara, Gujarat. Since 2008, we have been building careers with integrity and excellence.",
    "foundingDate": "2008",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd floor, RG Square 14, Nutan Bharat Society, Alkapuri",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390007",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/wingsinstitute",
      "https://www.facebook.com/wingsaviationtraining",
      "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training"
    ]
  };
};

const generateJobPostingSchema = (job: typeof jobListings[0]) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Wings Institute",
      "value": job.id
    },
    "datePosted": "2025-01-01",
    "validThrough": "2025-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "sameAs": "https://wingsinstitute.com",
      "logo": "https://wingsinstitute.com/images/wings-logo-red.png"
    },
    "jobLocation": {
      "@type": "Place",
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
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH"
      }
    },
    "qualifications": job.qualification,
    "experienceRequirements": job.experience,
    "industry": "Education",
    "occupationalCategory": "Education, Training, and Library Occupations"
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": careersFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const JobsAtWingsSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Organization Schema
    const orgScriptId = 'careers-org-schema';
    const existingOrgScript = document.getElementById(orgScriptId);
    if (existingOrgScript) existingOrgScript.remove();

    const orgScript = document.createElement('script');
    orgScript.id = orgScriptId;
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(generateOrganizationSchema());
    document.head.appendChild(orgScript);

    // Job Posting Schemas (one per job)
    jobListings.forEach((job, index) => {
      const jobScriptId = `job-posting-schema-${index}`;
      const existingJobScript = document.getElementById(jobScriptId);
      if (existingJobScript) existingJobScript.remove();

      const jobScript = document.createElement('script');
      jobScript.id = jobScriptId;
      jobScript.type = 'application/ld+json';
      jobScript.textContent = JSON.stringify(generateJobPostingSchema(job));
      document.head.appendChild(jobScript);
    });

    // FAQ Schema
    const faqScriptId = 'careers-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const orgScriptToRemove = document.getElementById(orgScriptId);
      if (orgScriptToRemove) orgScriptToRemove.remove();

      jobListings.forEach((_, index) => {
        const jobScriptToRemove = document.getElementById(`job-posting-schema-${index}`);
        if (jobScriptToRemove) jobScriptToRemove.remove();
      });
      
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30 hover:border-purple-400/50 transition-all group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Icons.Briefcase className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Career Opportunities at Wings Institute
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Join Gujarat's leading aviation training institute
            </p>
          </div>
        </div>
        <Icons.ChevronDown 
          className={`w-5 h-5 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content - Always in DOM for SEO */}
      <div 
        className={`transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ contentVisibility: 'auto' }}
      >
        <article className="prose prose-zinc dark:prose-invert max-w-none pt-8">
          
          {/* Section 1: Culture & Values */}
          <section>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Icons.Heart className="w-5 h-5" />
              </span>
              Work with Gujarat's Aviation Leaders
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              <strong>Wings Institute</strong> is proud to be an <strong>All-Women Organisation</strong> – a true "Women Power Company." Since 2008, we have created a professional, safe, and empowering environment where women thrive in their careers while shaping the future of aviation and hospitality education.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
                <Icons.Flower2 className="w-5 h-5" />
                Why Women Choose Wings
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Safe Work Environment:</strong> All-women team with zero tolerance for harassment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Work-Life Balance:</strong> Fixed hours (10 AM - 7 PM), one weekly off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Growth Opportunities:</strong> Clear career path from Trainer to Department Head</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Professional Development:</strong> Regular training and skill upgradation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Industry Exposure:</strong> Network with airlines, hotels, and recruiters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Meaningful Impact:</strong> Shape careers of 500+ students annually</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <div className="text-4xl font-black text-purple-600 mb-2">17+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Years of Excellence</div>
              </div>
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <div className="text-4xl font-black text-purple-600 mb-2">100%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Women-Led Team</div>
              </div>
              <div className="p-5 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center">
                <div className="text-4xl font-black text-purple-600 mb-2">5,000+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Careers Shaped</div>
              </div>
            </div>
          </section>

          {/* Section 2: Current Openings */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Icons.Briefcase className="w-5 h-5" />
              </span>
              Current Openings
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              We are always looking for passionate educators and professionals to join our team. Below are our current openings. If you don't see a role that fits, you can still send us your CV for future opportunities.
            </p>

            <div className="space-y-6 mb-8">
              {jobListings.map((job) => (
                <details 
                  key={job.id}
                  className="group bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{job.title}</h3>
                        <span className="px-2 py-1 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">{job.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1"><Icons.Building2 className="w-4 h-4" /> {job.department}</span>
                        <span className="flex items-center gap-1"><Icons.MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Icons.Clock className="w-4 h-4" /> {job.experience}</span>
                      </div>
                    </div>
                    <Icons.ChevronDown className="w-5 h-5 text-purple-500 flex-shrink-0 group-open:rotate-180 transition-transform ml-4" />
                  </summary>
                  <div className="px-6 pb-6 border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-2 text-sm">Responsibilities:</h4>
                        <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icons.CheckCircle2 className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-2 text-sm">Requirements:</h4>
                        <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icons.BadgeCheck className="w-3 h-3 text-purple-500 mt-1 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
                      <div className="text-sm">
                        <span className="text-zinc-500">Salary:</span> <strong className="text-green-600 dark:text-green-400">{job.salary}</strong>
                      </div>
                      <div className="text-sm">
                        <span className="text-zinc-500">Qualification:</span> <strong className="text-zinc-900 dark:text-white">{job.qualification}</strong>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Section 3: How to Apply */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Icons.Send className="w-5 h-5" />
              </span>
              How to Apply
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icons.Mail className="w-5 h-5 text-blue-600" />
                    Email Application
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                    Send your updated CV to:
                  </p>
                  <a href="mailto:hr@wingsinstitute.com" className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    hr@wingsinstitute.com
                  </a>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                    Subject line: "Application for [Job Title]"
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icons.Building2 className="w-5 h-5 text-blue-600" />
                    Walk-in Interview
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                    Visit our campus for direct interviews:
                  </p>
                  <div className="text-sm text-zinc-700 dark:text-zinc-300">
                    <strong>Timing:</strong> Mon-Sat, 10 AM - 7 PM<br />
                    <strong>Location:</strong> Alkapuri, Vadodara
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section className="mt-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Icons.HelpCircle className="w-5 h-5" />
              </span>
              Careers FAQs
            </h2>

            <div className="space-y-4">
              {careersFaqData.map((faq, index) => (
                <details 
                  key={index}
                  open
                  className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-medium text-zinc-900 dark:text-white pr-4">{faq.question}</span>
                    <Icons.ChevronDown className="w-5 h-5 text-purple-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Join the Wings Family?</h3>
              <p className="mb-6 opacity-90">
                Be part of Gujarat's most trusted aviation and hospitality training institute. Make a difference in students' lives while growing your own career.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:hr@wingsinstitute.com"
                  className="px-6 py-3 bg-white text-purple-700 rounded-full font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <Icons.Mail className="w-5 h-5" />
                  Send Your CV
                </a>
                <Link 
                  href={ROUTES['contact']}
                  className="px-6 py-3 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-5 h-5" />
                  Contact HR
                </Link>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Noscript Fallback for SEO */}
      <noscript>
        <div className="prose prose-zinc max-w-none pt-8">
          <h2>Career Opportunities at Wings Institute Vadodara</h2>
          <p>Wings Institute is an all-women organisation (Women Power Company) hiring for: Spoken English Teacher, Aviation & Grooming Trainer, Student Counsellor, Culinary Trainer, Hospitality Trainer.</p>
          <p>Apply: hr@wingsinstitute.com | Walk-in: Alkapuri, Vadodara, Mon-Sat 10 AM - 7 PM</p>
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

export default JobsAtWingsSEOContent;

