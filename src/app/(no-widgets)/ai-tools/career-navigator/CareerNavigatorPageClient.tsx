'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { StudentLogin } from '@/components/StudentLogin';
import { GoogleGenAI, Type } from "@google/genai";
import { CareerNavigatorSEOContent } from '@/components/CareerNavigatorSEOContent';
import { ROUTES } from '@/lib/routes';

// --- ASSESSMENT DATA - UPDATED TO BE EXTREMELY SIMPLE ENGLISH ---
const QUESTIONS = [
  {
    id: 1,
    en: "Where do you want to work?",
    hi: "आप कहाँ काम करना चाहते हैं?",
    options: [
      { id: 'A', en: "High in the sky, inside an airplane", hi: "आसमान में, एक विमान के अंदर", weight: { crew: 5, ground: 1 } },
      { id: 'B', en: "At a big airport with many planes", hi: "विमानों वाले एक बड़े हवाई अड्डे पर", weight: { ground: 5, travel: 1 } },
      { id: 'C', en: "In a beautiful hotel or luxury building", hi: "एक सुंदर होटल या शानदार इमारत में", weight: { hotel: 5, crew: 1 } },
      { id: 'D', en: "In a busy kitchen making food", hi: "खाना बनाने वाली व्यस्त रसोई में", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "In an office planning world tours", hi: "दुनिया भर की यात्राओं की योजना बनाने वाले कार्यालय में", weight: { travel: 5, ground: 1 } }
    ]
  },
  {
    id: 2,
    en: "A passenger has a heavy bag. What do you do?",
    hi: "एक यात्री के पास भारी बैग है। आप क्या करते हैं?",
    options: [
      { id: 'A', en: "Smile and help them with a kind heart", hi: "मुस्कुराएं और दयालु हृदय से उनकी मदद करें", weight: { crew: 4, hotel: 3 } },
      { id: 'B', en: "Quickly show them the right way", hi: "उन्हें जल्दी से सही रास्ता दिखाएं", weight: { ground: 5, travel: 2 } },
      { id: 'C', en: "Help them like a guest in a hotel", hi: "होटल में मेहमान की तरह उनकी मदद करें", weight: { hotel: 5, crew: 3 } },
      { id: 'D', en: "Keep doing my own work fast", hi: "अपना काम तेजी से करते रहें", weight: { culinary: 4, ground: 2 } },
      { id: 'E', en: "Help them plan their whole trip", hi: "उनकी पूरी यात्रा की योजना बनाने में मदद करें", weight: { travel: 5, ground: 2 } }
    ]
  },
  {
    id: 3,
    en: "Why are you special?",
    hi: "आप खास क्यों हैं?",
    options: [
      { id: 'A', en: "I look very neat and smart in uniform", hi: "मैं यूनिफॉर्म में बहुत साफ और स्मार्ट दिखता हूं", weight: { crew: 5, hotel: 2 } },
      { id: 'B', en: "I solve problems very fast", hi: "मैं समस्याओं को बहुत तेजी से हल करता हूं", weight: { ground: 5, travel: 3 } },
      { id: 'C', en: "I am very patient and quiet", hi: "मैं बहुत धैर्यवान और शांत हूं", weight: { hotel: 5, crew: 4 } },
      { id: 'D', en: "I am creative with cooking food", hi: "मैं खाना पकाने में रचनात्मक हूं", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "I know a lot about many countries", hi: "मुझे कई देशों के बारे में बहुत जानकारी है", weight: { travel: 5, crew: 2 } }
    ]
  },
  {
    id: 4,
    en: "How do you like to work with others?",
    hi: "आप दूसरों के साथ काम करना कैसे पसंद करते हैं?",
    options: [
      { id: 'A', en: "I like meeting new people every day", hi: "मुझे हर दिन नए लोगों से मिलना पसंद है", weight: { crew: 5, ground: 2 } },
      { id: 'B', en: "I like working with a team at the airport", hi: "मुझे एयरपोर्ट पर एक टीम के साथ काम करना पसंद है", weight: { ground: 5, travel: 2 } },
      { id: 'C', en: "I like a quiet, small hotel team", hi: "मुझे एक शांत, छोटी होटल टीम पसंद है", weight: { hotel: 5, culinary: 3 } },
      { id: 'D', en: "I like to work fast in a busy kitchen", hi: "मुझे व्यस्त रसोई में तेजी से काम करना पसंद है", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "I like to be a leader and guide people", hi: "मुझे लीडर बनना और लोगों का मार्गदर्शन करना पसंद है", weight: { travel: 5, hotel: 2 } }
    ]
  },
  {
    id: 5,
    en: "What is your main goal at work?",
    hi: "काम पर आपका मुख्य लक्ष्य क्या है?",
    options: [
      { id: 'A', en: "To travel to a new country tomorrow", hi: "कल एक नए देश की यात्रा करना", weight: { crew: 5, travel: 3 } },
      { id: 'B', en: "To make sure flights leave on time", hi: "यह सुनिश्चित करना कि उड़ानें समय पर जाएं", weight: { ground: 5, travel: 2 } },
      { id: 'C', en: "To make a guest feel like a King", hi: "मेहमान को राजा जैसा महसूस कराना", weight: { hotel: 5, crew: 2 } },
      { id: 'D', en: "To make tasty food people enjoy", hi: "स्वादिष्ट खाना बनाना जिसका लोग आनंद लें", weight: { culinary: 5, hotel: 3 } },
      { id: 'E', en: "To sell a big world tour package", hi: "एक बड़ा वर्ल्ड टूर पैकेज बेचना", weight: { travel: 5, ground: 2 } }
    ]
  },
  {
    id: 6,
    en: "There is a big problem or delay. What do you do?",
    hi: "कोई बड़ी समस्या या देरी है। आप क्या करते हैं?",
    options: [
      { id: 'A', en: "Talk nicely and keep everyone calm", hi: "अच्छी तरह बात करें और सबको शांत रखें", weight: { crew: 5, ground: 3 } },
      { id: 'B', en: "Check the computer and find a fix", hi: "कंप्यूटर की जाँच करें और समाधान ढूंढें", weight: { ground: 5, travel: 3 } },
      { id: 'C', en: "Give the guest a comfortable room", hi: "मेहमान को एक आरामदायक कमरा दें", weight: { hotel: 5, crew: 3 } },
      { id: 'D', en: "Work faster to finish the food", hi: "खाना खत्म करने के लिए तेजी से काम करें", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "Tell the client about the new plan", hi: "क्लाइंट को नई योजना के बारे में बताएं", weight: { travel: 5, ground: 2 } }
    ]
  },
  {
    id: 7,
    en: "Where do you feel best?",
    hi: "आप सबसे अच्छा कहाँ महसूस करते हैं?",
    options: [
      { id: 'A', en: "Inside a big, modern airplane", hi: "एक बड़े, आधुनिक विमान के अंदर", weight: { crew: 5, travel: 2 } },
      { id: 'B', en: "In the high-tech office of an airport", hi: "हवाई अड्डे के हाई-टेक कार्यालय में", weight: { ground: 5, travel: 2 } },
      { id: 'C', en: "In a shiny, luxury hotel hall", hi: "एक चमकदार, शानदार होटल हॉल में", weight: { hotel: 5, culinary: 2 } },
      { id: 'D', en: "In a kitchen with professional tools", hi: "पेशेवर औजारों वाली रसोई में", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "Showing travel plans to guests", hi: "मेहमानों को यात्रा योजनाएं दिखाना", weight: { travel: 5, ground: 1 } }
    ]
  },
  {
    id: 8,
    en: "What do you want to learn?",
    hi: "आप क्या सीखना चाहते हैं?",
    options: [
      { id: 'A', en: "How to save lives and help passengers", hi: "जान बचाने और यात्रियों की मदद करने का तरीका", weight: { crew: 5, ground: 3 } },
      { id: 'B', en: "How to use airport ticket software", hi: "एयरपोर्ट टिकट सॉफ्टवेयर का उपयोग कैसे करें", weight: { ground: 5, travel: 4 } },
      { id: 'C', en: "How to handle VIP and rich guests", hi: "VIP और अमीर मेहमानों को कैसे संभालें", weight: { hotel: 5, crew: 3 } },
      { id: 'D', en: "How to bake and cook many foods", hi: "कई तरह के खाने को कैसे बेक और कुक करें", weight: { culinary: 5, hotel: 3 } },
      { id: 'E', en: "How to sell holidays and travel", hi: "छुट्टियां और यात्रा कैसे बेचें", weight: { travel: 5, ground: 2 } }
    ]
  },
  {
    id: 9,
    en: "Which clothes do you like?",
    hi: "आपको कौन से कपड़े पसंद हैं?",
    options: [
      { id: 'A', en: "A smart suit with a tie or scarf", hi: "टाई या स्कार्फ वाला स्मार्ट सूट", weight: { crew: 5, ground: 3 } },
      { id: 'B', en: "A professional airport uniform", hi: "एक पेशेवर एयरपोर्ट यूनिफॉर्म", weight: { ground: 5, travel: 1 } },
      { id: 'C', en: "A nice, elegant hotel blazer", hi: "एक अच्छा, शानदार होटल ब्लेज़र", weight: { hotel: 5, culinary: 1 } },
      { id: 'D', en: "A clean white Chef coat", hi: "एक साफ सफेद शेफ कोट", weight: { culinary: 5, hotel: 2 } },
      { id: 'E', en: "Professional casual travel clothes", hi: "पेशेवर आरामदायक यात्रा के कपड़े", weight: { travel: 5, ground: 2 } }
    ]
  },
  {
    id: 10,
    en: "What is your big dream?",
    hi: "आपका बड़ा सपना क्या है?",
    options: [
      { id: 'A', en: "To fly around the world", hi: "पूरी दुनिया में उड़ना", weight: { crew: 5, travel: 2 } },
      { id: 'B', en: "To manage a big airport", hi: "एक बड़े हवाई अड्डे का प्रबंधन करना", weight: { ground: 5, hotel: 1 } },
      { id: 'C', en: "To be the boss of a luxury hotel", hi: "एक शानदार होटल का बॉस बनना", weight: { hotel: 5, ground: 1 } },
      { id: 'D', en: "To own my own successful restaurants", hi: "अपने खुद के सफल रेस्तरां का मालिक बनना", weight: { culinary: 5, hotel: 3 } },
      { id: 'E', en: "To have a global travel business", hi: "एक वैश्विक यात्रा व्यवसाय शुरू करना", weight: { travel: 5, ground: 2 } }
    ]
  }
];

