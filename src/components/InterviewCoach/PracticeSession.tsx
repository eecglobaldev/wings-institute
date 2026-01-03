
import React, { useState, useEffect, useCallback } from 'react';
import { Industry, Round, Question, QuestionCache, FeedbackData } from './types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { getFinalAIFeedback, transcribeAudio } from '@/services/geminiService';
import { MicIcon, StopIcon } from './Icons';
import { Icons } from '@/components/Icons';

interface PracticeSessionProps {
    industry: Industry;
    round: Round;
    questionCache: QuestionCache;
    currentQuestion: Question | null;
    setQuestionCache: (cache: QuestionCache) => void;
    setCurrentQuestion: (question: Question | null) => void;
    onShowFeedback: (feedback: FeedbackData) => void;
    onFinish: () => void;
    setLoading: (isLoading: boolean, loadingText?: string) => void;
    t: (key: string) => string;
    language: string;
}

const PracticeSession: React.FC<PracticeSessionProps> = ({
    industry,
    round,
    questionCache,
    currentQuestion,
    setQuestionCache,
    setCurrentQuestion,
    onShowFeedback,
    onFinish,
    setLoading,
    t,
    language
}) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const { 
        isRecording, 
        recordingTime, 
        audioBlob, 
        error: recorderError, 
        startRecording, 
        stopRecording, 
        resetRecording
    } = useAudioRecorder();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        if (recorderError) setStatus(recorderError);
        else if (isRecording) setStatus(t('stopRecording'));
        else if (audioBlob && !isTranscribing) setStatus(t('recordingComplete'));
        else if (isTranscribing) setStatus(t('transcribing'));
        else setStatus('');
    }, [isRecording, recorderError, audioBlob, isTranscribing, t]);

    const getNextQuestion = useCallback(() => {
        const sessionKey = `${industry.id}-${round.id}`;
        const cache = questionCache[sessionKey];

        if (!cache || cache.questions.length === 0) {
            setStatus("No questions available for this module.");
            return;
        }
        
        const availableIndices = cache.questions
            .map((_, i) => i)
            .filter(i => !(cache.asked || []).includes(i));

        const useIndices = availableIndices.length === 0 ? cache.questions.map((_, i) => i) : availableIndices;
        const randomIndex = useIndices[Math.floor(Math.random() * useIndices.length)];
        const newQuestion = cache.questions[randomIndex];
        
        setQuestionCache({
            ...questionCache,
            [sessionKey]: { ...cache, asked: [...(cache.asked || []), randomIndex] },
        });
        
        setCurrentQuestion(newQuestion);
        setQuestion(newQuestion);
        setAnswer('');
        resetRecording();
        setCountdown(3);
        
        // Fix for scrolling to top when question changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [industry, round, questionCache, setCurrentQuestion, setQuestionCache, resetRecording]);

    useEffect(() => {
        if (!currentQuestion) getNextQuestion();
        else {
            setQuestion(currentQuestion);
            setCountdown(3);
        }
    }, [currentQuestion, getNextQuestion]);

    const handleTranscribe = async () => {
        if (!audioBlob || isTranscribing) return;
        
        setIsTranscribing(true);
        setStatus(t('transcribing'));
        try {
            const text = await transcribeAudio(audioBlob, language, t);
            if (text) {
                setAnswer(prev => (prev + ' ' + text).trim());
                resetRecording();
            }
        } catch (error: any) {
            setStatus(error.message);
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleSubmit = async () => {
        if (!question || !answer.trim() || isTranscribing) return;
        
        setLoading(true, t('analyzingResponse'));
        
        try {
            const feedback = await getFinalAIFeedback(question, answer, language, t);
            setLoading(false);
            onShowFeedback(feedback);
        } catch (error: any) {
            console.error("AI Feedback Processing Error:", error);
            setStatus(error.message || "Analysis failed. Please try again.");
            setLoading(false);
        }
    };
    
    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="h-full flex flex-col relative animate-fade-in max-w-5xl mx-auto pb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-wings-red animate-pulse"></span>
                    <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        {industry.title} • {round.title}
                    </p>
                </div>
                <button onClick={onFinish} className="p-2 rounded-full glass-panel hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors">
                    <Icons.X className="h-4 w-4" />
                </button>
            </div>

            <div className="mb-6 relative z-10">
                {question ? (
                    <div className="glass-panel p-6 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-wings-red/5 rounded-full blur-3xl"></div>
                        
                        {/* Primary Language Question */}
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white leading-tight relative z-10">
                            {question[language as keyof Question] || question.en}
                        </h2>

                        {/* Secondary English Question (Always shown if non-English mode) */}
                        {language !== 'en' && (
                            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-white/5 relative z-10">
                                <p className="text-sm md:text-lg text-zinc-500 italic font-medium">
                                    {question.en}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-40 glass-panel rounded-[2.5rem] animate-pulse bg-zinc-100 dark:bg-white/5"></div>
                )}
            </div>

            <div className="flex-1 flex flex-col min-h-[300px] relative mb-6">
                <div className={`flex-1 flex flex-col glass-panel rounded-[2.5rem] p-6 md:p-8 border border-white/40 dark:border-white/10 transition-all duration-300 ${isRecording ? 'ring-2 ring-wings-red shadow-glow' : ''}`}>
                    
                    {countdown > 0 && (
                        <div className="absolute inset-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center rounded-[2.5rem]">
                            <span className="text-8xl font-display font-black text-wings-red animate-bounce">{countdown}</span>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mt-4">Get Ready</p>
                        </div>
                    )}

                    <textarea
                        className="flex-1 w-full bg-transparent text-lg md:text-xl leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 dark:placeholder-zinc-600 outline-none resize-none font-medium"
                        placeholder={t('tapToRecord')}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={isTranscribing || countdown > 0}
                        readOnly={isRecording}
                    />
                    
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-white/5 mt-4">
                        <div className="flex items-center gap-2">
                            {isRecording && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isRecording ? 'text-red-500' : 'text-zinc-400'}`}>
                                {status || 'System Idle'}
                            </span>
                        </div>
                        <div className="text-lg font-mono font-bold text-zinc-400">{formatTime(recordingTime)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                    onClick={toggleRecording} 
                    disabled={isTranscribing || countdown > 0}
                    className={`h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${isRecording ? 'bg-zinc-900 text-white' : 'bg-wings-red text-white'}`}
                >
                    {isRecording ? <StopIcon className="w-6 h-6 mr-2" /> : <MicIcon className="w-6 h-6 mr-2" />}
                    <span className="font-bold">{isRecording ? 'Stop' : 'Speak'}</span>
                </button>

                <button 
                    onClick={handleTranscribe}
                    disabled={!audioBlob || isTranscribing || isRecording || countdown > 0}
                    className="h-16 rounded-2xl glass-panel font-bold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-all disabled:opacity-30"
                >
                    {isTranscribing ? <Icons.Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('transcribe')}
                </button>

                <button 
                    onClick={handleSubmit} 
                    disabled={!answer.trim() || isRecording || isTranscribing || countdown > 0}
                    className="h-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xl transition-all hover:-translate-y-1 disabled:opacity-30"
                >
                    {t('getFeedback')}
                </button>
            </div>
        </div>
    );
};

export default PracticeSession;
