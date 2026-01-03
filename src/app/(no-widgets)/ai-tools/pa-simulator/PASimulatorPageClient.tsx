'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from '@/components/Icons';
import { StudentLogin } from '@/components/StudentLogin';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { PAView, PAScript, PAFeedback, PAScriptCategory } from '@/components/PASimulator/types';
import { PA_SCRIPTS } from '@/components/PASimulator/scripts';
import { analyzePAAnnouncement } from '@/services/geminiService';
import { MetricBar, RadialProgressBar, LoadingOverlay } from '@/components/InterviewCoach/Shared';
import { PASimulatorSEOContent } from '@/components/PASimulatorSEOContent';

const WorkflowSection = () => (
    <div className="mb-24 animate-fade-in-up [animation-delay:400ms]">
        <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Simulator Workflow</span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { id: '01', title: 'Select Scenario', desc: 'Choose from 16+ IATA standard scripts.', icon: <Icons.BookOpen className="w-5 h-5" /> },
                { id: '02', title: 'Hear AI Demo', desc: 'Listen to the expert Indian accent model.', icon: <Icons.PlayCircle className="w-5 h-5" /> },
                { id: '03', title: 'Record Voice', desc: 'Practice your delivery with the mic.', icon: <Icons.Mic className="w-5 h-5" /> },
                { id: '04', title: 'Get AI Score', desc: 'Receive instant feedback on your tone.', icon: <Icons.BarChart3 className="w-5 h-5" /> },
            ].map((step) => (
                <div key={step.id} className="group relative glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/5 bg-white/40 dark:bg-white/5 overflow-hidden transition-all hover:-translate-y-1">
                    <span className="absolute top-4 right-6 text-7xl font-display font-black text-zinc-100 dark:text-white/5 select-none transition-colors group-hover:text-wings-red/10">{step.id}</span>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-wings-red mb-6">
                            {step.icon}
                        </div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const PASimulatorPageClient: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [view, setView] = useState<PAView>(PAView.Intro);
    const [selectedScript, setSelectedScript] = useState<PAScript | null>(null);
    const [activeCategory, setActiveCategory] = useState<PAScriptCategory | 'All'>('All');
    const [analysisResult, setAnalysisResult] = useState<PAFeedback | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [playingLang, setPlayingLang] = useState<'en' | 'hi' | null>(null);

    // Bifurcated recording state
    const [recordingStep, setRecordingStep] = useState<'EN' | 'HI'>('EN');
    const [audioBlobEn, setAudioBlobEn] = useState<Blob | null>(null);
    const [audioBlobHi, setAudioBlobHi] = useState<Blob | null>(null);
    const [durationEn, setDurationEn] = useState(0);
    const [durationHi, setDurationHi] = useState(0);

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const { isRecording, startRecording, stopRecording, recordingTime, audioBlob, resetRecording, error: recorderError } = useAudioRecorder();

    const categories: (PAScriptCategory | 'All')[] = ['All', 'Pre-Flight', 'Departure', 'In-Flight', 'Arrival', 'Emergency'];

    const filteredScripts = useMemo(() => {
        if (activeCategory === 'All') return PA_SCRIPTS;
        return PA_SCRIPTS.filter(s => s.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                audioPlayerRef.current = null;
            }
        };
    }, [view]);

    // Forensic Check: If recorder returns error, show it to user
    useEffect(() => {
        if (recorderError) {
            alert(recorderError);
        }
    }, [recorderError]);

    // Handle recording completion to save to bifurcated state
    useEffect(() => {
        if (!isRecording && audioBlob) {
            if (recordingStep === 'EN') {
                setAudioBlobEn(audioBlob);
                setDurationEn(recordingTime);
            } else {
                setAudioBlobHi(audioBlob);
                setDurationHi(recordingTime);
            }
        }
    }, [isRecording, audioBlob, recordingStep, recordingTime]);

    const handleLogin = (data: any) => {
        setUserName(data.name);
        setIsLoggedIn(true);
    };

    const handleScriptSelect = (script: PAScript) => {
        setSelectedScript(script);
        setView(PAView.Practice);
        setRecordingStep('EN');
        setAudioBlobEn(null);
        setAudioBlobHi(null);
        resetRecording();
    };

    // Forensic Fix for iOS: Ensure AudioContext is resumed on interaction
    const ensureAudioEnabled = async () => {
        if (typeof window === 'undefined') return;
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
        }
    };

    const handleStartStopRecording = async () => {
        await ensureAudioEnabled();
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    };

    const toggleDemo = (lang: 'en' | 'hi') => {
        const url = lang === 'en' ? selectedScript?.demoAudioEn : selectedScript?.demoAudioHi;
        if (!url) {
            alert(`No ${lang === 'en' ? 'English' : 'Hindi'} demo audio available for this script yet.`);
            return;
        }
        
        if (playingLang === lang) {
            audioPlayerRef.current?.pause();
            setPlayingLang(null);
        } else {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
            }
            const player = new Audio(url);
            audioPlayerRef.current = player;
            player.onplay = () => setPlayingLang(lang);
            player.onended = () => setPlayingLang(null);
            player.onerror = () => {
                setPlayingLang(null);
                alert("The demo audio file could not be loaded.");
            };
            player.play().catch(async (err) => {
                console.warn("Demo failed, attempting context resume for iOS:", err);
                await ensureAudioEnabled();
                player.play().catch(() => setPlayingLang(null));
            });
        }
    };

    const handleAnalyze = async () => {
        if (!audioBlobEn || !audioBlobHi || !selectedScript) return;
        
        setIsLoading(true);
        setLoadingText("AI is performing cross-language analysis...");
        try {
            const result = await analyzePAAnnouncement(
                selectedScript, 
                audioBlobEn, 
                durationEn, 
                audioBlobHi, 
                durationHi
            );
            setAnalysisResult(result);
            setView(PAView.Analysis);
        } catch (e: any) {
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearCurrentStep = () => {
        resetRecording();
        if (recordingStep === 'EN') setAudioBlobEn(null);
        else setAudioBlobHi(null);
    };

    const handleRetry = () => {
        setAudioBlobEn(null);
        setAudioBlobHi(null);
        setRecordingStep('EN');
        resetRecording();
        setView(PAView.Practice);
        setAnalysisResult(null);
    };

    if (!isLoggedIn) {
        return <StudentLogin toolName="PA Simulator" onLoginSuccess={handleLogin} />;
    }

    return (
        <div className="min-h-screen pt-3 pb-32 px-6 relative">
            <div className="max-w-6xl mx-auto">
                
                {/* --- VIEW: INTRO --- */}
                {view === PAView.Intro && (
                    <div className="text-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-purple-500/30 mb-8 shadow-sm">
                                <Icons.Radio className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-widest">In-Flight Voice Module</span>
                            </div>
                            <h1 className="font-display text-5xl md:text-8xl font-black text-zinc-900 dark:text-white leading-[0.9] tracking-tighter mb-10">
                                The Voice of <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 italic">Wings Air.</span>
                            </h1>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16">
                                Master the speed, tone, and clarity required for international airline announcements. Our AI now bifurcates recordings for better language-specific scoring.
                            </p>
                            <button 
                                onClick={() => setView(PAView.Selection)}
                                className="group relative px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all mb-20"
                            >
                                <span className="flex items-center gap-3 relative z-10">
                                    Enter Simulation <Icons.ArrowRight className="w-6 h-6" />
                                </span>
                            </button>
                        </div>
                        <WorkflowSection />
                    </div>
                )}

                {/* --- VIEW: SELECTION --- */}
                {view === PAView.Selection && (
                    <div className="animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white">Announcement Library</h2>
                                <p className="text-zinc-500 mt-2">Select a phase of flight to begin your bifurcated voice training.</p>
                            </div>
                            <button onClick={() => setView(PAView.Intro)} className="p-3 rounded-full glass-panel hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors">
                                <Icons.X className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-10 p-1.5 glass-panel rounded-2xl w-fit">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredScripts.map((script) => (
                                <button 
                                    key={script.id}
                                    onClick={() => handleScriptSelect(script)}
                                    className="group relative text-left p-8 rounded-[2.5rem] glass-panel border border-white/40 dark:border-white/10 hover:border-purple-500/50 transition-all duration-500 bg-white/40 dark:bg-zinc-900/40 hover:shadow-2xl hover:-translate-y-1 overflow-hidden h-full flex flex-col"
                                >
                                    <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl transition-all group-hover:opacity-40 ${script.category === 'Emergency' ? 'bg-red-500/5' : 'bg-purple-500/5'}`}></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${script.category === 'Emergency' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50'}`}>
                                            {script.category}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors">{script.title}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6 italic flex-grow">"{script.contentEn}"</p>
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Icons.Timer className="w-3.5 h-3.5 text-zinc-400" />
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Target: {script.targetWPM} WPM</span>
                                        </div>
                                        <Icons.ChevronRight className="w-5 h-5 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- VIEW: PRACTICE --- */}
                {view === PAView.Practice && selectedScript && (
                    <div className="animate-fade-in max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <button onClick={() => setView(PAView.Selection)} className="flex items-center gap-2 text-zinc-500 font-bold hover:text-purple-600 transition-colors">
                                <Icons.ChevronLeft className="w-5 h-5" /> Exit Session
                            </button>
                            
                            {/* Step Indicator */}
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${recordingStep === 'EN' ? 'bg-purple-500 text-white border-purple-500 shadow-lg' : 'bg-white/50 dark:bg-white/5 text-zinc-400 border-zinc-200 dark:border-white/10'}`}>
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${recordingStep === 'EN' ? 'bg-white text-purple-600' : 'bg-zinc-200 text-zinc-500'}`}>1</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">English</span>
                                    {audioBlobEn && <Icons.Check className="w-3.5 h-3.5" />}
                                </div>
                                <Icons.ArrowRight className="w-4 h-4 text-zinc-300" />
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${recordingStep === 'HI' ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-white/50 dark:bg-white/5 text-zinc-400 border-zinc-200 dark:border-white/10'}`}>
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${recordingStep === 'HI' ? 'bg-white text-orange-600' : 'bg-zinc-200 text-zinc-500'}`}>2</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">Hindi</span>
                                    {audioBlobHi && <Icons.Check className="w-3.5 h-3.5" />}
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden mb-12">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"></div>
                             
                             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                                <div className="text-center md:text-left">
                                    <span className={`text-xs font-bold uppercase tracking-[0.3em] mb-2 block ${selectedScript.category === 'Emergency' ? 'text-wings-red' : 'text-purple-500'}`}>
                                        Step {recordingStep === 'EN' ? '1' : '2'}: Record {recordingStep === 'EN' ? 'English' : 'Hindi'} Script
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white leading-tight">
                                        {selectedScript.title}
                                    </h2>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => toggleDemo(recordingStep === 'EN' ? 'en' : 'hi')}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${playingLang ? (playingLang === 'en' ? 'bg-wings-red text-white' : 'bg-orange-500 text-white') : 'glass-panel text-zinc-600 hover:bg-zinc-100 shadow-sm'}`}
                                    >
                                        {playingLang ? <Icons.VolumeX className="w-5 h-5" /> : <Icons.Play className="w-5 h-5" />}
                                        {playingLang ? 'Stop Demo' : `Listen to ${recordingStep} Demo`}
                                    </button>
                                </div>
                             </div>

                             {/* Focused Script Display */}
                             <div className="relative z-10">
                                {recordingStep === 'EN' ? (
                                    <div className={`p-8 md:p-12 rounded-[2.5rem] bg-purple-50 dark:bg-purple-900/10 border-2 transition-all duration-500 ${isRecording ? 'border-purple-500 shadow-glow scale-[1.01]' : 'border-purple-100 dark:border-purple-900/30'}`}>
                                        <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-purple-400">
                                            <Icons.Languages className="w-4 h-4" /> English Script
                                        </div>
                                        <p className="text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 leading-relaxed font-serif italic select-none">
                                            {selectedScript.contentEn}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={`p-8 md:p-12 rounded-[2.5rem] bg-orange-50 dark:bg-orange-900/10 border-2 transition-all duration-500 ${isRecording ? 'border-orange-500 shadow-glow scale-[1.01]' : 'border-orange-100 dark:border-orange-900/30'}`}>
                                        <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-orange-400">
                                            <Icons.Languages className="w-4 h-4" /> Hindi Script
                                        </div>
                                        <p className="text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 leading-[2] font-sans font-medium select-none">
                                            {selectedScript.contentHi}
                                        </p>
                                    </div>
                                )}
                             </div>
                        </div>

                        <div className="flex flex-col items-center gap-8">
                            <div className="relative">
                                {isRecording && (
                                    <div className="absolute -inset-4 border-2 border-red-500 rounded-full animate-ping opacity-20"></div>
                                )}
                                <button 
                                    onClick={handleStartStopRecording}
                                    className={`
                                        w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-95 z-10 relative
                                        ${isRecording ? 'bg-zinc-900 text-white ring-8 ring-red-500/20' : (recordingStep === 'EN' ? 'bg-purple-600' : 'bg-orange-600') + ' text-white hover:scale-105'}
                                    `}
                                >
                                    {isRecording ? <Icons.Square className="w-10 h-10 fill-white" /> : <Icons.Mic className="w-10 h-10" />}
                                </button>
                            </div>
                            
                            <div className="text-center space-y-2">
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                                    {isRecording ? 'RECORDING ACTIVE' : (recordingStep === 'EN' ? (audioBlobEn ? 'English Recorded' : 'Tap to record English') : (audioBlobHi ? 'Hindi Recorded' : 'Tap to record Hindi'))}
                                </p>
                                {isRecording && <div className="text-2xl font-mono font-black text-red-500">{recordingTime}s</div>}
                            </div>

                            <div className="flex gap-4 animate-fade-in-up">
                                {(recordingStep === 'EN' ? audioBlobEn : audioBlobHi) && !isRecording && (
                                    <button onClick={handleClearCurrentStep} className="px-8 py-4 glass-panel rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 transition-all">Clear & Retry</button>
                                )}
                                
                                {recordingStep === 'EN' && audioBlobEn && !isRecording && (
                                    <button 
                                        onClick={() => { resetRecording(); setRecordingStep('HI'); }}
                                        className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                                    >
                                        Next: Record Hindi <Icons.ArrowRight className="w-5 h-5" />
                                    </button>
                                )}

                                {recordingStep === 'HI' && audioBlobHi && !isRecording && (
                                    <button 
                                        onClick={handleAnalyze} 
                                        className="px-10 py-4 bg-wings-red text-white rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 shadow-red-500/20"
                                    >
                                        Analyze Both Recordings <Icons.Sparkles className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VIEW: ANALYSIS --- */}
                {view === PAView.Analysis && analysisResult && selectedScript && (
                    <div className="animate-fade-in max-w-5xl mx-auto space-y-12">
                        <div className="text-center">
                            <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-6">
                                <Icons.Sparkles className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-900 dark:text-white mb-4">Final Score</h2>
                            <p className="text-xl text-zinc-500">Your bilingual announcement has been analyzed against IATA standards.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="glass-panel p-10 rounded-[3rem] flex flex-col items-center justify-center">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Combined Proficiency</span>
                                <RadialProgressBar score={analysisResult.score} />
                             </div>

                             <div className="glass-panel p-10 rounded-[3rem] space-y-8">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Cadence Metrics</h3>
                                <MetricBar label="Combined Accuracy" score={analysisResult.accuracy / 10} />
                                <MetricBar label="Voice Clarity Index" score={analysisResult.clarity} />
                                <div className="pt-4 border-t border-zinc-100 dark:border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Speaking Pace</span>
                                        <span className={`text-xl font-black ${Math.abs(analysisResult.wpm - selectedScript.targetWPM) < 10 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {analysisResult.wpm} WPM
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400">Target: {selectedScript.targetWPM} Words Per Minute</p>
                                </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-panel p-8 rounded-[2.5rem] border-emerald-500/20 bg-emerald-500/5">
                                <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
                                    <Icons.CheckCircle2 className="w-5 h-5" /> Professional Commendations
                                </h4>
                                <ul className="space-y-4">
                                    {analysisResult.pros.map((pro, i) => (
                                        <li key={i} className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">• {pro}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass-panel p-8 rounded-[2.5rem] border-amber-500/20 bg-amber-500/5">
                                <h4 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-6 flex items-center gap-2">
                                    <Icons.Target className="w-5 h-5" /> Target Improvements
                                </h4>
                                <ul className="space-y-4">
                                    {analysisResult.cons.map((con, i) => (
                                        <li key={i} className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">• {con}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="glass-panel p-10 rounded-[3rem]">
                             <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Consolidated Transcription</h4>
                             <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                                 "{analysisResult.transcription}"
                             </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-12">
                            <button onClick={() => setView(PAView.Selection)} className="h-16 px-10 rounded-2xl glass-panel font-bold text-zinc-500 hover:text-zinc-900 transition-all">Select New Script</button>
                            <button onClick={handleRetry} className="h-16 px-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xl">Retry Practice</button>
                        </div>
                    </div>
                )}

            </div>

            <LoadingOverlay isVisible={isLoading} text={loadingText} />

            {/* SEO Content Module - PA Simulator Guide */}
            <PASimulatorSEOContent />
        </div>
    );
};
