
import React, { useState } from 'react';
import { Industry, Round } from './types';
import { CabinCrewIcon, AirportStaffIcon, HotelIcon } from './Icons';

interface DashboardProps {
    industries: Industry[];
    onStartPractice: (industry: Industry, round: Round) => void;
    t: (key: string) => string;
    language: string;
    onLanguageChange: (lang: string) => void;
    userName?: string;
}

const IndustryIcon: React.FC<{ id: string }> = ({ id }) => {
    const iconProps = { className: "w-8 h-8 text-white" };
    switch (id) {
        case 'cabinCrew': return <CabinCrewIcon {...iconProps} />;
        case 'airportStaff': return <AirportStaffIcon {...iconProps} />;
        case 'hotelJob': return <HotelIcon {...iconProps} />;
        default: return null;
    }
};

const getCardStyle = (id: string) => {
    switch (id) {
        case 'cabinCrew':
            return {
                // Using site theme logic: subtle glass with colored accents
                border: "hover:border-blue-500/50",
                iconBg: "bg-blue-500",
                glow: "from-blue-500/20 to-transparent",
                textAccent: "text-blue-500",
                roundBtn: "hover:bg-blue-500 hover:text-white border-blue-200 dark:border-blue-900/50"
            };
        case 'airportStaff':
            return {
                border: "hover:border-purple-500/50",
                iconBg: "bg-purple-500",
                glow: "from-purple-500/20 to-transparent",
                textAccent: "text-purple-500",
                roundBtn: "hover:bg-purple-500 hover:text-white border-purple-200 dark:border-purple-900/50"
            };
        case 'hotelJob':
            return {
                border: "hover:border-amber-500/50",
                iconBg: "bg-amber-500",
                glow: "from-amber-500/20 to-transparent",
                textAccent: "text-amber-500",
                roundBtn: "hover:bg-amber-500 hover:text-white border-amber-200 dark:border-amber-900/50"
            };
        default:
            return {
                border: "hover:border-zinc-500/50",
                iconBg: "bg-zinc-500",
                glow: "from-zinc-500/20 to-transparent",
                textAccent: "text-zinc-500",
                roundBtn: "hover:bg-zinc-500 hover:text-white"
            };
    }
};

const Dashboard: React.FC<DashboardProps> = ({ industries, onStartPractice, t, language, onLanguageChange, userName }) => {
    const [openIndustryId, setOpenIndustryId] = useState<string | null>(null);

    const toggleIndustry = (id: string) => {
        setOpenIndustryId(prevId => (prevId === id ? null : id));
    };

    if (!industries || industries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
                 <div className="relative">
                    <div className="absolute inset-0 bg-wings-red/20 blur-xl rounded-full"></div>
                    <div className="w-12 h-12 border-4 border-wings-red border-t-transparent rounded-full animate-spin relative z-10"></div>
                 </div>
                 <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">Initializing Coach...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-wings-red/30 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-wings-red animate-pulse"></span>
                    <span className="text-xs font-bold text-wings-red uppercase tracking-widest">AI Interview Coach</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-display font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {userName ? (
                        <>
                            Welcome back, <span className="text-wings-red">{userName.split(' ')[0]}</span>.<br/>
                            <span className="text-zinc-300 dark:text-zinc-600 text-3xl md:text-5xl">Let's get you hired.</span>
                        </>
                    ) : (
                        t('practice')
                    )}
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto">
                    {t('welcomeBack')}
                </p>
                
                {/* Language Switcher - Centered and Styled */}
                <div className="flex justify-center mt-6">
                    <div className="glass-panel p-1 rounded-full flex items-center gap-1 border border-white/20">
                        {['en', 'hi', 'gu'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => onLanguageChange(lang)}
                                className={`
                                    px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                                    ${language === lang 
                                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md' 
                                        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/10'}
                                `}
                            >
                                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'ગુજરાતી'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Industry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry) => {
                    const isOpen = openIndustryId === industry.id;
                    const style = getCardStyle(industry.id);
                    
                    return (
                        <div 
                            key={industry.id} 
                            className={`
                                group relative flex flex-col rounded-[2.5rem] transition-all duration-500
                                ${isOpen ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'hover:-translate-y-2'}
                            `}
                        >
                            {/* Main Card */}
                            <div
                                onClick={() => toggleIndustry(industry.id)}
                                className={`
                                    glass-panel p-8 sm:p-10 cursor-pointer relative overflow-hidden transition-all duration-500 border border-white/40 dark:border-white/10
                                    ${style.border} hover:shadow-2xl
                                    ${isOpen ? 'rounded-b-none border-b-transparent' : 'rounded-[2.5rem]'}
                                `}
                            >
                                {/* Ambient Glow */}
                                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${style.glow} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-16 h-16 rounded-2xl ${style.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                            <IndustryIcon id={industry.id} />
                                        </div>
                                        <div className="bg-zinc-100 dark:bg-white/10 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/5">
                                            <span className="text-zinc-500 dark:text-zinc-300 text-xs font-bold tracking-widest uppercase">
                                                {industry.rounds.length} Modules
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:translate-x-1 transition-transform">
                                        {industry.title}
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {industry.description || "Master the skills required for this role."}
                                    </p>

                                    <div className={`mt-auto flex items-center gap-2 font-bold text-sm ${style.textAccent} uppercase tracking-wider`}>
                                        <span>{isOpen ? 'Close' : 'Select Role'}</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={3} 
                                            stroke="currentColor" 
                                            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Expanded Content */}
                            <div 
                                className={`
                                    glass-panel border-t-0 border-white/40 dark:border-white/10 rounded-b-[2.5rem] overflow-hidden transition-all duration-500 ease-in-out
                                    ${isOpen ? 'max-h-[500px] opacity-100 p-8 shadow-xl' : 'max-h-0 opacity-0 p-0 border-0'}
                                `}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10"></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Available Rounds</span>
                                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {industry.rounds.map((round) => (
                                        <button
                                            key={round.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onStartPractice(industry, round);
                                            }}
                                            className={`
                                                p-4 rounded-xl border transition-all duration-300 text-left group/btn
                                                bg-white/50 dark:bg-white/5 border-zinc-200 dark:border-white/10
                                                ${style.roundBtn} hover:shadow-lg hover:-translate-y-1
                                            `}
                                        >
                                            <span className="block text-sm font-bold text-zinc-700 dark:text-zinc-200 group-hover/btn:text-current mb-1">
                                                {round.title}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 group-hover/btn:text-white/80">
                                                Start Interview
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
