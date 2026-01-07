'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { ROUTES } from '@/lib/routes';
import type { PageType } from '@/types';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';
  const currentYear = new Date().getFullYear();
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Vernacular styling classes
  const vernacularText = isVernacular ? 'leading-[1.8] tracking-wide' : '';
  const vernacularHeading = isVernacular ? 'leading-[1.4] font-extrabold' : '';
  const vernacularParagraph = isVernacular ? 'leading-[2] font-medium' : '';
  const vernacularButton = isVernacular ? 'leading-[1.6] font-bold tracking-wide' : '';
  const vernacularLabel = isVernacular ? 'leading-[1.7] font-semibold' : '';

  // Theme Detection logic for logo swapping
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Only render map on client-side to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // OFFICIAL ASSETS & LINKS
  const MAP_DIRECTIONS_URL = "https://maps.app.goo.gl/rSomQcKcZQyYcbwW9";
  const REVIEWS_URL = "https://maps.app.goo.gl/ghUozjDLzwZVZf798";
  const MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7382.035471043882!2d73.170787!3d22.315169!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8b1d99d887b%3A0x72563e9ea9fe920f!2sWings%20Institute%20Air%20Hostess%20%26%20Hotel%20Management!5e0!3m2!1sen!2sin!4v1766752053425!5m2!1sen!2sin";
  
  const WINGS_LOGO_LIGHT = "/images/wings-logo-black.png";
  const WINGS_LOGO_DARK = "/images/wings-logo-white.png";
  
  const EEC_LOGO_LIGHT = "/images/eec-logo-dark.png";
  const EEC_LOGO_DARK = "/images/eec-logo-white.png";

  const GOOGLE_REVIEWS_LIGHT = "/images/Google_Review_logo_light.png";
  const GOOGLE_REVIEWS_DARK = "/images/Google_Review_logo_dark.webp";

  const TOP_REVIEWS = [
    { author: "Namrata Bhosale", textKey: "footer.review1_text", timeKey: "footer.review1_time", initial: "N", image: "/images/success-stories/Namrata-Bhosale.png" },
    { author: "Rahul Pandya", textKey: "footer.review2_text", timeKey: "footer.review2_time", initial: "R", image: "/images/success-stories/Rahul-Pandya.jpg" },
    { author: "Rummana Salat", textKey: "footer.review3_text", timeKey: "footer.review3_time", initial: "M", image: "/images/success-stories/Rummana-Salat.png" },
    { author: "Ronak Makwana", textKey: "footer.review4_text", timeKey: "footer.review4_time", initial: "A", image: "/images/success-stories/Ronak-Makwana.jpeg" },
    { author: "Ekta Christian", textKey: "footer.review5_text", timeKey: "footer.review5_time", initial: "S", image: "/images/success-stories/Ekta-Christian.png" }
  ];

  const JOB_READY_COURSES: { id: PageType; labelKey: string }[] = [
   { id: 'air-hostess', labelKey: 'footer.link_air_hostess' },
   { id: 'airport-mgmt', labelKey: 'footer.link_airport_mgmt' },
   { id: 'hotel-mgmt', labelKey: 'footer.link_hotel_mgmt' },
   { id: 'culinary', labelKey: 'footer.link_culinary' },
   { id: 'travel-tourism', labelKey: 'footer.link_travel' },
  ];
  const AI_TOOLS: { id: PageType; labelKey: string }[] = [
   { id: 'ai-tools', labelKey: 'footer.link_ai_home' },
   { id: 'resume-builder', labelKey: 'footer.link_resume' },
   { id: 'interview-coach', labelKey: 'footer.link_interview' },
   { id: 'pa-simulator', labelKey: 'footer.link_pa' },
   { id: 'career-navigator', labelKey: 'footer.link_career_nav' },
   { id: 'career-quest', labelKey: 'footer.link_game' },
  ];
  const STUDENT_HUB_LINKS: { id: PageType; labelKey: string }[] = [
   { id: 'events', labelKey: 'footer.link_events' },
   { id: 'placements', labelKey: 'footer.link_placements' },
   { id: 'virtual-tour', labelKey: 'footer.link_tour' },
   { id: 'scholarship', labelKey: 'footer.link_scholarship' },
   { id: 'roi-calculator', labelKey: 'footer.link_roi' },
   { id: 'blog', labelKey: 'footer.link_blog' },
   { id: 'admissions', labelKey: 'footer.link_inquiry' },
  ];

  const ABOUT_WINGS: { id: PageType; labelKey: string }[] = [
   { id: 'about', labelKey: 'footer.link_about' },
   { id: 'contact', labelKey: 'footer.link_contact' },
   { id: 'careers', labelKey: 'footer.link_jobs' },
   { id: 'franchise', labelKey: 'footer.link_franchise' },
   { id: 'transparency', labelKey: 'footer.link_transparency' },
   { id: 'privacy', labelKey: 'footer.link_privacy' },
   { id: 'advantage', labelKey: 'footer.link_home' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#050507] pt-0 pb-12 border-t border-zinc-200 dark:border-white/5 relative z-10 overflow-hidden">
      
      {/* NEO Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* --- TOP BRANDING: PROMINENT LOGO --- */}
        <div className="flex flex-col items-center mb-0 animate-fade-in mt-12 mb-12">
           <button 
             onClick={handleLogoClick}
             className="cursor-pointer transition-all duration-700 hover:scale-[1.03] active:scale-95"
           >
              <Image 
                src={isDark ? WINGS_LOGO_DARK : WINGS_LOGO_LIGHT} 
                alt="Wings Institute" 
                width={224}
                height={112}
                className="h-16 lg:h-28 w-auto object-contain transition-all opacity-100 dark:opacity-90 drop-shadow-2xl" 
              />
           </button>
        </div>

        {/* --- SECTION 1: VERIFIED FEEDBACK (BENTO GRID) --- */}
        <div className="mb-20 md:mb-24 -mt-4 md:-mt-8">
           <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">

              <a href="https://maps.app.goo.gl/ghUozjDLzwZVZf798" target="_blank" rel="noreferrer">
                <Image 
                   src={isDark ? GOOGLE_REVIEWS_DARK : GOOGLE_REVIEWS_LIGHT} 
                   alt="Google Reviews - Wings Institute Vadodara rated 4.7 stars aviation training" 
                   width={120}
                   height={48}
                   className="h-10 md:h-12 w-auto mb-4 hover:scale-105 transition-transform" 
                 />
                 </a>
                 <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-6 py-3.5 rounded-full border border-zinc-200 dark:border-white/10 shadow-md backdrop-blur-xl">
                    <div className="flex gap-1 shrink-0">
                       {[1,2,3,4,5].map(i => <Icons.Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)}
                    </div>
                    <span className={`text-xs font-semibold text-zinc-900 dark:text-white ml-2 tracking-tight leading-[1.6] ${vernacularLabel}`}>{t('footer.avg_rating')}</span>
                 </div>
              </div>
              <div className="text-center md:text-right flex flex-col items-center md:items-end">
                 <p className={`text-zinc-900 dark:text-white text-lg font-black mb-4 tracking-tight leading-[1.5] ${vernacularHeading}`}>{t('footer.student_stories')}</p>
                 <a 
                    href={REVIEWS_URL}
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex items-center gap-4 px-8 py-4 bg-white dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-2xl font-semibold text-sm tracking-tight text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-all group shadow-md hover:shadow-xl leading-none ${vernacularButton}`}
                 >
                    <span className="leading-[1.5]">{t('footer.read_on_google')}</span> <Icons.ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                 </a>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {TOP_REVIEWS.map((rev, i) => (
                <div key={i} className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-[#0c0c0e] border border-white dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2 overflow-hidden">
                   <div className="absolute -top-6 -right-4 opacity-[0.08] dark:opacity-[0.15] group-hover:opacity-25 transition-opacity pointer-events-none">
                      <Icons.Quote className="w-20 h-20 rotate-180" />
                   </div>

                   <div className="flex flex-col items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow-inner">
                         <Image src={rev.image} alt={`${rev.author} - Wings Institute alumni review testimonial Vadodara`} width={80} height={80} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div className="flex flex-col min-w-0">
                         <span className={`text-xs font-medium text-zinc-900 dark:text-white tracking-tight truncate ${vernacularLabel}`}>{rev.author}</span>
                         <span className={`text-[10px] text-zinc-500 dark:text-zinc-400 font-medium ${vernacularText}`}>{t(rev.timeKey)}</span>
                      </div>
                   </div>
                   
                   <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(j => <Icons.Star key={j} className="w-4 h-4 text-yellow-500 fill-current" />)}
                   </div>

                   <p className={`text-sm italic text-zinc-900 dark:text-white line-clamp-5 leading-[1.9] font-medium mb-6 flex-grow ${vernacularParagraph}`}>
                      &ldquo;{t(rev.textKey)}&rdquo;
                   </p>

                   <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Icons.CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                         <span className={`text-[11px] font-semibold text-green-600 dark:text-green-400 tracking-tight leading-[1.6] ${vernacularLabel}`}>{t('footer.verified_review')}</span>
                      </div>
                      <a href="https://maps.app.goo.gl/ghUozjDLzwZVZf798" target="_blank" rel="noreferrer">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Reviews - Wings Institute Vadodara verified student reviews" width={16} height={16} className="h-4 w-auto transition-opacity" unoptimized />
                      </a>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- SECTION 2: CAMPUS HUB (MAP & CONTACT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-zinc-300 dark:border-white/10 mb-16">
           
           {/* Interactive Map */}
           <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                 <span className={`px-3.5 py-1.5 rounded-md bg-indigo-600/10 text-indigo-600 text-xs font-black tracking-tight border border-indigo-600/20 shadow-sm leading-[1.5] ${vernacularButton}`}>{t('footer.campus')}</span>
                 <h3 className={`text-xl md:text-2xl font-display font-bold text-zinc-900 dark:text-white truncate leading-[1.4] ${vernacularHeading}`}>{t('footer.campus_name')}</h3>
              </div>
              <div className="relative glass-panel p-1 rounded-[2.5rem] border border-white/60 dark:border-white/10 overflow-hidden h-[300px] md:h-[400px] shadow-2xl group">
                 {isMounted ? (
                   <iframe 
                      src={MAP_EMBED_SRC}
                      title="Wings Institute Location Map"
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      allow="geolocation"
                      className="rounded-[2.2rem] w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 brightness-[0.98] dark:brightness-[0.9]"
                   />
                 ) : (
                   <div className="rounded-[2.2rem] w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                     <div className="text-center">
                       <Icons.MapPin className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-2" />
                       <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading map...</p>
                     </div>
                   </div>
                 )}
                 <div className="absolute bottom-6 right-6">
                    <a 
                      href={MAP_DIRECTIONS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-6 py-4 md:px-8 md:py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-semibold text-xs tracking-tight shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-white/20 leading-none ${vernacularButton}`}
                    >
                       <span className="leading-[1.5]">{t('footer.get_directions')}</span> <Icons.ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                    </a>
                 </div>
              </div>
           </div>

           {/* Contact & Social Cards */}
           <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="glass-panel p-10 rounded-[3rem] bg-white/70 dark:bg-[#0c0c0e] border border-white/60 dark:border-white/10 shadow-xl flex flex-col gap-10 h-full justify-center">
                 <div className="space-y-3">
                    <h4 className={`text-base font-black tracking-tight text-zinc-900 dark:text-white leading-[1.5] ${vernacularHeading}`}>{t('footer.campus_location')}</h4>
                    <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noreferrer">
                    <p className={`text-base font-medium text-zinc-600 dark:text-zinc-300 leading-[1.8] max-w-[350px] ${vernacularParagraph}`}>
                       {t('footer.campus_address')}
                    </p>
                    </a>
                 </div>
                 
                 <div className="space-y-6">
                    <h4 className={`text-base font-black tracking-tight text-zinc-900 dark:text-white leading-[1.5] ${vernacularHeading}`}>{t('footer.free_counselling')}</h4>
                    <div className="flex flex-col gap-4">
                       <a href="tel:+918758754444" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-indigo-600/30 shrink-0">
                             <Icons.Phone className="w-6 h-6" />
                          </div>
                          <span className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-white tracking-tighter group-hover:text-indigo-600 transition-colors">+91 875 875 4444</span>
                       </a>
                       <a href="tel:+919978986464" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-indigo-600/30 shrink-0">
                             <Icons.Phone className="w-6 h-6" />
                          </div>
                          <span className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-white tracking-tighter group-hover:text-indigo-600 transition-colors">+91 997 898 6464</span>
                       </a>
                    </div>
                    <a href="mailto:info@wingsinstitute.com" className="flex items-center gap-5 group pt-2">
                       <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-all group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black shrink-0">
                          <Icons.Mail className="w-6 h-6" />
                       </div>
                       <span className="text-base font-medium text-zinc-600 dark:text-zinc-300 transition-colors">info@wingsinstitute.com</span>
                    </a>
                 </div>

                 {/* Social Connect Integration */}
                 <div className="pt-6 border-t border-zinc-200 dark:border-white/10 space-y-5">
                    <h4 className={`text-base font-black tracking-tight text-zinc-900 dark:text-white leading-[1.5] ${vernacularHeading}`}>{t('footer.connect_wings')}</h4>
                    <div className="flex gap-4">
                       {[
                         { icon: Icons.Instagram, url: "https://www.instagram.com/wingsinstitute", color: "hover:text-pink-600" },
                         { icon: Icons.Facebook, url: "https://www.facebook.com/wingsaviationtraining", color: "hover:text-blue-600" },
                         { icon: Icons.Linkedin, url: "https://www.linkedin.com/company/wings-institute-for-air-hostess-and-hotel-management-training/?originalSubdomain=in", color: "hover:text-blue-700" },
                         { icon: Icons.Youtube, url: "https://www.youtube.com/@wingsinstitute", color: "hover:text-red-600" }
                       ].map((soc, i) => (
                          <a key={i} href={soc.url} target="_blank" rel="noreferrer" className={`text-zinc-900 dark:text-white ${soc.color} transition-all p-4 bg-white dark:bg-white/10 rounded-2xl border border-zinc-200 dark:border-white/10 hover:shadow-xl hover:-translate-y-1`}>
                             <soc.icon className="w-5 h-5" />
                          </a>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- SECTION 3: COMPREHENSIVE SITEMAP (ALL LINKS) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 mb-16">
          
          {/* Column 1: Job Ready Courses */}
          <div className="space-y-6">
            <h4 className={`text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-[1.5] ${vernacularHeading}`}>{t('footer.job_ready_courses')}</h4>
            <ul className="space-y-4">
              {JOB_READY_COURSES.map(p => (
                <li key={p.id}>
                  <Link href={ROUTES[p.id]} className={`text-base text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors font-medium tracking-tight text-left ${vernacularText}`}>
                    {t(p.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tech Ecosystem */}
          <div className="space-y-6">
            <h4 className={`text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-[1.5] ${vernacularHeading}`}>{t('footer.ai_tools')}</h4>
            <ul className="space-y-4">
              {AI_TOOLS.map(p => (
                <li key={p.id}>
                  <Link href={ROUTES[p.id]} className={`text-base text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors font-medium tracking-tight text-left ${vernacularText}`}>
                    {t(p.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Student Hub */}
          <div className="space-y-6">
            <h4 className={`text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-[1.5] ${vernacularHeading}`}>{t('footer.student_hub')}</h4>
            <ul className="space-y-4">
              {STUDENT_HUB_LINKS.map(p => (
                <li key={p.id}>
                  <Link href={ROUTES[p.id]} className={`text-base text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors font-medium tracking-tight text-left ${vernacularText}`}>
                    {t(p.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About Us */}
          <div className="space-y-6">
            <h4 className={`text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-[1.5] ${vernacularHeading}`}>{t('footer.about_wings')}</h4>
            <ul className="space-y-4">
              {ABOUT_WINGS.map(p => (
                <li key={p.id}>
                  <Link href={ROUTES[p.id]} className={`text-base text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors font-medium tracking-tight text-left ${vernacularText}`}>
                    {t(p.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- FOOTER BOTTOM: SUBSIDIARY & LEGAL --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-10 pt-10 border-t border-zinc-300 dark:border-white/10">
           
           <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-4 p-2 rounded-[2.5rem] bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-md">
                 <a href="https://eecglobal.com/" target="_blank" rel="noopener noreferrer" className="shrink-0 transition-transform hover:scale-105">
                    <Image src={isDark ? EEC_LOGO_DARK : EEC_LOGO_LIGHT} alt="EEC Global - Parent company of Wings Institute aviation and hospitality training" width={96} height={96} className="h-24 w-auto object-contain" />
                 </a>
                 <div className="flex flex-col">
                    <span className={`text-xs font-black tracking-tight text-zinc-400 leading-[1.5] ${vernacularLabel}`}>{t('footer.parent_org')}</span>
                    <p className={`text-sm font-semibold text-zinc-900 dark:text-white leading-[1.7] ${vernacularText}`}>{t('footer.subsidiary')}</p>
                 </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-3">
                 <p className={`text-sm text-zinc-500 dark:text-zinc-400 font-semibold leading-[1.6] ${vernacularText}`}>© {currentYear} Wings Institute. {t('footer.legacy')}</p>
                 <div className="flex items-center gap-4">

                 <Link href="/privacy-policy" className={`text-sm font-semibold tracking-tight text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors leading-[1.5] ${vernacularButton}`}>{t('footer.privacy')}</Link>
                 <a href="/llm.txt" target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold tracking-tight text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors leading-[1.5] ${vernacularButton}`}>{t('footer.llm_read_here')}</a>
                 </div>
              </div>
           </div>

           <div className="flex items-center">
              <span className={`text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-tight text-center leading-[1.6] ${vernacularLabel}`}>{t('footer.top_training')}</span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

