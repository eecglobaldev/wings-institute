'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import { AboutSEOContent } from '@/components/AboutSEOContent';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutPageClient() {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[1000px] h-[600px] bg-zinc-100 dark:bg-zinc-900 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-wings-red/5 rounded-full blur-[120px] opacity-40"></div>
      </div>

      {/* Hero Section: The Authority Statement */}
      <section className="relative px-6 mb-24">
        <div className="max-w-7xl mx-auto text-center md:text-left">

          <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wings-red/10 border border-wings-red/20 text-wings-red text-xs uppercase tracking-widest animate-fade-in-up ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
              <Icons.History className="w-4 h-4" /> {t('about.badge')}
            </div>

            {/* Language Toggle */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 mb-6 animate-fade-in-up lg:mb-0">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>

          <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.95]'}`}>
            {t('about.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600 italic">{t('about.title_accent')}</span>
          </h1>
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl backdrop-blur-sm animate-fade-in-up [animation-delay:400ms] ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* THE LEADERSHIP SECTION */}
      <section className="px-6 mb-32 animate-fade-in-up [animation-delay:600ms]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-zinc-200 dark:border-white/10 pb-8">
            <div>
              <h2 className={`font-display text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.2]' : ''}`}>{t('about.visionaries')}</h2>
              <p className={`text-zinc-500 ${isVernacular ? 'font-semibold leading-[1.6]' : ''}`}>{t('about.architects')}</p>
            </div>
            <div className={`hidden md:flex items-center gap-2 text-wings-red ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
              <Icons.Award className="w-5 h-5" /> {t('about.decades')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            
            {/* Founder 1: Ms. Mili Mehta */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-wings-red/20 to-orange-500/20 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="relative glass-panel p-8 md:p-12 rounded-[40px] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl h-full flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 rounded-full bg-wings-red/10 flex items-center justify-center text-wings-red border border-wings-red/20 overflow-hidden">
                    <Image 
                      src="/images/founders/mili-mehta.jpeg" 
                      alt="Mili Mehta - Founder and Managing Director of Wings Institute Vadodara" 
                      width={80} 
                      height={80} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-4 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-xs uppercase tracking-wider text-zinc-500 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                      {t('about.since_1997')}
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/mili-mehta-99969880/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                      title="Ms. Mili Mehta on LinkedIn"
                    >
                      <Icons.Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                    </a>
                  </div>
                </div>

                <h3 className={`text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                  {t('about.founder1')}
                </h3>
                <p className={`text-wings-red uppercase tracking-widest text-xs mb-6 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                  {t('about.founder1_role')}
                </p>

                <p className={`text-lg text-zinc-600 dark:text-zinc-300 mb-8 flex-grow ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                  {t('about.founder1_quote')} <br/><br/>
                  {t('about.founder1_desc').split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-zinc-900 dark:text-white">{part}</strong> : part
                  )}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_mentorship')}</span>
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_counseling')}</span>
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_women')}</span>
                </div>
              </div>
            </div>

            {/* Founder 2: Mr. Amit Jalan */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="relative glass-panel p-8 md:p-12 rounded-[40px] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl h-full flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20 overflow-hidden">
                    <Image 
                      src="/images/founders/amit-jalan.jpeg" 
                      alt="Amit Jalan - CEO and Director of Wings Institute Aviation and Hospitality Training" 
                      width={80} 
                      height={80} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-4 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-xs uppercase tracking-wider text-zinc-500 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                      {t('about.global_expert')}
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/amitjalan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                      title="Mr. Amit Jalan on LinkedIn"
                    >
                      <Icons.Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                    </a>
                  </div>
                </div>

                <h3 className={`text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                  {t('about.founder2')}
                </h3>
                <p className={`text-blue-600 uppercase tracking-widest text-xs mb-6 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                  {t('about.founder2_role')}
                </p>

                <p className={`text-lg text-zinc-600 dark:text-zinc-300 mb-8 flex-grow ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                  {t('about.founder2_quote')} <br/><br/>
                  {t('about.founder2_desc').split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-zinc-900 dark:text-white">{part}</strong> : part
                  )}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_strategy')}</span>
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_operations')}</span>
                  <span className={`px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.skill_relations')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* PARENT COMPANY CARD - POWERED BY EEC */}
          <div className="glass-panel p-8 md:p-12 lg:p-20 rounded-[3rem] md:rounded-[4rem] border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/50 backdrop-blur-3xl relative overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] mt-20">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
              
              <div className="flex-1">
                <div className="flex flex-row items-center justify-center lg:justify-start gap-6 md:gap-10 mb-12">
                  <Image 
                    src="/images/eec-logo-dark.png" 
                    alt="EEC Logo" 
                    width={128}
                    height={128}
                    className="h-20 md:h-28 lg:h-32 w-auto object-contain dark:brightness-0 dark:invert transition-all hover:scale-105 duration-500" 
                  />
                  <div className="w-px h-12 md:h-16 bg-zinc-200 dark:bg-white/10"></div>
                  <span className={`text-[12px] md:text-sm font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap ${isVernacular ? 'tracking-[0.2em]' : ''}`}>{t('about.group_authority')}</span>
                </div>
                
                <div className="text-center lg:text-left">
                  <h3 className={`text-5xl md:text-6xl lg:text-7xl font-display font-black text-zinc-900 dark:text-white mb-8 tracking-tightest ${isVernacular ? 'leading-[1.2]' : ''}`}>
                    {t('about.powered_by')} <span className="text-zinc-400 dark:text-zinc-700">{t('about.eec')}</span>
                  </h3>
                  
                  <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                    {t('about.eec_desc').split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-zinc-900 dark:text-white">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12 lg:gap-20 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-white/10 pt-12 lg:pt-0 lg:pl-20 shrink-0">
                <div className="text-center lg:text-left">
                  <div className="flex items-start justify-center lg:justify-start">
                    <span className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tightest">27</span>
                    <span className="text-wings-red text-4xl font-bold mt-2">+</span>
                  </div>
                  <div className={`text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2 ${isVernacular ? 'tracking-[0.1em]' : ''}`}>{t('about.years_legacy')}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-start justify-center lg:justify-start">
                    <span className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tightest">20k</span>
                    <span className="text-wings-red text-4xl font-bold mt-2">+</span>
                  </div>
                  <div className={`text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2 ${isVernacular ? 'tracking-[0.1em]' : ''}`}>{t('about.careers_built')}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <span className={`text-wings-red text-xs tracking-wider uppercase mb-3 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.milestones')}</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.3]' : ''}`}>
              {t('about.history')}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-white/10 -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200 dark:bg-white/10 md:hidden"></div>

            <div className="space-y-12 md:space-y-24">
              
              {/* Item 1: 1997 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-[45%] mb-8 md:mb-0 order-2 md:order-1 pl-12 md:pl-0">
                  <div className="glass-panel p-8 rounded-3xl border-2 border-zinc-900 dark:border-white bg-white dark:bg-black relative group hover:-translate-y-1 transition-transform duration-300">
                    <h3 className={`font-display text-xl font-bold text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('about.timeline_1997_title')}</h3>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                      {t('about.timeline_1997_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-10 order-1 md:order-2">
                  <div className="bg-black text-white text-sm font-bold px-4 py-2 rounded-full border-4 border-zinc-100 dark:border-zinc-900 shadow-lg">1997</div>
                </div>
                <div className="w-full md:w-[45%] order-3"></div>
              </div>

              {/* Item 2: 2008 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-[45%] order-3 md:order-1"></div>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-10 order-1 md:order-2">
                  <div className="bg-wings-red text-white text-sm font-bold px-4 py-2 rounded-full border-4 border-zinc-100 dark:border-zinc-900 shadow-lg">2008</div>
                </div>
                <div className="w-full md:w-[45%] mb-8 md:mb-0 order-2 md:order-3 pl-12 md:pl-0">
                  <div className="glass-panel p-8 rounded-3xl border-2 border-wings-red bg-white dark:bg-zinc-900 relative group hover:-translate-y-1 transition-transform duration-300 shadow-[0_10px_40px_-10px_rgba(255,59,48,0.2)]">
                    <h3 className={`font-display text-xl font-bold text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('about.timeline_2008_title')}</h3>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                      {t('about.timeline_2008_desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3: 2018 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-[45%] mb-8 md:mb-0 order-2 md:order-1 pl-12 md:pl-0">
                  <div className="glass-panel p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 relative group hover:-translate-y-1 transition-transform duration-300">
                    <h3 className={`font-display text-xl font-bold text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('about.timeline_2018_title')}</h3>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                      {t('about.timeline_2018_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-10 order-1 md:order-2">
                  <div className="bg-zinc-200 text-zinc-900 text-sm font-bold px-4 py-2 rounded-full border-4 border-white dark:border-zinc-800 shadow-sm">2018</div>
                </div>
                <div className="w-full md:w-[45%] order-3"></div>
              </div>

              {/* Item 4: Today */}
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-[45%] order-3 md:order-1"></div>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-10 order-1 md:order-2">
                  <div className={`bg-blue-600 text-white text-sm px-4 py-2 rounded-full border-4 border-zinc-100 dark:border-zinc-900 shadow-lg ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('about.timeline_today')}</div>
                </div>
                <div className="w-full md:w-[45%] mb-8 md:mb-0 order-2 md:order-3 pl-12 md:pl-0">
                  <div className="glass-panel p-8 rounded-3xl border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 relative group hover:-translate-y-1 transition-transform duration-500 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)]">
                    <h3 className={`font-display text-xl font-bold text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('about.timeline_today_title')}</h3>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${isVernacular ? 'leading-[1.8] font-medium' : 'leading-relaxed'}`}>
                      {t('about.timeline_today_desc').split('**').map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="font-bold text-zinc-800 dark:text-zinc-200">{part}</span> : part
                      )}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className={`font-display text-3xl font-bold text-center text-zinc-900 dark:text-white mb-16 ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('about.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel text-center p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 shadow-glass">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-wings-red mb-6 shadow-sm border border-zinc-100 dark:border-white/5">
                <Icons.Heart className="w-6 h-6" />
              </div>
              <h3 className={`text-lg mb-2 text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('about.val1')}</h3>
              <p className={`text-zinc-500 text-sm ${isVernacular ? 'leading-[1.7] font-medium' : ''}`}>{t('about.val1_desc')}</p>
            </div>
            <div className="glass-panel text-center p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 shadow-glass">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-wings-red mb-6 shadow-sm border border-zinc-100 dark:border-white/5">
                <Icons.CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className={`text-lg mb-2 text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('about.val2')}</h3>
              <p className={`text-zinc-500 text-sm ${isVernacular ? 'leading-[1.7] font-medium' : ''}`}>{t('about.val2_desc')}</p>
            </div>
            <div className="glass-panel text-center p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 shadow-glass">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-wings-red mb-6 shadow-sm border border-zinc-100 dark:border-white/5">
                <Icons.Zap className="w-6 h-6" />
              </div>
              <h3 className={`text-lg mb-2 text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{t('about.val3')}</h3>
              <p className={`text-zinc-500 text-sm ${isVernacular ? 'leading-[1.7] font-medium' : ''}`}>{t('about.val3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-32 relative z-30">
        <div className="max-w-4xl mx-auto glass-panel p-10 md:p-14 lg:p-20 rounded-[3rem] text-center border border-wings-red/20 bg-wings-red/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-wings-red/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <h2 className={`font-display text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter ${isVernacular ? 'leading-[1.2]' : ''}`}>
            {t('about.cta_title')}
          </h2>
          <p className={`text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto font-medium ${isVernacular ? 'leading-[1.8]' : ''}`}>
            {t('about.cta_desc')}
          </p>
          <Link 
            href="/admissions"
            className={`group relative px-10 md:px-14 py-5 md:py-6 bg-wings-red text-white rounded-full font-black text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-glow inline-flex items-center justify-center gap-4 uppercase active:scale-95 ${isVernacular ? 'tracking-normal' : 'tracking-tighter'}`}
          >
            {t('about.cta_btn')} <Icons.ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* SEO Content Module */}
      <AboutSEOContent />

    </div>
  );
}

