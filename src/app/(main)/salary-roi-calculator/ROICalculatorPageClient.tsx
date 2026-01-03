'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { SalaryROICalculatorSEOContent } from '@/components/SalaryROICalculatorSEOContent';
import { ROUTES } from '@/lib/routes';

// Data Models
interface CareerData {
  id: string;
  title: string;
  icon: React.ReactNode;
  growth: {
    stage: string;
    years: string;
    salary: string;
    salaryNum: number;
    role: string;
  }[];
  avgCourseFee: number;
}

const careerPaths: CareerData[] = [
  {
    id: 'cabin-crew',
    title: 'Cabin Crew / Air Hostess',
    icon: <Icons.Plane className="w-6 h-6" />,
    avgCourseFee: 150000,
    growth: [
      { stage: 'Entry', years: '0-2 Years', salary: '₹35,000 - ₹45,000', salaryNum: 40000, role: 'Junior Cabin Crew' },
      { stage: 'Mid', years: '2-5 Years', salary: '₹60,000 - ₹1.0 Lakh', salaryNum: 80000, role: 'Senior Crew / Lead' },
      { stage: 'Expert', years: '5+ Years', salary: '₹1.5 Lakh - ₹2.5 Lakh', salaryNum: 180000, role: 'In-Flight Manager' },
    ]
  },
  {
    id: 'ground-staff',
    title: 'Airport Management',
    icon: <Icons.Luggage className="w-6 h-6" />,
    avgCourseFee: 120000,
    growth: [
      { stage: 'Entry', years: '0-2 Years', salary: '₹20,000 - ₹28,000', salaryNum: 24000, role: 'Ground Staff / CSA' },
      { stage: 'Mid', years: '2-5 Years', salary: '₹40,000 - ₹60,000', salaryNum: 50000, role: 'Duty Manager' },
      { stage: 'Expert', years: '5+ Years', salary: '₹80,000 - ₹1.5 Lakh', salaryNum: 100000, role: 'Airport Terminal Manager' },
    ]
  },
  {
    id: 'hotel-mgmt',
    title: 'Hotel Management',
    icon: <Icons.ConciergeBell className="w-6 h-6" />,
    avgCourseFee: 120000,
    growth: [
      { stage: 'Entry', years: '0-2 Years', salary: '₹18,000 - ₹25,000', salaryNum: 22000, role: 'Front Office Executive' },
      { stage: 'Mid', years: '2-5 Years', salary: '₹40,000 - ₹70,000', salaryNum: 55000, role: 'Department Manager' },
      { stage: 'Expert', years: '5+ Years', salary: '₹1.0 Lakh - ₹2.5 Lakh', salaryNum: 120000, role: 'General Manager (GM)' },
    ]
  },
  {
    id: 'culinary',
    title: 'Culinary Arts (Chef)',
    icon: <Icons.ChefHat className="w-6 h-6" />,
    avgCourseFee: 130000,
    growth: [
      { stage: 'Entry', years: '0-2 Years', salary: '₹20,000 - ₹30,000', salaryNum: 25000, role: 'Commi Chef' },
      { stage: 'Mid', years: '2-5 Years', salary: '₹50,000 - ₹80,000', salaryNum: 65000, role: 'Sous Chef' },
      { stage: 'Expert', years: '5+ Years', salary: '₹1.2 Lakh - ₹3.5 Lakh', salaryNum: 180000, role: 'Executive Chef' },
    ]
  },
  {
    id: 'travel-tourism',
    title: 'Travel & Tourism',
    icon: <Icons.Globe className="w-6 h-6" />,
    avgCourseFee: 100000,
    growth: [
      { stage: 'Entry', years: '0-2 Years', salary: '₹15,000 - ₹20,000', salaryNum: 17500, role: 'Travel Consultant' },
      { stage: 'Mid', years: '2-5 Years', salary: '₹35,000 - ₹50,000', salaryNum: 42000, role: 'Tour Manager' },
      { stage: 'Expert', years: '5+ Years', salary: '₹70,000 - ₹1.5 Lakh', salaryNum: 90000, role: 'Branch Head / Business Owner' },
    ]
  }
];

