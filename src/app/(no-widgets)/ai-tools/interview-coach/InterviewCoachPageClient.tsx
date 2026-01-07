'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, AppState, Industry, Round, Question, FeedbackData } from '@/components/InterviewCoach/types';
import { translations, industryData } from '@/components/InterviewCoach/data';
import { getAIQuestions } from '@/services/geminiService';
import Dashboard from '@/components/InterviewCoach/Dashboard';
import PracticeSession from '@/components/InterviewCoach/PracticeSession';
import Feedback from '@/components/InterviewCoach/Feedback';
import { LoadingOverlay } from '@/components/InterviewCoach/Shared';
import { HowToGuide } from '@/components/InterviewCoach/HowToGuide';
import { StudentLogin } from '@/components/StudentLogin';
import { InterviewCoachSEOContent } from '@/components/InterviewCoachSEOContent';

export const InterviewCoachPageClient: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [appState, setAppState] = useState<AppState>({
        currentView: View.Dashboard,
        language: 'en',
        theme: 'light',
        currentIndustry: null,
        currentRound: null,
        currentQuestion: null,
        lastAttemptFeedback: null,
        questionCache: {},
        isLoading: false,
        loadingText: '',
    });

    const t = useCallback((key: string) => {
        const langKey = appState.language;
        const langData = translations[langKey] || translations['en'];
        return langData[key] || key;
    }, [appState.language]);

    // Data Loading
    const currentIndustries = useMemo(() => {
        const data = industryData(t);
        if (data && data.length > 0) return data;
        return [];
    }, [t]);

    const setLoading = useCallback((isLoading: boolean, loadingText = '') => {
        setAppState(prev => ({ ...prev, isLoading, loadingText }));
    }, []);

    const handleLanguageChange = useCallback((lang: string) => {
        setAppState(prev => ({ ...prev, language: lang }));
    }, []);

    const startPractice = useCallback(async (industry: Industry, round: Round) => {
        setLoading(true, t('generatingQuestions'));
        const sessionKey = `${industry.id}-${round.id}`;
    
        const getQuestions = async (): Promise<Question[] | null> => {
            const cached = appState.questionCache[sessionKey]?.questions;
            if (cached && cached.length > 0) return cached;
            return getAIQuestions(industry, round, t);
        };
    
        try {
            const questions = await getQuestions();
            
            // Scroll to top when session starts
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });

            if (!questions || questions.length === 0) {
                const fallbackQs = [
                    { en: "Tell me about yourself.", hi: "अपने बारे में बताएं।", gu: "તમારા વિશે જણાવો." },
                    { en: "Why do you want to join aviation?", hi: "आप एविएशन क्यों चुनना चाहते हैं?", gu: "તમે ઉડ્ડયન ક્ષેત્રે કેમ જોડાવા માંગો છો?" }
                ];
                setAppState(prev => ({
                    ...prev,
                    questionCache: {
                        ...prev.questionCache,
                        [sessionKey]: { 
                            questions: fallbackQs, 
                            asked: prev.questionCache[sessionKey]?.asked || [] 
                        }
                    },
                    currentView: View.Practice,
                    currentIndustry: industry,
                    currentRound: round,
                    currentQuestion: null,
                    isLoading: false,
                    loadingText: '',
                }));
            } else {
                setAppState(prev => ({
                    ...prev,
                    questionCache: {
                        ...prev.questionCache,
                        [sessionKey]: { 
                            questions: questions, 
                            asked: prev.questionCache[sessionKey]?.asked || [] 
                        }
                    },
                    currentView: View.Practice,
                    currentIndustry: industry,
                    currentRound: round,
                    currentQuestion: null,
                    isLoading: false,
                    loadingText: '',
                }));
            }
    
        } catch (error) {
            console.error("Failed to start practice session:", error);
            setLoading(false);
            alert("Could not load questions. Please try again.");
        }
    }, [appState.questionCache, t, setLoading]);

    const handleShowFeedback = useCallback((feedback: FeedbackData) => {
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
        setAppState(prev => ({
            ...prev,
            lastAttemptFeedback: feedback,
            currentView: View.Feedback,
        }));
    }, []);
    
    const handleTryAgain = useCallback(() => {
         if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
         setAppState(prev => ({...prev, currentView: View.Practice}));
    }, []);
    
    const handleFinishSession = useCallback(() => {
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
        setAppState(prev => ({
            ...prev,
            currentView: View.Dashboard,
            currentIndustry: null,
            currentRound: null,
            currentQuestion: null,
            lastAttemptFeedback: null,
        }));
    }, []);

    if (!isLoggedIn) {
        return <StudentLogin toolName="Interview Coach" onLoginSuccess={(data) => {
            setIsLoggedIn(true);
            setUserName(data.name);
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
        }} onClose={() => window.history.back()} />;
    }

    return (
        <div className="min-h-screen pt-3 pb-20 relative z-10 flex flex-col">
            <div className="max-w-7xl mx-auto w-full px-6 flex-grow">
                {appState.currentView === View.Dashboard && (
                    <HowToGuide />
                )}

                {appState.currentView === View.Practice && appState.currentIndustry && appState.currentRound ? (
                    <PracticeSession
                        industry={appState.currentIndustry}
                        round={appState.currentRound}
                        questionCache={appState.questionCache}
                        currentQuestion={appState.currentQuestion}
                        setQuestionCache={(cache) => setAppState(prev => ({...prev, questionCache: cache}))}
                        setCurrentQuestion={(question) => setAppState(prev => ({...prev, currentQuestion: question}))}
                        onShowFeedback={handleShowFeedback}
                        onFinish={handleFinishSession}
                        setLoading={setLoading}
                        t={t}
                        language={appState.language}
                    />
                ) : appState.currentView === View.Feedback && appState.lastAttemptFeedback ? (
                    <Feedback
                        feedback={appState.lastAttemptFeedback}
                        onTryAgain={handleTryAgain}
                        onNextQuestion={() => {
                            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                            setAppState(prev => ({...prev, currentView: View.Practice, currentQuestion: null }));
                        }}
                        onFinish={handleFinishSession}
                        t={t}
                    />
                ) : (
                    <Dashboard
                        industries={currentIndustries}
                        onStartPractice={startPractice}
                        t={t}
                        language={appState.language}
                        onLanguageChange={handleLanguageChange}
                        userName={userName}
                    />
                )}
            </div>

            <LoadingOverlay isVisible={appState.isLoading} text={appState.loadingText} />

            {/* SEO Content Module - Interview Coach Guide */}
            <InterviewCoachSEOContent />
        </div>
    );
};
