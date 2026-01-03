'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { HotelManagementSEOContent } from '@/components/HotelManagementSEOContent';
import { CredentialCard } from '@/components/CredentialCard';
import { PowerModuleCard } from '@/components/PowerModuleCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function HotelManagementPageClient() {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const certificates = [
    { 
      title: t('hm.cert1'), 
      image: "/images/airport-management/hotel-management-certificate.jpg" 
    },
    { 
      title: t('hm.cert2'), 
      image: "/images/air-hostess-course-page/spoken-english-certificate.jpg" 
    },
    { 
      title: t('hm.cert3'), 
      image: "/images/air-hostess-course-page/avsec-certificate.jpg" 
    },
    { 
      title: t('hm.cert4'), 
      image: "/images/air-hostess-course-page/first-aid-certificate.png" 
    },
    { 
      title: t('hm.cert5'), 
      image: "/images/air-hostess-course-page/posh-certificate.png" 
    },
    { 
      title: t('hm.cert6'), 
      image: "/images/air-hostess-course-page/hotel-internship-certificate.jpg" 
    }
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Background Ambience - Amber/Gold for Luxury Hospitality Feel */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-6 mb-24 relative">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-amber-500/30 mb-2 lg:mb-8 animate-fade-in-up bg-white/60 dark:bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className={`text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.badge')}</span>
            </div>

            {/* Language Toggle */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div> 
          </div>
          
          <h1 className={`font-display text-5xl md:text-7xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
            {t('hm.hero_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 italic pr-2">
              {t('hm.hero_title2')}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mb-12 animate-fade-in-up [animation-delay:400ms] border-l-4 border-amber-500 pl-6 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
            <strong>{t('hm.hero_desc')}</strong><br/>
            {t('hm.hero_subdesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:600ms]">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-amber-500">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600"><Icons.Clock className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.duration')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('hm.duration_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('hm.duration_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-amber-500">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600"><Icons.BookOpen className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.study_material')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('hm.study_material_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('hm.study_material_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-amber-500">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600"><Icons.Award className="w-6 h-6" /></div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.outcome')}</div>
                <div className={`text-lg text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('hm.outcome_value')}</div>
                <div className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('hm.outcome_sub')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS (Core Modules) */}
      <section className="px-6 mb-32 bg-zinc-50/50 dark:bg-white/5 py-24 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-[2px] bg-amber-500"></span>
            <span className={`text-amber-500 uppercase tracking-widest text-sm ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.modules_badge')}</span>
            <h2 className={`text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white ml-auto text-right ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('hm.modules_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
            <PowerModuleCard 
              index={1}
              title={t('hm.mod1_title')}
              roleTitle={t('hm.mod1_role')}
              icon={Icons.ConciergeBell}
              color="amber"
              desc={t('hm.mod1_desc')}
              tapLabel={t('hm.mod_tap')}
              curriculumLabel={t('hm.mod_curriculum')}
              includedLabel={t('hm.cert_included')}
            />

            <PowerModuleCard 
              index={2}
              title={t('hm.mod2_title')}
              roleTitle={t('hm.mod2_role')}
              icon={Icons.Utensils}
              color="orange"
              desc={t('hm.mod2_desc')}
              tapLabel={t('hm.mod_tap')}
              curriculumLabel={t('hm.mod_curriculum')}
              includedLabel={t('hm.cert_included')}
            />

            <PowerModuleCard 
              index={3}
              title={t('hm.mod3_title')}
              roleTitle={t('hm.mod3_role')}
              icon={Icons.ChefHat}
              color="red"
              desc={t('hm.mod3_desc')}
              tapLabel={t('hm.mod_tap')}
              curriculumLabel={t('hm.mod_curriculum')}
              includedLabel={t('hm.cert_included')}
            />

            <PowerModuleCard 
              index={4}
              title={t('hm.mod4_title')}
              roleTitle={t('hm.mod4_role')}
              icon={Icons.BedDouble}
              color="teal"
              desc={t('hm.mod4_desc')}
              tapLabel={t('hm.mod_tap')}
              curriculumLabel={t('hm.mod_curriculum')}
              includedLabel={t('hm.cert_included')}
            />
          </div>
        </div>
      </section>

      {/* 3. PRACTICAL TRAINING INFRASTRUCTURE */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-amber-500/20 bg-gradient-to-br from-white to-amber-50 dark:from-zinc-900 dark:to-black relative overflow-hidden">
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className={`font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                  {t('hm.practical_title')}<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">{t('hm.practical_accent')}</span>
                </h2>
                <p className={`text-lg text-zinc-600 dark:text-zinc-400 mb-8 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                  {t('hm.practical_desc')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.infra1_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.7] font-semibold' : ''}`}>{t('hm.infra1_desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.ConciergeBell className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.infra2_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.7] font-semibold' : ''}`}>{t('hm.infra2_desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.ChefHat className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.infra3_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.7] font-semibold' : ''}`}>{t('hm.infra3_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/20">
                <Image 
                  src="/images/airport-management/fine-dine-restaurant.jpg" 
                  alt="Practical Training"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Green dot + text */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                  <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  {t('adv.card2.tag1')}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className={`text-3xl font-display font-bold ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('hm.practical_areas')}</div>
                  <p className={`text-white/80 ${isVernacular ? 'font-semibold' : ''}`}>{t('hm.practical_sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOLISTIC DEVELOPMENT */}
      <section className="px-6 mb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <span className={`text-amber-500 tracking-widest uppercase text-xs mb-3 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.holistic_badge')}</span>
            <h2 className={`font-display text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.2]' : ''}`}>
              {t('hm.holistic_title')}<br/>
              <span className="italic font-serif text-amber-500">{t('hm.holistic_accent')}</span>
            </h2>
            <p className={`text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
              {t('hm.holistic_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* 1. Spoken English - Featured */}
            <div className="md:col-span-3 lg:col-span-4 group relative bg-zinc-900 dark:bg-white rounded-[2.5rem] p-10 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 text-2xl shadow-sm text-white">
                  <Icons.Languages className="w-7 h-7" />
                </div>
                <h3 className={`text-2xl font-bold text-white dark:text-zinc-900 mb-3 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.english_title')}</h3>
                <p className={`text-sm text-zinc-300 dark:text-zinc-600 max-w-lg ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                  {t('hm.english_desc')}
                </p>
              </div>
            </div>

            {/* 2. In-House Spa - Compact */}
            <div className="md:col-span-3 lg:col-span-2 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-pink-500/20"></div>
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 text-2xl shadow-sm">
                <Icons.Sparkles className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.spa_title')}</h3>
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                {t('hm.spa_desc')}
              </p>
            </div>

            {/* 3. Fitness - Compact */}
            <div className="md:col-span-3 lg:col-span-2 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-green-500/20"></div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 text-2xl shadow-sm">
                <Icons.Activity className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.fitness_title')}</h3>
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                {t('hm.fitness_desc')}
              </p>
            </div>

            {/* 4. Customer Service - Wide */}
            <div className="md:col-span-3 lg:col-span-4 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/20"></div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 text-2xl shadow-sm">
                <Icons.Heart className="w-7 h-7" />
              </div>
              <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('hm.customer_title')}</h3>
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                {t('hm.customer_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. JOB MASTERY & CERTIFICATES */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Certificates Wall */}
          <div className="relative p-10 rounded-[3rem] bg-zinc-50 border border-zinc-200 mb-16 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[100px] opacity-60"></div>

            <div className="relative z-10">
              <h3 className={`text-center font-display text-3xl font-bold text-zinc-900 mb-12 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                {t('hm.cert_title')} <span className="text-amber-500">{t('hm.cert_accent')}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <CredentialCard 
                    key={i} 
                    title={cert.title} 
                    image={cert.image} 
                    index={i}
                    hoverText={t('hm.cert_hover')}
                    verifiedText={t('hm.cert_verified')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The Final Push: Job Interview Mastery */}
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-zinc-900"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen"></div>

            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                <span className={`text-xs text-yellow-500 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.mastery_badge')}</span>
              </div>

              <h2 className={`font-display font-black text-5xl md:text-8xl tracking-tighter mb-8 text-white drop-shadow-2xl ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
                {t('hm.mastery_title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-red-500">
                  {t('hm.mastery_accent')}
                </span>
              </h2>

              <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-10">
                <p className={`text-xl text-zinc-200 font-light mb-8 ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                  {t('hm.mastery_desc')}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900/50 border border-white/10 shadow-lg">
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-400"><Icons.Bot className="w-5 h-5" /></div>
                    <span className={`text-white ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.ai_tools')}</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900/50 border border-white/10 shadow-lg">
                    <div className="p-2 bg-purple-500/20 rounded-full text-purple-400"><Icons.FileText className="w-5 h-5" /></div>
                    <span className={`text-white ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.resume_builder')}</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/admissions"
                className={`group relative px-12 py-6 bg-white text-zinc-900 rounded-full font-black text-xl tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden ${isVernacular ? 'leading-[1.4]' : ''}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hm.mastery_btn')} <Icons.ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <p className={`mt-8 text-sm text-zinc-400 uppercase tracking-widest ${isVernacular ? 'font-semibold leading-[1.6]' : 'font-medium'}`}>
                {t('hm.career_paths')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* WALL OF FAME */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className={`text-amber-600 text-xs tracking-wider uppercase mb-3 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('hm.fame_badge')}</span>
            <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.3]' : ''}`}>
              {t('hm.fame_title')} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">{t('hm.fame_accent')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student 1 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/rakesh-rathod-riyadh.jpeg" 
                  alt="Rakesh Rathod, Wings Institute hotel management graduate working as Housekeeping Assistant Manager at Le Meridien Riyadh"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className={`inline-block px-3 py-1 rounded-lg bg-[#BE9E44] text-white text-[10px] uppercase tracking-widest mb-3 border border-white/20 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                    Le Meridien Hotel, Riyadh
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Rakesh Rathod</h3>
                  <p className={`text-zinc-300 text-sm ${isVernacular ? 'font-semibold' : ''}`}>Housekeeping Assistant Manager</p>
                </div>
              </div>
            </div>

            {/* Student 2 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer mt-0 md:-mt-12">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/ayushi-patel.jpg" 
                  alt="Ayushi Patel, Wings Institute hospitality alumna working as Front Office Executive at St. Regis Hotel Doha"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className={`inline-block px-3 py-1 rounded-lg bg-[#000000] text-white text-[10px] uppercase tracking-widest mb-3 border border-white/20 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                    St. Regis Hotel, Doha
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Ayushi Patel</h3>
                  <p className={`text-zinc-300 text-sm ${isVernacular ? 'font-semibold' : ''}`}>Front Office Executive</p>
                </div>
              </div>
            </div>

            {/* Student 3 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/divya-patel.jpg" 
                  alt="Divya Patel, Wings Institute Vadodara hotel management graduate at ITC Welcome Hotel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className={`inline-block px-3 py-1 rounded-lg bg-[#C1272D] text-white text-[10px] uppercase tracking-widest mb-3 border border-white/20 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                    ITC Welcome Hotel
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Divya Patel</h3>
                  <p className={`text-zinc-300 text-sm ${isVernacular ? 'font-semibold' : ''}`}>Guest Service Associate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/placements"
              className={`inline-flex items-center gap-2 px-8 py-4 glass-panel rounded-full text-zinc-900 dark:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all border border-zinc-200 dark:border-white/10 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
            >
              {t('hm.fame_btn')} <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT MODULE */}
      <HotelManagementSEOContent />

      {/* FAQ Section */}
      <FAQSection 
        title={t('hm.faq_title')}
        color="amber"
        schemaId="hotel-management-page-faq"
        data={[
          { q: t('hm.faq_q1'), a: t('hm.faq_a1') },
          { q: t('hm.faq_q2'), a: t('hm.faq_a2') },
          { q: t('hm.faq_q3'), a: t('hm.faq_a3') },
          { q: t('hm.faq_q4'), a: t('hm.faq_a4') }
        ]}
      />

    </div>
  );
}

