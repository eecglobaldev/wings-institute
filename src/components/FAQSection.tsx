'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQProps {
  title?: string;
  data: { q: string; a: string }[];
  color?: 'red' | 'blue' | 'amber' | 'orange' | 'teal' | 'zinc' | 'emerald' | 'purple' | 'pink';
  /** Unique ID for Schema.org script (prevents duplicates when multiple FAQSections exist) */
  schemaId?: string;
}

export const FAQSection: React.FC<FAQProps> = ({ 
  title = "Conversational FAQs", 
  data, 
  color = 'red',
  schemaId,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language, t } = useLanguage();

  const colors: Record<string, string> = {
    red: 'text-wings-red border-wings-red/20 bg-wings-red/5',
    blue: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/5',
    amber: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/5',
    orange: 'text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/5',
    teal: 'text-teal-600 dark:text-teal-400 border-teal-500/20 bg-teal-500/5',
    zinc: 'text-zinc-600 dark:text-zinc-400 border-zinc-500/20 bg-zinc-500/5',
    emerald: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    purple: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/5',
    pink: 'text-pink-600 dark:text-pink-400 border-pink-500/20 bg-pink-500/5',
  };

  const accentColor = colors[color] || colors.zinc;
  
  // Check if vernacular language for enhanced spacing
  const isVernacular = language === 'hi' || language === 'gu';

  return (
    <section className="px-6 py-20 lg:py-28 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <span className={`font-black uppercase mb-3 block ${isVernacular ? 'text-[11px] tracking-[0.12em] leading-[1.8]' : 'text-[12px] tracking-[0.2em] leading-[1.6]'} ${color === 'red' ? 'text-wings-red' : `text-${color}-600 dark:text-${color}-400`}`}>{t('faq.badge')}</span>
            <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white ${isVernacular ? 'leading-[1.5]' : 'leading-[1.2]'}`}>
              {title}
            </h2>
        </div>
        
        <div className="space-y-5">
          {data.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className={`glass-panel p-6 md:p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${openIndex === idx ? `${accentColor} shadow-2xl scale-[1.01] border-current` : 'border-white/40 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 bg-white/40 dark:bg-zinc-900/40'}`}
            >
              <div className="flex justify-between items-start gap-4 md:gap-6">
                <div className="flex gap-4 md:gap-6">
                    <span className={`font-display font-black text-xl md:text-2xl opacity-40 shrink-0 ${openIndex === idx ? 'opacity-100 text-current' : 'text-zinc-400 dark:text-zinc-600'}`}>0{idx + 1}.</span>
                    <h3 className={`font-bold tracking-tight text-zinc-900 dark:text-white ${isVernacular ? 'text-base md:text-xl leading-[1.7] font-extrabold' : 'text-lg md:text-2xl leading-[1.4]'}`}>
                      {item.q}
                    </h3>
                </div>
                <div className={`p-2.5 md:p-3 rounded-full transition-all duration-500 shrink-0 shadow-lg ${openIndex === idx ? 'rotate-180 bg-zinc-900 dark:bg-white text-white dark:text-black scale-110' : 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white'}`}>
                   <Icons.ChevronDown className="w-5 h-5" />
                </div>
              </div>
              <div 
                className={`grid transition-all duration-500 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className={`text-zinc-900 dark:text-white pl-10 md:pl-14 border-t border-dashed border-zinc-300 dark:border-white/20 pt-6 ${isVernacular ? 'text-sm md:text-lg leading-[2.1] font-semibold' : 'text-base md:text-xl leading-[1.8] font-medium'}`}>
                    {typeof item.a === "string"
                      ? item.a.split(/(\*\*[^\*]+\*\*)/g).map((part, i) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={i} className={isVernacular ? 'font-extrabold' : 'font-bold'}>
                              {part.slice(2, -2)}
                            </strong>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )
                      : item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

