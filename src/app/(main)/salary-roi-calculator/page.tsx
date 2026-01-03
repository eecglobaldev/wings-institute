import { Metadata } from 'next';
import { ROICalculatorPageClient } from './ROICalculatorPageClient';

export const metadata: Metadata = {
  title: 'Salary & ROI Calculator | Aviation & Hospitality Careers | Wings',
  description: 'Calculate your earning potential after Wings Institute training. Compare salaries: Cabin Crew ₹40K-1.2L, Hotel Manager ₹35K-80K. See 5-year career growth projection.',
  alternates: {
    canonical: 'https://wingsinstitute.com/salary-roi-calculator',
  },
};

export default function ROICalculatorPage() {
  return <ROICalculatorPageClient />;
}

