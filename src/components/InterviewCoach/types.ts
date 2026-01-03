
export enum View {
    Dashboard = 'dashboard',
    Practice = 'practice-session',
    Feedback = 'feedback',
}

export interface Round {
    id: string;
    title: string;
}

export interface Industry {
    id: string;
    title: string;
    description?: string;
    rounds: Round[];
}

export interface Question {
    en: string;
    hi: string;
    gu: string;
}

export interface QuestionCache {
    [key: string]: {
        questions: Question[];
        asked: number[]; // Store indices of asked questions
    };
}

export type Theme = 'light' | 'dark';

export interface AppState {
    currentView: View;
    language: string;
    theme: Theme;
    currentIndustry: Industry | null;
    currentRound: Round | null;
    currentQuestion: Question | null;
    lastAttemptFeedback: FeedbackData | null;
    questionCache: QuestionCache;
    isLoading: boolean;
    loadingText: string;
}

export interface FeedbackData {
    score: number;
    metrics: {
        clarity: number;
        confidence: number;
        role: number;
    };
    analytics: {
        paceFeedback: string;
        fillers: string[];
    };
    whatWentWell: string[];
    areasForImprovement: string[];
    modelAnswer: string;
}
