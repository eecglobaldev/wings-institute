import type { Metadata } from 'next';
import { AIPageClient } from './AIPageClient';

export const metadata: Metadata = {
  title: 'Free AI Career Tools for Aviation & Hospitality | Wings Institute',
  description: 'Access AI-powered tools: Interview Coach, PA Simulator, Resume Builder, Career Navigator & Career Quest. Prepare for airline interviews with cutting-edge technology.',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools',
  },
};

export default function AIToolsPage() {
  return <AIPageClient />;
}

