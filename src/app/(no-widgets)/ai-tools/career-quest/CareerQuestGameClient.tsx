'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/Icons';
import { Department, AppView, Question, Difficulty } from '@/components/CQTypes';
import { DEPARTMENTS, UI_TEXT } from '@/components/CQConstants';
import CQDepartmentCard from '@/components/CQDepartmentCard';
import { CQHowToGuide } from '@/components/CQHowToGuide';
import CQQuizView from '@/components/CQQuizView';
import CQResultsView from '@/components/CQResultsView';
import { generateQuestions } from '@/components/CQService';
import { StudentLogin } from '@/components/StudentLogin';
import { CareerQuestSEOContent } from '@/components/CareerQuestSEOContent';

export const CareerQuestGameClient: React.FC = () => {
  const [view, setView] = useState<AppView>('DASHBOARD');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'AVIATION' | 'HOSPITALITY' | 'SKILLS'>('ALL');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lastQuizResult, setLastQuizResult] = useState<{ score: number, total: number } | null>(null);

  const t = UI_TEXT['en'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [view, isLoggedIn]);

  const handleLogin = (data: any) => {
    setUserName(data.name);
    setIsLoggedIn(true);
  };

  const filteredDepartments = DEPARTMENTS.filter(d => {
    if (activeCategory === 'ALL') return true;
    const aviationIds = ['cabin-crew-safety', 'cabin-crew-service', 'check-in', 'avsec-training', 'boarding-gate', 'security-bcas', 'ramp-operations', 'international-regs', 'aviation-english'];
    const hospitalityIds = ['hotel-mgmt-generic', 'front-office', 'fnb-service', 'food-production', 'housekeeping'];
    const skillIds = ['grooming', 'interview-prep'];
    if (activeCategory === 'AVIATION') return aviationIds.includes(d.id);
    if (activeCategory === 'HOSPITALITY') return hospitalityIds.includes(d.id);
    if (activeCategory === 'SKILLS') return skillIds.includes(d.id);
    return true;
  });

  const handleDeptSelect = async (dept: Department) => {
    setSelectedDept(dept);
    setView('LOADING');
    try {
      const qs = await generateQuestions(dept.name, 20, Difficulty.Beginner, 'en', 1);
      setQuestions(qs);
      setView('QUIZ');
    } catch (e) {
      console.error(e);
      setView('DASHBOARD');
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    setLastQuizResult({ score, total });
    setView('RESULTS');
  };

  const handleExitQuiz = () => {
    setView('DASHBOARD');
    setSelectedDept(null);
  };

  if (!isLoggedIn) {
    return <StudentLogin toolName="CareerQuest" onLoginSuccess={handleLogin} />;
  }

  if (view === 'LOADING') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-zinc-50 dark:bg-zinc-950 px-6">
        <Icons.Loader2 className="w-16 h-16 text-amber-600 animate-spin mb-4" />
        <h2 className="text-2xl font-display font-black text-zinc-900 dark:text-white">Initializing Simulation...</h2>
      </div>
    );
  }

  if (view === 'QUIZ') {
    return (
      <div className="min-h-screen pt-24 pb-10 bg-zinc-50 dark:bg-zinc-950 px-4">
        <CQQuizView questions={questions} onComplete={handleQuizComplete} onExit={handleExitQuiz} language="en" />
      </div>
    );
  }

  if (view === 'RESULTS' && lastQuizResult) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950 px-4">
        <CQResultsView score={lastQuizResult.score} total={lastQuizResult.total} department={selectedDept} onReturn={handleExitQuiz} language="en" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5 pb-20 px-4 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-row justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg">
                      <Icons.Gamepad2 className="w-6 h-6" />
                   </div>
                   <span className="font-display font-black text-xl text-zinc-900 dark:text-white uppercase">CareerQuest <span className="text-amber-500">AI</span></span>
                </div>
            </div>
            <CQHowToGuide />
            <div className="text-center relative mb-16">
              <h1 className="text-5xl md:text-8xl font-display font-black text-zinc-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
                {userName ? `Level up, ${userName.split(' ')[0]}!` : "The Knowledge Simulator."}
              </h1>
              <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-12">The ultimate career readiness platform for Aviation & Hospitality professionals.</p>
              <div className="p-1.5 glass-panel rounded-[2rem] inline-flex flex-wrap justify-center gap-1 border border-white/40 bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
                 {(['ALL', 'AVIATION', 'HOSPITALITY', 'SKILLS'] as const).map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3.5 rounded-[1.6rem] text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xl scale-105' : 'text-zinc-500'}`}>
                      {cat}
                    </button>
                 ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
              {filteredDepartments.map(dept => (
                <CQDepartmentCard key={dept.id} department={dept} onClick={handleDeptSelect} language="en" />
              ))}
            </div>
        </div>

        {/* SEO Content Module */}
        <CareerQuestSEOContent />
    </div>
  );
};
