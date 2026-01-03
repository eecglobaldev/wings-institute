
import React from 'react';
import { Icons } from '@/components/Icons';
import { Department, Language } from '@/components/CQTypes';
import { UI_TEXT } from '@/components/CQConstants';
import { RadialProgressBar } from '@/components/InterviewCoach/Shared';

interface Props {
  score: number;
  total: number;
  department: Department | null;
  onReturn: () => void;
  language: Language;
}

const CQResultsView: React.FC<Props> = ({ score, total, department, onReturn, language }) => {
  const t = UI_TEXT[language];
  const percentage = (score / total) * 10; // Normalized for RadialProgressBar's 0-10 scale
  const accuracy = Math.round((score / total) * 100);
  const xpEarned = score * 100;

  const isHighPerformer = accuracy >= 80;
  const isAverage = accuracy >= 60 && accuracy < 80;

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-amber-500/20 bg-amber-500/5 mb-6 shadow-sm">
          <Icons.Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">{t.moduleComplete}</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-black text-zinc-900 dark:text-white leading-tight">
          Session <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic">Complete.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Score Summary */}
        <div className="lg:col-span-7">
           <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px]"></div>
              
              <div className="relative mb-10">
                <RadialProgressBar score={percentage} />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                 <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 text-center">
                    <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t.score}</span>
                    <span className="text-3xl font-black text-zinc-900 dark:text-white">{score}/{total}</span>
                 </div>
                 <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 text-center">
                    <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t.scoreXP} Earned</span>
                    <span className="text-3xl font-black text-amber-500">+{xpEarned}</span>
                 </div>
              </div>

              <div className="mt-10 w-full p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-100 text-white dark:text-zinc-900">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center shrink-0">
                       <Icons.Target className="w-5 h-5" />
                    </div>
                    <div>
                       <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">{t.accuracy}</span>
                       <span className="text-xl font-black">{accuracy}% Precision</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Card: Feedback & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={`p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden h-full flex flex-col ${isHighPerformer ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white' : isAverage ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-white/20'}`}>
                <div className="relative z-10">
                    <Icons.Quote className="w-12 h-12 mb-6 opacity-40 rotate-180" />
                    <h3 className="text-3xl font-display font-black mb-4 leading-tight">
                        {isHighPerformer ? t.perfectScore : "Steady Progress!"}
                    </h3>
                    <p className={`text-lg leading-relaxed mb-10 ${isHighPerformer || isAverage ? 'opacity-90' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {isHighPerformer 
                            ? t.perfectText 
                            : isAverage 
                                ? "You have a solid foundation. Focus on the scenario-based modules to increase your industry score."
                                : "Aviation is about discipline. Review the expert insights from your missed questions and try the set again."
                        }
                    </p>
                </div>
                
                <div className="mt-auto space-y-3 relative z-10">
                    <button 
                        onClick={onReturn}
                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${isHighPerformer || isAverage ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
                    >
                        {t.returnDashboard} <Icons.LayoutGrid className="w-4 h-4" />
                    </button>
                    {department && (
                        <div className={`p-4 rounded-xl border flex items-center gap-3 ${isHighPerformer || isAverage ? 'bg-black/10 border-white/20' : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10'}`}>
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                {React.createElement((Icons as any)[department.icon] || Icons.Briefcase, { className: "w-4 h-4" })}
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[9px] font-bold uppercase tracking-wider opacity-60">Last Tested</span>
                                <span className="block text-xs font-bold truncate">{language === 'hi' ? department.nameHi : department.name}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-12 text-center">
         <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.5em]">Global Readiness Score • Wings Institute</p>
      </div>
    </div>
  );
};

export default CQResultsView;
