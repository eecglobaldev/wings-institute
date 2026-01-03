
export enum PAView {
    Intro = 'intro',
    Selection = 'selection',
    Practice = 'practice',
    Analysis = 'analysis'
}

export type PAScriptCategory = 'Pre-Flight' | 'Departure' | 'In-Flight' | 'Arrival' | 'Emergency';

export interface PAScript {
    id: string;
    title: string;
    category: PAScriptCategory;
    contentEn: string;
    contentHi: string;
    targetWPM: number;
    difficulty: 'Basic' | 'Standard' | 'Elite';
    demoAudioEn?: string; // URL to the English MP3 demo file
    demoAudioHi?: string; // URL to the Hindi MP3 demo file
}

export interface PAFeedback {
    score: number;
    wpm: number;
    accuracy: number;
    clarity: number;
    tone: string;
    pros: string[];
    cons: string[];
    transcription: string;
}
