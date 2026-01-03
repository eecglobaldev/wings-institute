'use client';

import { useRouter } from 'next/navigation';
import { LoginPage } from '@/components/LoginPage';

export function LoginPageWrapper() {
  const router = useRouter();

  return (
    <LoginPage 
      onLoginSuccess={(userData) => {
        // Redirect to student portal or home after successful login
        router.push('/student-portal');
      }} 
    />
  );
}

