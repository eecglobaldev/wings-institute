'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

export const ComparisonChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-[1.2]">
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600">{t('compare.title_accent')}</span> {t('compare.title')}
          </h2>
          <p className="text-2xl text-zinc-600 dark:text-white font-bold max-w-2xl mx-auto leading-[1.7]">
            {t('compare.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch max-w-6xl mx-auto">
          
          {/* OPTION A: The Ordinary (Faded, Monolith) */}
          <div className="p-10 md:p-14 rounded-[3.5rem] border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-[1.01] shadow-lg flex flex-col h-full">
             <div className="mb-10 border-b border-zinc-200 dark:border-white/20 pb-6">
               <h3 className="text-3xl font-display font-black text-zinc-400 dark:text-zinc-300 mb-2 uppercase tracking-tight leading-[1.3]">{t('compare.ordinary')}</h3>
               <p className="text-sm text-zinc-500 dark:text-zinc-300 font-black uppercase tracking-[0.2em] leading-[1.6]">{t('compare.ordinary_tag')}</p>
             </div>
             
             <ul className="space-y-6 flex-grow">
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord1')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord2')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord3')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord4')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord5')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord6')}</span>
               </li>
               <li className="flex items-start gap-5 text-zinc-900 dark:text-white text-lg font-semibold">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-inner mt-1">
                    <Icons.X className="w-4 h-4 text-zinc-500" />
                 </div>
                 <span className="leading-[1.7]">{t('compare.ord7')}</span>
               </li>
             </ul>
          </div>

          {/* OPTION B: Wings Institute (The Neo Card) */}
          <div className="relative transform lg:scale-105 z-10 group h-full">
             {/* Glow Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-wings-red opacity-25 blur-[100px] transform translate-y-4 group-hover:opacity-40 transition-opacity"></div>
             
             <div className="glass-panel p-10 pt-20 md:p-14 md:pt-14 rounded-[4rem] relative border border-white/60 dark:border-white/20 bg-white/90 dark:bg-zinc-950 backdrop-blur-3xl overflow-hidden flex flex-col h-full" style={{ boxShadow: '0 30px 100px -20px rgba(0, 0, 0, 0.5), 0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.8)' }}>
                
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-wings-red to-orange-600 text-white text-[11px] md:text-xs font-black uppercase tracking-[0.2em] px-6 py-3.5 md:px-8 md:py-4 rounded-bl-3xl shadow-2xl z-20 leading-none">
                  <span className="leading-[1.5]">{t('compare.recommended')}</span>
                </div>

                <div className="mb-10 flex items-center gap-4 md:gap-6 border-b border-zinc-100 dark:border-white/10 pb-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[1.2rem] md:rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 shrink-0">
                    <Icons.Award className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-4xl font-display font-black text-zinc-900 dark:text-white leading-[1.2] truncate">{t('compare.wings')}</h3>
                    <p className="text-[11px] md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-[0.15em] mt-2 md:mt-3 leading-[1.5]">{t('compare.wings_tag')}</p>
                  </div>
               </div>

                <ul className="space-y-6 mb-12 flex-grow">
                   {[
                     t('compare.w1'),
                     t('compare.w2'),
                     t('compare.w3'),
                     t('compare.w4'),
                     t('compare.w5'),
                     t('compare.w6')
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-4 md:gap-5 group/item">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg mt-1 shadow-green-500/30 group-hover/item:scale-110 transition-transform">
                          <Icons.Check className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-white text-lg md:text-xl leading-[1.7] tracking-tight">
                          {item}
                        </span>
                     </li>
                   ))}
                </ul>

                {/* Button */}
                <Link 
                  href="/admissions"
                  className="w-full py-5 md:py-6 rounded-2xl font-black text-sm md:text-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-700 shadow-2xl shadow-indigo-500/30 hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-wide leading-none"
                >
                   <span className="leading-[1.5]">{t('compare.btn')}</span> <Icons.ArrowRight className="w-6 h-6 shrink-0" />
                </Link>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComparisonChart;

