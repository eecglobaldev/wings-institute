
import React, { useState, useEffect } from 'react';
import { Question, Language } from '@/components/CQTypes';
import { Icons } from '@/components/Icons';
import { MAX_LIVES, QUESTIONS_PER_ROUND, UI_TEXT } from '@/components/CQConstants';

interface Props {
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
  language: Language;
}

const CQQuizView: React.FC<Props> = ({ questions, onComplete, onExit, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  
  const currentQuestion = questions[currentIndex];
  const t = UI_TEXT[language];

  const handleOptionSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setIsAnswerRevealed(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentIndex >= QUESTIONS_PER_ROUND - 1 || currentIndex >= questions.length - 1;
    
    if (lives <= 0 || isLastQuestion) {
      onComplete(score, questions.length);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-finish if lives run out after a short delay to see the error feedback
  useEffect(() => {
    if (lives <= 0 && isAnswerRevealed) {
        const timer = setTimeout(() => {
             onComplete(score, questions.length);
        }, 2000); 
        return () => clearTimeout(timer);
    }
  }, [lives, isAnswerRevealed, onComplete, score, questions.length]);

  return (
    <div className="max-w-4xl mx-auto w-full px-1 lg:px-6 animate-fade-in-up">
      {/* Top HUD Bar */}
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <button 
          onClick={onExit} 
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-zinc-500 hover:text-red-500 hover:bg-white dark:hover:bg-zinc-800 transition-all bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl md:rounded-2xl shadow-sm border border-white/40 dark:border-white/10"
        >
          <Icons.X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Progress Pills */}
        <div className="flex items-center gap-2 md:gap-4">
           {/* Lives */}
           <div className="flex items-center gap-2 md:gap-2.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-white/40 dark:border-white/10 shadow-lg">
              <Icons.Heart className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${lives > 1 ? 'text-rose-500 fill-rose-500' : 'text-rose-600 fill-rose-600 animate-pulse'}`} />
              <div className="flex gap-1 md:gap-1.5">
                 {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <div key={i} className={`w-1.5 md:w-2 h-4 md:h-5 rounded-md transition-all duration-500 ${i < lives ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
                 ))}
              </div>
           </div>
           
           {/* Score */}
           <div className="flex items-center gap-2 md:gap-3 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-white/40 dark:border-white/10 shadow-lg">
              <Icons.Trophy className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
              <span className="font-mono font-black text-lg md:text-xl text-zinc-900 dark:text-white tracking-tighter">{score * 100}</span>
           </div>
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="glass-panel rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-white/60 dark:border-white/10">
        
        {/* Progress Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-100 dark:bg-zinc-800/50">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all duration-700 ease-out"
            style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_ROUND) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-14">
          {/* Question Meta */}
          <div className="flex justify-between items-center mb-6 md:mb-10">
             <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl bg-zinc-100 dark:bg-white/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10">
               {t.question} {currentIndex + 1} of {QUESTIONS_PER_ROUND}
             </span>
          </div>

          {/* Scenario Box */}
          {currentQuestion?.scenario && (
            <div className="mb-6 md:mb-10 bg-amber-50/50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-5 md:p-8 rounded-r-2xl md:rounded-r-[2rem] flex gap-4 md:gap-6 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500/5 pointer-events-none group-hover:bg-amber-500/10 transition-colors"></div>
              <div className="p-2 md:p-3 bg-white dark:bg-amber-900/30 rounded-xl md:rounded-2xl shadow-sm h-fit shrink-0">
                <Icons.AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-400 relative z-10" />
              </div>
              <div className="leading-relaxed relative z-10">
                <span className="font-black block mb-1 md:mb-2 text-amber-700 dark:text-amber-400 uppercase text-[8px] md:text-[10px] tracking-[0.2em]">{t.scenario}</span>
                <p className="font-serif text-lg md:text-2xl text-amber-900 dark:text-amber-100 italic leading-relaxed">"{currentQuestion.scenario}"</p>
              </div>
            </div>
          )}

          {/* Question Text */}
          <h2 className="text-2xl md:text-5xl font-display font-black text-zinc-900 dark:text-white mb-8 md:mb-12 leading-[1.1] tracking-tight">
            {currentQuestion?.text}
          </h2>

          {/* Options Grid */}
          <div className="grid gap-3 md:gap-5">
            {currentQuestion?.options.map((option, idx) => {
              let stateClass = "border-zinc-100 dark:border-white/5 bg-white/40 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl";
              let textClass = "text-zinc-700 dark:text-zinc-200";
              let icon = <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-amber-400 transition-colors"></div>;

              if (isAnswerRevealed) {
                if (idx === currentQuestion.correctIndex) {
                  stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]";
                  textClass = "text-emerald-900 dark:text-emerald-50 font-black";
                  icon = <Icons.CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900" />;
                } else if (idx === selectedOption) {
                  stateClass = "border-rose-500 bg-rose-50 dark:bg-rose-900/30 ring-2 ring-rose-500/20 shadow-lg";
                  textClass = "text-rose-900 dark:text-rose-50 font-black";
                  icon = <Icons.X className="w-6 h-6 md:w-7 md:h-7 text-rose-600 dark:text-rose-400 fill-rose-100 dark:fill-rose-900" />;
                } else {
                  stateClass = "border-transparent opacity-30 grayscale blur-[1px]";
                }
              } else if (selectedOption === idx) {
                stateClass = "border-amber-500 bg-amber-50 dark:bg-amber-900/30 ring-2 ring-amber-500/50 shadow-2xl scale-[1.01]";
                textClass = "text-amber-900 dark:text-amber-100 font-black";
                icon = <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[6px] md:border-[7px] border-amber-500 bg-white shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>;
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerRevealed}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-2 transition-all duration-300 flex justify-between items-center group backdrop-blur-md ${stateClass}`}
                >
                  <span className={`text-lg md:text-2xl font-medium tracking-tight pr-4 ${textClass}`}>
                    {option}
                  </span>
                  <div className="shrink-0">{icon}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-zinc-50/80 dark:bg-black/40 p-6 md:p-10 border-t border-white/40 dark:border-white/10 backdrop-blur-3xl">
          {!isAnswerRevealed ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl tracking-wider transition-all transform active:scale-[0.98] shadow-2xl ${
                selectedOption !== null 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:-translate-y-1' 
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
              }`}
            >
              {t.confirmAnswer}
            </button>
          ) : (
            <div className="animate-fade-in space-y-6 md:space-y-10">
               {/* Expert Insight Panel */}
               <div className="relative overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-white dark:bg-zinc-800/80 border border-amber-500/20 shadow-2xl">
                  <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-amber-500"></div>
                  <div className="p-6 md:p-10">
                      <div className="flex items-start gap-4 md:gap-6">
                        <div className="p-3 md:p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl md:rounded-3xl text-amber-600 dark:text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
                            <Icons.Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                          <span className="block text-[8px] md:text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2 md:mb-3">{t.expertInsight}</span>
                          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-base md:text-xl font-medium">
                            {currentQuestion?.explanation}
                          </p>
                        </div>
                      </div>
                  </div>
               </div>

               {/* Affirmation */}
               <div className="text-center px-4">
                 <p className="text-sm md:text-base font-bold text-amber-600 dark:text-amber-400 animate-pulse uppercase tracking-[0.15em] md:tracking-[0.2em] italic leading-tight">
                   "{currentQuestion.motivationalMessage || t.motivationalMessage}"
                 </p>
               </div>
               
               {/* Next Button */}
               <button
                  onClick={handleNext}
                  className="w-full py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-2xl transition-all flex justify-center items-center bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 hover:shadow-amber-500/40 hover:-translate-y-1 text-white active:scale-95"
                >
                    {currentIndex < QUESTIONS_PER_ROUND - 1 && lives > 0 ? (
                      <>{t.nextQuestion} <Icons.ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" /></>
                    ) : (
                      <>{t.finishQuiz} <Icons.Check className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" /></>
                    )}
                </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Subtext */}
      <div className="mt-6 md:mt-8 text-center px-4">
         <p className="text-[8px] md:text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] md:tracking-[0.5em]">Industry Standard Simulation • Wings Institute</p>
      </div>
    </div>
  );
};

export default CQQuizView;
