'use client';

import React from 'react';
import Image from 'next/image';
import { Icons } from './Icons';

interface CredentialCardProps {
  title: string;
  image: string;
  index: number;
  hoverText: string;
  verifiedText: string;
  isVernacular?: boolean;
  gradientColor?: 'blue' | 'amber' | 'pink' | 'indigo' | 'cyan';
  verifiedColor?: 'green' | 'orange' | 'amber';
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ 
  title, 
  image, 
  index, 
  hoverText, 
  verifiedText,
  isVernacular = false,
  gradientColor = 'blue',
  verifiedColor = 'green'
}) => {
  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-950',
    amber: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500',
    pink: 'bg-gradient-to-r from-pink-900 to-purple-950',
    indigo: 'bg-gradient-to-r from-indigo-900 via-blue-600 to-indigo-900',
    cyan: 'bg-gradient-to-br from-cyan-900 via-sky-900 to-sky-950'
  };

  const verifiedColorClasses = {
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500'
  };

  return (
    <div className={`group relative h-80 w-full rounded-[2.5rem] overflow-hidden ${gradientClasses[gradientColor]} dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500`}>
      
      {/* --- LAYER 1: THE LABEL (Visible Initially) --- */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <span className="text-6xl font-display font-black text-zinc-200 dark:text-zinc-200 transition-colors group-hover:text-transparent select-none">0{index + 1}</span>
            <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-0 transition-transform duration-300 border border-zinc-100 dark:border-white/5">
               <Icons.Unlock className="w-5 h-5" />
            </div>
         </div>
         
         <div className="relative z-0">
            <h4 className={`text-xl font-bold text-zinc-200 dark:text-white mb-3 group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-300 ${isVernacular ? 'leading-[1.5] font-extrabold' : 'leading-tight'}`}>{title}</h4>
            <div className={`flex items-center gap-2 text-xs text-white uppercase tracking-widest group-hover:opacity-0 transition-opacity duration-300 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
               <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
               {hoverText}
            </div>
         </div>
      </div>

      {/* --- LAYER 2: THE SHUTTER (Slides Up) --- */}
      <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) z-10">
         <div className="w-full h-full p-3 flex items-center justify-center relative">
            <div className="relative w-full h-full bg-zinc-800 rounded-2xl overflow-hidden border border-white/10">
                <Image 
                  src={image} 
                  alt={title} 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
            </div>
            
            {/* Verified Stamp */}
            <div className={`absolute top-6 right-6 ${verifiedColorClasses[verifiedColor]} text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 border border-white/20 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
               <Icons.CheckCircle2 className="w-3 h-3" /> {verifiedText}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CredentialCard;

