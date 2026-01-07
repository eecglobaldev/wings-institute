'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { AIShowcase } from '@/components/AIShowcase';
import { AdvantageGrid } from '@/components/AdvantageGrid';
import { ComparisonChart } from '@/components/ComparisonChart';
import { FAQSection } from '@/components/FAQSection';
import { HomepageSEOContent } from '@/components/HomepageSEOContent';
import { SlideUpCard } from '@/components/SlideUpCard';
import { Icons } from '@/components/Icons';
import { useLanguage } from '@/contexts/LanguageContext';

interface HomePageProps {
  initialLang: 'en' | 'hi' | 'gu';
}

export default function HomePage({ initialLang }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* 1. HERO SECTION */}
      <Hero />
      
      {/* 2. INFRASTRUCTURE */}
      <div id="infrastructure" className="scroll-mt-20">
         <AdvantageGrid />
      </div>

      {/* SECTION: Safety & Grooming */}
      <section className="py-24 lg:py-32 px-6 relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-4xl mx-auto">
               <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400 mb-8 shadow-sm">
                  <Icons.ShieldCheck className="w-4 h-4" /> {t('groom.badge')}
               </div>
               <h2 className="font-display text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 leading-[1.2] tracking-tighter">
                  {t('groom.title')} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 italic pr-2">{t('groom.title_accent')}</span>
               </h2>
               <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-[1.9] font-semibold">
                  {t('groom.subtitle')}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 ">
               {/* Card 1: AVSEC */}
               <SlideUpCard 
                  title={t('groom.card1_title')}
                  subtitle={t('groom.card1_subtitle')}
                  icon={Icons.ShieldAlert}
                  colorClass="bg-[#0f172a]" 
                  iconColorClass="bg-blue-50 text-blue-600"
                  isWhite={true}
                  desc={t('groom.card1_desc')}
                  tapLabel={t('groom.tap_reveal')}
                  certLabel={t('groom.cert_included')}
               />

               {/* Card 2: POSH */}
               <SlideUpCard 
                  title={t('groom.card2_title')}
                  subtitle={t('groom.card2_subtitle')}
                  icon={Icons.ShieldCheck}
                  colorClass="bg-gradient-to-br from-[#4c1d95] to-[#581c87]" 
                  iconColorClass="bg-purple-50 text-purple-600"
                  desc={t('groom.card2_desc')}
                  tapLabel={t('groom.tap_reveal')}
                  certLabel={t('groom.cert_included')}
               />

               {/* Card 3: First Aid */}
               <SlideUpCard 
                  title={t('groom.card3_title')}
                  subtitle={t('groom.card3_subtitle')}
                  icon={Icons.Heart}
                  colorClass="bg-[#991b1b]" 
                  iconColorClass="bg-red-50 text-red-600"
                  desc={t('groom.card3_desc')}
                  tapLabel={t('groom.tap_reveal')}
                  certLabel={t('groom.cert_included')}
               />

               {/* Card 4: DCS */}
               <SlideUpCard 
                  title={t('groom.card4_title')}
                  subtitle={t('groom.card4_subtitle')}
                  icon={Icons.MonitorPlay}
                  colorClass="bg-gradient-to-br from-[#0f766e] to-[#115e59]"
                  iconColorClass="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                  desc={t('groom.card4_desc')}
                  tapLabel={t('groom.tap_reveal')}
                  certLabel={t('groom.cert_included')}
               />
            </div>
         </div>
      </section>
      
      {/* 3. AI TECHNOLOGY */}
      <AIShowcase />

      {/* 4. COMPARISON */}
      <ComparisonChart />

      {/* 5. ROI SECTION */}
      <section className="py-20 lg:py-32 px-6 relative z-20">
         <div className="max-w-6xl mx-auto p-10 md:p-16 rounded-[4rem] border border-emerald-500/30 bg-gradient-to-br from-white to-emerald-50 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
               <div>
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase tracking-wide mb-6 border border-emerald-500/20 shadow-sm leading-none">
                     <Icons.Banknote className="w-5 h-5 shrink-0" /> <span className="leading-[1.5]">{t('adv_roi.badge')}</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-[1.2]">
                     {t('adv_roi.title')} <br/> {t('adv_roi.title_accent')}
                  </h2>
                  <p className="text-2xl text-zinc-900 dark:text-white mb-10 leading-[1.8] font-semibold">
                     {t('adv_roi.subtitle')}
                  </p>
                  <Link 
                     href="/roi-calculator"
                     className="px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xl shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-4 group uppercase tracking-tight leading-[1.4]"
                  >
                     <span className="leading-[1.4]">{t('adv_roi.btn')}</span> <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
               </div>
               
               <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="glass-panel p-8 md:p-12 rounded-[3rem] bg-white/90 dark:bg-black/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl">
                     <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center text-white shadow-2xl">
                           <Icons.TrendingUp className="w-9 h-9" />
                        </div>
                        <div>
                           <div className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">{t('adv_roi.projected')}</div>
                           <div className="text-3xl font-black text-zinc-900 dark:text-white">{t('adv_roi.returns')}</div>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div>
                           <div className="flex justify-between text-sm font-black mb-3">
                              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">{t('adv_roi.year1')}</span>
                              <span className="text-emerald-500">₹4.8 Lakhs</span>
                           </div>
                           <div className="w-full h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full w-[25%] bg-emerald-500 rounded-full shadow-lg"></div>
                           </div>
                        </div>
                        <div>
                           <div className="flex justify-between text-sm font-black mb-3">
                              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">{t('adv_roi.year3')}</span>
                              <span className="text-emerald-500">₹10 Lakhs</span>
                           </div>
                           <div className="w-full h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full w-[55%] bg-emerald-500 rounded-full shadow-lg"></div>
                           </div>
                        </div>
                        <div>
                           <div className="flex justify-between text-sm font-black mb-3">
                              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">{t('adv_roi.year5')}</span>
                              <span className="text-emerald-500 font-bold">₹18 Lakhs+</span>
                           </div>
                           <div className="w-full h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full w-[85%] bg-emerald-500 rounded-full shadow-lg"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. FAQ */}
      <FAQSection 
        title={t('faq.title')} 
        color="zinc" 
        data={[
          { q: t('faq.q1'), a: t('faq.a1') }, 
          { q: t('faq.q2'), a: t('faq.a2') }, 
          { q: t('faq.q3'), a: t('faq.a3') }
        ]} 
      />

      {/* 6.5 SEO CONTENT MODULE - Above Footer */}
      <HomepageSEOContent />
      
      {/* 7. FINAL CTA */}
      <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] -z-10"></div>
         
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-zinc-900 dark:text-white mb-8 tracking-tighter leading-[1.1]">
               {t('cta.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">{t('cta.title_accent')}</span>
            </h2>
            <p className="text-2xl md:text-3xl text-zinc-900 dark:text-white mb-10 max-w-3xl mx-auto font-bold leading-[1.7]">
               {t('cta.subtitle')}
            </p>
            <div className="mb-12">
               <span className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 font-black text-base uppercase tracking-wide border border-green-200 dark:border-green-500/30 shadow-sm leading-none">
                  <Icons.CheckCircle2 className="w-5 h-5 shrink-0" /> <span className="leading-[1.5]">{t('cta.placement')}</span>
               </span>
            </div>
            
            <Link 
               href="/admissions" 
               className="group relative inline-flex px-16 py-7 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden uppercase tracking-tight leading-[1.4]"
            >
               <span className="relative z-10 leading-[1.4]">{t('cta.btn')}</span>
               <div className="absolute inset-0 bg-white/20 dark:bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
         </div>
      </section>
    </>
  );
}