const COURSE_MAP: Record<string, { id: keyof typeof ROUTES; title: string; enDesc: string; hiDesc: string; icon: any; color: string }> = {
  crew: { 
    id: 'air-hostess', 
    title: "Air Hostess / Cabin Crew", 
    enDesc: "You are a leader. You love style and safety. You should work in the sky.",
    hiDesc: "आप एक लीडर हैं। आपको स्टाइल और सुरक्षा पसंद है। आपको आसमान में काम करना चाहिए।",
    icon: <Icons.Plane />, 
    color: "from-rose-500 to-red-600" 
  },
  ground: { 
    id: 'airport-mgmt', 
    title: "Airport Ground Staff", 
    enDesc: "You are smart and fast. You will be the engine of the airport.",
    hiDesc: "आप स्मार्ट और तेज हैं। आप एयरपोर्ट के इंजन बनेंगे।",
    icon: <Icons.Luggage />, 
    color: "from-blue-500 to-indigo-600" 
  },
  hotel: { 
    id: 'hotel-mgmt', 
    title: "Hotel Management", 
    enDesc: "You are kind and disciplined. You will shine in 5-star hotels.",
    hiDesc: "आप दयालु और अनुशासित हैं। आप 5-सितारा होटलों में चमकेंगे।",
    icon: <Icons.ConciergeBell />, 
    color: "from-amber-500 to-orange-600" 
  },
  culinary: { 
    id: 'culinary', 
    title: "Culinary Arts", 
    enDesc: "You love food and creativity. You will be a great Chef.",
    hiDesc: "आपको भोजन और रचनात्मकता पसंद है। आप एक महान शेफ बनेंगे।",
    icon: <Icons.ChefHat />, 
    color: "from-orange-500 to-red-700" 
  },
  travel: { 
    id: 'travel-tourism', 
    title: "Travel & Tourism", 
    enDesc: "You love the world. You will help people see many countries.",
    hiDesc: "आप दुनिया से प्यार करते हैं। आप लोगों को कई देशों को देखने में मदद करेंगे।",
    icon: <Icons.Globe />, 
    color: "from-teal-500 to-emerald-600" 
  }
};

