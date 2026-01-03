
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert'
}

export type Language = 'en' | 'hi';

export interface Question {
  id: string;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  motivationalMessage?: string; // AI-generated unique message
  scenario?: string; // Optional context for scenario-based questions
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  lives: number;
  history: {
    questionId: string;
    isCorrect: boolean;
  }[];
  isFinished: boolean;
}

export interface Department {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  icon: string; // Icon name
  color: string;
}

// Map of DepartmentID -> Difficulty -> HighestUnlockedSet (1-5)
export type UserProgress = Record<string, Record<Difficulty, number>>;

export type AppView = 'DASHBOARD' | 'LEVEL_SELECT' | 'QUIZ' | 'RESULTS' | 'LOADING';
