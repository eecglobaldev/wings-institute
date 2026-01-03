'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { saveFranchiseApplication } from '@/services/userService';
import { sendFranchiseApplicationEmails } from '@/services/emailService';
import { FranchiseSEOContent } from '@/components/FranchiseSEOContent';
import { LanguageToggle } from '@/components';

export const FranchisePageClient: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t, language } = useLanguage();
  
  // Larger label text for Hindi and Gujarati
  const labelClass = `${language === 'hi' || language === 'gu' ? 'text-md' : 'text-xs'} font-bold uppercase tracking-wider text-zinc-500 leading-relaxed`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Phone verification state
  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    cityState: '',
    phone: '',
    email: '',
    investmentCapacity: '',
    businessExperience: '',
  });

  // Scroll to form (guarded)
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById('franchise-form');
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSendOtp = async () => {
   // Extract digits from phoneValue (remove +91 or any non-digit characters)
   const phoneDigits = phoneValue.replace(/\D/g, '');
   
   if (phoneDigits.length !== 10) {
     setPhoneError(t('fran.error_phone'));
     setPhoneState('IDLE');
     return;
   }

   const fullPhone = "+91" + phoneDigits;
   setPhoneError(null);
   setPhoneOtpError(null);
   setPhoneState('SENDING');
   setIsSendingPhoneOtp(true);

   try {
     const result = await sendOtpMSG91(fullPhone);

     if (result) {
       setPhoneState('SENT');
     } else {
       setPhoneError(t('fran.error_otp_send'));
       setPhoneState('IDLE');
     }
   } catch (err) {
     setPhoneError(t('fran.error_otp_send'));
     setPhoneState('IDLE');
   }

   setIsSendingPhoneOtp(false);
 };

 const handleVerifyOtp = async () => {
   if (phoneOtp.length !== 6) {
     setPhoneOtpError(t('fran.error_otp'));
     return;
   }

   setPhoneOtpError(null);
   setIsVerifyingPhoneOtp(true);

   // Extract digits from phoneValue (remove +91 or any non-digit characters)
   const phoneDigits = phoneValue.replace(/\D/g, '');
   const fullPhone = "+91" + phoneDigits;

   try {
     const result = await verifyOtpMSG91(fullPhone, phoneOtp);

     if (result.type === "success" || result.message?.toLowerCase().includes("verified")) {
       setPhoneState('VERIFIED');
       // Sync phoneValue to formData.phone when verified
       setFormData(prev => ({ ...prev, phone: phoneDigits }));
     } else {
       setPhoneOtpError(t('fran.error_otp_invalid'));
       setPhoneOtp("");
     }
   } catch (err) {
     setPhoneOtpError(t('fran.error_otp_verify'));
   }

   setIsVerifyingPhoneOtp(false);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   setError(null);
   setSuccess(false);

   try {
     // Validate phone is verified
     if (phoneState !== 'VERIFIED') {
       setError(t('fran.error_verify_first'));
       setIsSubmitting(false);
       return;
     }

     // Validate required fields
     if (!formData.name || !formData.cityState || !formData.email || !formData.investmentCapacity) {
       setError(t('fran.error_required'));
       setIsSubmitting(false);
       return;
     }

     // Validate email format
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(formData.email)) {
       setError(t('fran.error_email'));
       setIsSubmitting(false);
       return;
     }

     // Prepare application data
     const applicationData = {
       name: formData.name,
       cityState: formData.cityState,
       phone: formData.phone, // Already synced when verified
       email: formData.email,
       investmentCapacity: formData.investmentCapacity,
       businessExperience: formData.businessExperience || '',
     };

     // Save to Firebase
     const result = await saveFranchiseApplication(applicationData);

     if (result === "ERROR") {
       setError(t('fran.error_generic'));
       setIsSubmitting(false);
       return;
     }

     // Send email notification
     try {
       await sendFranchiseApplicationEmails(applicationData);
     } catch (emailError) {
       // Don't block submission if email fails
       console.error('Failed to send franchise application email:', emailError);
     }

     // Show success message and reset form
     setSuccess(true);
     setFormData({
       name: '',
       cityState: '',
       phone: '',
       email: '',
       investmentCapacity: '',
       businessExperience: '',
     });
     setPhoneValue('');
     setPhoneState('IDLE');
     setPhoneOtp('');

   } catch (err) {
     setError(t('fran.error_generic'));
     console.error('Franchise application submission error:', err);
   } finally {
     setIsSubmitting(false);
   }
 };

  const faqs = [
    { q: t('fran.faq1_q'), a: t('fran.faq1_a') },
    { q: t('fran.faq2_q'), a: t('fran.faq2_a') },
    { q: t('fran.faq3_q'), a: t('fran.faq3_a') },
    { q: t('fran.faq4_q'), a: t('fran.faq4_a') },
    { q: t('fran.faq5_q'), a: t('fran.faq5_a') },
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Premium Background Ambience - Gold/Platinum Theme */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-zinc-500/10 rounded-full blur-[120px] animate-blob"></div>
      </div>

      {/* Hero Section */}
      <section className="px-6 mb-24 relative">
        <div className="max-w-7xl mx-auto text-center">

        <div className="flex flex-col lg:flex-row items-center  justify-center gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border-amber-500/30 animate-fade-in-up shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Icons.Gem className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-relaxed">{t('fran.badge')}</span>
          </div>

          
           {/* Language Toggle */}
           <div className="flex flex-col lg:flex-row items-center lg:items-center animate-fade-in-up gap-2 ">
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t('hero.translate') || 'Translate'}
            </label>
            <LanguageToggle isHomepage={true} />
          </div>
          </div>
          
          <h1 className="font-display text-5xl md:text-8xl font-black text-zinc-900 dark:text-white leading-[1.1] md:leading-[0.95] tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms]">
            {t('fran.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 animate-shimmer bg-[length:200%_auto] italic">
              {t('fran.title_accent')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed md:leading-[1.8] mb-12 animate-fade-in-up [animation-delay:400ms]">
            {t('fran.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
             <a href="#franchise-form" onClick={scrollToForm} className="px-10 py-5 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 text-white dark:text-zinc-900 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 leading-relaxed">
                {t('fran.become_partner')} <Icons.ArrowRight className="w-5 h-5" />
             </a>
             <div className="flex items-center gap-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 leading-relaxed"><Icons.CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {t('fran.high_roi')}</span>
                <span className="flex items-center gap-1.5 leading-relaxed"><Icons.CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {t('fran.proven_model')}</span>
             </div>
          </div>
        </div>
      </section>

      {/* The Market Opportunity (Data Driven) */}
      <section className="px-6 mb-32">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1 relative">
                  {/* Glass Stats Grid */}
                  <div className="glass-panel p-8 rounded-[40px] border-amber-500/20 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
                     
                     <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-zinc-200 dark:border-white/5">
                           <div className="text-4xl font-display font-bold text-zinc-900 dark:text-white mb-2">220+</div>
                           <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold leading-relaxed">{t('fran.new_airports')}</div>
                        </div>
                        <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-zinc-200 dark:border-white/5">
                           <div className="text-4xl font-display font-bold text-zinc-900 dark:text-white mb-2">10k+</div>
                           <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold leading-relaxed">{t('fran.crew_jobs_year')}</div>
                        </div>
                        <div className="col-span-2 p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white shadow-lg">
                           <div className="flex items-center gap-3 mb-3">
                              <Icons.TrendingUp className="w-6 h-6 shrink-0" />
                              <span className="text-lg font-bold leading-relaxed">{t('fran.industry_growth')}</span>
                           </div>
                           <p className="text-white/90 text-sm leading-relaxed md:leading-[1.8]">{t('fran.industry_growth_desc')}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="order-1 md:order-2">
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-[1.15] md:leading-[1.1]">
                     {t('fran.market_title')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">{t('fran.market_accent')}</span>
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed md:leading-[1.9] mb-8">
                     {t('fran.market_desc')}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* The Unfair Advantage (AI) */}
      <section className="px-6 mb-32">
         <div className="max-w-7xl mx-auto glass-panel bg-zinc-900 dark:bg-black rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-wings-red/20 rounded-full blur-[120px] animate-pulse"></div>

            <div className="relative z-10 text-center max-w-5xl mx-auto">
               <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6 leading-relaxed">
                  {t('fran.ai_advantage')}
               </div>
               <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-[1.15] md:leading-[1.1]">
                  {t('fran.ai_title')} <br/> <span className="text-wings-red italic">{t('fran.ai_accent')}</span>
               </h2>
               <p className="text-zinc-400 text-lg mb-12 leading-relaxed md:leading-[1.9]">
                  {t('fran.ai_desc')}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Tool 1 */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center">
                     <Icons.FileText className="w-10 h-10 text-emerald-400 mb-4" />
                     <h3 className="font-bold mb-2 leading-relaxed">{t('ai.resume_title')}</h3>
                     <p className="text-xs text-zinc-400 leading-relaxed">{t('fran.resume_desc')}</p>
                  </div>
                  {/* Tool 2 */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center">
                     <Icons.Bot className="w-10 h-10 text-wings-red mb-4" />
                     <h3 className="font-bold mb-2 leading-relaxed">{t('ai.interview_title')}</h3>
                     <p className="text-xs text-zinc-400 leading-relaxed">{t('fran.interview_desc')}</p>
                  </div>
                  {/* Tool 3 */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center">
                     <Icons.Radio className="w-10 h-10 text-purple-400 mb-4" />
                     <h3 className="font-bold mb-2 leading-relaxed">{t('ai.voice_title')}</h3>
                     <p className="text-xs text-zinc-400 leading-relaxed">{t('fran.voice_desc')}</p>
                  </div>
                  {/* Tool 4 */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center">
                     <Icons.Gamepad2 className="w-10 h-10 text-amber-400 mb-4" />
                     <h3 className="font-bold mb-2 leading-relaxed">{t('ai.quest_title')}</h3>
                     <p className="text-xs text-zinc-400 leading-relaxed">{t('fran.quest_desc')}</p>
                  </div>
                  {/* Tool 5 */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center">
                     <Icons.Compass className="w-10 h-10 text-blue-400 mb-4" />
                     <h3 className="font-bold mb-2 leading-relaxed">{t('ai.nav_title')}</h3>
                     <p className="text-xs text-zinc-400 leading-relaxed">{t('fran.nav_desc')}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Franchise In A Box */}
      <section className="px-6 mb-32">
         <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-zinc-900 dark:text-white mb-16 leading-[1.15] md:leading-[1.1]">
               {t('fran.box_title')} <span className="italic text-zinc-400">{t('fran.box_subtitle')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                     <Icons.BookOpenCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-relaxed">{t('fran.curriculum_title')}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.8]">
                     {t('fran.curriculum_desc')}
                  </p>
               </div>

               <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                     <Icons.Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-relaxed">{t('fran.hiring_title')}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.8]">
                     {t('fran.hiring_desc')}
                  </p>
               </div>

               <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 bg-wings-red/10 rounded-2xl flex items-center justify-center text-wings-red mb-6">
                     <Icons.Rocket className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-relaxed">{t('fran.marketing_title')}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.8]">
                     {t('fran.marketing_desc')}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 mb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-zinc-900 dark:text-white mb-16 leading-[1.15]">
             {t('fran.faq_title')} <span className="text-amber-500">{t('fran.faq_accent')}</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className={`glass-panel p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${openFaq === idx ? 'border-amber-500/30 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/10 hover:border-amber-500/20'}`}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className={`font-bold text-lg pr-4 leading-relaxed md:leading-[1.7] ${openFaq === idx ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {faq.q}
                  </h3>
                  <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180 bg-amber-500 text-white' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500'}`}>
                     <Icons.ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.9] border-t border-dashed border-zinc-200 dark:border-white/10 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="franchise-form" className="px-6 pb-24">
         <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-[40px] shadow-2xl border border-amber-500/20 relative overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
             
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

             <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-4 leading-relaxed">
                  {t('fran.form_badge')}
               </div>
               <h3 className="font-display text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-relaxed">{t('fran.form_title')}</h3>
               <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed md:leading-[1.8]">{t('fran.form_desc')}</p>
             </div>

             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className={labelClass}>{t('fran.label_name')}</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all" 
                        placeholder={t('fran.placeholder_name')} 
                        required
                      />
                   </div>
                   <div className="space-y-2">
                      <label className={labelClass}>{t('fran.label_city')}</label>
                      <input 
                        type="text" 
                        value={formData.cityState}
                        onChange={(e) => setFormData(prev => ({ ...prev, cityState: e.target.value }))}
                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all" 
                        placeholder={t('fran.placeholder_city')} 
                        required
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className={labelClass}>{t('fran.label_phone')}</label>
                      <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                          <input 
                            type="tel" 
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            disabled={phoneState === 'VERIFIED'}
                            className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all disabled:opacity-50" 
                            placeholder={t('fran.placeholder_phone')} 
                          />
                          {phoneState === 'VERIFIED' && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                              <Icons.CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        {phoneState !== 'VERIFIED' && (
                          <button 
                            type="button"
                            onClick={handleSendOtp}
                            disabled={phoneState === 'SENDING' || isSendingPhoneOtp}
                            className="px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase text-[14px] tracking-widest shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-w-[100px] leading-relaxed"
                          >
                            {phoneState === 'SENDING' || isSendingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin mx-auto" /> : phoneState === 'SENT' ? t('fran.btn_resend') : t('fran.btn_send_otp')}
                          </button>
                        )}
                      </div>
                      {phoneError && (
                        <p className="text-red-500 text-xs mt-1 font-bold leading-relaxed">{phoneError}</p>
                      )}

                      {phoneState === 'SENT' && (
                        <div className="flex flex-col md:flex-row gap-3 mt-3 animate-slide-down">
                          <input 
                            type="text" 
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                            className="flex-1 px-4 py-4 rounded-xl bg-white dark:bg-zinc-800 border-2 border-amber-500 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all font-mono font-bold text-center tracking-[0.5em] text-base" 
                            placeholder="000000"
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingPhoneOtp}
                            className="px-6 py-3 rounded-xl bg-amber-600 text-white font-bold uppercase text-[14px] tracking-widest shadow-lg hover:bg-amber-700 transition-all disabled:opacity-50 leading-relaxed"
                          >
                            {isVerifyingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : t('fran.btn_verify')}
                          </button>
                        </div>
                      )}
                      {phoneOtpError && (
                        <p className="text-red-500 text-xs mt-1 font-bold leading-relaxed">{phoneOtpError}</p>
                      )}
                   </div>
                   <div className="space-y-2">
                      <label className={labelClass}>{t('fran.label_email')}</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all" 
                        placeholder={t('fran.placeholder_email')} 
                        required
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>{t('fran.label_investment')}</label>
                   <select 
                     value={formData.investmentCapacity}
                     onChange={(e) => setFormData(prev => ({ ...prev, investmentCapacity: e.target.value }))}
                     className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all cursor-pointer"
                     required
                   >
                      <option value="">{t('fran.select_readiness')}</option>
                      <option value="Exploring Options">{t('fran.option_exploring')}</option>
                      <option value="Ready to Invest">{t('fran.option_ready')}</option>
                      <option value="Immediate Start">{t('fran.option_immediate')}</option>
                      <option value="Need Financing">{t('fran.option_financing')}</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>{t('fran.label_experience')}</label>
                   <textarea 
                     rows={3} 
                     value={formData.businessExperience}
                     onChange={(e) => setFormData(prev => ({ ...prev, businessExperience: e.target.value }))}
                     className="w-full px-4 py-4 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all resize-none leading-relaxed" 
                     placeholder={t('fran.placeholder_experience')}
                   ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-bold leading-relaxed">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-sm font-bold leading-relaxed">{t('fran.success_message')}</p>
                )}

                <button 
                  type="submit"
                  disabled={phoneState !== 'VERIFIED' || isSubmitting}
                  className={`w-full bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 text-white dark:text-zinc-900 py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mt-8 leading-relaxed ${phoneState === 'VERIFIED' && !isSubmitting ? '' : 'opacity-50 cursor-not-allowed'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Icons.Loader2 className="w-5 h-5 animate-spin" />
                      {t('fran.btn_submitting')}
                    </>
                  ) : (
                    <>
                      {t('fran.btn_submit')} <Icons.Handshake className="w-5 h-5" />
                    </>
                  )}
                </button>
             </form>
         </div>
      </section>

      {/* SEO Content Module - Franchise Partnership Guide */}
      <FranchiseSEOContent />

    </div>
  );
};

