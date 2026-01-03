'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FAQSection } from '@/components/FAQSection';
import { AdmissionsSEOContent } from '@/components/AdmissionsSEOContent';
import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { checkUserExists, registerUser, checkEmailExists } from '@/services/userService';
import { sendRegistrationNotificationEmailsUniversal } from '@/services/emailService';

export const AdmissionsPageClient: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';
  
  // Phone verification
  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [phoneStep, setPhoneStep] = useState<'idle' | 'pending' | 'verified'>('idle');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    highestQualification: '',
    interestedCourse: '',
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Scroll to form (guarded)
  const scrollToForm = () => {
    if (typeof window === 'undefined') return;
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ----------------------------
  // PHONE: SEND OTP
  // ----------------------------
  const handleSendPhoneOtp = async () => {
    const phoneDigits = phoneValue.replace(/\D/g, '');
    
    if (phoneDigits.length !== 10) {
      setPhoneError(t('adm.error_phone_invalid'));
      setPhoneState('IDLE');
      return;
    }

    const fullPhone = "+91" + phoneDigits;
    setError(null);
    setPhoneError(null);
    setPhoneOtpError(null);
    setPhoneState('SENDING');
    setIsSendingPhoneOtp(true);

    try {
      const result = await sendOtpMSG91(fullPhone);

      if (result) {
        setPhoneState('SENT');
        setPhoneStep("pending");
        setCountdown(60);
      } else {
        setPhoneError(t('adm.error_otp_send'));
        setPhoneState('IDLE');
      }
    } catch (err) {
      setPhoneError(t('adm.error_otp_send'));
      setPhoneState('IDLE');
    }

    setIsSendingPhoneOtp(false);
  };

  // ----------------------------
  // PHONE: VERIFY OTP
  // ----------------------------
  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      setPhoneOtpError(t('adm.error_otp_enter'));
      return;
    }

    setPhoneOtpError(null);
    setIsVerifyingPhoneOtp(true);

    const phoneDigits = phoneValue.replace(/\D/g, '');
    const fullPhone = "+91" + phoneDigits;

    try {
      const result = await verifyOtpMSG91(fullPhone, phoneOtp);

      if (result.type === "success" || result.message?.toLowerCase().includes("verified")) {
        setPhoneState('VERIFIED');
        setPhoneStep("verified");
        setFormData(prev => ({ ...prev, phone: phoneDigits }));
      } else {
        setPhoneOtpError(t('adm.error_otp_invalid'));
        setPhoneOtp("");
      }
    } catch (err) {
      setPhoneOtpError(t('adm.error_otp_verify'));
    }

    setIsVerifyingPhoneOtp(false);
  };

  // Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);
    setEmailError(null);

    try {
      // Validate phone is verified
      if (phoneState !== 'VERIFIED') {
        setError(t('adm.error_verify_first'));
        setIsRegistering(false);
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.email || !formData.dateOfBirth || !formData.highestQualification || !formData.interestedCourse) {
        setError(t('adm.error_fill_fields'));
        setIsRegistering(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setEmailError(t('adm.error_email_invalid'));
        setIsRegistering(false);
        return;
      }

      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setEmailError(t('adm.error_email_exists'));
        setIsRegistering(false);
        return;
      }

      // Ensure all required fields are included in the data being sent to Firebase
      const userDataToSave = {
        ...formData,
      };
      
      const result = await registerUser(userDataToSave);

      if (result === "EXISTS") {
        setEmailError(t('adm.error_email_exists'));
        setIsRegistering(false);
        return;
      }

      if (result === "ERROR") {
        setError(t('adm.error_generic'));
        setIsRegistering(false);
        return;
      }

      // Store user email in localStorage for tracking (guarded)
      if (typeof window !== 'undefined') {
        localStorage.setItem('f1VisaUserEmail', formData.email);
      }

      // Send registration notification emails to admins and branch counselors (if branch selected)
      try {
        await sendRegistrationNotificationEmailsUniversal(userDataToSave);
      } catch (emailError) {
        // Don't block registration if email fails
        console.error('Failed to send registration email:', emailError);
      }

      // Show success message or redirect
      alert(t('adm.success'));
      // Reset form
      setFormData({
        name: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        highestQualification: '',
        interestedCourse: '',
      });
      setPhoneValue('');
      setPhoneState('IDLE');
      setPhoneOtp('');

    } catch (err) {
      setError(t('adm.error_generic'));
      console.error('Registration error:', err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <section className="px-6 mb-24 lg:mb-32 relative">
        <div className="max-w-7xl mx-auto text-center">

          <div className="flex flex-col lg:flex-row items-center  justify-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-panel border-indigo-500/30  animate-fade-in-up shadow-md bg-white/60 dark:bg-black/40">
              <Icons.ClipboardList className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className={`text-sm text-indigo-700 dark:text-indigo-300 uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.badge')}</span>
            </div>

            {/* Language Toggle */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2  animate-fade-in-up">
              <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('hero.translate') || 'Translate'}
              </label>
              <LanguageToggle isHomepage={true} />
            </div>
          </div>
          
          <h1 className={`font-display text-5xl md:text-8xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-10 animate-fade-in-up [animation-delay:200ms] ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600 pr-2">
              {t('adm.title')}
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 italic pr-2">
              {t('adm.title_accent')}
            </span>
          </h1>
          
          <p className={`text-2xl md:text-3xl text-zinc-900 dark:text-white max-w-3xl mx-auto mb-12 animate-fade-in-up [animation-delay:400ms] font-medium ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
            {t('adm.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:500ms] mb-16">
             <button onClick={scrollToForm} className={`px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black text-xl shadow-2xl hover:-translate-y-1 transition-transform w-full sm:w-auto flex items-center justify-center gap-3 uppercase ${isVernacular ? 'tracking-normal' : 'tracking-tight'}`}>
                {t('adm.btn_apply')} <Icons.ArrowRight className="w-6 h-6" />
             </button>
             <a 
                href="/Wings-Brochure-English-2025.pdf" 
                download="Wings-Brochure-English-2025.pdf"
                className={`px-10 py-6 glass-panel rounded-full font-black text-xl text-zinc-900 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 w-full sm:w-auto group border-2 border-zinc-200 dark:border-white/10 shadow-lg ${isVernacular ? 'tracking-normal' : ''}`}
             >
                <Icons.Download className="w-6 h-6 text-indigo-600 group-hover:translate-y-1 transition-transform" />
                {t('adm.btn_brochure')}
             </a>
          </div>
        </div>
      </section>


       {/* Process Steps */}
      <section className="px-6 mb-24 lg:mb-32 animate-fade-in-up [animation-delay:600ms]">
         <div className="max-w-7xl mx-auto">
            <h2 className={`font-display text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-16 text-center ${isVernacular ? 'leading-[1.2]' : ''}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600">
                {t('adm.process')}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 relative">
               <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 z-0"></div>

               <div className="glass-panel p-8 lg:p-10 rounded-[2.5rem] relative z-10 hover:-translate-y-2 transition-all duration-500 shadow-xl bg-white/90 dark:bg-zinc-900/90 border border-white/60 dark:border-white/10">
                  <div className="w-24 h-24 bg-zinc-900 dark:bg-white rounded-full border-8 border-indigo-500/20 flex items-center justify-center text-white dark:text-zinc-900 mb-8 mx-auto shadow-2xl">
                     <Icons.UserCheck className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                     <div className={`text-indigo-600 dark:text-indigo-400 uppercase text-xs mb-4 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.3em]'}`}>{t('adm.stage')} 01</div>
                     <h3 className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'font-extrabold tracking-normal leading-[1.3]' : 'font-black tracking-tight'}`}>{t('adm.step1')}</h3>
                     <p className={`text-base text-zinc-900 dark:text-white font-medium ${isVernacular ? 'leading-[1.7]' : 'leading-relaxed'}`}>
                        {t('adm.step1_desc')}
                     </p>
                  </div>
               </div>

               <div className="glass-panel p-8 lg:p-10 rounded-[2.5rem] relative z-10 hover:-translate-y-2 transition-all duration-500 shadow-xl bg-white/90 dark:bg-zinc-900/90 border border-white/60 dark:border-white/10">
                  <div className="w-24 h-24 bg-zinc-900 dark:bg-white rounded-full border-8 border-indigo-500/20 flex items-center justify-center text-white dark:text-zinc-900 mb-8 mx-auto shadow-2xl">
                     <Icons.FileText className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                     <div className={`text-indigo-600 dark:text-indigo-400 uppercase text-xs mb-4 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.3em]'}`}>{t('adm.stage')} 02</div>
                     <h3 className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'font-extrabold tracking-normal leading-[1.3]' : 'font-black tracking-tight'}`}>{t('adm.step2')}</h3>
                     <p className={`text-base text-zinc-900 dark:text-white font-medium ${isVernacular ? 'leading-[1.7]' : 'leading-relaxed'}`}>
                        {t('adm.step2_desc')}
                     </p>
                  </div>
               </div>

               <div className="glass-panel p-8 lg:p-10 rounded-[2.5rem] relative z-10 hover:-translate-y-2 transition-all duration-500 shadow-xl bg-white/90 dark:bg-zinc-900/90 border border-white/60 dark:border-white/10">
                  <div className="w-24 h-24 bg-zinc-900 dark:bg-white rounded-full border-8 border-indigo-500/20 flex items-center justify-center text-white dark:text-zinc-900 mb-8 mx-auto shadow-2xl">
                     <Icons.ScanFace className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                     <div className={`text-indigo-600 dark:text-indigo-400 uppercase text-xs mb-4 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.3em]'}`}>{t('adm.stage')} 03</div>
                     <h3 className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'font-extrabold tracking-normal leading-[1.3]' : 'font-black tracking-tight'}`}>{t('adm.step3')}</h3>
                     <p className={`text-base text-zinc-900 dark:text-white font-medium ${isVernacular ? 'leading-[1.7]' : 'leading-relaxed'}`}>
                        {t('adm.step3_desc')}
                     </p>
                  </div>
               </div>

               <div className="glass-panel p-8 lg:p-10 rounded-[2.5rem] relative z-10 hover:-translate-y-2 transition-all duration-500 shadow-xl bg-white/90 dark:bg-zinc-900/90 border border-white/60 dark:border-white/10">
                  <div className="w-24 h-24 bg-zinc-900 dark:bg-white rounded-full border-8 border-indigo-500/20 flex items-center justify-center text-white dark:text-zinc-900 mb-8 mx-auto shadow-2xl">
                     <Icons.Award className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                     <div className={`text-indigo-600 dark:text-indigo-400 uppercase text-xs mb-4 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.3em]'}`}>{t('adm.stage')} 04</div>
                     <h3 className={`text-xl md:text-2xl text-zinc-900 dark:text-white mb-4 ${isVernacular ? 'font-extrabold tracking-normal leading-[1.3]' : 'font-black tracking-tight'}`}>{t('adm.step4')}</h3>
                     <p className={`text-base text-zinc-900 dark:text-white font-medium ${isVernacular ? 'leading-[1.7]' : 'leading-relaxed'}`}>
                        {t('adm.step4_desc')}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

       {/* Form Section */}
       <section id="application-form" className="px-6 pb-20 lg:pb-32 animate-fade-in-up [animation-delay:800ms]">
         <div className="max-w-5xl mx-auto glass-panel rounded-[3.5rem] p-9 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white/60 dark:border-white/20 relative overflow-hidden bg-white/90 dark:bg-zinc-950 backdrop-blur-3xl">
             
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

             <div className="text-center mb-16">
               <h3 className={`font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('adm.form_title')}</h3>
               <p className={`text-xl text-zinc-900 dark:text-white font-medium max-w-2xl mx-auto opacity-80 ${isVernacular ? 'leading-[1.7]' : ''}`}>{t('adm.form_subtitle')}</p>
             </div>

             <form className="space-y-10" onSubmit={handleRegister}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                   <div className="space-y-3">
                      <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_name')}</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-lg font-bold" 
                        placeholder={t('adm.placeholder_name')} 
                        required
                      />
                   </div>
                   <div className="space-y-3 flex flex-col items-start justify-center">
                      <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_dob')}</label>
                      <input 
                        type="date" 
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="w-auto  px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-lg font-bold" 
                        required
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                   <div className="space-y-3">
                      <label className={`text-md  uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_phone')}</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <input 
                            type="tel" 
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            disabled={phoneState === 'VERIFIED'}
                            className="w-full px-8 py-3 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-lg font-bold disabled:opacity-50" 
                            placeholder={t('adm.placeholder_phone')} 
                          />
                          {phoneState === 'VERIFIED' && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500">
                              <Icons.CheckCircle2 className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        {phoneState !== 'VERIFIED' && (
                          <button 
                            type="button"
                            onClick={handleSendPhoneOtp}
                            disabled={phoneState === 'SENDING' || countdown > 0}
                            className={`px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 uppercase text-[14px] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-w-[120px] ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}
                          >
                            {phoneState === 'SENDING' ? <Icons.Loader2 className="w-5 h-5 animate-spin mx-auto" /> : countdown > 0 ? `${t('adm.btn_resend')} (${countdown}s)` : phoneState === 'SENT' ? t('adm.btn_resend') : t('adm.btn_send_otp')}
                          </button>
                        )}
                      </div>
                      {phoneError && (
                        <p className={`text-red-500 text-sm mt-2 font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{phoneError}</p>
                      )}

                      {phoneState === 'SENT' && (
                        <div className="flex flex-col md:flex-row gap-4 mt-4 animate-slide-down">
                          <input 
                            type="text" 
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                            className="flex-1 px-8 py-3 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-mono font-black text-center tracking-[0.5em] text-lg" 
                            placeholder="000000"
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            onClick={handleVerifyPhoneOtp}
                            disabled={isVerifyingPhoneOtp}
                            className={`px-10 py-3 rounded-2xl bg-indigo-600 text-white uppercase text-[14px] shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}
                          >
                            {isVerifyingPhoneOtp ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : t('adm.btn_verify')}
                          </button>
                        </div>
                      )}
                      {phoneOtpError && (
                        <p className={`text-red-500 text-sm mt-2 font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{phoneOtpError}</p>
                      )}
                   </div>
                   <div className="space-y-3">
                      <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_email')}</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-lg font-bold" 
                        placeholder={t('adm.placeholder_email')} 
                        required
                      />
                      {emailError && (
                        <p className={`text-red-500 text-sm mt-2 font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{emailError}</p>
                      )}
                   </div>
                </div>

                <div className="space-y-3">
                   <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_qualification')}</label>
                   <select 
                     value={formData.highestQualification}
                     onChange={(e) => setFormData(prev => ({ ...prev, highestQualification: e.target.value }))}
                     className="w-full px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20  focus:border-indigo-500 outline-none transition-all text-lg font-bold cursor-pointer appearance-none"
                     required
                   >
                      <option value="">{t('adm.select_qualification')}</option>
                      <option value="10th Pass">{t('adm.qual_10th')}</option>
                      <option value="12th Appearing">{t('adm.qual_12th_appearing')}</option>
                      <option value="12th Pass">{t('adm.qual_12th_pass')}</option>
                      <option value="Graduate Appearing">{t('adm.qual_grad_appearing')}</option>
                      <option value="Graduate">{t('adm.qual_grad')}</option>
                   </select>
                </div>

                <div className="space-y-6">
                   <label className={`text-md uppercase text-zinc-900 dark:text-white block mb-2 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-[0.2em]'}`}>{t('adm.label_course')}</label>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { value: 'Air Hostess / Cabin Crew', label: t('adm.course_cabin') },
                        { value: 'Airport Management', label: t('adm.course_airport') },
                        { value: 'Hotel Management', label: t('adm.course_hotel') },
                        { value: 'Culinary Arts', label: t('adm.course_culinary') },
                        { value: 'Travel & Tourism', label: t('adm.course_travel') }
                      ].map(course => {
                        const isChecked = formData.interestedCourse === course.value;
                        return (
                          <label
                            key={course.value}
                            className="flex items-center gap-5 p-6 rounded-2xl border-2 border-zinc-100 dark:border-white/10 cursor-pointer hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all group shadow-sm active:scale-95"
                          >
                            {/* Custom Radio Circle with blue dot when checked */}
                            <span className="relative flex items-center justify-center">
                              <input
                                type="radio"
                                name="course"
                                value={course.value}
                                checked={isChecked}
                                onChange={e =>
                                  setFormData(prev => ({ ...prev, interestedCourse: e.target.value }))
                                }
                                className="w-5 h-5 appearance-none rounded-full border-2 border-zinc-400 group-hover:border-indigo-500 checked:border-indigo-600 checked:shadow-[0_0_0_3px_rgba(79,70,229,0.15)] focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                required
                              />
                              {isChecked && (
                                <span className="absolute left-1/2 top-1/2 w-2 h-2 bg-indigo-600 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                              )}
                            </span>
                            <span
                              className={`text-lg ${
                                isVernacular
                                  ? 'font-extrabold tracking-normal'
                                  : 'font-black tracking-tight'
                              }`}
                            >
                              {course.label}
                            </span>
                          </label>
                        );
                      })}
                    
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={phoneState !== 'VERIFIED' || isRegistering}
                  className={`w-full py-7 rounded-2xl font-black text-xl md:text-lg lg:text-2xl transition-all flex items-center justify-center gap-2 mt-12 uppercase ${isVernacular ? 'tracking-normal' : 'tracking-tight'} ${phoneState === 'VERIFIED' && !isRegistering ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_20px_50px_-10px_rgba(79,70,229,0.4)] hover:-translate-y-1' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
                >
                  {isRegistering ? (
                    <>
                      <Icons.Loader2 className="w-8 h-8 animate-spin" />
                      {t('adm.submitting')}
                    </>
                  ) : (
                    <>
                      {t('adm.btn_submit')} <Icons.ArrowRight className={`w-8 h-8 text-zinc-600 dark:text-white ${phoneState === 'VERIFIED' ? '' : 'opacity-50'}`} />
                    </>
                  )}
                </button>
                {error && (
                  <p className={`text-red-500 text-sm mt-4 font-medium text-center ${isVernacular ? 'leading-[1.6]' : ''}`}>{error}</p>
                )}
             </form>
         </div>
      </section>


      <FAQSection 
        title={t('adm.faq_title')}
        color="blue"
        schemaId="admissions-quick-faq"
        data={[
          { q: t('adm.faq_q1'), a: t('adm.faq_a1') },
          { q: t('adm.faq_q2'), a: t('adm.faq_a2') },
          { q: t('adm.faq_q3'), a: t('adm.faq_a3') },
          { q: t('adm.faq_q4'), a: t('adm.faq_a4') }
        ]}
      />

      {/* SEO Content Module */}
      <AdmissionsSEOContent />
    </div>
  );
};

