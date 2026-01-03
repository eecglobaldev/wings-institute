'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { TravelTourismSEOContent } from '@/components/TravelTourismSEOContent';
import { CredentialCard } from '@/components/CredentialCard';
import { PowerModuleCard } from '@/components/PowerModuleCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function TravelTourismPageClient() {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const certificates = [
    { title: t('tt.cert1'), image: "/images/travel-tourism/travel-tourism-certificate.jpg" },
    { title: t('tt.cert2'), image: "/images/air-hostess-course-page/spoken-english-certificate.jpg" },
    { title: t('tt.cert3'), image: "/images/air-hostess-course-page/avsec-certificate.jpg" },
    { title: t('tt.cert4'), image: "/images/air-hostess-course-page/first-aid-certificate.png" },
    { title: t('tt.cert5'), image: "/images/air-hostess-course-page/posh-certificate.png" },
    { title: t('tt.cert6'), image: "/images/air-hostess-course-page/crs-certificate.png" }
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-6 mb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-teal-500/30 mb-2 lg:mb-8 animate-fade-in-up bg-white/60 dark:bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className={`text-xs text-teal-600 dark:text-teal-400 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('tt.badge')}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>
          
          <h1 className={`font-display text-5xl md:text-7xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
            {t('tt.hero_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 italic pr-2">
              {t('tt.hero_title2')}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mb-12 animate-fade-in-up [animation-delay:400ms] border-l-4 border-teal-500 pl-6 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
            <strong>{t('tt.hero_desc')}</strong><br/>
            {t('tt.hero_subdesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:600ms]">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-teal-500">
              <div className="p-3 bg-teal-500/10 rounded-xl text-teal-600"><Icons.Clock className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('tt.duration')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('tt.duration_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('tt.duration_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-teal-500">
              <div className="p-3 bg-teal-500/10 rounded-xl text-teal-600"><Icons.Globe className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('tt.gds')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('tt.gds_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('tt.gds_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-teal-500">
              <div className="p-3 bg-teal-500/10 rounded-xl text-teal-600"><Icons.Award className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('tt.outcome')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('tt.outcome_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('tt.outcome_sub')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE MODULES */}
      <section className="px-6 mb-32 bg-zinc-50/50 dark:bg-white/5 py-24 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-[2px] bg-teal-500"></span>
            <span className={`text-teal-500 uppercase tracking-widest text-sm ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('tt.modules_badge')}</span>
            <h2 className={`text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white ml-auto text-right ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('tt.modules_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
            <PowerModuleCard 
              index={1}
              title={t('tt.mod1_title')}
              roleTitle={t('tt.mod1_role')}
              icon={Icons.Globe}
              color="teal"
              desc={t('tt.mod1_desc')}
              tapLabel={t('tt.mod_tap')}
              curriculumLabel={t('tt.mod_curriculum')}
              includedLabel={t('tt.cert_included')}
            />
            <PowerModuleCard 
              index={2}
              title={t('tt.mod2_title')}
              roleTitle={t('tt.mod2_role')}
              icon={Icons.Ticket}
              color="cyan"
              desc={t('tt.mod2_desc')}
              tapLabel={t('tt.mod_tap')}
              curriculumLabel={t('tt.mod_curriculum')}
              includedLabel={t('tt.cert_included')}
            />
            <PowerModuleCard 
              index={3}
              title={t('tt.mod3_title')}
              roleTitle={t('tt.mod3_role')}
              icon={Icons.Map}
              color="blue"
              desc={t('tt.mod3_desc')}
              tapLabel={t('tt.mod_tap')}
              curriculumLabel={t('tt.mod_curriculum')}
              includedLabel={t('tt.cert_included')}
            />
            <PowerModuleCard 
              index={4}
              title={t('tt.mod4_title')}
              roleTitle={t('tt.mod4_role')}
              icon={Icons.Briefcase}
              color="purple"
              desc={t('tt.mod4_desc')}
              tapLabel={t('tt.mod_tap')}
              curriculumLabel={t('tt.mod_curriculum')}
              includedLabel={t('tt.cert_included')}
            />
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATES */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-10 rounded-[3rem] bg-zinc-50 border border-zinc-200 mb-16 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[100px] opacity-60"></div>

            <div className="relative z-10">
              <h3 className={`text-center font-display text-3xl font-bold text-zinc-900 mb-12 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                {t('tt.cert_title')} <span className="text-teal-500">{t('tt.cert_accent')}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <CredentialCard 
                    key={i} 
                    title={cert.title} 
                    image={cert.image} 
                    index={i}
                    hoverText={t('tt.cert_hover')}
                    verifiedText={t('tt.cert_verified')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-zinc-900"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              <h2 className={`font-display font-black text-5xl md:text-7xl tracking-tighter mb-8 text-white ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
                {t('tt.cta_title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                  {t('tt.cta_accent')}
                </span>
              </h2>

              <Link 
                href="/admissions"
                className="group relative px-12 py-6 bg-white text-zinc-900 rounded-full font-black text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <span className="flex items-center gap-2">
                  {t('tt.cta_btn')} <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <TravelTourismSEOContent />

      {/* FAQ */}
      <FAQSection 
        title={t('tt.faq_title')}
        color="teal"
        schemaId="travel-tourism-page-faq"
        data={[
          { q: t('tt.faq_q1'), a: t('tt.faq_a1') },
          { q: t('tt.faq_q2'), a: t('tt.faq_a2') },
          { q: t('tt.faq_q3'), a: t('tt.faq_a3') },
          { q: t('tt.faq_q4'), a: t('tt.faq_a4') }
        ]}
      />
    </div>
  );
}

