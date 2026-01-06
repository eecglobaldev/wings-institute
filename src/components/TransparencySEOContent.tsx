'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { markdownToHtml } from '@/utils/markdownToHtml';
import { ROUTES } from '@/lib/routes';

// Alumni Reviews Data (Verified Success Stories - Matching Footer Reviews)
const alumniReviews = [
  {
    name: "Namrata Bhosale",
    role: "Cabin Crew",
    company: "Air India",
    rating: 5,
    review: "Wings Institute changed my life! The practical sessions in the mock aircraft are exactly like real-world cabin crew duty. The A330 mock cabin training prepared me perfectly for airline assessments.",
    date: "2024-11-15",
    course: "Air Hostess Training",
    image: "/images/success-stories/Namrata-Bhosale.png",
  },
  {
    name: "Rahul Pandya",
    role: "Ground Staff Executive",
    company: "Ahmedabad Airport",
    rating: 5,
    review: "Best aviation academy in Vadodara. The faculty is supportive and the AI tools for interview prep are game-changing. Wings gave me the confidence to crack my airport interview.",
    date: "2024-10-20",
    course: "Airport Management",
    image: "/images/success-stories/Rahul-Pandya.jpg",
  },
  {
    name: "Rummana Salat",
    role: "Airport Ground Staff",
    company: "Singapore Airlines",
    rating: 5,
    review: "I was from a Gujarati medium background, but the Spoken English module here transformed my communication skills. After 3 years with Singapore Airlines, Wings gave me the foundation for my international career.",
    date: "2024-09-12",
    course: "Airport Management",
    image: "/images/success-stories/Rummana-Salat.png",
  },
  {
    name: "Divya Patel",
    role: "Front Office Staff",
    company: "ITC Hotels",
    rating: 5,
    review: "Excellent infrastructure. The grooming standards they teach are world-class. If you want a Hospitality career, join Wings. The personality development sessions set me apart in interviews.",
    date: "2024-08-25",
    course: "Hotel Management",
    image: "/images/airport-management/divya-patel.jpg",
  },
  {
    name: "Ekta Christian",
    role: "Cabin Crew",
    company: "Air Asia",
    rating: 5,
    review: "Top-notch training for Cabin Crew Training. The In-flight safety, emergency procedures, meal service, grooming, spoken English training helped me clear my interview easily. Wings prepared me for every aspect of airline operations.",
    date: "2024-07-18",
    course: "Air Hostess Training",
    image: "/images/success-stories/Ekta-Christian.png",
  },
];

// FAQ Data for Transparency
const transparencyFaqData = [
  {
    question: "Are there any complaints about Wings Institute?",
    answer: "Wings Institute maintains a 4.7-star rating across 330+ verified Google reviews. Like any institution with 17+ years of operation, we have received feedback that helped us improve. We address every concern through our Student Grievance Cell and encourage prospective students to speak directly with our alumni. Our 'Absolute Integrity' policy means transparent communication is not optional—it's fundamental."
  },
  {
    question: "Is Wings Institute legitimate and government recognized?",
    answer: "Yes. Wings Institute has been operating since 2008 and is affiliated with recognized certification bodies. Our courses are vocational training programs with industry-aligned curricula. We have placed students in major airlines (Indigo, Qatar Airways, Emirates) and hotel chains (Taj, Marriott, Hyatt) - all verifiable placements with named alumni."
  },
  {
    question: "Does Wings Institute make fake promises about placements?",
    answer: "No. We explicitly state '100% Placement Assistance' - NOT '100% Placement Guarantee.' The distinction is important: we provide resume building, interview coaching, grooming training, and connect students with recruiters. Final selection depends on the student's performance in airline/hotel interviews. Our placement record is verifiable through our named alumni working globally."
  },
  {
    question: "Are there hidden fees at Wings Institute?",
    answer: "No. Our fee structure is communicated transparently during the first counselling session. The total course fee includes training, materials, and uniform (where applicable). We offer documented installment plans and merit-based scholarships. Any additional costs (e.g., certification exams) are disclosed upfront."
  },
  {
    question: "How can I verify Wings Institute alumni placements?",
    answer: "We encourage verification. Our Placement page lists named alumni with their employers. Many are on LinkedIn with public profiles showing their Wings Institute education. We also facilitate direct conversations between prospective students and our alumni during campus visits."
  },
  {
    question: "What is Wings Institute's refund policy?",
    answer: "Our refund policy is clearly documented in the enrollment agreement. Refunds are processed based on the stage of enrollment and course commencement. We recommend reading the full policy during admission and asking any questions before signing."
  },
  {
    question: "Why should I trust Wings Institute over other aviation academies?",
    answer: "Trust is earned through transparency and results. We have: (1) Physical infrastructure you can visit - including India's only private Airbus A330 Mock Cabin, (2) Named alumni in verifiable positions globally, (3) 17 years of continuous operation since 2008, (4) Published fee structures with no hidden costs, (5) Open-door policy for prospective students to meet current students and faculty."
  },
  {
    question: "Has Wings Institute addressed negative reviews?",
    answer: "Yes, proactively. We take every piece of feedback seriously. Our Student Grievance Cell investigates concerns within 7 working days. Historic negative feedback has led to policy improvements. We believe criticism, when valid, makes us better. We invite anyone with concerns to contact us directly at info@wingsinstitute.com."
  },
];

