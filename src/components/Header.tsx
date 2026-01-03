'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Icons } from './Icons';
import { LanguageToggle } from './LanguageToggle';
import { ROUTES, getPageType } from '@/lib/routes';
import type { PageType } from '@/types';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const currentPage = getPageType(pathname) || 'advantage';
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const LOGO_LIGHT = "/images/wings-logo-black.png"; 
  const LOGO_DARK = "/images/wings-logo-white.png";

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Theme detection
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleNav = () => {
    setIsOpen(false);
  };

  const toggleTheme = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
    
    // Persist theme via API route
    try {
      await fetch('/api/set-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // --- NEO-MATRIX SITEMAP ---
  const ACADEMY_PROGRAMS = [
    { id: 'air-hostess' as PageType, label: 'Air Hostess Training', icon: <Icons.Plane className="w-5 h-5" /> },
    { id: 'airport-mgmt' as PageType, label: 'Airport Management', icon: <Icons.Luggage className="w-5 h-5" /> },
    { id: 'hotel-mgmt' as PageType, label: 'Hotel Management', icon: <Icons.ConciergeBell className="w-5 h-5" /> },
    { id: 'culinary' as PageType, label: 'Culinary (Cooking) Course', icon: <Icons.ChefHat className="w-5 h-5" /> },
    { id: 'travel-tourism' as PageType, label: 'Travel Tourism Management', icon: <Icons.Globe className="w-5 h-5" /> },
  ];

  const AI_INTELLIGENCE_LAB = [
    { id: 'ai-tools' as PageType, label: 'AI Tools Home', icon: <Icons.Cpu className="w-5 h-5" /> },
    { id: 'resume-builder' as PageType, label: 'Resume Builder', icon: <Icons.FileText className="w-5 h-5" /> },
    { id: 'interview-coach' as PageType, label: 'Interview Coach', icon: <Icons.Mic className="w-5 h-5" /> },
    { id: 'pa-simulator' as PageType, label: 'PA Simulator', icon: <Icons.Radio className="w-5 h-5" /> },
    { id: 'career-navigator' as PageType, label: 'Career Counselor', icon: <Icons.Compass className="w-5 h-5" /> },
    { id: 'career-quest' as PageType, label: 'Knowledge Game', icon: <Icons.Gamepad2 className="w-5 h-5" /> },
  ];

  const STUDENT_HUB = [
    { id: 'events' as PageType, label: 'Free Workshops', icon: <Icons.Ticket className="w-5 h-5" /> },
    { id: 'placements' as PageType, label: 'Placements', icon: <Icons.Trophy className="w-5 h-5" /> },
    { id: 'virtual-tour' as PageType, label: '360° Campus Tour', icon: <Icons.Eye className="w-5 h-5" /> },
    { id: 'scholarship' as PageType, label: 'Scholarship Test', icon: <Icons.Sparkles className="w-5 h-5" /> },
    { id: 'roi-calculator' as PageType, label: 'Salary ROI Calculator', icon: <Icons.Calculator className="w-5 h-5" /> },
    { id: 'blog' as PageType, label: 'Blog & News', icon: <Icons.Newspaper className="w-5 h-5" /> },
    { id: 'admissions' as PageType, label: 'Inquiry Form', icon: <Icons.UserCheck className="w-5 h-5" /> },
  ];

  const INSTITUTIONAL = [
    { id: 'about' as PageType, label: 'About Us', icon: <Icons.History className="w-5 h-5" /> },
    { id: 'contact' as PageType, label: 'Contact Us', icon: <Icons.MapPin className="w-5 h-5" /> },
    { id: 'careers' as PageType, label: 'Jobs at Wings', icon: <Icons.Briefcase className="w-5 h-5" /> },
    { id: 'franchise' as PageType, label: 'Franchise', icon: <Icons.Handshake className="w-5 h-5" /> },
    { id: 'privacy' as PageType, label: 'Privacy Policy', icon: <Icons.ShieldCheck className="w-5 h-5" /> },
    { id: 'transparency' as PageType, label: 'Transparency Policy', icon: <Icons.HatGlasses className="w-5 h-5" /> },
    { id: 'advantage' as PageType, label: 'Home', icon: <Icons.Zap className="w-5 h-5" /> },
  ];

  const COURSE_IDS = ACADEMY_PROGRAMS.map(p => p.id);

  return (
    <>
      {/* --- THE COMMAND BAR (HEADER) --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 dark:bg-[#050507] backdrop-blur-2xl z-[40] border-b border-zinc-200/50 dark:border-white/5 flex items-center transition-all duration-300 px-[env(safe-area-inset-left)] px-[env(safe-area-inset-right)]">
        <div className="max-w-screen-xl mx-auto w-full px-4 md:px-8 flex items-center justify-between gap-2 ">
          
          {/* Left: Brand */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="cursor-pointer active:scale-95 transition-transform flex items-center">
               <Image 
                 src={isDark ? LOGO_DARK : LOGO_LIGHT} 
                 alt="Wings Institute - Aviation and Hospitality Training Vadodara" 
                 width={200}
                 height={64}
                 className="w-auto transition-all duration-500 object-contain h-12 md:h-16 lg:h-16 "
                 priority
               />
            </Link>
          </div>

          {/* Center: Desktop Island - Hidden on smaller screens */}
          <nav className="hidden xl:flex items-center gap-2 p-1.5 bg-zinc-100/50 dark:bg-white/5 rounded-full border border-zinc-200/50 dark:border-white/10 backdrop-blur-md">
            {[
              { id: 'advantage' as PageType, label: 'Home' },
              { id: 'courses' as const, label: 'Courses' },
              { id: 'ai-tools' as PageType, label: ' Free AI Tools' },
              { id: 'placements' as PageType, label: 'Placements' },
              { id: 'contact' as PageType, label: 'Contact' }
            ].map(p => {
              const isActive = p.id === 'courses' ? COURSE_IDS.includes(currentPage as typeof COURSE_IDS[number]) : currentPage === p.id;
              
              if (p.id === 'courses') {
                return (
                  <button 
                    key={p.id} 
                    onClick={() => setIsOpen(true)}
                    className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    {p.label}
                  </button>
                );
              }
              
              return (
                <Link 
                  key={p.id} 
                  href={ROUTES[p.id]}
                  className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & Theme */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
             
             {/* Language Toggle - A/अ/અ */}
             <LanguageToggle isHomepage={false} />
             
             <button 
                onClick={toggleTheme} 
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors bg-zinc-100 dark:bg-white/5 rounded-full border border-zinc-200/50 dark:border-white/10"
                aria-label="Toggle Theme"
             >
                {isDark ? <Icons.Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icons.Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
             </button>
             
             <Link 
                href="/admissions"
                className="hidden lg:block px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-indigo-700 text-white rounded-full text-sm font-black transition-all active:scale-95 shadow-lg shadow-indigo-600/20 uppercase tracking-widest"
             >
                Inquiry
             </Link>
             
             {/* MENU TRIGGER */}
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all active:scale-90 z-[30] bg-zinc-900 dark:bg-white rounded-full"
                aria-label="Toggle Navigation Matrix"
            >
              <div className="relative flex flex-col gap-1.5 items-center">
                <span className={`h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
                <span className={`h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
                <span className={`h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* --- THE NEO-MATRIX OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[20] bg-white dark:bg-[#050507] transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] flex flex-col pt-20 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto pb-5 lg:pb-12 px-6 md:px-12 scrollbar-hide relative z-10">
          <div className="max-w-screen-xl mx-auto pt-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16">
              
              {/* Column 1: The Academy */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-4">
                  <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                  <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Courses</span>
                </div>
                <div className="flex flex-col gap-1">
                  {ACADEMY_PROGRAMS.map(item => (
                    <Link 
                        key={item.id} 
                        href={ROUTES[item.id]}
                        onClick={handleNav}
                        className={`group flex items-center justify-between py-4 text-left border-b border-zinc-50 dark:border-white/5 hover:border-indigo-500 transition-colors ${currentPage === item.id ? 'border-indigo-500' : ''}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-xl transition-all duration-500 ${currentPage === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-zinc-100 dark:bg-white/5 text-zinc-400 group-hover:text-indigo-500 group-hover:bg-white dark:group-hover:bg-indigo-500/10'}`}>
                           {item.icon}
                        </div>
                        <span className={`text-lg md:text-xl font-medium tracking-tight transition-colors ${currentPage === item.id ? 'text-indigo-600' : 'text-zinc-900 dark:text-white group-hover:text-indigo-600'}`}>
                           {item.label}
                        </span>
                      </div>
                      <Icons.ArrowRight className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Intelligence Lab */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-indigo-600/20 pb-4">
                  <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                  <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tight">Free AI Tools</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {AI_INTELLIGENCE_LAB.map(item => (
                    <Link 
                        key={item.id} 
                        href={ROUTES[item.id]}
                        onClick={handleNav}
                        className="flex items-center gap-4 p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-indigo-500/30 hover:bg-white dark:hover:bg-indigo-500/5 transition-all text-left group shadow-sm hover:shadow-xl"
                    >
                       <div className="text-indigo-600 dark:text-indigo-400 p-2 bg-indigo-500/5 rounded-lg group-hover:scale-110 transition-transform">
                          {item.icon}
                       </div>
                       <span className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Success Hub */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-4">
                  <div className="w-1.5 h-6 bg-zinc-900 dark:bg-white rounded-full"></div>
                  <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Student Hub</span>
                </div>
                <div className="flex flex-col gap-2">
                   {STUDENT_HUB.map(item => (
                     <Link 
                        key={item.id} 
                        href={ROUTES[item.id]}
                        onClick={handleNav}
                        className={`flex items-center gap-5 p-4 rounded-2xl transition-all ${item.id === 'admissions' ? 'bg-indigo-600 text-white shadow-lg font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 hover:bg-zinc-50 dark:hover:bg-white/5'}`}
                     >
                        <div className={item.id === 'admissions' ? 'text-white' : 'text-zinc-400'}>{item.icon}</div>
                        <span className="text-base font-medium tracking-tight">{item.label}</span>
                     </Link>
                   ))}
                </div>
              </div>

              {/* Column 4: Institutional & Branding */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-4">
                  <div className="w-1.5 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                  <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">About Wings</span>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                   {INSTITUTIONAL.map(item => (
                     <Link 
                        key={item.id} 
                        href={ROUTES[item.id]}
                        onClick={handleNav}
                        className="flex items-center gap-3 text-left group"
                     >
                        <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-indigo-500 group-hover:scale-150 transition-all"></div>
                        <span className="text-base font-medium tracking-tight text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                     </Link>
                   ))}
                </div>
                
                <div className="mt-12 flex flex-col items-center md:items-start group/identity">
                   <div className="space-y-3 text-center md:text-left">
                      <p className="text-xl font-display font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                         Best Aviation & Hospitality<br/>Training Institute in Gujarat
                      </p>
                      <p className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Subsidiary of EEC-Enbee Education Center Pvt. Ltd.</p>
                   </div>
                   
                   <Link href="/contact-us" onClick={handleNav} className="mt-5 lg:mt-10 flex items-center gap-4 p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 shadow-sm cursor-pointer" >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center ">
                        <Image src="/images/wings-logo.png" alt="Wings Institute - Aviation and Hospitality Training Vadodara Gujarat" width={48} height={48} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">Est. 2008</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mt-1">Oldest in Gujarat</span>
                      </div>
                   </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- GLOBAL ACTION DOCK --- */}
        <div className="bg-zinc-50/80 dark:bg-zinc-900/50 border-t border-zinc-200/50 dark:border-white/5 p-4  shrink-0 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 lg:gap-10">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
               <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">2026 Admission Open</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <a href="tel:+918758754444" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Icons.Phone className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Call Now for Scholarship</span>
                    <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter group-hover:text-indigo-600 transition-colors">+91 875 875 4444</span>
                  </div>
               </a>
               <p className="hidden lg:block text-xs font-bold text-zinc-400 dark:text-zinc-600 tracking-tight uppercase">Wings Institute HQ Vadodara</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
