
import React, { useState } from 'react';
import { FeedbackData } from './types';
import { Card, MetricBar, RadialProgressBar } from './Shared';
import { Icons } from '@/components/Icons';

interface FeedbackProps {
    feedback: FeedbackData;
    onTryAgain: () => void;
    onNextQuestion: () => void;
    onFinish: () => void;
    t: (key: string) => string;
}

type Tab = 'overview' | 'analysis' | 'model';

const Feedback: React.FC<FeedbackProps> = ({ feedback, onTryAgain, onNextQuestion, onFinish, t }) => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(t('copied'));
    };

    return (
        <div className="space-y-8 pb-10 animate-fade-in max-w-5xl mx-auto">
            <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-4">
                    <Icons.Sparkles className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 dark:text-white">{t('feedbackTitle')}</h2>
            </div>
            
            <div className="flex justify-center">
                <nav className="flex space-x-1 glass-panel p-1.5 rounded-full border border-white/20">
                    {(['overview', 'analysis', 'model'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-xs font-bold transition-all rounded-full ${activeTab === tab ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg' : 'text-zinc-500'}`}
                        >
                            {t(tab)}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        <Card title={t('overallScore')} extraClasses="flex flex-col items-center justify-center">
                            <RadialProgressBar score={feedback.score} />
                        </Card>

                        <Card title="Performance Pillars">
                             <div className="space-y-6">
                                <MetricBar label={t('englishClarity')} score={feedback.metrics.clarity} />
                                <MetricBar label={t('confidence')} score={feedback.metrics.confidence} />
                                <MetricBar label={t('roleUnderstanding')} score={feedback.metrics.role} />
                             </div>
                        </Card>

                        <div className="md:col-span-2 glass-panel p-6 rounded-[2rem] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Icons.Clock className="w-5 h-5 text-wings-red" />
                                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{t('speakingPace')}</span>
                            </div>
                            <p className="text-lg font-black text-zinc-900 dark:text-white">{feedback.analytics.paceFeedback}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'analysis' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        <Card title={t('yourStrengths')} extraClasses="border-emerald-500/20 bg-emerald-500/5">
                            <ul className="space-y-3">
                                {feedback.whatWentWell.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        <Icons.CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                        
                        <Card title={t('yourNextFocus')} extraClasses="border-red-500/20 bg-red-500/5">
                            <ul className="space-y-3">
                                {feedback.areasForImprovement.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        <Icons.AlertCircle className="w-5 h-5 text-red-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <div className="md:col-span-2 glass-panel p-8 rounded-[2rem]">
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t('fillerWords')}</h4>
                            <div className="flex flex-wrap gap-2">
                                {feedback.analytics.fillers.map((word, i) => (
                                    <span key={i} className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 text-xs font-bold">
                                        "{word}"
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'model' && (
                    <div className="animate-fade-in">
                        <Card title={t('modelAnswer')} titleExtraContent={
                            <button onClick={() => copyToClipboard(feedback.modelAnswer)} className="p-2 rounded-lg bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 transition-colors">
                                <Icons.Copy className="w-4 h-4" />
                            </button>
                        }>
                            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif italic">
                                "{feedback.modelAnswer}"
                            </p>
                        </Card>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-100 dark:border-white/5">
                <button onClick={onFinish} className="h-14 rounded-xl glass-panel font-bold text-zinc-500">
                    {t('finishSession')}
                </button>
                <button onClick={onTryAgain} className="h-14 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold">
                    {t('tryAgain')}
                </button>
                <button onClick={onNextQuestion} className="h-14 rounded-xl bg-wings-red text-white font-bold shadow-lg">
                    {t('nextQuestion')}
                </button>
            </div>
        </div>
    );
};

export default Feedback;