// Generate Review Schema
const generateReviewSchema = () => {
  return alumniReviews.map((review, index) => ({
    "@type": "Review",
    "@id": `https://wingsinstitute.com/transparency#review-${index + 1}`,
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": review.name,
      "jobTitle": review.role,
      "worksFor": {
        "@type": "Organization",
        "name": review.company
      }
    },
    "reviewBody": review.review,
    "datePublished": review.date,
    "publisher": {
      "@type": "Organization",
      "name": "Wings Institute"
    }
  }));
};

// Generate Aggregate Rating Schema
const generateAggregateRatingSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://wingsinstitute.com/#organization",
    "name": "Wings Institute Air Hostess & Hotel Management",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "332",
      "reviewCount": "332"
    },
    "review": generateReviewSchema()
  };
};

// Generate FAQ Schema
const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": transparencyFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate WebPage Schema with speakable
const generateWebPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://wingsinstitute.com/transparency#webpage",
    "url": "https://wingsinstitute.com/transparency",
    "name": "Transparency & Placement Promise | Wings Institute",
    "description": "Wings Institute's commitment to absolute integrity, transparent policies, verified placements, and addressing student concerns. Read our placement promise and alumni success stories.",
    "isPartOf": {
      "@id": "https://wingsinstitute.com/#website"
    },
    "about": {
      "@id": "https://wingsinstitute.com/#organization"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".integrity-statement", ".placement-promise", ".faq-answer"]
    },
    "lastReviewed": "2025-12-25"
  };
};

