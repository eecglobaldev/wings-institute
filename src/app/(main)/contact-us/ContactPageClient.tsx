'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ContactSEOContent } from '@/components/ContactSEOContent';
// Note: These services remain client-side as per migration plan
// They will be migrated to client-side service layer in Phase 3.5
import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { saveQuickInquiry } from '@/services/userService';
import { sendQuickInquiryEmails } from '@/services/emailService';

export function ContactPageClient() {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';
  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSendOtp = async () => {
    const phoneDigits = phoneValue.replace(/\D/g, '');
    
    if (phoneDigits.length !== 10) {
      setPhoneError(t('contact.error_phone'));
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
        setPhoneError(t('contact.error_otp_send'));
        setPhoneState('IDLE');
      }
    } catch (err) {
      setPhoneError(t('contact.error_otp_send'));
      setPhoneState('IDLE');
    }

    setIsSendingPhoneOtp(false);
  };

  const handleVerifyOtp = async () => {
    if (phoneOtp.length !== 6) {
      setPhoneOtpError(t('contact.error_otp_enter'));
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
        setFormData(prev => ({ ...prev, phone: phoneDigits }));
      } else {
        setPhoneOtpError(t('contact.error_otp_invalid'));
        setPhoneOtp("");
      }
    } catch (err) {
      setPhoneOtpError(t('contact.error_otp_verify'));
    }

    setIsVerifyingPhoneOtp(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (phoneState !== 'VERIFIED') {
        setError(t('contact.error_verify_first'));
        setIsSubmitting(false);
        return;
      }

      if (!formData.name || !formData.message) {
        setError(t('contact.error_fill_fields'));
        setIsSubmitting(false);
        return;
      }

      const inquiryData = {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      };

      const result = await saveQuickInquiry(inquiryData);

      if (result === "ERROR") {
        setError(t('contact.error_generic'));
        setIsSubmitting(false);
        return;
      }

      try {
        await sendQuickInquiryEmails(inquiryData);
      } catch (emailError) {
        console.error('Failed to send inquiry email:', emailError);
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        message: '',
      });
      setPhoneValue('');
      setPhoneState('IDLE');
      setPhoneOtp('');

    } catch (err) {
      setError(t('contact.error_generic'));
      console.error('Inquiry submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* Language Toggle */}
        <div className="flex flex-col lg:flex-row mb-3 items-center justify-center gap-4">
          <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {t('hero.translate') || 'Translate'}
          </label>
          <LanguageToggle isHomepage={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Info */}
          <div className="sticky top-32">
            <span className={`text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase mb-8 block ${isVernacular ? 'tracking-[0.1em]' : 'tracking-[0.3em]'}`}>{t('contact.badge')}</span>
            <h1 className={`font-display text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter mb-12 ${isVernacular ? 'leading-[1.1]' : 'leading-[0.9]'}`}>
              {t('contact.title')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wings-red to-orange-600 italic pr-2">
                {t('contact.title_accent')}
              </span>
            </h1>
            <p className={`text-2xl text-zinc-900 dark:text-white mb-16 max-w-md font-medium border-l-4 border-indigo-600 pl-8 ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="glass-panel p-10 rounded-[3rem] flex items-start gap-8 hover:-translate-y-2 transition-all duration-500 cursor-default group shadow-xl bg-white/80 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                  <Icons.MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className={`text-xl text-zinc-900 dark:text-white mb-3 uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{t('contact.visit')}</h3>
                  <p className={`text-zinc-900 dark:text-white text-lg font-bold opacity-80 ${isVernacular ? 'leading-[1.8]' : 'leading-relaxed'}`}>
                    <strong>{t('contact.hq')}</strong><br/>
                    {t('contact.address')}
                  </p>
                  <a href="https://www.google.com/maps/dir//2nd+floor,+RG+Square+14,+Nutan+Bharat+Society,+Alkapuri,+Vadodara,+Gujarat+390007" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm mt-6 hover:underline uppercase ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>
                    {t('contact.directions')} <Icons.ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3rem] flex items-start gap-8 hover:-translate-y-2 transition-all duration-500 cursor-pointer group shadow-xl bg-white/80 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                  <Icons.Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className={`text-xl text-zinc-900 dark:text-white mb-3 uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{t('contact.call')}</h3>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+918758754444" className="text-zinc-900 dark:text-white font-display text-2xl md:text-3xl font-black hover:text-indigo-600 transition-colors tracking-tighter">
                      +91 875 875 4444
                    </a>
                    <a href="tel:+919978986464" className="text-zinc-900 dark:text-white font-display text-2xl md:text-3xl font-black hover:text-indigo-600 transition-colors tracking-tighter">
                      +91 997 898 6464
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 lg:p-10 rounded-[3rem] flex items-start gap-4 hover:-translate-y-2 transition-all duration-500 cursor-pointer group shadow-xl bg-white/80 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                  <Icons.Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className={`text-xl text-zinc-900 dark:text-white mb-3 uppercase ${isVernacular ? 'font-extrabold tracking-normal' : 'font-black tracking-tight'}`}>{t('contact.email')}</h3>
                  <a href="mailto:info@wingsinstitute.com" className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors">
                    info@wingsinstitute.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="space-y-12">
            <div className="glass-panel p-2 rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/20 overflow-hidden h-[350px] relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7382.035471043882!2d73.170787!3d22.315169!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8b1d99d887b%3A0x72563e9ea9fe920f!2sWings%20Institute%20Air%20Hostess%20%26%20Hotel%20Management!5e0!3m2!1sen!2sin!4v1766752053425!5m2!1sen!2sin"
                title="Wings Institute Location Map"
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[3.2rem] w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </div>
            
            {/* Form */}
            <div className="glass-panel rounded-[3.5rem] p-10 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-white/60 dark:border-white/20 relative overflow-hidden bg-white/90 dark:bg-zinc-950 backdrop-blur-3xl">
              <h3 className={`font-display text-4xl font-bold text-zinc-900 dark:text-white mb-10 tracking-tight ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('contact.form_title')}</h3>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>{t('contact.label_name')}</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-lg" 
                    placeholder={t('contact.placeholder_name')} 
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>{t('contact.label_phone')}</label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <input 
                        type="tel" 
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        disabled={phoneState === 'VERIFIED'}
                        className="w-full px-8 py-3 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-lg disabled:opacity-50" 
                        placeholder={t('contact.placeholder_phone')} 
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
                        onClick={handleSendOtp}
                        disabled={phoneState === 'SENDING' || isSendingPhoneOtp}
                        className={`px-4 py-4 rounded-2xl bg-blue-600 dark:bg-white text-white dark:text-zinc-900 uppercase text-[14px] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-w-[70px] ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}
                      >
                        {phoneState === 'SENDING' || isSendingPhoneOtp ? <Icons.Loader2 className="w-5 h-5 animate-spin mx-auto" /> : phoneState === 'SENT' ? t('contact.btn_resend') : t('contact.btn_send_otp')}
                      </button>
                    )}
                  </div>
                  {phoneError && (
                    <p className={`text-red-500 text-sm mt-2 font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{phoneError}</p>
                  )}

                  {phoneState === 'SENT' && (
                    <div className="flex flex-col gap-4 mt-4 animate-slide-down">
                      <input 
                        type="text" 
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 px-8 py-5 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-mono font-black text-center tracking-[0.5em] text-lg" 
                        placeholder={t('contact.placeholder_otp')}
                        maxLength={6}
                      />
                      <button 
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingPhoneOtp}
                        className={`px-10 rounded-2xl h-10 bg-indigo-600 text-white uppercase text-[14px] shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}
                      >
                        {isVerifyingPhoneOtp ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : t('contact.btn_verify')}
                      </button>
                    </div>
                  )}
                  {phoneOtpError && (
                    <p className={`text-red-500 text-sm mt-2 font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{phoneOtpError}</p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <label className={`text-md uppercase text-zinc-900 dark:text-white ${isVernacular ? 'font-extrabold tracking-wide' : 'font-black tracking-widest'}`}>{t('contact.label_message')}</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-8 py-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border-2 border-zinc-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none font-bold text-lg" 
                    placeholder={t('contact.placeholder_message')}
                    required
                  ></textarea>
                </div>

                {error && (
                  <p className={`text-red-500 text-sm font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{error}</p>
                )}
                {success && (
                  <p className={`text-green-500 text-sm font-medium ${isVernacular ? 'leading-[1.6]' : ''}`}>{t('contact.success')}</p>
                )}

                <button 
                  type="submit"
                  disabled={phoneState !== 'VERIFIED' || isSubmitting}
                  className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-4 group mt-6 uppercase ${isVernacular ? 'tracking-normal' : 'tracking-tight'} ${phoneState === 'VERIFIED' && !isSubmitting ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xl hover:-translate-y-1' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Icons.Loader2 className="w-7 h-7 animate-spin" />
                      {t('contact.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.btn_send')} <Icons.ArrowRight className={`w-7 h-7 ${phoneState === 'VERIFIED' ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* SEO Content Module */}
      <ContactSEOContent />
    </div>
  );
}

