import type { Metadata } from 'next';
import { FranchisePageClient } from './FranchisePageClient';

export const metadata: Metadata = {
  title: 'Franchise Opportunity | Start Aviation Training Academy | Wings',
  description: 'Partner with Gujarat\'s leading aviation institute. Low investment, high returns. Complete setup support, curriculum & placement network. Apply for Wings franchise today!',
  alternates: {
    canonical: 'https://wingsinstitute.com/franchise',
  },
};

export default function FranchisePage() {
  return <FranchisePageClient />;
}

