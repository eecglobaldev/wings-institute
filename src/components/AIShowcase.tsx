'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { ROUTES } from '@/lib/routes';

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- ELEGANT DARK GLASS ACCORDION ITEM ---
interface AccordionItemProps {
  tool: any; 
  isActive: boolean; 
  onActivate: () => void;
  coreProtocolLabel: string;
  industryInsightLabel: string;
  wingsStrategyLabel: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  tool, 
  isActive, 
  onActivate,
  coreProtocolLabel,
  industryInsightLabel,
  wingsStrategyLabel
}) => {
  return (
    <div 
      className={`
        relative rounded-[2.5rem] overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group border
        ${isActive 
          ? 'flex-[10] lg:flex-[4.5] border-white/20 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]' 
          : 'flex-[1] lg:hover:flex-[1.1] border-zinc-200 dark:border-white/5 opacity-90'}
      `}
      style={{ 
        borderColor: isActive ? tool.hex : 'transparent',
      }}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      {/* 
          IOS FIX: Layered Background logic 
          1. Color Base Layer (Subtle tint)
          2. Backdrop Blur Layer
          3. Radial Glow Layer
      */}
      <div 
        className="absolute inset-0 transition-colors duration-700"
        style={{ 
          backgroundColor: isActive ? '#09090b' : hexToRgba(tool.hex, 0.05) 
        }}
      />

      <div 
        className={`absolute inset-0 transition-all duration-700 backdrop-blur-2xl
          ${isActive ? 'bg-transparent' : 'bg-white/30 dark:bg-zinc-950/20'}`}
      >
         {/* Texture Layer */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay"></div>
         
         {/* Optimized Radial Backlight for iOS */}
         <div 
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
                background: `radial-gradient(circle at 100% 0%, ${hexToRgba(tool.hex, 0.2)}, transparent 70%)`
            }}
         ></div>

         {/* Laser Scan Animation */}
         {isActive && (
           <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-x-0 h-[1px] animate-scanline"
                style={{ 
                    background: `linear-gradient(90deg, transparent, white, ${tool.hex}, white, transparent)`,
                    boxShadow: `0 0 10px 1px ${tool.hex}`
                }}
              />
           </div>
         )}
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="absolute inset-0 p-6 lg:p-10 flex flex-col overflow-hidden">
         
         {/* --- INACTIVE STATE (CLOSED STRIP) --- */}
         <div 
            className={`
                absolute transition-all duration-500 flex items-center gap-4 z-20
                ${isActive ? 'opacity-0 pointer-events-none scale-90 -translate-y-4' : 'opacity-100 scale-100 delay-150'}
                
                /* Mobile: Centered Row */
                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-row 
                
                /* Desktop: Vertical Strip */
                lg:left-1/2 lg:top-12 lg:translate-y-0 lg:-translate-x-1/2 lg:flex-col
            `}
         >
            {/* Icon Bubble */}
            <div 
                className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-800 shadow-lg border border-zinc-100 dark:border-white/5 shrink-0 transition-all duration-500 group-hover:scale-110`}
                style={{ color: tool.hex }}
            >
               {React.cloneElement(tool.icon, { className: "w-6 h-6 lg:w-8 lg:h-8" })}
            </div>
            
            {/* Vertical Title for Desktop */}
            <span className="text-zinc-900 dark:text-zinc-200 font-black text-[10px] lg:text-xs uppercase tracking-[0.3em] whitespace-nowrap lg:[writing-mode:vertical-rl] lg:rotate-180">
               {tool.title}
            </span>
         </div>

         {/* --- ACTIVE STATE (OPEN CARD) --- */}
         <div 
            className={`
                relative z-10 flex flex-col items-start text-left transition-all duration-700 w-full h-full justify-center
                ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none absolute'}
            `}
         >
            {/* Header: Icon & Role */}
            <div className="flex items-center gap-6 mb-10 lg:mb-12">
                <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-white border transition-transform duration-700 shrink-0"
                    style={{ backgroundColor: `${tool.hex}15`, borderColor: `${tool.hex}30` }}
                >
                   {React.cloneElement(tool.icon, { className: "w-8 h-8 lg:w-10 lg:h-10", style: { color: tool.hex } })}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 leading-[1.5]">{coreProtocolLabel}</span>
                        <div className="h-px w-8 bg-white/20"></div>
                    </div>
                    <h3 className="font-display font-black text-4xl lg:text-6xl text-white leading-[1.15] tracking-tightest">{tool.title}</h3>
                </div>
            </div>

            {/* Content Body: Intelligence Block */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-12 border border-white/10 mb-10 lg:mb-12 w-full shadow-2xl relative overflow-hidden">
                {/* Accent Vertical Bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: tool.hex }}></div>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-3 leading-[1.5]">{industryInsightLabel}</p>
                        <p className="text-white text-2xl lg:text-4xl font-extrabold leading-[1.4] tracking-tight">
                           "{tool.fact}"
                        </p>
                    </div>
                    
                    <div className="w-full h-px bg-white/10"></div>
                    
                    <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-3 leading-[1.5]">{wingsStrategyLabel}</p>
                        <p className="text-white/80 text-base lg:text-xl leading-[1.8] font-semibold">
                           {tool.insight}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action: Navigation Button */}
            <Link 
                href={ROUTES[tool.target as keyof typeof ROUTES]}
                onClick={(e) => e.stopPropagation()}
                className={`
                    group/btn px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-black text-white shadow-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 text-xs lg:text-sm uppercase tracking-[0.15em] relative overflow-hidden leading-none
                `}
                style={{ backgroundColor: tool.hex }}
            >
                <span className="relative z-10 text-black leading-[1.5]">{tool.cta}</span> 
                <Icons.ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover/btn:translate-x-1 transition-transform text-black relative z-10 shrink-0" />
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
            </Link>
         </div>

      </div>
    </div>
  );
};

export const AIShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("resume");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const tools = [
    {
      id: "resume",
      title: t('ai.resume.title'),
      icon: <Icons.FileText />,
      fact: t('ai.resume.fact'),
      insight: t('ai.resume.insight'),
      hex: "#FF0080", // Deep Dark Pink
      cta: t('ai.resume.cta'),
      target: "resume-builder"
    },
    {
      id: "interview",
      title: t('ai.interview.title'),
      icon: <Icons.Mic />,
      fact: t('ai.interview.fact'),
      insight: t('ai.interview.insight'),
      hex: "#00D1FF", // Electric Cyan
      cta: t('ai.interview.cta'),
      target: "interview-coach"
    },
    {
      id: "voice",
      title: t('ai.voice.title'),
      icon: <Icons.Radio />,
      fact: t('ai.voice.fact'),
      insight: t('ai.voice.insight'),
      hex: "#BC00FF", // Proton Purple
      cta: t('ai.voice.cta'),
      target: "pa-simulator"
    },
    {
      id: "navigator",
      title: t('ai.navigator.title'),
      icon: <Icons.Compass />,
      fact: t('ai.navigator.fact'),
      insight: t('ai.navigator.insight'),
      hex: "#FF9D00", // Solar Orange
      cta: t('ai.navigator.cta'),
      target: "career-navigator"
    },
    {
      id: "quest",
      title: t('ai.quest.title'),
      icon: <Icons.Gamepad2 />,
      fact: t('ai.quest.fact'),
      insight: t('ai.quest.insight'),
      hex: "#FF0055", // Radical Red
      cta: t('ai.quest.cta'),
      target: "career-quest"
    }
  ];

  const activeTool = tools.find(t => t.id === activeId);

  return (
    <section className="py-24 lg:py-40 relative z-20 overflow-hidden bg-[#F5F5F7] dark:bg-zinc-950 transition-colors duration-1000">
      
      {/* Background Decor - Grid remains light/subtle */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Section Header - Clean Light Theme */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border bg-white border-zinc-200 text-[11px] font-black uppercase tracking-[0.3em] shadow-sm mb-8 text-indigo-600 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse shrink-0"></span>
            <span className="leading-[1.5]">{t('ai.badge')}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 dark:text-white mt-4 mb-8 tracking-tighter leading-[1.15]">
            {t('ai.section_title')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-900 italic pr-2">{t('ai.section_accent')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto font-semibold leading-[1.8] tracking-tight">
            {t('ai.section_desc')}
          </p>
        </div>

        {/* 
            ACCORDION CONTAINER 
            Deep Dark Glass Cards on a Neutral Light Surface
        */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full h-[1300px] lg:h-[750px]">
           {tools.map((tool) => (
             <AccordionItem 
                key={tool.id} 
                tool={tool} 
                isActive={activeId === tool.id}
                onActivate={() => setActiveId(tool.id)}
                coreProtocolLabel={t('ai.core_protocol')}
                industryInsightLabel={t('ai.industry_insight')}
                wingsStrategyLabel={t('ai.wings_strategy')}
             />
           ))}
        </div>

        {/* Interaction Prompt */}
        <div className="mt-16 text-center">
           <div 
            className="inline-flex items-center gap-4 font-black text-[11px] lg:text-xs uppercase tracking-[0.3em] transition-all duration-500 px-8 py-5 bg-white dark:bg-zinc-900 rounded-full shadow-lg border border-zinc-100 dark:border-white/5 leading-none"
            style={{ color: activeTool?.hex || '#94a3b8' }}
           >
              <Icons.MousePointerClick className="w-4 h-4 animate-bounce shrink-0" /> 
              <span className="leading-[1.6]">{isTouchDevice ? t('ai.tap_prompt') : t('ai.hover_prompt')}</span>
           </div>
        </div>

      </div>
    </section>
  );
};
