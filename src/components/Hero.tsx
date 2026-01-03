'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      
      {/* Abstract Floating Elements */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] border border-zinc-200 dark:border-white/5 rounded-full opacity-20 hidden lg:block animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] border border-zinc-200 dark:border-white/5 rounded-full opacity-30 hidden lg:block animate-[spin_40s_linear_infinite_reverse]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-6xl">
          
          <div className="flex flex-col lg:flex-row gap-4">
          
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel mb-8 animate-fade-in-up border-indigo-500/20 bg-indigo-500/5 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wide">{t('hero.badge')}</span>
            </div>

            {/* Language Toggle */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>

          </div>

          {/* Massive Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tighter mb-6 drop-shadow-lg">
            {t('hero.title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600 relative z-10 italic">
              {t('hero.title_2')}
            </span>
          </h1>

          <p className="font-sans text-2xl md:text-3xl text-zinc-900 dark:text-white leading-relaxed mb-10 max-w-2xl backdrop-blur-sm border-l-4 border-indigo-500 pl-6 font-medium">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
            <Link 
              href="/virtual-tour" 
              className="group relative w-full sm:w-auto px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-xl overflow-hidden shadow-lg hover:shadow-indigo-500/25 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
              <span className="relative flex items-center justify-center gap-3">{t('hero.cta_explore')} <Icons.ArrowRight className="w-6 h-6" /></span>
            </Link>
            <Link 
              href="/air-hostess-training" 
              className="w-full sm:w-auto px-10 py-6 glass-panel rounded-full font-bold text-xl text-zinc-900 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center border-zinc-200 dark:border-white/10"
            >
              {t('hero.cta_teach')}
            </Link>
          </div>

          {/* --- NEURAL STATS HUB --- */}
          <div className="relative group max-w-6xl w-full perspective-[2000px]">
            
            {/* Spectral Aura */}
            <div className="absolute -inset-10 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-orange-500/10 rounded-[60px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                
                {/* Stat 1 */}
                <div className="group/stat relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-[40px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/50 dark:hover:bg-zinc-900/60 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                   <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover/stat:scale-110 transition-transform">
                        <Icons.History className="w-6 h-6" />
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white tracking-tightest">17</span>
                        <span className="text-2xl md:text-4xl font-bold text-indigo-500">+</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] lg:text-[16px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 leading-tight">
                         {t('stat.trust')}
                      </p>
                   </div>
                </div>

                {/* Stat 2 */}
                <div className="group/stat relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-[40px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/50 dark:hover:bg-zinc-900/60 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                   <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover/stat:scale-110 transition-transform">
                        <Icons.UserCheck className="w-6 h-6" />
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white tracking-tightest">100</span>
                        <span className="text-2xl md:text-4xl font-bold text-blue-500">%</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] lg:text-[16px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 leading-tight">
                         {t('stat.job')}
                      </p>
                   </div>
                </div>

                {/* Stat 3 */}
                <div className="group/stat relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-[40px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/50 dark:hover:bg-zinc-900/60 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                   <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover/stat:scale-110 transition-transform">
                        <Icons.Award className="w-6 h-6" />
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white tracking-tightest">No</span>
                        <span className="text-2xl md:text-4xl font-bold text-orange-500">.1</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] lg:text-[16px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 leading-tight">
                         {t('stat.infra')}
                      </p>
                   </div>
                </div>

                {/* Stat 4 */}
                <div className="group/stat relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-[40px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/50 dark:hover:bg-zinc-900/60 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                   <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover/stat:scale-110 transition-transform">
                        <Icons.Users className="w-6 h-6" />
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white tracking-tightest">5</span>
                        <span className="text-2xl md:text-4xl font-bold text-purple-500">k+</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] lg:text-[16px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 leading-tight">
                         {t('stat.placed')}
                      </p>
                   </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
