'use client';

import React from 'react';
import Image from 'next/image';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';

export const AdvantageGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="practice-campus" className="py-24 lg:py-32 relative z-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 md:mb-20 max-w-4xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border-wings-red/20 bg-wings-red/5 mb-6 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wings-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-wings-red"></span>
            </span>
            <span className="text-sm font-bold text-wings-red uppercase tracking-widest">{t('adv.world_class_campus')}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight leading-[1.3]">
            {t('adv.title')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600 italic">{t('adv.title_accent')}</span>
          </h2>
          <p className="text-2xl md:text-3xl text-zinc-900 dark:text-white leading-[1.8] font-semibold border-l-4 border-wings-red pl-8">
             {t('adv.subtitle')}
          </p>
        </div>

        {/* NEO BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 auto-rows-[minmax(350px,auto)]">
           
           {/* CARD 1: A330 (Flagship) - Large Hero Card */}
           <div className="col-span-1 md:col-span-6 lg:col-span-8 relative rounded-[3rem] overflow-hidden group min-h-[550px] shadow-2xl border border-white/20 dark:border-white/5">
              <Image 
                src="/images/slider-images/meal-service-training.jpg" 
                alt="Cabin crew trainees practicing meal service inside Airbus A330 mock aircraft at Wings Institute Vadodara" 
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-wrap gap-3 md:gap-4">
                 <div className="inline-flex items-center gap-3 px-5 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-[10px] md:text-sm font-black text-white shadow-2xl">
                    <Icons.Plane className="w-4 h-4 md:w-5 md:h-5 text-wings-red" /> {t('adv.card1.tag1')}
                 </div>
                 <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t('adv.card2.tag1')}
                 </div>
              </div>

              <div className="absolute bottom-0 p-8 md:p-14 w-full">
                 <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.3]">
                   {t('adv.card1.title')}
                 </h3>
                 <p className="text-zinc-100 text-lg md:text-xl max-w-2xl leading-[1.9] font-semibold">
                   {t('adv.card1.desc')}
                 </p>
              </div>
           </div>

           {/* CARD 2: Restaurant - Vertical Card */}
           <div className="col-span-1 md:col-span-3 lg:col-span-4 relative rounded-[3rem] overflow-hidden group min-h-[450px] shadow-xl border border-white/20 dark:border-white/5">
              <Image 
                src="/images/home-page/wings-hotel-management-course.jpg" 
                alt="Hospitality students learning fine-dining silver service at Wings Institute mock restaurant Gujarat" 
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-3 md:gap-4">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                    <Icons.Utensils className="w-7 h-7 md:w-8 md:h-8" />
                 </div>
                 <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t('adv.card2.tag1')}
                 </div>
              </div>

              <div className="absolute bottom-0 p-8 md:p-10">
                <h3 className="font-display text-3xl font-bold text-white mb-4 leading-[1.3]">{t('adv.card2.title')}</h3>
                <p className="text-zinc-100 text-lg leading-[1.9] mb-6 font-semibold">
                   {t('adv.card2.desc')}
                </p>
                <div className="h-1.5 w-16 bg-wings-red rounded-full shadow-glow"></div>
              </div>
           </div>

           {/* CARD 3: Kitchen - Horizontal Card */}
           <div className="col-span-1 md:col-span-3 lg:col-span-4 relative rounded-[3rem] overflow-hidden group min-h-[450px] shadow-xl border border-white/20 dark:border-white/5">
              <Image 
                src="/images/slider-images/baking-classes.jpg" 
                alt="Culinary students in professional bakery class at Wings Institute commercial kitchen Vadodara" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-3 md:gap-4">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                    <Icons.ChefHat className="w-7 h-7 md:w-8 md:h-8" />
                 </div>
                 <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t('adv.card2.tag1')}
                 </div>
              </div>

              <div className="absolute bottom-0 p-8 md:p-10">
                <h3 className="font-display text-3xl font-bold text-white mb-4 leading-[1.3]">{t('adv.card3.title')}</h3>
                <p className="text-zinc-100 text-lg leading-[1.9] mb-6 font-semibold">
                   {t('adv.card3.desc')}
                </p>
                <div className="h-1.5 w-16 bg-orange-500 rounded-full shadow-lg"></div>
              </div>
           </div>

           {/* CARD 4: Grooming - Vertical Card */}
           <div className="col-span-1 md:col-span-3 lg:col-span-4 relative rounded-[3rem] overflow-hidden group min-h-[450px] shadow-xl border border-white/20 dark:border-white/5">
              <Image 
                src="/images/slider-images/makeup-stations.jpg" 
                alt="Air hostess students at Hollywood-style makeup vanity stations Wings Institute grooming lab Alkapuri" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-3 md:gap-4">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                    <Icons.Sparkles className="w-7 h-7 md:w-8 md:h-8" />
                 </div>
                 <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t('adv.card2.tag1')}
                 </div>
              </div>

              <div className="absolute bottom-0 p-8 md:p-10">
                <h3 className="font-display text-3xl font-bold text-white mb-4 leading-[1.3]">{t('adv.card4.title')}</h3>
                <p className="text-zinc-100 text-lg leading-[1.9] mb-6 font-semibold">
                   {t('adv.card4.desc')}
                </p>
                <div className="h-1.5 w-16 bg-pink-500 rounded-full shadow-lg"></div>
              </div>
           </div>

           {/* CARD 5: Fitness & Faculty - Large Card */}
           <div className="col-span-1 md:col-span-6 lg:col-span-4 relative rounded-[3rem] overflow-hidden group min-h-[450px] shadow-xl border border-white/20 dark:border-white/5">
              <Image 
                src="/images/slider-images/fitness-center.jpg" 
                alt="Wings Institute in-house fitness center for aviation BMI standards training Alkapuri campus Vadodara" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-wrap gap-3 md:gap-4">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                    <Icons.Dumbbell className="w-7 h-7 md:w-8 md:h-8" />
                 </div>
                 <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-green-400">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t('adv.card2.tag1')}
                 </div>
              </div>

              <div className="absolute bottom-0 p-8 md:p-10">
                <div className="mb-4 inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-[11px] md:text-sm font-black border border-blue-500/40 shadow-sm leading-none">
                   <Icons.Award className="w-3 h-3 md:w-4 md:h-4" /> {t('adv.card5.badge')}
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-4 leading-[1.3]">{t('adv.card5.title')}</h3>
                <p className="text-zinc-100 text-lg leading-[1.9] font-semibold">
                   {t('adv.card5.desc')}
                </p>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};

export default AdvantageGrid;

