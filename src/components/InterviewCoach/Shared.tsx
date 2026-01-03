
import React from 'react';

export const Card: React.FC<{ title: string; children: React.ReactNode; extraClasses?: string; titleExtraContent?: React.ReactNode }> = ({ title, children, extraClasses = '', titleExtraContent }) => (
    <div className={`glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/10 shadow-lg ${extraClasses}`}>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display">{title}</h3>
            {titleExtraContent}
        </div>
        {children}
    </div>
);

export const LoadingOverlay: React.FC<{ isVisible: boolean; text: string }> = ({ isVisible, text }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-xl flex flex-col justify-center items-center z-[100] transition-all duration-500">
            <div className="glass-panel p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-white/10 flex flex-col items-center max-w-sm w-full mx-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-wings-red/20 rounded-full blur-2xl"></div>
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-wings-red/30 blur-xl rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 border-4 border-wings-red border-t-transparent rounded-full animate-spin relative z-10"></div>
                </div>
                <p className="text-xl font-bold text-zinc-900 dark:text-white text-center font-display">{text}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-4 font-bold tracking-[0.25em] uppercase">AI Analysis in progress</p>
            </div>
        </div>
    );
};

export const MetricBar: React.FC<{ label: string; score: number }> = ({ label, score }) => {
    const percentage = (score / 10) * 100;
    // Using site theme colors
    const barColor = score >= 8.5 ? 'bg-emerald-500' : score >= 5 ? 'bg-amber-500' : 'bg-red-500';

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">{label}</p>
                <p className="text-sm font-black text-zinc-900 dark:text-white">{score.toFixed(1)}/10</p>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 dark:border-white/5">
                <div 
                    className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out shadow-sm`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export const RadialProgressBar: React.FC<{ score: number }> = ({ score }) => {
    const size = 180;
    const strokeWidth = 16;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;
    const scoreColor = score >= 8.5 ? '#10B981' : score >= 5 ? '#F59E0B' : '#EF4444'; // Emerald, Amber, Red

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox={`0 0 ${size} ${size}`}>
                <circle className="text-zinc-200 dark:text-white/10" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={center} cy={center} />
                <circle
                    stroke={scoreColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">{score.toFixed(1)}</span>
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">Score</span>
            </div>
        </div>
    );
};
