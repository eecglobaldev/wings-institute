import type { Metadata } from 'next';
import { ResumeBuilderPageClient } from './ResumeBuilderPageClient';

export const metadata: Metadata = {
  title: 'AI Resume Builder | Aviation & Hospitality CV Maker | Wings',
  description: 'Create ATS-friendly resumes for airline & hotel jobs. AI-powered suggestions, professional templates, and job-specific optimization. Build your winning CV free!',
  alternates: {
    canonical: 'https://wingsinstitute.com/ai-tools/resume-builder',
  },
};

export default function ResumeBuilderPage() {
  return <ResumeBuilderPageClient />;
}