export const TransparencySEOContent: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Vernacular styling classes
  const vernacularText = isVernacular ? 'leading-[1.8] tracking-wide' : '';
  const vernacularHeading = isVernacular ? 'leading-[1.4] font-extrabold' : '';
  const vernacularParagraph = isVernacular ? 'leading-[2] font-medium' : '';
  const vernacularButton = isVernacular ? 'leading-[1.6] font-bold tracking-wide' : '';
  const vernacularLabel = isVernacular ? 'leading-[1.7] font-semibold' : '';

  // Inject Schema.org JSON-LD (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const schemas = [
      { id: 'transparency-aggregate-rating', data: generateAggregateRatingSchema() },
      { id: 'transparency-faq', data: generateFAQSchema() },
      { id: 'transparency-webpage', data: generateWebPageSchema() },
    ];

    schemas.forEach(({ id, data }) => {
      const existingScript = document.getElementById(id);
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900">
      {/* Hero Section - Trust Signal */}
      <section className="relative py-3 md:py-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-zinc-900 dark:to-teal-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex flex-col lg:flex-row items-center justify-center gap-7 ">
          {/* Trust Badge */}
          <div className="flex flex-col lg:flex-row items-center gap-2 mb-8">
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-emerald-200 dark:border-emerald-700 ${vernacularText}`}>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4.7 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-400 opacity-70'}`}
                  />
                ))}
              </div>
              <span className={`text-lg font-bold text-zinc-900 dark:text-white ${vernacularLabel}`}>{t('tr.badge_rating')}</span>
              <span className={`text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>{t('tr.badge_reviews')}</span>
              <Icons.BadgeCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

           {/* Language Toggle */}
           <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t('hero.translate') || 'Translate'}
            </label>
            <LanguageToggle isHomepage={true} />
          </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black text-center text-zinc-900 dark:text-white mb-6 ${vernacularHeading}`}>
            {t('tr.hero_title')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t('tr.hero_title_accent')}
            </span>
          </h1>

          <p className={`text-xl text-center text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8 integrity-statement ${vernacularParagraph}`}>
            {t('tr.hero_subtitle')}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: 'Calendar', valueKey: 'tr.stat1_value', labelKey: 'tr.stat1_label' },
              { icon: 'Users', valueKey: 'tr.stat2_value', labelKey: 'tr.stat2_label' },
              { icon: 'Building2', valueKey: 'tr.stat3_value', labelKey: 'tr.stat3_label' },
              { icon: 'Star', valueKey: 'tr.stat4_value', labelKey: 'tr.stat4_label' },
            ].map((stat, index) => {
              const IconComponent = Icons[stat.icon as keyof typeof Icons];
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center shadow-md border border-zinc-200 dark:border-zinc-700"
                >
                  <IconComponent className="w-6 h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                  <div className={`text-2xl font-bold text-zinc-900 dark:text-white ${vernacularHeading}`}>{t(stat.valueKey)}</div>
                  <div className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularLabel}`}>{t(stat.labelKey)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrity Statement - "Stealing Thunder" Strategy */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-8 md:p-12 border border-emerald-200 dark:border-emerald-700/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-xl">
                <Icons.ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                  {t('tr.integrity_title')}
                </h2>
                <p className={`text-zinc-600 dark:text-zinc-300 ${vernacularText}`}>
                  {t('tr.integrity_subtitle')}
                </p>
              </div>
            </div>

            <div className={`prose prose-lg dark:prose-invert max-w-none placement-promise ${vernacularParagraph}`}>
              <p dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.integrity_p1')) }} />

              <p className={vernacularText}>
                {t('tr.integrity_p2')}
              </p>

              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 my-6 border-l-4 border-emerald-500">
                <h3 className={`text-lg font-bold text-zinc-900 dark:text-white mt-0 ${vernacularHeading}`}>
                  {t('tr.promise_title')}
                </h3>
                <ul className={`space-y-2 mb-0 ${vernacularText}`}>
                  <li>
                    <strong className="text-emerald-600 dark:text-emerald-400">{t('tr.promise_do')}</strong>{' '}
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.promise_do_text')) }} />
                  </li>
                  <li>
                    <strong className="text-amber-600 dark:text-amber-400">{t('tr.promise_dont')}</strong>{' '}
                    <span dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.promise_dont_text')) }} />
                  </li>
                </ul>
              </div>

              <p dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.integrity_p3')) }} />

              <h3 className={vernacularHeading}>{t('tr.open_door_title')}</h3>
              <p className={vernacularText}>
                {t('tr.open_door_intro')}
              </p>
              <ol className={`space-y-2 ${vernacularText}`}>
                <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.open_door_1')) }} />
                <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.open_door_2')) }} />
                <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.open_door_3')) }} />
                <li dangerouslySetInnerHTML={{ __html: markdownToHtml(t('tr.open_door_4')) }} />
              </ol>

              <p className={`text-lg font-semibold text-emerald-700 dark:text-emerald-400 ${vernacularLabel}`}>
                {t('tr.integrity_quote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Alumni Reviews */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
              {t('tr.reviews_title')}
            </h2>
            <p className={`text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto ${vernacularParagraph}`}>
              {t('tr.reviews_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((reviewNum, index) => (
              <article
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icons.Star
                      key={star}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                </div>

                {/* Review Text */}
                <blockquote className={`text-zinc-700 dark:text-zinc-300 mb-4 italic ${vernacularParagraph}`} itemProp="reviewBody">
                  "{t(`tr.review${reviewNum}_text`)}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold overflow-hidden">
                    <img 
                      src={alumniReviews[index]?.image || `/images/success-stories/placeholder.jpg`} 
                      alt={`${t(`tr.review${reviewNum}_name`)} - Wings Institute alumni`} 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  </div>
                  <div>
                    <div className={`font-semibold text-zinc-900 dark:text-white ${vernacularLabel}`} itemProp="name">
                      {t(`tr.review${reviewNum}_name`)}
                    </div>
                    <div className={`text-sm text-zinc-600 dark:text-zinc-400 ${vernacularText}`}>
                      <span itemProp="jobTitle">{t(`tr.review${reviewNum}_role`)}</span>
                      <span className="mx-1">•</span>
                      <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                        <span itemProp="name">{t(`tr.review${reviewNum}_company`)}</span>
                      </span>
                    </div>
                    <div className={`text-xs text-emerald-600 dark:text-emerald-400 ${vernacularText}`}>
                      {t(`tr.review${reviewNum}_course`)} {t('tr.graduate')}
                    </div>
                  </div>
                </div>
                <meta itemProp="datePublished" content={alumniReviews[index]?.date || '2024-01-01'} />
              </article>
            ))}
          </div>

          {/* CTA to Placement Page */}
          <div className="text-center mt-10">
            <Link
              href={ROUTES['placements']}
              className={`inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors ${vernacularButton}`}
            >
              <Icons.Users className="w-5 h-5" />
              {t('tr.btn_view_placements')}
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Grievance Redressal */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl">
                <Icons.MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-2 ${vernacularHeading}`}>
                  {t('tr.grievance_title')}
                </h2>
                <p className={`text-zinc-600 dark:text-zinc-300 ${vernacularText}`}>
                  {t('tr.grievance_subtitle')}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
                <h3 className={`font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularLabel}`}>
                  <Icons.Clock className="w-5 h-5 text-blue-600" />
                  {t('tr.response_title')}
                </h3>
                <ul className={`space-y-2 text-zinc-600 dark:text-zinc-300 text-sm ${vernacularText}`}>
                  <li><strong>{t('tr.response_ack')}</strong> {t('tr.response_ack_time')}</li>
                  <li><strong>{t('tr.response_inv')}</strong> {t('tr.response_inv_time')}</li>
                  <li><strong>{t('tr.response_res')}</strong> {t('tr.response_res_time')}</li>
                  <li><strong>{t('tr.response_esc')}</strong> {t('tr.response_esc_time')}</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
                <h3 className={`font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2 ${vernacularLabel}`}>
                  <Icons.Mail className="w-5 h-5 text-blue-600" />
                  {t('tr.contact_title')}
                </h3>
                <ul className={`space-y-2 text-zinc-600 dark:text-zinc-300 text-sm ${vernacularText}`}>
                  <li><strong>{t('tr.contact_email')}</strong> {t('tr.contact_email_val')}</li>
                  <li><strong>{t('tr.contact_phone')}</strong> {t('tr.contact_phone_val')}</li>
                  <li><strong>{t('tr.contact_person')}</strong> {t('tr.contact_person_val')}</li>
                  <li><strong>{t('tr.contact_written')}</strong> {t('tr.contact_written_val')}</li>
                </ul>
              </div>
            </div>

            <p className={`mt-6 text-zinc-600 dark:text-zinc-300 text-center ${vernacularParagraph}`}>
              <em>{t('tr.grievance_note')}</em>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Addressing Negative Keywords */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-zinc-900 dark:text-white mb-4 ${vernacularHeading}`}>
              {t('tr.faq_title')}
            </h2>
            <p className={`text-zinc-600 dark:text-zinc-300 ${vernacularText}`}>
              {t('tr.faq_subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((faqNum) => (
              <details
                key={faqNum}
                open
                className="group bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <h3 className={`font-semibold text-zinc-900 dark:text-white pr-4 text-left ${vernacularLabel}`}>
                    {t(`tr.faq${faqNum}_q`)}
                  </h3>
                  <Icons.ChevronDown className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 border-t border-zinc-200 dark:border-zinc-700">
                  <p className={`text-zinc-600 dark:text-zinc-300 pt-4 faq-answer ${vernacularParagraph}`}>
                    {t(`tr.faq${faqNum}_a`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${vernacularHeading}`}>
            {t('tr.trust_title')}
          </h2>
          <p className={`text-emerald-100 mb-6 max-w-2xl mx-auto ${vernacularParagraph}`}>
            {t('tr.trust_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES['contact']}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors ${vernacularButton}`}
            >
              <Icons.MapPin className="w-5 h-5" />
              {t('tr.btn_campus_visit')}
            </Link>
            <Link
              href={ROUTES['advantage']}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors border border-emerald-400 ${vernacularButton}`}
            >
              <Icons.Users className="w-5 h-5" />
              {t('tr.btn_contact_alumni')}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Text Block (Hidden visually, visible to crawlers) */}
      <section className="sr-only" aria-hidden="true">
        <h2>Wings Institute Vadodara - Transparency and Trust</h2>
        <p>
          Wings Institute complaints, Wings Institute fake, Wings Institute reviews, Wings Institute legitimate,
          is Wings Institute real, Wings Institute fraud, Wings Institute scam, Wings Institute placement record,
          Wings Institute student reviews, Wings Institute alumni feedback, Wings Institute hidden fees,
          Wings Institute refund policy, best aviation institute Gujarat honest review.
        </p>
        <p>
          Wings Institute has been operating since 2008 with a 4.7-star Google rating from 332 verified reviews.
          The institute follows a policy of Absolute Integrity with transparent fee structures, verifiable placements,
          and an open-door policy for prospective students to meet current students and alumni.
        </p>
      </section>
    </div>
  );
};

export default TransparencySEOContent;

