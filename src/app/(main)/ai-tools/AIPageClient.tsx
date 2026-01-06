'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { AIToolsSEOContent } from '@/components/AIToolsSEOContent';
import { CareerQuestSEOContent } from '@/components/CareerQuestSEOContent';
import ResumeBuilderSEOContent from '@/components/ResumeBuilderSEOContent';
import InterviewCoachSEOContent from '@/components/InterviewCoachSEOContent';
import PASimulatorSEOContent from '@/components/PASimulatorSEOContent';
import CareerNavigatorSEOContent from '@/components/CareerNavigatorSEOContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ROUTES } from '@/lib/routes';

const CyberGrid = () => (
  <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden"></div>
    <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-zinc-950 opacity-80"></div>
  </div>
);

const TechBadge = ({ children, color = "cyan" }: { children?: React.ReactNode, color?: string }) => {
  const colorClasses = {
    cyan: "text-cyan-700 dark:text-cyan-300 border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    purple: "text-purple-700 dark:text-purple-300 border-purple-500/40 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    blue: "text-blue-700 dark:text-blue-300 border-blue-500/40 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    amber: "text-amber-700 dark:text-amber-300 border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    red: "text-red-700 dark:text-indigo-400 border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    emerald: "text-emerald-700 dark:text-emerald-300 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  }[color] || "text-zinc-900 dark:text-white border-zinc-500/40 bg-zinc-500/10";

  return (
    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-sm border ${colorClasses} text-xs font-mono font-black uppercase tracking-widest backdrop-blur-md`}>
      {children}
    </div>
  );
};

const HUDCorner = ({ className }: { className?: string }) => (
  <svg className={`absolute w-5 h-5 text-zinc-900 dark:text-white/40 ${className}`} viewBox="0 0 20 20" fill="none">
    <path d="M1 1V6M1 1H6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const AIPageClient: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  return (
    <div className="min-h-screen pt-10 pb-20 relative z-10 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden selection:bg-cyan-500/30 transition-colors duration-500">
      <CyberGrid />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
         <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply dark:mix-blend-normal"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow [animation-delay:2s] mix-blend-multiply dark:mix-blend-normal"></div>
      </div>

      <section className="px-6 mb-24 lg:mb-32 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">

        <div className="flex flex-col items-center justify-center gap-4">

          <div className="flex justify-center  animate-fade-in-up">
             <TechBadge color="cyan">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping mr-2"></span>
                {t('ai.status')}
             </TechBadge>
          </div>

           {/* Language Toggle */}
           <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t('hero.translate') || 'Translate'}
            </label>
            <LanguageToggle isHomepage={true} />
          </div>
          </div>
          
          <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] drop-shadow-sm dark:drop-shadow-2xl ${isVernacular ? 'leading-[1.1]' : 'leading-[0.85]'}`}>
            {t('ai.title')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-shimmer bg-[length:200%_auto] italic pr-2">
              {t('ai.title_accent')}
            </span>
          </h1>
          
          <div className="relative max-w-4xl mx-auto mb-16 lg:mb-20 animate-fade-in-up [animation-delay:400ms]">
             <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl opacity-50"></div>
             <p className={`relative text-2xl md:text-3xl text-zinc-900 dark:text-white font-medium border-l-4 border-cyan-500/50 pl-8 text-left ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
               {t('ai.subtitle')}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in-up [animation-delay:600ms]">
             {[
               { icon: <Icons.Infinity />, label: t('ai.feat_unlimited'), desc: t('ai.feat_unlimited_desc') },
               { icon: <Icons.Clock />, label: t('ai.feat_access'), desc: t('ai.feat_access_desc') },
               { icon: <Icons.ShieldCheck />, label: t('ai.feat_private'), desc: t('ai.feat_private_desc') }
             ].map((item, idx) => (
               <div key={idx} className="group relative bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-10 rounded-sm hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md shadow-lg dark:shadow-none">
                  <HUDCorner className="top-0 left-0" />
                  <HUDCorner className="top-0 right-0 rotate-90" />
                  <HUDCorner className="bottom-0 right-0 rotate-180" />
                  <HUDCorner className="bottom-0 left-0 -rotate-90" />
                  
                  <div className="flex flex-col items-center">
                     <div className="w-16 h-16 bg-white dark:bg-white/10 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl border border-zinc-100 dark:border-white/10">
                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                     </div>
                     <h3 className={`font-mono text-lg text-zinc-900 dark:text-white uppercase mb-2 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>{item.label}</h3>
                     <p className={`text-sm text-zinc-900 dark:text-white font-mono ${isVernacular ? 'font-semibold leading-[1.6]' : 'font-medium'}`}>{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- MODULE 01: RESUME ARCHITECT --- */}
      <section className="px-6 mb-20 lg:mb-28 animate-fade-in-up [animation-delay:800ms]">
         <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-zinc-900/60 p-1.5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
               <div className="bg-zinc-50 dark:bg-black/60 rounded-[1.3rem] md:rounded-[1.8rem] lg:rounded-[2.8rem] overflow-hidden">
                  {/* Image card */}
                  <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] border-b border-zinc-200 dark:border-white/10 p-6 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                     <div className="bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-emerald-500/5"></div>
                     <div className="relative w-full max-w-md bg-zinc-900 dark:bg-zinc-950 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="w-full bg-white h-48 md:h-64 lg:h-80 rounded-lg mb-4 md:mb-6 p-4 md:p-6 relative overflow-hidden">
                           <div className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-zinc-200 rounded-full mb-4 md:mb-6"></div>
                           <div className="h-2 md:h-3 w-32 md:w-40 bg-zinc-800 rounded mb-2 md:mb-3"></div>
                           <div className="h-1.5 md:h-2 w-24 md:w-32 bg-zinc-400 rounded mb-6 md:mb-8"></div>
                           <div className="space-y-2 md:space-y-3">
                              <div className="h-1.5 md:h-2 w-full bg-zinc-200 rounded"></div>
                              <div className="h-1.5 md:h-2 w-full bg-zinc-200 rounded"></div>
                              <div className="h-1.5 md:h-2 w-3/4 bg-zinc-200 rounded"></div>
                           </div>
                           <div className="absolute inset-0 bg-emerald-500/10 h-1.5 w-full top-0 animate-scanline shadow-[0_0_25px_#10b981]"></div>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-800 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-5 border border-white/20 shadow-lg">
                           <div className="flex items-center gap-2 md:gap-3">
                              <Icons.CheckCircle2 className="w-5 h-6 text-emerald-500" />
                              <span className="text-xs md:text-sm font-mono font-black text-white tracking-widest">ATS_COMPLIANT</span>
                           </div>
                           <span className="text-xl md:text-2xl font-black font-mono text-emerald-400">98/100</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center w-full">
                     <TechBadge color="emerald">{t('ai.module_01')}</TechBadge>
                     <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold text-zinc-900 dark:text-white mt-6 md:mt-10 mb-4 md:mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                        {t('ai.resume_title')}
                     </h2>
                     <p className={`text-lg md:text-xl lg:text-2xl text-zinc-900 dark:text-white mb-6 md:mb-10 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                        {t('ai.resume_desc')}
                     </p>
                     
                     <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                        {[
                           { title: t('ai.resume_feat1_title'), desc: t('ai.resume_feat1_desc') },
                           { title: t('ai.resume_feat2_title'), desc: t('ai.resume_feat2_desc') },
                           { title: t('ai.resume_feat3_title'), desc: t('ai.resume_feat3_desc') }
                        ].map((feat, i) => (
                           <div key={i} className="flex items-start gap-4 md:gap-6">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] shrink-0"></div>
                              <div>
                                 <strong className={`text-zinc-900 dark:text-white block text-base md:text-lg font-mono uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{feat.title}</strong>
                                 <span className={`text-zinc-900 dark:text-white text-sm md:text-base lg:text-lg ${isVernacular ? 'font-semibold leading-[1.7]' : 'font-medium'}`}>{feat.desc}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <Link href={ROUTES['resume-builder']} className="group relative px-6 md:px-10 py-4 md:py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl transition-all duration-300 w-full md:w-fit overflow-hidden shadow-2xl active:scale-95 inline-flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className={`relative flex items-center justify-center md:justify-start gap-4 font-mono text-sm md:text-base uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                           {t('ai.resume_btn')} <Icons.ArrowUpRight className="w-5 h-6" />
                        </span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MODULE 02: INTERVIEW COACH --- */}
      <section className="px-6 mb-20 lg:mb-28 animate-fade-in-up [animation-delay:1000ms]">
         <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-zinc-900/60 p-1.5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
               <div className="bg-zinc-50 dark:bg-black/60 rounded-[1.3rem] md:rounded-[1.8rem] lg:rounded-[2.8rem] overflow-hidden">
                  {/* Image card */}
                  <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] border-b border-zinc-200 dark:border-white/10 p-6 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                     <div className="bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-cyan-500/5"></div>
                     <div className="relative w-full max-w-md bg-zinc-900 dark:bg-zinc-950 border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
                           <div className="flex gap-2 md:gap-3">
                              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500/40 border border-red-500"></div>
                              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500/40 border border-yellow-500"></div>
                              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500/40 border border-green-500"></div>
                           </div>
                           <span className="text-[10px] md:text-xs font-mono font-black text-zinc-500 tracking-[0.2em]">AI_COACH_STATION.v2</span>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                           <div className="flex gap-3 md:gap-4">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white border border-cyan-400 shrink-0">
                                 <Icons.Bot className="w-5 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="bg-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl rounded-tl-none border border-white/10 text-xs md:text-sm font-mono text-zinc-200 leading-relaxed">
                                    <span className="text-cyan-500 block mb-2 font-black tracking-widest text-[10px] md:text-xs">LIVE_ANALYSIS:</span>
                                    "Tell me about a time you handled a difficult passenger?"
                                 </div>
                              </div>
                           </div>
                           <div className="flex gap-3 md:gap-4 flex-row-reverse">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 flex items-center justify-center text-white border border-white/30 shrink-0">
                                 <Icons.Mic className="w-5 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="bg-cyan-500/20 p-4 md:p-5 rounded-xl md:rounded-2xl rounded-tr-none border border-cyan-500/40 text-xs md:text-sm text-cyan-50 font-mono text-right relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 bg-cyan-500/20 w-[92%]"></div>
                                    <span className="relative z-10 font-black tracking-tight">Capturing Input... [00:14]</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-white/10 flex justify-between items-center">
                           <div>
                              <div className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2 md:mb-3">CONV_CONFIDENCE</div>
                              <div className="h-2 w-24 md:w-32 bg-zinc-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-cyan-500 w-[92%] animate-pulse"></div>
                              </div>
                           </div>
                           <span className="text-2xl md:text-3xl font-black text-cyan-400 font-mono">92%</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-10 lg:p-20 flex flex-col justify-center w-full">
                     <TechBadge color="cyan">{t('ai.module_02')}</TechBadge>
                     <h2 className={`text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mt-10 mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                        {t('ai.interview_title')}
                     </h2>
                     <p className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-10 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                        {t('ai.interview_desc')}
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        {[
                           { title: t('ai.interview_feat1_title'), desc: t('ai.interview_feat1_desc') },
                           { title: t('ai.interview_feat2_title'), desc: t('ai.interview_feat2_desc') },
                           { title: t('ai.interview_feat3_title'), desc: t('ai.interview_feat3_desc') }
                        ].map((feat, i) => (
                           <div key={i} className="flex items-start gap-6">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_12px_#22d3ee] shrink-0"></div>
                              <div>
                                 <strong className={`text-zinc-900 dark:text-white block text-lg font-mono uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{feat.title}</strong>
                                 <span className={`text-zinc-900 dark:text-white text-base lg:text-lg ${isVernacular ? 'font-semibold leading-[1.7]' : 'font-medium'}`}>{feat.desc}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <Link href={ROUTES['interview-coach']} className="group relative px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl transition-all duration-300 w-fit overflow-hidden shadow-2xl active:scale-95 inline-flex items-center">
                        <div className="absolute inset-0 bg-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className={`relative flex items-center gap-4 font-mono text-base uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                           {t('ai.interview_btn')} <Icons.ArrowUpRight className="w-6 h-6" />
                        </span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MODULE 03: PA SIMULATOR --- */}
      <section className="px-6 mb-20 lg:mb-28 animate-fade-in-up [animation-delay:1200ms]">
         <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-zinc-900/60 p-1.5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
               <div className="bg-zinc-50 dark:bg-black/60 rounded-[2.8rem] overflow-hidden">
                  {/* Image card */}
                  <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] border-b border-zinc-200 dark:border-white/10 p-6 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                     <div className="bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-purple-500/5"></div>
                     <div className="relative w-full max-w-md bg-zinc-900 dark:bg-zinc-950 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 flex flex-col items-center transform group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex gap-1.5 md:gap-2 h-16 md:h-20 items-center mb-6 md:mb-10 w-full justify-center">
                           {[40, 60, 30, 80, 50, 90, 40, 60, 70, 30, 50, 80, 40, 60, 30].map((h, i) => (
                              <div key={i} style={{height: `${h}%`, animationDelay: `${i*0.1}s`}} className="w-2 md:w-2.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                           ))}
                        </div>
                        <div className="w-full space-y-4 md:space-y-6">
                           <div className="flex justify-between items-center text-sm md:text-base font-mono border-b border-white/10 pb-2 md:pb-3">
                              <span className="text-zinc-500 font-bold text-xs md:text-sm">RATE_OF_SPEECH</span>
                              <span className="text-purple-400 font-black text-xs md:text-sm lg:text-base">145 WPM [OPTIMAL]</span>
                           </div>
                           <div className="flex justify-between items-center text-sm md:text-base font-mono border-b border-white/10 pb-2 md:pb-3">
                              <span className="text-zinc-500 font-bold text-xs md:text-sm">CLARITY_INDEX</span>
                              <span className="text-green-400 font-black text-xs md:text-sm lg:text-base">98.5%</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-10 lg:p-20 flex flex-col justify-center w-full">
                     <TechBadge color="purple">{t('ai.module_03')}</TechBadge>
                     <h2 className={`text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mt-10 mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                        {t('ai.voice_title')}
                     </h2>
                     <p className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-10 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                        {t('ai.voice_desc')}
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        {[
                           { title: t('ai.voice_feat1_title'), desc: t('ai.voice_feat1_desc') },
                           { title: t('ai.voice_feat2_title'), desc: t('ai.voice_feat2_desc') },
                           { title: t('ai.voice_feat3_title'), desc: t('ai.voice_feat3_desc') }
                        ].map((feat, i) => (
                           <div key={i} className="flex items-start gap-6">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7] shrink-0"></div>
                              <div>
                                 <strong className={`text-zinc-900 dark:text-white block text-lg font-mono uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{feat.title}</strong>
                                 <span className={`text-zinc-900 dark:text-white text-base lg:text-lg ${isVernacular ? 'font-semibold leading-[1.7]' : 'font-medium'}`}>{feat.desc}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <Link href={ROUTES['pa-simulator']} className="group relative px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl transition-all duration-300 w-fit overflow-hidden shadow-2xl active:scale-95 inline-flex items-center">
                        <div className="absolute inset-0 bg-purple-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className={`relative flex items-center gap-4 font-mono text-base uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                           {t('ai.voice_btn')} <Icons.ArrowUpRight className="w-6 h-6" />
                        </span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MODULE 04: CAREER NAVIGATOR --- */}
      <section className="px-6 mb-20 lg:mb-28 animate-fade-in-up [animation-delay:1400ms]">
         <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-zinc-900/60 p-1.5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
               <div className="bg-zinc-50 dark:bg-black/60 rounded-[2.8rem] overflow-hidden">
                  {/* Image card */}
                  <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] border-b border-zinc-200 dark:border-white/10 p-6 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                     <div className="bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-blue-500/5"></div>
                     <div className="relative w-full max-w-md bg-zinc-900 dark:bg-zinc-950 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 transform group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex justify-center mb-6 md:mb-10">
                           <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative shadow-2xl">
                              <Icons.ScanFace className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-blue-500" />
                              <div className="absolute inset-0 border-t-4 border-blue-400 rounded-full animate-spin"></div>
                           </div>
                        </div>
                        <div className="space-y-4 md:space-y-6 font-mono text-xs md:text-sm">
                           <div>
                              <div className="flex justify-between text-zinc-500 font-black mb-2 tracking-widest text-[10px] md:text-xs lg:text-sm">
                                 <span>LEADERSHIP_TRAIT</span>
                                 <span className="text-blue-400">HIGH</span>
                              </div>
                              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                 <div className="h-full w-[85%] bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-10 lg:p-20 flex flex-col justify-center w-full">
                     <TechBadge color="blue">{t('ai.module_04')}</TechBadge>
                     <h2 className={`text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mt-10 mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                        {t('ai.nav_title')}
                     </h2>
                     <p className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-10 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                        {t('ai.nav_desc')}
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        {[
                           { title: t('ai.nav_feat1_title'), desc: t('ai.nav_feat1_desc') },
                           { title: t('ai.nav_feat2_title'), desc: t('ai.nav_feat2_desc') },
                           { title: t('ai.nav_feat3_title'), desc: t('ai.nav_feat3_desc') }
                        ].map((feat, i) => (
                           <div key={i} className="flex items-start gap-6">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] shrink-0"></div>
                              <div>
                                 <strong className={`text-zinc-900 dark:text-white block text-lg font-mono uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{feat.title}</strong>
                                 <span className={`text-zinc-900 dark:text-white text-base lg:text-lg ${isVernacular ? 'font-semibold leading-[1.7]' : 'font-medium'}`}>{feat.desc}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <Link href={ROUTES['career-navigator']} className="group relative px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl transition-all duration-300 w-fit overflow-hidden shadow-2xl active:scale-95 inline-flex items-center">
                        <div className="absolute inset-0 bg-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className={`relative flex items-center gap-4 font-mono text-base uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                           {t('ai.nav_btn')} <Icons.ArrowUpRight className="w-6 h-6" />
                        </span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MODULE 05: CAREER QUEST --- */}
      <section className="px-6 mb-20 lg:mb-28 animate-fade-in-up [animation-delay:1600ms]">
         <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-l from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-zinc-900/60 p-1.5 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
               <div className="bg-zinc-50 dark:bg-black/60 rounded-[2.8rem] overflow-hidden">
                  {/* Image card */}
                  <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] border-b border-zinc-200 dark:border-white/10 p-6 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                     <div className="bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-amber-500/5"></div>
                     <div className="relative w-full max-w-md bg-zinc-900 dark:bg-zinc-950 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
                           <div className="flex items-center gap-2 md:gap-3">
                              <Icons.Trophy className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-amber-500 shadow-glow" />
                              <span className="text-sm md:text-base lg:text-lg font-black text-white tracking-tight">ELITE_LEVEL_05</span>
                           </div>
                           <span className="font-mono text-amber-400 font-black text-lg md:text-xl">2450 XP</span>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                           {[
                              { label: "Ramp Safety", grade: "A+", score: "100%", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                              { label: "F&B Service", grade: "B", score: "85%", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                           ].map((item, i) => (
                              <div key={i} className={`flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl border shadow-sm ${item.bg} ${item.border}`}>
                                 <span className="text-sm md:text-base text-white font-mono font-bold tracking-tight">{item.label}</span>
                                 <div className="text-right">
                                    <span className={`block text-xs md:text-sm font-black uppercase tracking-widest ${item.color}`}>{item.grade}</span>
                                    <span className="text-[10px] md:text-xs text-zinc-500 font-mono">{item.score}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-10 lg:p-20 flex flex-col justify-center w-full">
                     <TechBadge color="amber">{t('ai.module_05')}</TechBadge>
                     <h2 className={`text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mt-10 mb-6 ${isVernacular ? 'leading-[1.3]' : ''}`}>
                        {t('ai.quest_title')}
                     </h2>
                     <p className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-10 font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                        {t('ai.quest_desc')}
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        {[
                           { title: t('ai.quest_feat1_title'), desc: t('ai.quest_feat1_desc') },
                           { title: t('ai.quest_feat2_title'), desc: t('ai.quest_feat2_desc') },
                           { title: t('ai.quest_feat3_title'), desc: t('ai.quest_feat3_desc') }
                        ].map((feat, i) => (
                           <div key={i} className="flex items-start gap-6">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b] shrink-0"></div>
                              <div>
                                 <strong className={`text-zinc-900 dark:text-white block text-lg font-mono uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{feat.title}</strong>
                                 <span className={`text-zinc-900 dark:text-white text-base lg:text-lg ${isVernacular ? 'font-semibold leading-[1.7]' : 'font-medium'}`}>{feat.desc}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <Link href={ROUTES['career-quest']} className="group relative px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl transition-all duration-300 w-fit overflow-hidden shadow-2xl active:scale-95 inline-flex items-center">
                        <div className="absolute inset-0 bg-amber-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className={`relative flex items-center gap-4 font-mono text-base uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                           {t('ai.quest_btn')} <Icons.ArrowUpRight className="w-6 h-6" />
                        </span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 animate-fade-in-up [animation-delay:1800ms] mb-20">
        <div className="max-w-5xl mx-auto text-center relative">
           <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none"></div>
           <div className="relative bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/20 p-8 md:p-12 lg:p-20 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl">
              <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 ${isVernacular ? 'leading-[1.2]' : 'leading-none'}`}>{t('ai.cta_title')}</h2>
              <p className={`text-2xl text-zinc-900 dark:text-white mb-12 lg:mb-16 max-w-3xl mx-auto font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                 {t('ai.cta_desc')}
              </p>
              <Link 
                href={ROUTES['admissions']}
                className={`group relative px-14 py-7 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-black text-xl md:text-2xl hover:shadow-2xl transition-all overflow-hidden uppercase inline-flex items-center justify-center ${isVernacular ? 'tracking-normal' : 'tracking-tight'}`}
              >
                 <div className="absolute inset-0 bg-white/20 dark:bg-cyan-400 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className={`relative z-10 uppercase flex items-center gap-4 ${isVernacular ? 'tracking-normal' : 'tracking-[0.1em]'}`}>
                    {t('ai.cta_btn')} <Icons.ArrowRight className="w-8 h-8" />
                 </span>
               </Link>
           </div>
        </div>
      </section>

      {/* SEO Content Module - AI Tools Detailed Guide */}
      <AIToolsSEOContent />

      {/* SEO Content Module - Resume Builder Guide */}
      <ResumeBuilderSEOContent />

      {/* SEO Content Module - Interview Coach Guide */}
      <InterviewCoachSEOContent />
      
      {/* SEO Content Module - PA Simulator Guide */}
      <PASimulatorSEOContent />
      
      {/* SEO Content Module - Career Navigator Guide */}
      <CareerNavigatorSEOContent />

      {/* SEO Content Module */}
      <CareerQuestSEOContent />
    </div>
  );
};
