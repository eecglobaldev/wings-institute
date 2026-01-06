'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

import { sendOtpMSG91, verifyOtpMSG91 } from '@/services/messageService';
import { checkStudentLoginUserExists, getStudentLoginUserByPhone } from '@/services/userService';



interface LoginPageProps {
  onLoginSuccess: (userData: any) => void;
}




 
 const STORAGE_KEY = 'wings_student_data';
 

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  


  const [phoneState, setPhoneState] = useState<'IDLE' | 'SENDING' | 'SENT' | 'VERIFIED'>('IDLE');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [storedUserData, setStoredUserData] = useState<any>(null);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        setStoredUserData(userData);
        setIsAlreadyLoggedIn(true);
        // Auto-login if data exists
        onLoginSuccess(userData);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [onLoginSuccess]);

  // Prevent body scrolling when login modal is shown
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
 


 


  const handleSendOtp = async () => {
   // Extract digits from phoneValue (remove +91 or any non-digit characters)
   const phoneDigits = phoneValue.replace(/\D/g, '');
   
   if (phoneDigits.length !== 10) {
     setPhoneError("Please enter a valid 10-digit phone number.");
     setPhoneState('IDLE');
     return;
   }

   const fullPhone = "+91" + phoneDigits;
   setPhoneError(null);
   setPhoneOtpError(null);
   setPhoneState('SENDING');
   setIsSendingPhoneOtp(true);

   try {
     // For login, check if phone number is registered (opposite of registration)
     const phoneExists = await checkStudentLoginUserExists(phoneDigits);
     if (!phoneExists) {
       setPhoneError("This phone number is not registered. Please register first or contact support.");
       setPhoneState('IDLE');
       setIsSendingPhoneOtp(false);
       return;
     }

     // If phone exists, send OTP for login
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
       setPhoneValue(phoneDigits.toString());
     } else {
       setPhoneOtpError("Invalid OTP.");
       setPhoneOtp("");
     }
   } catch (err) {
     setPhoneOtpError("Failed to verify OTP. Try again.");
   }

   setIsVerifyingPhoneOtp(false);
 };

 const handleLogin = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   setError(null);
   
   try {
     if (phoneState !== 'VERIFIED') {
       setError("Please verify your phone number to proceed.");
       setIsLoading(false);
       return;
     }

     // Extract phone digits
     const phoneDigits = phoneValue.replace(/\D/g, '');
     
     // Fetch user data from Firebase
     const userData = await getStudentLoginUserByPhone(phoneDigits);

     if (!userData) {
       setError("User not found. Please register first.");
       setIsLoading(false);
       return;
     }

     // Store in localStorage
     if (typeof window !== 'undefined') {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
     }

     // Call success callback
     onLoginSuccess(userData);

   } catch (err) {
     setError("Something went wrong. Please try again.");
     console.error('Login error:', err);
     setIsLoading(false);
   }
 };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
   {/* Background Overlay */}
   <div className="fixed inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-md z-0"></div>
   
   <div className="relative z-10 w-full max-w-lg my-8 animate-fade-in-up">
      <div className="glass-panel p-8 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-2xl bg-white/90 dark:bg-zinc-900/90 relative overflow-hidden">
         
         {/* Decor */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
         
         <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
               <Icons.Lock className="w-3 h-3" /> Student Access Portal
            </div>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2">
               Login to Wings Institute Student Portal
            </h2>
            {isAlreadyLoggedIn && storedUserData ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                <p className="text-green-600 dark:text-green-400 text-sm font-bold">
                  ✓ You are already logged in as {storedUserData.name}
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  Accessing Wings Institute Student Portal...
                </p>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                 Verify your mobile number to unlock the AI simulator.
              </p>
            )}
         </div>

         {!isAlreadyLoggedIn ? (
         <form onSubmit={handleLogin} className="space-y-5">
            {/* Name */}
            

            {/* Phone Verification */}
            <div>
               <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Phone Number</label>
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

           

           

           

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}

            <button 
               type="submit"
               disabled={isLoading || phoneState !== 'VERIFIED'}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 mt-4
                  ${phoneState === 'VERIFIED'
                     ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-[1.02] shadow-black/20' 
                     : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}
               `}
            >
               {isLoading ? (
                  <><Icons.Loader2 className="w-5 h-5 animate-spin" /> Initializing...</>
               ) : (
                  <><Icons.Unlock className="w-5 h-5" /> Login</>
               )}
            </button>

         </form>
         ) : null}
      </div>
   </div>
</div>
  );
};