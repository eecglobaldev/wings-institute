'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { CulinarySEOContent } from '@/components/CulinarySEOContent';
import { CredentialCard } from '@/components/CredentialCard';
import { PowerModuleCard } from '@/components/PowerModuleCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function CulinaryPageClient() {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const certificates = [
    { title: t('cu.cert1'), image: "/images/culinary-course/culinary-course-certificate.jpg" },
    { title: t('cu.cert2'), image: "/images/air-hostess-course-page/spoken-english-certificate.jpg" },
    { title: t('cu.cert3'), image: "/images/air-hostess-course-page/avsec-certificate.jpg" },
    { title: t('cu.cert4'), image: "/images/air-hostess-course-page/first-aid-certificate.png" },
    { title: t('cu.cert5'), image: "/images/air-hostess-course-page/posh-certificate.png" },
    { title: t('cu.cert6'), image: "/images/air-hostess-course-page/hotel-internship-certificate.jpg" }
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-6 mb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-500/30 mb-2 lg:mb-8 animate-fade-in-up bg-white/60 dark:bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className={`text-xs text-orange-600 dark:text-orange-400 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('cu.badge')}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>
          
          <h1 className={`font-display text-5xl md:text-7xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
            {t('cu.hero_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 italic pr-2">
              {t('cu.hero_title2')}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mb-12 animate-fade-in-up [animation-delay:400ms] border-l-4 border-orange-500 pl-6 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
            <strong>{t('cu.hero_desc')}</strong><br/>
            {t('cu.hero_subdesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:600ms]">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-orange-500">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-600"><Icons.Clock className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('cu.duration')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('cu.duration_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('cu.duration_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-orange-500">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-600"><Icons.ChefHat className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('cu.practical')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('cu.practical_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('cu.practical_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-orange-500">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-600"><Icons.Award className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('cu.outcome')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('cu.outcome_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('cu.outcome_sub')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE MODULES */}
      <section className="px-6 mb-32 bg-zinc-50/50 dark:bg-white/5 py-24 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-[2px] bg-orange-500"></span>
            <span className={`text-orange-500 uppercase tracking-widest text-sm ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('cu.modules_badge')}</span>
            <h2 className={`text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white ml-auto text-right ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('cu.modules_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-container">
            <PowerModuleCard 
              index={1}
              title={t('cu.mod1_title')}
              roleTitle={t('cu.mod1_role')}
              icon={Icons.Utensils}
              color="orange"
              desc={t('cu.mod1_desc')}
              tapLabel={t('cu.mod_tap')}
              curriculumLabel={t('cu.mod_curriculum')}
              includedLabel={t('cu.cert_included')}
            />
            <PowerModuleCard 
              index={2}
              title={t('cu.mod2_title')}
              roleTitle={t('cu.mod2_role')}
              icon={Icons.ChefHat}
              color="red"
              desc={t('cu.mod2_desc')}
              tapLabel={t('cu.mod_tap')}
              curriculumLabel={t('cu.mod_curriculum')}
              includedLabel={t('cu.cert_included')}
            />
            <PowerModuleCard 
              index={3}
              title={t('cu.mod3_title')}
              roleTitle={t('cu.mod3_role')}
              icon={Icons.Coffee}
              color="yellow"
              desc={t('cu.mod3_desc')}
              tapLabel={t('cu.mod_tap')}
              curriculumLabel={t('cu.mod_curriculum')}
              includedLabel={t('cu.cert_included')}
            />
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATES */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-10 rounded-[3rem] bg-zinc-50 border border-zinc-200 mb-16 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-[100px] opacity-60"></div>

            <div className="relative z-10">
              <h3 className={`text-center font-display text-3xl font-bold text-zinc-900 mb-12 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                {t('cu.cert_title')} <span className="text-orange-500">{t('cu.cert_accent')}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <CredentialCard 
                    key={i} 
                    title={cert.title} 
                    image={cert.image} 
                    index={i}
                    hoverText={t('cu.cert_hover')}
                    verifiedText={t('cu.cert_verified')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-zinc-900"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              <h2 className={`font-display font-black text-5xl md:text-7xl tracking-tighter mb-8 text-white ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
                {t('cu.cta_title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  {t('cu.cta_accent')}
                </span>
              </h2>

              <Link 
                href="/admissions"
                className="group relative px-12 py-6 bg-white text-zinc-900 rounded-full font-black text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <span className="flex items-center gap-2">
                  {t('cu.cta_btn')} <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <CulinarySEOContent />

      {/* FAQ */}
      <FAQSection 
        title={t('cu.faq_title')}
        color="orange"
        schemaId="culinary-page-faq"
        data={[
          { q: t('cu.faq_q1'), a: t('cu.faq_a1') },
          { q: t('cu.faq_q2'), a: t('cu.faq_a2') },
          { q: t('cu.faq_q3'), a: t('cu.faq_a3') },
          { q: t('cu.faq_q4'), a: t('cu.faq_a4') }
        ]}
      />
    </div>
  );
}

