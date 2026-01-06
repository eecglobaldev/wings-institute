'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { FAQSection } from '@/components/FAQSection';
import { CredentialCard } from '@/components/CredentialCard';
import { PowerModuleCard } from '@/components/PowerModuleCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { AirHostessSEOContent } from '@/components/AirHostessSEOContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface AirHostessPageClientProps {
   initialLang: 'en' | 'hi' | 'gu';
}

export default function AirHostessPageClient({ initialLang }: AirHostessPageClientProps) {
   const { t, language } = useLanguage();

   const certificates = [
      { titleKey: "ah.cert1", image: "/images/air-hostess-course-page/air-hostess-certificate.jpg" },
      { titleKey: "ah.cert2", image: "/images/air-hostess-course-page/spoken-english-certificate.jpg" },
      { titleKey: "ah.cert3", image: "/images/air-hostess-course-page/avsec-certificate.jpg" },
      { titleKey: "ah.cert4", image: "/images/air-hostess-course-page/first-aid-certificate.png" },
      { titleKey: "ah.cert5", image: "/images/air-hostess-course-page/posh-certificate.png" },
      { titleKey: "ah.cert6", image: "/images/air-hostess-course-page/crs-certificate.png" },
      { titleKey: "ah.cert7", image: "/images/air-hostess-course-page/hotel-internship-certificate.jpg" }
   ];

   const isVernacular = language === 'hi' || language === 'gu';

   return (
      <div className="min-h-screen pt-3 pb-20 relative z-10">

         {/* Background Ambience */}
         <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>

         {/* 1. HERO SECTION */}
         <section className="px-6 mb-16 lg:mb-20 relative">
            <div className="max-w-7xl mx-auto">

               <div className="flex flex-col lg:flex-row gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border-wings-red/30 mb-2 lg:mb-8 animate-fade-in-up bg-white/60 dark:bg-black/40 backdrop-blur-md leading-none">
                     <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wings-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-wings-red"></span>
                     </span>
                     <span className="text-[11px] font-bold text-wings-red uppercase tracking-wide leading-[1.5]">{t('ah.badge')}</span>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
                     <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        {t('hero.translate') || 'Translate'}
                     </label>
                     <LanguageToggle isHomepage={true} />
                  </div>
               </div>

               <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tighter mb-6 animate-fade-in-up [animation-delay:200ms]">
                  {t('ah.title')}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red via-orange-500 to-red-600 italic pr-2">
                     {t('ah.title_accent')}
                  </span>
               </h1>

               <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl leading-[1.8] font-medium mb-10 animate-fade-in-up [animation-delay:400ms] border-l-4 border-wings-red pl-6">
                  {t('ah.subtitle')}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:600ms]">
                  <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-wings-red">
                     <div className="p-3 bg-wings-red/10 rounded-xl text-wings-red shrink-0"><Icons.Clock className="w-6 h-6" /></div>
                     <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 leading-[1.5]">{t('ah.duration_label')}</div>
                        <div className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.4]">{t('ah.duration_value')}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-[1.6]">{t('ah.duration_sub')}</div>
                     </div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-wings-red">
                     <div className="p-3 bg-wings-red/10 rounded-xl text-wings-red shrink-0"><Icons.BookOpen className="w-6 h-6" /></div>
                     <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 leading-[1.5]">{t('ah.curriculum_label')}</div>
                        <div className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.4]">{t('ah.curriculum_value')}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-[1.6]">{t('ah.curriculum_sub')}</div>
                     </div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-wings-red">
                     <div className="p-3 bg-wings-red/10 rounded-xl text-wings-red shrink-0"><Icons.Briefcase className="w-6 h-6" /></div>
                     <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 leading-[1.5]">{t('ah.career_label')}</div>
                        <div className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.4]">{t('ah.career_value')}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-[1.6]">{t('ah.career_sub')}</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 2. THE 5 PILLARS (POWER MODULES) */}
         <section className="px-6 mb-16 lg:mb-24 bg-zinc-50/50 dark:bg-white/5 py-16 lg:py-20 rounded-[3rem]">
            <div className="max-w-7xl mx-auto">

               <div className="text-center mb-14">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border-purple-500/30 mb-6 shadow-sm leading-none">
                     <Icons.Zap className="w-4 h-4 text-purple-500 shrink-0" />
                     <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide leading-[1.5]">{t('ah.5in1_badge')}</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4 leading-[1.2]">
                     {t('ah.5in1_title')} <span className="text-wings-red">{t('ah.5in1_accent')}</span><br />
                     {t('ah.5in1_title2')}
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-[1.8] font-medium">
                     {t('ah.5in1_subtitle')}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 perspective-container">

                  <PowerModuleCard
                     index={1}
                     title={t('ah.mod1_title')}
                     roleTitle={t('ah.mod1_role')}
                     icon={Icons.Plane}
                     color="red"
                     desc={t('ah.mod1_desc')}
                     tapLabel={t('ah.mod_tap')}
                     curriculumLabel={t('ah.mod_curriculum')}
                     includedLabel={t('ah.mod_included')}
                  />

                  <PowerModuleCard
                     index={2}
                     title={t('ah.mod2_title')}
                     roleTitle={t('ah.mod2_role')}
                     icon={Icons.Luggage}
                     color="blue"
                     desc={t('ah.mod2_desc')}
                     tapLabel={t('ah.mod_tap')}
                     curriculumLabel={t('ah.mod_curriculum')}
                     includedLabel={t('ah.mod_included')}
                  />

                  <PowerModuleCard
                     index={3}
                     title={t('ah.mod3_title')}
                     roleTitle={t('ah.mod3_role')}
                     icon={Icons.ConciergeBell}
                     color="amber"
                     desc={t('ah.mod3_desc')}
                     tapLabel={t('ah.mod_tap')}
                     curriculumLabel={t('ah.mod_curriculum')}
                     includedLabel={t('ah.mod_included')}
                  />

                  <PowerModuleCard
                     index={4}
                     title={t('ah.mod4_title')}
                     roleTitle={t('ah.mod4_role')}
                     icon={Icons.Globe}
                     color="teal"
                     desc={t('ah.mod4_desc')}
                     tapLabel={t('ah.mod_tap')}
                     curriculumLabel={t('ah.mod_curriculum')}
                     includedLabel={t('ah.mod_included')}
                  />

                  <PowerModuleCard
                     index={5}
                     title={t('ah.mod5_title')}
                     roleTitle={t('ah.mod5_role')}
                     icon={Icons.MonitorPlay}
                     color="purple"
                     desc={t('ah.mod5_desc')}
                     tapLabel={t('ah.mod_tap')}
                     curriculumLabel={t('ah.mod_curriculum')}
                     includedLabel={t('ah.mod_included')}
                  />

               </div>
            </div>
         </section>

         {/* 3. BEYOND ACADEMICS (Grooming, Spa, English) */}
         <section className="px-6 mb-16 lg:mb-24 relative z-10">
            <div className="max-w-7xl mx-auto">

               <div className="text-center mb-14">
                  <span className="text-pink-500 font-bold tracking-wide uppercase text-[11px] mb-2 block leading-[1.5]">{t('ah.holistic_badge')}</span>
                  <h2 className="font-display text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-4 leading-[1.2]">
                     {t('ah.holistic_title')}<br />
                     <span className="italic font-serif text-pink-500">{t('ah.holistic_accent')}</span>
                  </h2>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-[1.8] font-medium">
                     {t('ah.holistic_subtitle')}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

                  {/* 1. Spoken English */}
                  <div className="md:col-span-3 lg:col-span-2 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20"></div>
                     <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 text-2xl shadow-sm shrink-0">
                        <Icons.Languages className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-[1.3]">{t('ah.english_title')}</h3>
                     <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.8]">
                        {t('ah.english_desc')}
                     </p>
                  </div>

                  {/* 2. In-House Spa */}
                  <div className="md:col-span-3 lg:col-span-2 group relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2.5rem] p-8 shadow-xl shadow-pink-500/20 text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                     <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-white text-2xl border border-white/20 shrink-0">
                           <Icons.Sparkles className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 leading-[1.3]">{t('ah.spa_title')}</h3>
                        <p className="text-sm text-white/90 leading-[1.8] font-medium">
                           {t('ah.spa_desc')}
                        </p>
                     </div>
                  </div>

                  {/* 3. In-House Fitness Center */}
                  <div className="md:col-span-3 lg:col-span-2 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-green-500/20"></div>
                     <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 text-2xl shadow-sm shrink-0">
                        <Icons.Activity className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-[1.3]">{t('ah.fitness_title')}</h3>
                     <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.8]">
                        {t('ah.fitness_desc')}
                     </p>
                  </div>

                  {/* 4. Personality Development */}
                  <div className="md:col-span-3 lg:col-span-3 group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/20"></div>
                     <div className="flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 text-2xl shadow-sm shrink-0">
                           <Icons.UserCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 leading-[1.3]">{t('ah.personality_title')}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.8]">
                           {t('ah.personality_desc')}
                        </p>
                     </div>
                  </div>

                  {/* 5. Professional Make Up Stations */}
                  <div className="md:col-span-3 lg:col-span-3 group relative bg-zinc-900 dark:bg-white rounded-[2.5rem] p-8 shadow-xl border border-zinc-800 dark:border-white/10 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-all"></div>

                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6 gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/30 shrink-0">
                              <Icons.Star className="w-7 h-7" />
                           </div>
                           <span className="px-4 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-200 text-zinc-300 dark:text-zinc-500 text-[11px] font-bold uppercase tracking-wide leading-[1.5]">
                              {t('ah.makeup_badge')}
                           </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white dark:text-zinc-900 mb-4 leading-[1.3]">{t('ah.makeup_title')}</h3>
                        <p className="text-sm text-zinc-200 dark:text-zinc-600 leading-[1.8]">
                           {t('ah.makeup_desc')}
                        </p>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* 4. THE WINGS EXCLUSIVES */}
         <section className="px-6 mb-16 lg:mb-24">
            <div className="max-w-7xl mx-auto">
               <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-wings-red/20 bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden">

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                     <div>
                        <div className="inline-block px-4 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[11px] font-bold uppercase tracking-wide mb-6 leading-[1.5]">
                           {t('ah.exclusive_badge')}
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-[1.2]">
                           {t('ah.exclusive_title')} <br /> {t('ah.exclusive_accent')}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-[1.8] font-medium">
                           {t('ah.exclusive_subtitle')}
                        </p>

                        <div className="space-y-5">
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                                 <Icons.ShieldAlert className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.3]">{t('ah.avsec_title')}</h4>
                                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-[1.7]">{t('ah.avsec_desc')}</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                                 <Icons.Heart className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.3]">{t('ah.firstaid_title')}</h4>
                                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-[1.7]">{t('ah.firstaid_desc')}</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                                 <Icons.ShieldCheck className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-[1.3]">{t('ah.posh_title')}</h4>
                                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-[1.7]">{t('ah.posh_desc')}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="relative h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl">
                        <Image
                           src="/images/air-hostess-course-page/safety-training.jpg"
                           alt="Safety Training"
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                           sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                           <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                           {t('adv.card2.tag1')}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                           <div className="text-2xl font-display font-bold leading-[1.3]">{t('ah.mock_drills')}</div>
                           <p className="text-white/80 leading-[1.6]">{t('ah.mock_drills_sub')}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. PRACTICAL TRAINING INFRASTRUCTURE */}
         <section className="px-6 mb-16 lg:mb-24">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4 leading-[1.2]">
                     {t('ah.practical_title')} <span className="italic text-wings-red">{t('ah.practical_accent')}</span>
                  </h2>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-[1.8] font-medium">
                     {t('ah.practical_subtitle')}
                  </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Aircraft */}
                  <div className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-2xl">
                     <Image 
                        src="/images/air-hostess-course-page/aviation-training-academy-gujarat.jpg" 
                        alt="Wings Institute aviation training academy campus building in Alkapuri Vadodara Gujarat"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                     />
                     <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                        <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        {t('adv.card2.tag1')}
                     </div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-0 p-8 md:p-10 text-white">
                        <div className="mb-4 p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl border border-white/20"><Icons.Plane className="w-8 h-8" /></div>
                        <h3 className="text-3xl font-bold mb-2 leading-[1.3]">{t('ah.infra1_title')}</h3>
                        <p className="text-white/80 leading-[1.8]">{t('ah.infra1_desc')}</p>
                     </div>
                  </div>

                  <div className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-2xl">
                     <Image 
                        src="/images/slider-images/makeup-stations.jpg" 
                        alt="Air hostess students practicing makeup and grooming at Wings Institute professional styling lab Vadodara"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                     />
                     <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                        <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        {t('adv.card2.tag1')}
                     </div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-0 p-8 md:p-10 text-white">
                        <div className="mb-4 p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl border border-white/20"><Icons.Rose className="w-8 h-8" /></div>
                        <h3 className="text-3xl font-bold mb-2 leading-[1.3]">{t('ah.infra2_title')}</h3>
                        <p className="text-white/80 leading-[1.8]">{t('ah.infra2_desc')}</p>
                     </div>
                  </div>

                  <div className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-2xl">
                     <Image 
                        src="/images/home-page/wings-hotel-management-course.jpg" 
                        alt="Hotel management students at mock fine-dining restaurant Wings Institute Vadodara campus"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                     />
                     <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                        <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        {t('adv.card2.tag1')}
                     </div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-0 p-8 md:p-10 text-white">
                        <div className="mb-4 p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl border border-white/20"><Icons.Utensils className="w-8 h-8" /></div>
                        <h3 className="text-3xl font-bold mb-2 leading-[1.3]">{t('ah.infra3_title')}</h3>
                        <p className="text-white/80 leading-[1.8]">{t('ah.infra3_desc')}</p>
                     </div>
                  </div>

                  <div className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-2xl">
                     <Image 
                        src="/images/air-hostess-course-page/hotel-internship.jpg" 
                        alt="Wings Institute hospitality student during 5-star hotel internship practical training Gujarat"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                     />
                     <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400 z-20">
                        <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        {t('adv.card2.tag1')}
                     </div>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                     <div className="absolute bottom-0 p-8 md:p-10 text-white">
                        <div className="mb-4 p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl border border-white/20"><Icons.Building2 className="w-6 h-6" /></div>
                        <h3 className="text-3xl font-bold mb-2 leading-[1.3]">{t('ah.infra4_title')}</h3>
                        <p className="text-white/80 leading-[1.8]">{t('ah.infra4_desc')}</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. PLACEMENT SUCCESS STORIES */}
         <section className="px-6 mb-16 lg:mb-24">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <span className="text-wings-red font-bold text-[11px] tracking-wide uppercase mb-2 block leading-[1.5]">{t('ah.fame_badge')}</span>
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.2]">
                     {t('ah.fame_title')} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('ah.fame_accent')}</span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Student 1 */}
                  <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
                     <div className="aspect-[3/4] relative">
                        <Image
                           src="/images/air-hostess-course-page/anal-desai-qatar-airways.jpg"
                           alt="Anal Desai, Wings Institute cabin crew alumna serving at Qatar Airways international flights"
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                           sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                           <div className="inline-block px-3 py-1.5 rounded-lg bg-[#5C0632] text-white text-[11px] font-bold uppercase tracking-wide mb-3 border border-white/20 leading-[1.5]">
                              Qatar Airways
                           </div>
                           <h3 className="font-display font-bold text-2xl mb-1 leading-[1.3]">Anal Desai</h3>
                           <p className="text-zinc-300 text-sm leading-[1.5]">Cabin Crew</p>
                        </div>
                     </div>
                  </div>

                  {/* Student 2 */}
                  <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer mt-0 md:-mt-10">
                     <div className="aspect-[3/4] relative">
                        <Image
                           src="/images/air-hostess-course-page/nilanjana-adhikari.jpg"
                           alt="Nilanjana Adhikari, Wings Institute Vadodara graduate working as cabin crew at IndiGo Airlines"
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                           sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                           <div className="inline-block px-3 py-1.5 rounded-lg bg-[#00052B] text-white text-[11px] font-bold uppercase tracking-wide mb-3 border border-white/20 leading-[1.5]">
                              Indigo Airlines
                           </div>
                           <h3 className="font-display font-bold text-2xl mb-1 leading-[1.3]">Nilanjana Adhikari</h3>
                           <p className="text-zinc-300 text-sm leading-[1.5]">Cabin Crew</p>
                        </div>
                     </div>
                  </div>

                  {/* Student 3 */}
                  <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer">
                     <div className="aspect-[3/4] relative">
                        <Image
                           src="/images/air-hostess-course-page/snehil-raj.jpg"
                           alt="Snehil Raj, Wings Institute aviation graduate serving as cabin crew at Air Vistara"
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                           sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                           <div className="inline-block px-3 py-1.5 rounded-lg bg-[#582C83] text-white text-[11px] font-bold uppercase tracking-wide mb-3 border border-white/20 leading-[1.5]">
                              Air Vistara
                           </div>
                           <h3 className="font-display font-bold text-2xl mb-1 leading-[1.3]">Snehil Raj</h3>
                           <p className="text-zinc-300 text-sm leading-[1.5]">Cabin Crew</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="text-center mt-12">
                  <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-medium leading-[1.6]">{t('ah.fame_sub')}</p>
                  <Link
                     href="/placements"
                     className="inline-flex items-center gap-2 px-8 py-4 glass-panel rounded-full text-zinc-900 dark:text-white font-bold hover:bg-white/50 dark:hover:bg-white/10 transition-all border border-zinc-200 dark:border-white/10 leading-[1.3] bg-white/70 dark:bg-zinc-900/60"
                  >
                     {t('ah.fame_btn')} <Icons.ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
               </div>
            </div>
         </section>

         {/* 6. JOB MASTERY & CERTIFICATES */}
         <section className="px-6 mb-16 lg:mb-20">
            <div className="max-w-6xl mx-auto">

               {/* Certificates Wall */}
               <div className="relative p-8 md:p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 mb-12 shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-60"></div>
                  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-100 dark:bg-pink-900/20 rounded-full blur-[100px] opacity-60"></div>

                  <div className="relative z-10">
                     <h3 className="text-center font-display text-3xl font-bold text-zinc-900 dark:text-white mb-10 leading-[1.3]">
                        {t('ah.cert_title')} <span className="text-wings-red">{t('ah.cert_accent')}</span>
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, i) => (
                           <CredentialCard
                              key={i}
                              title={t(cert.titleKey)}
                              image={cert.image}
                              index={i}
                              hoverText={t('ah.cert_hover')}
                              verifiedText={t('ah.cert_verified')}
                           />
                        ))}
                     </div>
                  </div>
               </div>

               {/* The Final Push: Job Mastery */}
               <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#1a1a1a] to-zinc-900"></div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wings-red/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>

                  <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">

                     <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-lg leading-none">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shrink-0"></span>
                        <span className="text-[11px] font-bold text-yellow-500 uppercase tracking-wide leading-[1.5]">{t('ah.mastery_badge')}</span>
                     </div>

                     <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-2xl">
                        {t('ah.mastery_title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red via-orange-400 to-red-500">
                           {t('ah.mastery_accent')}
                        </span>
                     </h2>

                     <p className="text-xl text-zinc-200 font-medium max-w-3xl mx-auto leading-[1.8] mb-10">
                        {t('ah.mastery_subtitle')}
                     </p>

                     <Link
                        href="/admissions"
                        className="group relative px-12 py-6 bg-white text-zinc-900 rounded-full font-black text-xl tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden leading-[1.3]"
                     >
                        <span className="relative z-10 flex items-center gap-2">
                           {t('ah.mastery_btn')} <Icons.ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1 shrink-0" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </Link>
                  </div>
               </div>

            </div>
         </section>

         {/* SEO CONTENT MODULE - Read More Accordion */}
         <AirHostessSEOContent />

         {/* 7. FAQ */}
         <FAQSection
            title={t('ah.faq_title')}
            color="red"
            data={[
               { q: t('ah.faq_q1'), a: t('ah.faq_a1') },
               { q: t('ah.faq_q2'), a: t('ah.faq_a2') },
               { q: t('ah.faq_q3'), a: t('ah.faq_a3') }
            ]}
         />

      </div>
   );
}

