import { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '@/components/Icons';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Wings Institute',
  description: 'The page you are looking for could not be found. Return to Wings Institute homepage or explore our courses and services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            <Icons.Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            <Icons.History className="w-5 h-5" />
            About Us
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <Link
            href="/air-hostess-training"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors"
          >
            <Icons.Plane className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Air Hostess Training</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Cabin crew training program</p>
          </Link>

          <Link
            href="/hotel-management"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors"
          >
            <Icons.ConciergeBell className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Hotel Management</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Hospitality training course</p>
          </Link>

          <Link
            href="/contact-us"
            className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors"
          >
            <Icons.MapPin className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Contact Us</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Get in touch with us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
