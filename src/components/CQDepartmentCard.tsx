
import React from 'react';
import { Department, Language } from '@/components/CQTypes';
import { Icons } from '@/components/Icons';

interface Props {
  department: Department;
  onClick: (dept: Department) => void;
  language: Language;
}

const CQDepartmentCard: React.FC<Props> = ({ department, onClick, language }) => {
  // Dynamically resolve icon
  const IconComponent = (Icons as any)[department.icon] || Icons.Brain;

  // Resolve text based on language
  const name = (language === 'hi' && department.nameHi) ? department.nameHi : department.name;
  const description = (language === 'hi' && department.descriptionHi) ? department.descriptionHi : department.description;

  return (
    <button
      onClick={() => onClick(department)}
      className="group relative flex flex-col items-start p-8 rounded-[2.5rem] transition-all duration-500 w-full overflow-hidden text-left
                 glass-panel bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60 
                 border border-white/40 dark:border-white/10 hover:border-white/60 dark:hover:border-white/20
                 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] active:scale-[0.98] touch-manipulation h-full"
    >
      {/* Background Gradient Blob effect on Hover */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${department.color}`}></div>
      
      <div className="relative z-10 flex flex-col h-full w-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 w-full">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${department.color} text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                <IconComponent className="w-8 h-8" strokeWidth={2} />
              </div>
              
              <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-300 dark:text-zinc-600 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
                  <Icons.ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
          </div>
          
          {/* Text Content */}
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
            {description}
          </p>
          
          {/* Footer / Stats */}
          <div className="mt-auto pt-6 border-t border-zinc-200/50 dark:border-white/5 w-full flex items-center gap-3">
             <div className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                5 Levels
             </div>
             <div className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                100 XP
             </div>
          </div>
      </div>
    </button>
  );
};

export default CQDepartmentCard;
