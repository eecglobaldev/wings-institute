'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { ScholarshipTestSEOContent } from '@/components/ScholarshipTestSEOContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendScholarshipApplicationEmails } from '@/services/emailService';
import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { LanguageToggle } from '@/components';
import { ROUTES } from '@/lib/routes';

// Custom Confetti Component
const Confetti = () => {
  const [particles, setParticles] = useState<{id: number, left: string, delay: string, color: string}[]>([]);

  useEffect(() => {
    const colors = ['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 3 + 's',
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] w-3 h-3 rounded-sm animate-[fall_3s_linear_infinite]"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDelay: p.delay,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export const ScholarshipPageClient: React.FC = () => {
  const { language, t } = useLanguage();
  const isVernacular = language === 'hi' || language === 'gu';

  // Translated question bank
  const translatedQuestionBank = [
    { id: 1, question: t('sc.q1'), options: [t('sc.q1_o1'), t('sc.q1_o2'), t('sc.q1_o3'), t('sc.q1_o4')], correct: 2 },
    { id: 2, question: t('sc.q2'), options: [t('sc.q2_o1'), t('sc.q2_o2'), t('sc.q2_o3'), t('sc.q2_o4')], correct: 1 },
    { id: 3, question: t('sc.q3'), options: [t('sc.q3_o1'), t('sc.q3_o2'), t('sc.q3_o3'), t('sc.q3_o4')], correct: 2 },
    { id: 4, question: t('sc.q4'), options: [t('sc.q4_o1'), t('sc.q4_o2'), t('sc.q4_o3'), t('sc.q4_o4')], correct: 1 },
    { id: 5, question: t('sc.q5'), options: [t('sc.q5_o1'), t('sc.q5_o2'), t('sc.q5_o3'), t('sc.q5_o4')], correct: 0 },
    { id: 6, question: t('sc.q6'), options: [t('sc.q6_o1'), t('sc.q6_o2'), t('sc.q6_o3'), t('sc.q6_o4')], correct: 2 },
    { id: 7, question: t('sc.q7'), options: [t('sc.q7_o1'), t('sc.q7_o2'), t('sc.q7_o3'), t('sc.q7_o4')], correct: 1 },
    { id: 8, question: t('sc.q8'), options: [t('sc.q8_o1'), t('sc.q8_o2'), t('sc.q8_o3'), t('sc.q8_o4')], correct: 3 },
    { id: 9, question: t('sc.q9'), options: [t('sc.q9_o1'), t('sc.q9_o2'), t('sc.q9_o3'), t('sc.q9_o4')], correct: 0 },
    { id: 10, question: t('sc.q10'), options: [t('sc.q10_o1'), t('sc.q10_o2'), t('sc.q10_o3'), t('sc.q10_o4')], correct: 2 },
    { id: 11, question: t('sc.q11'), options: [t('sc.q11_o1'), t('sc.q11_o2'), t('sc.q11_o3'), t('sc.q11_o4')], correct: 1 },
    { id: 12, question: t('sc.q12'), options: [t('sc.q12_o1'), t('sc.q12_o2'), t('sc.q12_o3'), t('sc.q12_o4')], correct: 1 },
    { id: 13, question: t('sc.q13'), options: [t('sc.q13_o1'), t('sc.q13_o2'), t('sc.q13_o3'), t('sc.q13_o4')], correct: 1 },
    { id: 14, question: t('sc.q14'), options: [t('sc.q14_o1'), t('sc.q14_o2'), t('sc.q14_o3'), t('sc.q14_o4')], correct: 2 },
    { id: 15, question: t('sc.q15'), options: [t('sc.q15_o1'), t('sc.q15_o2'), t('sc.q15_o3'), t('sc.q15_o4')], correct: 3 },
    { id: 16, question: t('sc.q16'), options: [t('sc.q16_o1'), t('sc.q16_o2'), t('sc.q16_o3'), t('sc.q16_o4')], correct: 2 },
    { id: 17, question: t('sc.q17'), options: [t('sc.q17_o1'), t('sc.q17_o2'), t('sc.q17_o3'), t('sc.q17_o4')], correct: 1 },
    { id: 18, question: t('sc.q18'), options: [t('sc.q18_o1'), t('sc.q18_o2'), t('sc.q18_o3'), t('sc.q18_o4')], correct: 2 },
    { id: 19, question: t('sc.q19'), options: [t('sc.q19_o1'), t('sc.q19_o2'), t('sc.q19_o3'), t('sc.q19_o4')], correct: 2 },
    { id: 20, question: t('sc.q20'), options: [t('sc.q20_o1'), t('sc.q20_o2'), t('sc.q20_o3'), t('sc.q20_o4')], correct: 2 },
  ];

  const [step, setStep] = useState<'LANDING' | 'FORM' | 'QUIZ' | 'RESULT'>('LANDING');
  const [activeQuestionIds, setActiveQuestionIds] = useState<number[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  
  // Get active questions based on IDs - this ensures translations update when language changes
  const activeQuestions = activeQuestionIds.map(id => translatedQuestionBank.find(q => q.id === id)!).filter(Boolean);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '',course: '' });

  const courseOptions = [
    { label: 'Air Hostess', value: 'air_hostess' },
    { label: 'Airport Management', value: 'airport_management' },
    { label: 'Hotel Management', value: 'hotel_management' },
    { label: 'Cooking & Baking', value: 'cooking_baking' },
    { label: 'Travel & Tourism', value: 'travel_tourism' },
  ];

  // Function to select 5 unique questions
  const startQuiz = () => {
    // Filter question IDs that haven't been used yet
    const remainingIds = translatedQuestionBank.map(q => q.id).filter(id => !usedQuestionIds.includes(id));
    
    let selectedIds: number[] = [];
    let newUsedIds = [...usedQuestionIds];

    if (remainingIds.length >= 5) {
       // Pick 5 random from the remaining pool
       const shuffled = [...remainingIds].sort(() => 0.5 - Math.random());
       selectedIds = shuffled.slice(0, 5);
       // Add these IDs to used list
       newUsedIds = [...newUsedIds, ...selectedIds];
    } else {
       // If we ran out of questions (after ~4 rounds), reset the history but shuffle everything to ensure freshness
       const allIds = translatedQuestionBank.map(q => q.id);
       const shuffled = [...allIds].sort(() => 0.5 - Math.random());
       selectedIds = shuffled.slice(0, 5);
       newUsedIds = selectedIds; // Reset tracking
    }

    setUsedQuestionIds(newUsedIds);
    setActiveQuestionIds(selectedIds);
    setCurrentQuestion(0);
    setScore(0);
    
    // Generate Code (only valid if they pass)
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const code = `WIN-${randomPart}-2026`;
    setUniqueCode(code);

    setStep('QUIZ');
  };

  // Scroll to top when step changes (guarded)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const handleStart = () => setStep('FORM');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.course) {
      startQuiz();
    }
  };

  
  const handleSendOtp = async () => {
   // Extract digits from phoneValue (remove +91 or any non-digit characters)
   const phoneDigits = phoneValue.replace(/\D/g, '');
   
   if (phoneDigits.length !== 10) {
     setPhoneError("Please enter a valid 10-digit phone number.");
     setPhoneState('IDLE');
     return;
   }

   const fullPhone = "+91" + phoneDigits;

   try {
     // If phone doesn't exist, send OTP
     const result = await sendOtpMSG91(fullPhone);

     if (result) {
       setPhoneState('SENT');
     } else {
       setPhoneError("Failed to send phone OTP. Try again.");
       setPhoneState('IDLE');
     }
   } catch (err) {
     setPhoneError("Unable to send phone OTP. Try again.");
     setPhoneState('IDLE');
   }

   setIsSendingPhoneOtp(false);
 };

 const handleVerifyOtp = async () => {
   if (phoneOtp.length !== 6) {
     setPhoneOtpError("Enter the 6-digit OTP.");
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
       setPhoneOtpError("Invalid OTP.");
       setPhoneOtp("");
     }
   } catch (err) {
     setPhoneOtpError("Failed to verify OTP. Try again.");
   }

   setIsVerifyingPhoneOtp(false);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   setError(null);
   
   try {
     if (phoneState !== 'VERIFIED') {
       setError("Please verify your phone number to proceed.");
       setIsLoading(false);
       return;
     }
     
     if (!formData.name || !formData.phone || !formData.course) {
       setError("Please fill in all required fields.");
       setIsLoading(false);
       return;
     }

     // Prepare user data for Firebase
     const userDataToSave = {
       name: formData.name,
       phone: formData.phone,
       course: formData.course,
     };

     // Send email notification
     try {
       const result = await sendScholarshipApplicationEmails(userDataToSave);
       if (result) {
         console.log("Scholarship application email sent successfully.");
         setIsLoading(false);
         startQuiz();
       } else {
         setError("Failed to send email. Please try again.");
         setIsLoading(false);
       }
     } catch (emailError) {
       // Don't block quiz if email fails - proceed anyway
       console.error('Failed to send scholarship application email:', emailError);
       setIsLoading(false);
       startQuiz();
     }

   } catch (err) {
     setError("Something went wrong. Please try again.");
     console.error('Scholarship form error:', err);
     setIsLoading(false);
   }
 };


  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === activeQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < activeQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setStep('RESULT'), 500);
    }
  };

  // Timer logic for Result page
  useEffect(() => {
    if (step === 'RESULT' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Copy code to clipboard (guarded)
  const handleCopyCode = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(uniqueCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const counselorNumber = "918758754444"; 
  const whatsAppMessage = `Hi Wings Team, I passed the Scholarship Test! \n\nName: ${formData.name}\nScore: ${score}/5\nScholarship Code: *${uniqueCode}*\n\nPlease confirm my seat and apply the ₹10,000 fee waiver.`;
  const whatsAppLink = `https://wa.me/${counselorNumber}?text=${encodeURIComponent(whatsAppMessage)}`;

  // Passing Criteria
  const PASS_MARK = 4;
  const isPassed = score >= PASS_MARK;

  return (
    <div className="min-h-screen pt-3 pb-48 relative z-10 flex flex-col items-center justify-center">
      
      {isPassed && step === 'RESULT' && <Confetti />}

      {/* Premium Background Ambience - Reduced Opacity */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-50/30 dark:bg-amber-900/5 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zinc-50/30 dark:bg-yellow-900/5 rounded-full blur-[120px] animate-blob"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      </div>

      <div className="w-full max-w-4xl px-6">
        
        {/* VIEW: LANDING */}
        {step === 'LANDING' && (
          <div className="text-center animate-fade-in-up">

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-4">
             <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-50/50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-500 text-sm uppercase tracking-widest  shadow-sm backdrop-blur-sm ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                <Icons.Sparkles className="w-4 h-4 animate-pulse" /> {t('sc.badge')}
             </div>

             {/* Language Toggle */}
           <div className="flex flex-col lg:flex-row items-center gap-2 mb-8 lg:mb-0 animate-fade-in-up lg:mb-0 ">
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t('hero.translate') || 'Translate'}
            </label>
            <LanguageToggle isHomepage={true} />
          </div>
          </div>
             
             <h1 className={`font-display text-5xl md:text-8xl font-black text-zinc-900 dark:text-white mb-8 drop-shadow-sm ${isVernacular ? 'leading-[1.1]' : 'leading-[0.95]'}`}>
                {t('sc.hero_title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">{t('sc.hero_title2')}</span> <br/>
                {t('sc.hero_title3')}
             </h1>
             
             <p className={`text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed'}`}>
                {t('sc.hero_desc').replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-white">$1</strong>').split('<strong').map((part, i) => {
                  if (i === 0) return part;
                  const match = part.match(/class="([^"]*)">(.*?)<\/strong>(.*)/);
                  if (match) {
                    return <span key={i}><strong className={match[1]}>{match[2]}</strong>{match[3]}</span>;
                  }
                  return part;
                })}
             </p>

             {/* Beveled Glass Blocks */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
                <div className="group relative p-6 rounded-[2rem] flex flex-col items-center transition-all hover:-translate-y-1 bg-white/30 dark:bg-white/5 backdrop-blur-2xl border-t border-l border-white/60 dark:border-white/10 border-b border-r border-black/5 dark:border-black/20 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
                   <Icons.Timer className="w-8 h-8 text-amber-500 mb-3 drop-shadow-sm" />
                   <h3 className={`text-zinc-900 dark:text-white mb-1 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.card1_title')}</h3>
                   <p className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('sc.card1_sub')}</p>
                </div>
                <div className="group relative p-6 rounded-[2rem] flex flex-col items-center transition-all hover:-translate-y-1 bg-white/30 dark:bg-white/5 backdrop-blur-2xl border-t border-l border-white/60 dark:border-white/10 border-b border-r border-black/5 dark:border-black/20 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
                   <Icons.CheckSquare className="w-8 h-8 text-amber-500 mb-3 drop-shadow-sm" />
                   <h3 className={`text-zinc-900 dark:text-white mb-1 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.card2_title')}</h3>
                   <p className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('sc.card2_sub')}</p>
                </div>
                <div className="group relative p-6 rounded-[2rem] flex flex-col items-center transition-all hover:-translate-y-1 bg-white/30 dark:bg-white/5 backdrop-blur-2xl border-t border-l border-white/60 dark:border-white/10 border-b border-r border-black/5 dark:border-black/20 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
                   <Icons.Gift className="w-8 h-8 text-amber-500 mb-3 drop-shadow-sm" />
                   <h3 className={`text-zinc-900 dark:text-white mb-1 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.card3_title')}</h3>
                   <p className={`text-xs text-zinc-500 dark:text-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}>{t('sc.card3_sub')}</p>
                </div>
             </div>

             <button 
                onClick={handleStart}
                className={`group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full text-xl shadow-[0_10px_30px_-10px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
             >
                <span className="flex items-center gap-3">
                   {t('sc.start_btn')} <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
             </button>
             <p className={`mt-4 text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-wider ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.slots_text')}</p>
          </div>
        )}

        {/* VIEW: FORM */}
        {step === 'FORM' && (
           <div className="glass-panel max-w-md mx-auto p-10 rounded-[40px] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl animate-fade-in-up shadow-2xl">
              <div className="text-center mb-8">
                 <h2 className={`text-2xl font-display font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.4]' : ''}`}>{t('sc.form_title')}</h2>
                 <p className={`text-zinc-500 dark:text-zinc-400 text-sm ${isVernacular ? 'leading-[1.6] font-semibold' : ''}`}>{t('sc.form_subtitle')}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className={`text-xs text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-2 block ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.form_name_label')}</label>
                    <input 
                       type="text" 
                       required
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className={`w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder-zinc-400 ${isVernacular ? 'font-semibold' : ''}`}
                       placeholder={t('sc.form_name_placeholder')}
                    />
                 </div>
                  {/* Phone Verification */}
            <div>
               <label className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1 block">{t('sc.form_phone_label')}</label>
               <div className="flex gap-2">
                  <div className="relative flex-grow">
                     <Icons.Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                     <input 
                       type="tel" 
                       required
                       value={phoneValue}
                       onChange={(e) => setPhoneValue(e.target.value)}
                       disabled={phoneState === 'VERIFIED'}
                       className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm disabled:opacity-70"
                       placeholder="+91..."
                     />
                     {phoneState === 'VERIFIED' && <Icons.CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
                  </div>
                  {phoneState !== 'VERIFIED' && (
                      <button 
                        type="button"
                        onClick={handleSendOtp}
                        disabled={phoneState === 'SENDING' || isSendingPhoneOtp || phoneValue.replace(/\D/g, '').length < 10}
                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl whitespace-nowrap min-w-[110px] transition-all active:scale-95 disabled:opacity-50"
                      >
                         {phoneState === 'SENDING' || isSendingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin mx-auto" /> : phoneState === 'SENT' ? 'Resend OTP' : 'Send OTP'}
                      </button>
                  )}
               </div>
               {phoneError && (
                 <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>
               )}
               
               {/* Phone OTP Input */}
               {phoneState === 'SENT' && (
                  <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2 duration-300">
                     <input 
                       type="text" 
                       value={phoneOtp}
                       onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                       className="w-full px-4 py-2 bg-white dark:bg-white/5 border border-amber-500 rounded-lg text-center tracking-[0.5em] font-mono text-sm focus:ring-4 focus:ring-amber-500/20 outline-none"
                       placeholder="000000"
                       maxLength={6}
                     />
                     <button 
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingPhoneOtp}
                        className="px-6 py-2 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-amber-600 transition-all active:scale-95 disabled:opacity-50"
                     >
                        {isVerifyingPhoneOtp ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                     </button>
                  </div>
               )}
               {phoneOtpError && (
                 <p className="text-red-500 text-xs mt-1 font-medium">{phoneOtpError}</p>
               )}
            </div>
                 <div>
               <label className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1 block">Interested In</label>
               <div className="relative">
                  <select 
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full pl-4 pr-8 py-3 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer"
                  >
                     <option value="">Select Course</option>
                     {courseOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
               </div>
            </div>
                 {error && (
                   <p className="text-red-500 text-xs text-center font-medium">{error}</p>
                 )}
                 <button 
                   type="submit"
                   disabled={isLoading}
                   className={`w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                 >
                    {isLoading ? (
                      <>
                        <Icons.Loader2 className="w-5 h-5 animate-spin" />
                        {t('sc.form_submitting') || 'Submitting...'}
                      </>
                    ) : (
                      <>
                        {t('sc.form_submit')} <Icons.PlayCircle className="w-5 h-5" />
                      </>
                    )}
                 </button>
              </form>
           </div>
        )}

        {/* VIEW: QUIZ */}
        {step === 'QUIZ' && activeQuestions.length > 0 && (
           <div className="glass-panel max-w-2xl mx-auto p-8 md:p-12 rounded-[40px] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl animate-fade-in shadow-2xl">
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
                 <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / activeQuestions.length) * 100}%` }}></div>
              </div>

              <div className="mb-8">
                 <span className={`text-amber-600 dark:text-amber-500 text-xs uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.quiz_question')} {currentQuestion + 1} {t('sc.quiz_of')} {activeQuestions.length}</span>
                 <h2 className={`text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mt-4 ${isVernacular ? 'leading-[1.5]' : 'leading-tight'}`}>{activeQuestions[currentQuestion].question}</h2>
              </div>

              <div className="space-y-4">
                 {activeQuestions[currentQuestion].options.map((option, idx) => (
                    <button 
                       key={idx}
                       onClick={() => handleAnswer(idx)}
                       className={`w-full text-left p-5 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-white/10 hover:border-amber-500/50 transition-all text-zinc-700 dark:text-zinc-200 flex items-center justify-between group shadow-sm ${isVernacular ? 'font-semibold leading-[1.6]' : 'font-medium'}`}
                    >
                       {option}
                       <div className="w-5 h-5 rounded-full border border-zinc-300 dark:border-white/30 group-hover:border-amber-500 transition-colors shrink-0 ml-3"></div>
                    </button>
                 ))}
              </div>
           </div>
        )}

        {/* VIEW: RESULT */}
        {step === 'RESULT' && (
           <div className="text-center animate-fade-in-up">
              <div className="glass-panel max-w-xl mx-auto p-12 rounded-[40px] border border-amber-500/30 bg-white/90 dark:bg-black/60 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                 
                 {isPassed ? (
                    /* PASS STATE */
                    <>
                       {/* Confetti Glow */}
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none"></div>

                       <div className="relative z-10">
                          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-float">
                             <Icons.Trophy className="w-12 h-12 text-white" />
                          </div>

                          <h2 className={`text-4xl font-display font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('sc.pass_title')}</h2>
                          <p className={`text-zinc-600 dark:text-zinc-400 mb-8 ${isVernacular ? 'leading-[1.6] font-semibold' : ''}`}>{t('sc.pass_score')} <span className="text-amber-500 font-bold">{score}/{activeQuestions.length}</span> {t('sc.pass_in_test')}</p>

                          <div className="bg-zinc-50 dark:bg-white/5 border-2 border-dashed border-amber-500 p-6 rounded-2xl mb-6 relative">
                             <p className={`text-xs text-zinc-500 uppercase tracking-widest mb-4 ${isVernacular ? 'font-extrabold' : ''}`}>{t('sc.pass_step1')}</p>
                             
                             <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="text-3xl md:text-4xl font-mono font-black text-zinc-900 dark:text-white tracking-widest bg-white dark:bg-black/40 px-4 py-2 rounded-lg border border-zinc-200 dark:border-white/10">{uniqueCode}</div>
                                <button 
                                  onClick={handleCopyCode}
                                  className="p-3 rounded-xl bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 transition-colors"
                                  title="Copy Code"
                                >
                                   {copied ? <Icons.Check className="w-6 h-6 text-green-500" /> : <Icons.ClipboardList className="w-6 h-6 text-zinc-600 dark:text-white" />}
                                </button>
                             </div>
                             
                             <p className={`text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-6 drop-shadow-sm ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('sc.pass_waiver')}</p>
                             
                             {/* Timer */}
                             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm animate-pulse border border-red-200 dark:border-red-900/50 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                                <Icons.Timer className="w-4 h-4" /> {t('sc.pass_expires')} {formatTime(timeLeft)}
                             </div>
                          </div>

                          <p className={`text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto ${isVernacular ? 'leading-[1.8] font-semibold' : 'leading-relaxed font-medium'}`}>
                             {t('sc.pass_message')}
                          </p>

                          <div className="flex flex-col gap-4">
                             <p className={`text-xs text-zinc-400 uppercase tracking-widest ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>{t('sc.pass_step2')}</p>
                             <a 
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 animate-bounce ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                             >
                                <Icons.MessageCircle className="w-7 h-7" /> {t('sc.pass_claim')}
                             </a>
                             
                             <Link 
                                href={ROUTES['advantage']}
                                className={`px-8 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                             >
                                {t('sc.pass_back')}
                             </Link>
                          </div>
                       </div>
                    </>
                 ) : (
                    /* FAIL STATE */
                    <>
                       <div className="relative z-10">
                          <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-300 dark:border-white/10">
                             <Icons.Lock className="w-10 h-10 text-zinc-400" />
                          </div>

                          <h2 className={`text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2 ${isVernacular ? 'leading-[1.3]' : ''}`}>{t('sc.fail_title')}</h2>
                          <p className={`text-zinc-600 dark:text-zinc-400 mb-8 ${isVernacular ? 'leading-[1.8] font-semibold' : ''}`}>
                             {t('sc.fail_score')} <span className="text-wings-red font-bold">{score}/{activeQuestions.length}</span>. <br/>
                             {t('sc.fail_need')} <span className="font-bold text-zinc-900 dark:text-white">4/5</span> {t('sc.fail_unlock')}
                          </p>

                          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6 rounded-2xl mb-8">
                             <p className={`text-sm text-red-600 dark:text-red-400 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}>
                                <Icons.AlertCircle className="w-4 h-4 inline mr-2" />
                                {t('sc.fail_locked')}
                             </p>
                             <p className={`text-xs text-red-500/80 mt-1 ${isVernacular ? 'font-semibold' : ''}`}>{t('sc.fail_retry')}</p>
                          </div>

                          <div className="flex flex-col gap-4">
                             <button 
                                onClick={startQuiz}
                                className={`w-full py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-xl text-lg shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                             >
                                <Icons.RotateCcw className="w-5 h-5" /> {t('sc.fail_retake')}
                             </button>
                             
                             <Link 
                                href={ROUTES['advantage']}
                                className={`px-8 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors ${isVernacular ? 'font-extrabold' : 'font-bold'}`}
                             >
                                {t('sc.fail_later')}
                             </Link>
                          </div>
                       </div>
                    </>
                 )}
              </div>
           </div>
        )}

      </div>

      {/* SEO Content Module */}
      <ScholarshipTestSEOContent />
    </div>
  );
};

