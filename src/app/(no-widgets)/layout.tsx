import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  // Inherited from root layout
};

/**
 * No-Widgets Layout
 * Layout with Header and Footer but WITHOUT floating widgets
 * Used for AI tools (interview-coach, pa-simulator, resume-builder) and careers page
 * These pages need focus without distractions from floating buttons
 */
export default function NoWidgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      
      <main className="relative min-h-screen">
        {children}
      </main>
      
      <Footer />
      
      {/* NO widgets in this layout - intentionally excluded */}
    </>
  );
}
