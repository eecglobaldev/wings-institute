import type { Metadata } from 'next';
import { LoginPageWrapper } from './LoginPageWrapper';

export const metadata: Metadata = {
  title: 'Login | Wings Institute Student Portal',
  description: 'Login to your Wings Institute account to access student resources and services. Verify your mobile number to unlock AI simulators.',
  alternates: {
    canonical: 'https://wingsinstitute.com/login',
  },
};

export default function LoginPageRoute() {
  return <LoginPageWrapper />;
}