// Note: API key should be handled via server action for security
// For now, using client-side with environment variable (should be moved to server action)
const getAIInstance = () => {
  if (typeof window === 'undefined') return null;
  // API key should come from server action, not client-side env
  // This is a temporary solution - should be refactored
  return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
};

export const CareerNavigatorPageClient: React.FC = () => {
  const [step, setStep] = useState<'INTRO' | 'QUIZ' | 'ANALYZING' | 'RESULT'>('INTRO');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [finalCourse, setFinalCourse] = useState<string>('');

  // Scroll to top when step changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const handleLogin = (data: any) => {
    setUserName(data.name);
    setIsLoggedIn(true);
  };

  const handleAnswer = (optionId: string) => {
    const newSelections = [...selections, optionId];
    setSelections(newSelections);

    if (currentQIdx < QUESTIONS.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      performAnalysis(newSelections);
    }
  };

  const performAnalysis = async (allSelections: string[]) => {
    setStep('ANALYZING');
    
    // 1. Calculate Score Aggregates
    const aggregates: Record<string, number> = { crew: 0, ground: 0, hotel: 0, culinary: 0, travel: 0 };
    allSelections.forEach((selId, qIdx) => {
      const option = QUESTIONS[qIdx].options.find(o => o.id === selId);
      if (option?.weight) {
        Object.entries(option.weight).forEach(([key, val]) => {
          aggregates[key] += val;
        });
      }
    });

    const topCourseKey = Object.keys(aggregates).reduce((a, b) => aggregates[a] > aggregates[b] ? a : b);
    setFinalCourse(topCourseKey);

    // 2. AI Personalized Feedback - UPDATED FOR EXTREMELY SIMPLE ENGLISH
    try {
      const prompt = `
        A student named ${userName} took a career test. 
        Top result: ${COURSE_MAP[topCourseKey].title}.
        
        Write a VERY SHORT, VERY EASY summary (max 20 words). 
        Use extremely basic English words. No hard words. 
        Tell ${userName} why they are good for this job.
        Language: ${lang === 'hi' ? 'Hindi (Devanagari)' : 'Extremely Simple English'}.
      `;

      const aiInstance = getAIInstance();
      if (!aiInstance) {
        setAiAnalysis(lang === 'hi' ? "आप इस काम के लिए एकदम सही हैं। विंग्स में आएं!" : "You are perfect for this job. Join Wings now!");
        setTimeout(() => setStep('RESULT'), 2000);
        return;
      }

      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setAiAnalysis(response.text || '');
    } catch (e) {
      console.error("AI Analysis Error", e);
      setAiAnalysis(lang === 'hi' ? "आप इस काम के लिए एकदम सही हैं। विंग्स में आएं!" : "You are perfect for this job. Join Wings now!");
    }

    setTimeout(() => {
      setStep('RESULT');
    }, 2000);
  };

  if (!isLoggedIn) {
    return <StudentLogin toolName="Career Navigator" onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen pt-3 pb-20 px-6 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse-slow"></div>
         <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse-slow [animation-delay:2s]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- STEP: INTRO --- */}
        {step === 'INTRO' && (
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-blue-500/30 mb-8 shadow-sm">
                <Icons.Compass className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Wings AI Career Assessment</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 leading-tight tracking-tighter">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Dream Job.</span>
            </h1>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
                Hello <span className="text-blue-600 font-bold">{userName.split(' ')[0]}</span>. Take this very easy test. Our AI will find the best career for you in 2 minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
               {[
                 { title: "Easy Questions", icon: <Icons.CheckSquare />, desc: "Simple and fast" },
                 { title: "Two Languages", icon: <Icons.Languages />, desc: "English or Hindi" },
                 { title: "AI Result", icon: <Icons.Brain />, desc: "Personalized for you" }
               ].map((item, i) => (
                 <div key={i} className="glass-panel p-6 rounded-3xl border border-white/40 dark:border-white/10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">{item.icon}</div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                 </div>
               ))}
            </div>

            <button 
                onClick={() => setStep('QUIZ')}
                className="group relative px-12 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform overflow-hidden"
            >
                <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Start Now <Icons.ArrowRight className="w-6 h-6" />
                </span>
            </button>
          </div>
        )}

        {/* --- STEP: QUIZ --- */}
        {step === 'QUIZ' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            {/* Header / Language Toggle */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                      {currentQIdx + 1}
                   </div>
                   <div>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Step</span>
                      <div className="h-1 w-24 bg-zinc-200 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                         <div 
                           className="h-full bg-blue-600 transition-all duration-300" 
                           style={{ width: `${((currentQIdx + 1) / QUESTIONS.length) * 100}%` }}
                         ></div>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-black uppercase tracking-wider text-blue-600 transition-all hover:bg-blue-50 shadow-sm"
                >
                  {lang === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English'}
                </button>
            </div>

            {/* Question Card */}
            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl">
               <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white mb-10 leading-tight">
                  {QUESTIONS[currentQIdx][lang]}
               </h2>

               <div className="grid gap-4">
                  {QUESTIONS[currentQIdx].options.map((option, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(option.id)}
                      className="group w-full p-5 rounded-2xl border-2 border-zinc-100 dark:border-white/5 bg-white/50 dark:bg-black/20 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left flex items-center justify-between"
                    >
                      <span className="text-lg font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        {option[lang]}
                      </span>
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-200 dark:border-white/10 group-hover:border-blue-500 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-active:opacity-100 transition-opacity"></div>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* --- STEP: ANALYZING --- */}
        {step === 'ANALYZING' && (
          <div className="text-center py-20 flex flex-col items-center">
             <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-600/30 blur-2xl rounded-full animate-pulse"></div>
                <Icons.Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
             </div>
             <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4">Finding your path...</h2>
             <p className="text-zinc-500 max-w-sm font-medium">Matching your personality with top airline and hotel jobs.</p>
          </div>
        )}

        {/* --- STEP: RESULT --- */}
        {step === 'RESULT' && finalCourse && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
               <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Recommendation</span>
               <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white">
                  You should be an <br/>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${COURSE_MAP[finalCourse].color} italic pr-2`}>
                    {COURSE_MAP[finalCourse].title}!
                  </span>
               </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               {/* Personality Profile */}
               <div className="lg:col-span-7">
                  <div className="glass-panel p-8 md:p-10 rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                     <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                           <Icons.Brain className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Why this role fits you</h3>
                     </div>
                     <p className="text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif italic border-l-4 border-blue-500 pl-6 mb-8">
                        "{aiAnalysis || COURSE_MAP[finalCourse][lang === 'hi' ? 'hiDesc' : 'enDesc']}"
                     </p>
                     
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Icons.CheckCircle2 className="w-5 h-5 text-green-500" />
                           <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">100% Personality Match</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Icons.CheckCircle2 className="w-5 h-5 text-green-500" />
                           <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Great for your skills</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Course Action Card */}
               <div className="lg:col-span-5">
                  <div className={`p-8 rounded-[3rem] bg-gradient-to-br ${COURSE_MAP[finalCourse].color} text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group`}>
                     <div className="absolute top-0 right-0 text-[180px] text-white/10 font-black leading-none -mt-10 -mr-10 transition-transform group-hover:scale-110">
                        {COURSE_MAP[finalCourse].icon}
                     </div>
                     <div className="relative z-10">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-4">Top Program</h4>
                        <h3 className="text-3xl font-display font-bold mb-6">{COURSE_MAP[finalCourse].title}</h3>
                        <p className="text-sm text-white/90 leading-relaxed mb-10">
                           Our training will help you get a job in top companies with a starting salary of ₹25k - ₹45k.
                        </p>
                        <Link 
                           href={ROUTES[COURSE_MAP[finalCourse].id as keyof typeof ROUTES]}
                           className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                           View Details <Icons.ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                  </div>
                  
                  <button 
                     onClick={() => {
                        setStep('QUIZ');
                        setCurrentQIdx(0);
                        setSelections([]);
                     }}
                     className="w-full mt-6 py-4 rounded-2xl border border-zinc-200 dark:border-white/10 text-zinc-500 font-bold hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
                  >
                     <Icons.RotateCcw className="w-4 h-4" /> Restart Test
                  </button>
               </div>
            </div>

            {/* Other Options */}
            <div className="mt-20">
               <h3 className="text-center font-display text-2xl font-bold text-zinc-900 dark:text-white mb-10">Other options for you</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(COURSE_MAP).filter(([k]) => k !== finalCourse).slice(0, 4).map(([k, v]) => (
                    <Link 
                      key={k}
                      href={ROUTES[v.id as keyof typeof ROUTES]}
                      className="glass-panel p-6 rounded-3xl border border-zinc-100 dark:border-white/5 hover:border-blue-500/50 transition-all text-left group"
                    >
                       <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform">{v.icon}</div>
                       <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">{v.title}</h4>
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        )}

      </div>

      {/* SEO Content Module - Career Navigator Guide */}
      <CareerNavigatorSEOContent />
    </div>
  );
};
