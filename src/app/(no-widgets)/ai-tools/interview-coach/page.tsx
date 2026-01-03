import type { Metadata } from 'next';
import { InterviewCoachPageClient } from './InterviewCoachPageClient';

export const metadata: Metadata = {
  title: 'AI Interview Coach | Practice Airline & Hotel Interviews | Wings',
  description: 'Ace your cabin crew, ground staff & hospitality interviews. AI-powered mock interviews with instant feedback. Practice unlimited rounds free at Wings Institute.',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools/interview-coach',
  },
};

export default function InterviewCoachPage() {
  return <InterviewCoachPageClient />;
}

