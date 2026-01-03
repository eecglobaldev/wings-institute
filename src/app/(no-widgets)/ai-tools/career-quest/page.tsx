import type { Metadata } from 'next';
import { CareerQuestGameClient } from './CareerQuestGameClient';

export const metadata: Metadata = {
  title: 'Career Quest Game | Test Aviation & Hospitality Knowledge | Wings',
  description: 'Play the interactive Career Quest game. Test your aviation & hospitality knowledge with AI-generated questions. Compete, learn, and prepare for your dream career!',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools/career-quest',
  },
};

export default function CareerQuestPage() {
  return <CareerQuestGameClient />;
}

