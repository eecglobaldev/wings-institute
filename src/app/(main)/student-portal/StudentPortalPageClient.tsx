'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { ROUTES } from '@/lib/routes';

const STORAGE_KEY = 'wings_student_data';

export function StudentPortalPageClient() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setUserData(data);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icons.Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-panel p-8 rounded-2xl text-center max-w-md">
          <Icons.Lock className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-zinc-500 mb-6">Please log in to access the student portal.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 mb-6 bg-indigo-500/5">
            <Icons.User className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Student Portal</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Access your course materials, schedules, and resources
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            href={ROUTES['ai-tools']}
            className="group glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/10 hover:-translate-y-2 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/10 transition-all"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Icons.Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">AI Tools</h3>
              <p className="text-sm text-zinc-500">Practice interviews, build resumes, and more</p>
            </div>
          </Link>

          <Link
            href={ROUTES['career-quest']}
            className="group glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/10 hover:-translate-y-2 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-all"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Icons.Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Career Quest</h3>
              <p className="text-sm text-zinc-500">Test your knowledge and win rewards</p>
            </div>
          </Link>

          <Link
            href={ROUTES['placements']}
            className="group glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/10 hover:-translate-y-2 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/10 transition-all"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 text-green-500 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Icons.Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Placements</h3>
              <p className="text-sm text-zinc-500">View placement opportunities</p>
            </div>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="glass-panel p-8 rounded-[2rem] border border-white/40 dark:border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Name</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{userData.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{userData.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{userData.email}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">City</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{userData.city}</p>
            </div>
            {userData.course && (
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Course</p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">{userData.course}</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-xl font-bold hover:bg-red-500/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

