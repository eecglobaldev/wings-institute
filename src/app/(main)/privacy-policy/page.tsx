import { Metadata } from 'next';
import { PrivacyPolicyPageClient } from './PrivacyPolicyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wings Institute Vadodara',
  description: 'Wings Institute privacy policy. Learn how we collect, use, and protect your personal information. Your data security is our priority.',
  alternates: {
    canonical: 'https://wingsinstitute.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}
