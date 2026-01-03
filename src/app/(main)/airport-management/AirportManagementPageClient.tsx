'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { AirportManagementSEOContent } from '@/components/AirportManagementSEOContent';
import { CredentialCard } from '@/components/CredentialCard';
import { PowerModuleCard } from '@/components/PowerModuleCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function AirportManagementPageClient() {
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  const certificates = [
    { 
      title: t('am.cert1'), 
      image: "/images/airport-management/airport-management-certificate.jpg" 
    },
    { 
      title: t('am.cert2'), 
      image: "/images/air-hostess-course-page/spoken-english-certificate.jpg" 
    },
    { 
      title: t('am.cert3'), 
      image: "/images/air-hostess-course-page/avsec-certificate.jpg" 
    },
    { 
      title: t('am.cert4'), 
      image: "/images/air-hostess-course-page/first-aid-certificate.png" 
    },
    { 
      title: t('am.cert5'), 
      image: "/images/air-hostess-course-page/posh-certificate.png" 
    },
    { 
      title: t('am.cert6'), 
      image: "/images/air-hostess-course-page/crs-certificate.png" 
    }
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Background Ambience - Blue/Indigo Theme for Professional/Corporate feel */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-6 mb-24 relative">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-blue-500/30 mb-2 lg:mb-8 animate-fade-in-up bg-white/60 dark:bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className={`font-bold text-blue-600 dark:text-blue-400 uppercase ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-widest'}`}>{t('am.badge')}</span>
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
            {t('am.hero_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 italic pr-2">
              {t('am.hero_title2')}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mb-12 animate-fade-in-up [animation-delay:400ms] border-l-4 border-blue-500 pl-6 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
            <strong className={isVernacular ? 'font-extrabold' : ''}>{t('am.hero_desc')}</strong><br/>
            {t('am.hero_subdesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:600ms]">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-blue-500">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600"><Icons.Clock className="w-6 h-6" /></div>
              <div>
                <div className={`font-bold uppercase text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-wider'}`}>{t('am.schedule')}</div>
                <div className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.schedule_value')}</div>
                <div className={`text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] leading-[1.5]' : 'text-xs'}`}>{t('am.schedule_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-blue-500">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600"><Icons.BookOpen className="w-6 h-6" /></div>
              <div>
                <div className={`font-bold uppercase text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-wider'}`}>{t('am.curriculum')}</div>
                <div className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.curriculum_value')}</div>
                <div className={`text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] leading-[1.5]' : 'text-xs'}`}>{t('am.curriculum_sub')}</div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-blue-500">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600"><Icons.Award className="w-6 h-6" /></div>
              <div>
                <div className={`font-bold uppercase text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-wider'}`}>{t('am.outcome')}</div>
                <div className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.outcome_value')}</div>
                <div className={`text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'text-[11px] leading-[1.5]' : 'text-xs'}`}>{t('am.outcome_sub')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS (Core Modules) */}
      <section className="px-6 mb-32 bg-zinc-50/50 dark:bg-white/5 py-24 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12 flex-wrap">
            <span className="w-12 h-[2px] bg-blue-500"></span>
            <span className={`text-blue-500 font-bold uppercase ${isVernacular ? 'text-[12px] tracking-wide' : 'text-sm tracking-widest'}`}>{t('am.modules_badge')}</span>
            <h2 className={`text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white ml-auto text-right ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('am.modules_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
            <PowerModuleCard 
              index={1}
              title={t('am.mod1_title')}
              roleTitle={t('am.mod1_role')}
              icon={Icons.Luggage}
              color="blue"
              desc={t('am.mod1_desc')}
              tapLabel={t('am.mod_tap')}
              curriculumLabel={t('am.mod_curriculum')}
              includedLabel={t('am.cert_included')}
            />

            <PowerModuleCard 
              index={2}
              title={t('am.mod2_title')}
              roleTitle={t('am.mod2_role')}
              icon={Icons.Coffee}
              color="indigo"
              desc={t('am.mod2_desc')}
              tapLabel={t('am.mod_tap')}
              curriculumLabel={t('am.mod_curriculum')}
              includedLabel={t('am.cert_included')}
            />

            <PowerModuleCard 
              index={3}
              title={t('am.mod3_title')}
              roleTitle={t('am.mod3_role')}
              icon={Icons.Globe}
              color="purple"
              desc={t('am.mod3_desc')}
              tapLabel={t('am.mod_tap')}
              curriculumLabel={t('am.mod_curriculum')}
              includedLabel={t('am.cert_included')}
            />

            <PowerModuleCard 
              index={4}
              title={t('am.mod4_title')}
              roleTitle={t('am.mod4_role')}
              icon={Icons.MonitorPlay}
              color="emerald"
              desc={t('am.mod4_desc')}
              tapLabel={t('am.mod_tap')}
              curriculumLabel={t('am.mod_curriculum')}
              includedLabel={t('am.cert_included')}
            />
          </div>
        </div>
      </section>

      {/* 3. THE WINGS DIFFERENCE: Holistic + Exclusive */}
      <section className="px-6 mb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <span className={`text-wings-red font-bold uppercase mb-3 block ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-widest'}`}>{t('am.holistic_badge')}</span>
            <h2 className={`font-display text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
              {t('am.holistic_title')}<br/>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600">{t('am.holistic_accent')}</span>
            </h2>
            <p className={`text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
              {t('am.holistic_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* English - Addressed Head On */}
            <div className="md:col-span-12 lg:col-span-8 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-1 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  <Icons.Languages className="w-10 h-10" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.english_title')}</h3>
                  <p className={`text-base text-zinc-600 dark:text-zinc-400 mb-4 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
                    {t('am.english_desc')}
                  </p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold uppercase ${isVernacular ? 'text-[10px] tracking-wide' : 'text-xs tracking-wider'}`}>
                    <Icons.CheckCircle2 className="w-3 h-3" /> {t('am.english_cert')}
                  </span>
                </div>
              </div>
            </div>

            {/* Spa & Grooming */}
            <div className="md:col-span-6 lg:col-span-4 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-1 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 text-2xl shadow-sm">
                <Icons.Sparkles className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.spa_title')}</h3>
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
                {t('am.spa_desc')}
              </p>
            </div>

            {/* Fitness */}
            <div className="md:col-span-6 lg:col-span-4 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-1 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 text-2xl shadow-sm">
                <Icons.Activity className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-3 ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.fitness_title')}</h3>
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
                {t('am.fitness_desc')}
              </p>
            </div>

            {/* Exclusive Workshops */}
            <div className="md:col-span-12 lg:col-span-8 group relative bg-gradient-to-br from-zinc-900 to-black rounded-[2.5rem] p-10 shadow-2xl overflow-hidden text-white border border-white/10">
              <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Icons.ShieldAlert className="w-8 h-8 text-wings-red" />
                  <h3 className={`text-2xl font-bold ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.exclusives_title')}</h3>
                </div>
                <p className={`text-zinc-400 mb-8 max-w-xl ${isVernacular ? 'leading-[1.9] font-medium' : ''}`}>
                  {t('am.exclusives_desc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className={`text-wings-red font-black uppercase mb-1 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-sm tracking-widest'}`}>{t('am.exclusive')}</div>
                    <div className={`font-bold text-lg ${isVernacular ? 'leading-[1.5]' : ''}`}>{t('am.avsec_title')}</div>
                    <div className={`text-zinc-400 mt-1 ${isVernacular ? 'text-[11px] leading-[1.7]' : 'text-xs'}`}>{t('am.avsec_desc')}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className={`text-blue-400 font-black uppercase mb-1 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-sm tracking-widest'}`}>{t('am.corporate')}</div>
                    <div className={`font-bold text-lg ${isVernacular ? 'leading-[1.5]' : ''}`}>{t('am.posh_title')}</div>
                    <div className={`text-zinc-400 mt-1 ${isVernacular ? 'text-[11px] leading-[1.7]' : 'text-xs'}`}>{t('am.posh_desc')}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className={`text-green-400 font-black uppercase mb-1 ${isVernacular ? 'text-[11px] tracking-wide' : 'text-sm tracking-widest'}`}>{t('am.essential')}</div>
                    <div className={`font-bold text-lg ${isVernacular ? 'leading-[1.5]' : ''}`}>{t('am.firstaid_title')}</div>
                    <div className={`text-zinc-400 mt-1 ${isVernacular ? 'text-[11px] leading-[1.7]' : 'text-xs'}`}>{t('am.firstaid_desc')}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REAL WORLD SIMULATION */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-blue-500/20 bg-gradient-to-br from-white to-blue-50 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden">
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className={`font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                  {t('am.practical_title')} <br/> {t('am.practical_accent')}
                </h2>
                <p className={`text-lg text-zinc-600 dark:text-zinc-400 mb-8 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
                  {t('am.practical_desc')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.Mic className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.infra1_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : ''}`}>{t('am.infra1_desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.infra2_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : ''}`}>{t('am.infra2_desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icons.Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5] font-extrabold' : ''}`}>{t('am.infra3_title')}</h4>
                      <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : ''}`}>{t('am.infra3_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/20">
                <Image 
                  src="/images/airport-management/airport-ground-staff.png" 
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
                  <div className={`text-3xl font-display font-bold ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('am.practical_areas')}</div>
                  <p className={`text-white/80 ${isVernacular ? 'leading-[1.6] font-medium' : ''}`}>{t('am.practical_sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROUND STAFF WALL OF FAME */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className={`text-blue-600 font-bold uppercase mb-3 block ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-wider'}`}>{t('am.fame_badge')}</span>
            <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.3]' : ''}`}>
              {t('am.fame_title')} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('am.fame_accent')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student 1 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/bansariba-raulji-indigo.jpg" 
                  alt="Bansariba Raulji, Wings Institute airport management graduate working as ground staff at IndiGo Airlines"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#ED1C24] text-white text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
                    Indigo Airlines
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Bansariba Raulji</h3>
                  <p className={`text-zinc-300 text-sm ${isVernacular ? 'leading-[1.6] font-medium' : ''}`}>{t('am.ground_staff')}</p>
                </div>
              </div>
            </div>

            {/* Student 2 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer mt-0 md:-mt-12">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/crish-fernandes-etihad.jpg" 
                  alt="Crish Fernandes, Wings Institute alumnus working as ground staff at Etihad Airways Ahmedabad Airport"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#00529B] text-white text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
                    Etihad Airways
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Crish Fernandes</h3>
                  <p className="text-zinc-300 text-sm">Ahmedabad International Airport</p>
                </div>
              </div>
            </div>

            {/* Student 3 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image 
                  src="/images/airport-management/noof-shaikh.jpg" 
                  alt="Noof Shaikh, Wings Institute Vadodara airport management graduate at IndiGo Airlines ground staff"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#582C83] text-white text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
                    Indigo Airlines
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">Noof Shaikh</h3>
                  <p className={`text-zinc-300 text-sm ${isVernacular ? 'leading-[1.6] font-medium' : ''}`}>{t('am.ground_staff')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/placements"
              className={`inline-flex items-center gap-2 px-8 py-4 glass-panel rounded-full text-zinc-900 dark:text-white font-bold hover:bg-white/50 dark:hover:bg-white/10 transition-all border border-zinc-200 dark:border-white/10 ${isVernacular ? 'leading-[1.6] font-extrabold' : ''}`}
            >
              {t('am.fame_btn')} <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. JOB MASTERY & CERTIFICATES */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Certificates Wall */}
          <div className="relative p-10 rounded-[3rem] bg-zinc-50 border border-zinc-200 mb-16 shadow-xl overflow-hidden">
            {/* Soft Pastel Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>

            <div className="relative z-10">
              <h3 className={`text-center font-display text-3xl font-bold text-zinc-900 mb-12 ${isVernacular ? 'leading-[1.4]' : ''}`}>
                {t('am.cert_title')} <span className="text-blue-600">{t('am.cert_accent')}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <CredentialCard 
                    key={i} 
                    title={cert.title} 
                    image={cert.image} 
                    index={i}
                    hoverText={t('am.cert_hover')}
                    verifiedText={t('am.cert_verified')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The Final Push: Job Interview Mastery */}
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-zinc-900"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>

            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className={`font-bold text-blue-400 uppercase ${isVernacular ? 'text-[11px] tracking-wide' : 'text-xs tracking-widest'}`}>{t('am.mastery_badge')}</span>
              </div>

              {/* Title */}
              <h2 className={`font-display font-black text-5xl md:text-8xl tracking-tighter mb-8 text-white drop-shadow-2xl ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
                {t('am.mastery_title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500">
                  {t('am.mastery_accent')}
                </span>
              </h2>

              {/* Content Box */}
              <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-10">
                <p className={`text-xl text-zinc-200 font-light mb-8 ${isVernacular ? 'leading-[1.9] font-medium' : 'leading-relaxed'}`}>
                  {t('am.mastery_desc')}
                </p>

                {/* Features pills */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900/50 border border-white/10 shadow-lg">
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-400"><Icons.Bot className="w-5 h-5" /></div>
                    <span className={`font-bold text-white ${isVernacular ? 'text-sm leading-[1.6] font-extrabold' : ''}`}>{t('am.ai_practice')}</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900/50 border border-white/10 shadow-lg">
                    <div className="p-2 bg-purple-500/20 rounded-full text-purple-400"><Icons.UserCheck className="w-5 h-5" /></div>
                    <span className={`font-bold text-white ${isVernacular ? 'text-sm leading-[1.6] font-extrabold' : ''}`}>{t('am.mock_interviews')}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/admissions"
                className={`group relative px-12 py-6 bg-white text-zinc-900 rounded-full font-black text-xl tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden ${isVernacular ? 'leading-[1.5]' : ''}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('am.mastery_btn')} <Icons.ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              {/* Career Paths Subtext */}
              <p className={`mt-8 text-sm text-zinc-400 uppercase font-medium ${isVernacular ? 'tracking-wide leading-[1.8]' : 'tracking-widest'}`}>
                {t('am.career_paths')}
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* SEO CONTENT MODULE - Read More Accordion */}
      <AirportManagementSEOContent />

      {/* FAQ Section */}
      <FAQSection 
        title={t('am.faq_title')}
        color="blue"
        schemaId="airport-management-page-faq"
        data={[
          { q: t('am.faq_q1'), a: t('am.faq_a1') },
          { q: t('am.faq_q2'), a: t('am.faq_a2') },
          { q: t('am.faq_q3'), a: t('am.faq_a3') },
          { q: t('am.faq_q4'), a: t('am.faq_a4') }
        ]}
      />

    </div>
  );
}