export const ROICalculatorPageClient: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Translated career paths
  const translatedCareerPaths: CareerData[] = [
    {
      id: 'cabin-crew',
      title: t('roi.career_cabin'),
      icon: <Icons.Plane className="w-6 h-6" />,
      avgCourseFee: 150000,
      growth: [
        { stage: t('roi.stage_entry'), years: t('roi.years_0_2'), salary: '₹35,000 - ₹45,000', salaryNum: 40000, role: t('roi.cc_junior') },
        { stage: t('roi.stage_mid'), years: t('roi.years_2_5'), salary: '₹60,000 - ₹1.0 Lakh', salaryNum: 80000, role: t('roi.cc_senior') },
        { stage: t('roi.stage_expert'), years: t('roi.years_5plus'), salary: '₹1.5 Lakh - ₹2.5 Lakh', salaryNum: 180000, role: t('roi.cc_manager') },
      ]
    },
    {
      id: 'ground-staff',
      title: t('roi.career_airport'),
      icon: <Icons.Luggage className="w-6 h-6" />,
      avgCourseFee: 120000,
      growth: [
        { stage: t('roi.stage_entry'), years: t('roi.years_0_2'), salary: '₹20,000 - ₹28,000', salaryNum: 24000, role: t('roi.ap_ground') },
        { stage: t('roi.stage_mid'), years: t('roi.years_2_5'), salary: '₹40,000 - ₹60,000', salaryNum: 50000, role: t('roi.ap_duty') },
        { stage: t('roi.stage_expert'), years: t('roi.years_5plus'), salary: '₹80,000 - ₹1.5 Lakh', salaryNum: 100000, role: t('roi.ap_terminal') },
      ]
    },
    {
      id: 'hotel-mgmt',
      title: t('roi.career_hotel'),
      icon: <Icons.ConciergeBell className="w-6 h-6" />,
      avgCourseFee: 120000,
      growth: [
        { stage: t('roi.stage_entry'), years: t('roi.years_0_2'), salary: '₹18,000 - ₹25,000', salaryNum: 22000, role: t('roi.ht_front') },
        { stage: t('roi.stage_mid'), years: t('roi.years_2_5'), salary: '₹40,000 - ₹70,000', salaryNum: 55000, role: t('roi.ht_dept') },
        { stage: t('roi.stage_expert'), years: t('roi.years_5plus'), salary: '₹1.0 Lakh - ₹2.5 Lakh', salaryNum: 120000, role: t('roi.ht_gm') },
      ]
    },
    {
      id: 'culinary',
      title: t('roi.career_culinary'),
      icon: <Icons.ChefHat className="w-6 h-6" />,
      avgCourseFee: 130000,
      growth: [
        { stage: t('roi.stage_entry'), years: t('roi.years_0_2'), salary: '₹20,000 - ₹30,000', salaryNum: 25000, role: t('roi.cu_commi') },
        { stage: t('roi.stage_mid'), years: t('roi.years_2_5'), salary: '₹50,000 - ₹80,000', salaryNum: 65000, role: t('roi.cu_sous') },
        { stage: t('roi.stage_expert'), years: t('roi.years_5plus'), salary: '₹1.2 Lakh - ₹3.5 Lakh', salaryNum: 180000, role: t('roi.cu_exec') },
      ]
    },
    {
      id: 'travel-tourism',
      title: t('roi.career_travel'),
      icon: <Icons.Globe className="w-6 h-6" />,
      avgCourseFee: 100000,
      growth: [
        { stage: t('roi.stage_entry'), years: t('roi.years_0_2'), salary: '₹15,000 - ₹20,000', salaryNum: 17500, role: t('roi.tr_consultant') },
        { stage: t('roi.stage_mid'), years: t('roi.years_2_5'), salary: '₹35,000 - ₹50,000', salaryNum: 42000, role: t('roi.tr_manager') },
        { stage: t('roi.stage_expert'), years: t('roi.years_5plus'), salary: '₹70,000 - ₹1.5 Lakh', salaryNum: 90000, role: t('roi.tr_head') },
      ]
    }
  ];

  // Translated education options
  const educationOptions = [
    { key: '10th', label: t('roi.edu_10th') },
    { key: '12th', label: t('roi.edu_12th') },
    { key: 'grad', label: t('roi.edu_grad') }
  ];

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (selectedCourse && education) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const selectedData = translatedCareerPaths.find(c => c.id === selectedCourse);
  const entrySalary = selectedData?.growth[0].salaryNum || 0;
  const breakEvenMonths = selectedData ? Math.ceil(selectedData.avgCourseFee / entrySalary) : 0;
  const fiveYearTotal = selectedData ? (entrySalary * 24) + (selectedData.growth[1].salaryNum * 36) : 0;

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10 flex flex-col items-center">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] opacity-50"></div>
         <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] opacity-40"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      </div>

      <div className="w-full max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-4">
           <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-emerald-500/30  shadow-sm ${isVernacular ? 'font-extrabold' : ''}`}>
              <Icons.TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className={`text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.badge')}</span>
           </div>

           {/* Language Toggle */}
          <div className="flex flex-col lg:flex-row items-center gap-2 mb-8 lg:mb-0 animate-fade-in-up lg:mb-0 ">
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t('hero.translate') || 'Translate'}
            </label>
            <LanguageToggle isHomepage={true} />
          </div>
          </div>

           <h1 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 ${isVernacular ? 'leading-[1.2]' : ''}`}>
              {t('roi.hero_title1')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{t('roi.hero_title2')}</span>
           </h1>
           <p className={`text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto ${isVernacular ? 'leading-[1.8] font-semibold' : ''}`}>
              {t('roi.hero_desc')}
           </p>
        </div>

        {/* INPUT SECTION */}
        <div className={`glass-panel p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl transition-all duration-500 ${showResult ? 'mb-12' : 'mb-32'}`}>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Step 1: Course */}
              <div>
                 <label className={`text-xs text-zinc-500 uppercase tracking-widest mb-4 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.step1_label')}</label>
                 <div className="grid grid-cols-1 gap-3">
                    {translatedCareerPaths.map((career) => (
                       <button
                          key={career.id}
                          onClick={() => setSelectedCourse(career.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group
                             ${selectedCourse === career.id 
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30' 
                                : 'bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50'
                             }
                          `}
                       >
                          <div className={`p-2 rounded-xl ${selectedCourse === career.id ? 'bg-white/20' : 'bg-zinc-100 dark:bg-white/10 group-hover:bg-emerald-500/10'}`}>
                             {career.icon}
                          </div>
                          <span className={`text-sm md:text-base ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{career.title}</span>
                          {selectedCourse === career.id && <Icons.CheckCircle2 className="w-5 h-5 ml-auto shrink-0" />}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Step 2: Education */}
              <div>
                 <label className={`text-xs text-zinc-500 uppercase tracking-widest mb-4 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.step2_label')}</label>
                 <div className="grid grid-cols-1 gap-3">
                    {educationOptions.map((edu) => (
                       <button
                          key={edu.key}
                          onClick={() => setEducation(edu.key)}
                          className={`p-4 rounded-2xl border transition-all text-center text-sm
                             ${education === edu.key 
                                ? 'bg-zinc-800 dark:bg-white text-white dark:text-black border-zinc-800 dark:border-white shadow-lg' 
                                : 'bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                             }
                             ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}
                          `}
                       >
                          {edu.label}
                       </button>
                    ))}
                 </div>

                 {/* Calculate Button */}
                 <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/10">
                    <button 
                       onClick={handleCalculate}
                       disabled={!selectedCourse || !education || isCalculating}
                       className={`w-full py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition-all
                          ${!selectedCourse || !education 
                             ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed' 
                             : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1'
                          }
                          ${isVernacular ? 'font-extrabold' : 'font-bold'}
                       `}
                    >
                       {isCalculating ? (
                          <>{t('roi.calculating')} <Icons.Zap className="w-5 h-5 animate-spin" /></>
                       ) : (
                          <>{t('roi.calc_btn')} <Icons.Calculator className="w-5 h-5" /></>
                       )}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* RESULTS SECTION */}
        {showResult && selectedData && (
           <div className="animate-fade-in-up">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 {/* Card 1: Starting Salary */}
                 <div className="glass-panel p-6 rounded-[2rem] border-l-4 border-emerald-500 bg-white dark:bg-zinc-900 shadow-lg">
                    <div className="flex items-center gap-3 mb-2 text-emerald-600 dark:text-emerald-400">
                       <Icons.Banknote className="w-6 h-6" />
                       <span className={`text-xs uppercase tracking-wider ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.result_starting')}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-1">
                       {selectedData.growth[0].salary}
                    </div>
                    <div className={`text-xs text-zinc-500 ${isVernacular ? 'font-semibold leading-[1.5]' : ''}`}>{t('roi.result_per_month')}</div>
                 </div>

                 {/* Card 2: Break Even */}
                 <div className="glass-panel p-6 rounded-[2rem] border-l-4 border-blue-500 bg-white dark:bg-zinc-900 shadow-lg">
                    <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
                       <Icons.Timer className="w-6 h-6" />
                       <span className={`text-xs uppercase tracking-wider ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.result_roi_speed')}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-1">
                       {breakEvenMonths} {t('roi.result_months')}
                    </div>
                    <div className={`text-xs text-zinc-500 ${isVernacular ? 'font-semibold leading-[1.5]' : ''}`}>{t('roi.result_recover')}</div>
                 </div>

                 {/* Card 3: 5 Year Value */}
                 <div className="glass-panel p-6 rounded-[2rem] border-l-4 border-amber-500 bg-white dark:bg-zinc-900 shadow-lg">
                    <div className="flex items-center gap-3 mb-2 text-amber-600 dark:text-amber-400">
                       <Icons.Coins className="w-6 h-6" />
                       <span className={`text-xs uppercase tracking-wider ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('roi.result_5yr')}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-1">
                       ₹{(fiveYearTotal / 100000).toFixed(1)} {t('roi.result_5yr_lakhs')}
                    </div>
                    <div className={`text-xs text-zinc-500 ${isVernacular ? 'font-semibold leading-[1.5]' : ''}`}>{t('roi.result_5yr_total')}</div>
                 </div>
              </div>

              {/* GRAPH SECTION */}
              <div className="glass-panel p-8 md:p-12 rounded-[40px] border border-white/20 dark:border-white/5 bg-zinc-900 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                 
                 <h3 className={`text-2xl font-display font-bold mb-8 relative z-10 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('roi.result_trajectory')}</h3>
                 
                 <div className="space-y-8 relative z-10">
                    {selectedData.growth.map((item, idx) => (
                       <div key={idx} className="relative">
                          <div className="flex justify-between items-end mb-2 gap-4">
                             <div>
                                <div className={`text-sm text-zinc-400 uppercase tracking-wider mb-1 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{item.years}</div>
                                <div className={`text-xl text-white ${isVernacular ? 'font-extrabold leading-[1.4]' : 'font-bold'}`}>{item.role}</div>
                             </div>
                             <div className="text-right shrink-0">
                                <div className="text-2xl font-black text-emerald-400">{item.salary}</div>
                             </div>
                          </div>
                          {/* Bar */}
                          <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-[shimmer_2s_infinite]"
                                style={{ width: `${(idx + 1) * 33}%`, transition: 'width 1s ease-out' }}
                             ></div>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className={`text-zinc-400 mb-6 text-sm ${isVernacular ? 'leading-[1.8] font-semibold' : ''}`}>
                       {t('roi.result_disclaimer')}
                    </p>
                    <Link 
                       href={ROUTES['admissions']}
                       className={`inline-block px-10 py-4 bg-white text-zinc-900 rounded-full text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                    >
                       {t('roi.result_start_btn')} <Icons.ArrowRight className="w-5 h-5" />
                    </Link>
                 </div>
              </div>

           </div>
        )}

      </div>

      {/* SEO Content Module */}
      <SalaryROICalculatorSEOContent />
    </div>
  );
};

