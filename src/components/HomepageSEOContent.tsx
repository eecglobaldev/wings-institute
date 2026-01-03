'use client';

/**
 * HomepageSEOContent.tsx (SSR Version)
 * 
 * Semantic Content Injection Module for Wings Institute Homepage
 * Establishes Entity Salience for: Airbus A330, Global Placements, Gujarat's Premier Institute
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

// --- ALUMNI DATA FOR ENTITY LINKING ---
const recentPlacements = [
  { name: 'Mohd. Fahad Diwan', company: 'IndiGo Airlines', role: 'Airport Staff', location: 'Ahmedabad, India' },
  { name: 'Aanal Desai', company: 'Qatar Airways', role: 'Cabin Crew', location: 'Doha, Qatar' },
  { name: 'Ronak Makwana', company: 'Air Vistara', role: 'Airport Staff', location: 'Ahmedabad, India' },
  { name: 'Mansi Bhatt', company: 'Customs Cargo (AAI)', role: 'Cargo Operations Executive', location: 'Vadodara, India' },
  { name: 'Zeel Patel', company: 'Singapore Airlines', role: 'Ground Staff', location: 'Ahmedabad, India' },
  { name: 'Firdaus Shaikh', company: 'Hyatt Place Dubai', role: 'Front Office Associate', location: 'Dubai, UAE' },
  { name: 'Snehil Raj', company: 'Air Vistara', role: 'Cabin Crew', location: 'Delhi, India' },
  { name: 'Maaz Shaikh', company: "Hell's Kitchen Dubai", role: 'Commis Chef', location: 'Dubai, UAE' },
];

// --- FAQ Keys for translations ---
const faqKeys = [
  'faq1', 'faq2', 'faq3', 'faq4', 'faq5',
  'faq6', 'faq7', 'faq8', 'faq9', 'faq10',
  'faq11', 'faq12', 'faq13', 'faq14', 'faq15'
];

export const HomepageSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Vernacular text classes for better readability
  const vernacularText = isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed';
  const vernacularHeading = isVernacular ? 'leading-[1.5] font-bold' : 'leading-tight font-bold';
  const vernacularParagraph = isVernacular ? 'leading-[2] tracking-wide' : 'leading-relaxed';
  const vernacularButton = isVernacular ? 'leading-[1.6] font-bold tracking-wide py-5' : 'font-bold';
  const vernacularPill = isVernacular ? 'leading-[1.6] font-semibold tracking-wide py-2' : 'font-semibold';
  const vernacularListItem = isVernacular ? 'leading-[2] mb-3' : 'leading-relaxed';
  const vernacularTableCell = isVernacular ? 'leading-[1.8] py-5' : 'py-4';

  return (
    <section className="py-16 lg:py-24 px-6 bg-white dark:bg-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Accordion Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
          aria-controls="homepage-seo-content"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className={`text-lg md:text-xl text-zinc-900 dark:text-white ${vernacularHeading}`}>
                {t('hpSeo.accordion_title')}
              </h2>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${vernacularText}`}>
                {t('hpSeo.accordion_subtitle')}
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </div>
        </button>

        {/* Expandable Content */}
        <div
          id="homepage-seo-content"
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: isExpanded ? 'visible' : 'auto' }}
        >
          <div className={`prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-indigo-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline ${isVernacular ? 'prose-p:leading-[2] prose-li:leading-[2]' : 'prose-p:leading-relaxed'}`}>

            {/* ==================== SECTION 1: INFRASTRUCTURE AUTHORITY ==================== */}
            <h2 id="infrastructure" className={vernacularHeading}>{t('hpSeo.infra_title')}</h2>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.infra_p1')}
            </p>

            <h3 className={vernacularHeading}>{t('hpSeo.infra_h3_mock')}</h3>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.infra_p2')}
            </p>
            
            <ul className={`space-y-2 ${isVernacular ? 'space-y-4' : ''}`}>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li1').split(':')[0]}:</strong> {t('hpSeo.infra_li1').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li2').split(':')[0]}:</strong> {t('hpSeo.infra_li2').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li3').split(':')[0]}:</strong> {t('hpSeo.infra_li3').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li4').split(':')[0]}:</strong> {t('hpSeo.infra_li4').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li5').split(':')[0]}:</strong> {t('hpSeo.infra_li5').split(':').slice(1).join(':')}</li>
            </ul>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900 my-8">
              <p className={`text-indigo-800 dark:text-indigo-200 m-0 flex items-start gap-3 ${vernacularText} ${isVernacular ? 'font-semibold' : 'font-medium'}`}>
                <Icons.Quote className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
                <span><em>&ldquo;{t('hpSeo.infra_quote')}&rdquo;</em></span>
              </p>
              <p className={`text-indigo-600 dark:text-indigo-400 text-sm mt-3 mb-0 pl-11 ${vernacularPill}`}>{t('hpSeo.infra_quote_attr')}</p>
            </div>

            <h3 className={vernacularHeading}>{t('hpSeo.infra_h3_kitchen')}</h3>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.infra_p3')}
            </p>
            
            <ul className={`space-y-2 ${isVernacular ? 'space-y-4' : ''}`}>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li6').split(':')[0]}:</strong> {t('hpSeo.infra_li6').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li7').split(':')[0]}:</strong> {t('hpSeo.infra_li7').split(':').slice(1).join(':')}</li>
              <li className={vernacularListItem}><strong>{t('hpSeo.infra_li8').split(':')[0]}:</strong> {t('hpSeo.infra_li8').split(':').slice(1).join(':')}</li>
            </ul>

            <p className={vernacularParagraph}>
              {t('hpSeo.infra_p4')}
            </p>

            {/* ==================== SECTION 2: PLACEMENT HEGEMONY ==================== */}
            <h2 id="placements" className={vernacularHeading}>{t('hpSeo.place_title')}</h2>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.place_p1')}
            </p>

            {/* Placements Table */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <caption className={`text-left text-lg text-zinc-900 dark:text-white mb-4 px-1 ${vernacularHeading}`}>
                  {t('hpSeo.place_table_caption')}
                </caption>
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.place_th_name')}</th>
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.place_th_company')}</th>
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.place_th_role')}</th>
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.place_th_location')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900">
                  {recentPlacements.map((placement, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${idx % 2 === 0 ? 'bg-zinc-50 dark:bg-zinc-900/50' : ''} hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors`}>
                      <td className={`px-4 font-semibold text-zinc-900 dark:text-white ${vernacularTableCell}`}>{placement.name}</td>
                      <td className={`px-4 text-zinc-700 dark:text-zinc-300 ${vernacularTableCell}`}>{placement.company}</td>
                      <td className={`px-4 text-zinc-600 dark:text-zinc-400 ${vernacularTableCell}`}>{placement.role}</td>
                      <td className={`px-4 text-zinc-500 dark:text-zinc-500 text-sm ${vernacularTableCell}`}>{placement.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={vernacularParagraph}>
              {t('hpSeo.place_p2')}
            </p>

            <p className={vernacularParagraph}>
              <Link 
                href="/placements" 
                className={`inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline ${vernacularButton}`}
              >
                {t('hpSeo.place_btn')} <Icons.ArrowRight className="w-4 h-4" />
              </Link>
            </p>

            {/* ==================== SECTION 3: GUJARAT PARADIGM ==================== */}
            <h2 id="roi" className={vernacularHeading}>{t('hpSeo.roi_title')}</h2>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.roi_p1')}
            </p>

            <h3 className={vernacularHeading}>{t('hpSeo.roi_h3')}</h3>

            {/* Comparison Table */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <caption className={`text-left text-lg text-zinc-900 dark:text-white mb-4 px-1 ${vernacularHeading}`}>
                  {t('hpSeo.roi_table_caption')}
                </caption>
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.roi_th_factor')}</th>
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.roi_th_wings')}</th>
                    <th className={`px-4 text-left text-sm uppercase tracking-wider ${vernacularTableCell} ${vernacularPill}`}>{t('hpSeo.roi_th_degree')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                  {[1,2,3,4,5,6].map((row, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${idx % 2 === 1 ? 'bg-zinc-50 dark:bg-zinc-900/50' : ''}`}>
                      <td className={`px-4 font-semibold text-zinc-900 dark:text-white ${vernacularTableCell}`}>{t(`hpSeo.roi_row${row}_factor`)}</td>
                      <td className={`px-4 text-emerald-600 dark:text-emerald-400 font-bold ${vernacularTableCell}`}>{t(`hpSeo.roi_row${row}_wings`)}</td>
                      <td className={`px-4 ${vernacularTableCell}`}>{t(`hpSeo.roi_row${row}_degree`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={vernacularParagraph}>
              {t('hpSeo.roi_p2')}
            </p>

            {/* ==================== SECTION 4: PROGRAM OVERVIEW ==================== */}
            <h2 id="courses" className={vernacularHeading}>{t('hpSeo.courses_title')}</h2>
            
            <p className={vernacularParagraph}>
              {t('hpSeo.courses_p1')}
            </p>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              
              {/* Air Hostess */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                    <Icons.Plane className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className={`text-lg text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hpSeo.course_ah_title')}</h4>
                </div>
                <p className={`text-zinc-600 dark:text-zinc-300 text-sm mb-4 ${vernacularText}`}>
                  {t('hpSeo.course_ah_desc')}
                </p>
                <Link href="/air-hostess-training" className={`text-red-600 dark:text-red-400 text-sm flex items-center gap-1 hover:underline ${vernacularButton}`}>
                  {t('hpSeo.course_ah_btn')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Airport Management */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <Icons.Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className={`text-lg text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hpSeo.course_am_title')}</h4>
                </div>
                <p className={`text-zinc-600 dark:text-zinc-300 text-sm mb-4 ${vernacularText}`}>
                  {t('hpSeo.course_am_desc')}
                </p>
                <Link href="/airport-management" className={`text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline ${vernacularButton}`}>
                  {t('hpSeo.course_am_btn')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Hotel Management */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Icons.Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className={`text-lg text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hpSeo.course_hm_title')}</h4>
                </div>
                <p className={`text-zinc-600 dark:text-zinc-300 text-sm mb-4 ${vernacularText}`}>
                  {t('hpSeo.course_hm_desc')}
                </p>
                <Link href="/hotel-management" className={`text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1 hover:underline ${vernacularButton}`}>
                  {t('hpSeo.course_hm_btn')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Culinary */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                    <Icons.ChefHat className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className={`text-lg text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hpSeo.course_cu_title')}</h4>
                </div>
                <p className={`text-zinc-600 dark:text-zinc-300 text-sm mb-4 ${vernacularText}`}>
                  {t('hpSeo.course_cu_desc')}
                </p>
                <Link href="/culinary-cooking-course" className={`text-orange-600 dark:text-orange-400 text-sm flex items-center gap-1 hover:underline ${vernacularButton}`}>
                  {t('hpSeo.course_cu_btn')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Travel & Tourism */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/30 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                    <Icons.Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h4 className={`text-lg text-zinc-900 dark:text-white ${vernacularHeading}`}>{t('hpSeo.course_tt_title')}</h4>
                </div>
                <p className={`text-zinc-600 dark:text-zinc-300 text-sm mb-4 ${vernacularText}`}>
                  {t('hpSeo.course_tt_desc')}
                </p>
                <Link href="/travel-tourism-management" className={`text-teal-600 dark:text-teal-400 text-sm flex items-center gap-1 hover:underline ${vernacularButton}`}>
                  {t('hpSeo.course_tt_btn')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ==================== SECTION 5: FAQ ==================== */}
            <h2 id="faq" className={vernacularHeading}>{t('hpSeo.faq_title')}</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {faqKeys.map((faqKey, idx) => (
                <details 
                  key={idx} 
                  open
                  className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  <summary className={`flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${vernacularPill}`}>
                    <span className={`text-zinc-900 dark:text-white pr-4 ${vernacularHeading}`}>
                      {t(`hpSeo.${faqKey}_q`)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                      <Icons.ChevronDown className="w-4 h-4 text-zinc-500" />
                    </div>
                  </summary>
                  <div className={`px-5 pb-5 text-zinc-600 dark:text-zinc-300 ${vernacularParagraph}`}>
                    {t(`hpSeo.${faqKey}_a`)}
                  </div>
                </details>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className={`text-2xl mb-4 ${vernacularHeading}`}>{t('hpSeo.cta_title')}</h3>
              <p className={`text-indigo-100 mb-6 max-w-2xl mx-auto ${vernacularText}`}>
                {t('hpSeo.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/admissions"
                  className={`px-8 py-4 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2 ${vernacularButton}`}
                >
                  {t('hpSeo.cta_btn_apply')} <Icons.ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="tel:+918758754444" 
                  className={`px-8 py-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-colors flex items-center gap-2 ${vernacularButton}`}
                >
                  <Icons.Phone className="w-4 h-4" /> {t('hpSeo.cta_btn_call')}
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Noscript Fallback - Full content for bots with JS disabled */}
        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>{t('hpSeo.noscript_infra')}</h2>
            <p>{t('hpSeo.noscript_infra_p')}</p>
            
            <h2>{t('hpSeo.noscript_alumni')}</h2>
            <p>{t('hpSeo.noscript_alumni_p')}</p>
            
            <h2>{t('hpSeo.noscript_courses')}</h2>
            <ul>
              <li>{t('hpSeo.noscript_c1')}</li>
              <li>{t('hpSeo.noscript_c2')}</li>
              <li>{t('hpSeo.noscript_c3')}</li>
              <li>{t('hpSeo.noscript_c4')}</li>
              <li>{t('hpSeo.noscript_c5')}</li>
            </ul>
            
            <p>{t('hpSeo.noscript_visit')}</p>
          </div>
        </noscript>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #homepage-seo-content {
            max-height: none !important;
            opacity: 1 !important;
          }
          .prose details[open] > summary ~ * {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomepageSEOContent;

